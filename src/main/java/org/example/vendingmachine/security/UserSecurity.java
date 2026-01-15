package org.example.vendingmachine.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.entity.User;
import org.example.vendingmachine.service.UserService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserSecurity {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public static final String COOKIE_NAME_CUSTOMER = "AUTH_CUSTOMER";
    public static final String COOKIE_NAME_ADMIN = "AUTH_ADMIN";

    // SET COOKIE ON LOGIN / SIGNUP
    public void setJwtCookie(HttpServletResponse response, User user) {
        String token = jwtUtil.generateToken(user.getId());

        String cookieName =
                Boolean.TRUE.equals(user.getIsAdmin())
                        ? COOKIE_NAME_ADMIN
                        : COOKIE_NAME_CUSTOMER;

        Cookie cookie = new Cookie(cookieName, token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);
    }

    // CUSTOMER AUTH
    public User getAuthenticatedCustomer(HttpServletRequest request) {
        return getUserFromCookie(request, COOKIE_NAME_CUSTOMER);
    }

    // ADMIN AUTH
    public User getAuthenticatedAdmin(HttpServletRequest request) {
        User user = getUserFromCookie(request, COOKIE_NAME_ADMIN);
        return (user != null && Boolean.TRUE.equals(user.getIsAdmin())) ? user : null;
    }

    private User getUserFromCookie(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if (cookieName.equals(cookie.getName())) {
                try {
                    Long userId = jwtUtil.getUserId(cookie.getValue());
                    return userService.getUserById(userId);
                } catch (Exception e) {
                    return null;
                }
            }
        }
        return null;
    }
}
