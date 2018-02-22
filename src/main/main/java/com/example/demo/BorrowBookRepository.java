package com.example.demo;

import org.springframework.data.repository.CrudRepository;

public interface BorrowBookRepository extends CrudRepository<Borrowbook, Long> {
    Borrowbook findByCopy(Copy copy);
}
