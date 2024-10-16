package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.TokenDTO;
import com.openclassrooms.mddapi.dto.UpdateUserDTO;
import com.openclassrooms.mddapi.dto.UserPublic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  private UserService userService;

  @Operation(summary = "Get user infos", description = "Allow the current authenticated user to get their own infos")
  @SecurityRequirement(name = "Bearer Authentication")
  @GetMapping("/user/{id}")
  public ResponseEntity<?> getUser(@PathVariable Long id) {
    Optional<User> user = userService.getUserById(id);
    if (user.isPresent()) {
      return ResponseEntity.ok(new UserPublic(user.get()));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur inexistant pour cet id");
    }
  }


  @Operation(summary = "Get self infos", description = "Allow the current authenticated user to get their own infos")
  @SecurityRequirement(name = "Bearer Authentication")
  @CrossOrigin(origins = "http://localhost:4200")
  @GetMapping("user/me")
  public UserPublic getMe() {
    User currentUser = getCurrentUser();
    return new UserPublic(currentUser);
  }

  @Operation(summary = "Update user infos", description = "Allow the current authenticated user to update their own infos")
  @SecurityRequirement(name = "Bearer Authentication")
  @PutMapping("/user/update")
  public ResponseEntity<TokenDTO> updateUser(@RequestBody UpdateUserDTO updatedUser) {
    User currentUser = getCurrentUser();
    currentUser.setUsername(updatedUser.getUsername());
    currentUser.setEmail(updatedUser.getEmail());
    currentUser.setPassword(updatedUser.getPassword());

    String token = userService.updateUser(currentUser);
    TokenDTO tokenDTO = new TokenDTO(token);
    return ResponseEntity.ok(tokenDTO);
  }

  private User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
      throw new RuntimeException("User not authenticated or invalid authentication type");
    }
    return (User) authentication.getPrincipal();
  }
}
