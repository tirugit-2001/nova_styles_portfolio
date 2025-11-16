import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

type BuildingType = "Ground Floor" | "Duplex Home" | "G+2 or More Floors";
type PackageName = "Basic" | "Standard" | "Premium";

const RATES: Record<BuildingType, Record<PackageName, number>> = {
  "Ground Floor": { Basic: 1800, Standard: 2000, Premium: 2200 },
  "Duplex Home": { Basic: 1900, Standard: 2050, Premium: 2250 },
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
  const [step, setStep] = useState(1);
  const [buildingType, setBuildingType] = useState<BuildingType | "">("");
  const [sqftInput, setSqftInput] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<PackageName | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sqft = Number(sqftInput.replace(/\D/g, ""));

  const getRate = (pkg: PackageName) =>
    buildingType ? RATES[buildingType as BuildingType][pkg] : null;
  const estimate = (pkg: PackageName) => {
    const rate = getRate(pkg);
    if (!rate || !sqft) return null;
    return sqft * rate;
  };

  const canGoNextFromStep1 = Boolean(buildingType);
  const canGoNextFromStep2 = Boolean(sqft && sqft > 0);

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

  const handleSubmit = async () => {
    if (!validateContact()) return;
    try {
      setIsSubmitting(true);
      const rate = selectedPackage ? getRate(selectedPackage) : null;
      const total = selectedPackage ? estimate(selectedPackage) : null;
      const normalizedEmail = email.trim();
      await axios.post("/api/v1/content/construction-form", {
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
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      // Reset
      setStep(1);
      setBuildingType("");
      setSqftInput("");
      setSelectedPackage("");
      setName("");
      setEmail("");
      setMobile("");
      setPincode("");
      setWhatsappUpdates(false);
      setSuggestions("");
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
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className={`p-2  ${
              step === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 && "Choose Building Type"}
              {step === 2 && "Enter Built-up Area"}
              {step === 3 && "Your Instant Estimates"}
              {step === 4 && "Connect with Us"}
            </h2>
            <p className="text-gray-500 mt-1">Step {step} of 4</p>
          </div>

          <div className="w-10"></div>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 transition-all ${
                s <= step ? "bg-brand" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        <div className="mb-8">
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
              <div className="text-center mb-2">
                <p className="text-sm text-gray-600">
                  Selected: {selectedPackage || "—"} • {buildingType || "—"} • {sqft || 0} sqft
                </p>
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
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to the privacy policy & terms and conditions
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center">
          {step === 1 && (
            <button
              onClick={() => canGoNextFromStep1 && setStep(2)}
              disabled={!canGoNextFromStep1}
              className="bg-brand hover:bg-yellow-700 disabled:bg-gray-400 text-white px-12 py-3 font-medium transition"
            >
              Continue
            </button>
          )}
          {step === 2 && (
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
