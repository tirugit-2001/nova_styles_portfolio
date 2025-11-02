import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export default function ConstructionContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    plotSize: "",
    builtUpArea: "",
    requirements: {
      "How many Floors": 1,
      Bedroom: 1,
      Bathrooms: 1,
      crockeryUnit: 1,
      Kitchen: 1,
    },
    selectedPackage: "",
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    whatsappUpdates: false,
  });

  // Read from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("constructionHeroFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData((prev) => ({
          ...prev,
          name: parsedData.name || prev.name,
          email: parsedData.email || prev.email,
          mobile: parsedData.mobile || prev.mobile,
          pincode: parsedData.pincode || prev.pincode,
          whatsappUpdates: parsedData.whatsappUpdates !== undefined ? parsedData.whatsappUpdates : prev.whatsappUpdates,
        }));
        // Clear localStorage after reading to avoid stale data
        localStorage.removeItem("constructionHeroFormData");
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const Construction_Project = [
    "New Villa Construction",
    "Residential House",
    "Home Extension",
    "Complete Renovation",
  ];
  const Plot_size = ["Up to 5 Cents", "5 - 10 Cents", "10-20 Cents", "20+ Cents"];
  const Built_up_area = [
    "Up to 1000",
    "1000-1500",
    "1500-2500",
    "2500-4000",
    "4000+",
  ];

  const packages = [
    {
      name: "Basic",
      subtitle: "For budget-conscious builders",
      items: [{ label: "Estimated Cost", price: "₹37,00,000" },
        { label: "✓ 5-year warranty" },
        { label: "✓ 6-8 month completion" },
      ],
    },
    {
      name: "Standard",
      subtitle: "For quality-focused builders",
      items: [
        { label: "Estimated Cost", price: "₹48,00,000" },
        { label: "✓ 5-year warranty" },
        { label: "✓ 6-8 month completion" },
      ],
    },
    {
      name: "Premium",
      subtitle: "For luxury villa builders",
      items: [
        { label: "Estimated Cost", price: "₹68,00,000" },
        { label: "✓ 5-year warranty" },
        { label: "✓ 6-8 month completion" },
      ],
    },
  ];

  const showToastMessage = (message: string, type: string = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleIncrement = (field: keyof typeof formData.requirements) => {
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        [field]: formData.requirements[field] + 1,
      },
    });
  };

  const handleDecrement = (field: keyof typeof formData.requirements) => {
    if (formData.requirements[field] > 0) {
      setFormData({
        ...formData,
        requirements: {
          ...formData.requirements,
          [field]: formData.requirements[field] - 1,
        },
      });
    }
  };

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.projectType || !formData.plotSize || !formData.builtUpArea) {
        showToastMessage("Please select all options before continuing", "error");
        return;
      }
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };


