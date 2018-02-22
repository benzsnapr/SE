package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineLibrarian", types = { Librarian.class})
interface InlineLibrarian {
    Long getId();
    String getFirstName();
    String getLastName();
    String getPhone();
    String getAddress();
    User getUser();
}