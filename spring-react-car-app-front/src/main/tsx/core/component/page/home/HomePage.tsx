import Header from "core/component/layout/header";
import {addScrollListener, removeScrollListener} from "core/util/Toolkit";
import Catalog from "feature/catalog/component/Catalog";
import {CatalogModel} from "feature/catalog/model/CatalogModel";
import React from "react";
import Helmet from "react-helmet";
import {applyFilter, CatalogFilterModel, createFilterFromURL} from "feature/catalog/model/CatalogFilterModel";
import CatalogSearchBar from "feature/catalog/component/CatalogSearchBar";
import "./HomePage.scss";
import {ProductModel} from "../../../../feature/catalog/model/ProductModel";


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

    scrollListener;

    componentDidMount() {
        console.log("BoxPage: componentDidMount");
        if (this.props.catalog.products.length <= 0) {
            this.props.fetchCatalog();
        }
        this.onScrollToEnd = this.onScrollToEnd.bind(this);
        this.scrollListener = addScrollListener(this.onScrollToEnd);
    }

    componentWillUnmount() {
        removeScrollListener(this.scrollListener);
    }

    onScrollToEnd() {
        this.props.fetchMoreProducts();
    }


    renderFilterInfo(productFilteredCount: number, productCount: number) {
        let info;
        if (productCount == 0) {
            return null;
        }
        if (productFilteredCount == productCount) {
            info = `Aucun filtre sur un total de ${productCount}`;
        } else if (productFilteredCount == 1) {
            info = `1 modèle filtré sur un total de ${productCount}`;
        } else if (productFilteredCount == 0) {
            info = `Aucun modèle correspond à votre recherche sur un total de ${productCount}`;
        } else {
            info = `${productFilteredCount} modèles filtrés sur un total de ${productCount}`;
        }
        return <p className="filter-info">{info}</p>;
    }

    render() {
        const {match, location, catalog, changeFilter} = this.props;
        const {displayedProductsCount, filter} = this.props.catalog;
        const productFiltered = catalog.products
            .filter((p) => applyFilter(p, filter));
        const productsToDisplay = productFiltered
            .slice(0, displayedProductsCount);

        return (
            <>
                <Helmet>
                    <title>Voitures miniatures</title>
                    <meta name="description" content="Rechercher des voitures miniature par model, marque, échelle, nom, etc." />
                </Helmet>
                <Header location={location} match={match}>
                    <div className="home-header-content">
                        <h2>Chercher un modèle de voiture miniature</h2>
                        <CatalogSearchBar
                            brands={catalog.brands}
                            filter={filter}
                            changeFilter={changeFilter}
                        />
                        {this.renderFilterInfo(productFiltered.length, catalog.products.length)}
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

