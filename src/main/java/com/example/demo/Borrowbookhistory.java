package com.example.demo;

import lombok.Data;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Entity
public class Borrowbookhistory  {

    private @Id
    @GeneratedValue
    Long id;

    @OneToOne
    private Copy copy;

    @ManyToOne
    private Member member;

    @ManyToOne
    private Librarian librarian;

    private Date startDate;
    private Date endDate;

    private Borrowbookhistory () {}

    public Borrowbookhistory (Copy copy,Member member, Date startDate, Date endDate, Librarian librarian){
        this.copy = copy;
        this.member = member;
        this.startDate = startDate;
        this.endDate = endDate;
        this.librarian = librarian;

    }
}


