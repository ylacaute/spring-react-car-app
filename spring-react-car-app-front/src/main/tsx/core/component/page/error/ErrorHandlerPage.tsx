import React from "react";
import Helmet from "react-helmet";
import Header from "core/component/layout/header";
import {toast} from "core/component/notification/toast";

interface Props {
    children: JSX.Element | JSX.Element[];
    match: any;
    location: any;
}

interface State {
    readonly error: any;
    readonly errorInfo: any;
}

class ErrorHandlerPage extends React.Component<Props, State> {

    readonly state: State = { error: undefined, errorInfo: undefined };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        const {match, location} = this.props;
        const {error, errorInfo} = this.state;
        if (!errorInfo) {
            return this.props.children;
        }
        const errorDetails =
            process.env.NODE_ENV === 'development' ? (
                <p>  {error && error.toString()}
                    <details className="preserve-space">
                        <pre>
                            {errorInfo.componentStack}
                        </pre>
                    </details>
                </p>
            ) : (
                undefined
            );

        return (
            <>
                <Helmet>
                    <title>Contact Page</title>
                    <meta name="description" content="error page" />
                </Helmet>
                <Header location={location} match={match}>
                    <h2>Oops</h2>
                </Header>
                <article>
                    <p className="error">An unexpected error has occurred.</p>
                    {errorDetails}
                </article>
            </>
        );
    }

}

export default ErrorHandlerPage;

