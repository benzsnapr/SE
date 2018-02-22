package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.*;

@Controller
public class ExamResourceController {

    @Autowired
    ExamResourceRepository examresourceRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    UserRepository userRepository;

    @ResponseBody
    @RequestMapping(path = "/link/{link}/nametest/{nametest}/size/{size}/mid/{mid}"
            , method = RequestMethod.GET)
    public String names(@PathVariable String link,@PathVariable String nametest,@PathVariable String size,@PathVariable String mid){
        link = "https://www.dropbox.com/s/onps0ux3y2nmevx/"+nametest;

        User u = this.userRepository.findByUsername(mid);
        Member member = this.memberRepository.findByUser(u);
        ExamResource names = new ExamResource(link,nametest,size,member);
        this.examresourceRepository.save(names);
        return "{\"status\":\"created\"}";
    }
}
