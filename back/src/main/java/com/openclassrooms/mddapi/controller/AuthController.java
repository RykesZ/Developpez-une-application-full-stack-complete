package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.TokenDTO;
import com.openclassrooms.mddapi.model.LoginParameters;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.AuthService;
import com.openclassrooms.mddapi.service.JWTService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

  @Autowired
  private UserService userService;

  @Autowired
  private AuthService authService;

  @Autowired
  private JWTService jwtService;

  @PostMapping("auth/register")
  public ResponseEntity<TokenDTO> createUser(@RequestBody User user) {
    User createdUser = userService.createUser(user);
    String token = jwtService.generateToken(createdUser.getEmail());
    TokenDTO tokenDTO = new TokenDTO(token);
    return ResponseEntity.ok(tokenDTO);
  }

  @PostMapping("auth/login")
  public ResponseEntity<TokenDTO> getToken(@RequestBody LoginParameters loginParameters) {
    User authenticatedUser = authService.authenticateUser(loginParameters.getIdentifier(), loginParameters.getPassword());
    String token = jwtService.generateToken(authenticatedUser.getEmail());
    TokenDTO tokenDTO = new TokenDTO(token);
    return ResponseEntity.ok(tokenDTO);
  }
}


