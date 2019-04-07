import Card from "core/component/layout/card";
import Header from "core/component/layout/header";
import {fromURL, getProductImagePath, ProductModel} from "feature/catalog/model/ProductModel";
import React from "react";
import Helmet from "react-helmet";
import {ImageCarouselSlide, ImageCarousel} from "core/component/image/carousel";
import ErrorHandlerPage from "core/component/page/error/ErrorHandlerPage";
import "./CarDetailPage.scss";

// location and match properties come from React-Router
interface Props {
    location: any;
    match: any;
}

interface State {
    product: ProductModel;
    carouselLoaded: boolean;
}

class CarDetailPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            product: fromURL(this.props.location),
            carouselLoaded: false
        };
        this.handleFirstImageLoaded = this.handleFirstImageLoaded.bind(this);
        console.log("CarDetailPage:constructor");
    }

    private handleFirstImageLoaded() {
        this.setState((state) => {
            return {
                ...state,
                carouselLoaded: true
            };
        });
    }

    componentDidMount() {
        console.log("CarDetailPage:componentDidMount");
    }

    render() {
        console.log("CarDetailPage:render");
        const {match, location} = this.props;
        const {brand, name, scale, nbImg} = this.state.product;
        const {carouselLoaded, product} = this.state;
        const visibleClass = carouselLoaded ? "visible" : "";
        const slides:ImageCarouselSlide[] = [{
            imagePath: getProductImagePath(product, "featured"),
            alt: product.model
        }];
        for (let i = 1; i < nbImg - 1; i++) { // -1 : we don't want info.jpg
            slides.push({
                imagePath: getProductImagePath(product, i),
                alt: product.model
            });
        }
        return (
            <ErrorHandlerPage match={match} location={location}>
                <Helmet>
                    <title>product Page</title>
                    <meta name="description" content="..." />
                </Helmet>
                <Header location={location} match={match}>
                    <h1 className="car-detail-page-title">{brand} {name} {scale}</h1>
                </Header>
                <article className="car-detail-page">
                    <Card className={`car-gallery ${visibleClass}`}>
                        <ImageCarousel slides={slides} onLoad={this.handleFirstImageLoaded}/>
                    </Card>
                </article>
            </ErrorHandlerPage>
        );
    }
}

export default CarDetailPage;
