import ProcessSteps from "./aboutUsComponents/AboutProcess";
import AboutHero from "./aboutUsComponents/heroSection";
import ClientTalk from "../home/homeComponents/ClientTalk";
import PortfolioWork from "../home/homeComponents/PortfolioWork";

const AboutUs = () => {
  return (
    <>
      <AboutHero />
      <PortfolioWork />
      <ProcessSteps />
      <ClientTalk />
    </>
  );
};

export default AboutUs;
