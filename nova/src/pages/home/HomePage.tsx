import { Helmet } from "react-helmet-async";
import ClientTalk from "./homeComponents/ClientTalk";
import CTABanner from "./homeComponents/CTABanner";
import CustomProduct from "./homeComponents/CustomProduct";
import HeroSection from "./homeComponents/HeroSection";
import InteriorScroll from "./homeComponents/InteriorScroll";
import NovaProductDemo from "./homeComponents/NovaProduct";
import PortfolioWork from "./homeComponents/PortfolioWork";
import ServiceSection from "./homeComponents/ServiceSection";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Nova Styles | Luxury Home Interiors in Bangalore</title>
        <meta
          name="description"
          content="Transform your home with Nova Styles. We design modern, elegant, and functional interiors with expert craftsmanship and 3D visualization."
        />
        <meta
          name="keywords"
          content="home interiors, modern interior design, luxury interiors Bangalore, modular kitchen design, 3BHK interior, Nova Styles"
        />
      </Helmet>
      <HeroSection />
      <ServiceSection />
      <ClientTalk />
      <PortfolioWork />
      <InteriorScroll />
      <NovaProductDemo />
      <CustomProduct />
      <ClientTalk />
      <CTABanner />
    </>
  );
};

export default HomePage;
