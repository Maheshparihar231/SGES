import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Navigation items
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Escorts' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact' },
        { path: '/blog', label: 'Blog' }
    ];

    const authItems = [
        { path: '/login', label: 'Login' },
        { path: '/signup', label: 'Sign Up' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const handleSearch = (query) => {
        // Implement search functionality
        console.log(`Searching for: ${query}`);
    };

    return (
        <Navbar 
            expand="lg" 
            variant="dark" 
            fixed="top" 
            className={`main-header ${scrolled ? 'shadow-lg' : ''}`}
        >
            <Container fluid="lg" className="d-flex align-items-center justify-content-between">
                {/* Brand Logo */}
                <NavLink 
                    to="/" 
                    className="brand-logo text-decoration-none"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        RandiRadar
                    </motion.span>
                </NavLink>

                {/* Mobile Toggle */}
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav"
                    className="ms-2"
                />

                {/* Navbar Content */}
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Navigation Links */}
                    <Nav className="mx-auto">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.path}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `nav-link px-3 ${isActive ? 'active' : ''}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </motion.div>
                        ))}
                    </Nav>

                    {/* Search Bar */}
                    <div className="d-flex align-items-center">
                        <SearchBar onSearch={handleSearch} />
                        
                        {/* Auth Buttons */}
                        <div className="auth-buttons ms-3 d-flex gap-2">
                            {authItems.map((item, index) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `btn ${isActive ? 'btn-primary' : 'btn-outline-light'}`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;