import React from "react";
import "./CarousselNavButton.scss";

interface Props {
    type: "prev" | "next";
    currentSlide: number;
    wrapAround: any;
    slideCount: number;
    previousSlide: () => void;
    nextSlide: () => void;
    children: React.ReactNode;
    slidesToScroll: any;
}

export default class CarousselNavButton extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.type === "prev") {
            this.props.previousSlide();
        } else {
            this.props.nextSlide();
        }
    }

    isDisabled() {
        if (this.props.type === "prev") {
            return this.props.slideCount === 0 ||
                (this.props.currentSlide === 0 && !this.props.wrapAround);
        }
        return this.props.currentSlide + this.props.slidesToScroll >=
            this.props.slideCount && !this.props.wrapAround;
    }

    render() {
        const disabled = this.isDisabled();
        const {children, type} = this.props;

        return (
            <button
                className={`caroussel-btn ${type} ${disabled ? "disabled" : ""}`}
                disabled={disabled}
                onClick={this.handleClick}
                aria-label={type}
            >
                {children}
            </button>
        );
    }
}

