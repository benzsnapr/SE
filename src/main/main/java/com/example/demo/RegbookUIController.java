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
import java.util.Date;

@Controller
public class RegbookUIController {
    @Autowired
    LibrarianRepository librarianRepository;
    @Autowired
    BookRepository bookRepository;
    @Autowired
    CopyRepository copyRepository;
    @Autowired
    RegbookRepository regbookRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CopyStatusRepository copystatusRepository;

    @ResponseBody
    @RequestMapping(path = "/bookname/{bookname}/bookisbn/{isbn}/bookauthor/{author}" +
            "/bookpublished/{published}/bookdescription/{description}/booklanguage/" +
            "{language}/amount/{amount}/mid/{mid}"
            , method = RequestMethod.GET)
    public String Book(@PathVariable String bookname,@PathVariable String isbn,@PathVariable String author,
                       @PathVariable String published,@PathVariable String description,@PathVariable String language
                       , @PathVariable int amount,@PathVariable String mid) {

        Book book = new Book(bookname, isbn, author, published, description, language, "/images/no.jpg");
        this.bookRepository.save(book);
        long csid=1;
        CopyStatus cs = this.copystatusRepository.findOne(csid);
        for(int i=1; i<=amount; i++) {
            Copy copy = new Copy(book, cs, "on Shelf");
            this.copyRepository.save(copy);
        }
        User u = this.userRepository.findByUsername(mid);
        Librarian librarian = this.librarianRepository.findByUser(u);
        Date date = new Date(System.currentTimeMillis());
        Regbook regbook = new Regbook(book,date,librarian,amount);
        this.regbookRepository.save(regbook);

        return "{\"status\":\"created\"}";
    }


}
