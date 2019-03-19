
YARB - Yet Another React boilerplate 

# FEATURES
- [x] __Isomorphic (SSR)__
- [ ] __PWA__
- [x] __TypeScript__
- [ ] __Unit Tests__ (Jest)
- [ ] __Material-UI__
- [ ] __SEO__ (SSR, robot, sourceMaps)
- [ ] __Bundle analyzer__
- [ ] __Use HTTP2__

# LIB
- __Webpack 4__
- __React 16__
- __React Router 5__
- __Redux 3__

# BACKLOG
- [ ] __Fix connect-src (need to generate robot.txt for lighthouse, why ?)__
- [ ] __Use absolute imports from src and avoid relative imports__
- [ ] __Add error pages__
- [ ] __Add logger (morgan, winston...)__
- [ ] __Find a way to inject generated bundle names in server.tsx (currently hardcoded)__
- [ ] __Manager production build (how static assets should be managed ?)__
- [ ] __Mock a back-end API__
- [ ] __Optimize build : client and server are badly mixed up__
- [ ] __On fetch error : new redux action => Toaster__


# Useful tips for developers

## Stop relative imports


# Useful links
- [Webpack configuration examples](https://github.com/webpack/webpack/tree/master/examples)
- 


# Memo

## NPM
 - See out of date package of the project : npm outdated
 - 
 
 
 
 
Architecture :

  UI => Action => ReduxState => UI
  OR
  UI => Action => ReduxState => URL Broswer => UI

