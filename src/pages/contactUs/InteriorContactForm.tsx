import { useState, useEffect } from "react";
import { ArrowLeft, Home, Check } from "lucide-react";
import { Toaster, toast } from "sonner";
import apiClient from "../../utils/axios";

export default function InteriorDesignForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    floorplan: "",
    purpose: "",
    selectedPackage: "",
    addons: [] as string[],
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    whatsappUpdates: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Read from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("interiorHeroFormData");
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
        localStorage.removeItem("interiorHeroFormData");
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  const floorplans = ["1 BHK", "2 BHK", "3 BHK"];

  const packages1BHK = [
    {
      name: "Prelam 1BHK",
      subtitle: "Essential Quality",
      color: "bg-[#6A8DE1]",
      totalPrice: "₹1,74,350",
      items: [
        { label: "Kitchen - 3 draws, All Shutters", qty: "40 sft", price: "₹68,000" },
        { label: "Tandems", qty: "3", price: "₹9,000" },
        { label: "TV Unit - Simple box", qty: "6 ft", price: "₹12,000" },
        { label: "Wall Panelling", qty: "36 sft", price: "₹23,400" },
        { label: "Wardrobe", qty: "7x7 ft", price: "₹51,450" },
        { label: "Framed Loft", qty: "7x2.5 ft", price: "₹10,500" }
      ]
    },
    {
      name: "Basic 1BHK",
      subtitle: "Value for Money",
      color: "bg-[#6B9B6A]",
      totalPrice: "₹1,99,550",
      items: [
        { label: "Kitchen - 3 draws, All Shutters", qty: "40 sft", price: "₹74,000" },
        { label: "Tandems", qty: "3", price: "₹9,000" },
        { label: "TV Unit - Simple box", qty: "6 ft", price: "₹15,000" },
        { label: "Wall Panelling", qty: "36 sft", price: "₹27,000" },
        { label: "Wardrobe", qty: "7x7 ft", price: "₹58,800" },
        { label: "Framed Loft", qty: "7x2.5 ft", price: "₹15,750" }
      ]
    },
    {
      name: "Standard 1BHK",
      subtitle: "Most Popular",
      color: "bg-[#A07CCF]",
      popular: true,
      totalPrice: "₹2,71,150",
      items: [
        { label: "Kitchen - 3 draws, All Shutters", qty: "60 sft", price: "₹1,20,000" },
        { label: "Tandems", qty: "3", price: "₹13,500" },
        { label: "TV Unit", qty: "6x1 ft", price: "₹18,000" },
        { label: "Wall Panelling", qty: "6x6 ft", price: "₹36,000" },
        { label: "Wardrobe", qty: "7x7 ft", price: "₹71,050" },
        { label: "Loft", qty: "7x2.5 ft", price: "₹12,600" }
      ]
    },
    {
      name: "Premium 1BHK",
      subtitle: "Luxury Finish",
      color: "bg-[#C18A3F]",
      totalPrice: "₹3,14,500",
      items: [
        { label: "Kitchen - 3 draws, All Shutters", qty: "60 sft", price: "₹1,47,000" },
        { label: "Tandems", qty: "3", price: "₹22,500" },
        { label: "TV Unit", qty: "6x1 ft", price: "₹18,000" },
        { label: "Wall Panelling", qty: "6x6 ft", price: "₹36,000" },
        { label: "Wardrobe", qty: "7x7 ft", price: "₹78,400" },
        { label: "Loft", qty: "7x2.5 ft", price: "₹12,600" }
      ]
    }
  ];
  const packages2BHK = [
    {
      name: "Prelam",
      subtitle: "Essential Quality",
      color: "from-blue-500 to-blue-600",
      totalPrice: "₹3,19,200",
      items: [
        { label: "Kitchen Base & Wall Units", qty: "70 sft", price: "₹1,04,000" },
        { label: "Tandems & Accessories", qty: "5+3", price: "₹22,000" },
        { label: "TV Unit & Wall Panelling", qty: "7x7 ft", price: "₹41,300" },
        { label: "Wardrobe 1 (with Loft & Dresser)", qty: "7x7 ft", price: "₹75,950" },
        { label: "Wardrobe 2 (with Loft & Dresser)", qty: "7x7 ft", price: "₹75,950" },
      ],
    },
    {
      name: "Basic",
      subtitle: "Perfect Balance",
      color: "from-green-500 to-green-600",
      totalPrice: "₹3,50,350",
      items: [
        { label: "Kitchen Base & Wall Units", qty: "70 sft", price: "₹1,04,000" },
        { label: "Tandems & Accessories", qty: "5+3", price: "₹22,000" },
        { label: "TV Unit & Wall Panelling", qty: "7x7 ft", price: "₹49,000" },
        { label: "Wardrobe 1 (with Loft & Dresser)", qty: "7x7 ft", price: "₹87,675" },
        { label: "Wardrobe 2 (with Loft & Dresser)", qty: "7x7 ft", price: "₹87,675" },
      ],
    },
    {
      name: "Standard",
      subtitle: "Most Popular",
      color: "from-purple-500 to-purple-600",
      popular: true,
      totalPrice: "₹4,30,100",
      items: [
        { label: "Kitchen Base & Wall Units", qty: "70 sft", price: "₹1,28,000" },
        { label: "Tandems & Accessories", qty: "5+3", price: "₹27,000" },
        { label: "TV Unit & Wall Panelling", qty: "7x7 ft", price: "₹63,000" },
        { label: "Wardrobe 1 (with Loft & Dresser)", qty: "7x7 ft", price: "₹1,06,050" },
        { label: "Wardrobe 2 (with Loft & Dresser)", qty: "7x7 ft", price: "₹1,06,050" },
      ],
    },
    {
      name:"premium",
      subtilte:"Luxury Living",
      color:"from-orange-500 to-orange-600",
      totalPrice:"₹4,90,200",
      items:[
         { label: "Kitchen Base & Wall Units", qty: "70 sft &", price: "₹1,50,000" },
        { label: "Tandems & Accessories", qty: "5+3", price: "₹42,000" },
        { label: "TV Unit & Wall Panelling", qty: "7x7 ft", price: "₹63,000" },
        { label: "Wardrobe 1 (with Loft & Dresser)", qty: "7x7 ft", price: "₹1,17,600" },
        { label: "Wardrobe 2 (with Loft & Dresser)", qty: "7x7 ft", price: "₹1,17,600" },
      ]
    }
  ];

  // 3BHK Package
  const packages3BHK = [
    {
      name: "Premium",
      subtitle: "Luxury Living",
      color: "from-amber-500 to-amber-600",
      totalPrice: "₹4,90,200",
      items: [
        { label: "Kitchen Base & Wall Units", qty: "70 sft", price: "₹1,50,000" },
        { label: "Tandems & Accessories", qty: "5+3", price: "₹42,000" },
        { label: "TV Unit & Wall Panelling", qty: "7x7 ft", price: "₹63,000" },
        { label: "Wardrobe 1 (with Loft & Dresser)", qty: "7x7 ft", price: "₹1,17,600" },
        { label: "Wardrobe 2 (with Loft & Dresser)", qty: "7x7 ft", price: "₹1,17,600" },
      ],
    },
  ];


