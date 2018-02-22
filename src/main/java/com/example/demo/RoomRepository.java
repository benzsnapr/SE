package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineRoom.class)
public interface RoomRepository extends CrudRepository<Room, Long> {
    Room findByName(
            @Param("name") String name
    );

}
