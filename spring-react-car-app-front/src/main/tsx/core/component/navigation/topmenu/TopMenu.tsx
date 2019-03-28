import React from "react";
import {Link} from 'react-router-dom';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import appRouteConfig, {RouteConfig} from "core/config/AppRouteConfig";
import "./TopMenu.scss";
import Icon from "../../image/icon";

interface Props {
}

interface State {
    isOpen: boolean;
}

class TopMenu extends React.Component<Props, State> {

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

    renderMenuItem(routeConfig: RouteConfig) {
        return (
            <NavItem key={routeConfig.path}>
                <NavLink tag={Link} to={routeConfig.path}>
                    {routeConfig.name}
                </NavLink>
            </NavItem>
        );
    }

    render() {
        return (
            <Navbar expand="md">
                <NavbarBrand tag={Link} to="/">Mes petites voitures</NavbarBrand>
                <NavbarToggler onClick={this.toggle}>
                    <Icon name="topMenuToggler"/>
                </NavbarToggler>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {appRouteConfig.getTopMenuRoutes()
                            .map(route => this.renderMenuItem(route))}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default TopMenu;
