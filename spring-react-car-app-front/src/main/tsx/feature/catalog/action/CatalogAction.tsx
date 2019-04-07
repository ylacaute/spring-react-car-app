import {CatalogModel} from "feature/catalog/model/CatalogModel";
import {CatalogFilterModel, normalizeFilter} from "feature/catalog/model/CatalogFilterModel";
import {REQUEST, SUCCESS, FAILURE} from "core/util/ActionType";

export enum CatalogActionType {
    CATALOG_FETCH = "CATALOG_FETCH",
    CATALOG_FETCH_MORE = "CATALOG_FETCH_MORE",
    CATALOG_CHANGE_FILTER = "CATALOG_CHANGE_FILTER"
}

export interface CatalogAction {
    type: string;
    catalog?: CatalogModel;
    message?: string;
    filter?: CatalogFilterModel;
    updateHistory?: boolean;
}


// ACTION CREATORS

export const fetchCatalog = (): CatalogAction => ({
    type: REQUEST(CatalogActionType.CATALOG_FETCH)
});

export const fetchCatalogSuccess = (catalog: CatalogModel): CatalogAction => ({
    type: SUCCESS(CatalogActionType.CATALOG_FETCH),
    catalog
});

export const fetchCatalogFailed = (message: string): CatalogAction => ({
    type: FAILURE(CatalogActionType.CATALOG_FETCH),
    message
});

export const fetchMoreProducts = (): CatalogAction => ({
    type: REQUEST(CatalogActionType.CATALOG_FETCH_MORE)
});

export const fetchMoreProductsSuccess = (): CatalogAction => ({
    type: SUCCESS(CatalogActionType.CATALOG_FETCH_MORE)
});

export const changeFilter = (filter: CatalogFilterModel, pushHistory = false): CatalogAction => ({
    type: REQUEST(CatalogActionType.CATALOG_CHANGE_FILTER),
    filter: normalizeFilter(filter),
    updateHistory: pushHistory
});
