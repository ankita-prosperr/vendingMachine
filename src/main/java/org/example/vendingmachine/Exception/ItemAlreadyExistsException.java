package org.example.vendingmachine.Exception;

public class ItemAlreadyExistsException extends RuntimeException {
    public ItemAlreadyExistsException(String msg) {
        super(msg);
    }
}