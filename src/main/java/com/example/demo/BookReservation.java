package com.example.demo;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "bookReservation")
public class BookReservation {
    @Id
    @GeneratedValue
    private Long id;

    private Date reserveDate;
    private Date startDate;
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "copy_id")
    private Copy copy;

    private BookReservation() {}

    public BookReservation(Date reserveDate, Date startDate, Date endDate, Member member, Copy copy){
        this.reserveDate = reserveDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.member = member;
        this.copy = copy;
    }
}
