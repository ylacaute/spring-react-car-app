import React from "react";
import Image from "core/component/image/image";
import Card from "core/component/layout/card/Card";
import {DEFAULT_SCALE, getProductImagePath, ProductModel} from "feature/catalog/model/ProductModel";
import {PulseLoader} from "halogenium";
import {ProductLink} from "./ProductLink";
import "./ProductCard.scss";
import {BoxLinkBadge} from "./BoxLinkBadge";
import {getContextPath} from "../../../core/config/AppRouteConfig";

interface Props {
    className?: string;
    product: ProductModel;
}


class ProductCard extends React.Component<Props> {

    render() {
        const {className, product} = this.props;
        const {brand, name, box} = this.props.product;
        const scale = this.props.product.scale ? this.props.product.scale : DEFAULT_SCALE;
        const imgPath = getProductImagePath(product, "featured");

        return (
            <Card className={`product ${className}`} >
                <ProductLink product={product}>
                    <figure className="product-thumb-image">
                        <Image
                            alt={product.model}
                            imagePath={imgPath}
                            noImagePath={`${getContextPath()}/img/no-image-car.png`}
                        />
                    </figure>
                </ProductLink>
                <div className="product-content">
                    <div className="product-title">
                        <h2 className="product-name">{name}</h2>
                        <h3 className="product-brand">{brand} - {scale}</h3>
                    </div>
                    <footer>
                        <BoxLinkBadge brand={brand} box={box} />
                        <ProductLink product={product}>
                            Détail
                        </ProductLink>
                    </footer>
                </div>
            </Card>
        );
    }
}

export default ProductCard;
