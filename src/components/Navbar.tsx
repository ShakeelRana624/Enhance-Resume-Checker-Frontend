import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Resume", href: "/resume-builder", hasDropdown: true },
    { name: "Cover Letter", href: "/cover-letter-builder", hasDropdown: true },
    { name: "Pricing", href: "/pricing", hasDropdown: false },
    { name: "Resume Checker", href: "/", hasDropdown: false },
    { name: "AI Analysis", href: "/analysis", hasDropdown: false },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0052FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold text-[#1A1C1E] tracking-tight">Enhancv</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-1 text-sm font-medium text-[#4A4D52] hover:text-[#0052FF] transition-colors"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-[#4A4D52]">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="max-w-[100px] truncate">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-[#4A4D52] hover:text-red-600 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-[#4A4D52] hover:text-[#0052FF] transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="px-5 py-2.5 bg-[#0052FF] text-white text-sm font-semibold rounded-full hover:bg-[#0042CC] transition-all shadow-sm">
                  Sign up
                </Link>
              </>
            )}
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
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-[#4A4D52] hover:text-[#0052FF] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-[#4A4D52]" />
                  <span className="font-medium text-[#1A1C1E]">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full py-3 text-center font-semibold text-white bg-red-600 rounded-xl"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center font-medium text-[#4A4D52] border border-gray-200 rounded-xl"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center font-semibold text-white bg-[#0052FF] rounded-xl"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
