import React from "react";
import ProgressiveImage from "react-progressive-image";
import { PulseLoader } from "halogenium";
import "./Image.scss";

interface Props {
    imagePath: string;
    noImagePath?: string;
    onLoad?: () => void;
}

const PlaceHolder = (props: any) => (
    <div className="placeholder">
        <PulseLoader className="loader" color="#fefefe" size="32px" margin="4px"/>
        {props.image && <img className="img-fluid" src={props.image} />}
    </div>
);

const Image = (props:Props) => (
    <ProgressiveImage src={props.imagePath} placeholder="">
        {(src, loading) => loading ? <PlaceHolder image={props.noImagePath} /> :
            <img className="img-fluid" src={src} alt="an image" onLoad={props.onLoad}/>}
    </ProgressiveImage>
);

export default Image;
