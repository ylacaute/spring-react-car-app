import Header from "core/component/layout/header";
import React, {ReactNode} from "react";
import Helmet from "react-helmet";
import "./BoxPage.scss";

import MosaicItem from "core/component/layout/mosaic/MosaicItem";
import {CatalogModel} from "feature/catalog/model/CatalogModel";
import BoxCard from "feature/catalog/component/BoxCard";
import Mosaic from "core/component/layout/mosaic";
import {BoxModel} from "../../../../feature/catalog/model/BoxModel";
import ErrorHandlerPage from "core/component/page/error/ErrorHandlerPage";

interface Props {
    match: any;
    location: any;
    fetchCatalog: () => void;
    catalog: CatalogModel;
}

class BoxPage extends React.Component<Props> {

    componentDidMount() {
        console.log("BoxPage:componentDidMount");
        //if (this.props.catalog.products.length <= 0) {
            this.props.fetchCatalog();
        //}
    }


    private static renderBoxes(boxes: BoxModel[]): ReactNode {
        console.log("boxes : ", boxes);
        return boxes
            .map(box => (
                <MosaicItem key={box.num + box.brand}>
                    <BoxCard box={box} />
                </MosaicItem>
            ));
    }

    render() {
        console.log("BoxPage:render");
        const {match, location, catalog} = this.props;
        return (
            <ErrorHandlerPage match={match} location={location}>
                <Helmet>
                    <title>Box Page</title>
                    <meta name="description" content="box page" />
                </Helmet>
                <Header location={location} match={match}>
                    <div className="box-header-content">
                        <h2>Toutes les caisses</h2>
                    </div>
                </Header>
                <article>
                    <Mosaic>
                        {BoxPage.renderBoxes(catalog.boxes)}
                    </Mosaic>
                </article>
                <footer role="contentinfo">
                </footer>
            </ErrorHandlerPage>
        );
    }
}

export default BoxPage;