const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.mobile) {
    showToastMessage("Please fill in all required fields (Name, Email, Mobile)", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    showToastMessage("Please enter a valid email address", "error");
    return;
  }

  if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
    showToastMessage("Please enter a valid 10-digit mobile number", "error");
    return;
  }

  setIsSubmitting(true);

  // Get selected package price
  const selectedPackage = packages.find(pkg => pkg.name === formData.selectedPackage);
  const foundItem = selectedPackage?.items.find(item => item.price);
  const packagePrice = foundItem?.price 
    ? parseInt(foundItem.price.replace(/[₹,]/g, '') || '0')
    : 0;
  
  const totalPrice = packagePrice;

  // Prepare the data to send to backend
  const requestData = {
    projectType: formData.projectType,
    plotSize: formData.plotSize,
    builtUpArea: formData.builtUpArea,
    requirements: formData.requirements,
    selectedPackage: formData.selectedPackage,
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile.replace(/\D/g, ""), // Remove non-digits
    pincode: formData.pincode || "",
    whatsappUpdates: formData.whatsappUpdates || false,
    // Add pricing fields
    packagePrice: packagePrice,
    totalPrice: totalPrice,
  };

  try {
    const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/content/construction-form`;
    
    const response = await axios.post(API_URL, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    showToastMessage(
      response.data.message || "Form submitted successfully! Our team will contact you shortly.",
      "success"
    );

    // Reset form on success
    setFormData({
      projectType: "",
      plotSize: "",
      builtUpArea: "",
      requirements: {
        "How many Floors": 1,
        Bedroom: 1,
        Bathrooms: 1,
        crockeryUnit: 1,
        Kitchen: 1,
      },
      selectedPackage: "",
      name: "",
      email: "",
      mobile: "",
      pincode: "",
      whatsappUpdates: false,
    });
    setCurrentStep(1);
  } catch (error: any) {
    console.error("Failed to submit form:", error);
    
    // Handle different error types
    let errorMessage = "Failed to submit form. Please try again or contact support.";
    
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
    } else if (error.request) {
      // Request made but no response received
      errorMessage = "Unable to reach server. Please check your connection.";
    } else {
      // Error in setting up request
      errorMessage = error.message || errorMessage;
    }
    
    showToastMessage(errorMessage, "error");
  } finally {
    setIsSubmitting(false);
  }
};

  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Construction Project Type
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Construction_Project.map((plan) => (
            <button
              key={plan}
              onClick={() => setFormData({ ...formData, projectType: plan })}
              className={`py-3 px-5 border-2 transition-all -lg ${
                formData.projectType === plan
                  ? "border-brand bg-brand text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Plot Size</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Plot_size.map((size) => (
            <button
              key={size}
              onClick={() => setFormData({ ...formData, plotSize: size })}
              className={`py-3 px-5 border-2 transition-all -lg ${
                formData.plotSize === size
                  ? "border-brand bg-brand text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Built-up Area (sq ft)
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {Built_up_area.map((area) => (
            <button
              key={area}
              onClick={() => setFormData({ ...formData, builtUpArea: area })}
              className={`py-3 px-5 border-2 transition-all -lg ${
                formData.builtUpArea === area
                  ? "border-brand bg-brand text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-6">
        Your Construction Requirements
      </h3>

      {Object.entries(formData.requirements).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center justify-between py-3 border-b"
        >
          <span className="text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                handleDecrement(
                  key as "How many Floors" | "Bedroom" | "Bathrooms" | "crockeryUnit" | "Kitchen"
                )
              }
              className="w-8 h-8 flex items-center justify-center border border-gray-300  hover:bg-gray-100"
            >
              −
            </button>
            <span className="w-12 text-center border border-gray-300  py-1">
              {value}
            </span>
            <button
              onClick={() =>
                handleIncrement(
                  key as "How many Floors" | "Bedroom" | "Bathrooms" | "crockeryUnit" | "Kitchen"
                )
              }
              className="w-8 h-8 flex items-center justify-center border border-gray-300  hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
        Our Estimates Based On Your Preference
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`border-2 -lg p-6 cursor-pointer transition-all ${
              formData.selectedPackage === pkg.name
                ? "border-brand bg-yellow-50 shadow-lg"
                : "border-gray-300 hover:border-gray-400 hover:shadow-md"
            }`}
            onClick={() =>
              setFormData({ ...formData, selectedPackage: pkg.name })
            }
          >
            <h4 className="font-semibold text-gray-800 mb-1">{pkg.name}</h4>
            <p className="text-sm text-gray-600 mb-6">{pkg.subtitle}</p>

            <div className="space-y-3">
              {pkg.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.label}</span>
                  {item.price && <span className="font-medium">{item.price}</span>}
                </div>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFormData({ ...formData, selectedPackage: pkg.name });
                handleNext();
              }}
              className="w-full mt-6 bg-brand hover:bg-yellow-700 text-white py-2 -lg transition"
            >
              Continue
            </button>

            <p className="text-xs text-gray-500 mt-4">
              This is just an estimate. Final pricing may vary based on your specific requirements.
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Connect with Us
        </h3>
        <p className="text-gray-600">
          Get your dream home today. Let our experts help you
        </p>
      </div>

      <input
        type="text"
        placeholder="Your Name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 -lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <input
        type="email"
        placeholder="E-mail *"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 -lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <div className="relative">
        <span className="absolute left-4 top-3.5 text-xl">🇮🇳</span>
        <input
          type="tel"
          placeholder="Mobile Number *"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 -lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="whatsapp"
          checked={formData.whatsappUpdates}
          onChange={(e) =>
            setFormData({ ...formData, whatsappUpdates: e.target.checked })
          }
          className="w-4 h-4 accent-brand"
        />
        <label htmlFor="whatsapp" className="text-sm text-gray-700">
          Get updates on Whatsapp
        </label>
      </div>

      <input
        type="text"
        placeholder="Enter Your Pincode"
        value={formData.pincode}
        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 -lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to the privacy policy & terms and
        conditions
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-48">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 -lg shadow-lg ${
          toastType === "success" ? "bg-green-500" : "bg-red-500"
        } text-white animate-fade-in`}>
          {toastMessage}
        </div>
      )}

      <div className="bg-white -lg shadow-lg p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`p-2 -lg ${
              currentStep === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentStep === 1 && "Let's Get Started"}
              {currentStep === 2 &&
                `Your requirements for ${formData.projectType || "your project"}`}
              {currentStep === 3 && "Choose Your Package"}
              {currentStep === 4 && "Connect with Us"}
            </h2>
            <p className="text-gray-500 mt-1">Step {currentStep} of 4</p>
          </div>

          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 transition-all ${
                step <= currentStep ? "bg-brand" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Continue Button */}
        {currentStep !== 3 && (
          <div className="flex justify-center items-center">
            <button
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={isSubmitting}
              className="bg-brand hover:bg-yellow-700 disabled:bg-gray-400 text-white px-24 sm:px-36 md:px-40 lg:px-64 py-3 -lg font-medium transition"
            >
              {isSubmitting
                ? "Submitting..."
                : currentStep === 4
                ? "Submit"
                : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}