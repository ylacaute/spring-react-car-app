import {normalizeStr} from "core/util/Toolkit";
import {ProductModel} from "./ProductModel";

/**
 * The main model for the Catalog Filter
 * We do not use a class in order to keep a pur object in redux state for better performances.
 */
export interface CatalogFilterModel {
    options: CatalogFilterOption[]
}

/**
 * This model is a part of the filter and match the react-select model,
 * that simplify boilerplate development.
 */
export interface CatalogFilterOption {
    label: string;
    value: string;
}

/**
 * Return true is the product must appears
 */
export const applyFilter = (product: ProductModel, filter: CatalogFilterModel) => {
    let result = false;

    if (filter.options.length === 0) {
        result = true;
    }
    for (const option of filter.options) {
        if (product.normalizedForResearch.includes(option.value)) {
            result = true;
            break;
        }
    }
    return result;
};

export const filterToURL = (filter: CatalogFilterModel): string => {
    return "/?filter=" + serializeFilter(filter);
};

export const createFilterFromURL = (): CatalogFilterModel => {
    const queryParams: string = window.location.search;
    if (!queryParams || !queryParams.includes("filter")) {
        return {
            options: []
        }
    }
    return {
        options: new URLSearchParams(queryParams)
            .get("filter")
            .split("-")
            .map(item => {
                return {
                    label: item,
                    value: item
                }
            })
    };
};


/**
 * Serialize the filter to update URL
 */
export const serializeFilter = (filter) => {
    return filter.options
        .map(opt => opt.value)
        .join("-");
};

/**
 * Normalize filter values to do a more accurate search
 */
const normalizeOptionValue = (option: CatalogFilterOption): CatalogFilterOption => {
    return {
        label: option.label,
        value: normalizeStr(option.value).toLowerCase()
    };
};

/**
 * When a new filter is emit from the react-select component, we have to ensure "values"
 * are normalized: in lower case and without any special character.
 *
 * For example : "Mégane" will be transformed as "megane" to ease the search.
 */
export const normalizeFilter = (filter: CatalogFilterModel): CatalogFilterModel => {
    return {
        options: filter.options.map(normalizeOptionValue)
    }
};


