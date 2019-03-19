import React from "react";
import "./Card.scss";

interface Props {
    className: string;
    children: React.ReactNode;
}

class Card extends React.Component<Props> {

    render() {
        const {children, className} = this.props;

        return (
            <div className={`card ${className}`}>
                {children}
            </div>
        );
    }
}

export default Card;
