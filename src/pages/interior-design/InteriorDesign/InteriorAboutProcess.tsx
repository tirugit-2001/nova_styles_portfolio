import React from 'react';

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
}

interface InteriorProcessStepsProps {
  steps?: Step[];
  mainTitle?: string;
  mainSubtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const InteriorProcessSteps: React.FC<InteriorProcessStepsProps> = ({
  steps,
  mainTitle = "Build Your Dream Home with NovaStyles Construction",
  mainSubtitle = "We deliver modern, durable, and beautifully crafted homes trusted by 100+ homeowners across India.",
  buttonText = "Get Free Estimate",
  onButtonClick
}) => {
  const defaultSteps: Step[] = [
    {
      id: 1,
      number: "1",
      title: "Design Consultation",
      description: "Start your home construction journey with a personalized design consultation. "
    },
    {
      id: 2,
      number: "2",
      title: "Detailed Planning & Quotation",
      description: "We prepare a transparent, itemized quotation — no hidden costs. "
    },
    {
      id: 3,
      number: "3",
      title: "Structural Execution",
      description: "Our experienced engineers and site supervisors ensure finish meets the highest standards quality."
    },
    {
      id: 4,
      number: "4",
      title: "Finishing & Handover",
      description: "From flooring to fittings, our team ensures every detail is executed perfectly."
    }
  ];

  const InteriorProcessSteps = steps || defaultSteps;

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-full px-8 mx-auto">
        {/* Steps Timeline */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {InteriorProcessSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connecting Line */}
                {index < InteriorProcessSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 z-0" 
                       style={{ marginLeft: '24px' }}></div>
                )}
                
                {/* Step Content */}
                <div className="relative z-10 text-center">
                  {/* Circle Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-300 text-gray-600 font-normal text-lg mb-4">
                    {step.number}
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-gray-900 font-medium text-lg mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-gray-600 text-base font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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