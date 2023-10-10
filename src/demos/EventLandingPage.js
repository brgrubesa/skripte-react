import React, {useRef, useEffect } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "../components/features/VerticalWithAlternateImageAndText.js";
import Blog from "../components/blogs/ThreeColSimpleWithImage.js";
import Testimonial from "../components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "../components/forms/SimpleContactUs";
import Footer from "../components/footers/SimpleFiveColumn.js";

export default () => { //eslint-disable-line

  const featuresContainerRef = useRef(null);
  const contactFormRef = useRef(null);
  const blogRef = useRef(null);
  const testimonialRef = useRef(null);

  const scrollToFeatures = () => {
    featuresContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBlog = () => {
    blogRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTestimonial = () => {
    testimonialRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactFormRef.current.scrollIntoView({ behavior: 'smooth' });
  };


return (
  <AnimationRevealPage>
    <Hero 
        scrollToFeatures={scrollToFeatures}
        scrollToBlog={scrollToBlog}
        scrollToTestimonial={scrollToTestimonial}
        scrollToContact={scrollToContact} 
        />
    <div ref={featuresContainerRef}>
      <Features />
    </div>
    <div ref={blogRef} >
      <Blog />
    </div>
    <div ref={testimonialRef} >
      <Testimonial />
    </div>
    <div ref={contactFormRef}>
      <ContactUsForm />
    </div>
    <Footer 
        scrollToFeatures={scrollToFeatures}
        scrollToBlog={scrollToBlog}
        scrollToTestimonial={scrollToTestimonial}
        scrollToContact={scrollToContact}  />
  </AnimationRevealPage>
);
}