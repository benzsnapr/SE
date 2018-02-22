package com.example.demo;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity
public class Computer {
    @Id @GeneratedValue
    private Long id;

    @Pattern(regexp = "COM0\\d{1,99}")
    private String comnumber;

    @Size(max = 30)
    private String note ;



    @ManyToOne
    private ComStatus status;

    private Computer(){}

    public Computer(String comnumber,String note,ComStatus Status){
        this.comnumber = comnumber;
        this.note = note;
        this.status = Status;
    }
}
