package com.thorpora.carapp.model;

import lombok.Data;

@Data
public class Product {

    String brand;
    String model;
    String box;
    long nbImg;

    public Product() {
    }

    public Product(String brand, String box, String model, long nbImg) {
        this.brand = brand;
        this.model = model;
        this.box = box;
        this.nbImg = nbImg;
    }

    public String toYaml(String indent) {
        return
                indent + "- model: " + model + "\n" +
                indent + "  box: " + box + "\n" +
                indent + "  nbImg: " + nbImg + "\n" +
                indent + "  brand: " + brand + "\n";

    }
}
