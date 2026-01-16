package org.example.vendingmachine.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateVendingMachineRequest {

    @NotBlank
    private String machineName;

    @Min(1)
    private int rows;

    @Min(1)
    private int columns;
}

