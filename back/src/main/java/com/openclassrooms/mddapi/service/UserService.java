package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserPublic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
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


}