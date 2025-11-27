import { useState } from "react";
import { ArrowLeft, Upload, X, FileText } from "lucide-react";
import { axios } from "../../service/axios";

type BuildingType = "Ground Floor" | "Duplex Home" | "G+2 or More Floors";
type PackageName = "Basic" | "Standard" | "Premium";

const RATES: Record<BuildingType, Record<PackageName, number>> = {
  "Ground Floor": { Basic: 2200, Standard: 2400, Premium: 2600 },
  "Duplex Home": { Basic: 2200, Standard: 2400, Premium: 2600 },
  "G+2 or More Floors": { Basic: 1950, Standard: 2100, Premium: 2350 },
};

const PACKAGES: Array<{
  name: PackageName;
  color: string;
  badge?: string;
  intro: string;
  points: string[];
}> = [
  {
    name: "Basic",
    color: "bg-emerald-50 border-emerald-200",
    intro:
      "Your essential construction package designed to deliver a safe, reliable, and well-finished home at the right price.",
    points: [
      "Standard structural materials",
      "Solid foundation & concrete work",
      "Standard electrical fittings",
      "Standard plumbing (CPVC / UPVC)",
      "Basic elevation design",
      "Standard bathroom fittings",
      "Regular vitrified tiles",
      "5-Year Structural Warranty",
    ],
  },
  {
    name: "Standard",
    color: "bg-blue-50 border-blue-200",
    badge: "Most Popular",
    intro:
      "Balanced construction with upgraded materials, modern finishes, and better architectural detailing.",
    points: [
      "Better-grade structural materials",
      "Branded electrical fittings (Havells/Anchor)",
      "Premium plumbing fittings (Jaquar/Hindware)",
      "Designer main door",
      "Better elevation + architectural detailing",
      "Premium vitrified tiles",
      "UPVC high-quality windows",
      "Better bathroom fittings",
      "5-Year Structural Warranty",
    ],
  },
  {
    name: "Premium",
    color: "bg-amber-50 border-amber-200",
    intro:
      "Our highest-quality construction package with top-tier materials, exclusive finishes, premium elevation, and enhanced durability.",
    points: [
      "Top-grade structural materials",
      "Premium electrical fittings (Schneider/Legrand)",
      "Premium plumbing + branded sanitary ware",
      "Luxury elevation designs",
      "Designer flooring options (vitrified/wooden)",
      "High-grade main and internal doors",
      "UPVC premium windows or aluminium sliders",
      "Premium bathroom fittings",
      "Dedicated project manager",
      "5-Year Structural Warranty",
    ],
  },
];

