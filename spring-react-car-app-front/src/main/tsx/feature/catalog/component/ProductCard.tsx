import React from "react";
import Image from "core/component/image/Image";
import Card from "core/component/layout/card/Card";
import {DEFAULT_SCALE, getProductFeaturedImagePath, ProductModel} from "feature/catalog/model/ProductModel";
import {PulseLoader} from "halogenium";
import {ProductLink} from "./ProductLink";
import "./ProductCard.scss";

interface Props {
    className?: string;
    product: ProductModel;
}

class ProductCard extends React.Component<Props> {

    render() {
        const {className, product} = this.props;
        const {brand, name} = this.props.product;
        const scale = this.props.product.scale ? this.props.product.scale : DEFAULT_SCALE;
        const imgPath = getProductFeaturedImagePath(product);

        return (
            <Card className={`product ${className}`} >
                <ProductLink product={product}>
                    <figure className="product-thumb-image">
                        <Image imagePath={imgPath} noImagePath="/img/no-image-car.png" />
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
