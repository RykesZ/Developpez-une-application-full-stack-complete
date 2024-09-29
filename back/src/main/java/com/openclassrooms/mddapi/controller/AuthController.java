package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserPublic;
import com.openclassrooms.mddapi.model.LoginParameters;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.AuthService;
import com.openclassrooms.mddapi.service.JWTService;
import com.openclassrooms.mddapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
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

  @Operation(summary = "Get self infos", description = "Allow the current authenticated user to get their own infos")
  @SecurityRequirement(name = "Bearer Authentication")
  @CrossOrigin(origins = "http://localhost:4200")
  @GetMapping("auth/me")
  @Transactional
  public UserPublic getMe() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return new UserPublic((User)principal);
  }

  @PostMapping("auth/register")
  public ResponseEntity<String> createUser(@RequestBody User user) {

    User createdUser = userService.createUser(user);
    if (createdUser != null) {
      String token = jwtService.generateToken(user.getEmail());
      JSONObject responseJson = new JSONObject();
      responseJson.put("token", token);
      return ResponseEntity.ok(responseJson.toString());
    } else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Informations incorrectes");
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

