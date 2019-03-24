package com.thorpora.carapp.model;

import lombok.Data;

@Data
public class Brand {

    String name;

    public Brand() {
    }

    public Brand(String name) {
        this.name = name;
    }

    public String toYaml(String indent) {
        return indent + "- name: " + name + "\n";
    }
}
