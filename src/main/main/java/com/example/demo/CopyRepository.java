package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineCopy.class)
public interface CopyRepository extends CrudRepository<Copy, Long> {

}