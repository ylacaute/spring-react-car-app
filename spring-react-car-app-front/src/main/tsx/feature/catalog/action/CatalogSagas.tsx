import {call, put, fork, takeLatest, all} from 'redux-saga/effects'
import { fetchProducts } from "feature/catalog/service/CatalogService";
import {
    CatalogActionType,
    fetchCatalogFailed,
    fetchCatalogSuccess,
    fetchMoreProductsSuccess
} from "feature/catalog/action/CatalogAction";

import {CatalogModel} from "feature/catalog/model/CatalogModel";


function* fetchUser(action) {
    try {
        const catalog: CatalogModel = yield call(fetchProducts); // args possible : ex , action.payload.userId
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
    yield takeLatest(CatalogActionType.CATALOG_FETCH_REQUESTED, fetchUser);
}

function* watchCatalogFetchMore() {
    yield takeLatest(CatalogActionType.CATALOG_FETCH_MORE_REQUESTED, fetchMore);
}


export default function* watchCatalogActions() {
    yield all([
        fork(watchCatalogFetchMore),
        fork(watchCatalogFetch),
    ]);
}
