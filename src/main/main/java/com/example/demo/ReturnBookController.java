package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Controller
public class ReturnBookController {
    @Autowired
    LibrarianRepository librarianRepository;
    @Autowired
    CopyRepository copyRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CopyStatusRepository copystatusRepository;
    @Autowired
    ReturnBookRepository returnbookRepository;
    @Autowired
    BorrowBookRepository borrowBookRepository;
    @ResponseBody
    @RequestMapping(path = "/cid/{cid}/user/{user}"
            , method = RequestMethod.GET)
    public String Returnbook(@PathVariable long cid,@PathVariable String user
            ) throws ParseException {

        Copy c = this.copyRepository.findOne(cid);
        CopyStatus cs = this.copystatusRepository.findOne((long) 1);
        User u = this.userRepository.findByUsername(user);
        Librarian librarian = this.librarianRepository.findByUser(u);
        Date date = new Date(System.currentTimeMillis());
        Borrowbook bb = this.borrowBookRepository.findByCopy(c);

        SimpleDateFormat sd1 = new SimpleDateFormat("dd MMM yyyy");

        Date endDate = bb.getEndDate();
        long ed = endDate.getTime();
        long rd = date.getTime();
        int diff = (int) ((rd - ed) / (1000 * 60 * 60 * 24));
        int fine;
        if (diff < 0)
            fine = 0;
        else
            fine = diff * 5;

        if(c.getStatus().getStatus() == "OnShelf"){
            return "{\"status\":\"failed\"}";
        }else {
            if(c.getStatus().getStatus() == "Hold"){
                int n= c.getNote().charAt(c.getNote().length()-2) - '0';
                n =n-1;
                Date end = new Date(ed + (1000 * 60 * 60 * 72));
                String endd = sd1.format(end);
                if(n > 0)
                    c.setNote("Hold Until:" + endd + " + Hold[" + n + "]");
                else if(n == 0)
                    c.setNote("Hold Until:" + endd );
            }else {
                c.setStatus(cs);
                c.setNote("on Shelf");
            }
            ReturnBook rb = new ReturnBook(c, endDate, date, librarian, fine);

            this.returnbookRepository.save(rb);
            this.borrowBookRepository.delete(bb);

            return "{\"status\":\"successful\"}";
        }
    }
}
