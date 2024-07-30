package com.facility.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  @Value("${application.security.jwt.secret-key}")
  private String secretKey;

  @Value("${application.security.jwt.expiration}")
  private long jwtExpiration;

  public String generateToken(UserDetails userDetails) {
    return Jwts.builder()
      .subject(userDetails.getUsername())
      .issuedAt(new Date(System.currentTimeMillis()))
      .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
      .signWith(getSecretKey(), Jwts.SIG.HS256)
      .compact();
  }

  public String verifyToken(String jws) {
    return Jwts.parser()
      .clockSkewSeconds(3 * 60) // 3 minutes
      .verifyWith(getSecretKey())
      .build()
      .parseSignedClaims(jws)
      .getPayload()
      .getSubject();
  }

  private SecretKey getSecretKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
