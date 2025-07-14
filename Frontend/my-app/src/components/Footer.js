
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5 bottom-0">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>RandiRadar</h5>
                        <p className="small mb-1">
                            Where desire meets discretion — private listings, made personal.
                        </p>
                        <p className="small">
                            Real people. Real moments. No judgment.
                        </p>

                    </Col>
                    <Col md={6}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><NavLink to="/" className="text-light text-decoration-none">Home</NavLink></li>
                            <li><NavLink to="/about" className="text-light text-decoration-none">About</NavLink></li>
                            <li><NavLink to="/services" className="text-light text-decoration-none">Services</NavLink></li>
                            <li><NavLink to="/contact" className="text-light text-decoration-none">Contact</NavLink></li>
                        </ul>
                    </Col>
                </Row>
                <hr className="my-4" />
                <Row>
                    <Col className="text-center">
                        <p>&copy; 2025 My Website. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;