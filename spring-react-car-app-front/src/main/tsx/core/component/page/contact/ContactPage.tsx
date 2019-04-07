import Header from "core/component/layout/header";
import React from "react";
import Helmet from "react-helmet";
import ErrorHandlerPage from "core/component/page/error/ErrorHandlerPage";

interface Props {
    match: any;
    location: any;
}

class ContactPage extends React.Component<Props> {
    render() {
        const {match, location} = this.props;
        return (
            <ErrorHandlerPage match={match} location={location}>
                <Helmet>
                    <title>Contact Page</title>
                    <meta name="description" content="contact page" />
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
            </ErrorHandlerPage>
        );
    }
}

export default ContactPage;
