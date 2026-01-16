package org.example.vendingmachine.service;

import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.dto.UpdateItemRequest;
import org.example.vendingmachine.entity.Item;
import org.example.vendingmachine.entity.VendingMachine;
import org.example.vendingmachine.repository.ItemRepository;
import org.example.vendingmachine.repository.VendingMachineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final VendingMachineRepository vendingMachineRepository;

    // ADMIN: Add or increase item
    public Item addOrUpdateItem(Long vmId, Item item) {

        VendingMachine vm = vendingMachineRepository.findById(vmId)
                .orElseThrow(() -> new IllegalArgumentException("Vending machine not found"));

        return itemRepository
                .findByVendingMachine_VendingMachineIdAndItemName(vmId, item.getItemName())
                .map(existingItem -> {
                    existingItem.setQuantity(
                            existingItem.getQuantity() + item.getQuantity()
                    );
                    existingItem.setPrice(item.getPrice());
                    return itemRepository.save(existingItem);
                })
                .orElseGet(() -> {
                    item.setVendingMachine(vm);
                    return itemRepository.save(item);
                });
    }

    public Item updateItem(Long itemId, UpdateItemRequest request) {

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));

        // Update quantity if provided
        if (request.getQuantity() != null) {
            item.setQuantity(request.getQuantity());
        }

        // Update price if provided
        if (request.getPrice() != null) {
            item.setPrice(request.getPrice());
        }

        return itemRepository.save(item);
    }

    // ADMIN + USER: View items (including quantity = 0)
    public List<Item> getItemsByVendingMachine(Long vmId) {
        return itemRepository.findByVendingMachine_VendingMachineId(vmId);
    }

    public void deleteItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Item not found"
                ));

        itemRepository.delete(item);
    }

}
