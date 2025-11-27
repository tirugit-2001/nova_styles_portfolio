import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { getInteriorPortfolio, requestHandler } from '../../../utils/api';

interface PortfolioItem {
  _id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  showOnInteriorHome: boolean;
  showOnMainHome?: boolean;
  showOnConstruction?: boolean;
}

const InteriorPortfolioWork = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  // const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'];

 

  function getAllPortfolio() {
    console.log("getAllPortfolio called");
    requestHandler(
      async () => await getInteriorPortfolio(),
      (data) => {
        // Filter portfolios where showOnInteriorHome === true
        if (data?.portfolios && Array.isArray(data.portfolios)) {
          const filteredPortfolios = data.portfolios.filter(
            (item: PortfolioItem) => item.showOnInteriorHome === true
          );

          setPortfolioItems(filteredPortfolios);
        } else {
          console.warn("Portfolios not found or not an array. Data structure:", data);
        }
      },
      (errorMessage) => {
        console.error("Error callback:", errorMessage || "Failed to fetch portfolio content");
      }
    );
  }
   // ✅ Fetch all portfolio records
   useEffect(() => {
    getAllPortfolio();
  }, []);

  // Monitor portfolioItems state changes
  useEffect(() => {
  }, [portfolioItems]);

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);
  
  console.log("filteredItems:", filteredItems);
  console.log("filteredItems length:", filteredItems.length);

  return (
    <section className="py-16 md:py-24 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Glimps of Our Works
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Latest dream home interiors delivered the hassle-free way
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full overflow-x-auto sm:overflow-x-visible">
        {/* <div className="flex sm:flex-wrap space-x-3 sm:space-x-0 sm:gap-3 min-w-max px-2 mb-10 md:mb-12 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-brand text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div> */}
      </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item._id}
              className="group relative bg-white overflow-hidden brand-lg hover:brand-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Container */}
                <a href="/portfolio">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay (bottom to top with #d6ad75 on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:bg-gradient-to-t group-hover:from-[#d6ad75]/90 group-hover:via-[#d6ad75]/50 group-hover:to-transparent transition-all duration-500" />

                {/* Text Overlay - Slide up effect */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200">
                    {item.location}
                  </p>
                </div>

                {/* Hover Button - Bottom Right */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {/* <button className="px-5 py-2 bg-amber-400 text-gray-900 rounded-lg font-semibold shadow-lg hover:bg-brand-dark flex items-center gap-2">
                    View Project
                    <ChevronRight size={18} />
                  </button> */}
                </div>
              </div>
                </a>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12 md:mt-16">
          <a href="portfolio">
            <button className="px-8 py-4 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
              Load More Projects
              <ChevronRight size={24} />
            </button>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default InteriorPortfolioWork;