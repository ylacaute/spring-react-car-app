package com.thorpora.carapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@Controller
public class StaticController {

    // https://stackoverflow.com/questions/48565550/map-all-requests-instead-of-specific-pattern-in-spring-boot
    @RequestMapping(value = {"/{path:[^\\.]*}", "/**/{path:^(?!oauth).*}/{path:[^\\.]*}"}, method = RequestMethod.GET)
    public String forward() {
        return "forward:/";
    }

}
