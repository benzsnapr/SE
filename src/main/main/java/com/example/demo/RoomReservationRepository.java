package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface RoomReservationRepository extends CrudRepository<RoomReservation, Long> {
    Long countByMemberId(
            @Param("countM") Long id
    );
}
