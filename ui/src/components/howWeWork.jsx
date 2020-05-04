import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBFormInline,
  MDBAnimation,
} from "mdbreact";
import "../App.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./Accuracy.png";

import Button from "react-bootstrap/Button";

class HowWeWork extends React.Component {
  state = {
    collapsed: false,
  };

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  routeChange = () => {
    let path = `newPath`;
    let history = useHistory();
    history.push(path);
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
      <div id="apppage">
        <MDBView>
          <MDBMask
            style={{ height: "1000px" }}
            className="d-flex justify-content-center align-items-center gradient"
          >
            <MDBContainer>
              <MDBRow>
                <MDBCol
                  md="12"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                  <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1
                      style={{ color: "white" }}
                      className="h1-responsive font-weight-bold mt-sm-5"
                    >
                      Chargeoff prediction analysis
                      <Link
                        style={{
                          float: "right",
                          fontSize: "30px",
                          color: "green",
                        }}
                        to="home"
                      >
                        Home
                      </Link>
                    </h1>
                    <hr className="hr-light" />
                    <h6 style={{ color: "white" }} className="mb-4">
                      LendingClub is a US based company and it is the world's
                      biggest peer-to-peer lending platform. In this project, we
                      aim to build a machine learning model that predicts the
                      probability that a loan will be charged off or not. Such
                      models help investors of LendingClub make better-informed
                      decisions in terms of investment. We have used a 1.8 GB
                      dataset with around 150 variables for each and every loan.
                      In training the model, we use only the features that are
                      known to investors before they choose to invest in the
                      loan.
                    </h6>
                    <h6 style={{ color: "white" }} className="mb-4">
                      These key features include, the income of the borrower,
                      FICO score, ratio of debt to income, and the required loan
                      amount, the purpose,his location, grade, and the interest
                      rate. The modeling process involves several steps,
                      consisting: removing the features with significant missing
                      data, or that aren't exposed to investors; exploring the
                      data, transforming the data, and visualizing it; creating
                      dummy variables for categorical features; filling missing
                      data with mean or median values; and the fitting models:
                      logistic regression, random forest, gradient boosting. We
                      have used cross validation techinique to select features
                      which really influence a decision on the dataset and
                      finalized 30 attributes for model training and testing.
                      All the analysis will be done in a Python Jupyter
                      Notebook, utilizing the packages numpy, pandas,
                      matplotlib, seaborn, and scikit-learn.
                    </h6>
                    <h6 style={{ color: "white" }} className="mb-4">
                      As a part of this project, We also developed an UI, which
                      is an enterprise application aimed at the investors. An
                      investor can enter the attributes in an UI and the
                      response returned is a probability that the loan will be
                      charged off.
                    </h6>
                    <br />
                    <img
                      class="card-img-left"
                      src={logo}
                      alt="Card image cap"
                      style={{
                        width: "500px",
                        height: "300px",
                        marginLeft: "30%",
                      }}
                    ></img>
                    <br />
                    <br />
                  </MDBAnimation>
                  <Button
                    block
                    variant="danger"
                    onClick={(event) =>
                      (window.location.href = `/inputDetails`)
                    }
                  >
                    Get Started
                  </Button>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <p>
                A platform implemented using Machine learning models to make a
                real-time prediction using a particular given output.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default HowWeWork;
