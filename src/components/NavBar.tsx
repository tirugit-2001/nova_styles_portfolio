import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  // ShoppingCart,
  // User,
  Mail,
  Phone,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  CircleUserRound,
} from "lucide-react";
import SignInForm from "../service/Email";
import logo from "../../public/novalogo.png";
import { menuItems, productCategories } from "../utils";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScreenBelow700, setIsScreenBelow700] = useState(
    window.innerWidth < 700
  );
  const [showEmailDignIn, setEmailSignIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenBelow700(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };
    checkScroll();
    scrollRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-gray-100"
      }`}
    >
      {/* <div className=" flex-row  items-center justify-center"> */}
      {/* Top Bar */}
      <div className="bg-[#DFE6DE] py-2 px-4 md:px-8 ">
        <div className="mx-auto flex justify-end items-center gap-6 text-sm">
          <a
            href="mailto:info@novastyles.com"
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">info@novastyles.com</span>
          </a>
          <span>|</span>
          <a
            href="tel:+917852369451"
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">Call Now: +91-9900334035</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white px-4 md:px-8 pb-2">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex gap-10">
            {/* Logo */}
            <a className="flex items-center" href="/">
              <div className="w-40 md:w-44 lg:w-64 text-amber-500">
                <img className="" src={logo} alt="" />
              </div>
            </a>

            {/* Desktop Menu */}

            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.hasDropdown ? (
                    <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-brand transition-colors py-2">
                      {item.title}
                      <ChevronDown size={16} />
                    </button>
                  ) : (
                    <a
                      href={item.path}
                      className="flex items-center gap-1 text-gray-700 hover:text-brand font-medium transition-colors py-2"
                    >
                      {item.title}
                    </a>
                  )}

                  {/* Mega Menu (Nova Interiors only) */}
                  {item.isMegaMenu && openDropdown === item.title && (
                    <div className="absolute top-full left-0 w-[800px] bg-white rounded-lg shadow-xl py-6 px-6 border border-gray-100 grid grid-cols-2 gap-8">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          <a
                            className="font-medium"
                            href={group.items.find((e) => e.path)?.path}
                          >
                            <h4 className="font-medium text-gray-800 mb-2">
                              {group.title}
                            </h4>
                          </a>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {group.items.map((subItem, idx) => (
                              <li
                                key={`${group.title}-${subItem.path || subItem.label}-${idx}`}
                                className="hover:text-brand cursor-pointer transition-colors"
                              >
                                {subItem.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Nova Construction → Card-style dropdown */}
                  {item.isCardMenu && openDropdown === item.title && (
                    <div className="absolute top-full left-0 w-[400px] bg-white rounded-lg shadow-xl py-4 px-4 border border-gray-100 group-hover:block">
                      {item.items.map((subItem, idx) => (
                        <div
                          key={`${item.title}-${subItem.path || subItem.label}-${idx}`}
                          className="py-3 border-b last:border-0 hover:bg-amber-50 rounded-md px-2"
                        >
                          <a href={subItem.path}>
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {subItem.label}
                            </h4>
                          </a>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {subItem.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Normal Dropdowns */}
                  {item.isMegaMenu && openDropdown === item.title && (
                    <div className="absolute top-full left-0 w-[400px] bg-white rounded-lg shadow-xl p-4 border border-gray-100">
                      {item.groups?.map((group) => (
                        <div key={group.title}>
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {group.title}
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {group.items.map((subItem, idx) => (
                              <li key={`${group.title}-${subItem.path || subItem.label}-${idx}`}>
                                <a
                                  href={subItem.path}
                                  className="hover:text-brand cursor-pointer transition-colors"
                                >
                                  {subItem.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <a href="/contactUs">
              <button className="hidden md:block px-6 py-2  text-brand border border-brand rounded hover:bg-brand hover:text-white transition-colors font-medium">
                Get Free Estimate
              </button>
            </a>

            {/* Mobile Menu Toggle */}
            <div>
              {isScreenBelow700 && (
                <>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    {/* <ShoppingCart size={20} className="text-gray-700" /> */}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    {/* <User
                      onClick={() => {
                        setEmailSignIn(true);
                      }}
                      size={20}
                      className="text-gray-700"
                    /> */}
                  </button>
                </>
              )}

              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Product Categories Bar */}
        {isMobileMenuOpen === false && (
          <div className={`border border-gray-200`}></div>
        )}
        <div className="mx-4 hidden lg:flex items-center justify-between pt-4">
  {/* Left Section: Scrollable Categories + Arrows */}
  <div className="flex items-center gap-4 flex-1 min-w-0">
    {/* Left Scroll Button */}
    {canScrollLeft && (
      <button
        onClick={() => scroll("left")}
        className="p-2 hover:bg-gray-100/40 rounded-full transition-colors bg-transparent"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
    )}

    {/* Scrollable Categories */}
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
    >
      {productCategories.map((category, index) => (
        <a
          key={`${category.path}-${index}`}
          href={category.path}
          className="text-sm font-medium text-[#4D4D4D] hover:text-brand transition-colors whitespace-nowrap"
        >
          {category.label}
        </a>
      ))}
    </div>

    {/* Right Scroll Button */}
    {canScrollRight && (
      <button
        onClick={() => scroll("right")}
        className="p-2 hover:bg-gray-100/40 rounded-full transition-colors bg-transparent"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>
    )}
  </div>

  {/* Right Section: Fixed Sign In Button */}
  <div className="flex items-center gap-4 ml-6 shrink-0">
    <button
      className="p-2 hover:bg-gray-100/40 rounded-full transition-colors flex gap-2 items-center"
      onClick={() => setEmailSignIn(true)}
    >
      <CircleUserRound size={20} className="text-gray-700" />
      <span>Sign In</span>
    </button>
  </div>
</div>

      </div>

      {showEmailDignIn && <SignInForm onClose={() => setEmailSignIn(false)} />}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 max-h-[80vh] overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.title} className="border-b border-gray-100 py-3">
              {item.hasDropdown ? (
                <>
                  <button
                    className="flex items-center justify-between w-full text-gray-700 hover:text-brand transition-colors py-2 font-medium"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.title ? null : item.title
                      )
                    }
                  >
                    {item.title}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        openDropdown === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.title && (
                    <div className="mt-3 space-y-3">
                      {/* Card Menu (Nova Interiors & Nova Constructions) */}
                      {item.isCardMenu && item.items && (
                        <div className="space-y-3">
                          {item.items.map((subItem, idx) => (
                            <a
                              key={`${item.title}-${subItem.path || subItem.label}-${idx}`}
                              href={subItem.path ? subItem.path : "#"}
                              className="block p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-amber-50 hover:border-brand transition-all duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                {subItem.label}
                              </h4>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {subItem.description}
                              </p>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Mega Menu (Nova Products) */}
                      {item.isMegaMenu && item.groups && (
                        <div className="space-y-4">
                          {item.groups.map((group) => (
                            <div key={group.title} className="space-y-2">
                              <h4 className="font-semibold text-gray-800 text-sm border-b border-gray-200 pb-1">
                                {group.title}
                              </h4>
                              <div className="space-y-1">
                                {group.items.map((subItem, idx) => (
                                  <a
                                    key={`${group.title}-${subItem.path || subItem.label}-${idx}`}
                                    href={subItem.path ? subItem.path : "#"}
                                    className="block py-2 px-3 text-sm text-gray-600 hover:text-brand hover:bg-amber-50 rounded-md transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subItem.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Regular Dropdown Items */}
                      {!item.isCardMenu && !item.isMegaMenu && item.items && (
                        <div className="space-y-1">
                          {item.items.map((subItem, idx) => (
                            <a
                              key={`${item.title}-${subItem.path || subItem.label}-${idx}`}
                              href={subItem.path ? subItem.path : "#"}
                              className="block py-2 px-3 text-sm text-gray-600 hover:text-brand hover:bg-amber-50 rounded-md transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.path}
                  className="block text-gray-700 hover:text-amber-600 transition-colors py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}

          {/* Sign In Button for Mobile */}
          <button
            onClick={() => {
              setEmailSignIn(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-6 px-6 py-3 border-2 border-brand text-brand rounded-lg hover:bg-brand hover:text-white transition-colors font-medium flex items-center justify-center gap-2"
          >
            <CircleUserRound size={20} />
            <span>Sign In</span>
          </button>

          <a href="/contactUs">
            <button className="w-full mt-4 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors font-medium shadow-sm">
              Get Free Estimate
            </button>
          </a>
        </div>
      )}
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
