package org.example.vendingmachine.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.example.vendingmachine.entity.User;
import org.example.vendingmachine.security.UserSecurity;
import org.example.vendingmachine.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserService userService;
    private final UserSecurity userSecurity;

    public UserController(UserService userService, UserSecurity userSecurity) {
        this.userService = userService;
        this.userSecurity = userSecurity;
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody User user, HttpServletResponse response) {
        try {
            // Check if user already exists by email
            if (userService.getAllUsers().stream()
                    .anyMatch(u -> u.getEmail().equalsIgnoreCase(user.getEmail()))) {
                return ResponseEntity
                        .status(409)
                        .body("User already registered. Please login.");
            }
            // Create user
            User createdUser = userService.createUser(user);

            // Set JWT cookie (ADMIN or CUSTOMER)
            userSecurity.setJwtCookie(response, createdUser);

            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            // Catch any DB-level constraint violation
            return ResponseEntity
                    .status(500)
                    .body("Error creating user: " + e.getMessage());
        }
    }

    // READ BY ID
    @GetMapping("/getUser/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // READ ALL
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // UPDATE
    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }


    // DELETE
    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user, HttpServletResponse response) {

        User dbUser = userService.login(
                user.getEmail(),
                user.getPassword(),
                user.getIsAdmin()
        );

        if (dbUser == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        // SET JWT COOKIE (ADMIN or CUSTOMER)
        userSecurity.setJwtCookie(response, dbUser);

        return dbUser;
    }

    // LOGOUT
    @PostMapping("/logout")
    public String logout(HttpServletResponse response) {

        Cookie customerCookie =
                new Cookie(UserSecurity.COOKIE_NAME_CUSTOMER, null);
        customerCookie.setHttpOnly(true);
        customerCookie.setPath("/");
        customerCookie.setMaxAge(0);

        Cookie adminCookie =
                new Cookie(UserSecurity.COOKIE_NAME_ADMIN, null);
        adminCookie.setHttpOnly(true);
        adminCookie.setPath("/");
        adminCookie.setMaxAge(0);

        response.addCookie(customerCookie);
        response.addCookie(adminCookie);

        return "Logged out successfully";
    }
}
