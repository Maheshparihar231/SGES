import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5" style={{ minHeight: '90vh' }}>
      <div className="text-center mb-5">
        <h2 className="text-danger fw-bold">Get in Touch</h2>
        <p className="text-muted">Reach out to us anonymously and securely — we’re here for your support, always.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Left: Contact Form */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h5 className="text-danger mb-4">Send us a Message</h5>
              <form>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingName" placeholder="John Doe" />
                  <label htmlFor="floatingName">Your Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="you@example.com" />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="Write something..." id="floatingMessage" style={{ height: '150px' }}></textarea>
                  <label htmlFor="floatingMessage">Your Message</label>
                </div>
                <button type="submit" className="btn btn-danger w-100">Submit Securely</button>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Privacy Notice */}
        <div className="col-md-5">
          <div className="card border-0 shadow bg-light h-100">
            <div className="card-body p-4 d-flex flex-column justify-content-center">
              <h5 className="text-danger mb-3">Confidential & Secure</h5>
              <p className="text-muted mb-3">
                Our platform prioritizes your privacy. All messages sent via this form are encrypted and routed securely to our support team.
              </p>
              <p className="text-muted mb-3">
                We do not display phone numbers, emails, or physical addresses publicly. Your identity and inquiry remain strictly confidential.
              </p>
              <p className="text-muted small fst-italic">
                Please do not include personal contact information unless you are comfortable doing so.
              </p>
              <div className="text-center mt-3">
                <i className="bi bi-shield-lock-fill fs-1 text-danger"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
