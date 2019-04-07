import About from "core/component/page/about";
import Contact from "core/component/page/contact";
import Home from "core/component/page/home";
import CarDetailPage from "core/component/page/car/CarDetailPage";
import React from "react";
import DemoPage from "../component/page/demo/DemoPage";
import BoxPage from "../component/page/box";

// Nice explanation of navigation with react-route-v4 :
//   https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

export const getContextPath = (): string => {
    let ctx = "" + CONTEXT_PATH;
    console.log("getContextPath : " + ctx);
    if (ctx.endsWith("/")) {
        return ctx.substring(0, ctx.length - 1);
    }
    return ctx;
};

//export const contextPath = CONTEXT_PATH;
console.log("contextPath : '" + getContextPath() + "'");

export interface RouteConfig {
    path: string;
    name: string;
    component: React.ReactNode;
    exact: boolean;
}

class AppRouteConfig {

    home:RouteConfig = {
        path: "/",
        name: "Accueil",
        component: Home,
        exact: true,
    };

    box:RouteConfig = {
        path: "/box",
        name: "Caisses",
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
        name: "A propos",
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
            this.home,
            this.box,
            this.contact,
            this.about,
            //this.demo,
            this.carDetail,
        ];
    }

    getTopMenuRoutes(): RouteConfig[] {
        return this.getAll()
            .filter(r => r.name != this.carDetail.name);
    }

}

export default new AppRouteConfig();
