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

import java.util.Optional;

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

    public User createUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public String updateUser(User user) {
        Optional<User> existingUserOptional = userRepository.findById(user.getId());

        if (existingUserOptional.isEmpty()) {
            throw new UsernameNotFoundException("Utilisateur non trouvé pour l'ID : " + user.getId());
        }

        User existingUser = existingUserOptional.get();

        // Met à jour uniquement les champs modifiés
        if (user.getUsername() != null && !user.getUsername().isEmpty()) {
            existingUser.setUsername(user.getUsername());
        }

        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            existingUser.setEmail(user.getEmail());
        }

        // Sauvegarde des modifications dans le repository
        userRepository.save(existingUser);

        String token = jwtService.generateToken(existingUser.getEmail());
        return token;
    }


}