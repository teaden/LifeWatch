import React from 'react';

function Content() {
    return (
        <div className="row list-container">
            <span className="list">
                <p>Please enter the forecasted data about your country:</p>
                <ul className="list-group list-group-horizontal-sm">
                    <li className="list-group-item">Adult Mortality - Per 1000 People</li>
                    <li className="list-group-item">Under Age 5 Mortality - Per 1000 People</li>
                    <li className="list-group-item">Infant Mortality - Per 1000 People</li>
                    <li className="list-group-item">HIV Cases - Per 1000 People</li>
                </ul>
                <ul className="list-group list-group-horizontal-sm">
                    <li className="list-group-item">Measles Cases - Per 1000 People</li>
                    <li className="list-group-item">Hepatitis B - Percentage Immunized</li>
                    <li className="list-group-item">Polio - Percentage Immunized</li>
                    <li className="list-group-item">Diptheria - Percentage Immunized</li>
                </ul>
                <ul className="list-group list-group-horizontal-sm">
                    <li className="list-group-item">Body Mass Index - Average</li>
                    <li className="list-group-item">Alcohol Consumed - Liters Per Capita</li>
                    <li className="list-group-item">Gross Domestic Product - USD Per Capita</li>
                    <li className="list-group-item">Total Country Population</li>
                </ul>
            </span>
        </div>
    );
}

export default Content;