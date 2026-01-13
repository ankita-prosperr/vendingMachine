package org.example.vendingmachine.controller.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.dto.UpdateItemRequest;
import org.example.vendingmachine.entity.Item;
import org.example.vendingmachine.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminItemController {

    private final ItemService itemService;

    // Admin: add item OR increase quantity
    @PostMapping("/vending-machines/{vmId}/items")
    @ResponseStatus(HttpStatus.CREATED)
    public Item addOrUpdateItem(
            @PathVariable Long vmId,
            @Valid @RequestBody Item item) {

        return itemService.addOrUpdateItem(vmId, item);
    }

    // PATCH: partial update of item
    @PatchMapping("/items/{itemId}")
    public Item updateItem(
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateItemRequest request) {

        return itemService.updateItem(itemId, request);
    }

    // Admin: view inventory of a vending machine
    @GetMapping("/vending-machines/{vmId}/items")
    public List<Item> getItems(@PathVariable Long vmId) {
        return itemService.getItemsByVendingMachine(vmId);
    }
}
