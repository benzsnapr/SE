package com.example.demo;

import lombok.Data;

import javax.annotation.Generated;
import javax.persistence.*;
import java.util.Date;
import javax.validation.constraints.*;

@Data
@Entity
public class Interlibery_loan {
    @Id
    @GeneratedValue
    private Long id;

    @Pattern(regexp = "\\w{1,50}")
    @NotNull
    private String name;
    @ManyToOne
    private Otherlibery otherlibery;
    @NotNull
    private Date date;

    @ManyToOne
    private Member member;
    private Interlibery_loan(){}
    public Interlibery_loan(String name,Otherlibery otherlibery,Date date,Member member){
    this.name = name;
    this.otherlibery = otherlibery;
    this.date = date;
    this.member = member;
    }
}
