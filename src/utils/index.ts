const menuItems = [
  {
    title: "Nova Interiors",
    hasDropdown: true,
    isMegaMenu: true,
    groups: [
      {
        title: "Wall papers",
        items: [
          { label: "Ready available wall papers", path: "/interiorHome" },
          { label: "Customised wall papers", path: "/interiorHome" },
        ],
      },
      {
        title: "Wooden flooring",
        items: [
          { label: "Laminated wooden flooring", path: "/flooring/laminated" },
          { label: "SPC flooring", path: "/flooring/spc" },
          {
            label: "Engineered wooden flooring",
            path: "/flooring/engineered",
          },
          { label: "Hardwood flooring", path: "/flooring/hardwood" },
          { label: "Carpet flooring", path: "/flooring/carpet" },
          { label: "Vinyl flooring", path: "/flooring/vinyl" },
        ],
      },
      {
        title: "Wall decors",
        items: [
          { label: "Canvas prints", path: "/canvasPrint" },
          { label: "Wall decor items", path: "/wallDecor" },
        ],
      },
      {
        title: "Wall panels",
        items: [{ label: "PVC fluted panels", path: "/pvcFluted" }],
      },
      {
        title: "Soft furnishings",
        items: [
          { label: "Curtains", path: "/furnishings/curtains" },
          { label: "Cushions", path: "/furnishings/cushions" },
          { label: "Rugs/Carpets", path: "/furnishings/rugs" },
          { label: "Headboard", path: "/furnishings/headboard" },
        ],
      },
      {
        title: "Furniture",
        items: [
          { label: "Sofas", path: "/furniture/sofas" },
          { label: "Chairs", path: "/furniture/chairs" },
          { label: "Beds", path: "/furniture/beds" },
          { label: "Console units", path: "/furniture/console" },
        ],
      },
      {
        title: "Lighting",
        items: [
          { label: "Ceiling Lights", path: "/lighting/ceiling" },
          { label: "Wall Lights", path: "/lighting/wall" },
          { label: "Table Lamps", path: "/lighting/table" },
          { label: "Floor Lamps", path: "/lighting/floor" },
        ],
      },
    ],
  },
  {
    title: "Nova Construction",
    hasDropdown: true,
    isCardMenu: true,
    items: [
      {
        label: "Modular interiors",
        path: "/construction",
        description:
          "Interior designs made of prefabricated units that can be combined or customized.",
      },
      {
        label: "Customised Premium interiors",
        path: "/construction",
        description:
          "High-end interior designs tailored to your space and needs.",
      },
    ],
  },
  // {
  //   title: "Nova Products",
  //   path:"/ourProduct",
  //   hasDropdown: true,
  //   isMegaMenu: true,
  //   groups: [
  //     {
  //       title: "Wall papers",
  //       items: [
  //         { label: "Ready available wall papers", path: "/ourProduct" },
  //         { label: "Customised wall papers", path: "/interiorHome" },
  //       ],
  //     },
  //     {
  //       title: "Wooden flooring",
  //       items: [
  //         { label: "Laminated wooden flooring", path: "/products/flooring/laminated" },
  //         { label: "Engineered wooden flooring", path: "/products/flooring/engineered" },
  //         { label: "Hardwood flooring", path: "/products/flooring/hardwood" },
  //         { label: "Carpet flooring", path: "/products/flooring/carpet" },
  //         { label: "Vinyl flooring", path: "/products/flooring/vinyl" },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "About NovaStyles",
    hasDropdown: false,
    path: "/aboutus",
  },
];

const productCategories = [
  { label: "Wall papers", path: "/categories/wallpapers" },
  { label: "Wooden flooring", path: "/categories/flooring" },
  { label: "Wall decors", path: "/categories/walldecors" },
  { label: "Wall panels", path: "/categories/wallpanels" },
  { label: "Soft furnishings", path: "/categories/furnishings" },
  { label: "Furniture", path: "/categories/furniture" },
  { label: "Novastyles Interior", path: "/categories/interior" },
  { label: "Canvas Prints", path: "/categories/canvasPrint" },
  { label: "Wall decor items", path: "/categories/wallDecor" },
];
export { productCategories, menuItems };
