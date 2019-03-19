import Header from "core/component/layout/header";
import React from "react";
import Helmet from "react-helmet";

interface Props {
    match: any;
    location: any;
}

class ContactPage extends React.Component<Props> {
    render() {
        const {match, location} = this.props;
        return (
            <>
                <Helmet>
                    <title>Contact Page</title>
                    <meta name="description" content="This is a proof of concept for React SSR" />
                </Helmet>
                <Header location={location} match={match}>
                    <h2>This is the contact page</h2>
                </Header>
                <article>
                    <p>Contact page !</p>
                </article>
                <footer>
                    TODO
                </footer>
            </>
        );
    }
}

export default ContactPage;
