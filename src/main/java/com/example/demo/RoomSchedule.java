package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Date;
import javax.validation.constraints.*;

@Data
@Entity
@Table(name = "roomSchedule")
public class RoomSchedule {
    @Id
    @GeneratedValue
    private Long id;

    private Integer timeSlot;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "roomStatus")
    private RoomStatus roomStatus;

    private RoomSchedule() {}

    public RoomSchedule(Integer timeSlot, Room room,  RoomStatus roomStatus){
        this.timeSlot = timeSlot;
        this.room = room;
        this.roomStatus = roomStatus;

    }

}
