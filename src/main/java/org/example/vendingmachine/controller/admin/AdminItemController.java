package org.example.vendingmachine.controller.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.dto.UpdateItemRequest;
import org.example.vendingmachine.entity.Item;
import org.example.vendingmachine.entity.User;
import org.example.vendingmachine.security.UserSecurity;
import org.example.vendingmachine.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AdminItemController {

    private final ItemService itemService;
    private final UserSecurity userSecurity;

    // Admin: add item OR increase quantity
    @PostMapping("/vending-machines/{vmId}/items")
    @ResponseStatus(HttpStatus.CREATED)
    public Item addOrUpdateItem(
            @PathVariable Long vmId,
            @Valid @RequestBody Item item,
            HttpServletRequest request
    ) {
        User admin = userSecurity.getAuthenticatedAdmin(request);
        if (admin == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Admin login required"
            );
        }
        return itemService.addOrUpdateItem(vmId, item);
    }

    // PATCH: partial update of item
    @PatchMapping("/items/{itemId}")
    public Item updateItem(
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateItemRequest requestBody,
            HttpServletRequest request
    ) {
        User admin = userSecurity.getAuthenticatedAdmin(request);
        if (admin == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Admin login required"
            );
        }
        return itemService.updateItem(itemId, requestBody);
    }

    // Admin: view inventory of a vending machine
    @GetMapping("/vending-machines/{vmId}/items")
    public List<Item> getItems(
            @PathVariable Long vmId,
            HttpServletRequest request
    ) {
        User user =
                userSecurity.getAuthenticatedAdmin(request) != null
                        ? userSecurity.getAuthenticatedAdmin(request)
                        : userSecurity.getAuthenticatedCustomer(request);
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Login required"
            );
        }
        return itemService.getItemsByVendingMachine(vmId);
    }

    @DeleteMapping("/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(
            @PathVariable Long itemId,
            HttpServletRequest request
    ) {
        User admin = userSecurity.getAuthenticatedAdmin(request);
        if (admin == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Admin login required"
            );
        }

        itemService.deleteItem(itemId);
    }
}
