package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineOtherlibery.class)
public interface OtherliberyRepository extends CrudRepository<Otherlibery, Long> {
    Otherlibery findByOtherlibery(String otherlibery);
}

