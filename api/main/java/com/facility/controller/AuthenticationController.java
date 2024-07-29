package com.facility.controller;

import com.facility.enums.Role;
import com.facility.model.User;
import com.facility.repository.UserRepository;
import com.facility.service.JwtService;
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
@RequestMapping("auth")
public class AuthenticationController {

  public record LoginRequest(String username, String password) {}

  public record SignupRequest(String username, String email, String password) {}

  public record JwtResponse(
    String token,
    Long id,
    String username,
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
  public ResponseEntity<?> authenticateUser(
    @RequestBody LoginRequest loginRequest
  ) {
    if (!userRepository.existsByUsername(loginRequest.username())) {
      return ResponseEntity.badRequest().body("usuário não encontrado.");
    }

    Authentication auth;
    try {
      auth = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          loginRequest.username(),
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
          userDetails.getEmail(),
          roles,
          "Bearer"
        )
      );
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(
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
      signUpRequest.email(),
      passwordEncoder.encode(signUpRequest.password())
    );

    user.setAuthorities(Set.of(Role.INSERT, Role.UPDATE, Role.DELETE));

    userRepository.save(user);

    return ResponseEntity.ok("usuário cadastrado com sucesso.");
  }
}
