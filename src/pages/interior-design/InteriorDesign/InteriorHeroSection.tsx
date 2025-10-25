
const InteriorHeroSection = () => {

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
    // {
    //   title: "Home Renovation & Remodeling",
    //   subtitle: "Redesign your existing space with NovaStyles Renovation Servicess",
    //   price: "Book your free consultation",
    //   image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&h=800&fit=crop",
    // },
    // {
    //   title: "Designer Wallpapers, Flooring & Furnishing",
    //   subtitle: "Shop NovaStyles Interiors — wallpapers, flooring, furniture & more",
    //   price: "Starting ₹450 / sq.ft",
    //   image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&h=800&fit=crop",
    //   // buttonTxt:"Shop NovaStyles Products"
    // }
  ];

  // const stats = [
  //   { number: "500+", label: "Homes Completed" },
  //   { number: "05 Year", label: "Warranty" },
  //   { number: "05 Year", label: "Warranty" },
  //   { number: "45- Days", label: "Completion" }
  // ];

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 3000);

  //   return () => clearInterval(timer);
  // }, [slides.length]);

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % slides.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  // };

  // const goToSlide = (index: number) => {
  //   setCurrentSlide(index);
  // };

  return (
    <div className="relative w-full md:mt-[140px] lg:mt-[180px]">
      {/* Hero Slider */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            // className={`absolute inset-0 transition-opacity duration-1000 ${
            //   index === currentSlide ? 'opacity-100' : 'opacity-0'
            // }`}
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
          
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        </div>
      </div>
    </div>
  );
};

export default InteriorHeroSection;