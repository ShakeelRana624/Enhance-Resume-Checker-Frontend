import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle, Zap, FileText, Layout, ShieldCheck, ArrowRight } from "lucide-react";

export default function ResumeBuilderPage() {
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
                Land more interviews with Enhancv's <span className="text-[#0052FF]">Resume Builder</span>
              </h1>
              <p className="text-xl text-[#4A4D52] mb-8 leading-relaxed">
                Create a professional resume that results in interview callbacks. Premium & free templates. Fill in your details & apply to jobs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#0052FF] text-white text-lg font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20">
                  Build my resume
                </button>
                <button className="px-8 py-4 bg-white text-[#1A1C1E] border border-gray-200 text-lg font-bold rounded-full hover:bg-gray-50 transition-all">
                  View templates
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img 
                  src="https://picsum.photos/seed/resume-professional/800/600" 
                  alt="Professional Resume Builder" 
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E]/40 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 z-20">
                <div className="w-12 h-12 bg-[#00C853]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#00C853]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1A1C1E]">ATS Optimized</div>
                  <div className="text-xs text-[#4A4D52]">Guaranteed pass</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Job Applicants", value: "15M+" },
              { label: "Resumes Created", value: "10M+" },
              { label: "Years of Experience", value: "11+" },
              { label: "Interviews Booked", value: "1M+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-[#1A1C1E] mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-[#4A4D52] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0052FF]/10 text-[#0052FF] text-sm font-bold uppercase tracking-wider mb-6"
            >
              <Layout className="w-4 h-4" />
              Premium Templates
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1C1E] mb-6">
              Pick a <span className="text-[#0052FF]">template</span> that fits your style
            </h2>
            <p className="text-xl text-[#4A4D52] max-w-2xl mx-auto">
              Recruiter-approved designs that help you stand out from the crowd. 
              Optimized for ATS and human eyes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { id: 1, name: "Modern Professional", category: "Corporate", image: "https://picsum.photos/seed/resume-1/600/800" },
              { id: 2, name: "Creative Executive", category: "Creative", image: "https://picsum.photos/seed/resume-2/600/800" },
              { id: 3, name: "Tech Specialist", category: "Technology", image: "https://picsum.photos/seed/resume-3/600/800" },
              { id: 4, name: "Traditional Academic", category: "Education", image: "https://picsum.photos/seed/resume-4/600/800" },
              { id: 5, name: "Entry Level", category: "Graduate", image: "https://picsum.photos/seed/resume-5/600/800" },
              { id: 6, name: "Minimalist", category: "Simple", image: "https://picsum.photos/seed/resume-6/600/800" },
            ].map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-gray-50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1A1C1E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 scale-50 group-hover:scale-100 transition-transform duration-500">
                      <Zap className="w-8 h-8 text-white fill-current" />
                    </div>
                    <h4 className="text-white text-2xl font-bold mb-2">{template.name}</h4>
                    <p className="text-white/80 text-sm mb-8">{template.category} optimized layout</p>
                    <button className="px-8 py-3 bg-[#0052FF] text-white font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20">
                      Use this template
                    </button>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
                    <span className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider">{template.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="px-10 py-5 bg-[#1A1C1E] text-white text-lg font-bold rounded-full hover:bg-black transition-all flex items-center gap-3 mx-auto shadow-xl">
              Browse all 100+ templates
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] mb-4">
              Everything you need to <span className="text-[#0052FF]">succeed</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI Content Writing", icon: Zap, desc: "Let our AI help you write impactful bullet points." },
              { title: "Premium Templates", icon: Layout, desc: "Choose from hundreds of recruiter-approved designs." },
              { title: "ATS Checker", icon: ShieldCheck, desc: "Real-time feedback on your resume's performance." },
            ].map((feature) => (
              <div key={feature.title} className="p-8 rounded-3xl border border-gray-100 bg-[#F8FAFF] hover:shadow-lg transition-all">
                <feature.icon className="w-10 h-10 text-[#0052FF] mb-6" />
                <h3 className="text-xl font-bold text-[#1A1C1E] mb-3">{feature.title}</h3>
                <p className="text-[#4A4D52]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
