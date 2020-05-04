import React, { Component } from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        loan_amnt: 0, //nuber
        term: 36,
        int_rate: 1,
        installment: 0,
        emp_length: 0,
        dti: 0,
        earliest_cr_line: 0,
        open_acc: 0,
        pub_rec: 0,
        revol_util: 0,
        total_acc: 0,
        mort_acc: 0,
        pub_rec_bankruptcies: 0,
        annual_inc: 1,
        fico_score: 0,
        revol_bal: 0,
        grade: "",
        home_ownership: "OWN",
        verification_status: "Source Verified",
        purpose: "credit card",
        state: "",
        application_type: "",
      },
      result: "",
      debt: 0,
      income: 0,
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    console.log(name);
    if (name === "debt") {
      this.setState({
        debt: value,
      });
      console.log("debt", this.state.debt);
    } else if (name === "income") {
      console.log("income");
      this.setState({
        income: value,
      });
      console.log("income", value, this.state.debt);
      formData["dti"] = this.state.debt / value;
      console.log("dti", formData["dti"]);
    } else {
      formData[name] = value;
      this.setState({
        formData,
      });
    }
  };

  handlePredictClick = async (event) => {
    console.log(this.state.formData);
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch("http://127.0.0.1:5000/prediction/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(async (response) => {
        await this.setState({
          result: response.result,
          isLoading: false,
        });
        console.log(
          "the result=>" +
            this.state.result +
            ":" +
            this.state.result.split("array([")[1].substr(0, 1)
        );
        if (this.state.result.split("array([")[1].substr(0, 1) == 0) {
          this.setState({
            isResult: true,
          });
        } else {
          this.setState({
            isResult: false,
          });
        }
        await this.setState({
          confidence: this.state.result.split("array([")[2].split("]")[0],
        });
        console.log("this state=>" + JSON.stringify(this.state));
      });
  };

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  };

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    let input = null;
    var x;
    if (this.state.result && this.state.isResult) {
      x = "Fully Paid";
    } else if (this.state.result) {
      x = "Charged off";
    }

    input = (
      <Container style={{ marginTop: "80px" }}>
        <div>
          <h1 className="title">
            Money Lending Prediction
            <Link style={{ float: "right", fontSize: "30px" }} to="home">
              Home
            </Link>
          </h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Loan amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Loan amount"
                  name="loan_amnt"
                  value={formData.loan_amnt}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Term</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.term}
                  name="term"
                  defaultValue=""
                  onChange={this.handleChange}
                >
                  <option value="36">3 years</option>
                  <option value="60">5 years</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Interest Rate</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Interest Rate"
                  name="int_rate"
                  value={formData.int_rate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Installment Per month</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Installment Per month"
                  name="installment"
                  value={formData.installment}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Employment length</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Length of employment(in years)"
                  name="emp_length"
                  value={formData.emp_length}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Debt</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Debt"
                  name="debt"
                  value={formData.debt}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Income</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Income"
                  name="income"
                  value={formData.income}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Earliest Credit Line</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Earliest Credit Line"
                  name="earliest_cr_line"
                  value={formData.earliest_cr_line}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Open Accounts</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Open Accounts"
                  name="open_acc"
                  value={formData.open_acc}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Public Derogatory Records</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Public Derogatory Records"
                  name="pub_rec"
                  value={formData.pub_rec}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Revolving Utilization Rate</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Revolving Utilization Rate"
                  name="revol_util"
                  value={formData.revol_util}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Total Credit Lines</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Total Credit Lines"
                  name="total_acc"
                  value={formData.total_acc}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Mortgage Accounts</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mortgage Accounts"
                  name="mort_acc"
                  value={formData.mort_acc}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of Bankruptcies</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Number of Bankruptcies"
                  name="pub_rec_bankruptcies"
                  value={formData.pub_rec_bankruptcies}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Annual Income</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Annual Income"
                  name="annual_inc"
                  value={formData.annual_inc}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fiko Score</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Fiko Score"
                  name="fico_score"
                  value={formData.fico_score}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Revolving Balance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Revolving Balance"
                  name="revol_bal"
                  value={formData.revol_bal}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Employee Grade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Employee Grade"
                  name="grade"
                  value={formData.grade}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Home OwnerShip</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.home_ownership}
                  name="home_ownership"
                  onChange={this.handleChange}
                >
                  <option value="OWN">Own</option>
                  <option value="RENT">Rent</option>
                  <option value="OTHER">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Verification Status</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.verification_status}
                  name="verification_status"
                  onChange={this.handleChange}
                >
                  <option value="Source Verified">Source Verified</option>
                  <option value="Verified">Verified</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Purposes</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.purpose}
                  name="purpose"
                  onChange={this.handleChange}
                >
                  <option value="credit card">credit card</option>
                  <option value="debt consolation">debt consolation</option>
                  <option value="educational">educational</option>
                  <option value="home improvement">home improvement</option>
                  <option value="house">house</option>
                  <option value="major purchase">major purchase</option>
                  <option value="medical">medical</option>
                  <option value="moving">moving</option>
                  <option value="other">other</option>
                  <option value="renewable energy">renewable energy</option>
                  <option value="small business">small business</option>
                  <option value="vacation">vacation</option>
                  <option value="wedding">wedding</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Application Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Application Type"
                  name="application_type"
                  value={formData.application_type}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}
                >
                  {isLoading ? "Making prediction" : "Predict"}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}
                >
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null : (
            <Row>
              <Col className="result-container">
                {/* <br />
                <br />
                <h4>Prediction</h4>
                <h5>{x}</h5>
                <h4> Confidence</h4>
                <h5>{this.state.confidence}</h5> */}
                <br />
                <br />
                <Row>
                  <Col>
                    <h4>Prediction</h4>
                    <br />
                    <h5>{x}</h5>
                  </Col>
                  <Col>
                    <h4> Confidence</h4>
                    <br />
                    <h5>{this.state.confidence}</h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    );

    // } else if (this.state.isResult) {
    //   input = "your loan is done bro";
    // } else {
    //   input = "No loan for oyu bro";
    // }
    return <div>{input}</div>;
  }
}

export default App;
