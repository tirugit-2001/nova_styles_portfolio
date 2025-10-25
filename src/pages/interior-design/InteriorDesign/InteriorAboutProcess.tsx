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
  mainTitle = "NovaStyles Interiors – Modular & Custom Home Interior Solutions",
  mainSubtitle = "Transform your home with bespoke interiors, modern finishes, and seamless project execution. ",
  buttonText = "Get Free Estimate",
  onButtonClick
}) => {
  const defaultSteps: Step[] = [
    {
      id: 1,
      number: "1",
      title: "Design Consultation",
      description: "Discuss your vision, style, and budget with our expert designers."
    },
    {
      id: 2,
      number: "2",
      title: "Space Planning & 3D Design",
      description: "Visualize your home interiors through realistic 3D renders before execution."
    },
    {
      id: 3,
      number: "3",
      title: " Material Selection & Execution",
      description: "Choose from curated materials and finishes while our team ensures seamless execution."
    },
    {
      id: 4,
      number: "4",
      title: " Quality Check & Handover",
      description: "Every detail is inspected to perfection — ensuring your interiors are flawless and ready to move in.  "
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