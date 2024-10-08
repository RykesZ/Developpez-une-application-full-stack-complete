package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserPublic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.Data;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.util.PasswordValidator;

import java.util.Optional;
import java.util.regex.Pattern;

@Data
@Service
public class UserService  {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    public Optional<User> getUserByEmail(final String email) {
        return userRepository.findUserByEmail(email);
    }

    public Optional<User> getUserByUsername(final String email) {
        return userRepository.findUserByEmail(email);
    }

    public Optional<User> getUserById(final Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) throws IllegalArgumentException {

        if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("L'adresse email n'est pas valide.");
        }

        if (!PasswordValidator.isValid(user.getPassword())) {
            throw new IllegalArgumentException("Le mot de passe ne respecte pas les exigences de sécurité.");
        }

        if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Cette adresse email est déjà utilisée.");
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public String updateUser(User user) throws IllegalArgumentException {
        Optional<User> existingUserOptional = userRepository.findById(user.getId());

        if (existingUserOptional.isEmpty()) {
            throw new UsernameNotFoundException("Utilisateur non trouvé pour l'ID : " + user.getId());
        }

        User existingUser = existingUserOptional.get();

        if (user.getUsername() != null && !user.getUsername().isEmpty()) {
            existingUser.setUsername(user.getUsername());
        }

        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            if (!isValidEmail(user.getEmail())) {
                throw new IllegalArgumentException("L'adresse email n'est pas valide.");
            }
            if (!user.getEmail().equals(existingUser.getEmail()) &&
                    userRepository.findUserByEmail(user.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Cette adresse email est déjà utilisée.");
            }
            existingUser.setEmail(user.getEmail());
        }

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            if (!PasswordValidator.isValid(user.getPassword())) {
                throw new IllegalArgumentException("Le nouveau mot de passe ne respecte pas les exigences de sécurité.");
            }
            if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                String encodedPassword = passwordEncoder.encode(user.getPassword());
                existingUser.setPassword(encodedPassword);
            }
        }

        userRepository.save(existingUser);

        String token = jwtService.generateToken(existingUser.getEmail());
        return token;
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

}