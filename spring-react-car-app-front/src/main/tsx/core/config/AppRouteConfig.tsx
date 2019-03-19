import About from "core/component/page/about";
import Contact from "core/component/page/contact";
import Home from "core/component/page/home";
import CarDetailPage from "core/component/page/car/CarDetailPage";
import React from "react";
import DemoPage from "../component/page/demo/DemoPage";
import BoxPage from "../component/page/box";

// Nice explanation of navigation with react-route-v4 :
//   https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

export interface RouteConfig {
    path: string;
    name: string;
    component: React.ReactNode;
    exact: boolean;
}

class AppRouteConfig {

    home:RouteConfig = {
        path: "/",
        name: "Home",
        component: Home,
        exact: false,
    };

    box:RouteConfig = {
        path: "/box",
        name: "Box",
        component: BoxPage,
        exact: false,
    };

    contact:RouteConfig = {
        path: "/contact",
        name: "Contact",
        component: Contact,
        exact: false,
    };

    about:RouteConfig = {
        path: "/about",
        name: "About",
        component: About,
        exact: false,
    };

    demo:RouteConfig = {
        path: "/demo",
        name: "DemoPage",
        component: DemoPage,
        exact: false,
    };

    carDetail:RouteConfig = {
        path: "/car",
        name: "Car",
        component: CarDetailPage,
        exact: false,
    };

    getAll(): RouteConfig[] {
        return [
            this.box,
            this.contact,
            this.about,
            this.demo,
            this.carDetail,
            this.home,
        ];
    }

    getTopMenuRoutes(): RouteConfig[] {
        return this.getAll()
            .filter(r => r.name != this.home.name)
            .filter(r => r.name != this.carDetail.name);
    }

}

export default new AppRouteConfig();
