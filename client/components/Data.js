import React from "react";
import { attemptReceiveData } from '../store/data';
import { connect } from "react-redux";

export class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      results: false,
      data: {
        adultMortality: '',
        infantDeaths: '',
        alcohol: '',
        hepatitisB: '',
        measles: '',
        BMI: '',
        underFiveDeaths: '',
        polio: '',
        diphtheria: '',
        HIV: '',
        GDP: '',
        population: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = event => {
    event.preventDefault();
    this.props.attemptUpdateUser(this.state);
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="adultMortality">Adult Mortality</label>
              <input type="number" className="form-control" id="adultMortality" placeholder="Per 1000" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="infantMortality">Under Age 5 Mortality</label>
              <input type="number" className="form-control" id="infantMortality" placeholder="Per 1000" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="infantMortality">Infant Mortality</label>
              <input type="number" className="form-control" id="infantMortality" placeholder="Per 1000" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="hiv">HIV Cases</label>
              <input type="number" className="form-control" id="hiv" placeholder="Email" />
            </div>
          </div>
          <div className="form-row">
          </div>
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="measles">Measles Cases</label>
              <input type="number" className="form-control" id="measles" placeholder="Password" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="hep">Hepatitis B Immunizations</label>
              <input type="number" className="form-control" id="hep" placeholder="%" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="polio">Polio Immunizations</label>
              <input type="number" className="form-control" id="polio" placeholder="%" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="diphtheria">Diphtheria Immunizations</label>
              <input type="number" className="form-control" id="diphtheria" placeholder="%" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="bmi">BMI</label>
              <input type="number" className="form-control" id="bmi" placeholder="Average" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="alcohol">Alcohol</label>
              <input type="number" className="form-control" id="alcohol" placeholder="Liters Per Capita" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label html="gdp">GDP</label>
              <input type="number" className="form-control" id="gdp" placeholder="USD Per Capita" />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="population">Population</label>
              <input type="number" className="form-control" id="population" placeholder="Total" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5 btn-container">
              <button type="submit" className="btn btn-success">Predict!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  attemptReceiveData: data => dispatch(attemptReceiveData(data))
});

export default connect(null, mapDispatchToProps)(Data);

