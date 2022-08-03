import React from "react";
import { attemptReceiveData } from '../store/data';
import { connect } from "react-redux";

export class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      results: false,
      adultMortality: 0,
      underFiveMortality: 0,
      infantMortality: 0,
      hiv: 0,
      measles: 0,
      hep: 0,
      underFiveDeaths: 0,
      polio: 0,
      diphtheria: 0,
      bmi: 0,
      gdp: 0,
      population: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    this.props.attemptReceiveData(this.state);
    this.setState({ results: true });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="adultMortality">Adult Mortality</label>
              <input type="number" className="form-control" id="adultMortality" defaultValue="0" name="adultMortality" onChange={this.handleChange} required />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="underFiveMortality">Under Age 5 Mortality</label>
              <input type="number" className="form-control" id="underFiveMortality" defaultValue="0" name="underFiveMortality" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="infantMortality">Infant Mortality</label>
              <input type="number" className="form-control" id="infantMortality" defaultValue="0" name="infantMortality" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="hiv">HIV Cases</label>
              <input type="number" className="form-control" id="hiv" defaultValue="0" name="hiv" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-row">
          </div>
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="measles">Measles Cases</label>
              <input type="number" className="form-control" id="measles" defaultValue="0" name="measles" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="hep">Hepatitis B Immunizations</label>
              <input type="number" className="form-control" id="hep" defaultValue="0" name="hep" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="polio">Polio Immunizations</label>
              <input type="number" className="form-control" id="polio" defaultValue="0" name="polio" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="diphtheria">Diphtheria Immunizations</label>
              <input type="number" className="form-control" id="diphtheria" defaultValue="0" name="diphtheria" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="bmi">BMI</label>
              <input type="number" className="form-control" id="bmi" defaultValue="0" name="bmi" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="alcohol">Alcohol</label>
              <input type="number" className="form-control" id="alcohol" defaultValue="0" name="alcohol" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label html="gdp">GDP</label>
              <input type="number" className="form-control" id="gdp" defaultValue="0" name="gdp" onChange={this.handleChange} />
            </div>
            <div className="form-group col-lg-2 col-sm-5">
              <label htmlFor="population">Population</label>
              <input type="number" className="form-control" id="population" defaultValue="0" name="population" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-2 col-sm-5 btn-container">
              <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Predict!</button>
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

