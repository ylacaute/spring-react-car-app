import React from "react";
import "./MosaicItem.scss";

interface Props {
    children: React.ReactNode;
}

class MosaicItem extends React.Component<Props> {

    render() {
        const { children } = this.props;
        return (
            <div className="mosaic-item">
                <div className="mosaic-item-inner">
                    {children}
                </div>
            </div>
        );
    }
}

export default MosaicItem;
