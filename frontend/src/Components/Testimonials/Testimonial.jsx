import React, { useState, useEffect } from "react";
import './Testimonial.css'
import leftarrow from '../Assets/back.png'
import rightarrow from '../Assets/next.png'
const testimonials = [
  { id: 1, name: "John Doe", feedback: "This product is amazing! I highly recommend it.Our goal of empowering your health starts with our extraordinary ingredients. We use clinically backed wholefood ingredients to create blends which empower your body, mind and soul" },
  { id: 2, name: "Jane Smith", feedback: "Great service and support. Very satisfied!Our goal of empowering your health starts with our extraordinary ingredients. We use clinically backed wholefood ingredients to create blends which empower your body, mind and soul." },
  { id: 3, name: "Michael Brown", feedback: "Excellent quality! Will purchase again.Our goal of empowering your health starts with our extraordinary ingredients. We use clinically backed wholefood ingredients to create blends which empower your body, mind and soul." },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 3000); // Change testimonial every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  // Next Testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  // Previous Testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <div className="testimonial">
              <h2>What Our Customers Say</h2>

    <div className="testimonial-container">
      <div className="testimonial-card">
        <p>"{testimonials[currentIndex].feedback}"</p>
        <h4>- {testimonials[currentIndex].name}</h4>
      </div>

      {/* Navigation Arrows */}
      <div className="buttons">
      <button className="prev-btn" onClick={prevTestimonial}><img src={leftarrow} alt="" /></button>
      <button className="next-btn" onClick={nextTestimonial}><img src={rightarrow} alt="" /></button>
        </div>
      {/* Navigation Dots */}
      <div className="dots-container">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Testimonial;
