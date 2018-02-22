package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface BookReservationRepository extends CrudRepository<BookReservation, Long> {
    Long countByCopyId(Long id);
    BookReservation findByCopy(Copy copy);
    BookReservation findByCopyId(
            @Param("cid") Long id
    );
}