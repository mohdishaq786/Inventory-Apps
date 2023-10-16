import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Container, Form, Col, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./landingStyles.css";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "http://localhost:5000/api";
class LandingPage extends Component {
  state = {
    showLogin: true,
    email: "",
    password: "",
    name: "",
  };

  componentDidMount() {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.props.history.push("/item");
    }
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        url + "/users/login",
        {
          email: this.state.email,
          password: this.state.password,
        },
        config
      );
      this.props.history.push("/item");
      console.log(response.data); // Handle the response as needed
      // Possibly set authentication state and redirect to another page
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  handleRegister = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        url + "/users",
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
        config
      );
      console.log(response.data); // Handle the response as needed
      // Possibly set authentication state and redirect to another page
      localStorage.setItem("userInfo", JSON.stringify(response.data)); ///loacl can not store the object data
      this.props.history.push("/item");
    } catch (error) {
      console.error("Registration Error:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      showLogin: !prevState.showLogin,
    }));
  };

  render() {
    return (
      <Container className="landing-container">
        <h1 className="title">Welcome To Grocery Inventory System</h1>
        <Row>
          <Col xs={12} md={24} lg={24}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  {this.state.showLogin ? "Login" : "Register"}
                </Card.Title>
                {this.state.showLogin ? (
                  <Form onSubmit={this.handleLogin}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </Form>
                ) : (
                  <Form onSubmit={this.handleRegister}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                  </Form>
                )}

                <Button variant="link" onClick={this.toggleForm}>
                  {this.state.showLogin
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(LandingPage); // Wrap component with withRouter to redircet to specific pages
//Comment why we unable to user withRouter bcox of version

//comment higher-order component to inject the history prop into your components. You can then use this.props.history.push('/item') to navigate to the /item page.
//juyst for understaniding

//However, hooks are not directly usable in class components. One workaround is to create a higher-order component (HOC) that uses the hook and passes the navigation function as a prop to your class component.
