package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineMember", types = { Member.class})
interface InlineMember {
    Long getId();
    String getFirstName();
    String getLastName();
    String getPhone();
    String getAddress();
    User getUser();
}