// Add-ons for 2BHK & 3BHK
const addons2BHK = {
  prelam: [
    { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹24,375" },
    { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹15,000" },
    { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹12,000" },
    { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹33,600" },
    { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹40,950" },
    { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹52,325" },
    { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹34,650" },
    { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹44,275" },
    { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹6,000" },
    { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹59,150" },
    { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹68,250" },
    { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹50,050" },
    { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹57,750" },
  ],
  basic: [
    { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹28,125" },
    { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹15,000" },
    { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹12,000" },
    { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹33,600" },
    { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹40,950" },
    { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹54,600" },
    { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹34,650" },
    { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹46,200" },
    { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹6,000" },
    { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹59,150" },
    { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹68,250" },
    { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹50,050" },
    { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹57,750" },
  ],
  standard: [
    { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹33,750" },
    { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹16,000" },
    { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹12,000" },
    { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹40,600" },
    { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹54,600" },
    { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹65,975" },
    { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹46,200" },
    { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹55,825" },
    { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹9,000" },
    { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹68,250" },
    { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹77,350" },
    { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹57,750" },
    { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹69,300" },
  ],
  premium:[
    { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹33,750" },
    { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹15,000" },
    { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹13,200" },
    { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹40,600" },
    { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹63,700" },
    { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹75,075" },
    { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹53,900" },
    { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹63,525" },
    { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹11,000" },
    { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹77,350" },
    { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹86,450" },
    { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹65,450" },
    { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹73,150" },
  ]
};

const addons3BHK = {
    prelam: [
    { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹24,375" },
    { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹15,000" },
    { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹12,000" },
    { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹33,600" },
    { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹40,950" },
    { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹52,325" },
    { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹34,650" },
    { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹44,275" },
    { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹6,000" },
    { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹59,150" },
    { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹68,250" },
    { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹50,050" },
    { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹57,750" },
  ],
  basic: [
    { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹28,125" },
    { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹15,000" },
    { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹12,000" },
    { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹33,600" },
    { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹40,950" },
    { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹54,600" },
    { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹34,650" },
    { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹46,200" },
    { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹6,000" },
    { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹59,150" },
    { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹68,250" },
    { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹50,050" },
    { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹57,750" },
  ],
   standard: [
    { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹33,750" },
    { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹16,000" },
    { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹12,000" },
    { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹40,600" },
    { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹54,600" },
    { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹65,975" },
    { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹46,200" },
    { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹55,825" },
    { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹9,000" },
    { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹68,250" },
    { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹77,350" },
    { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹57,750" },
    { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹69,300" },
  ],

  premium:[
  { id: "kitchen_loft", label: "Kitchen Loft", qty: "37.5 sft", price: "₹33,750" },
  { id: "study_table", label: "Study Table", qty: "4'x2.5'", price: "₹15,000" },
  { id: "study_overhead", label: "Study Overhead", qty: "4'x2'", price: "₹13,200" },
  { id: "partition", label: "Partition", qty: "4x7 ft", price: "₹40,600" },
  { id: "king_laminate", label: "King Size Cot - Laminate (without storage)", qty: "45.5 sft", price: "₹63,700" },
  { id: "king_laminate_storage", label: "King Size Cot - Laminate (with storage)", qty: "45.5 sft", price: "₹75,075" },
  { id: "queen_laminate", label: "Queen Size Cot - Laminate (without storage)", qty: "38.5 sft", price: "₹53,900" },
  { id: "queen_laminate_storage", label: "Queen Size Cot - Laminate (with storage)", qty: "38.5 sft", price: "₹63,525" },
  { id: "side_table", label: "Side Table", qty: "1.5'x1.5'", price: "₹11,000" },
  { id: "king_upholstery", label: "King Size Cot - Upholstery (without storage)", qty: "45.5 sft", price: "₹77,350" },
  { id: "king_upholstery_storage", label: "King Size Cot - Upholstery (with storage)", qty: "45.5 sft", price: "₹86,450" },
  { id: "queen_upholstery", label: "Queen Size Cot - Upholstery (without storage)", qty: "38.5 sft", price: "₹65,450" },
  { id: "queen_upholstery_storage", label: "Queen Size Cot - Upholstery (with storage)", qty: "38.5 sft", price: "₹73,150" },
  ]
};
  

const getCurrentPackages = () => {
  if (formData.floorplan === "1 BHK") return packages1BHK;
  if (formData.floorplan === "2 BHK") return packages2BHK;
  if (formData.floorplan === "3 BHK") return packages3BHK;
  return [];
};

const getAddonsForPackage = (packageName: string) => {
  if (formData.floorplan === "1 BHK") return [];
  if (formData.floorplan === "3 BHK") {
    if (packageName.includes("Premium") || packageName.includes("premium")) return addons3BHK.premium;
    if (packageName.includes("Standard") || packageName.includes("standard")) return addons3BHK.standard;
    if (packageName.includes("Basic") || packageName.includes("basic")) return addons3BHK.basic;
    if (packageName.includes("Prelam") || packageName.includes("prelam")) return addons3BHK.prelam;
    return [];
  }
  if (formData.floorplan === "2 BHK") {
    if (packageName.includes("Prelam") || packageName.includes("prelam")) return addons2BHK.prelam;
    if (packageName.includes("Basic") || packageName.includes("basic")) return addons2BHK.basic;
    if (packageName.includes("Standard") || packageName.includes("standard")) return addons2BHK.standard;
    if (packageName.includes("Premium") || packageName.includes("premium")) return addons2BHK.premium;
  }
  return [];
};

// Price calculation functions
const getSelectedPackage = () => {
  const packages = getCurrentPackages();
  return packages.find(pkg => pkg.name === formData.selectedPackage);
};

const getSelectedAddons = () => {
  const availableAddons = getAddonsForPackage(formData.selectedPackage);
  return availableAddons.filter((addon:any) => formData.addons.includes(addon.id));
};

const calculateTotalPrice = () => {
  const selectedPackage = getSelectedPackage();
  if (!selectedPackage) return 0;
  
  const packagePrice = parseInt(selectedPackage.totalPrice.replace(/[₹,]/g, ''));
  const addonPrice = getSelectedAddons().reduce((total:any, addon:any) => {
    return total + parseInt(addon.price.replace(/[₹,]/g, ''));
  }, 0);
  
  return packagePrice + addonPrice;
};

const formatPrice = (price: number) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

const toggleAddon = (addonId: string) => {
  setFormData(prev => ({
    ...prev,
    addons: prev.addons.includes(addonId)
      ? prev.addons.filter(id => id !== addonId)
      : [...prev.addons, addonId]
  }));
};

const handleNext = () => {
  if (currentStep < 5) {
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
    toast.error("Please fill in all required fields (Name, Email, Mobile)");
    return;
  }

  setIsSubmitting(true);

  // Get selected package and addons for pricing
  const selectedPackage = getSelectedPackage();
  const selectedAddons = getSelectedAddons();
  const totalPrice = calculateTotalPrice();
  
  // Calculate package price
  const packagePrice = selectedPackage 
    ? parseInt(selectedPackage.totalPrice.replace(/[₹,]/g, ''))
    : 0;
  
  // Calculate addons total
  const addonsTotal = selectedAddons.reduce((total: number, addon: any) => {
    return total + parseInt(addon.price.replace(/[₹,]/g, ''));
  }, 0);

  // Prepare the data to send to backend
  const requestData = {
    floorplan: formData.floorplan,
    purpose: formData.purpose || "",
    selectedPackage: formData.selectedPackage,
    addons: formData.addons || [],
    name: formData.name,
    email: formData.email.trim(),
    mobile: formData.mobile,
    pincode: formData.pincode || "",
    whatsappUpdates: formData.whatsappUpdates || false,
    // Add pricing fields
    packagePrice: packagePrice,
    addonsTotal: addonsTotal,
    totalPrice: totalPrice,
  };

  try {
    const response = await apiClient.post("/api/v1/content/contact-form", requestData);
    toast.success(
      response.data.message || "Form submitted successfully! Our team will contact you shortly."
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({
      floorplan: "",
      purpose: "",
      selectedPackage: "",
      addons: [],
      name: "",
      email: "",
      mobile: "",
      pincode: "",
      whatsappUpdates: false,
    });
    setCurrentStep(1);
  } catch (error: any) {
    console.error("Failed to submit form:", error);
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
    
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

  const renderStep1 = () => (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-5 h-5 text-slate-600" /> Select your Floorplan
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {floorplans.map((plan) => (
            <button
              key={plan}
              onClick={() => setFormData({ ...formData, floorplan: plan })}
              className={`py-4 px-6  border-2 font-semibold transition-all transform hover:scale-105 ${
                formData.floorplan === plan
                  ? " bg-brand text-white shadow-lg"
                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 2: Requirements
  
  const renderStep2 = () => {
    const currentPackages = getCurrentPackages();
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Choose Your Perfect Package
          </h3>
          <p className="text-slate-600">Estimated pricing for {formData.floorplan}</p>
        </div>

        <div className={`grid grid-cols-1 ${currentPackages.length === 3 ? 'md:grid-cols-3' : currentPackages.length === 2 ? 'md:grid-cols-2' : ''} gap-6`}>
          {currentPackages.map((pkg, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden shadow-lg transition-all transform hover:scale-105 cursor-pointer ${
                formData.selectedPackage === pkg.name
                  ? "ring-4 ring-purple-500"
                  : ""
              }`}
              onClick={() => {
                setFormData({ ...formData, selectedPackage: pkg.name, addons: [] });
              }}
            >
              {(pkg as any).popular && (
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  ⭐ MOST POPULAR
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                <Home className="w-8 h-8 mb-3" />
                <h4 className="text-2xl font-bold mb-1">{pkg.name}</h4>
                <p className="text-white/90 text-sm mb-3">{pkg.subtitle}</p>
                <div className="text-3xl font-bold">{pkg.totalPrice}</div>
              </div>

              <div className="bg-white p-6">
                <div className="space-y-3 mb-6">
                  {pkg.items.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-slate-200 pl-3">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-800">{item.label}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            {item.qty} = <span className="font-semibold text-slate-700">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({
                      ...formData,
                      selectedPackage: pkg.name,
                      addons: []
                    });
                    handleNext();
                  }}
                  className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md`}
                >
                  Select Package
                </button>

                <p className="text-xs text-slate-500 mt-4 text-center">
                  This is an estimate. Final pricing may vary.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  
  const renderStep3 = () => {
    const availableAddons = getAddonsForPackage(formData.selectedPackage);

    if (availableAddons.length === 0) {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No Add-ons Available
            </h3>
            <p className="text-slate-600">
              Add-ons are not available for {formData.floorplan} packages. 
              You can proceed to review your selection.
            </p>
          </div>
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h4 className="text-xl font-semibold text-slate-800 mb-2">
              Ready to Continue
            </h4>
            <p className="text-slate-600">
              Your selected package is complete. Click "Continue" to review your selection.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Customize with Add-ons
          </h3>
          <p className="text-slate-600">Select additional items for your {formData.floorplan}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableAddons.map((addon:any) => (
            <div
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-md ${
                formData.addons.includes(addon.id)
                  ? "border-purple-500 bg-purple-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {formData.addons.includes(addon.id) ? (
                      <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded border-2 border-slate-300"></div>
                    )}
                    <h4 className="font-semibold text-slate-800">{addon.label}</h4>
                  </div>
                  <p className="text-sm text-slate-500 ml-8">{addon.qty}</p>
                </div>
                <div className="text-lg font-bold text-slate-800">{addon.price}</div>
              </div>
            </div>
          ))}
        </div>

        {formData.addons.length > 0 && (
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Add-ons Selected:</span>
              <span className="text-2xl font-bold">{formData.addons.length} items</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Step 4: Summary
  const renderStep4 = () => {
    const selectedPackage = getSelectedPackage();
    const selectedAddons = getSelectedAddons();
    const totalPrice = calculateTotalPrice();

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Review Your Selection
          </h3>
          <p className="text-slate-600">Please review your package and add-ons before proceeding</p>
        </div>

        {/* Selected Package */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <h4 className="text-xl font-semibold text-slate-800 mb-4">Selected Package</h4>
          {selectedPackage && (
            <div className="flex justify-between items-start">
              <div>
                <h5 className="text-lg font-medium text-slate-800">{selectedPackage.name}</h5>
                <p className="text-slate-600">{selectedPackage.subtitle}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">{selectedPackage.totalPrice}</div>
              </div>
            </div>
          )}
        </div>

        {/* Selected Add-ons */}
        {selectedAddons.length > 0 && (
          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <h4 className="text-xl font-semibold text-slate-800 mb-4">Selected Add-ons</h4>
            <div className="space-y-3">
              {selectedAddons.map((addon:any) => (
                <div key={addon.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                  <div>
                    <div className="font-medium text-slate-800">{addon.label}</div>
                    <div className="text-sm text-slate-500">{addon.qty}</div>
                  </div>
                  <div className="font-semibold text-slate-800">{addon.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Price */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total Estimated Cost:</span>
            <span className="text-3xl font-bold">{formatPrice(totalPrice)}</span>
          </div>
          <p className="text-purple-100 text-sm mt-2">
            * Final pricing may vary based on specific requirements and site conditions
          </p>
        </div>
      </div>
    );
  };

  // Step 5: Contact Details
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
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <input
        type="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <div className="relative">
        <span className="absolute left-4 top-3.5 text-xl">🇮🇳</span>
        <input
          type="tel"
          placeholder="Mobile Number"
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
          className="w-4 h-4"
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
    <>
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded shadow-lg">
          Contact form submitted. Our team will reach out shortly.
        </div>
      )}
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 pt-10">
        <Toaster richColors position="top-center" />
        <div className="bg-white  shadow-lg  p-8 w-full max-w-4xl ">
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
                {currentStep === 1 && "Lets Get Started"}
                {currentStep === 2 &&
                  `Your requirements for ${formData.floorplan}`}
                {currentStep === 3 && "Our Estimates Based On Your Preference"}
                {currentStep === 4 && "Review Your Selection"}
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
                className={`flex-1 h-2 rounded-full ${
                  step <= currentStep ? "bg-brand" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>

          {/* Form Content */}
          <div className="mb-8 ">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center items-center">
            <button
              onClick={currentStep === 5 ? handleSubmit : handleNext}
              className=" bg-brand hover:bg-brand-dark text-white lg:px-64 md:px-40 sm:px-36  px-24 py-3  font-medium transition"
            >
              {isSubmitting
                ? "Submitting..."
                : currentStep === 5
                ? "Submit"
                : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
