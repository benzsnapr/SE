package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineBookstore.class)
public interface BookstoreRepository extends CrudRepository<Bookstore, Long> {
}
