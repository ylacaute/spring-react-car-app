import Icon from "core/component/image/Icon";
import React from "react";
import CarousselNavButton from "core/component/layout/caroussel/CarousselNavButton";
import {default as NukaCaroussel} from "nuka-carousel";

interface Props {
    className?: string;
    children: React.ReactNode;
}

class Caroussel extends React.Component<Props> {

    private static renderCenterRightControls(props: any) {
        return (
            <CarousselNavButton type="next" {...props}>
                <Icon name="next" />
            </CarousselNavButton>
        );
    }

    private static renderCenterLeftControls(props) {
        return (
            <CarousselNavButton type="prev" {...props}>
                <Icon name="prev" />
            </CarousselNavButton>
        );
    }

    render() {
        const {children, className} = this.props;
        return (
            <NukaCaroussel
                className={className}
                transitionMode="fade"
                renderCenterRightControls={Caroussel.renderCenterRightControls}
                renderCenterLeftControls={Caroussel.renderCenterLeftControls}
            >
                {children}
            </NukaCaroussel>
        );
    }
}

export default Caroussel;
