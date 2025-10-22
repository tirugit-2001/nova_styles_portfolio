import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/home/HomePage";
import AboutUs from "./pages/aboutUs/AboutUs";
import PortfolioSection from "./pages/portfolio/portfolio";
import InteriorDesignForm from "./pages/contactUs/ContactForm";
import InteriorandDesign from "./pages/interior-design/InteriorandDesign";
import Construction from "./pages/constructions/construction";

function App() {
  return (
    <>
      {/* <CartProvider> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/portfolio" element={<PortfolioSection />} />
          <Route path="/contactUs" element={<InteriorDesignForm />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/interiorHome" element={<InteriorandDesign />} />
        </Routes>
        <Footer />
      {/* </CartProvider> */}
    </>
  );
}

export default App;
