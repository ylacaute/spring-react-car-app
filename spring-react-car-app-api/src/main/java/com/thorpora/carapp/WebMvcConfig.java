package com.thorpora.carapp;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/contact").setViewName("forward:/index.html");
//        registry.addViewController("/about").setViewName("forward:/index.html");
//        registry.addViewController("/car").setViewName("forward:/index.html");
    }

}
