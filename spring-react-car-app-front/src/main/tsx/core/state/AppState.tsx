import {CatalogModel, createDefaultCatalog} from "feature/catalog/model/CatalogModel";
import {KernelState} from "./KernelState";
import SessionState from "./SessionState";

export default interface AppState {

    kernel: KernelState;
    session: SessionState;
    catalog: CatalogModel;

}

export const createDefaultState = (): AppState => {
    return {
        kernel: KernelState.default,
        session: SessionState.default,
        catalog: createDefaultCatalog()
    }
};
