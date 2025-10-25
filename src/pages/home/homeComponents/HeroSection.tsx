import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import {HeroData} from '../../data.js'
// import type { HeroSectionModel } from '../../../Admin/AdminComponents/HeroSectionAdmin.js';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [slides, setSlides] = useState<HeroSectionModel[]>([])

//   useEffect(() => {
//     const stored = localStorage.getItem('heroData');
//     if(stored){
//       setSlides(JSON.parse(stored))
//     }
//   },[])


// // AUTO REFRESH WHEN THE ADMIN PANEL GETS ADDED THE INFORMATION
//   useEffect(() => {
//   const handleStorageChange = () => {
//     const updated = localStorage.getItem("heroData");
//     if (updated) setSlides(JSON.parse(updated));
//   };
//   window.addEventListener("storage", handleStorageChange);
//   return () => window.removeEventListener("storage", handleStorageChange);
// }, []);

// setSlides(heroData)

  const slides = [
    {
      title: "Complete Home Interior Design",
      subtitle: "Transform your 2BHK, 3BHK or Villa with end-to-end interior solutions",
      price: "Starting ₹4,50,000",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop",
    },
    {
      title: "Complete Home Interior Design",
      subtitle: "Build your dream home with NovaStyles Construction Experts",
      price: "Starting ₹1,000 / sq.ft",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    },
    {
      title: "Home Renovation & Remodeling",
      subtitle: "Redesign your existing space with NovaStyles Renovation Servicess",
      price: "Book your free consultation",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&h=800&fit=crop",
    },
    {
      title: "Designer Wallpapers, Flooring & Furnishing",
      subtitle: "Shop NovaStyles Interiors — wallpapers, flooring, furniture & more",
      price: "Starting ₹450 / sq.ft",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&h=800&fit=crop",
      // buttonTxt:"Shop NovaStyles Products"
    }
  ];

  const stats = [
    { number: "100+", label: "Homes Project Completed" },
    { number: "05 Year", label: "Interior & Construction Warranty" },
    { number: "45- Days", label: "Guaranteed Project Completion" },
    { number: "100%", label: "Customer Satisfaction Assurance" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full md:mt-[140px] lg:mt-[180px]">
      {/* Hero Slider */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full lg:mx-28  px-4 flex items-center">
              <div className="max-w-full text-white">
                <p className="text-sm md:text-2xl lg-text-2xl text-[#DFE6DE] font-medium tracking-wide">
                  {slide.title}
                </p>
                <h1 className="text-2xl md:text-3xl lg:text-6xl font-satoshi text font-medium mb-6 leading-tight">
                  {slide.subtitle}
                </h1>
                <p className="text-base md:text-base mb-2 text-white font-semibold">
                  {slide.price}
                </p>
                <a href="/contactUs">
                  <button className="lg:px-8 lg:py-4 px-6 py-2 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-semibold lg:text-lg text-sm shadow-xl hover:shadow-2xl hover:scale-105">
                    Get Free Estimate
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Right Bottom */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-brand'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 md:py-12 border-t border-gray-200">
        <div className="max-w-full mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl md:text-xl lg:text-2xl font-bold text-[#7C947A] mb-2">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg text-black font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;