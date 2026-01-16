package org.example.vendingmachine.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "slot",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {
                        "vending_machine_id",
                        "row_number",
                        "column_number"
                })
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vending_machine_id", nullable = false)
    private VendingMachine vendingMachine;

    @Column(name = "row_number", nullable = false)
    private int rowNumber;

    @Column(name = "column_number", nullable = false)
    private int columnNumber;

    @Column(name = "item_name")
    private String itemName; // STORED IN CAPS

    private Double price;

    @Column(nullable = false)
    private Integer quantity;
}

