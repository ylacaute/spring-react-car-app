import BoxPage from "./BoxPage";
import AppState from "core/state/AppState";
import {connect} from "react-redux";
import {fetchCatalog} from "../../../../feature/catalog/action/CatalogAction";

const mapStateToProps = (state: AppState) => ({
    catalog: state.catalog
});

const mapDispatchToProps = {
    fetchCatalog: fetchCatalog
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxPage);

