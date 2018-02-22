package com.example.demo;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class ComStatus {
    @Id
    @GeneratedValue
    private Long id;
    private String status;

    private ComStatus(){}

    public ComStatus(String status){
        this.status = status;
    }

}
