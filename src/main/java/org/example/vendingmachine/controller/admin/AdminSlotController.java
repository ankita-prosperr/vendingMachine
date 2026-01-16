package org.example.vendingmachine.controller.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.example.vendingmachine.dto.SlotResponseDto;
import org.example.vendingmachine.dto.UpdateItemRequest;
import org.example.vendingmachine.dto.UpdateSlotRequest;
import org.example.vendingmachine.entity.Slot;
import org.example.vendingmachine.repository.SlotRepository;
import org.example.vendingmachine.service.SlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminSlotController {

    private final SlotService slotService;

    // Get all slots of a vending machine
    @GetMapping("/vending-machines/{vmId}/slots")
    public List<SlotResponseDto> getSlots(@PathVariable Long vmId) {
        return slotService.getSlotsByVendingMachine(vmId);
    }

    // Put item in empty slot
    @PutMapping("/slots/{slotId}/item")
    public SlotResponseDto putItemInSlot(
            @PathVariable Long slotId,
            @Valid @RequestBody UpdateSlotRequest request
    ) throws BadRequestException {
        return slotService.putItemInSlot(slotId, request);
    }

    // Edit existing item
    @PatchMapping("/slots/{slotId}/item")
    public SlotResponseDto updateSlotItem(
            @PathVariable Long slotId,
            @Valid @RequestBody UpdateItemRequest request
    ) throws BadRequestException {
        return slotService.updateSlotItem(slotId, request);
    }
}


