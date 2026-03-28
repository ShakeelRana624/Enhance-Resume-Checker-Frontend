import { motion } from "motion/react";
import { Search, Layout, FileText, Lightbulb, Target, TrendingUp } from "lucide-react";

const features = [
  {
    title: "ATS Resume Checker",
    description: "Our algorithms analyze your resume against common Applicant Tracking Systems to ensure you pass the first hurdle.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Content Analysis",
    description: "Get detailed feedback on your resume content, including action verbs, bullet points, and quantitative results.",
    icon: FileText,
    color: "bg-purple-500",
  },
  {
    title: "Design & Layout",
    description: "We check if your resume is readable, professional, and visually appealing to human recruiters.",
    icon: Layout,
    color: "bg-orange-500",
  },
  {
    title: "Expert Tips",
    description: "Receive actionable advice from career experts on how to improve specific sections of your resume.",
    icon: Lightbulb,
    color: "bg-yellow-500",
  },
  {
    title: "Keyword Optimization",
    description: "Identify missing keywords that are essential for the specific roles and industries you're targeting.",
    icon: Target,
    color: "bg-red-500",
  },
  {
    title: "Impact Measurement",
    description: "Learn how to quantify your achievements to show recruiters the real value you bring to a company.",
    icon: TrendingUp,
    color: "bg-green-500",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] mb-4">
            Improve your resume with Enhancv’s <span className="text-[#0052FF]">full grader toolset</span>
          </h2>
          <p className="text-lg text-[#4A4D52] max-w-2xl mx-auto">
            Our resume checker goes beyond simple spelling and grammar. We provide a comprehensive analysis of your professional profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1C1E] mb-3">{feature.title}</h3>
              <p className="text-[#4A4D52] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Rich Visual Section */}
        <div className="bg-[#1A1C1E] rounded-[3rem] p-8 sm:p-16 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <img 
              src="https://picsum.photos/seed/abstract-tech/1200/800" 
              alt="Abstract Tech" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Data-driven insights for the <span className="text-[#0052FF]">modern job seeker</span>
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our platform uses advanced machine learning to compare your resume against millions of data points from successful hires at top companies like Google, Amazon, and Meta.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user-${i}/100/100`} 
                      alt={`User ${i}`} 
                      className="w-12 h-12 rounded-full border-4 border-[#1A1C1E]"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-white">
                  <div className="font-bold">5M+ Users</div>
                  <div className="text-xs text-gray-400 font-medium">Trust Enhancv</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/professional-workspace/600/400" 
                alt="Professional Workspace" 
                className="rounded-3xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-6 -left-6 bg-[#0052FF] p-4 rounded-2xl shadow-xl text-white font-bold text-sm animate-pulse">
                Live Analysis Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
