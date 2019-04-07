import {CatalogAction, CatalogActionType} from "./CatalogAction";
import {
    CatalogModel,
    createDefaultCatalog,
    INC_DISPLAYED_PRODUCTS,
    MIN_DISPLAYED_PRODUCTS
} from "feature/catalog/model/CatalogModel";
import history from "core/config/HistoryConfig";
import {filterEquals, filterToURL} from "../model/CatalogFilterModel";
import {REQUEST, SUCCESS, FAILURE} from "core/util/ActionType";
import {toast} from "core/component/notification/toast";

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
        case SUCCESS(CatalogActionType.CATALOG_FETCH):
            newState = {
                ...state,
                ...action.catalog
            };
            break;
        case FAILURE(CatalogActionType.CATALOG_FETCH):
            toast.error("Unable to fetch catalog.yml");
            break;
        case SUCCESS(CatalogActionType.CATALOG_FETCH_MORE):
            newState = {
                ...state,
                displayedProductsCount: state.displayedProductsCount + INC_DISPLAYED_PRODUCTS
            };
            break;
        case FAILURE(CatalogActionType.CATALOG_FETCH_MORE):
            toast.error("Unable to fetch more products.");
            break;
        case REQUEST(CatalogActionType.CATALOG_CHANGE_FILTER):
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
