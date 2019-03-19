import React from "react";
import "./Mosaic.scss";

interface Props {
    children: React.ReactNode;
}

class Mosaic extends React.Component<Props> {

    render() {
        const { children } = this.props;

        return (
            <div className="mosaic">
                {children}
            </div>
        );
    }
}

export default Mosaic;
