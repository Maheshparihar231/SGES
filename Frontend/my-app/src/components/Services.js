import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Form } from 'react-bootstrap';
import randi from '../data/randis.ts';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaHeart, FaStar, FaFilter, FaSort, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Services.css';

function Services() {
  const [randis, setRandis] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredRandis, setFilteredRandis] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [filters, setFilters] = useState({
    ageRange: [],
    priceRange: [],
    distance: [],
    rating: [],
    services: [],
    availability: [],
    verified: false,
    featured: false
  });

  const filterOptions = {
    ageRange: [
      { label: '18-25', range: [18, 25] },
      { label: '26-35', range: [26, 35] },
      { label: '36-45', range: [36, 45] },
      { label: '45+', range: [45, 100] }
    ],
    priceRange: [
      { label: '$0-$100', range: [0, 100] },
      { label: '$101-$200', range: [101, 200] },
      { label: '$201-$500', range: [201, 500] },
      { label: '$500+', range: [500, Infinity] }
    ],
    distance: [
      { label: 'Within 5 km', value: 5 },
      { label: 'Within 10 km', value: 10 },
      { label: 'Within 20 km', value: 20 },
      { label: 'Within 50 km', value: 50 }
    ],
    rating: [
      { label: '4.5 & up', value: 4.5 },
      { label: '4.0 & up', value: 4.0 },
      { label: '3.5 & up', value: 3.5 },
      { label: '3.0 & up', value: 3.0 }
    ],
    services: [
      'Massage',
      'Overnight',
      'Roleplay',
      'Couples',
      'BDSM',
      'Travel Companion',
      'Dinner Date',
      'GFE'
    ],
    availability: ['Available Now', 'Available Today', 'Book in Advance']
  };

  useEffect(() => {
    // Initialize both randis and filteredRandis with the data
    const initialData = randi || [];
    setRandis(initialData);
    setFilteredRandis(initialData);
  }, []);

  useEffect(() => {
    // Only apply filters if we have data
    if (randis.length > 0) {
      applyFilters();
    }
  }, [filters, sortType, randis]);

  const applyFilters = () => {
    let filtered = [...randis];

    // Apply filters
    if (filters.ageRange.length) {
      filtered = filtered.filter(item => 
        filters.ageRange.some(range => 
          item.age >= range[0] && item.age <= range[1]
        )
      );
    }

    if (filters.priceRange.length) {
      filtered = filtered.filter(item =>
        filters.priceRange.some(range =>
          item.price >= range[0] && item.price <= range[1]
        )
      );
    }

    if (filters.distance.length) {
      filtered = filtered.filter(item =>
        filters.distance.includes(item.distance)
      );
    }

    if (filters.rating.length) {
      filtered = filtered.filter(item =>
        filters.rating.some(minRating => item.rating >= minRating)
      );
    }

    if (filters.services.length) {
      filtered = filtered.filter(item =>
        filters.services.some(service => item.services.includes(service))
      );
    }

    if (filters.availability.length) {
      filtered = filtered.filter(item =>
        filters.availability.includes(item.availability)
      );
    }

    if (filters.verified) {
      filtered = filtered.filter(item => item.verified);
    }

    if (filters.featured) {
      filtered = filtered.filter(item => item.featured);
    }

    // Apply sorting
    switch (sortType) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'age-asc':
        filtered.sort((a, b) => a.age - b.age);
        break;
      case 'age-desc':
        filtered.sort((a, b) => b.age - a.age);
        break;
      case 'distance-asc':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredRandis(filtered);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: Array.isArray(prev[category])
        ? prev[category].some(item => 
            Array.isArray(item) && Array.isArray(value) 
              ? JSON.stringify(item) === JSON.stringify(value)
              : item === value
          )
          ? prev[category].filter(item => 
              Array.isArray(item) && Array.isArray(value)
                ? JSON.stringify(item) !== JSON.stringify(value)
                : item !== value
            )
          : [...prev[category], value]
        : value
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
    );
  };

  // Helper function to handle missing data
  const getDisplayValue = (value, type = 'text') => {
    if (type === 'array') {
      return (value && value.length > 0) ? value.join(', ') : 'Not Provided';
    }
    if (type === 'price') {
      return value ? `$${value}` : 'Not Provided';
    }
    return value || 'Not Provided';
  };

  return (
    <div className="services-bg py-5">
      <Container fluid>
        <Row>
          {/* Left Sidebar Filters */}
          <Col lg={3} className="filters-sidebar">
            <div className="filter-section">
              <h4 className="filter-title">
                <FaFilter className="me-2" />
                Filters
              </h4>

              {/* Availability Filter */}
              <div className="filter-group">
                <h5>Availability</h5>
                {filterOptions.availability.map((option) => (
                  <Form.Check
                    key={option}
                    type="checkbox"
                    label={option}
                    checked={filters.availability.includes(option)}
                    onChange={() => handleFilterChange('availability', option)}
                    className="filter-checkbox"
                  />
                ))}
              </div>

              {/* Age Range Filter */}
              <div className="filter-group">
                <h5>Age Range</h5>
                {filterOptions.ageRange.map((range) => (
                  <Form.Check
                    key={range.label}
                    type="checkbox"
                    label={range.label}
                    checked={filters.ageRange.some(
                      (r) => JSON.stringify(r) === JSON.stringify(range.range)
                    )}
                    onChange={() => handleFilterChange('ageRange', range.range)}
                    className="filter-checkbox"
                  />
                ))}
              </div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <h5>Price Range</h5>
                {filterOptions.priceRange.map((range) => (
                  <Form.Check
                    key={range.label}
                    type="checkbox"
                    label={range.label}
                    checked={filters.priceRange.some(
                      (r) => JSON.stringify(r) === JSON.stringify(range.range)
                    )}
                    onChange={() => handleFilterChange('priceRange', range.range)}
                    className="filter-checkbox"
                  />
                ))}
              </div>

              {/* Distance Filter */}
              <div className="filter-group">
                <h5>Distance</h5>
                {filterOptions.distance.map((option) => (
                  <Form.Check
                    key={option.label}
                    type="checkbox"
                    label={option.label}
                    checked={filters.distance.includes(option.value)}
                    onChange={() => handleFilterChange('distance', option.value)}
                    className="filter-checkbox"
                  />
                ))}
              </div>

              {/* Rating Filter */}
              <div className="filter-group">
                <h5>Rating</h5>
                {filterOptions.rating.map((option) => (
                  <Form.Check
                    key={option.label}
                    type="checkbox"
                    label={
                      <span>
                        {option.label}{' '}
                        <FaStar className="text-warning" />
                      </span>
                    }
                    checked={filters.rating.includes(option.value)}
                    onChange={() => handleFilterChange('rating', option.value)}
                    className="filter-checkbox"
                  />
                ))}
              </div>

              {/* Services Filter */}
              <div className="filter-group">
                <h5>Services</h5>
                {filterOptions.services.map((service) => (
                  <Form.Check
                    key={service}
                    type="checkbox"
                    label={service}
                    checked={filters.services.includes(service)}
                    onChange={() => handleFilterChange('services', service)}
                    className="filter-checkbox"
                  />
                ))}
              </div>

              {/* Additional Filters */}
              <div className="filter-group">
                <h5>Additional Filters</h5>
                <Form.Check
                  type="checkbox"
                  label="Verified Profile"
                  checked={filters.verified}
                  onChange={() => handleFilterChange('verified', !filters.verified)}
                  className="filter-checkbox"
                />
                <Form.Check
                  type="checkbox"
                  label="Featured"
                  checked={filters.featured}
                  onChange={() => handleFilterChange('featured', !filters.featured)}
                  className="filter-checkbox"
                />
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            <div className="content-section">
              <h2 className="mb-3 text-center text-light h2 fw-bold">
                Find Your Perfect Match
              </h2>

              {/* Results Info and Sort Bar */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="results-info d-flex align-items-center">
                  <FaFilter className="text-danger me-2" size={14} />
                  <div className="d-flex align-items-center">
                    {filteredRandis.length === randis.length ? (
                      <span>Showing all {filteredRandis.length} profiles</span>
                    ) : (
                      <>
                        <span>Found {filteredRandis.length} matches</span>
                        {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f) && 
                          <span className="text-muted ms-1">from {randis.length} total</span>}
                      </>
                    )}
                    {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f) && (
                      <span className="badge bg-danger ms-2 py-1 px-2">
                        Filtered
                      </span>
                    )}
                  </div>
                </div>
                <div className="sort-bar">
                  <FaSort className="text-danger me-2" />
                  <Form.Select
                    onChange={(e) => setSortType(e.target.value)}
                    value={sortType}
                    className="sort-select"
                  >
                    <option value="default">Sort By</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="age-asc">Age (Youngest First)</option>
                    <option value="age-desc">Age (Oldest First)</option>
                    <option value="distance-asc">Distance (Nearest First)</option>
                    <option value="rating-desc">Rating (Highest First)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </Form.Select>
                </div>
              </div>

              <Row xs={1} sm={2} md={3} className="g-4">
                {filteredRandis.map((randi) => (
                  <Col key={randi.id}>
                    <Card className="escort-card h-100 border-0">
                      <div className="card-img-wrapper">
                        <Card.Img
                          variant="top"
                          src={randi.photo}
                          alt={randi.name}
                          className="card-hover-zoom"
                        />
                        <div className="card-overlay">
                          <Badge
                            bg={
                              randi.availability === 'Available'
                                ? 'success'
                                : 'danger'
                            }
                            className="position-absolute top-0 end-0 m-2"
                          >
                            {randi.availability}
                          </Badge>
                          <button
                            className="favorite-btn"
                            onClick={() => toggleFavorite(randi.id)}
                          >
                            <FaHeart
                              className={
                                favorites.includes(randi.id) ? 'text-danger' : ''
                              }
                            />
                          </button>
                        </div>
                      </div>
                      <Card.Body className="text-light">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Card.Title className="fs-5 fw-bold mb-0">
                            {getDisplayValue(randi.name)}
                            {randi.verified && (
                              <Badge bg="info" className="ms-2 verified-badge">
                                <FaCheck size={10} /> Verified
                              </Badge>
                            )}
                          </Card.Title>
                        </div>

                        {/* Minimal information for list view: location and age */}
                        <div className="escort-details mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <FaMapMarkerAlt className="text-danger me-2" />
                            <span className="fw-semibold">{getDisplayValue(randi.location)}</span>
                            {randi.distance && (
                              <span className="ms-2 text-muted">({randi.distance}km)</span>
                            )}
                          </div>

                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2">Age:</span>
                            <span className="text-light">{getDisplayValue(randi.age)}</span>
                          </div>
                        </div>

                        <div className="card-actions mt-2">
                          <button className="contact-btn flex-grow-1">
                            Contact
                          </button>
                          <Link
                            to={`/profile/${randi.id}`}
                            className="view-profile-btn"
                            style={{ textDecoration: 'none' }}
                          >
                            View
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Services;
