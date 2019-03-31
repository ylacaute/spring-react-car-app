
export enum KernelStep {
    APP_LOADING = "APP_LOADING",
    APP_READY = "APP_READY", // Means default state loaded
    APP_RUNNING = "APP_RUNNING",
    FEATURE_LOADING = "FEATURE_LOADING"
}

export class KernelState {

    current: KernelStep;

    // Initial state
    static default: KernelState = {
        current: KernelStep.APP_LOADING
    };


}
