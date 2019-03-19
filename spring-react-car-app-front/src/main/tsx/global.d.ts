
// ALLOW TYPESCRIPT COMPILER TO ACCEPT IMAGE IMPORTS
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

// ALLOW TYPESCRIPT COMPILER TO ACCEPT CSS & SCSS IMPORTS
declare module "*.css" {
    const content: {[className: string]: string};
    export = content;
}
declare module "*.scss" {
    const content: {[className: string]: string};
    export = content;
}

// ALLOW TYPESCRIPT TO ACCEPT GLOBAL COMPILE TIME VARIABLES
declare var APP_MODE: string;


// interface Global {
//     document: Document;
//     window: Window;
//     navigator: Navigator;
// }
