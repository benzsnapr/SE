package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineOtherlibery", types = { Otherlibery.class})
interface InlineOtherlibery {

    Long getId();
    String getOtherlibery();
    String getAddess();

}