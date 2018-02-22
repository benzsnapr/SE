package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineCopyStatus.class)
public interface CopyStatusRepository extends CrudRepository<CopyStatus, Long> {

}
