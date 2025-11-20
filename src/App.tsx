import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/home/HomePage";
import AboutUs from "./pages/aboutUs/AboutUs";
import PortfolioSection from "./pages/portfolio/portfolio";
import Construction from "./pages/constructions/construction";
import CTABanner from "./pages/home/homeComponents/CTABanner";
import { ContactUs } from "./pages/contactUs/ContactUs";
import InteriorDesignForm from "./pages/contactUs/InteriorContactForm";
import InteriorandDesign from "./pages/interior-design/InteriorandDesign";
import ConstructionContactForm from "./pages/contactUs/ConstructionContactForm";

function App() {

  const location = useLocation();
   const isContactUsPage = location.pathname.toLowerCase().startsWith('/contactus');
  return (
    <>
      {/* <CartProvider> */}
        <NavBar />
        {/* Main content wrapper with padding for fixed navbar - ensures no content is hidden behind navbar */}
        <main className="pt-[90px] sm:pt-[120px] md:pt-[140px] lg:pt-[145px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/portfolio" element={<PortfolioSection />} />
            <Route path="/contactUs/interior" element={<InteriorDesignForm />} />
            <Route path="/ContactUs" element = {<ContactUs />} />
            <Route path = "/ContactUs/construction" element = {<ConstructionContactForm />} />

            <Route path="/construction" element={<Construction />} />
            <Route path="/interiorHome" element={<InteriorandDesign />} />
          </Routes>
          {
            !isContactUsPage &&(
              <CTABanner />
            )
          }
          <Footer />
        </main>
      {/* </CartProvider> */}
    </>
  );
}

export default App;
