


// Replace all special char by simple char
export const normalizeStr = (str: string): string => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const addScrollListener = (onScrollCallback) => {
    window.addEventListener("scroll", () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
            onScrollCallback();
        }
    });
};

export const removeScrollListener = (listener) => {
    window.removeEventListener("scroll", listener);
};
