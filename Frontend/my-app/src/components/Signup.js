import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import '../styles/Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getPasswordStrength = (password) => {
    if (!password) return '';
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const strength = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (password.length < 6) return 'weak';
    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    return 'strong';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup attempt with:', formData);
  };

  return (
    <motion.div 
      className="signup-container d-flex justify-content-center align-items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="signup-card">
        <Card.Body className="p-4">
          <motion.h3 
            className="signup-title"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Create Account
          </motion.h3>
          <Form onSubmit={handleSubmit}>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Form.Group className="form-group" controlId="signupEmail">
                <Form.Label>
                  <FaEnvelope /> Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Form.Group className="form-group" controlId="signupPassword">
                <Form.Label>
                  <FaLock /> Password
                </Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div 
                      className={`password-strength-indicator strength-${getPasswordStrength(formData.password)}`}
                    />
                  </div>
                )}
              </Form.Group>
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Form.Group className="form-group" controlId="signupConfirmPassword">
                <Form.Label>
                  <FaCheckCircle /> Confirm Password
                </Form.Label>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </Form.Group>
            </motion.div>

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button className="signup-btn w-100" type="submit">
                Sign Up
              </Button>
              <div className="text-center login-text">
                Already have an account? {' '}
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </div>
            </motion.div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default Signup;
