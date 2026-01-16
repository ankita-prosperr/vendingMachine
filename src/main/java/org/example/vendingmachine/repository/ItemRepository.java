package org.example.vendingmachine.repository;

import org.example.vendingmachine.entity.Item;
import org.example.vendingmachine.enums.ItemName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository
        extends JpaRepository<Item, Long> {

    List<Item> findByVendingMachine_VendingMachineId(Long vendingMachineId);

    Optional<Item> findByVendingMachine_VendingMachineIdAndItemName(
            Long vmId,
            ItemName itemName
    );

}
