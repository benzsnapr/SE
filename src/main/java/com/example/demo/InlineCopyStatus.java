package com.example.demo;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "InlineCopyStatus", types = { CopyStatus.class})
public interface InlineCopyStatus {
    Long getId();
    String getStatus();
}
