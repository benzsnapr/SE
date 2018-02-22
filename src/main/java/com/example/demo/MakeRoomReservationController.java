package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
public class MakeRoomReservationController {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomStatusRepository  roomStatusRepository;
    @Autowired
    private RoomScheduleRepository roomScheduleRepository;
    @Autowired
    private RoomReservationRepository roomReservationRepository;

    @ResponseBody
    @RequestMapping(path = "/timeSlot/{index}/member/{Username}", method = RequestMethod.GET)
    public String RoomReservations(
            @PathVariable Integer index,
            @PathVariable String Username
    ) {
        User user = this.userRepository.findByUsername(Username);
        Member member = this.memberRepository.findByUser(user);

        Date reserveDate = new Date();
        RoomSchedule roomSchedule = this.roomScheduleRepository.findOne(Long.valueOf(index+1));

        Room room = roomSchedule.getRoom();
        RoomReservation rrt = new RoomReservation(reserveDate,room,roomSchedule,member);
        this.roomReservationRepository.save(rrt);

        Long hold = Long.valueOf(2);
        RoomStatus rs = this.roomStatusRepository.findOne(hold);

        roomSchedule.setRoomStatus(rs);
        this.roomScheduleRepository.save(roomSchedule);

        return "{\"status\":\"RoomReservations\"}";

    }
}