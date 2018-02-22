package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
@Data
@Entity
@Table(name = "copyStatus")
public class CopyStatus {
    @Id
    @GeneratedValue
    private Long id;
    private String status;


    private CopyStatus() {}

    public CopyStatus(String status){
        this.status = status;
    }
}
