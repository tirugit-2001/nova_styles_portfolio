import React from 'react';

interface Testimonial {
  id: number;
  header: string;
  image: string;
  quote: string;
  author?: string;
}

interface AboutHeroProps {
  testimonials?: Testimonial[];
}

const AboutHero: React.FC<AboutHeroProps> = ({ testimonials }) => {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      header:'NovaStyles Interiors',
      image: '/aboutus1.jpg',
      quote: '“Modern, functional interiors crafted with smart design and seamless execution.”',
    },
    {
      id: 2,
      header:'NovaStyles Construction',
      image: '/aboutus2.png',
      quote: '“Quality-driven home construction with trusted materials and expert engineering.”'
    },
    {
      id: 3,
      header:'NovaStyles Wallpapers',
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80',
      quote: '“Premium wallpapers that add style, character, and elegance to your walls.”'
    },
    // {
    //   id: 4,
    //   image: '/aboutus2.jpg',
    //   quote: '“Our small 2 BHK into a beautiful, functional home”'
    // }
  ];

  const items = testimonials || defaultTestimonials;

  return (
    <section className="w-full py-12 px-4 bg-[#F4F4F4]">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative overflow-hidden shadow-md bg-white"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={`Testimonial ${item.id}`}
            className="w-full h-96 object-cover"
          />

          {/* Quote overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-black bg-[#DFE6DE]">
            <h3 className="text-gray-900 text-lg font-medium mb-2">{item.header}</h3>
            <p className="text-gray-900 text-sm leading-relaxed">{item.quote}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default AboutHero;
