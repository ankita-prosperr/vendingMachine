package org.example.vendingmachine.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer quantity;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "vending_machine_id")
    private VendingMachine vendingMachine;

    // Getters and Setters
}
