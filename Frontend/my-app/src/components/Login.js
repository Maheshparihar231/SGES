import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function Login() {
return (
    <div className="d-flex justify-content-center align-items-center py-5">
        <Card style={{ minWidth: 350 }} className="shadow">
            <Card.Body>
                <h3 className="mb-4">Login</h3>
                <Form>
                    <Form.Group className="mb-3 text-start" controlId="loginEmail">
                        <Form.Label className='text-danger'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="loginPassword">
                        <Form.Label className='text-danger'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100 mb-2">Login</Button>
                    <div className="text-center">
                        <span>Don't have an account? <a href="/signup" className="text-danger">Sign up</a></span>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </div>
);
}

export default Login;