function formatINR(amount: number | null): string {
  if (!amount && amount !== 0) return "—";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function ConstructionContactForm() {
  const [step, setStep] = useState(0);
  const [constructionType, setConstructionType] = useState<
    "modular" | "customised-premium" | ""
  >("");
  const [buildingType, setBuildingType] = useState<BuildingType | "">("");
  const [sqftInput, setSqftInput] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<PackageName | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sqft = Number(sqftInput.replace(/\D/g, ""));

  const totalSteps =
    constructionType === "customised-premium"
      ? 2
      : constructionType === "modular"
      ? 4
      : 1;

  const getRate = (pkg: PackageName) =>
    buildingType ? RATES[buildingType as BuildingType][pkg] : null;
  const estimate = (pkg: PackageName) => {
    const rate = getRate(pkg);
    if (!rate || !sqft) return null;
    return sqft * rate;
  };

  const canGoNextFromStep1 = Boolean(buildingType);
  const canGoNextFromStep2 = Boolean(sqft && sqft > 0);

  const resetModularFlow = () => {
    setBuildingType("");
    setSqftInput("");
    setSelectedPackage("");
  };

  const handleConstructionTypeSelect = (
    type: "modular" | "customised-premium"
  ) => {
    setConstructionType(type);
    resetModularFlow();
    if (step !== 0) {
      setStep(0);
    }
  };

  const handleSelectionContinue = () => {
    if (!constructionType) return;
    if (constructionType === "customised-premium") {
      setStep(4);
      return;
    }
    setStep(1);
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 4 && constructionType === "customised-premium") {
      setStep(0);
      return;
    }
    setStep((prev) => Math.max(0, prev - 1));
  };

  const getStepIndicatorText = () => {
    if (step === 0) {
      return `Step 1 of ${totalSteps}`;
    }
    if (constructionType === "customised-premium") {
      return "Step 2 of 2";
    }
    if (constructionType === "modular") {
      return `Step ${step} of 4`;
    }
    return `Step ${step} of 1`;
  };

  const getProgressPosition = () => {
    if (step === 0) return 1;
    if (constructionType === "customised-premium") return 2;
    if (constructionType === "modular") return step;
    return 1;
  };

  const getConstructionTypeLabel = () => {
    if (constructionType === "modular") return "Modular Construction";
    if (constructionType === "customised-premium")
      return "Customised Premium Construction";
    return "—";
  };

  const validateContact = () => {
    if (!name || !email || !mobile) {
      alert("Please fill in all required fields (Name, Email, Mobile)");
      return false;
    }
    const normalizedEmail = email.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!emailOk) {
      alert("Please enter a valid email address");
      return false;
    }
    const digits = mobile.replace(/\D/g, "");
    if (!/^\d{10}$/.test(digits)) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");
    
    if (!file) {
      setPdfFile(null);
      return;
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF file only");
      setPdfFile(null);
      e.target.value = "";
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setFileError("File size should be less than 10MB");
      setPdfFile(null);
      e.target.value = "";
      return;
    }

    setPdfFile(file);
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setFileError("");
    const fileInput = document.getElementById("pdf-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!validateContact()) return;
    try {
      setIsSubmitting(true);
      const rate = selectedPackage ? getRate(selectedPackage) : null;
      const total = selectedPackage ? estimate(selectedPackage) : null;
      const normalizedEmail = email.trim();

      // If file is present, use FormData, otherwise use JSON
      if (pdfFile) {
        const formData = new FormData();
        formData.append("constructionType", constructionType || "");
        formData.append("buildingType", buildingType || "");
        formData.append("sqft", sqft.toString());
        formData.append("selectedPackage", selectedPackage || "");
        formData.append("ratePerSqft", (rate || 0).toString());
        formData.append("estimatedPrice", (total || 0).toString());
        formData.append("name", name);
        formData.append("email", normalizedEmail);
        formData.append("mobile", mobile);
        formData.append("pincode", pincode || "");
        formData.append("whatsappUpdates", String(Boolean(whatsappUpdates)));
        formData.append("suggestions", suggestions || "");
        formData.append("planPdf", pdfFile);

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content/construction-form`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content/construction-form`, {
          constructionType,
          buildingType,
          sqft,
          selectedPackage,
          ratePerSqft: rate || 0,
          estimatedPrice: total || 0,
          name,
          email: normalizedEmail,
          mobile,
          pincode: pincode || "",
          whatsappUpdates: Boolean(whatsappUpdates),
          suggestions: suggestions || "",
        });
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      // Reset
      setStep(0);
      setConstructionType("");
      setBuildingType("");
      setSqftInput("");
      setSelectedPackage("");
      setName("");
      setEmail("");
      setMobile("");
      setPincode("");
      setWhatsappUpdates(false);
      setSuggestions("");
      setPdfFile(null);
      setFileError("");
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded shadow-lg">
          Contact form submitted. Our team will reach out shortly.
        </div>
      )}
      <div className="bg-white  shadow-lg p-8 w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`p-2  ${
              step === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 0 && "Select Construction Type"}
              {step === 1 && "Choose Building Type"}
              {step === 2 && "Enter Built-up Area"}
              {step === 3 && "Your Instant Estimates"}
              {step === 4 && "Connect with Us"}
            </h2>
            <p className="text-gray-500 mt-1">{getStepIndicatorText()}</p>
          </div>

          <div className="w-10"></div>
        </div>

        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 transition-all ${
                s <= getProgressPosition() ? "bg-brand" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        <div className="mb-8">
          {step === 0 && (
            <div className="space-y-6">
              <p className="text-center text-gray-700">
                Choose how you'd like to plan your construction journey.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleConstructionTypeSelect("modular")}
                  className={`py-6 px-6 border-2 font-semibold transition-all ${
                    constructionType === "modular"
                      ? "bg-brand text-white shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                  }`}
                >
                  Modular Construction
                </button>
                <button
                  onClick={() =>
                    handleConstructionTypeSelect("customised-premium")
                  }
                  className={`py-6 px-6 border-2 font-semibold transition-all ${
                    constructionType === "customised-premium"
                      ? "bg-brand text-white shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                  }`}
                >
                  Customised Premium Construction
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-6">
              <p className="text-center text-gray-700">
                Select the type of home you’re planning to build.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(["Ground Floor", "Duplex Home", "G+2 or More Floors"] as BuildingType[]).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setBuildingType(type)}
                      className={`py-4 px-5 border-2 transition-all ${
                        buildingType === type
                          ? "border-brand bg-brand text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 max-w-md mx-auto">
              <p className="text-center text-gray-700">
                Enter your total built-up area (in sqft).
              </p>
              <input
                type="number"
                min={1}
                placeholder="e.g., 1500"
                value={sqftInput}
                onChange={(e) => setSqftInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              />
              {sqft > 0 && (
                <p className="text-sm text-gray-500 text-center">
                  Final Cost = sqft × rate
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PACKAGES.map((pkg) => {
                  const rate = getRate(pkg.name);
                  const total = estimate(pkg.name);
                  const headerColor =
                    pkg.name === "Basic"
                      ? "text-emerald-700"
                      : pkg.name === "Standard"
                      ? "text-blue-700"
                      : "text-amber-700";
                  const tagBg =
                    pkg.name === "Standard"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600";

                  return (
                    <div
                      key={pkg.name}
                      className={`border ${pkg.color} p-6 transition-all hover:shadow-md h-full flex flex-col`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${headerColor}`}>
                          {pkg.name} Package
                        </h4>
                        {pkg.badge && (
                          <span className={`text-xs px-2 py-1 ${tagBg}`}>
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        Rate: {rate ? formatINR(rate) : "—"} / Sqft
                      </p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700">
                          Estimated Cost:{" "}
                          <span className="text-brand">
                            {total ? formatINR(total) : "—"}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">{pkg.intro}</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {pkg.points.map((p) => (
                          <li key={p}>• {p}</li>
                        ))}
                      </ul>
                      <div className="grid grid-cols-1 gap-2 mt-auto pt-4">
                        <button
                          className="w-full bg-brand hover:bg-yellow-700 text-white py-2 transition"
                          onClick={() => {
                            setSelectedPackage(pkg.name);
                            setStep(4);
                          }}
                        >
                          Get Detailed Quote
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-xs text-yellow-800">
                  <strong>Disclaimer (Mandatory):</strong> These estimates are based
                  on standard construction specifications. Final pricing may vary
                  depending on site conditions, material selections, soil quality,
                  architectural design, and structural requirements.
                </p>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6 max-w-md mx-auto">
              <div className="text-center mb-2 space-y-1">
                <p className="text-sm text-gray-600">
                  Construction Type: {getConstructionTypeLabel()}
                </p>
                {constructionType === "modular" && (
                  <p className="text-sm text-gray-600">
                    Selected: {selectedPackage || "—"} • {buildingType || "—"} •{" "}
                    {sqft || 0} sqft
                  </p>
                )}
              </div>
              <input
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              />
              <input
                type="email"
                placeholder="E-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              />
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-xl">🇮🇳</span>
                <input
                  type="tel"
                  placeholder="Mobile Number *"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="whatsapp"
                  checked={whatsappUpdates}
                  onChange={(e) => setWhatsappUpdates(e.target.checked)}
                  className="w-4 h-4 accent-brand"
                />
                <label htmlFor="whatsapp" className="text-sm text-gray-700">
                  Get updates on Whatsapp
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter Your Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300  focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              />
              <textarea
                placeholder="Tell us your preferences or any specific suggestions for your construction..."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none rounded-lg"
              />
              
              {/* PDF File Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Home Plan (PDF) - Optional
                </label>
                {!pdfFile ? (
                  <div className="relative">
                    <input
                      type="file"
                      id="pdf-upload"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload PDF plan (Max 10MB)
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 flex-1">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {pdfFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="ml-2 p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {fileError && (
                  <p className="text-xs text-red-600 mt-1">{fileError}</p>
                )}
              </div>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to the privacy policy & terms and conditions
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center">
          {step === 0 && (
            <button
              onClick={handleSelectionContinue}
              disabled={!constructionType}
              className="bg-brand hover:bg-yellow-700 disabled:bg-gray-400 text-white px-12 py-3 font-medium transition"
            >
              Continue
            </button>
          )}
          {constructionType === "modular" && step === 1 && (
            <button
              onClick={() => canGoNextFromStep1 && setStep(2)}
              disabled={!canGoNextFromStep1}
              className="bg-brand hover:bg-yellow-700 disabled:bg-gray-400 text-white px-12 py-3 font-medium transition"
            >
              Continue
            </button>
          )}
          {constructionType === "modular" && step === 2 && (
            <button
              onClick={() => canGoNextFromStep2 && setStep(3)}
              disabled={!canGoNextFromStep2}
              className="bg-brand hover:bg-yellow-700 disabled:bg-gray-400 text-white px-12 py-3 font-medium transition"
            >
              Show Estimates
            </button>
          )}
          {step === 4 && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-brand hover:bg-yellow-700 disabled:bg-gray-400 text-white px-12 py-3 font-medium transition"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
