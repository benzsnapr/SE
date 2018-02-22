package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineComputer", types = { Computer.class})
interface InlineComputer {

    String getId();
    String getComnumber();
    String getNote();
    ComStatus getStatus();



}