package com.facility.controller;

import com.facility.dto.auth.JwtResponse;
import com.facility.dto.auth.LoginRequest;
import com.facility.dto.auth.SignupRequest;
import com.facility.enums.Role;
import com.facility.model.User;
import com.facility.repository.UserRepository;
import com.facility.service.JwtService;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

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
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginRequest.getUsername(),
        loginRequest.getPassword()
      )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtService.generateToken((User) authentication.getPrincipal());

    User userDetails = (User) authentication.getPrincipal();
    Set<String> roles = userDetails
      .getAuthorities()
      .stream()
      .map(item -> item.getAuthority())
      .collect(Collectors.toSet());

    return ResponseEntity.ok(
      new JwtResponse(
        jwt,
        userDetails.getId(),
        userDetails.getUsername(),
        userDetails.getEmail(),
        roles
      )
    );
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(
    @RequestBody SignupRequest signUpRequest
  ) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body("nome de usuário já cadastrado.");
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body("email já cadastrado.");
    }

    User user = new User(
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      passwordEncoder.encode(signUpRequest.getPassword())
    );

    Set<Role> roles = new HashSet<>();
    roles.add(Role.ROLE_USER);
    if (signUpRequest.getRoles() != null) {
      roles.addAll(signUpRequest.getRoles());
    }
    user.setAuthorities(roles);

    userRepository.save(user);

    return ResponseEntity.ok("usuário cadastrado com sucesso.");
  }
}
