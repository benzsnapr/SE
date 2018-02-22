package com.example.demo;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Bookstore {
    private @Id @GeneratedValue Long id;
    private String name;
    private int price;


    private Bookstore() {}

    public Bookstore(String name, int price) {
        this.name = name;
        this.price = price;

    }
}
