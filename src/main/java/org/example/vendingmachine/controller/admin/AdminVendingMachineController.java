package org.example.vendingmachine.controller.admin;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.Exception.ResourceNotFoundException;
import org.example.vendingmachine.dto.AmountRequest;
import org.example.vendingmachine.dto.CreateVendingMachineRequest;
import org.example.vendingmachine.dto.VendingMachineResponse;
import org.example.vendingmachine.entity.VendingMachine;
import org.example.vendingmachine.repository.VendingMachineRepository;
import org.example.vendingmachine.service.VendingMachineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin/vending-machines")
@RequiredArgsConstructor
public class AdminVendingMachineController {

    private final VendingMachineService vendingMachineService;
    private final VendingMachineRepository vendingMachineRepository;

    //  Create vending machine (with rows & columns)
    @PostMapping
    public ResponseEntity<VendingMachine> createVendingMachine(
            @Valid @RequestBody CreateVendingMachineRequest request
    ) {
        VendingMachine vm = vendingMachineService.createMachine(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(vm);
    }

    // Get all vending machines
    @GetMapping
    public List<VendingMachineResponse> getAllVendingMachines() {
        return vendingMachineService.getAllMachines();
    }

    @DeleteMapping("/{vmId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVendingMachine(@PathVariable Long vmId) {
        vendingMachineService.deleteVendingMachine(vmId);
    }

}

