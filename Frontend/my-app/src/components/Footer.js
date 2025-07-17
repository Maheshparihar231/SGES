import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaListAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaChevronRight } from 'react-icons/fa';
import { color, motion } from 'framer-motion';
import '../styles/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="modern-footer">
            <Container>
                <Row style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Col lg={5} md={6} className="footer-section mb-4 mb-md-0">
                        <motion.h5 
                            className="footer-brand"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            RandiRadar
                        </motion.h5>
                        <motion.p 
                            className="footer-description"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Where desire meets discretion — private listings, made personal.
                        </motion.p>
                        <motion.p 
                            className="footer-tagline"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Real people. Real moments. No judgment.
                        </motion.p>
                        
                        <motion.div 
                            className="social-icons"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="social-icon">
                                <FaFacebookF />
                            </div>
                            <div className="social-icon">
                                <FaTwitter />
                            </div>
                            <div className="social-icon">
                                <FaInstagram />
                            </div>
                        </motion.div>
                    </Col>

                    <Col lg={4} md={6} className="footer-section">
                        <motion.h5 
                            className="footer-section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Quick Links
                        </motion.h5>
                        <motion.ul 
                            className="footer-links"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <li>
                                <NavLink to="/" className="footer-link">
                                    <FaChevronRight />
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="footer-link">
                                    <FaChevronRight />
                                    <span>About</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" className="footer-link">
                                    <FaChevronRight />
                                    <span>Services</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="footer-link">
                                    <FaChevronRight />
                                    <span>Contact</span>
                                </NavLink>
                            </li>
                        </motion.ul>
                    </Col>
                </Row>

                <motion.hr 
                    className="footer-divider"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                />

                <motion.div 
                    className="text-center footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <p className="mb-0">&copy; {currentYear} RandiRadar. All rights reserved.</p>
                </motion.div>
            </Container>
        </footer>
    );
}

export default Footer;