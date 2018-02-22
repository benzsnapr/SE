package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class ExtendedBookUIController {

    @Autowired
    ExtendedBookRepository extendedbookRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CopyRepository copyRepository;
    @Autowired
    CopyStatusRepository copyStatusRepository;
    @Autowired
    BorrowBookRepository borrowBookRepository;

   @ResponseBody
   @RequestMapping(path = "/copy/{index}/user/{Username}/day/{day}", method = RequestMethod.GET)
    public String names(@PathVariable Long index,
                        @PathVariable String Username,
                        @PathVariable Integer day
   ) throws ParseException {
        User u = this.userRepository.findByUsername(Username);
        Copy copy = this.copyRepository.findOne(index);
        Member member = this.memberRepository.findByUser(u);

       Borrowbook borrowbook = this.borrowBookRepository.findByCopy(copy);
       Date originalDate = borrowbook.getEndDate();
       Date newReturnDate = new Date();

       if(day==3){
           newReturnDate = new Date(originalDate.getTime() + (1000 * 60 * 60 * 72));
       }else if(day==5){
           newReturnDate = new Date(originalDate.getTime() + (1000 * 60 * 60 * 120));
       }else if(day==7){
           newReturnDate = new Date(originalDate.getTime() + (1000 * 60 * 60 * 168));
       }

       ExtendedBook extendedBook = new ExtendedBook(originalDate,newReturnDate,copy,member);
       this.extendedbookRepository.save(extendedBook);

       borrowbook.setEndDate(newReturnDate);

       this.borrowBookRepository.save(borrowbook);
       SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
       String format = formatter.format(newReturnDate);
       long cs=4;
       CopyStatus copyStatus = this.copyStatusRepository.findOne(cs);
       copy.setNote("DUE:"+ format);
       copy.setStatus(copyStatus);
       this.copyRepository.save(copy);
       return "{\"status\":\"created\"}";
    }









}
