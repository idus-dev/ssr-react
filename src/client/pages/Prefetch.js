import React, { Component } from 'react';

class Prefetch extends Component {
    constructor(props) {
        super(props);

        let pageData;

        if (__isBrowser__) {
            pageData = window.__INITIAL_DATA__;
            delete window.__INITIAL_DATA__;
        }

        this.state = {
            pageData
        };
    }

    componentDidMount() {
        const { pageData } = this.state;
        const { preFetch } = this.props;

        if (!pageData) {
            preFetch()
                .then(data => {
                    this.setState({ pageData: data });
                });
        }
    }

    render() {
        const { pageData } = this.state;

        console.log(pageData);

        return (
            <div>
                loading...
            </div>
        );
    }
}

export default Prefetch;