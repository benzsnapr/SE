package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String isbn;
    private String author;
    private String published;
    private String description;
    private String language;
    private String image;


    private Book() {}

    public Book(String name, String isbn,String author, String published, String description, String language, String image){
        this.name = name;
        this.isbn = isbn;
        this.author = author;
        this.published = published;
        this.description = description;
        this.language = language;
        this.image = image;
    }

}
