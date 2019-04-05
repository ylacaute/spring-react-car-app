import React from "react";
import Image from "core/component/image/image";
import Card from "core/component/layout/card/Card";
import {PulseLoader} from "halogenium";
import {BoxModel} from "../model/BoxModel";
import {BoxLinkBadge} from "./BoxLinkBadge";
import {BoxLink} from "./BoxLink";
import "./BoxCard.scss";
import {contextPath} from "../../../core/config/AppRouteConfig";

interface Props {
    className?: string;
    box: BoxModel;
}

class BoxCard extends React.Component<Props> {

    render() {
        const {className, box} = this.props;

        let filter = {
            options: [{
                label: box.brand,
                value: box.brand
            }, {
                label: box.num,
                value: box.num
            }]
        };

        const img = `${contextPath}/img/box/box_${box.brand.toLowerCase()}.png`;

        return (
            <Card className={`box ${className}`} >
                <BoxLink brand={box.brand} box={box.num}>
                    <figure className="product-thumb-image">
                        <Image imagePath={img} noImagePath={`${contextPath}/img/no-image-car.png`} />
                    </figure>
                </BoxLink>
                <div className="box-content">
                    <h2 className="box-content-info">{box.carCount} modèles</h2>
                    <footer>
                        <BoxLinkBadge brand={box.brand} box={box.num} />
                    </footer>
                </div>
            </Card>
        );
    }
}

export default BoxCard;
