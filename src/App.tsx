import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
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
  return (
    <>
      {/* <CartProvider> */}
        <NavBar />
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
        <CTABanner />
        <Footer />
      {/* </CartProvider> */}
    </>
  );
}

export default App;
