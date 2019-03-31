import React from "react";
import {BoxLink} from "./BoxLink";

import Icon from "../../../core/component/image/icon";
import Badge from "reactstrap/lib/Badge";


interface Props {
    brand: string;
    box: string;
}

export const BoxLinkBadge = (props: Props) => (
    <BoxLink brand={props.brand} box={props.box}>
        <Badge>
            <Icon name="box"/> Caisse {props.brand} n°{props.box}
        </Badge>
    </BoxLink>
);
