import AppState from "core/state/AppState";
import {connect} from "react-redux";
import PageHeader from "./PageHeader";

const mapStateToProps = (state: AppState) => ({
    loggedIn: state.session.loggedIn,
});

export default connect(mapStateToProps)(PageHeader);

