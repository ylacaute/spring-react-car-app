import React from "react";
import Image from "core/component/image/Image";
import Card from "core/component/layout/card/Card";
import {DEFAULT_SCALE, ProductModel} from "feature/catalog/model/ProductModel";
import {PulseLoader} from "halogenium";
import {ProductLink} from "./ProductLink";
import "./ProductCard.scss";

interface Props {
    className?: string;
    product: ProductModel;
}

class ProductCard extends React.Component<Props> {

    private getImagePath() {
        const {box, brand, model} = this.props.product;
        return `assets/VOITURES/${brand}/${box}/${model}/featured.jpg`;
    }

    render() {
        const {className, product} = this.props;
        const {brand, name} = this.props.product;
        const scale = this.props.product.scale ? this.props.product.scale : DEFAULT_SCALE;
        return (
            <Card className={`product ${className}`} >
                <ProductLink product={product}>
                    <figure className="product-thumb-image">
                        <Image imagePath={this.getImagePath()} />
                    </figure>
                </ProductLink>
                <div className="product-content">
                    <div className="product-title">
                        <h2 >{name}</h2>
                        <h3>{brand} - {scale}</h3>
                    </div>
                    <ProductLink product={product}>
                        Voir le détail
                    </ProductLink>
                </div>
            </Card>
        );
    }
}

export default ProductCard;
