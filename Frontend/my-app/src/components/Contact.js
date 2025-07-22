import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BsShieldLockFill, BsCheckCircleFill } from 'react-icons/bs';
import { FaEnvelope, FaUser, FaLock, FaPaperPlane } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focused, setFocused] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formState);
    setIsSubmitting(false);
  };

  return (
    <div className="contact-bg">
      <Container>
        <div className="contact-header text-center mb-5 fade-in-up">
          <h2 className="mb-3">Get in Touch</h2>
          <p className="text-light opacity-75 fs-5 mx-auto" style={{ maxWidth: '600px' }}>
            Reach out securely and discreetly — your privacy is our priority
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {/* Left: Contact Form */}
          <Col md={6}>
            <Card className="contact-card border-0 fade-in-up delay-1">
              <Card.Body className="p-4">
                <h4 className="text-light mb-4 d-flex align-items-center">
                  <FaEnvelope className="me-2 highlight-text" />
                  Send us a Message
                </h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <div className="position-relative">
                      <Form.Control 
                        type="text"
                        placeholder="Your Name"
                        className={`${focused === 'name' ? 'focused' : ''}`}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused('')}
                        required
                      />
                      <FaUser className="position-absolute" />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <div className="position-relative">
                      <Form.Control 
                        type="email"
                        placeholder="Email address"
                        className={`${focused === 'email' ? 'focused' : ''}`}
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        required
                      />
                      <FaEnvelope className="position-absolute" />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control 
                      as="textarea"
                      rows={4}
                      placeholder="Your Message"
                      className={`${focused === 'message' ? 'focused' : ''}`}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      required
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="submit-btn w-100 d-flex align-items-center justify-content-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message Securely
                        <FaPaperPlane className="ms-2" />
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: Privacy Notice */}
          <Col md={5}>
            <Card className="security-card h-100 fade-in-up delay-2">
              <Card.Body className="p-4 d-flex flex-column justify-content-center">
                <div className="text-center mb-4">
                  <BsShieldLockFill className="security-icon mb-3" />
                  <h4 className="highlight-text text-danger">Confidential & Secure</h4>
                </div>
                
                <div className="security-features">
                  <p className="text-light opacity-75 mb-3 d-flex align-items-center">
                    <FaLock className="me-3 highlight-text" />
                    <span>End-to-end encrypted messaging ensures your privacy</span>
                  </p>
                  <p className="text-light opacity-75 mb-3 d-flex align-items-center">
                    <FaLock className="me-3 highlight-text" />
                    <span>Your identity and contact details remain confidential</span>
                  </p>
                  <p className="text-light opacity-75 d-flex align-items-center">
                    <FaLock className="me-3 highlight-text" />
                    <span>Secure routing to our dedicated support team</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-top border-light border-opacity-10">
                  <p className="text-light opacity-50 small fst-italic text-center mb-0">
                    Your security is our top priority. We follow industry-standard encryption protocols.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
