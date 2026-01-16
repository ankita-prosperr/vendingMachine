package org.example.vendingmachine.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.Exception.ResourceNotFoundException;
import org.example.vendingmachine.dto.CreateVendingMachineRequest;
import org.example.vendingmachine.dto.VendingMachineResponse;
import org.example.vendingmachine.entity.Slot;
import org.example.vendingmachine.entity.VendingMachine;
import org.example.vendingmachine.repository.SlotRepository;
import org.example.vendingmachine.repository.VendingMachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VendingMachineService {

    private final VendingMachineRepository vendingMachineRepository;
    private final SlotRepository slotRepository;

    public VendingMachine createMachine(CreateVendingMachineRequest req) {

        VendingMachine vm = VendingMachine.builder()
                .machineName(req.getMachineName())
                .rows(req.getRows())
                .columns(req.getColumns())
                .totalAmount(0)
                .build();

        vendingMachineRepository.save(vm);

        for (int r = 1; r <= req.getRows(); r++) {
            for (int c = 1; c <= req.getColumns(); c++) {
                slotRepository.save(
                        Slot.builder()
                                .vendingMachine(vm)
                                .rowNumber(r)
                                .columnNumber(c)
                                .quantity(0)
                                .build()
                );
            }
        }
        return vm;
    }

    public List<VendingMachineResponse> getAllMachines() {
        return vendingMachineRepository.findAll()
                .stream()
                .map(vm -> VendingMachineResponse.builder()
                        .vendingMachineId(vm.getVendingMachineId())
                        .machineName(vm.getMachineName())
                        .rows(vm.getRows())
                        .columns(vm.getColumns())
                        .totalAmount(vm.getTotalAmount())
                        .build()
                )
                .toList();
    }

    public void deleteVendingMachine(Long vmId) {
        VendingMachine vm = vendingMachineRepository.findById(vmId)
                .orElseThrow(() -> new ResourceNotFoundException("Vending machine not found"));

        vendingMachineRepository.delete(vm);
    }

}
