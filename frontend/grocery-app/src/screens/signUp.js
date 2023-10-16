import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class Signup extends Component {
  render() {
    return (
      <div>
        <h2>Signup</h2>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
