import {ProductModel, toURL} from "../model/ProductModel";
import {ReactNode} from "react";
import {Link} from "react-router-dom";
import React from "react";


interface Props {
    product:ProductModel;
    children: ReactNode
}

export const ProductLink = (props: Props) => (
    <Link className="product-link" to={toURL(props.product)}>
        {props.children}
    </Link>
);
