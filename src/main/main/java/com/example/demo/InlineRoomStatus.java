package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineRoomStatus", types = { RoomStatus.class})
public interface InlineRoomStatus {
    Long getId();
    String getStatus();
}
