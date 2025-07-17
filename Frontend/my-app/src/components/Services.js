import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import randi from '../data/randis.ts';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import '../styles/Services.css';

function Services() {
  const [randis, setRandis] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setRandis(randi);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="services-bg py-5">
      <Container>
        <h2 className="mb-4 text-center text-light display-4 fw-bold">
          Find Your Perfect Match
        </h2>
        <p className="text-center text-light mb-5">
          Discover amazing companions in your area
        </p>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {randis.map((randi) => (
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
                  <Card.Title className="fs-5 fw-bold mb-3">
                    {randi.name}
                  </Card.Title>
                  <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt className="text-danger me-2" />
                    <span>{randi.location}</span>
                  </div>
                  <div className="mt-3">
                    <button className="contact-btn w-100">Contact Now</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Services;
