package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsernameAndPassword(
            @Param("username") String username,
            @Param("password") String password
    );

    User findByUsername(
            @Param("username") String username
    );
}