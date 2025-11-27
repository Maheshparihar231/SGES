import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Carousel, Modal, Image } from 'react-bootstrap';
import randis from '../data/randis.ts';
import { FaMapMarkerAlt, FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';
import '../styles/Profile.css';

// Utility function to format dates as relative (e.g., "4 hours ago") or absolute (e.g., "20 Oct 2025")
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffYears >= 1) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;

  // Fallback to formatted date (e.g., "20 Oct 2025")
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

function Profile() {
  const { id } = useParams();
  const profile = randis.find(r => String(r.id) === String(id));

  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Normalize amenities to an array (some data entries may be a CSV string)
  const amenities = Array.isArray(profile?.amenities)
    ? profile.amenities
    : (typeof profile?.amenities === 'string'
      ? profile.amenities.split(',').map(s => s.trim()).filter(Boolean)
      : []);

  if (!profile) {
    return (
      <Container className="py-5">
        <h3>Profile not found</h3>
        <Link to="/services" className="btn btn-outline-primary mt-3">Back to Listings</Link>
      </Container>
    );
  }

  const renderGallery = () => {
    const images = profile.gallery && profile.gallery.length ? profile.gallery : [profile.photo];
    return (
      <>
        <Carousel>
          {images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 profile-main-img"
                src={img}
                alt={`${profile.name}-${idx}`}
                onClick={() => { setCurrentImage(img); setShowModal(true); }}
                style={{ cursor: 'zoom-in' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        {images.length > 1 && (
          <div className="thumbnail-row d-flex mt-2">
            {images.map((t, i) => (
              <img key={i} src={t} alt={`thumb-${i}`} className="thumbnail-img me-2" onClick={() => { setCurrentImage(t); setShowModal(true); }} />
            ))}
          </div>
        )}
      </>
    );
  };


  return (
    <div className="profile-bg">
      <Container className="py-2">
        <Row className="g-3 align-items-start">
          {/* LEFT: Gallery/Carousel with thumbnails */}
          <Col lg={5} md={6}>
            <div className="profile-gallery-wrapper">
              {renderGallery()}
            </div>
          </Col>

          {/* RIGHT: All details, price, buttons, about, services */}
          <Col lg={7} md={6}>
            <div className="profile-details-wrapper">
              <div className="profile-header d-flex justify-content-between align-items-start gap-3">
                <div className="profile-title">
                  <h2 className="fw-bold mb-1">{profile.name} {profile.verified && <Badge bg="info" className="ms-2">Verified</Badge>}</h2>
                  <div className="text-muted small">
                    <FaMapMarkerAlt /> <span className="ms-1">{profile.location}</span>
                    {profile.distance && <span className="ms-2">• {profile.distance} km away</span>}
                  </div>
                  <div className="text-muted small mt-1">Age: {profile.age} • {profile.nationality || 'N/A'}</div>
                  <div className="amenities-badges mt-2">
                    {amenities.slice(0,6).map((a, i) => (
                      <Badge key={i} bg="secondary" className="me-1 mb-1 small" pill>{a}</Badge>
                    ))}
                  </div>
                </div>

                <div className="profile-cta-wrapper text-end">
                  <div className="rating-badge mb-2">
                    <FaStar className="me-1" /> <strong>{profile.rating}</strong> <span className="text-muted small ms-1">({profile.reviews?.length || 0})</span>
                  </div>
                  <div className="price-block mt-1 mb-2">
                    <div className="fs-4 text-danger fw-bold">${profile.price}</div>
                    <div className="text-muted small">/hour</div>
                  </div>
                </div>
              </div>

              <hr className="my-2" />

              <div className="d-grid gap-2 mb-3">
                <Button variant="primary">Contact / Book</Button>
                <Button variant="outline-secondary">Add to Favorites</Button>
              </div>

              <h5 className="mb-2">About</h5>
              <p className="mb-3">{profile.description}</p>

              {profile.servicesDetailed && (
                <>
                  <h5 className="mt-3 mb-2">Services & Pricing</h5>
                  <div className="services-scroll-wrapper">
                    {profile.servicesDetailed.map((s, i) => (
                      <div key={i} className="service-card">
                        <div className="service-card-inner">
                          <div className="service-header">
                            <strong className="service-title">{s.name}</strong>
                            <div className="service-price">${s.priceUSD || '-'}</div>
                          </div>
                          {s.durationMinutes && (
                            <div className="service-duration text-muted small">
                              <FaClock className="me-1" /> {Math.round(s.durationMinutes/60)}h {s.durationMinutes%60}m
                            </div>
                          )}
                          {s.note && (
                            <div className="service-note text-muted small mt-2">
                              {s.note}
                            </div>
                          )}
                          <Button variant="primary" className="mt-3 w-100">Book Now</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {profile.packages && profile.packages.length > 0 && (
                <>
                  <h5 className="mt-3 mb-2">Packages</h5>
                  <Carousel className="packages-carousel">
                    {profile.packages.map((p) => (
                      <Carousel.Item key={p.id}>
                        <div className="package-card">
                          <div className="package-card-inner">
                            <div className="package-header">
                              <strong className="package-title">{p.title}</strong>
                              <div className="package-price">${p.price}</div>
                            </div>
                            <div className="package-duration text-muted small">
                              <FaClock className="me-1" /> {p.hours} hrs
                            </div>
                            {p.description && (
                              <div className="package-description text-muted small mt-2">
                                {p.description}
                              </div>
                            )}
                            <Button variant="primary" className="mt-3 w-100">Select Package</Button>
                          </div>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </>
              )}

              <hr className="my-2" />

              {/* <h5 className="mb-2">Availability & Booking</h5>
              <div className="d-flex align-items-center mb-2">
                <FaCalendarAlt />
                <div className="ms-2 small">
                  {profile.availabilityNotes || 'See schedule below or contact for bookings.'}
                </div>
              </div>
              {profile.availabilitySchedule && (
                <div className="mb-2">
                  {profile.availabilitySchedule.map((slot, i) => (
                    <div key={i} className="small text-muted"><FaClock /> <span className="ms-1">{slot.day} {slot.from} - {slot.to}</span></div>
                  ))}
                </div>
              )}

              <div className="mb-2">
                <strong className="small">Booking:</strong>
                <div className="mt-1 small">
                  {profile.bookingContact?.type === 'agent' && <div>Contact agent: {profile.bookingContact.agentId}</div>}
                  {profile.bookingContact?.type === 'in_app' && <div>Book securely through the app.</div>}
                </div>
              </div>

              <hr className="my-2" /> */}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Reviews Section — Separate full-width container */}
      {profile.reviews && profile.reviews.length > 0 && (
        <div className="reviews-section">
          <Container className="py-4">
            <h4 className="mb-4">Client Reviews</h4>
            <Row>
              <Col lg={4} className="d-lg-flex flex-column justify-content-center">
                <div className="review-summary-card">
                  <h6 className="mb-3">Overall Rating</h6>
                  <div className="text-center">
                    <div className="display-4 fw-bold text-danger">{profile.rating}</div>
                    <div className="text-muted small mb-2">out of 5.0</div>
                    <div className="text-muted small">Based on {profile.reviews?.length || 0} reviews</div>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="reviews-list-wrapper">
                  {profile.reviews.map((r) => (
                    <div key={r.id} className="review-item">
                      <div className="review-header d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <strong className="small">{r.clientName || 'Client'}</strong>
                          <div className="text-muted small">{formatDate(r.date)}</div>
                        </div>
                        <div className="review-rating">
                          <FaStar className="text-warning me-1" /> <span className="fw-bold">{r.rating}</span>
                        </div>
                      </div>
                      <div className="review-text text-muted small">{r.text}</div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {/* Image viewer modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body className="p-0">
          {currentImage && <Image src={currentImage} alt="preview" fluid />}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
