package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;

@Controller
public class BorrowBookController {
    @Autowired
    BorrowBookRepository borrowBookRepository;
    @Autowired
    CopyRepository copyRepository;
    @Autowired
    MemberRepository  memberRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LibrarianRepository librarianRepository;
    @Autowired
    CopyStatusRepository copystatusRepository;
    @Autowired
    BorrowbookhistoryRepository borrowbookhistoryRepository;

    @ResponseBody
    @RequestMapping(path = "/book/{book}/user/{user}/librarian/{librarian}", method = RequestMethod.GET)
    public String borrowbook(@PathVariable Long book,
                             @PathVariable Long user,
                             @PathVariable String librarian) throws ParseException {

        Copy copy  = this.copyRepository.findOne(book);

        //User u1 = this.userRepository.findOne(user);
        Member member = this.memberRepository.findOne(user);

        User u2 = this.userRepository.findByUsername(librarian);
        Librarian lib = this.librarianRepository.findByUser(u2);

        DateFormat newDate = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = new Date();


        Date dt = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(dt);
        c.add(Calendar.DATE, 7);
        dt = c.getTime();

        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
        String format = formatter.format(dt);

        CopyStatus cs1 = this.copystatusRepository.findOne((long) 1);
        CopyStatus status = copy.getStatus();
        if(status==cs1) {
            Borrowbook borrowbook = new Borrowbook(copy, member, startDate,dt , lib);
            this.borrowBookRepository.save(borrowbook);
            Borrowbookhistory borrowbookh = new Borrowbookhistory(copy, member, startDate,dt , lib);
            this.borrowbookhistoryRepository.save(borrowbookh);
            CopyStatus cs2 = this.copystatusRepository.findOne((long) 2);
            copy.setNote("DUE:"+format);
            copy.setStatus(cs2);
            this.copyRepository.save(copy);
        }
        return "{\"status\":\"borrowing\"}";
    }
}
