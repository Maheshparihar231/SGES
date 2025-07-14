import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';

const Home = () => {
// Import images from assets

return (
    <div className="text-light p-0 m-0" style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', transform: 'translateX(-50%)'}}>
        {/* Full-width Carousel */}
        <Carousel fade interval={2000} className="w-100">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                    style={{ objectFit: 'cover', width: '100vw', height: '35vw', minHeight: 200, maxHeight: 600 }}
                />
                <Carousel.Caption className=" bg-opacity-50 p-3 rounded">
                    <h5>Discreet Connections</h5>
                    <p>Verified listings with full confidentiality.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                    style={{ objectFit: 'cover', width: '100vw', height: '35vw', minHeight: 200, maxHeight: 600 }}
                />
                <Carousel.Caption className=" bg-opacity-50 p-3 rounded">
                    <h5>Nearby Listings</h5>
                    <p>Discover real companions in your locality.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                    style={{ objectFit: 'cover', width: '100vw', height: '35vw', minHeight: 200, maxHeight: 600 }}
                />
                <Carousel.Caption className=" bg-opacity-50 p-3 rounded">
                    <h5>Safe & Trusted</h5>
                    <p>We prioritize your privacy and comfort.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
);
};

export default Home;
