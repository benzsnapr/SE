package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;




@Controller
public class ComReservationController {

    @Autowired
    ComputerRepository computerRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    LibrarianRepository librarianRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ComReservationRepository comReservationRepository;
    @Autowired
    ComStatusRepository comStatusRepository;

    @ResponseBody
    @RequestMapping(path = "/comid/{comid}/member/{member}", method = RequestMethod.GET)
    public String ComReservation(@PathVariable Long comid,
                             @PathVariable String member) throws ParseException {



        Computer computer = this.computerRepository.findOne(comid);

        User u2 = this.userRepository.findByUsername(member);
        Member member1 = this.memberRepository.findByUser(u2);


        Date dt = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(dt);
        c.add(Calendar.DATE, 1);
        dt = c.getTime();


        ComStatus cs = this.comStatusRepository.findOne((long)1);
        ComStatus status = computer.getStatus();
        if(status==cs) {
            ComReservation comReservation = new ComReservation(computer, member1,dt);
            this.comReservationRepository.save(comReservation);

            ComStatus cs2 = this.comStatusRepository.findOne((long)2);
            computer.setStatus(cs2);
            this.computerRepository.save(computer);
        }

        return "{\"status\":\"comReservation\"}";
    }
}
