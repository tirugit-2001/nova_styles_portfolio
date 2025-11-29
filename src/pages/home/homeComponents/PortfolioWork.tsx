import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { getInteriorPortfolio, requestHandler } from '../../../utils/api';

// Define the portfolio item type
interface PortfolioItem {
  _id?: string;
  id?: string | number;
  title: string;
  location: string;
  category: string;
  image: string;
}

const PortfolioWork = () => {
  const [selectedCategory] = useState('All');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'];

  const getMainPortfolioItems = async () => {
    setLoading(true);
    setError(null);
    requestHandler(
      async () => await getInteriorPortfolio(),
      (data) => {
        console.log(data);
        // Filter portfolios where showOnMainHome === true
        const filteredItems = data.portfolios.filter((item: any) => item.showOnMainHome === true);
        setPortfolioItems(filteredItems);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    )
  }

  useEffect(() => {
    getMainPortfolioItems();
  }, []);

  // Filter items by selected category
  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter((item: PortfolioItem) => item.category === selectedCategory);

  return (
    <section className="py-16 md:py-24 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Glimpse of Our Works
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Explore Interiors and Construction Projects by NovaStyle across India
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            <p className="mt-4 text-gray-600">Loading portfolio items...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-brand text-white rounded hover:bg-brand-dark"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {selectedCategory === 'All' 
                ? 'No portfolio items available yet.'
                : `No items found in ${selectedCategory} category.`}
            </p>
          </div>
        )}

        {/* Portfolio Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item._id || item.id || index}
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
                      onError={(e) => {
                        // Fallback image if Cloudinary image fails to load
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:bg-gradient-to-t group-hover:from-[#d6ad75]/90 group-hover:via-[#d6ad75]/50 group-hover:to-transparent transition-all duration-500" />
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-xl md:text-2xl font-bold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-200">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="text-center mt-12 md:mt-16">
            <a href="/portfolio">
              <button className="px-8 py-4 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                Load More Projects
                <ChevronRight size={24} />
              </button>
            </a>
          </div>
        )}
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

export default PortfolioWork;