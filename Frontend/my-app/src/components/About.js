import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUserCheck, FaLock, FaClock, FaStar, FaComments, FaUserShield, FaThumbsUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/About.css';

function About() {
    return (
        <div className="about-bg py-5">
            <Container>
                <div className="text-center mb-5 fade-in-up">
                    <h1 className="about-title">About RandiRadar</h1>
                    <p className="text-light opacity-75 fs-5 mx-auto" style={{ maxWidth: '700px' }}>
                        Your trusted companion for discovering verified adult service providers in your area.
                        We offer a discreet, safe, and modern way to connect.
                    </p>
                </div>

                <Row className="g-4 mb-5">
                    <Col md={6}>
                        <div className="feature-card p-4 h-100 fade-in-up delay-1">
                            <h4 className="text-danger mb-4">Why Choose Us</h4>
                            <p className="text-light opacity-75">
                                At <span className="text-danger">RandiRadar</span>, we prioritize your privacy and safety.
                                Our platform enables genuine connections between clients and providers, 
                                ensuring a transparent and respectful environment for all.
                            </p>
                            <p className="text-light opacity-75">
                                Whether you're exploring companionship nearby or you're a provider seeking visibility,
                                we provide the tools and security you need.
                            </p>
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="feature-card p-4 h-100 fade-in-up delay-2">
                            <h4 className="text-danger mb-4">Key Features</h4>
                            <ul className="feature-list">
                                <li className="feature-item">
                                    <FaMapMarkerAlt className="feature-icon" />
                                    Area-based search for quick discovery
                                </li>
                                <li className="feature-item">
                                    <FaUserCheck className="feature-icon" />
                                    Verified provider profiles
                                </li>
                                <li className="feature-item">
                                    <FaLock className="feature-icon" />
                                    Anonymous, encrypted messaging
                                </li>
                                <li className="feature-item">
                                    <FaClock className="feature-icon" />
                                    Real-time availability scheduling
                                </li>
                                <li className="feature-item">
                                    <FaStar className="feature-icon" />
                                    Ratings, reviews & transparency
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>

                <motion.div 
                    className="features-table mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th>Premium Features</th>
                                <th>Benefits</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <FaMapMarkerAlt className="text-danger" />
                                    <strong>Geo-Based Listings</strong>
                                </td>
                                <td>Instantly discover and connect with nearby services tailored to your location preferences</td>
                            </tr>
                            <tr>
                                <td>
                                    <FaUserShield className="text-danger" />
                                    <strong>Profile Control</strong>
                                </td>
                                <td>Complete autonomy over your profile with real-time updates for availability and services</td>
                            </tr>
                            <tr>
                                <td>
                                    <FaComments className="text-danger" />
                                    <strong>Secure Messaging</strong>
                                </td>
                                <td>End-to-end encrypted chat system ensuring your conversations remain private and secure</td>
                            </tr>
                            <tr>
                                <td>
                                    <FaThumbsUp className="text-danger" />
                                    <strong>User Reviews</strong>
                                </td>
                                <td>Transparent feedback system fostering trust and quality service in our community</td>
                            </tr>
                        </tbody>
                    </table>
                </motion.div>

                <div className="highlight-box fade-in-up delay-3">
                    <h4 className="text-danger mb-3">More than just a listing site</h4>
                    <p className="mb-0 fs-5 text-light opacity-90">
                        RandiRadar is about freedom, safety, and respect — for clients and providers alike.
                        Join our community today and experience the difference.
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default About;
