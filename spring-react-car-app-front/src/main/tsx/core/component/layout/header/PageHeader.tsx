import TopMenu from "core/component/navigation/topmenu/TopMenu";
import React from "react";
import "./PageHeader.scss";
import cn from 'classnames';
import Breadcrumbs from "../../navigation/breadcrumbs/Breadcrumbs";

interface Props {
    className: string;
    children: React.ReactNode;
}

class PageHeader extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        const { className, children} = this.props;

        return (
            <header className={cn("page-header", className)}>
                <TopMenu />
                {children}
            </header>
        );
    }
}

export default PageHeader;

/*
<Breadcrumbs location={location} match={match}/>
 */
