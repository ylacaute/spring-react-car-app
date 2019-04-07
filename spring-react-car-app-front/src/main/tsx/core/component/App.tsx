import routeConfig from "core/config/AppRouteConfig";
import AppState from "core/state/AppState";
import React from "react";
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router-dom";
import {CatalogFilterModel, createFilterFromURL} from "../../feature/catalog/model/CatalogFilterModel";
import {changeFilter} from "feature/catalog/action/CatalogAction";
import "./App.scss";

interface Props {
    className?: string;
    history: any
    classes?: any;
    kernelStep: string;
    changeFilter: (filter: CatalogFilterModel, pushHistory: boolean) => void;
}

interface State {
    title: string;
}

class App extends React.Component<Props, State> {

    historyListener;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            title: "Mes petites voitures",
        };

        // On back button, we need to update the filter state, but without pushing a new history entry in browser.
        this.historyListener = this.props.history.listen((location, action) => {
            this.props.changeFilter(createFilterFromURL(), false);
            console.log(
                `[${action}] the current URL to ${location.pathname}${location.search}${location.hash}`
            );
        });

    }

    componentWillUnmount() {
        this.historyListener();
    }

    render() {
        const { kernelStep} = this.props;

        if (kernelStep === "APP_LOADING") {
            // AVOID FOUC (Flash Of Unstyled Content)
            return (
                <div />
            );
        }
        //https://reacttraining.com/react-router/
        return (
            <>
                <Switch>
                    {routeConfig.getAll().map((route: any) => <Route key={route.path} {...route} />)}
                </Switch>
            </>
       );
    }
}

const mapStateToProps = (state: AppState) => ({
    kernelStep: state.kernel.current,
});
const mapDispatchToProps = {
    changeFilter
};


// Why withRouter : https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
// Why 'as any' : https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18999
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App) as any);
