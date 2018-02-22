package com.example.demo;

import org.springframework.data.repository.CrudRepository;

public interface BorrowbookhistoryRepository extends CrudRepository<Borrowbookhistory, Long> {
    Borrowbookhistory findByCopy(Copy copy);


}
