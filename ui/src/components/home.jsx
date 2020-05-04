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

class Home extends React.Component {
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
                  md="6"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                  <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1
                      style={{ color: "white" }}
                      className="h1-responsive font-weight-bold mt-sm-5"
                    >
                      Chargeoff prediction analysis
                    </h1>
                    <hr className="hr-light" />
                    <h6 style={{ color: "white" }} className="mb-4">
                      We are here if you want to check whether an applicant will
                      be able to pay the loan or will be charging off the
                      amount. We have the accuracy of 72% with millions of
                      records and improving our Machine learning model every
                      minute.
                    </h6>
                    <MDBBtn
                      style={{ backgroundColor: "white", marginRight: "10px" }}
                      color="white"
                      onClick={(event) =>
                        (window.location.href = `/inputDetails`)
                      }
                    >
                      Predict
                    </MDBBtn>
                    <MDBBtn
                      style={{ backgroundColor: "white", marginLeft: "10px" }}
                      color="white"
                      onClick={(event) => (window.location.href = `/howWeWork`)}
                    >
                      How we work
                    </MDBBtn>
                  </MDBAnimation>
                </MDBCol>

                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation>
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

export default Home;
