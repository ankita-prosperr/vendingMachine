package org.example.vendingmachine.repository;

import org.example.vendingmachine.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
