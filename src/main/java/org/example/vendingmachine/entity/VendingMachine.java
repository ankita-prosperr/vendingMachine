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
    private Long vendingMachineId;

    @Column(nullable = false, unique = true)
    private String machineName;

    @Column(nullable = false)
    private int rows;

    @Column(nullable = false)
    private int columns;

    @Column(nullable = false)
    private double totalAmount;

    @OneToMany(
            mappedBy = "vendingMachine",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Slot> slots;

}

