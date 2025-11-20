import React from 'react';

interface InteriorProcessStepsProps {
  mainTitle?: string;
  mainSubtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const InteriorProcessSteps: React.FC<InteriorProcessStepsProps> = ({
  mainTitle = "NovaStyles Interiors – Modular & Custom Home Interior Solutions",
  mainSubtitle = "Transform your home with bespoke interiors, modern finishes, and seamless project execution. ",
  buttonText = "Get Free Estimate",
  onButtonClick
}) => {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-full px-8 mx-auto">
        {/* CTA Section */}
        <div className=" mt-20 text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            {mainTitle}
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-normal">
            {mainSubtitle}
          </p>
          <button
            onClick={onButtonClick}
            className="px-12 py-3 text-white text-lg font-normal hover:bg-brand-dark transition-opacity duration-200 bg-brand">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};



export default InteriorProcessSteps;