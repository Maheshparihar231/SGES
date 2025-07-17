import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

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
        // You can implement navigation or search logic here
        // For now, just alert or log
        alert(`Search for: ${query}`);
    };

    return (
        <Navbar 
            expand="lg" 
            variant="dark" 
            fixed="top" 
            className={`main-header ${scrolled ? 'shadow-lg' : ''}`}
        >
            <Container fluid="lg">
                {/* Brand */}
                <NavLink to="/" className="brand-logo">
                    RandiRadar
                </NavLink>

                {/* Mobile Toggle */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar Collapse */}
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Left Nav */}
                    <Nav className="me-auto">
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            end
                            className="nav-link"
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/services"
                            className="nav-link"
                        >
                            Browse
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/about"
                            className="nav-link"
                        >
                            About
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/contact"
                            className="nav-link"
                        >
                            Contact
                        </Nav.Link>
                    </Nav>

                    {/* Right: Search and Auth Links */}
                    <div className="d-flex align-items-center gap-3">
                        <div className="search-container">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <NavLink 
                            to="/login" 
                            className="auth-button login-btn"
                        >
                            Login
                        </NavLink>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;