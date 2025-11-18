const menuItems = [
  {
    title: "Nova Interiors",
    hasDropdown: true,
    isCardMenu: true,
    items: [
      {
        label: "Modular interiors",
        path: "/interiorHome",
        description:
          "Interior designs made of prefabricated units that can be combined or customized.",
      },
      {
        label: "Customised Premium interiors",
        path: "/interiorHome",
        description:
          "High-end interior designs tailored to your space and needs.",
      },
    ],
  },

  {
    title: "Nova Products",
    hasDropdown: true,
    isMegaMenu: true,
    groups: [
      // All Nova Products should redirect to the official store
      // https://store.novastylesinterior.com
      {
        title: "Wall papers",
        items: [
          {
            label: "Ready available wall papers",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Customised wall papers",
            path: "https://store.novastylesinterior.com/",
          },
        ],
      },
      {
        title: "Wooden flooring",
        items: [
          {
            label: "Laminated wooden flooring",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "SPC flooring",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Engineered wooden flooring",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Hardwood flooring",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Carpet flooring",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Vinyl flooring",
            path: "https://store.novastylesinterior.com/",
          },
        ],
      },
      {
        title: "Wall decors",
        items: [
          {
            label: "Canvas prints",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Wall decor items",
            path: "https://store.novastylesinterior.com/",
          },
        ],
      },
      {
        title: "Wall panels",
        items: [
          {
            label: "PVC fluted panels",
            path: "https://store.novastylesinterior.com/",
          },
        ],
      },
      {
        title: "Soft furnishings",
        items: [
          {
            label: "Curtains",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Cushions",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Rugs/Carpets",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Headboard",
            path: "https://store.novastylesinterior.com/",
          },
        ],
      },
      {
        title: "Furniture",
        items: [
          { label: "Sofas", path: "https://store.novastylesinterior.com/" },
          { label: "Chairs", path: "https://store.novastylesinterior.com/" },
          { label: "Beds", path: "https://store.novastylesinterior.com/" },
          {
            label: "Console units",
            path: "https://store.novastylesinterior.com/",
          },
        ],
      },
      {
        title: "Lighting",
        items: [
          {
            label: "Ceiling Lights",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Wall Lights",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Table Lamps",
            path: "https://store.novastylesinterior.com/",
          },
          {
            label: "Floor Lamps",
            path: "https://store.novastylesinterior.com/",
          },
        ],
      },
    ],
  },
  {
    title: "Nova Constructions",
    hasDropdown: true,
    isCardMenu: true,
    items: [
      {
        label: "Economy range",
        path: "/construction",
        description:
          "Smart construction solutions designed for budget-friendly, quality homes",
      },
      {
        label: "Luxury custom residences",
        path: "/construction",
        description:
          "Tailor-maid homes built with premium materials and timeless craftmanship",
      },
      {
        label: "Renovation ",
        path: "/construction",
        description:
          "Transofrm exisiting spaces with expert planning and modern design upgrades",
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
