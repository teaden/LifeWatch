import React from 'react';
import Content from './Content';
import Data from './Data';
import Results from './Results';

export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            results: false
        };

        this.processResults = this.processResults.bind(this);
    }

    processResults = () => {
        this.setState({ results: !this.state.results });
    };

    render() {
        return this.state.results ? (
            <Results processResults={this.processResults} />
        ) : (
            <div className="main" >
                <Content />
                <Data processResults={this.processResults} />
            </div>
        );
    }
}

export default Main;