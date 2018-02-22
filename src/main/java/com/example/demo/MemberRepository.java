package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = InlineMember.class)
public interface MemberRepository extends CrudRepository<Member, Long> {
    Member findByUser(
            @Param("user") User user
    );
    Member findByFirstName(
            @Param("firstName") String firstName
    );

}