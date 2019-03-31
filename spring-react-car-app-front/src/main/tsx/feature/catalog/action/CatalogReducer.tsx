import CatalogAction, {CatalogActionType} from "feature/catalog/action/CatalogAction";
import {
    CatalogModel,
    createDefaultCatalog,
    INC_DISPLAYED_PRODUCTS,
    MIN_DISPLAYED_PRODUCTS
} from "feature/catalog/model/CatalogModel";
import history from "core/config/HistoryConfig";
import {filterEquals, filterToURL} from "../model/CatalogFilterModel";

const updateHistory = (filter) => {
    let path = "/";
    if (filter.options.length > 0) {
        path = filterToURL(filter);
    }
    history.push(path);
    console.log("Updating history with " + path);
};

const catalogReducer = (
    state: CatalogModel = createDefaultCatalog(),
    action: CatalogAction): CatalogModel => {

    let newState;
    switch (action.type) {
        case CatalogActionType.CATALOG_FETCH_SUCCEEDED:
            newState = {
                ...state,
                ...action.catalog
            };
            break;
        case CatalogActionType.CATALOG_FETCH_MORE_SUCCEEDED:
            newState = {
                ...state,
                displayedProductsCount: state.displayedProductsCount + INC_DISPLAYED_PRODUCTS
            };
            break;
        case CatalogActionType.CATALOG_CHANGE_FILTER:
            newState = {
                ...state,
                displayedProductsCount: MIN_DISPLAYED_PRODUCTS,
                filter: action.filter
            };
            if (!filterEquals(state.filter, newState.filter) && action.updateHistory)
                updateHistory(action.filter);
            break;
        default:
            return state;
    }
    console.log("Catalog state changed with action " + action.type + " :", newState);
    return newState;
};

export default catalogReducer;
