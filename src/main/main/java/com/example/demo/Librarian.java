package com.example.demo;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "librarian")
public class Librarian {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private User user;

    private Librarian() {}

    public Librarian(String firstName, String lastName, String phone, String address, User user){
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.user = user;
    }

}
