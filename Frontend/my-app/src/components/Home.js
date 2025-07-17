import React from 'react';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import '../styles/Home.css';

const Home = () => {
    const carouselItems = [
        {
            image: img1,
            title: "Discreet Connections",
            description: "Verified listings with full confidentiality.",
            alt: "First slide"
        },
        {
            image: img2,
            title: "Nearby Listings",
            description: "Discover real companions in your locality.",
            alt: "Second slide"
        },
        {
            image: img3,
            title: "Safe & Trusted",
            description: "We prioritize your privacy and comfort.",
            alt: "Third slide"
        }
    ];

    return (
        <motion.div 
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="carousel-wrapper">
                <Carousel 
                    fade 
                    interval={3000} 
                    className="custom-carousel"
                    indicators={true}
                    pause="hover"
                >
                    {carouselItems.map((item, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="carousel-img"
                                src={item.image}
                                alt={item.alt}
                            />
                            <Carousel.Caption>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </motion.div>
    );
};

export default Home;
