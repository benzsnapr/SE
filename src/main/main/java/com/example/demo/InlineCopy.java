package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineCopy", types = { Copy.class})
interface InlineCopy {

    Long getId();
    CopyStatus getStatus();
    String getNote();
    Book getBook();


}