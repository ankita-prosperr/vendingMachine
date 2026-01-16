package org.example.vendingmachine.repository;

import org.example.vendingmachine.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByVendingMachine_VendingMachineId(Long vendingMachineId);

    boolean existsByVendingMachine_VendingMachineIdAndItemName(
            Long vendingMachineId,
            String itemName
    );

    boolean existsByVendingMachine_VendingMachineIdAndItemNameAndQuantityGreaterThan(
            Long vendingMachineId,
            String itemName,
            int quantity
    );


}
