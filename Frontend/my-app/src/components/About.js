import React from 'react';

function About() {
    return (
        <div className="container py-5" style={{ minHeight: '60vh' }}>
            <h2 className="text-center mb-4 text-bold">About Us</h2>

            <div className="row mb-5">
                <div className="col-md-6 mb-4">
                    <div className="p-4 border rounded shadow-sm bg-light">
                        <h4 className="text-danger">Welcome to RandiRadar</h4>
                        <p>
                            <strong>RandiRadar</strong> is your trusted companion for discovering
                            verified adult service providers in your area. We offer a discreet, safe,
                            and modern way to connect with independent professionals — no middlemen,
                            no judgment.
                        </p>
                        <p>
                            Whether you're exploring companionship nearby or you're a provider seeking visibility and freedom, RandiRadar helps people connect with respect, clarity, and privacy.
                        </p>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="p-4 border rounded shadow-sm bg-white">
                        <h5 className="text-danger mb-3">Key Features</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">📍 Area-based search for quick discovery</li>
                            <li className="list-group-item">✅ Verified provider profiles</li>
                            <li className="list-group-item">🔐 Anonymous, encrypted messaging</li>
                            <li className="list-group-item">🕒 Real-time availability scheduling</li>
                            <li className="list-group-item">🌟 Ratings, reviews & transparency</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="table-responsive mb-5">
                <table className="table table-bordered shadow-sm">
                    <thead className="table-danger text-white">
                        <tr>
                            <th>Feature</th>
                            <th>What It Offers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Geo-Based Listings</strong></td>
                            <td>Search or auto-locate services near your current location</td>
                        </tr>
                        <tr>
                            <td><strong>Profile Control</strong></td>
                            <td>Providers can manage availability, rates, and details freely</td>
                        </tr>
                        <tr>
                            <td><strong>Secure Messaging</strong></td>
                            <td>In-app chat ensures confidentiality and safety</td>
                        </tr>
                        <tr>
                            <td><strong>User Reviews</strong></td>
                            <td>Helps ensure quality and builds trust within the community</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="alert alert-danger text-center shadow-sm" role="alert">
                <h5 className="mb-2">More than just a listing site.</h5>
                <p className="mb-0">
                    RandiRadar is about freedom, safety, and respect — for clients and providers alike.
                </p>
            </div>
        </div>
    );
}

export default About;
