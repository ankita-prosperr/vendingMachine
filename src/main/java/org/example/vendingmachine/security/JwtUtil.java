package org.example.vendingmachine.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Must be at least 256 bits for HS256
    private static final String SECRET_STRING =
            "super-long-secure-secret-key-for-jwt-1234567890-super-secure";

    private static final Key SECRET_KEY =
            Keys.hmacShaKeyFor(SECRET_STRING.getBytes());

    public String generateToken(Long userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public Long getUserId(String token) {
        return Long.parseLong(
                Jwts.parserBuilder()
                        .setSigningKey(SECRET_KEY)
                        .build()
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject()
        );
    }
}
