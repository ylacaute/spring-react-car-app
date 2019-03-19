import AppState from "core/state/AppState";
import {fetchCatalog, fetchMoreProducts, changeFilter} from "feature/catalog/action/CatalogAction";
import {connect} from "react-redux";
import HomePage from "./HomePage";

const mapStateToProps = (state: AppState) => ({
    catalog: state.catalog
});

const mapDispatchToProps = {
    fetchMoreProducts,
    fetchCatalog,
    changeFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
