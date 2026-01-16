package org.example.vendingmachine.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.entity.VendingMachine;
import org.example.vendingmachine.repository.VendingMachineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    @Transactional
    public VendingMachine addToTotalAmount(Long id, Long amount) {
        VendingMachine vm = vendingMachineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vending Machine not found"));

        // ADD payment amount, don't set
        vm.setTotalAmount(vm.getTotalAmount() + amount);

        return vendingMachineRepository.save(vm);
    }

    public void deleteMachine(Long id) {
        VendingMachine vm = vendingMachineRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Vending machine not found"
                ));

        vendingMachineRepository.delete(vm);
    }
}
