package org.example.vendingmachine.controller.admin;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.entity.VendingMachine;
import org.example.vendingmachine.service.VendingMachineService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/vending-machines")
@RequiredArgsConstructor
public class AdminVendingMachineController {

    private final VendingMachineService vendingMachineService;

    // Admin: create vending machine
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VendingMachine create(@Valid @RequestBody VendingMachine vm) {
        System.out.println("Saving vending machine: " + vm.getMachineName());
        return vendingMachineService.createMachine(vm);
    }

    // Admin: see all vending machines
    @GetMapping
    public List<VendingMachine> getAll() {
        return vendingMachineService.getAllMachines();
    }
}
