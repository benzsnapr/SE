package com.example.demo;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
public class ComReservation {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Computer computer;

    @ManyToOne
    private Member member;

    @NotNull
    private Date date = new Date();

    @NotNull
    private Date dateEnd ;


    private ComReservation() {}

    public ComReservation(Computer computer,Member member,Date dateEnd
    ){
        this.computer = computer;
        this.member = member;
        this.dateEnd = dateEnd;
    }
}
