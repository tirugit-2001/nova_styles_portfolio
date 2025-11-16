import { ArrowRight } from 'lucide-react';

const ServiceSection = () => {
  const services = [
    {
      id: 1,
      title: "Interior Solutions",
      // price: "Starting ₹4,50,000",
      image: "/interior_solution.jpg",
      description: "home interiors delivered the hassle-free way",
      link: "/interiorHome"
    },
    {
      id: 2,
      title: "Residential Construction Services",
      // price: "Starting ₹4,50,000",
      image: "/residential_construction_services.png",
      description: "Dream homes built with quality and care",
      link: "/construction"
    },
    {
      id: 3,
      title: "Home Renovation Services",
      // price: "Starting ₹4,50,000",
      image: "/home_renovation.jpg",
      description: "Transform your space the effortless way",
      link: "/interiorHome"
    },
    {
      id: 4,
      title: "Nova Interior Products",
      // price: "Starting ₹4,50,000",
      image: "/nova_interior_product.jpg",
      description: "Decor & furnishings made for modern living",
      link: "https://app.nova-styles.com",
      isExternal: true
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-medium text-gray-800 mb-4">
            Our Comprehensive Design & Construction Services
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          Crafting dream homes with NovaStyles — seamlessly, beautifully, and on time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => {
            const isExternal = service.link?.startsWith('http') || service.isExternal;
            
            return (
              <div
                key={service.id}
                className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${service.image})`,
                    }}
                  >
                    {/* Gradient Overlay */}
                    <div className="" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-row justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-medium leading-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-base font-normal mb-2">
                      {service.description}
                    </p>
                    <p className="text-base md:text-lg font-semibold text-brand mb-4">
                      {/* {service.price} */}
                    </p>
                  </div>
                  {/* Learn More Link */}
                  <a
                    href={service.link}
                    {...(isExternal ? {
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {})}
                    className="mt-auto inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-dark transition-colors duration-300 group"
                  >
                    Learn More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12 md:mt-16">
          <button className="px-8 py-4 bg-amber-400 text-gray-900 rounded-lg hover:bg-brand-dark transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105">
            View All Services
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ServiceSection;