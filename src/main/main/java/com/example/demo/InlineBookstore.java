package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineBookstore", types = { Bookstore.class})
interface InlineBookstore {

    Long getId();

    String getname();
    String getprice();


}