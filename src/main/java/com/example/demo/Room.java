package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.validation.constraints.*;

@Data
@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue
    private Long id;
    
    @Pattern(regexp="[SG]\\d{2}")
    private String name;

    private Room() {}

    public Room(String name){
        this.name = name;
    }

}
