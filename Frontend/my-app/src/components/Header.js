import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Check authentication status when component mounts
    useEffect(() => {
        // Here you would typically check your auth state from your auth service
        // For example: checking localStorage, or a global auth state
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            if (token && userData) {
                setIsAuthenticated(true);
                setUser(JSON.parse(userData));
            }
        };
        
        checkAuth();
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

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
                        
                        {/* Conditional Auth Section */}
                        <div className="auth-section ms-3">
                            {isAuthenticated && user ? (
                                <Dropdown align="end">
                                    <Dropdown.Toggle 
                                        variant="link" 
                                        id="profile-dropdown"
                                        className="text-light text-decoration-none d-flex align-items-center p-0"
                                    >
                                        <FaUserCircle className="me-2" size={24} />
                                        <span className="d-none d-md-inline">{user.name}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="dropdown-menu-dark">
                                        <Dropdown.Item as={NavLink} to="/profile">
                                            My Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item as={NavLink} to="/settings">
                                            Settings
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleLogout}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <div className="d-flex gap-2">
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
                            )}
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;