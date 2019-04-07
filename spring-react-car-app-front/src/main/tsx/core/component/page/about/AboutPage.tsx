import Header from "core/component/layout/header";
import React from "react";
import Helmet from "react-helmet";
import ErrorHandlerPage from "core/component/page/error/ErrorHandlerPage";

interface Props {
    match: any;
    location: any;
}

class AboutPage extends React.Component<Props> {
    render() {
        const {match, location} = this.props;
        return (
            <ErrorHandlerPage match={match} location={location}>
                <Helmet>
                    <title>About Page</title>
                    <meta name="description" content="about page" />
                </Helmet>
                <Header location={location} match={match}>
                    <h2>This is the about page</h2>
                </Header>
                <article>
                    <p>About page !</p>
                </article>
                <footer role="contentinfo">
                    TODO
                </footer>
            </ErrorHandlerPage>
        );
    }
}

export default AboutPage;
