import routeConfig, {RouteConfig} from "core/config/AppRouteConfig";
import React from "react";
import {Link} from "react-router-dom";
import Route from "route-parser";
import "./Breadcrumbs.scss";
import AppRouteConfig from "../../../config/AppRouteConfig";

const isFunction = (value) => typeof value === "function";

const getPathTokens = (pathname) => {
    const paths = ["/"];
    if (pathname === "/") {
        return paths;
    }
    pathname.split("/").reduce((prev, curr) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });
    return paths;
};

function getRouteMatch(routes: RouteConfig[], path) {
    return routes
        .map((route) => {
            const routePath = route.path;
            const params = new Route(routePath).match(path);
            return {
                route,
                didMatch: params !== false,
                params
            };
        })
        .filter((item) => item.didMatch)[0];
}

function getBreadcrumbs({ appRouteConfig, match, location }) {
    const pathTokens = getPathTokens(location.pathname);
    return pathTokens.map((path, i) => {
        const routeMatch = getRouteMatch(appRouteConfig.getRouteConfigs(), path);
        const routeValue = routeMatch.route.name;
        // const name = isFunction(routeValue)
        //     ? routeValue(routeMatch.params)
        //     : routeValue;
        const name = routeValue;
        return { name, path };
    });
}

function Breadcrumbs({ match, location }) {
    // const breadcrumbs = getBreadcrumbs({ appRouteConfig: AppRouteConfig, match, location });
    // const renderItem = (breadcrumb, i) => (
    //     <span key={i}>
    //         {i === breadcrumbs.length - 1 && (
    //             <label className="breadcrumbs-item">{breadcrumb.name}</label>
    //         )}
    //         {i < breadcrumbs.length - 1 && (
    //             <Link className="breadcrumbs-item" to={breadcrumb.path}>
    //                 {breadcrumb.name}
    //             </Link>
    //         )}
    //         {i < breadcrumbs.length - 1 && (
    //             <label className="breadcrumbs-separator">/</label>
    //         )}
    //     </span>
    // );
    //
    // return (
    //     <div className="breadcrumbs">
    //         {breadcrumbs.map((breadcrumb, i) => renderItem(breadcrumb, i))}
    //     </div>
    // );
    return (
        <p>Breadcrumbs</p>
    )
}

export default Breadcrumbs;
