import React from "react";
import ReactDOM from "react-dom";
import {Provider as ReduxProvider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "core/component/App";
import AppState, {createDefaultState} from "core/state/AppState";
import createStore, {applicationReady} from "core/store";
import {getContextPath} from "./core/config/AppRouteConfig";

const initialState: AppState = createDefaultState();
console.log("Initial state created: ", initialState);

const store = createStore(createDefaultState());
console.log("Redux store created");

const jsx = (
    <ReduxProvider store={store}>
        <BrowserRouter basename={getContextPath()}>
            <App />
        </BrowserRouter>
    </ReduxProvider>
);
const app = document.getElementById("app");

// To avoid FOUC, we display a blank screen during load
window.addEventListener("load", () => {
    store.dispatch(applicationReady());
});

ReactDOM.render(jsx, app);
