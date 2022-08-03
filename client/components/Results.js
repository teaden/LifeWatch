import React from 'react';
import { connect } from "react-redux";

function Results(props) {
    return (
        <div className="results">
            <div className="row">
                <div className="col">
                    <p>Your country's average life expectancy is predicted to be:</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2>{props.data}</h2>
                </div>
            </div>
            <div className="row">
                <div className="btn-container">
                    <button type="submit" className="btn btn-primary btn-lg" onClick={props.processResults}>Try Again!</button>
                </div>
            </div>
        </div>);
}

const mapStateToProps = state => {
    return { data: state.data };
};

export default connect(mapStateToProps, null)(Results);