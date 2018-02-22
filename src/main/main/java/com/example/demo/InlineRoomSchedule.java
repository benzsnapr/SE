package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineRoomSchedule", types = { RoomSchedule.class})
public interface InlineRoomSchedule {
    Long getId();
    Room getRoom();
    int getTimeSlot();
    RoomStatus getRoomStatus();
}
