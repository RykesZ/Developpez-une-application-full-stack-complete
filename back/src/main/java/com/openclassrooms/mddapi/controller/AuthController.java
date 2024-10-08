package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserPublic;
import com.openclassrooms.mddapi.model.LoginParameters;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.AuthService;
import com.openclassrooms.mddapi.service.JWTService;
import com.openclassrooms.mddapi.service.UserService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
  public ResponseEntity<String> createUser(@RequestBody User user) {
    try {
      User createdUser = userService.createUser(user);
      String token = jwtService.generateToken(createdUser.getEmail());
      JSONObject responseJson = new JSONObject();
      responseJson.put("token", token);
      return ResponseEntity.ok(responseJson.toString());
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Une erreur s'est produite lors de la création de l'utilisateur.");
    }
  }

  @PostMapping("auth/login")
  public ResponseEntity<Object>  getToken(@RequestBody LoginParameters loginParameters) {
    User authenticatedUser = authService.authenticateUser(loginParameters.getIdentifier(), loginParameters.getPassword());

    if (authenticatedUser != null) {
      String token = jwtService.generateToken(authenticatedUser.getEmail());
      JSONObject responseJson = new JSONObject();
      responseJson.put("token", token);
      return ResponseEntity.ok(responseJson.toString());
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
    }
  }
}

