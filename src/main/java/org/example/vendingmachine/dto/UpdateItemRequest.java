package org.example.vendingmachine.dto;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class UpdateItemRequest {

    @PositiveOrZero(message = "Quantity cannot be negative")
    private Integer quantity;

    @Positive(message = "Price must be greater than zero")
    private Double price;
}