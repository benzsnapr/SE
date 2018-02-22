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
@Table(name = "roomReservation")
public class RoomReservation {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Date reserveDate;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "roomSchedule_id")
    private RoomSchedule roomSchedule;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private RoomReservation() {}

    public RoomReservation(Date reserveDate, Room room, RoomSchedule roomSchedule,Member member){
        this.reserveDate = reserveDate;
        this.room = room;
        this.roomSchedule = roomSchedule;
        this.member = member;
    }

}
