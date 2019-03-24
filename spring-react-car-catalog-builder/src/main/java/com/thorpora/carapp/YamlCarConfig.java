package com.thorpora.carapp;

import com.thorpora.carapp.model.Brand;
import com.thorpora.carapp.model.Product;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class YamlCarConfig {

    private String version;
    private List<Brand> brands;
    private List<Product> products;

    public YamlCarConfig() {
    }

    YamlCarConfig(String version) {
        this.version = version;
        this.brands = new ArrayList<>();
        this.products = new ArrayList<>();
    }

    void addBrand(String name) {
        this.brands.add(new Brand(name));
    }

    public Product addProduct(String brandName, String boxName, String carName, long nbImg) {
        Product p = new Product(brandName, boxName, carName, nbImg);
        this.products.add(p);
        return p;
    }

    public String toYaml() {
        StringBuffer sb = new StringBuffer();
        sb.append("version: " + version + "\n");

        sb.append("brands:\n");
        for (int i = 0; i < brands.size(); i++) {
            sb.append(brands.get(i).toYaml("  "));
        }
        sb.append("products:\n");
        for (int i = 0; i < products.size(); i++) {
            sb.append(products.get(i).toYaml("  "));
        }
        sb.append("\n");
        return sb.toString();
    }
}
