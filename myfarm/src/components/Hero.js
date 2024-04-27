import React, { useState, useEffect } from 'react';
import './hero.css'; // Import your CSS file for styling
import img1 from '../images/cauli.jpg'

const Hero= () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:img1, // Replace with your image URLs
      text: 'Fresh Picks for a Healthy Life!',
    },
    {
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcabbage&psig=AOvVaw1P-urjx3mC1cgE-uLpKWRq&ust=1712376194796000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJjvtMiYqoUDFQAAAAAdAAAAABAE',
      text: 'Crunch into Goodness: Our Gardens Finest ',
    },
    {
      image: 'https://th.bing.com/th/id/R.d62e679b83345244004371e9e6bc8d30?rik=z41gsl5t1eo9EQ&pid=ImgRaw&r=0',
      text: 'Harvest Happiness with Every Bite',
    },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="text-box">
            <h1>{slide.text}</h1>
            <button>Learn More</button>
          </div>
        </div>
      ))}


    </div>
   
     
  );
};

export default Hero;