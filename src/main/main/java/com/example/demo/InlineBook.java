package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineBook", types = { Book.class})
interface InlineBook {

    Long getId();
    //String getStatus();
    //Book getBook();

    String getName();
    String getIsbn();
    String getAuthor();
    String getPublished();
    String getDescription();
    String getLanguage();
    String getImage();

}