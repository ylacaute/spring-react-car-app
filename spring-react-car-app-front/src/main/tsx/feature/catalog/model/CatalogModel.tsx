import {BrandModel} from "./BrandModel";
import {ProductModel} from "./ProductModel";
import {CatalogFilterModel, createFilterFromURL} from "./CatalogFilterModel";
import {BoxModel} from "./BoxModel";


export const MIN_DISPLAYED_PRODUCTS = 15;
export const INC_DISPLAYED_PRODUCTS = 3;

export interface CatalogModel {
    meta: string;
    version: string;
    brands: BrandModel[];
    products: ProductModel[];
    boxes: BoxModel[];
    displayedProductsCount: number;
    filter: CatalogFilterModel;
}

export const createDefaultCatalog = (): CatalogModel => ({
    meta: "-",
    version: "-",
    brands: [],
    products: [],
    boxes: [],
    displayedProductsCount: MIN_DISPLAYED_PRODUCTS,
    filter: createFilterFromURL()
});
