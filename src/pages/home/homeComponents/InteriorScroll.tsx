import { useRef, useState } from "react";
import { Phone } from "lucide-react";
import whatsapp from "../../../assets/images/whatsapplogo.png";
// import type { InteriorScrollAdminModel } from "../../../Admin/AdminComponents/InteriorScrollAdmin";

const InteriorScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // const [images, setImages] = useState<InteriorScrollAdminModel[]>([]);

  //   useEffect(() => {
  //   const stored = localStorage.getItem("interiorScroll");
  //   if (stored) setImages(JSON.parse(stored));
  // }, []);

  const images = [
    {
      id: "1",
      img1: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80",
      img2: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    },
  ];

  if (images.length === 0) {
    return (
      <p className="text-center text-gray-500">No before/after images found</p>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-left mb-10">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            How Our Interiors Change Your Home
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
          Experience design that transforms spaces and lifestyles.
          </p>
        </div>
        {images.map((item) => (
          <BeforeAfterSlider
            key={item.id}
            beforeImage={item.img1}
            afterImage={item.img2}
            startingPosition={50}
          />
        ))}

        {/* Connect With Us Section */}
        <div className="mt-16 md:mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Connect With Us
          </h3>
          <p className="text-gray-600 text-base md:text-lg mb-8">
          Your dream home is one message away.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:items-center items-stretch  max-w-xl mx-auto">
          <a href="tel:9900334035"> 
            <button className="w-full sm:w-auto px-20 py-4 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
              <Phone size={20} />
              Call Us
            </button>
            </a>
            <a
              href="https://wa.me/919900334035"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full sm:w-auto px-8 py-4 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                <img src={whatsapp} alt="WhatsApp" className="w-6" />
                Chat on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorScroll;

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  startingPosition?: number; // default 50%
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  startingPosition = 50,
}) => {
  const [sliderPosition, setSliderPosition] = useState(startingPosition);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPos = ((clientX - rect.left) / rect.width) * 100;
    newPos = Math.min(Math.max(newPos, 0), 100); // clamp between 0-100
    setSliderPosition(newPos);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    const moveHandler = (ev: MouseEvent | TouchEvent) => {
      const clientX =
        ev instanceof TouchEvent ? ev.touches[0].clientX : ev.clientX;
      updatePosition(clientX);
    };

    const stopHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", stopHandler);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", stopHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", stopHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", stopHandler);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg select-none"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* After Image */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 h-full object-cover"
        style={{ width: `${sliderPosition}%` }}
      />

      {/* Divider with knob */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-400"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 shadow-lg border-2 border-white" />
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded">
        After
      </span>
      <span className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded">
        Before
      </span>
    </div>
  );
};

// export default BeforeAfterSlider;
