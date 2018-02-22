package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineLibrarian.class)
public interface LibrarianRepository extends CrudRepository<Librarian, Long> {
    Librarian findByUser(
            @Param("user") User user
    );
}
