package org.example.vendingmachine.service;

import org.example.vendingmachine.entity.User;
import org.example.vendingmachine.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // CREATE
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // READ by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // READ all
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // UPDATE
    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id);

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());

        return userRepository.save(existingUser);
    }

    // DELETE
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // LOGIN
    public User login(String email, String password, Boolean isAdmin) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.getIsAdmin().equals(isAdmin)) {
            throw new RuntimeException("Role mismatch");
        }

        return user;
    }
}
