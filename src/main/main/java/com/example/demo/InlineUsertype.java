package com.example.demo;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineUsertype", types = { Usertype.class})
public interface InlineUsertype {
    Long getId();
    String getType();
}
