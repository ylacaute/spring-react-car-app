import {call, put, fork, takeLatest, all} from 'redux-saga/effects'
import { fetchProducts } from "feature/catalog/service/CatalogService";
import {
    CatalogActionType,
    fetchCatalogFailed,
    fetchCatalogSuccess,
    fetchMoreProductsSuccess
} from "./CatalogAction";
import {REQUEST, SUCCESS, FAILURE} from "core/util/ActionType";
import {CatalogModel} from "feature/catalog/model/CatalogModel";


function* fetchCatalog(action) {
    try {
        const catalog: CatalogModel = yield call(fetchProducts);
        yield put(fetchCatalogSuccess(catalog));

    } catch (e) {
        yield put(fetchCatalogFailed(e.message));
    }
}

function* fetchMore(action) {
    try {
        yield put(fetchMoreProductsSuccess());
    } catch (e) {
        console.warn("fetchMore error :", e);
    }
}

function* watchCatalogFetch() {
    yield takeLatest(REQUEST(CatalogActionType.CATALOG_FETCH), fetchCatalog);
}

function* watchCatalogFetchMore() {
    yield takeLatest(REQUEST(CatalogActionType.CATALOG_FETCH_MORE), fetchMore);
}


export function* watchCatalogActions() {
    yield all([
        fork(watchCatalogFetchMore),
        fork(watchCatalogFetch),
    ]);
}
