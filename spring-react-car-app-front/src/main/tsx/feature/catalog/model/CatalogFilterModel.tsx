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


export const filterEquals = (a: CatalogFilterModel, b: CatalogFilterModel): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.options.length != b.options.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (let i = 0; i < a.options.length; ++i) {
        console.log("a.options[i].value : ", a.options[i].value);
        console.log("b.options[i].value : ", b.options[i].value);
        if (a.options[i].value !== b.options[i].value) return false;
    }
    return true;
};

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
    if (!queryParams) {
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


