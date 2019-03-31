import {CatalogModel} from "feature/catalog/model/CatalogModel";
import {CatalogFilterModel, normalizeFilter} from "feature/catalog/model/CatalogFilterModel";

// ACTION DESIGN

export enum CatalogActionType {
    CATALOG_FETCH_REQUESTED = "CATALOG_FETCH_REQUESTED",
    CATALOG_FETCH_MORE_REQUESTED = "CATALOG_FETCH_MORE_REQUESTED",
    CATALOG_FETCH_MORE_SUCCEEDED = "CATALOG_FETCH_MORE_SUCCEEDED",
    CATALOG_FETCH_SUCCEEDED = "CATALOG_FETCH_SUCCEEDED",
    CATALOG_FETCH_FAILED = "CATALOG_FETCH_FAILED",
    CATALOG_CHANGE_FILTER = "CATALOG_CHANGE_FILTER"
}

export default interface CatalogAction {
    type: CatalogActionType;
    catalog?: CatalogModel;
    message?: string;
    filter?: CatalogFilterModel;
    updateHistory?: boolean;
}


// ACTION CREATORS

export const fetchCatalog = (): CatalogAction => ({
    type: CatalogActionType.CATALOG_FETCH_REQUESTED
});

export const fetchCatalogSuccess = (catalog: CatalogModel): CatalogAction => ({
    type: CatalogActionType.CATALOG_FETCH_SUCCEEDED,
    catalog
});

export const fetchCatalogFailed = (message: string): CatalogAction => ({
    type: CatalogActionType.CATALOG_FETCH_FAILED,
    message
});

export const fetchMoreProducts = (): CatalogAction => ({
    type: CatalogActionType.CATALOG_FETCH_MORE_REQUESTED
});

export const fetchMoreProductsSuccess = (): CatalogAction => ({
    type: CatalogActionType.CATALOG_FETCH_MORE_SUCCEEDED
});

export const changeFilter = (filter: CatalogFilterModel, pushHistory = false): CatalogAction => ({
    type: CatalogActionType.CATALOG_CHANGE_FILTER,
    filter: normalizeFilter(filter),
    updateHistory: pushHistory
});
