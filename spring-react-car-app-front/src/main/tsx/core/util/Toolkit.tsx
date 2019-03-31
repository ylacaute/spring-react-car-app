
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

// Replace all special char by simple char
export const normalizeStr = (str: string): string => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const addScrollListener = (onScrollToEndCallback) => {
    const listener = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
            onScrollToEndCallback();
        }
    };
    window.addEventListener("scroll", listener);
    return listener;
};

export const removeScrollListener = (listener) => {
    window.removeEventListener("scroll", listener);
};
