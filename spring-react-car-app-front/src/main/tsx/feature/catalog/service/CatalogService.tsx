import {CatalogModel} from "feature/catalog/model/CatalogModel";
import {ProductModel, SCALES, createProduct, DEFAULT_SCALE, BASE_PRODUCT_URL} from "feature/catalog/model/ProductModel";
import fetch from "isomorphic-fetch";
import * as YAML from "js-yaml";

const fetchLogger = (responseText: string) => {
    //console.log("HTTP Response text: ", responseText);
    return responseText;
};

const normalizeProduct = (product: ProductModel): ProductModel => {
    let scale = DEFAULT_SCALE;
    for (const s of SCALES) {
        const matchScale = " (" + s.replace("/", "-") + ")";
        if (product.model.includes(matchScale)) {
            scale = s;
            break;
        }
    }
    return createProduct(
        product.brand,
        product.box,
        product.model,
        scale,
        product.nbImg);
};

const transformCatalog = (catalog: CatalogModel): CatalogModel => {
    catalog.products = catalog.products.map(normalizeProduct);
    return catalog;
};

export function fetchProducts(): Promise<CatalogModel> {
    return fetch(BASE_PRODUCT_URL + "/catalog.yml")
        .then((res: Response) => res.text())
        .then(fetchLogger)
        .then((res: string) => YAML.load(res) as CatalogModel)
        .then(transformCatalog);
}

