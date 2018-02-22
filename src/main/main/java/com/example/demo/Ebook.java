package com.example.demo;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

import lombok.Data;

@Data
@Entity
public class Ebook {

    private @Id @GeneratedValue Long id;
    @Pattern(regexp = "http.{1,200}")
    @NotNull
    private String url1;

    @Pattern(regexp = "http.{1,200}")
    private String url2;
    private Date dateandtime = new Date();

    @NotNull
    @OneToOne
    private Book book;

    @NotNull
    @ManyToOne
    private Librarian librarian;

    private Ebook() {}

    public Ebook(String url1,String url2, Book book, Librarian librarian) {
        this.url1 = url1;
        this.url2 = url2;
        this.book = book;
        this.librarian = librarian;
    }
}
