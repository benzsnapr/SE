package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineUsertype.class)
public interface UsertypeRepository extends CrudRepository<Usertype, Long> {

}
