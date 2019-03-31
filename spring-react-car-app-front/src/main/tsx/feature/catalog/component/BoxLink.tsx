import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import {createFilterBox, filterToURL} from "../model/CatalogFilterModel";


interface Props {
    brand: string;
    box: string;
    children: ReactNode
}

export const BoxLink = (props: Props) => (
    <Link className="box-link" to={filterToURL(createFilterBox(props.brand, props.box))}>
        {props.children}
    </Link>
);

