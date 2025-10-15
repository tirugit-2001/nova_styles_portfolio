import ProcessSteps from "./aboutUsComponents/AboutProcess";
import AboutHero from "./aboutUsComponents/heroSection";
import ClientTalk from "../home/homeComponents/ClientTalk";
import CTABanner from "../home/homeComponents/CTABanner";
import PortfolioWork from "../home/homeComponents/PortfolioWork";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Nova Styles | Creative Interior Designers</title>
        <meta
          name="description"
          content="Learn about Nova Styles — a team of creative interior designers offering bespoke design services for residential and commercial spaces. Discover our passion for modern and timeless interiors."
        />
        <meta
          name="keywords"
          content="about Nova Styles, interior designers, creative interiors, design experts, luxury home interiors, professional interior design team, modern architecture, home styling, interior decor experts, Nova Styles story"
        />
      </Helmet>
      <div className="mt-40">
        <AboutHero />
        <PortfolioWork />
        <ProcessSteps />
        <ClientTalk />
        <CTABanner />
      </div>
    </>
  );
};

export default AboutUs;
