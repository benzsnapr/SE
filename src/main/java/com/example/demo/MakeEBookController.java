package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MakeEBookController {

    @Autowired
    EbookRepository ebookRepository;
    @Autowired
    BookRepository bookRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LibrarianRepository librarianRepository;

    @ResponseBody
    @RequestMapping(value = "/url1/{url1}/url2/{url2}/book/{book}/librarian/{librarian}",
            method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.POST})
    public String addEbook(@PathVariable String url1,
                               @PathVariable String url2,
                               @PathVariable long book,
                               @PathVariable String librarian)
    {
        Book book1 = this.bookRepository.findOne(book);
        User u2 = this.userRepository.findByUsername(librarian);
        Librarian lib = this.librarianRepository.findByUser(u2);
        url1 = "https://drive.google.com/file/d/"+url1;
        url2 = "https://drive.google.com/file/d/"+url2;
        Ebook ebook = new Ebook(url1,url2,book1,lib);
        this.ebookRepository.save(ebook);
        return "{\"status\":\"Voted\"}";
    }

}
