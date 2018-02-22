package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "regbook")
public class Regbook {
    @Id
    @GeneratedValue
    private Long id;
    private Date date;
    private int amount;

    @ManyToOne
    private Book book;

    @ManyToOne
    private Librarian librarian;

    private Regbook() {}

    public Regbook(Book book,Date date,Librarian librarian,int amount){
        this.book = book;
        this.date = date;
        this.librarian = librarian;
        this.amount = amount;
    }

}
