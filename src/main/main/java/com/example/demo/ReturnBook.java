package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Data
@Entity
@Table(name = "returnbook")
public class ReturnBook {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Date returnDate;

    @NotNull
    private Date endDate;

    @DecimalMin("0")
    @NotNull
    private Integer fine;

    @OneToOne
    private Copy copy;

    @ManyToOne
    private Librarian librarian;

    private ReturnBook() {}

    public ReturnBook(Copy copy, Date endDate,Date returnDate, Librarian librarian,int fine){
        this.copy = copy;
        this.endDate = endDate;
        this.returnDate = returnDate;
        this.librarian = librarian;
        this.fine = fine;
    }
}
