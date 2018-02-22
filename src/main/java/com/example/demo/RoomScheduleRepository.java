package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineRoomSchedule.class)
public interface RoomScheduleRepository extends CrudRepository<RoomSchedule, Long> {

}
