import { motion } from "motion/react";
import { Check, Zap, Star } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for testing the waters.",
      features: ["1 Resume & Cover Letter", "Standard Templates", "Basic ATS Checker", "PDF Download"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$14.99",
      period: "/month",
      desc: "Everything you need to land a job.",
      features: ["Unlimited Resumes", "Premium Templates", "AI Content Assistant", "Advanced ATS Grader", "Priority Support"],
      cta: "Go Pro",
      popular: true,
    },
    {
      name: "6-Month",
      price: "$10.99",
      period: "/month",
      desc: "Best value for long-term growth.",
      features: ["All Pro Features", "Career Coaching Discount", "Interview Prep Tools", "Personal Website Builder"],
      cta: "Choose Value",
      popular: false,
    },
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A1C1E] mb-6">
            Build a strikingly powerful resume <span className="text-[#0052FF]">approved by recruiters</span>
          </h1>
          <p className="text-xl text-[#4A4D52] max-w-2xl mx-auto">
            Choose the plan that fits your career goals. No credit card required to start!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[2.5rem] border ${
                plan.popular ? "border-[#0052FF] bg-[#F8FAFF] shadow-xl shadow-[#0052FF]/10" : "border-gray-100 bg-white"
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0052FF] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1A1C1E] mb-2">{plan.name}</h3>
                <p className="text-[#4A4D52] text-sm">{plan.desc}</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-[#1A1C1E]">{plan.price}</span>
                {plan.period && <span className="text-lg text-[#4A4D52] font-medium">{plan.period}</span>}
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[#1A1C1E] font-medium">
                    <Check className="w-5 h-5 text-[#00C853]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-full font-bold transition-all ${
                  plan.popular
                    ? "bg-[#0052FF] text-white hover:bg-[#0042CC] shadow-lg shadow-[#0052FF]/20"
                    : "bg-[#1A1C1E] text-white hover:bg-black"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
