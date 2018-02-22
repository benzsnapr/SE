package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineRoomStatus.class)
public interface RoomStatusRepository extends CrudRepository<RoomStatus, Long> {

}
