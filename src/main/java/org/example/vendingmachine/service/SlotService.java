package org.example.vendingmachine.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.example.vendingmachine.Exception.ItemAlreadyExistsException;
import org.example.vendingmachine.Exception.ResourceNotFoundException;
import org.example.vendingmachine.Exception.SlotOccupiedException;
import org.example.vendingmachine.dto.SlotResponseDto;
import org.example.vendingmachine.dto.UpdateItemRequest;
import org.example.vendingmachine.dto.UpdateSlotRequest;
import org.example.vendingmachine.entity.Slot;
import org.example.vendingmachine.repository.SlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SlotService {

    private final SlotRepository slotRepository;

    @Transactional
    public SlotResponseDto updateSlotItem(Long slotId, UpdateItemRequest request) throws BadRequestException {

        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        if (slot.getItemName() == null) {
            throw new BadRequestException("No item present in this slot");
        }

        if (request.getPrice() != null) {
            slot.setPrice(request.getPrice());
        }

        if (request.getQuantity() != null) {
            slot.setQuantity(request.getQuantity());

            if (request.getQuantity() == 0) {
                slot.setItemName(null);
                slot.setPrice(null);
            }
        }


        slotRepository.save(slot);

        return mapToDto(slot);
    }


    public List<SlotResponseDto> getSlotsByVendingMachine(Long vmId) {

        List<Slot> slots = slotRepository
                .findByVendingMachine_VendingMachineId(vmId);

        return slots.stream()
                .map(slot -> SlotResponseDto.builder()
                        .slotId(slot.getSlotId())
                        .rowNumber(slot.getRowNumber())
                        .columnNumber(slot.getColumnNumber())
                        .itemName(slot.getItemName())
                        .price(slot.getPrice())
                        .quantity(slot.getQuantity())
                        .build()
                )
                .toList();
    }

    @Transactional
    public SlotResponseDto putItemInSlot(Long slotId, UpdateSlotRequest request) throws BadRequestException {

        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        if (slot.getItemName() != null) {
            throw new BadRequestException("Slot already contains an item");
        }

        String itemName = request.getItemName().toUpperCase();

        boolean itemExists = slotRepository
                .existsByVendingMachine_VendingMachineIdAndItemNameAndQuantityGreaterThan(
                        slot.getVendingMachine().getVendingMachineId(),
                        itemName,
                        0
                );

        if (itemExists) {
            throw new BadRequestException("Another Slot contains the similar item");
        }

        slot.setItemName(itemName);
        slot.setPrice(request.getPrice());
        slot.setQuantity(request.getQuantity());

        slotRepository.save(slot);

        return mapToDto(slot);
    }

    private SlotResponseDto mapToDto(Slot slot) {
        return SlotResponseDto.builder()
                .slotId(slot.getSlotId())
                .rowNumber(slot.getRowNumber())
                .columnNumber(slot.getColumnNumber())
                .itemName(slot.getItemName())
                .price(slot.getPrice())
                .quantity(slot.getQuantity())
                .build();
    }



}