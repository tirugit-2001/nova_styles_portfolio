import React from 'react';

interface InteriorCustomProductProps {
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  startingPrice?: number;
  buttonText?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
}

const InteriorCustomProduct: React.FC<InteriorCustomProductProps> = ({
  title = "Building Your Dream Home Starts Here",
  subtitle = "From design to delivery — Nova Construction brings your vision to life.",
  // subtitle2 = "Upload your image or reference and our team will create a custom wallpaper just for you.",
  startingPrice = "4,50,000",
  buttonText = "Get Free Estimation",
  imageUrl = "/interior_page_1.png",
  onButtonClick
}) => {
  return (
    <div className="w-full   bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600 text-xl pr-10" >
              {subtitle} 
              <br />
              {/* <span>{subtitle2}</span> */}
            </p>
            
            <p className="text-brand text-base font-medium">
              Starting ₹{startingPrice}
            </p>
            <a href='/contactUs'>
            <button
              onClick={onButtonClick}
              className="bg-brand hover:bg-brand-dark text-white px-12 py-3 transition-colors duration-200 text-sm font-normal"
            >
              {buttonText}
            </button>
            </a>
          </div>

          {/* Right Image */}
          <div className="relative h-64 lg:h-80 overflow-hidden">
            <img
              src={imageUrl}
              alt="Interior Design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default InteriorCustomProduct;