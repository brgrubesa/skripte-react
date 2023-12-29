import React, {useRef, useEffect } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "../components/features/VerticalWithAlternateImageAndText.js";
import Blog from "../components/blogs/ThreeColSimpleWithImage.js";
import Testimonial from "../components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "../components/forms/SimpleContactUs";
import Footer from "../components/footers/SimpleFiveColumn.js";
import { Element } from 'react-scroll';

export default () => { //eslint-disable-line


return (
  <AnimationRevealPage>
    <Hero/>
    <Element name="features">
      <Features />
    </Element>
    <Element name="blog">
      <Blog />
    </Element>
    {/* <div ref={testimonialRef} >
      <Testimonial />
    </div> */}
    <Element name="contact">
      <ContactUsForm />
    </Element>
    <Footer/>
  </AnimationRevealPage>
);
}