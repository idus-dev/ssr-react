import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable  camelcase */
class Grid extends Component {
    constructor(props) {
        super(props);

        const { staticContext } = this.props;
        let repos;

        if (__isBrowser__) {
            repos = window.__INITIAL_DATA__;
            delete window.__INITIAL_DATA__;
        } else {
            repos = staticContext.data;
        }

        this.state = {
            repos,
            loading: !repos
        };

        this.fetchRepos = this.fetchRepos.bind(this);
    }

    componentDidMount() {
        const { repos } = this.state;
        const { match } = this.props;
        if (!repos) {
            this.fetchRepos(match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { match } = this.props;

        if (nextProps.match.params.id !== match.params.id) this.fetchRepos(nextProps.match.params.id);
    }

    fetchRepos(lang) {
        const { fetchInitialData } = this.props;

        this.setState({ loading: true });

        fetchInitialData(lang)
            .then(repos => this.setState(() => ({ repos, loading: false })));
    }

    render() {
        const { repos, loading } = this.state;

        if (loading) return <h1>loading stuff...</h1>;

        return (
            <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                {repos.map(({ name, owner, stargazers_count, html_url }) => (
                    <li key={name} style={{ margin: 30 }}>
                        <ul>
                            <li><a href={html_url}>{name}</a></li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                ))}
            </ul>
        );
    }
}

Grid.defaultProps = {
    staticContext: {}
};

Grid.propTypes = {
    staticContext: PropTypes.shape({}),
    fetchInitialData: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default Grid;