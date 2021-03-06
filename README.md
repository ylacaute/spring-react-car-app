
__Spring React Car App__ is a personal open source project.

 **Tech Stack**

<img src="/doc/img/tech/react.png" alt="React" title="React 16" width="50px"/><img src="/doc/img/tech/redux.png" alt="Redux" title="Redux 5" width="50px"/><img src="/doc/img/tech/redux-saga.png" alt="Redx-Saga" title="React-Saga 0.16" width="50px"/><img src="/doc/img/tech/sass.png" alt="SASS" title="SASS" width="50px"/><img src="/doc/img/tech/webpack.png" alt="Webpack" title="Webpack 4" width="50px"/><img src="/doc/img/tech/springboot.png" alt="Spring boot" title="Spring boot 2" width="50px"/><img src="/doc/img/tech/maven.png" alt="Maven" title="Maven" width="50px"/><img src="/doc/img/tech/docker.png" alt="Docker" title="Docker" width="50px"/>

# Demo

Online demo [http://demo.thorpora.fr/carapp/](http://demo.thorpora.fr/carapp/)


# Build

To build everything:
```shell
mvn clean install 
```

## Front
When you work only on the frontend, with webpack-dev-server, in the front directory:
```shell
npm run demo 
```
As you will not have all external static files, you can only start with the demo. 
When you start the application like that, it will just use the demo assets directory.

## Back
When you work on the backend, just start the spring application:
```shell
mvn spring-boot:run
```
Note that the frontend is packaged in a JAR file and the backend depend on it.
That is the magic trick of this project ! 

## Docker
The application can be dockerized with this command:
```shell
mvn install dockerfile:build
```

## Docker
### Start docker
All assets (cars) are supposed to be in /static for this example. As you don't have assets, you CAN'T use docker.
```shell
docker run --rm -i -p 8080:8080 -v /static:/static -t ylacaute/spring-react-car-app-api:latest
```
### Push docker image
You have to login to your docker registry and then do this command:
```shell
mvn dockerfile:push
```

# Technical backlog
- [x] Add gzip and cache
- [x] Use only fa icon needed from fontawesome
- [ ] Enable HTTP2 (generate cert with Let's Encrypt)
- [ ] A smaller featured image must be used in catalog to improve performance 
- [ ] Change image format to JPEG 2000, JPEG XR or WebP
- [ ] As 97% of bootstrap is not used: change include from .min to scss
- [ ] Remove the "micro flash" on image loading (Firefox)

# Functional backlog
- [ ] Keep the same position on scroll when click back on browser
- [ ] Contact page
- [ ] About page
- [ ] Car detail page (carousel too big)
- [ ] Site logo and favicon
- [ ] Home page header not nice on mobile
- [ ] Many things...


# Auto ref sites
- https://www.autos-minis.com/
