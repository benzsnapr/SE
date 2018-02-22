package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface OtherBookRepository extends CrudRepository<OtherBook, Long> {
    OtherBook findByName(
            @Param("name") String name
    );
}