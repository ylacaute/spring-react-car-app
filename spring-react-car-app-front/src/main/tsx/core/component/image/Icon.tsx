import React from "react";
//

// import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
// import "@fortawesome/fontawesome-free/scss/solid.scss";

//import "style/core/main.scss";
import "./Icon.scss";

interface Props {
    name: string;
}

class Icon extends React.Component<Props> {
    render() {
        const {name}  = this.props;
        return (
            <i className={`icon ${name}`} />
        );
    }
}

export default Icon;
