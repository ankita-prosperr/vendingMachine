package org.example.vendingmachine.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateSlotRequest {

    @NotBlank
    private String itemName;

    @Positive
    private double price;

    @PositiveOrZero
    private int quantity;
}
