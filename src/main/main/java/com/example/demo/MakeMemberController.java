package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class MakeMemberController {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    LibrarianRepository librarianRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UsertypeRepository usertypeRepository;

    @ResponseBody
    @RequestMapping(path ="/username/{username}/password/{password}/firstname/{firstname}/lastname/{lastname}/phone/{phone}/address/{address}/type/{type}",
            method = {RequestMethod.GET,RequestMethod.POST})
    public String member(@PathVariable String username,
                           @PathVariable String password,
                           @PathVariable String firstname,
                           @PathVariable String lastname,
                           @PathVariable String phone,
                           @PathVariable String address,
                           @PathVariable String type)
    {
        Usertype ut = this.usertypeRepository.findOne((long) 2);
        User user = new User(username,password,ut);
        this.userRepository.save(user);
        if(user.getType().getType().equals("member")){
            Member member = new Member(firstname,lastname,phone,address,user);
            this.memberRepository.save(member);
        }else{
            Librarian librarian = new Librarian(firstname,lastname,phone,address,user);
            this.librarianRepository.save(librarian);
        }
        return "{\"status\":\"Voted\"}";
    }

    @ResponseBody
    @RequestMapping(value = "/firstname/{firstname}/newfirstname/{newfirstname}/newlastname/{newlastname}/phone/{phone" +
            "}/address/{address}",
            method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.POST})
    public String updateMember(@PathVariable String firstname,
                               @PathVariable String newfirstname,
                               @PathVariable String newlastname,
                               @PathVariable String phone,
                               @PathVariable String address)
    {
        Member member = memberRepository.findByFirstName(firstname);
        member.setFirstName(newfirstname);
        member.setLastName(newlastname);
        member.setPhone(phone);
        member.setAddress(address);
        this.memberRepository.save(member);
        return "{\"status\":\"Voted\"}";
    }

    @ResponseBody
    @RequestMapping(value = "/firstname/{firstname}",
            method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.POST})
    public String deleteMember(@PathVariable String firstname)
    {
        Member member = memberRepository.findByFirstName(firstname);
        this.memberRepository.delete(member);
        return "{\"status\":\"Voted\"}";
    }

}
