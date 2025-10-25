// InteriorandDesign.tsx
import InteriorProcessSteps from "./InteriorDesign/InteriorAboutProcess";
import InteriorClientTalk from "./InteriorDesign/InteriorClientTalk";
import InteriorCustomProduct from "./InteriorDesign/InteriorCustomProduct";
import InteriorHeroSection from "./InteriorDesign/InteriorHeroSection";
import InteriorPortfolioWork from "./InteriorDesign/InteriorPortfolioWork";

const InteriorandDesign = () => {
  return (
    <>
      <InteriorHeroSection />
      <InteriorPortfolioWork />
      <InteriorClientTalk />
      <InteriorProcessSteps />
      <InteriorCustomProduct />
    </>
  );
};

export default InteriorandDesign;
