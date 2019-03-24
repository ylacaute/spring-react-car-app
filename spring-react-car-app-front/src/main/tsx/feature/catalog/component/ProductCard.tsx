import React from "react";
import Image from "core/component/image/image";
import Card from "core/component/layout/card/Card";
import {DEFAULT_SCALE, getProductImagePath, ProductModel} from "feature/catalog/model/ProductModel";
import {PulseLoader} from "halogenium";
import {ProductLink} from "./ProductLink";
import Icon from "../../../core/component/image/icon";
import "./ProductCard.scss";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    product: ProductModel;
}

class ProductCard extends React.Component<Props> {

    render() {
        const {className, product} = this.props;
        const {brand, name} = this.props.product;
        const scale = this.props.product.scale ? this.props.product.scale : DEFAULT_SCALE;
        const imgPath = getProductImagePath(product, "featured");
        const boxNumber = product.box.replace("CAISSE ", "");

        return (
            <Card className={`product ${className}`} >
                <ProductLink product={product}>
                    <figure className="product-thumb-image">
                        <Image imagePath={imgPath} noImagePath="/img/no-image-car.png" />
                    </figure>
                </ProductLink>
                <div className="product-content">
                    <div className="product-title">
                        <h2 className="product-name">{name}</h2>
                        <h3 className="product-brand">{brand} - {scale}</h3>
                    </div>
                    <footer>
                        <Icon name="box"/>
                        <Link to="#">
                            <span>Caisse {boxNumber}</span>
                        </Link>
                        <ProductLink product={product}>
                            Voir le détail
                        </ProductLink>
                    </footer>
                </div>
            </Card>
        );
    }
}

export default ProductCard;
