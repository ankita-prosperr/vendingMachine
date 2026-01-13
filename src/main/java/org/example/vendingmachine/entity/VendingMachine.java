package org.example.vendingmachine.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "vending_machine")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendingMachine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vending_machine_id")
    private Long vendingMachineId;

    @NotBlank(message = "Vending machine name cannot be empty")
    @Column(name = "machine_name", nullable = false, unique = true)
    private String machineName;

    @PositiveOrZero(message = "Total amount cannot be negative")
    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @OneToMany(
            mappedBy = "vendingMachine",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore
    private List<Item> items;
}
