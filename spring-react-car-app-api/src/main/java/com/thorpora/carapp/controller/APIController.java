package com.thorpora.carapp.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@Slf4j
@RestController("/api")
public class APIController {

    @GetMapping("/hello")
    public String hello() {
        log.info("hello");
        return "Hello, the time at the server is now " + new Date() + "\n";
    }

}
