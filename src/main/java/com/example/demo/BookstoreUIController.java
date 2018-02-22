package com.example.demo;

import java.awt.print.Book;
import java.util.Date;
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
import java.util.Date;

@Controller
public class BookstoreUIController {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    BookstoreRepository bookstoreRepository;
    @Autowired
    ReceiptRepository receiptRepository;
    @Autowired
    UserRepository userRepository;

    @ResponseBody
    @RequestMapping(path = "/bid/{bid}/amount/{amount}/mid/{mid}/date/{date}"
            , method = RequestMethod.GET)
    public String Book(@PathVariable Long bid,
                       @PathVariable int amount,
                       @PathVariable String mid,
                       @PathVariable String date
                       ) {
        Bookstore bookstore = this.bookstoreRepository.findOne(bid);
        User u = this.userRepository.findByUsername(mid);
        Member member = this.memberRepository.findByUser(u);

        int total = 0;
        total = bookstore.getPrice() * amount;

        Receipt receipt = new Receipt(bookstore,amount,total,member,date);
        this.receiptRepository.save(receipt);

        return "{\"status\":\"success\"}";
    }
}
