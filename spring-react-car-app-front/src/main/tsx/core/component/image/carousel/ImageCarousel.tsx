import React from "react";
import {Carousel, CarouselControl, CarouselIndicators, CarouselItem} from 'reactstrap';
import Image from 'core/component/image/image';
import "./ImageCarousel.scss";

export interface ImageCarouselSlide {
    imagePath: string;
    alt: string;
    caption?: string;
}

interface Props {
    className?: string;
    slides: ImageCarouselSlide[]
    onLoad?: () => void;
}

interface State {
    activeIndex: number
}

const ignoreLoad = () => {};

class ImageCarousel extends React.Component<Props, State> {

    animating = false;

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.slides.length - 1
            ? 0
            : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0
            ? this.props.slides.length - 1
            : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const {activeIndex} = this.state;

        const slideItems = this.props.slides.map((item, index) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.imagePath}
                >
                    <Image
                        imagePath={item.imagePath}
                        alt={item.alt}
                        onLoad={index == 0 ? this.props.onLoad : ()=>{}}
                    />
                </CarouselItem>
            );
        });

        return (
            <Carousel
                className="image-carousel carousel-fade"
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={slideItems} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slideItems}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default ImageCarousel;
