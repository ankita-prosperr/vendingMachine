package org.example.vendingmachine.repository;

import org.example.vendingmachine.entity.VendingMachine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendingMachineRepository
        extends JpaRepository<VendingMachine, Long> {

    boolean existsByMachineName(String machineName);
}
