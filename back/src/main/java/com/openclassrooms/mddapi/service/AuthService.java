package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Data
@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  private static final Pattern EMAIL_PATTERN = Pattern.compile(
          "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");

  public User authenticateUser(String identifier, String password) {

    User user;

    // Determine if the identifier is an email or username
    if (EMAIL_PATTERN.matcher(identifier).matches()) {
      // If the identifier is a valid email format, find by email
      user = userRepository.findUserByEmail(identifier)
              .orElseThrow(() -> new UsernameNotFoundException("Utilisateur inconnu avec l'email : " + identifier));
    } else {
      // Otherwise, treat it as a username and find by username
      user = userRepository.findUserByUsername(identifier)
              .orElseThrow(() -> new UsernameNotFoundException("Utilisateur inconnu avec le nom d'utilisateur : " + identifier));
    }

    if (user != null && passwordEncoder.matches(password, user.getPassword())) {
      return user;
    } else {
      throw new IllegalArgumentException("Identifiants incorrects");
    }
  }

}
