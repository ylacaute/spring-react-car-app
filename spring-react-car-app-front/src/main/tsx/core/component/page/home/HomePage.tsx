import Header from "core/component/layout/header";
import {addScrollListener, removeScrollListener} from "core/util/Toolkit";
import Catalog from "feature/catalog/component/Catalog";
import {CatalogModel} from "feature/catalog/model/CatalogModel";
import React from "react";
import Helmet from "react-helmet";
import {applyFilter, CatalogFilterModel, createFilterFromURL} from "feature/catalog/model/CatalogFilterModel";
import CatalogSearchBar from "feature/catalog/component/CatalogSearchBar";
import "./HomePage.scss";


/**
 * location, history and match come from React-Router.
 * All other properties come from the state tree.
 */
interface Props {
    location: any;
    history: any;
    match: any;
    catalog: CatalogModel;
    fetchCatalog: () => void;
    fetchMoreProducts: () => void;
    changeFilter: (filter: CatalogFilterModel, pushHistory: boolean) => void;
}

class HomePage extends React.Component<Props> {

    historyListener;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("HomePage: componentDidMount");

        if (this.props.catalog.products.length <= 0) {
            console.log("HomePage: fetching catalog");
            this.props.fetchCatalog();
        }
        this.onScrollToEnd = this.onScrollToEnd.bind(this);
        addScrollListener(this.onScrollToEnd);

        // // On back button, we need to update the filter state, but without pushing a new history entry in browser.
        // this.historyListener = this.props.history.listen((location, action) => {
        //     this.props.changeFilter(createFilterFromURL(), false);
        //     console.log(
        //         `[${action}] the current URL to ${location.pathname}${location.search}${location.hash}`
        //     );
        // });
    }

    componentWillUnmount() {
        removeScrollListener(this.onScrollToEnd);
        //this.historyListener();
    }

    onScrollToEnd() {
        this.props.fetchMoreProducts();
    }

    render() {
        const {match, location, catalog, changeFilter} = this.props;
        const {displayedProductsCount, filter} = this.props.catalog;
        const productsToDisplay = catalog.products
            .filter((p) => applyFilter(p, filter))
            .slice(0, displayedProductsCount);

        return (
            <>
                <Helmet>
                    <title>Home Page</title>
                    <meta name="description" content="This is a proof of concept for React SSR" />
                </Helmet>
                <Header location={location} match={match}>
                    <div className="home-header-content">
                        <h2>Home page !</h2>
                        <CatalogSearchBar filter={filter} changeFilter={changeFilter}/>
                    </div>
                </Header>
                <article>
                    <Catalog products={productsToDisplay}/>
                </article>
            </>
       );
    }
}

export default HomePage;
