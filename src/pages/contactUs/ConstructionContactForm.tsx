import { useState, useEffect } from "react";
import { ArrowLeft, Check, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

// Comprehensive specifications data from constructionContent.md
interface PackageSpecs {
  civilWork: {
    steel: string;
    cement: string;
    aggregates: string;
    solidBlocks: string;
    masonry: string;
    rccDesignMix: string;
    waterproofing: string;
  };
  flooring: {
    livingDiningKitchen: string;
    roomsAndKitchen: string;
    poojaRoom: string;
    bathroomWallTiles: string;
    kitchenWallTiles: string;
    kitchenCounterTop: string;
    staircaseFlooring: string;
    balconyAndOpenAreas: string;
    parkingTiles: string;
    entranceLobby: string;
  };
  doorsWindows: {
    mainDoor: string;
    bedroomDoors: string;
    poojaRoomDoor: string;
    bathrooms: string;
    windows: string;
  };
  painting: {
    interior: string;
    exterior: string;
    wood: string;
    metal: string;
  };
  plumbingSanitary: {
    attachedBathroom: string;
    commonBathroom: string;
    kitchenTap: string;
    kitchenSink: string;
    pipes: string;
    overHeadTank: string;
  };
  electrical: {
    casingConduits: string;
    switchesMcb: string;
    wiresCables: string;
  };
  geyser: string;
  exhaustFan: string;
  rainwaterHarvesting: string;
  fabrication: {
    staircaseRailings: string;
    balconyRailings: string;
    utilityGrill: string;
    mainGate: string;
  };
  designPlans: {
    structuralDwg: boolean;
    floor2d: boolean;
    floor3d: boolean;
    interior: boolean;
    frontElevation: boolean;
  };
  guarantee: {
    construction: string;
    waterproofing: string;
    stampPaper: boolean;
  };
}

interface PackageData {
  name: string;
  subtitle: string;
  ratePerSqft: number;
  specs: PackageSpecs;
}

// Package specifications data based on constructionContent.md
// Note: Specifications are same across floor types, only pricing varies
const getPackageSpecs = (_floorType: string, packageName: string): PackageSpecs => {
  const isBasic = packageName === "Basic";
  const isStandard = packageName === "Standard";
  const isPremium = packageName === "Premium";

  return {
    civilWork: {
      steel: isBasic ? "Any Brand, Basic Rate Rs.55/Kg" : "Make: JSW & Indus, Basic Rate Rs.65/Kg",
      cement: isBasic ? "Make: Maha & Priya (PPC), Basic Rate Rs.330/Bag" 
             : isStandard ? "Make: Bharathi & Zuari, Basic Rate Rs.355/Bag" 
             : "Make: Brilla & Ultatech, Basic Rate Rs.380/Bag",
      aggregates: "20mm For Concrete structure and 40MM for PCC",
      solidBlocks: isBasic ? "Solid Blocks Medium quality 6\" for exterior wall and 4\" for Internal walls, Basic Rate Rs.38/Block (Non Wire Cut Finsh)"
             : "Clay Bricks High quality 9\" for exterior wall and 5\" for Internal walls, Basic Rate 6 Rs / Piece",
      masonry: isBasic ? "M-Sand & P-Sand" 
             : isStandard ? "M-Sand & P-Sand Double Wash" 
             : "M-Sand & P-Sand Triple Wash",
      rccDesignMix: "M20 For Slab, M25 For Foundation",
      waterproofing: isBasic ? "Dr.Fixit" : "Fosroc"
    },
    flooring: {
      livingDiningKitchen: isBasic ? "Make: Gujrat, Tiles 2'X2' worth Rs.40/Sqft" 
                    : isStandard ? "Vitrified tiles Rs.60/Sqft" 
                    : "Granite worth Rs.150/Sqft",
      roomsAndKitchen: isBasic ? "Make: Gujrat,Tils 2'X2' worth Rs.40/Sqft" 
                    : isStandard ? "Vitrified tiles Rs.50/Sqft" 
                    : "Vitrified tiles Rs.75/Sqft",
      poojaRoom: isBasic ? "Make: Gujrat,Tiles 2'X2' worth Rs.40/Sqft" 
                : isStandard ? "Make: Somany,Tiles 4'X2' worth Rs.50/Sqft" 
                : "Make: Somany, Full Body Tiles worth Rs.75/Sqft",
      bathroomWallTiles: isBasic ? "Make: Gujrat, Tiles 2'X2' or 2'X1', worth Rs.40/Sqft" 
                       : isStandard ? "Make: Somany,Tiles 4'X2' worth Rs.50/Sqft" 
                       : "Make: Kajriya,Tiles 4'X2' worth Rs.60/Sqft",
      kitchenWallTiles: isBasic ? "Make: Gujrat, Tiles 2'X2' or 2'X1', worth Rs.40/Sqft" 
                      : isStandard ? "Make: Somany,Tiles 2'X2' worth Rs.50/Sqft" 
                      : "Make: , Full body tiles Rs.250/-",
      kitchenCounterTop: isBasic ? "Granite worth Rs.100/Sqft" 
                        : isStandard ? "Granite worth Rs.180/-" 
                        : "Quartz worth Rs.250/-",
      staircaseFlooring: isBasic ? "Granite worth Rs.80/Sqft" 
                       : isStandard ? "Granite worth Rs.100/Sqft" 
                       : "Granite worth Rs.150/Sqft",
      balconyAndOpenAreas: isBasic ? "Make: Gujrat, Anti-skid tiles of value upto Rs.40/Sqft" 
                          : isStandard ? "Make: Somany, Anti-skid tiles of value upto Rs.50/Sqft" 
                          : "Make: Orient bell & Somany, Anti-skid tiles of value upto Rs.60/Sqft",
      parkingTiles: isBasic ? "Make: Gujrat, Anti-skid tiles of value upto Rs.40/Sqft" 
                  : isStandard ? "Make: Somany, Anti-skid tiles of value upto Rs.50/Sqft" 
                  : "Make: Orient bell & Somany, Anti-skid tiles of value upto Rs.60/Sqft",
      entranceLobby: isBasic ? "Make: Gujrat, Tiles 4'X2' worth Rs.50/Sqft" 
                    : isStandard ? "Make: Somany,Tiles 4'X2' worth Rs.70/Sqft" 
                    : "Make: Somany, Full Body Tiles worth Rs.100/Sqft"
    },
    doorsWindows: {
      mainDoor: isBasic ? "Ghana Teak Door frame of 6inch by 3inch, (Burma Border), Worth of Rs.25,000., Door Thickness around 32mm, Including: 3 liver lock make:Europa, all Accecories, Colur: Steel, Towerbolt, 5\" Hinges., etc.."
             : isStandard ? "Ghana Teak Door frame of 6inch by 3inch, (Burma Border), Worth of Rs.35,000., Door Thickness around 38mm, Including: 6 Liver Door lock make: Europa, all Accecories, Colur:Antique, Towerbolt, Handle & Hinges., etc.."
             : "Ghana Teak Door frame of 6inch by 3inch, with Side Fixed Glass, (Burma Border), Worth of Rs.50,000., Door Thickness around 38mm, Including, Smart Door lock make:Europa, all Accecories, Colour:Antique,or Mat black, Towerbolt, Alldrop, Handle & Hinges., etc..",
      bedroomDoors: isBasic ? "Maghani Wood Door along with Membrance door or Flush Door, Including 2 liver door lock, all Accecories, Towerbolt, Alldrop, Handle & Hinges., etc.."
                   : isStandard ? "Sal Wood Door Frame of 5inch by 4inch. along with Membrance door or Flush Door with beading., Including Cylindrical Door lock make Godrej or Europa, all Accecories, Colur:Antique,Towerbolt, Alldrop, Handle & Hinges., etc.."
                   : "Ghana Teak Door Shuter along with teak frame of 6inch by 3inch, thickness 38mm with beading., Including Cylindrical Door lock make Godrej or Europa, all Accecories, Colur:Antique,Towerbolt, Alldrop, Handle & Hinges., etc..",
      poojaRoomDoor: isBasic ? "N/A"
                    : isStandard ? "Sal Wood Door Frame along with Double Membrance door Shutter."
                    : "Ghana Teak Door Double Shuter along with teak frame of 5inch by 3inch, thickness 38mm with beading.",
      bathrooms: isBasic ? "PVC Doors., Including all Accecories, Towerbolt, Alldrop, Handle & Hinges., etc.."
              : isStandard ? "WPVC frame along with door shutter."
              : "Sal Wood Door along with Membrance door or Flush Door with enamel paint finsh water proof",
      windows: isBasic ? "Aluminium/Upvc Sliding shutters with 5mm thick pointed glass with mosquito mesh"
             : isStandard ? "Sal Wood Frame with Ghana Teak Shutters and out side 6mm Plain Glass with Internal single mosquito mesh."
             : "Ghana Teak Wooden frame, Ghana teak wood shutters with 5mm thick Pointed glass with internal end to end mosquito mesh."
    },
    painting: {
      interior: isBasic ? "Asian paint wall putty + Asian Tractor emulsion with 2 coats"
               : isStandard ? "Asian paint wall putty + Asian Apocolite emulsion with 2 coats"
               : "Asian paint wall putty + Asian Royal Luxury with 2 coats",
      exterior: isBasic ? "Asian Paint ace with primer"
               : isStandard ? "Asian Paint apex with primer"
               : "Asian Paint Ultima with primer",
      wood: isBasic ? "Asian Paint ApocoliteTractor Enamel"
           : isStandard ? "Asian Paint Apocolite Glosy or Stain"
           : "Asian Paint PU Luxury wood finsh",
      metal: isStandard ? "Asian Paint ApocoliteTractor Enamel" 
            : "Asian Paint Apocolite Glosy or Stain"
    },
    plumbingSanitary: {
      attachedBathroom: isBasic ? "Make - Cera (Fittings & Sanitary) - Rs.20,000, Each bathroom. EWC Single set, Health Faucet, Wall Mixer with shower set, Table-top Wash Basin with all accessories."
                         : isStandard ? "Make - Parryware - Rs.25,000, Each bathroom. EWC Single set, Health Faucet, Wall Mixer with shower set, Table-top Wash Basin with accessories."
                         : "Make - Jaquar - Rs.35,000, Each bathroom. EWC Wall Mounted With Concealed flush Tank, Health Faucet, 3 inlet diveter with shower set, Table-top Wash Basin with accessories.",
      commonBathroom: isBasic ? "Make - Cera (Fittings & Sanitary) - Rs.15,000, Each bathroom. EWC Floor Mounted With flush Tank, Health Faucet, Wall Mixer with shower set, Wash Basin Wall Mounted with accessories."
                      : isStandard ? "Make - Parryware - Rs.20,000, Each bathroom. EWC Floor Mounted With flush Tank, Health Faucet, Wall Mixer with shower set, Wash Basin Wall Mounted with accessories."
                      : "Make - Jaquar - Rs.25,000, Each bathroom. EWC Single set, Health Faucet, Wall Mixer with Hand & Head shower set, Table-top Wash Basin with accessories, Granite for Wash Basin",
      kitchenTap: isBasic ? "Swingiing Swan Neck Sink Cock wall Mounted, Worth Rs.2000/-"
                 : isStandard ? "Swingiing Swan Neck Sink Cock Floor Mounted (Hot & Cold), Worth Rs.5000/-"
                 : "Smart Sink with Pull & Spray Faucet, Size:30\"X18\"X10\" with Cup Washer Rs.20,000/- Double Sink",
      kitchenSink: isBasic ? "SS Sink Size;21X18 Inch Worth, Rs.2000/-"
                  : isStandard ? "Quartz Sink Size; 24X18 Inch Worth, Rs.5000/-"
                  : "",
      pipes: isBasic ? "Make:Supreme" : isStandard ? "Make: Astral" : "Make: Ashirwad",
      overHeadTank: isBasic ? "Make: Ganga or Nandhini - 1000 Liters" 
                   : isStandard ? "Ashirwad triple Layer - 1000 liters" 
                   : "Sintex triple Layer - 1000 liters"
    },
    electrical: {
      casingConduits: "Make: V1 Gold.",
      switchesMcb: isBasic ? "HIFI / GM" : isStandard ? "GM / Legrand" : "Legrand / Schineder",
      wiresCables: isBasic ? "Anchor" : isStandard ? "Polycab & Finolex." : "Havells."
    },
    geyser: isBasic ? "25 liter, Instant geyser, Blow Hot. - for each Bathroom."
           : isStandard ? "25 liter, Instant geyser, Crompton, V-Guard. - for each Bathroom."
           : "100 Liter Solar Geyser Make- V Guard for each Bathroom.",
    exhaustFan: isBasic ? "Gm 230mm Exhaust Fan, Rs.1300/-"
              : isStandard ? "Whilrpool Chimney 60Cm 750m3/hr, Rs.10,000/-"
              : "Whilrpool Chimney 90Cm 1300m3/hr, Rs.20,000/-",
    rainwaterHarvesting: "Followed As per Bwssb method",
    fabrication: {
      staircaseRailings: isBasic ? "Ms Railings with Enamel Paint Finsh, Rs.300/Sft"
                        : isStandard ? "Ms Railings with Enamel Paint Finsh, Rs.300/Sft"
                        : "SS Railings 304 Grade Glossy Finsh, Rs.700/Sft",
      balconyRailings: isBasic ? "Ms Railings with Enamel Paint Finsh, Rs.300/Sft"
                      : isStandard ? "SS Railings 304 Grade Glossy Finsh, Rs.700/Sft"
                      : "12mm thick Glass Railings with SS Handle Glossy Finsh and Plain Glass Rs.1500/Sft",
      utilityGrill: isStandard ? "Ms Rod 10mm Thick Sq bars with 5\" Spacing Enamel Paint Finsh, Rs.220/Sft"
                  : isPremium ? "SS 15mm Thick Sq bars with 5\" Spacing Enamel Paint Finsh, Rs.800/Sft"
                  : "N/A",
      mainGate: isBasic ? "Ms Gate with Enamel Paint Finsh, Rs.600/Sft [Plain Design]"
              : isStandard ? "Ms Gate with Enamel Paint Finsh, Rs.600/Sft [Plain Design]"
              : "SS Gate with Glossy Finsh, Rs.1500/Sft [Plain Design]"
    },
    designPlans: {
      structuralDwg: true,
      floor2d: true,
      floor3d: isPremium,
      interior: isPremium,
      frontElevation: true
    },
    guarantee: {
      construction: "1 Year",
      waterproofing: "10 Years",
      stampPaper: true
    }
  };
};

// Add-ons/Upgrades that can be added (from Notes section)
const addons = [
  { id: "compound_wall", label: "Compound & Parapet Wall", description: "Additional charge as per requirements" },
  { id: "sump_tank", label: "Sump Tank", description: "Additional charge as per requirements" },
  { id: "terrace_flooring", label: "Terrace Flooring", description: "Additional charge as per requirements" },
  { id: "front_elevation", label: "Front Elevation", description: "Charged additional, as per design and Client Requirement" },
  { id: "tv_wall_unit", label: "TV Wall Unit", description: "Charged additional, as per design and Client Requirement" },
  { id: "kitchen_cabinets", label: "Kitchen Cabinets", description: "Charged additional, as per design and Client Requirement" },
  { id: "wardrobes", label: "Wardrobes", description: "Charged additional, as per design and Client Requirement" },
  { id: "curtains", label: "Curtains", description: "Charged additional, as per design and Client Requirement" },
  { id: "furniture", label: "Furniture", description: "Charged additional, as per design and Client Requirement" },
  { id: "false_ceiling", label: "False Ceiling/POP", description: "Charged additional, as per design and Client Requirement" },
  { id: "larger_tiles", label: "Larger Size Tiles/Granite/Marble", description: "Charged for additionally if required" },
  { id: "elevation_cladding", label: "Elevation Cladding (Fundermax/Shera/Stone/Glass)", description: "Charged additionally at nominal values" },
];

export default function ConstructionContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});
  
  const [formData, setFormData] = useState({
    projectType: "",
    plotSize: "",
    builtUpArea: "",
    floorType: "",
    requirements: {
      Bedroom: 1,
      Bathrooms: 1,
      crockeryUnit: 1,
      Kitchen: 1,
    },
    selectedPackage: "",
    selectedAddons: [] as string[],
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
  const Floor_types = ["Only Ground Floor", "Duplex", "G + 2 or more"];

  // Pricing calculation functions
  const getPricePerSqft = (floorType: string, packageName: string): number => {
    const pricing: Record<string, Record<string, number>> = {
      "Only Ground Floor": { Basic: 2200, Standard: 2400, Premium: 2600 },
      "Duplex": { Basic: 2200, Standard: 2400, Premium: 2600 },
      "G + 2 or more": { Basic: 1950, Standard: 2100, Premium: 2350 }
    };
    return pricing[floorType]?.[packageName] || 0;
  };

  const parseBuiltUpArea = (area: string): number => {
    if (area.includes("Up to")) return parseInt(area.replace(/\D/g, '')) || 0;
    if (area.includes("+")) return parseInt(area.replace(/\D/g, '')) || 0;
    if (area.includes("-")) return parseInt(area.split("-")[0]) || 0;
    return parseInt(area) || 0;
  };

  const calculatePackagePrice = (floorType: string, packageName: string, builtUpArea: string): number => {
    if (!floorType || !packageName || !builtUpArea) return 0;
    const sqft = parseBuiltUpArea(builtUpArea);
    const ratePerSqft = getPricePerSqft(floorType, packageName);
    return sqft * ratePerSqft;
  };

  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const packages: PackageData[] = [
    {
      name: "Basic",
      subtitle: "For budget-conscious builders",
      ratePerSqft: getPricePerSqft(formData.floorType, "Basic"),
      specs: getPackageSpecs(formData.floorType, "Basic")
    },
    {
      name: "Standard",
      subtitle: "For quality-focused builders",
      ratePerSqft: getPricePerSqft(formData.floorType, "Standard"),
      specs: getPackageSpecs(formData.floorType, "Standard")
    },
    {
      name: "Premium",
      subtitle: "For luxury villa builders",
      ratePerSqft: getPricePerSqft(formData.floorType, "Premium"),
      specs: getPackageSpecs(formData.floorType, "Premium")
    },
  ];

  const showToastMessage = (message: string, type: string = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleIncrement = (field: "Bedroom" | "Bathrooms" | "crockeryUnit" | "Kitchen") => {
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        [field]: formData.requirements[field] + 1,
      },
    });
  };

  const handleDecrement = (field: "Bedroom" | "Bathrooms" | "crockeryUnit" | "Kitchen") => {
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
    if (currentStep === 1) {
      if (!formData.projectType || !formData.plotSize || !formData.builtUpArea || !formData.floorType) {
        showToastMessage("Please select all options before continuing", "error");
        return;
      }
    }
    if (currentStep === 2) {
      // No validation needed for requirements step
    }
    if (currentStep === 3) {
      if (!formData.selectedPackage) {
        showToastMessage("Please select a package to continue", "error");
        return;
      }
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAddon = (addonId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter((id) => id !== addonId)
        : [...prev.selectedAddons, addonId],
    }));
  };

  const toggleSpecsExpand = (category: string) => {
    setExpandedSpecs((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
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

    const packagePrice = calculatePackagePrice(
      formData.floorType,
      formData.selectedPackage,
      formData.builtUpArea
    );
    
    const selectedPackage = packages.find(pkg => pkg.name === formData.selectedPackage);
    const specs = selectedPackage ? getPackageSpecs(formData.floorType, formData.selectedPackage) : null;

    const requestData = {
      projectType: formData.projectType,
      plotSize: formData.plotSize,
      builtUpArea: formData.builtUpArea,
      floorType: formData.floorType,
      requirements: formData.requirements,
      selectedPackage: formData.selectedPackage,
      packageSpecs: specs,
      selectedAddons: formData.selectedAddons,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile.replace(/\D/g, ""),
      pincode: formData.pincode || "",
      whatsappUpdates: formData.whatsappUpdates || false,
      packagePrice: packagePrice,
      totalPrice: packagePrice, // Add-ons pricing would be calculated separately
    };

    try {
      // Use proxy in development and production (Vercel serverless function)
      const isDevelopment = import.meta.env.DEV;
      const API_URL = isDevelopment
        ? '/api/v1/content/construction-form' // Use Vite proxy in development
        : '/api/construction-form'; // Use Vercel serverless function in production
      
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
        floorType: "",
        requirements: {
          Bedroom: 1,
          Bathrooms: 1,
          crockeryUnit: 1,
          Kitchen: 1,
        },
        selectedPackage: "",
        selectedAddons: [],
        name: "",
        email: "",
        mobile: "",
        pincode: "",
        whatsappUpdates: false,
      });
      setCurrentStep(1);
      setExpandedSpecs({});
    } catch (error: any) {
      console.error("Failed to submit form:", error);
      
      let errorMessage = "Failed to submit form. Please try again or contact support.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
      } else if (error.request) {
        errorMessage = "Unable to reach server. Please check your connection.";
      } else {
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
              className={`py-3 px-5 border-2 transition-all rounded-lg ${
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
              className={`py-3 px-5 border-2 transition-all rounded-lg ${
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
              className={`py-3 px-5 border-2 transition-all rounded-lg ${
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

      <div>
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Floor Type
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Floor_types.map((floorType) => (
            <button
              key={floorType}
              onClick={() => setFormData({ ...formData, floorType: floorType })}
              className={`py-3 px-5 border-2 transition-all rounded-lg ${
                formData.floorType === floorType
                  ? "border-brand bg-brand text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {floorType}
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
                  key as "Bedroom" | "Bathrooms" | "crockeryUnit" | "Kitchen"
                )
              }
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              −
            </button>
            <span className="w-12 text-center border border-gray-300 rounded-lg py-1">
              {value}
            </span>
            <button
              onClick={() =>
                handleIncrement(
                  key as "Bedroom" | "Bathrooms" | "crockeryUnit" | "Kitchen"
                )
              }
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep3 = () => {
    const getPackagePrice = (pkgName: string) => {
      if (!formData.floorType || !formData.builtUpArea) return null;
      return calculatePackagePrice(formData.floorType, pkgName, formData.builtUpArea);
    };

    const getRatePerSqft = (pkgName: string) => {
      if (!formData.floorType) return null;
      return getPricePerSqft(formData.floorType, pkgName);
    };

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
          Choose Your Package
        </h3>

        {(!formData.floorType || !formData.builtUpArea) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800 text-center">
              Please select floor type and built-up area in Step 1 to see accurate pricing.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => {
            const calculatedPrice = getPackagePrice(pkg.name);
            const ratePerSqft = getRatePerSqft(pkg.name);
            const specs = getPackageSpecs(formData.floorType, pkg.name);
            const isExpanded = expandedSpecs[pkg.name] || false;
            
            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  formData.selectedPackage === pkg.name
                    ? "border-brand bg-yellow-50 shadow-lg"
                    : "border-gray-300 hover:border-gray-400 hover:shadow-md"
                }`}
                onClick={() =>
                  setFormData({ ...formData, selectedPackage: pkg.name })
                }
              >
                <h4 className="font-semibold text-gray-800 mb-1">{pkg.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{pkg.subtitle}</p>
                
                {ratePerSqft && (
                  <p className="text-xs text-gray-500 mb-4">
                    Rate: {formatPrice(ratePerSqft)} / Sqft
                  </p>
                )}

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-700">Estimated Cost</span>
                    <span className="font-medium text-brand">
                      {calculatedPrice ? formatPrice(calculatedPrice) : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Specifications Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSpecsExpand(pkg.name);
                  }}
                  className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-800 mb-4"
                >
                  <span>View Specifications</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {/* Expanded Specifications */}
                {isExpanded && (
                  <div className="mt-4 space-y-4 text-xs border-t pt-4" onClick={(e) => e.stopPropagation()}>
                    {/* Civil Work */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Civil Work</h5>
                      <div className="space-y-1 text-gray-600 pl-2">
                        <p><strong>Steel:</strong> {specs.civilWork.steel}</p>
                        <p><strong>Cement:</strong> {specs.civilWork.cement}</p>
                        <p><strong>Solid Blocks:</strong> {specs.civilWork.solidBlocks}</p>
                        <p><strong>Waterproofing:</strong> {specs.civilWork.waterproofing}</p>
                      </div>
                    </div>

                    {/* Flooring */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Flooring</h5>
                      <div className="space-y-1 text-gray-600 pl-2">
                        <p><strong>Living/Dining/Kitchen:</strong> {specs.flooring.livingDiningKitchen}</p>
                        <p><strong>Rooms:</strong> {specs.flooring.roomsAndKitchen}</p>
                        <p><strong>Bathroom Tiles:</strong> {specs.flooring.bathroomWallTiles}</p>
                        <p><strong>Kitchen Counter:</strong> {specs.flooring.kitchenCounterTop}</p>
                      </div>
                    </div>

                    {/* Doors & Windows */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Doors & Windows</h5>
                      <div className="space-y-1 text-gray-600 pl-2">
                        <p><strong>Main Door:</strong> {specs.doorsWindows.mainDoor.substring(0, 60)}...</p>
                        <p><strong>Bedroom Doors:</strong> {specs.doorsWindows.bedroomDoors.substring(0, 60)}...</p>
                        <p><strong>Windows:</strong> {specs.doorsWindows.windows.substring(0, 60)}...</p>
                      </div>
                    </div>

                    {/* Plumbing */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Plumbing & Sanitary</h5>
                      <div className="space-y-1 text-gray-600 pl-2">
                        <p><strong>Attached Bathroom:</strong> {specs.plumbingSanitary.attachedBathroom.substring(0, 50)}...</p>
                        <p><strong>Common Bathroom:</strong> {specs.plumbingSanitary.commonBathroom.substring(0, 50)}...</p>
                      </div>
                    </div>

                    {/* Electrical */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Electrical</h5>
                      <div className="space-y-1 text-gray-600 pl-2">
                        <p><strong>Switches/MCB:</strong> {specs.electrical.switchesMcb}</p>
                        <p><strong>Wires & Cables:</strong> {specs.electrical.wiresCables}</p>
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Guarantee</h5>
                      <div className="space-y-1 text-gray-600 pl-2">
                        <p><strong>Construction:</strong> {specs.guarantee.construction}</p>
                        <p><strong>Waterproofing:</strong> {specs.guarantee.waterproofing}</p>
                        <p><strong>Stamp Paper:</strong> {specs.guarantee.stampPaper ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, selectedPackage: pkg.name });
                    handleNext();
                  }}
                  className="w-full mt-6 bg-brand hover:bg-yellow-700 text-white py-2 rounded-lg transition"
                >
                  Continue
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  This is just an estimate. Final pricing may vary based on your specific requirements.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-6">
        Additional Services & Upgrades
      </h3>
      <p className="text-sm text-gray-600 text-center mb-6">
        Select any additional services you'd like to include (pricing will be provided separately)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              formData.selectedAddons.includes(addon.id)
                ? "border-brand bg-yellow-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => toggleAddon(addon.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                formData.selectedAddons.includes(addon.id)
                  ? "border-brand bg-brand"
                  : "border-gray-300"
              }`}>
                {formData.selectedAddons.includes(addon.id) && (
                  <Check size={14} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{addon.label}</h4>
                <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formData.selectedAddons.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>{formData.selectedAddons.length}</strong> additional service{formData.selectedAddons.length > 1 ? 's' : ''} selected. 
            Pricing for these items will be quoted separately based on your requirements.
          </p>
        </div>
      )}
    </div>
  );

  const renderStep5 = () => (
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
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <input
        type="email"
        placeholder="E-mail *"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <div className="relative">
        <span className="absolute left-4 top-3.5 text-xl">🇮🇳</span>
        <input
          type="tel"
          placeholder="Mobile Number *"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
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
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to the privacy policy & terms and
        conditions
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          toastType === "success" ? "bg-green-500" : "bg-red-500"
        } text-white animate-fade-in`}>
          {toastMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`p-2 rounded-lg ${
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
              {currentStep === 4 && "Additional Services"}
              {currentStep === 5 && "Connect with Us"}
            </h2>
            <p className="text-gray-500 mt-1">Step {currentStep} of 5</p>
          </div>

          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 transition-all rounded ${
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
          {currentStep === 5 && renderStep5()}
        </div>

        {/* Continue Button */}
        {currentStep !== 3 && (
          <div className="flex justify-center items-center">
            <button
              onClick={currentStep === 5 ? handleSubmit : handleNext}
              disabled={isSubmitting}
              className="bg-brand hover:bg-yellow-700 disabled:bg-gray-400 text-white px-24 sm:px-36 md:px-40 lg:px-64 py-3 rounded-lg font-medium transition"
            >
              {isSubmitting
                ? "Submitting..."
                : currentStep === 5
                ? "Submit"
                : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
