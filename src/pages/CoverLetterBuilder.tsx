import { motion } from "motion/react";
import { CheckCircle, Zap, FileText, Layout, ShieldCheck } from "lucide-react";

export default function CoverLetterBuilderPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-24 bg-[#F8FAFF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1A1C1E] leading-tight mb-6">
                Online <span className="text-[#0052FF]">Cover Letter Builder</span>
              </h1>
              <p className="text-xl text-[#4A4D52] mb-8 leading-relaxed">
                Make a professional cover letter with matching resume design. Fill in your details & apply to jobs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#0052FF] text-white text-lg font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20">
                  Build my cover letter
                </button>
                <button className="px-8 py-4 bg-white text-[#1A1C1E] border border-gray-200 text-lg font-bold rounded-full hover:bg-gray-50 transition-all">
                  View examples
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/seed/cover-letter/800/600" 
                alt="Cover Letter Builder Interface" 
                className="rounded-3xl shadow-2xl border border-gray-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00C853]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#00C853]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1A1C1E]">Matching Design</div>
                  <div className="text-xs text-[#4A4D52]">Pairs with your resume</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] mb-4">
              A feature-packed, yet <span className="text-[#0052FF]">streamlined</span> builder
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: "Recruiter-Approved Templates", desc: "Professionally designed templates that follow recruiter expectations." },
              { title: "Matching Resume & Cover Letter", desc: "Create a cohesive professional brand with matching designs." },
              { title: "AI Content Suggestions", desc: "Get help writing the perfect introduction and closing statement." },
              { title: "Easy Customization", desc: "Adjust colors, fonts, and layouts with a single click." },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-6 p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-[#0052FF]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#0052FF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1C1E] mb-2">{feature.title}</h3>
                  <p className="text-[#4A4D52] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
