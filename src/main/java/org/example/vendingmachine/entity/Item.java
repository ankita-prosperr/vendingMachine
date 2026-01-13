package org.example.vendingmachine.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.example.vendingmachine.enums.ItemName;

@Entity
@Table(
        name = "item",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"vending_machine_id", "item_name"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @NotNull(message = "Item name is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "item_name", nullable = false)
    private ItemName itemName;

    @NotNull
    @PositiveOrZero(message = "Quantity cannot be negative")
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @Positive(message = "Price must be greater than zero")
    @Column(name = "price", nullable = false)
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vending_machine_id", nullable = false)
    @JsonIgnore
    private VendingMachine vendingMachine;
}