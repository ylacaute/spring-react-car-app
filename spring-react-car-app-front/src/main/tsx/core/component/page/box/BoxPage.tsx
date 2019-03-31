import Header from "core/component/layout/header";
import React, {ReactNode} from "react";
import Helmet from "react-helmet";
import "./BoxPage.scss";

import MosaicItem from "core/component/layout/mosaic/MosaicItem";
import {CatalogModel} from "feature/catalog/model/CatalogModel";
import BoxCard from "feature/catalog/component/BoxCard";
import Mosaic from "core/component/layout/mosaic";
import {BoxModel} from "../../../../feature/catalog/model/BoxModel";

interface Props {
    match: any;
    location: any;
    fetchCatalog: () => void;
    catalog: CatalogModel;
}

class BoxPage extends React.Component<Props> {

    componentDidMount() {
        console.log("HomePage: componentDidMount");
        if (this.props.catalog.products.length <= 0) {
            this.props.fetchCatalog();
        }
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
        const {match, location, catalog} = this.props;
        return (
            <>
                <Helmet>
                    <title>Box Page</title>
                    <meta name="description" content="This is a proof of concept for React SSR" />
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
            </>
        );
    }
}

export default BoxPage;
