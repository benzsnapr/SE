package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
public class Interlibery_loanController {
    @Autowired
     Interlibery_loanRepository interliberyLoanRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    OtherliberyRepository otherliberyRepository;
    @ResponseBody
    @RequestMapping(value = "/user/{user}/name/{name}/otherlibery/{otherlibery}",
            method = {RequestMethod.GET})
    public String addILL(@PathVariable String user,
                           @PathVariable String name,
                           @PathVariable String otherlibery )
    {
        User u = this.userRepository.findByUsername(user);
        Member member = this.memberRepository.findByUser(u);
        Date date = new Date();
        Otherlibery o = this.otherliberyRepository.findByOtherlibery(otherlibery);
        Interlibery_loan i1 = new Interlibery_loan(name,o,date,member);
        this.interliberyLoanRepository.save(i1);
        return "{\"status\":\"Save\"}";
    }
}
