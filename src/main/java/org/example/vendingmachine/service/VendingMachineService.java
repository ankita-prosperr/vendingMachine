package org.example.vendingmachine.service;

import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.entity.VendingMachine;
import org.example.vendingmachine.repository.VendingMachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendingMachineService {

    private final VendingMachineRepository vendingMachineRepository;

    public List<VendingMachine> getAllMachines() {
        return vendingMachineRepository.findAll();
    }

    public VendingMachine createMachine(VendingMachine machine) {
        System.out.println("Saving vending machine: ");

        if (vendingMachineRepository.existsByMachineName(machine.getMachineName())) {
            throw new IllegalArgumentException("Vending machine already exists");
        }

        machine.setTotalAmount(0.0);
        return vendingMachineRepository.save(machine);
    }

    public VendingMachine getById(Long id) {
        return vendingMachineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vending machine not found"));
    }
}
