package com.example.demo;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

@Data
@Entity
public class Otherlibery {
    @Id
    @GeneratedValue
    private Long id;
    //@Pattern(regexp = "CU||MSU||KU||CMU||KKU")
    private String otherlibery;
    private String addess;
    private Otherlibery(){}
    public Otherlibery(String otherlibery,String addess) {
       this.otherlibery = otherlibery;
       this.addess = addess;
    }
}
