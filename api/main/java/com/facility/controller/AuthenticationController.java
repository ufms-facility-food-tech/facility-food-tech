package com.facility.controller;

import com.facility.enums.Role;
import com.facility.model.User;
import com.facility.repository.UserRepository;
import com.facility.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {

  public record LoginRequest(String username, String password) {}

  public record SignupRequest(
    String username,
    String displayName,
    String email,
    String password
  ) {}

  public record JwtResponse(
    String token,
    Long id,
    String username,
    String displayName,
    String email,
    Set<String> roles,
    String type
  ) {}

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;

  public AuthenticationController(
    AuthenticationManager authenticationManager,
    UserRepository userRepository,
    JwtService jwtService,
    PasswordEncoder passwordEncoder
  ) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/login")
  @Operation(
    operationId = "authenticateUser",
    summary = "Authenticate user",
    description = "Returns a JWT token and user details if the credentials are valid.",
    requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
      description = "Login request",
      content = @Content(
        mediaType = "application/json",
        schema = @Schema(implementation = LoginRequest.class)
      )
    ),
    responses = {
      @ApiResponse(
        responseCode = "200",
        description = "OK",
        content = {
          @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = JwtResponse.class)
          ),
        }
      ),
      @ApiResponse(
        responseCode = "400",
        description = "Bad Request",
        content = {
          @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = String.class)
          ),
        }
      ),
      @ApiResponse(
        responseCode = "401",
        description = "Unauthorized",
        content = {
          @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = String.class)
          ),
        }
      ),
      @ApiResponse(
        responseCode = "403",
        description = "Forbidden",
        content = {
          @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = String.class),
            examples = { @ExampleObject(value = "error message") }
          ),
        }
      ),
    }
  )
  public ResponseEntity<?> authenticateUser(
    @RequestBody LoginRequest loginRequest
  ) {
    var username = loginRequest.username();

    if (!userRepository.existsByUsername(username)) {
      if (!userRepository.existsByEmail(username)) {
        return ResponseEntity.badRequest().body("usuário não encontrado.");
      }
      var user = userRepository.findByEmail(username);
      username = user.get().getUsername();
    }

    Authentication auth;
    try {
      auth = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          username,
          loginRequest.password()
        )
      );
    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
        "senha incorreta."
      );
    } catch (LockedException | DisabledException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    SecurityContextHolder.getContext().setAuthentication(auth);
    String jwt = jwtService.generateToken((User) auth.getPrincipal());

    User userDetails = (User) auth.getPrincipal();
    Set<String> roles = userDetails
      .getAuthorities()
      .stream()
      .map(item -> item.getAuthority())
      .collect(Collectors.toSet());

    return ResponseEntity.ok()
      .body(
        new JwtResponse(
          jwt,
          userDetails.getId(),
          userDetails.getUsername(),
          userDetails.getDisplayName(),
          userDetails.getEmail(),
          roles,
          "Bearer"
        )
      );
  }

  @PostMapping("/register")
  public ResponseEntity<String> registerUser(
    @RequestBody SignupRequest signUpRequest
  ) {
    if (userRepository.existsByUsername(signUpRequest.username())) {
      return ResponseEntity.badRequest().body("nome de usuário já cadastrado.");
    }

    if (userRepository.existsByEmail(signUpRequest.email())) {
      return ResponseEntity.badRequest().body("email já cadastrado.");
    }

    User user = new User(
      signUpRequest.username(),
      signUpRequest.displayName(),
      signUpRequest.email(),
      passwordEncoder.encode(signUpRequest.password())
    );

    user.setAuthorities(Set.of(Role.INSERT, Role.UPDATE, Role.DELETE));

    userRepository.save(user);

    return ResponseEntity.ok("usuário cadastrado com sucesso.");
  }
}
