package org.example.vendingmachine.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class SlotResponseDto {

    private Long slotId;
    private int rowNumber;
    private int columnNumber;
    private String itemName;
    private Double price;
    private int quantity;
}
