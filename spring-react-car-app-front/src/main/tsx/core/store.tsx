import LoggerMiddleWare from "core/middleware/LoggerMiddleWare";
import CatalogSagas from "feature/catalog/action/CatalogSagas";
import catalogReducer from "feature/catalog/action/CatalogReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import AppState from "./state/AppState";
import {KernelState, KernelStep} from "./state/KernelState";
import SessionState from "./state/SessionState";

export enum KernelActionType {
    UPDATE_KERNEL_CHANGE = "UPDATE_KERNEL_CHANGE"
}

export interface KernelAction {
    type: KernelActionType;
    KernelStep: KernelStep;
}

export interface SessionAction {
    type: string;
}

export const documentLoaded = (): KernelAction => ({
    type: KernelActionType.UPDATE_KERNEL_CHANGE,
    KernelStep: KernelStep.APP_RUNNING
});

export const initializeSession = (): SessionAction => ({
    type: "INITIALIZE_SESSION",
});


// REDUCER ------------------------−------------−------------−------------−------------−------------

const kernelReducer = (state: KernelState = KernelState.default, action: KernelAction): KernelState => {
    let newState;
    switch (action.type) {
        case "UPDATE_KERNEL_CHANGE":
            newState = {
                ...state,
                current: action.KernelStep
            };
            break;
        default:
            return state;
    }
    console.log("KernelState changed: ", newState);
    return newState;
};

const sessionReducer = (state: SessionState = SessionState.default, action: SessionAction): SessionState => {
    let newState;
    switch (action.type) {
        case "INITIALIZE_SESSION":
            newState = {
                ...state,
                loggedIn: true
            };
            break;
        default:
            return state;
    }
    console.log("SessionState changed: ",   newState);
    return newState;
};

const reducer = combineReducers({
    kernel: kernelReducer,
    session: sessionReducer,
    catalog: catalogReducer,
});

const sagaMiddleware = createSagaMiddleware();

export default (initialState: AppState) => {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(
            sagaMiddleware,
            LoggerMiddleWare,
            ));
    sagaMiddleware.run(CatalogSagas);
    return store;
};




