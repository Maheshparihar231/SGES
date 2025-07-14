import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Card style={{ minWidth: 350 }} className="shadow">
        <Card.Body>
          <h3 className="mb-4 text-center">Sign Up</h3>
          <Form>
            <Form.Group className="mb-3" controlId="signupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="danger" type="submit" className="w-100 mb-2">Sign Up</Button>
            <div className="text-center">
              <span>Already have an account? <a href="/login" className="text-danger">Login</a></span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
