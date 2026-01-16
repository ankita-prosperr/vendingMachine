package org.example.vendingmachine.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VendingMachineResponse {

    private Long vendingMachineId;
    private String machineName;
    private int rows;
    private int columns;
    private double totalAmount;
}
