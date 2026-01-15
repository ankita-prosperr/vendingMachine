package org.example.vendingmachine.controller.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.vendingmachine.dto.AmountRequest;
import org.example.vendingmachine.entity.User;
import org.example.vendingmachine.entity.VendingMachine;
import org.example.vendingmachine.security.UserSecurity;
import org.example.vendingmachine.service.VendingMachineService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin/vending-machines")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AdminVendingMachineController {

    private final VendingMachineService vendingMachineService;
    private final UserSecurity userSecurity;

    // Admin: create vending machine
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VendingMachine create(
            @Valid @RequestBody VendingMachine vm,
            HttpServletRequest request
    ) {
        User admin = userSecurity.getAuthenticatedAdmin(request);
        if (admin == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Admin login required"
            );
        }
        System.out.println("Saving vending machine: " + vm.getMachineName());
        return vendingMachineService.createMachine(vm);
    }

    // User: see all vending machines
    @GetMapping
    public List<VendingMachine> getAll(HttpServletRequest request) {
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
        return vendingMachineService.getAllMachines();
    }

    // Customer: update total amount
    @PatchMapping("/{id}/amount")
    @ResponseStatus(HttpStatus.OK)
    public VendingMachine addToTotalAmount(
            @PathVariable Long id,
            @RequestBody AmountRequest requestBody,
            HttpServletRequest request
    ) {
        User customer = userSecurity.getAuthenticatedCustomer(request);
        if (customer == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Customer login required"
            );
        }
        return vendingMachineService.addToTotalAmount(id, requestBody.getAmount());
    }

}
