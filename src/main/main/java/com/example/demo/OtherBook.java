package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Data
@Entity
public class OtherBook {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String language;
    private String image;
    private String author;
    @ManyToOne
    private Otherlibery otherlibery;

    private OtherBook(){}
    public OtherBook(String name, String language, String author, String image, Otherlibery otherlibery) {
        this.name = name;
        this.language = language;
        this.author = author;
        this.image = image;
        this.otherlibery = otherlibery;
    }
}
