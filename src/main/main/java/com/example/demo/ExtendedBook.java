package com.example.demo;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.util.Date;

@Data
@Entity
public class ExtendedBook {
    private @Id @GeneratedValue Long id;

    @NotNull
    @Future
    private Date originalDate;

    @NotNull
    @Future
    private Date newReturnDate;

    @OneToOne
    private Copy copy;

    @ManyToOne
    private Member member;

    private ExtendedBook() {}

    public ExtendedBook(Date originalDate, Date newReturnDate, Copy copy, Member member) {
        this.originalDate = originalDate;
        this.newReturnDate = newReturnDate;
        this.copy = copy;
        this.member = member;
    }

}
