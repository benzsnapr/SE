package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineRoom", types = { Room.class})
public interface InlineRoom {
    Long getId();
    String getName();
}
