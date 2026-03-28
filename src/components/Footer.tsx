import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Resume",
      links: ["Resume Builder", "Resume Templates", "Resume Examples", "Resume Checker"],
    },
    {
      title: "Cover Letter",
      links: ["Cover Letter Builder", "Cover Letter Templates", "Cover Letter Examples"],
    },
    {
      title: "Resources",
      links: ["Career Blog", "Resume Help", "Job Search", "Interview Prep"],
    },
    {
      title: "Company",
      links: ["About Us", "Pricing", "Terms of Service", "Privacy Policy"],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          {/* Logo & Social */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-[#0052FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold text-[#1A1C1E] tracking-tight">Enhancv</span>
            </a>
            <p className="text-sm text-[#4A4D52] mb-8 leading-relaxed">
              The world's most advanced resume builder. Join 5M+ people who have built their careers with Enhancv.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4A4D52] hover:bg-[#0052FF] hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4A4D52] hover:bg-[#0052FF] hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4A4D52] hover:bg-[#0052FF] hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4A4D52] hover:bg-[#0052FF] hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold text-[#1A1C1E] uppercase tracking-wider mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#4A4D52] hover:text-[#0052FF] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © 2026 Enhancv. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-gray-400 hover:text-[#0052FF] transition-colors">Cookies</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#0052FF] transition-colors">Sitemap</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#0052FF] transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
