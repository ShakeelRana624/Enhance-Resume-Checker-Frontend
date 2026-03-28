import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Resume", href: "#", hasDropdown: true },
    { name: "Cover Letter", href: "#", hasDropdown: true },
    { name: "Pricing", href: "#", hasDropdown: false },
    { name: "Resources", href: "#", hasDropdown: true },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0052FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold text-[#1A1C1E] tracking-tight">Enhancv</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-[#4A4D52] hover:text-[#0052FF] transition-colors"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-[#4A4D52] hover:text-[#0052FF] transition-colors">
              Log in
            </button>
            <button className="px-5 py-2.5 bg-[#0052FF] text-white text-sm font-semibold rounded-full hover:bg-[#0042CC] transition-all shadow-sm">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#4A4D52] hover:text-[#0052FF] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-base font-medium text-[#4A4D52] hover:text-[#0052FF] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-3 text-center font-medium text-[#4A4D52] border border-gray-200 rounded-xl">
              Log in
            </button>
            <button className="w-full py-3 text-center font-semibold text-white bg-[#0052FF] rounded-xl">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
