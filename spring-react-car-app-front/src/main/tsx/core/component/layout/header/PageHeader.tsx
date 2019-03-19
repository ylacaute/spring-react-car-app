import TopMenu from "core/component/navigation/topmenu/TopMenu";
import React from "react";
import "./PageHeader.scss";
import cn from 'classnames';
import Breadcrumbs from "../../navigation/breadcrumbs/Breadcrumbs";

interface Props {
    className: string;
    loggedIn: boolean;
    classes?: any;
    pathname?: string;
    match: any;
    location: any;
    children: React.ReactNode;
    type: string,
    tag: React.ReactNode
}
interface State {
    isOpen: boolean;
}


class PageHeader extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { className, match, location, children} = this.props;

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



<ResponsiveMenu
                    menuOpenButton={<Icon name="bars" />}
                    menuCloseButton={<Icon name="bars" />}
                    changeMenuOn="500px"
                    largeMenuClassName="large-menu"
                    smallMenuClassName="small-menu"
                    menu={
                        <ul className="responsive-menu-main">
                            <li>
                                <Link to="/">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    ContactPage
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    AboutPage
                                </Link>
                            </li>
                        </ul>
                    }
                />

 */

/*
<Menu
                    mode="horizontal"
                    openAnimation="slide-up"
                >
                    <MenuItem key="1">
                        <Link to="/">
                            A propos
                        </Link>
                    </MenuItem>
                    <MenuItem key="2">
                        <Link to="/contact">
                            ContactPage
                        </Link>
                    </MenuItem>
                    <MenuItem key="3">
                        <Link to="/">
                            Offres spéciales
                        </Link>
                    </MenuItem>
                    <MenuItem key="4">
                        <Link to="/">
                            Accueil
                        </Link>
                    </MenuItem>
                </Menu>

 */
/*

<Navbar color="indigo" dark expand="md" fixed="top" scrolling>
                    <NavbarBrand href="/">
                        <img
                            src={appLogo}
                            alt="car logo"
                            height="40"
                        />{" "}
                        MDB React
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleCollapse("mainNavbarCollapse")}
                    />
                    <Collapse
                        id="mainNavbarCollapse"
                        isOpen={this.state.collapseID}
                        navbar
                    >
                        <NavbarNav right>
                            <NavItem>
                                <NavLink
                                    exact
                                    to="/"
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                >
                                    HomePage
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                    to="/about"
                                >
                                    AboutPage
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                    to="/contact"
                                >
                                    ContactPage
                                </NavLink>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
 */
