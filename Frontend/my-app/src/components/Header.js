
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


function Header() {
    const navigate = useNavigate();
    const handleSearch = (query) => {
        // You can implement navigation or search logic here
        // For now, just alert or log
        alert(`Search for: ${query}`);
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
            <Container fluid="lg">
                {/* Brand */}
                <Navbar.Brand as={NavLink} to="/" className="fw-bold d-flex align-items-center gap-2 text-danger">
                    RandiRadar
                </Navbar.Brand>

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
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'text-danger fw-semibold' : 'text-light'}`
                            }
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/services"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'text-danger fw-semibold' : 'text-light'}`
                            }
                        >
                            Browse
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/about"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'text-danger fw-semibold' : 'text-light'}`
                            }
                        >
                            About
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/contact"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'text-danger fw-semibold' : 'text-light'}`
                            }
                        >
                            Contact
                        </Nav.Link>
                    </Nav>

                    {/* Right: Search and Auth Links */}
                    <div className="d-flex align-items-center gap-2">
                        <SearchBar onSearch={handleSearch} />
                        <NavLink to="/login" className="btn btn-danger ms-2">Login</NavLink>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;