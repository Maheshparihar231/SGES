import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login attempt with:', { email, password });
    };

    return (
        <motion.div 
            className="login-container d-flex justify-content-center align-items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="login-card">
                <Card.Body className="p-4">
                    <motion.h3 
                        className="login-title"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Welcome Back
                    </motion.h3>
                    <Form onSubmit={handleSubmit}>
                        <motion.div
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Form.Group className="form-group" controlId="loginEmail">
                                <Form.Label>
                                    <FaEnvelope className="me-2" />
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Form.Group className="form-group" controlId="loginPassword">
                                <Form.Label>
                                    <FaLock className="me-2" />
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div 
                                    className="password-toggle" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </Form.Group>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button className="login-btn w-100" type="submit">
                                Login
                            </Button>
                            <div className="text-center signup-text">
                                Don't have an account? {' '}
                                <Link to="/signup" className="signup-link">
                                    Sign up
                                </Link>
                            </div>
                        </motion.div>
                    </Form>
                </Card.Body>
            </Card>
        </motion.div>
    );
}

export default Login;
