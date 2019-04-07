import {CatalogModel} from "feature/catalog/model/CatalogModel";
import {ProductModel, SCALES, createProduct, DEFAULT_SCALE} from "feature/catalog/model/ProductModel";
import fetch from "isomorphic-fetch";
import * as YAML from "js-yaml";
import {BoxModel} from "../model/BoxModel";
import {getContextPath} from "../../../core/config/AppRouteConfig";

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
    console.log("create product");
    return createProduct(
        product.brand.toUpperCase(),
        product.model,
        product.box,
        scale,
        product.nbImg);
};

const getBoxId = (product: ProductModel): string => {
    return product.brand.toUpperCase() + "-" + product.box;
};

const createBoxes = (catalog: CatalogModel): BoxModel[] => {
    let boxMap = new Map<string, BoxModel>();
    catalog.products.forEach(p => {
        let id:string = p.brand + "-" + p.box;
        let box:BoxModel = boxMap.get(id);
        if (box == null) {
            box = {
                num: p.box,
                brand: p.brand,
                carCount: 0
            };
            boxMap.set(id, box);
        }
        box.carCount = box.carCount + 1;
    });

    return Array.from(boxMap.values());
};


const normalizeCatalog = (catalog: CatalogModel): CatalogModel => {
    catalog.products = catalog.products.map(normalizeProduct);
    catalog.boxes = createBoxes(catalog);
    return catalog;
};

const logCatalog = (catalog: CatalogModel): CatalogModel => {
    console.log("Catalog fetched:", catalog);
    return catalog;
};

export function fetchProducts(): Promise<CatalogModel> {
    return fetch(getContextPath() + "cars/catalog.yml")
        .then((res: Response) => res.text())
        .then(fetchLogger)
        .then((res: string) => YAML.load(res) as CatalogModel)
        .then(normalizeCatalog)
        .then(logCatalog);
}

