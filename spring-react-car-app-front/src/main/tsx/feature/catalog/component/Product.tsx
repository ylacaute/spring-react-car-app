import React from "react";
import Image from "core/component/image/Image";
import Card from "core/component/layout/card/Card";
import {ProductModel, DEFAULT_SCALE, toURL} from "feature/catalog/model/ProductModel";
import {PulseLoader} from "halogenium";
import {Link} from "react-router-dom";

import "./Product.scss";

interface Props {
    className?: string;
    product: ProductModel;
}

class Product extends React.Component<Props> {

    private getImagePath() {
        const {box, brand, model} = this.props.product;
        return `assets/VOITURES/${brand}/${box}/${model}/featured.jpg`;
    }

    render() {
        const {className} = this.props;
        const {brand, name} = this.props.product;
        const scale = this.props.product.scale ? this.props.product.scale : DEFAULT_SCALE;
        return (
            <Card className={`product ${className}`} >
                <Image imagePath={this.getImagePath()} />
                <div className="product-content">
                    <div className="product-title">
                        <h2 >{name}</h2>
                        <h3>{brand} - {scale}</h3>
                    </div>
                    <Link
                        className="product-link"
                        to={toURL(this.props.product)}
                    >
                        Voir le détail
                    </Link>
                </div>
            </Card>
        );
    }
}

export default Product;
