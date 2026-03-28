import { motion } from "motion/react";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ContentSection() {
  return (
    <section className="py-24 bg-[#F8FAFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none text-[#4A4D52]">
          <h2 className="text-3xl font-bold text-[#1A1C1E] mb-8">
            Your resume is an extension of yourself – make one that’s truly you
          </h2>
          
          <p className="mb-6 leading-relaxed">
            Resume.io is a popular tool, but is it the right one for your career goals? Our resume checker helps you identify if your current resume is meeting the high standards of today's competitive job market.
          </p>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1A1C1E] mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#0052FF]" />
                  Key areas we analyze:
                </h3>
                <ul className="grid gap-4 list-none p-0 m-0">
                  {[
                    "ATS Compatibility",
                    "Keyword Density",
                    "Action Verbs",
                    "Formatting & Layout",
                    "Quantifiable Results",
                    "Contact Information",
                    "Professional Summary",
                    "Skills Alignment"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold text-[#1A1C1E] m-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/resume-analysis-detail/400/500" 
                  alt="Resume Analysis Detail" 
                  className="rounded-2xl shadow-lg border border-gray-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#0052FF] text-white p-4 rounded-xl shadow-xl font-bold text-sm">
                  98% Accuracy
                </div>
              </div>
            </div>
          </div>

          <p className="mb-12 leading-relaxed">
            Most recruiters spend less than 6 seconds looking at a resume before deciding if it's worth a closer look. Our tool ensures that your resume is optimized for both the algorithm and the human eye.
          </p>

          {/* CTA Box */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A1C1E] text-white p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0052FF]/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to build a resume that gets you hired?
              </h3>
              <p className="text-gray-400 mb-8 text-lg max-w-xl">
                Join over 5 million people who have built their careers with Enhancv. Start for free today.
              </p>
              <button className="px-8 py-4 bg-[#0052FF] text-white font-bold rounded-full hover:bg-[#0042CC] transition-all flex items-center gap-2 group/btn">
                Build my resume now
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
