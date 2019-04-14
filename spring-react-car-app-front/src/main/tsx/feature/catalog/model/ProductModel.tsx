import {normalizeStr} from "core/util/Toolkit";
import {getContextPath} from "core/config/AppRouteConfig";

export const DEFAULT_SCALE = "1/43";

export interface ProductModel {

    // Brand (ALTAYA, SOLIDO...)
    brand: string;

    // Directory num of the car
    model: string;

    // Real num of the car (without scale)
    name: string;

    // All information to match research without special characters('é' should match 'e' or 'é')
    normalizedForResearch: string;

    // Scale (1/43, 1/50...)
    scale: string;

    // Box where car is put (box number)
    box: string;

    // Images count to display for the car
    nbImg: number;
}

export const SCALES = [
    "1/43",
    "1/50",
    "1/57",
    "1/60",
    "1/64",
    "1/87"
];

export const createProduct = (brand, model, box, scale, nbImg): ProductModel => {
    const modelScale = " (" + scale.replace("/", "-") + ")";
    const name = model.replace(modelScale, "");

    if (parseInt(box) < 10) {
        box = "0" + parseInt(box);
    }
    return {
        brand,
        model,
        box,
        scale,
        nbImg,
        name,
        normalizedForResearch: normalizeStr(brand).toLowerCase() + " "
            + normalizeStr(model).toLowerCase() + " "
            + normalizeStr(scale).toLowerCase() + " "
            + normalizeStr(name).toLowerCase() + " "
            + box
    };
};

export const toURL = (product: ProductModel): string => {
    const {brand, model, box, scale, nbImg} = product;
    return `car?brand=${brand}&model=${model}&box=${box}&scale=${scale}&nbImg=${nbImg}`;
};

export const fromURL = (location: any): ProductModel => {
    const params = new URLSearchParams(location.search);
    return createProduct(
        params.get("brand"),
        params.get("model").replace("_", " "),
        params.get("box"),
        params.get("scale"),
        Number.parseInt(params.get("nbImg"), 10));
};

export const getProductImagePath = (product: ProductModel, type: any): string => {
    const {box, brand, model} = product;
    return `${getContextPath()}/cars/${brand}/${box}/${model}/${type}.jpg`;
};
