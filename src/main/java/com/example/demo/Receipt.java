package com.example.demo;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@Entity
public class Receipt {
    private @Id @GeneratedValue Long id;
    private int amount;
    private int totalprice;
    private String dateandtime;

    @ManyToOne
    private Bookstore bookstore;

    @ManyToOne
    private Member member;

    private Receipt() {}

    public Receipt(Bookstore bookstore, int amount, int totalprice, Member member,String dateandtime) {
        this.bookstore = bookstore;
        this.amount = amount;
        this.totalprice = totalprice;
        this.member = member;
        this.dateandtime = dateandtime;
    }
}
