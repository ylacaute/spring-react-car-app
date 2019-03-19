import Header from "core/component/layout/header";
import React from "react";
import Helmet from "react-helmet";

interface Props {
    match: any;
    location: any;
}

class AboutPage extends React.Component<Props> {
    render() {
        const {match, location} = this.props;
        return (
            <>
                <Helmet>
                    <title>About Page</title>
                    <meta name="description" content="This is a proof of concept for React SSR" />
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
            </>
        );
    }
}

export default AboutPage;
