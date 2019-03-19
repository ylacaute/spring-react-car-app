import Mosaic from "core/component/layout/mosaic/Mosaic";
import MosaicItem from "core/component/layout/mosaic/MosaicItem";
import {ProductModel} from "feature/catalog/model/ProductModel";
import React from "react";
import Product from "./Product";

interface Props {
    products: ProductModel[];
}

class Catalog extends React.Component<Props> {

    private static renderProducts(products: ProductModel[]) {
        return products
            .map((p: ProductModel) => (
                <MosaicItem key={"mosaic-item" + p.brand + p.model}>
                    <Product
                        key={p.brand + p.model}
                        product={p}
                    />
                </MosaicItem>
        ));
    }

    render() {
        const {products} = this.props;
        return (
            <Mosaic>
                {Catalog.renderProducts(products)}
            </Mosaic>
        );
    }
}

export default Catalog;

