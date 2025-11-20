import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ClientTalk = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh & Priya Nair",
      image: "/customerTalk.jpg",
      quote: "“NovaStyles transformed our small 2BHK into a beautiful, functional home we love.”",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh & Priya Nair",
      image: "/clientTalk2.jpg",
      quote: "“Professional team, stunning results. Our home feels brand new”",
      rating: 5
    },
    {
      id: 3,
      name: "Rajesh & Priya Nair",
      image: "/clientTalk3jpg.jpg",
      quote: "NovaStyles made our 3BHK look spacious and elegant. Highly recommended",
      rating: 5
    },
    {
      id: 4,
      name: "Amit & Sneha Sharma",
      image: "/constrution_hero1.jpg",
      quote: "“NovaStyles transformed our small 2BHK into a beautiful, functional home we love.”",
      rating: 5
    },
    {
      id: 5,
      name: "Vikram & Anita Patel",
      image: "/clientTalk3jpg.jpg",
      quote: "“Professional team, stunning results. Our home feels brand new”",
      rating: 5
    }
  ];

  const itemsPerView = 3;
  const maxIndex = testimonials.length - itemsPerView;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      if (isMobile) {
        // Mobile: cycle through all testimonials
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      } else {
        // Desktop: use maxIndex
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex, isMobile, testimonials.length]);

  const nextSlide = () => {
    // Clear any existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    // Pause auto-play temporarily, then restart
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    
    // Restart auto-play after 3 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      autoPlayTimeoutRef.current = null;
    }, 3000);
  };

  const prevSlide = () => {
    // Clear any existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    // Pause auto-play temporarily, then restart
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    
    // Restart auto-play after 3 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      autoPlayTimeoutRef.current = null;
    }, 3000);
  };

  // Swipe handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      // Clear any existing timeout
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      
      // Pause auto-play temporarily, then restart
      setIsAutoPlaying(false);
      
      if (isLeftSwipe) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
      
      // Restart auto-play after 3 seconds
      autoPlayTimeoutRef.current = setTimeout(() => {
        setIsAutoPlaying(true);
        autoPlayTimeoutRef.current = null;
      }, 3000);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Real homes. Real Stories. Crafted by NovaStyles
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Desktop View - 3 Cards */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-[33.333%] px-3">
                  <div className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Image with Quote Overlay */}
                    <div className="relative h-80">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0" />

                      {/* Content on Image */}
                      <div className="absolute bottom-0 left-0 right-20 top-48 p-2 text-black bg-[#DFE6DE]">
                        <div className="mb-2 ">
                          <p className="text-base md:text-base font-light">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        <p className="font-bold text-sm">-{testimonial.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - 1 Card with Swipe */}
          <div 
            className="md:hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="bg-white overflow-hidden shadow-lg">
              <div className="relative h-96">
                <img
                  src={testimonials[currentIndex % testimonials.length].image}
                  alt={testimonials[currentIndex % testimonials.length].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-20 top-60 p-3 text-black bg-[#DFE6DE]">
                  <div className="mb-2">
                    {/* <Quote className="text-base font-light" /> */}
                    <p className="text-base md:text-lg font-medium leading-relaxed">
                      "{testimonials[currentIndex % testimonials.length].quote}"
                    </p>
                  </div>
                  <p className="font-bold text-sm">
                    -{testimonials[currentIndex % testimonials.length].name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Hidden on Mobile */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 z-10 group items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 z-10 group items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: testimonials.length }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => {
                  // Clear any existing timeout
                  if (autoPlayTimeoutRef.current) {
                    clearTimeout(autoPlayTimeoutRef.current);
                  }
                  
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  
                  // Restart auto-play after 3 seconds
                  autoPlayTimeoutRef.current = setTimeout(() => {
                    setIsAutoPlaying(true);
                    autoPlayTimeoutRef.current = null;
                  }, 3000);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 md:w-8 md:h-2 bg-brand"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientTalk;