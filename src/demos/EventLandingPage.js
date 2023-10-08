import React, {useRef} from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "../components/features/VerticalWithAlternateImageAndText.js";
import Blog from "../components/blogs/ThreeColSimpleWithImage.js";
import Testimonial from "../components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "../components/forms/SimpleContactUs";
import Footer from "../components/footers/SimpleFiveColumn.js";

export default () => { //eslint-disable-line

  const featuresContainerRef = useRef(null);

  const scrollToFeatures = () => {
    featuresContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };


return (
  <AnimationRevealPage>
    <Hero onClick={scrollToFeatures} />
    <div ref={featuresContainerRef}>
      <Features />
    </div>
    <Blog />
    <Testimonial />
    <ContactUsForm />
    <Footer />
  </AnimationRevealPage>
);
}