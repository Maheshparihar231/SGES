import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Carousel, Card } from 'react-bootstrap';
import randis from '../data/randis.ts';
import { FaMapMarkerAlt, FaStar, FaPhone, FaEnvelope, FaCalendarAlt, FaClock } from 'react-icons/fa';
import '../styles/Services.css';
import '../styles/Profile.css';

function Profile() {
  const { id } = useParams();
  const profile = randis.find(r => String(r.id) === String(id));

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
      <Carousel>
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100 profile-main-img" src={img} alt={`${profile.name}-${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              {renderGallery()}
              <div className="d-flex justify-content-between align-items-start mt-3">
                <div>
                  <h2 className="fw-bold">{profile.name} {profile.verified && <Badge bg="info" className="ms-2">Verified</Badge>}</h2>
                  <div className="text-muted">
                    <FaMapMarkerAlt /> <span className="ms-1">{profile.location}</span>
                    {profile.distance && <span className="ms-2">• {profile.distance} km away</span>}
                  </div>
                  <div className="mt-2 text-muted">Age: {profile.age} • {profile.nationality || 'N/A'}</div>
                </div>
                <div className="text-end">
                  <div className="mb-2">
                    <FaStar className="text-warning" /> <strong>{profile.rating}</strong>
                  </div>
                  <div className="mt-2">
                    <span className="fs-4 text-danger">${profile.price}</span><div className="text-muted">/hour</div>
                  </div>
                </div>
              </div>

              <hr />

              <h5>About</h5>
              <p>{profile.description}</p>

              {profile.servicesDetailed && (
                <>
                  <h5>Services & Pricing</h5>
                  <Row>
                    {profile.servicesDetailed.map((s, i) => (
                      <Col md={6} key={i} className="mb-2">
                        <Card className="p-2 h-100">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <strong>{s.name}</strong>
                              {s.durationMinutes && <div className="text-muted small">{Math.round(s.durationMinutes/60)}h {s.durationMinutes%60}m</div>}
                            </div>
                            <div className="text-end">
                              <div className="fw-bold">${s.priceUSD || '-'}</div>
                              {s.note && <div className="text-muted small">{s.note}</div>}
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}

              {profile.packages && (
                <>
                  <h5 className="mt-3">Packages</h5>
                  <Row>
                    {profile.packages.map((p) => (
                      <Col md={6} key={p.id} className="mb-2">
                        <Card className="p-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{p.title}</strong>
                              <div className="text-muted small">{p.hours} hrs</div>
                              {p.description && <div className="text-muted small">{p.description}</div>}
                            </div>
                            <div className="fw-bold">${p.price}</div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}

              <hr />

              <h5>Availability & Booking</h5>
              <div className="d-flex align-items-center mb-2">
                <FaCalendarAlt />
                <div className="ms-2">
                  {profile.availabilityNotes || 'See schedule below or contact for bookings.'}
                </div>
              </div>
              {profile.availabilitySchedule && (
                <div className="mb-3">
                  {profile.availabilitySchedule.map((slot, i) => (
                    <div key={i} className="small text-muted"><FaClock /> <span className="ms-1">{slot.day} {slot.from} - {slot.to}</span></div>
                  ))}
                </div>
              )}

              <div className="mb-3">
                <strong>Booking:</strong>
                <div className="mt-1">
                  {profile.bookingContact?.type === 'agent' && <div>Contact agent: {profile.bookingContact.agentId}</div>}
                  {profile.bookingContact?.type === 'in_app' && <div>Book securely through the app.</div>}
                </div>
              </div>

              <hr />

              <h5>Reviews</h5>
              {profile.reviews && profile.reviews.length > 0 ? (
                profile.reviews.map((r) => (
                  <Card key={r.id} className="mb-2 p-2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{r.clientName || 'Client'}</strong>
                        <div className="text-muted small">{r.date}</div>
                      </div>
                      <div className="text-end">
                        <div><FaStar className="text-warning" /> {r.rating}</div>
                        <div className="text-muted small">{r.text}</div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-muted">No public reviews yet.</div>
              )}

            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3 mb-3">
            <h6>Profile Details</h6>
            <div className="small text-muted mb-2">Last seen: {profile.lastSeenAt || 'N/A'}</div>
            <div className="small mb-2">Verified Steps: {profile.verifiedSteps ? profile.verifiedSteps.join(', ') : 'None'}</div>
            <div className="small mb-2">Languages: {profile.languagesDetailed ? profile.languagesDetailed.map(l => `${l.language} (${l.proficiency})`).join(', ') : (profile.languages || []).join(', ')}</div>
            <div className="small mb-2">Cancellation: {profile.cancellationPolicy || 'See booking terms'}</div>
            <div className="d-grid gap-2 mt-3">
              <Button variant="primary">Contact / Book</Button>
              <Link to="/services" className="btn btn-outline-secondary">Back to Listings</Link>
            </div>
          </Card>

          <Card className="shadow-sm p-3">
            <h6>Amenities & Preferences</h6>
            {profile.amenities ? (
              Object.entries(profile.amenities).map(([k, v]) => (
                <div key={k} className="small"><strong>{k}:</strong> {String(v)}</div>
              ))
            ) : (
              <div className="small text-muted">No data</div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
