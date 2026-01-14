package org.example.vendingmachine.dto;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class AmountRequest {
    private Long amount;   // payment / cart amount
}
