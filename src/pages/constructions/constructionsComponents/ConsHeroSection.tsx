import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsHeroSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    whatsappUpdates: false,
    pincode: "",
  });

  const stats = [
    { number: "15+", label: "Homes Project Completed" },
    { number: "05 Year", label: "Interior & Construction Warranty" },
    { number: "45 Days", label: "Guaranteed Project Completion" },
    { number: "100%", label: "Customer Satisfaction Assurance" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem("constructionHeroFormData", JSON.stringify(formData));
    // Navigate to contact form
    navigate("/ContactUs/construction");
  };


  return (
    <div className="relative w-full">
      {/* Hero Section with Form */}
      <div className="relative h-[600px] md:h-[700px] lg:h-[700px] overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${'/constrution_hero1.jpg'})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        {/* Content Container - Two Column Layout on Desktop */}
        <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Left Side - Hero Content */}
            <div className="flex items-center">
              <div className="text-white">
                <p className="text-sm md:text-2xl lg:text-2xl text-[#DFE6DE] font-medium tracking-wide mb-2">
                Complete Home Construction
                </p>
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-satoshi font-medium mb-4 leading-tight">
                  Build your dream home with NovaStyles Construction Experts
                </h1>
                {/* <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-2">
                  {slides[0].price}
                </p> */}
              </div>
            </div>

            {/* Right Side - Contact Form (Desktop only) */}
            <div className="hidden lg:flex items-center justify-end">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  Connect with Us
                </h3>
                <p className="text-gray-600 text-sm mb-6 text-center">
                  Get your dream home today. Let our experts help you
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                    required
                  />

                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-xl">🇮🇳</span>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="whatsapp-cons-desktop"
                      name="whatsappUpdates"
                      checked={formData.whatsappUpdates}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="whatsapp-cons-desktop" className="text-sm text-gray-700">
                      Get updates on Whatsapp
                    </label>
                  </div>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter Your Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand text-white rounded-lg hover:bg-brand-dark transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg"
                  >
                    Get Free Estimate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section - Below banner on mobile */}
      <div className="lg:hidden relative z-10 container mx-auto px-4 md:px-8 -mt-28">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              Connect with Us
            </h3>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Get your dream home today. Let our experts help you
            </p>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                required
              />

              <div className="relative">
                <span className="absolute left-4 top-3.5 text-xl">🇮🇳</span>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="whatsapp-cons-mobile"
                  name="whatsappUpdates"
                  checked={formData.whatsappUpdates}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <label htmlFor="whatsapp-cons-mobile" className="text-sm text-gray-700">
                  Get updates on Whatsapp
                </label>
              </div>

              <input
                type="text"
                name="pincode"
                placeholder="Enter Your Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
              />

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-lg hover:bg-brand-dark transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg"
              >
                Get Free Estimate
              </button>
            </div>
          </form>
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

export default ConsHeroSection;