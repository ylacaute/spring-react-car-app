import React from "react";
import "./Icon.scss";

type IconName = "next"
    | "prev"
    | "bars"

interface Props {
    name: IconName;
}

const Icon = (props:Props) => (
    <i className={`icon ${props.name}`} />
);

export default Icon;