// InteriorandDesign.tsx
import { Helmet } from "react-helmet-async";
import InteriorClientTalk from "./InteriorDesign/InteriorClientTalk";
import InteriorHeroSection from "./InteriorDesign/InteriorHeroSection";
import InteriorDesgnInteriorScroll from "./InteriorDesign/InteriorInteriorScroll";
import InteriorPortfolioWork from "./InteriorDesign/InteriorPortfolioWork";

const InteriorandDesign = () => {
  return (
    <>
      <Helmet>
        <title>Nova Styles | Interior Design Services & Portfolio</title>
        <meta
          name="description"
          content="Explore Nova Styles’ interior design services — from modern home interiors to luxury commercial spaces. View our portfolio, client stories, and design concepts that redefine elegance and comfort."
        />
        <meta
          name="keywords"
          content="interior design services, modern interior design, home renovation, luxury interiors, office interiors, interior design portfolio, Nova Styles interiors, custom furniture, residential interiors, commercial interior design, interior design studio, space transformation"
        />
        <meta
          property="og:title"
          content="Nova Styles | Interior Design Services & Portfolio"
        />
        <meta
          property="og:description"
          content="Explore Nova Styles’ expert interior design services and portfolio. Transform your home or workspace with elegant and functional design concepts."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://yourwebsite.com/interior-design"
        />
      </Helmet>

      <InteriorHeroSection />
      <InteriorPortfolioWork />
      <InteriorClientTalk />
      <InteriorDesgnInteriorScroll />
    </>
  );
};

export default InteriorandDesign;
