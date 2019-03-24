import Image from "core/component/image/Image";
import Card from "core/component/layout/card/Card";
import Caroussel from "core/component/layout/caroussel";
import Header from "core/component/layout/header";
import {ProductModel, fromURL} from "feature/catalog/model/ProductModel";
import React from "react";
import Helmet from "react-helmet";
import "./CarDetailPage.scss";

interface Props {
    location: any;
    match: any;
}

interface State {
    product: ProductModel;
    carousselLoaded: boolean;
}

class CarDetailPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            product: fromURL(this.props.location),
            carousselLoaded: false
        };
        this.handleFirstImageLoaded = this.handleFirstImageLoaded.bind(this);
    }

    private getImagePath(index: string) {
        const {box, brand, model} = this.state.product;
        return `cars/${brand}/${box}/${model}/${index}.jpg`;
    }

    private handleFirstImageLoaded() {
        window.dispatchEvent(new Event("resize"));
        this.setState((state) => {
            return {
                ...state,
                carousselLoaded: true
            };
        });
    }

    render() {
        const {match, location} = this.props;
        const {brand, name, scale, nbImg} = this.state.product;
        const {carousselLoaded} = this.state;
        const visibleClass = carousselLoaded ? "car-gallery-visible" : "";

        const imgs = [];
        for (let i = 1; i < nbImg - 1; i++) { // -1 : we don't want info.jpg
            imgs.push(i);
        }

        return (
            <>
                <Helmet>
                    <title>product Page</title>
                    <meta name="description" content="..." />
                </Helmet>
                <div className="car-detail-page">
                    <Header location={location} match={match}>
                        <h1>{brand} {name} {scale}</h1>
                    </Header>
                    <Card className={`car-gallery ${visibleClass}`}>
                        <Caroussel>
                            <Image imagePath={this.getImagePath("featured")} onLoad={this.handleFirstImageLoaded}/>
                            {imgs.map((i) => <Image key={i} imagePath={this.getImagePath(i)} />)}
                        </Caroussel>
                    </Card>
                </div>
            </>
        );
    }
}

export default CarDetailPage;
