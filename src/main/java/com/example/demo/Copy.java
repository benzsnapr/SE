package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "copy")
public class Copy {
    @Id
    @GeneratedValue
    private Long id;
    private String note;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @OneToOne
    @JoinColumn(name = "Copy_Status")
    private CopyStatus status;

    private Copy() {}

    public Copy(Book book,CopyStatus status, String note){
        this.book = book;
        this.status = status;
        this.note = note;
    }
}
