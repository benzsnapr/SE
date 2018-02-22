package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.validation.constraints.*;

@Data
@Entity
@Table(name = "roomStatus")
public class RoomStatus {
    @Id
    @GeneratedValue
    private Long id;

    @Pattern(regexp="Ready||Hold||Time_out")
    private String status;

    private RoomStatus() {}

    public RoomStatus(String status){
        this.status = status;
    }
}
