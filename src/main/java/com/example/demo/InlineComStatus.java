package com.example.demo;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.Projection;

@RepositoryRestResource(excerptProjection = InlineComStatus.class)
@Projection(name = "InlineComStatus", types = { ComStatus.class})
public interface InlineComStatus {
    Long getId();
    String getStatus();
}
