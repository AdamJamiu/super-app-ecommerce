import React, { useState, useEffect } from 'react';

function CustomCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const intervalDuration = 3000;
    const totalSlides = slides.length;

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoplay) {
                // Calculate the index of the next slide
                setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
            }
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [autoplay, totalSlides]);

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides
        );
    };

    return (
        <div className="carousel">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''
                        }`}
                >
                    <img src={slide.image} alt={slide.title} />
                    <h2>{slide.title}</h2>
                </div>
            ))}

            <button onClick={prevSlide}>&#8249; Prev</button>
            <button onClick={nextSlide}>Next &#8250;</button>
        </div>
    );
}
