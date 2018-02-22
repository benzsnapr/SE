package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class MakeBookReservationController {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CopyRepository copyRepository;
    @Autowired
    BookReservationRepository bookReservationRepository;
    @Autowired
    BorrowBookRepository borrowBookRepository;
    @Autowired
    CopyStatusRepository copystatusRepository;

    @ResponseBody
    @RequestMapping(path = "/copybook/{index}/member/{Username}", method = RequestMethod.GET)
    public String BookReservations(
            @PathVariable Long index,
            @PathVariable String Username
    ) {
        Copy c = this.copyRepository.findOne(index+1);
        User u = this.userRepository.findByUsername(Username);
        Member m = this.memberRepository.findByUser(u);

        Date reserveDate = new Date();

        String s;
        long count =this.bookReservationRepository.countByCopyId(index+1);

        Borrowbook bb = this.borrowBookRepository.findByCopy(c);
        Date BorrowedEnd = bb.getEndDate();

        // if First Time Hold
        Date startHold = new Date(BorrowedEnd.getTime() + (1000 * 60 * 60 * 24));   // 1 day before Time Out
        Date endHold = new Date(BorrowedEnd.getTime() + (1000 * 60 * 60 * 72));     // End Hold

        BookReservation br = new BookReservation(reserveDate, startHold,endHold,m,c);
        this.bookReservationRepository.save(br);

        if(count == 0){     // FirstTime Hold
            count++;
            s = " + Hold["+count+ "]";
        }else{              // NextTime Hold
            Date nextEndHold = new Date(endHold.getTime() + (1000 * 60 * 60 * 72*count));
            Date nextStartHold = new Date(nextEndHold.getTime() - (1000 * 60 * 60 * 48));

            count++;
            s = " + Hold[" + count + "]";
            br.setStartDate(nextStartHold);
            br.setEndDate(nextEndHold);

            this.bookReservationRepository.save(br);
        }

        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
        String format = formatter.format(BorrowedEnd);

        long csid=3;
        CopyStatus cs = this.copystatusRepository.findOne(csid);
        c.setNote("DUE:"+ format + s);
        c.setStatus(cs);
        this.copyRepository.save(c);

        return "{\"status\":\"BookReservation\"}";

    }
}