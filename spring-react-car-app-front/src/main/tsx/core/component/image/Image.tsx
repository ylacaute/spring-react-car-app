import React from "react";
import ProgressiveImage from "react-progressive-image";
import { PulseLoader } from "halogenium";
//import noImage from "assets/img/no-image-car.png";
import "./Image.scss";

//<img className="img-fluid" src={noImage} alt="an image"/>
interface Props {
    imagePath: string;
    onLoad?: () => void;
}

class Image extends React.Component<Props> {

    private placeholder = (
        <div className="placeholder">
            <PulseLoader className="loader" color="#fefefe" size="32px" margin="4px"/>
        </div>
    );

    render() {
        const {imagePath, onLoad}  = this.props;

        return (
            <ProgressiveImage
                src={imagePath}
                placeholder=""
            >
                {(src, loading) => loading ? this.placeholder :
                    <img className="img-fluid" src={src} alt="an image" onLoad={onLoad}/>}
            </ProgressiveImage>
        );
    }
}

export default Image;
