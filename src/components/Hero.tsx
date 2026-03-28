import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Star, Zap, ShieldCheck, Loader2, Search, FileText, Target, TrendingUp, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Hero() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { 
      icon: Search, 
      text: "Scanning resume structure...", 
      tooltip: "We check for proper headings, margins, and section order to ensure readability." 
    },
    { 
      icon: FileText, 
      text: "Analyzing keyword density...", 
      tooltip: "Our AI identifies industry-specific keywords that recruiters are looking for." 
    },
    { 
      icon: Target, 
      text: "Checking ATS compatibility...", 
      tooltip: "We ensure your resume can be correctly parsed by standard Applicant Tracking Systems." 
    },
    { 
      icon: TrendingUp, 
      text: "Measuring impact & metrics...", 
      tooltip: "We look for quantifiable achievements and action-oriented language." 
    },
    { 
      icon: ShieldCheck, 
      text: "Finalizing your report...", 
      tooltip: "Compiling all insights into a comprehensive, actionable report for you." 
    },
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setShowSuccess(false);
  };

  useEffect(() => {
    if (isAnalyzing && analysisStep < steps.length) {
      const timer = setTimeout(() => {
        setAnalysisStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (isAnalyzing && analysisStep === steps.length) {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        setShowSuccess(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, analysisStep]);

  return (
    <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-[#F8FAFF]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0052FF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0052FF]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0052FF]/10 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Free ATS Resume Checker
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1C1E] leading-[1.1] mb-6">
              Is your Resume.io resume <span className="text-[#0052FF]">good enough?</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#4A4D52] font-medium mb-8 leading-relaxed max-w-xl">
              Make sure your resume stands out for the right reasons! Our free and fast algorithm generates a tailored resume review report in under 3 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={startAnalysis}
                className="px-8 py-4 bg-[#0052FF] text-white text-lg font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span className="relative z-10">Rate my Resume.io resume</span>
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
              </button>
              <button className="px-8 py-4 bg-white text-[#1A1C1E] border border-gray-200 text-lg font-bold rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                See sample report
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#4A4D52] font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                ATS-friendly
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                Expert feedback
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                Free forever
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-8 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Mock Resume UI */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-gray-100 rounded-md animate-pulse" />
                    <div className="h-4 w-32 bg-gray-50 rounded-md animate-pulse" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#0052FF]/10 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-[#0052FF]" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-50 rounded-md" />
                  <div className="h-4 w-[90%] bg-gray-50 rounded-md" />
                  <div className="h-4 w-[95%] bg-gray-50 rounded-md" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#0052FF]/10">
                    <div className="text-xs font-bold text-[#0052FF] uppercase mb-1">ATS Score</div>
                    <div className="text-3xl font-black text-[#1A1C1E]">84<span className="text-sm font-medium text-gray-400">/100</span></div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#0052FF]/10">
                    <div className="text-xs font-bold text-[#0052FF] uppercase mb-1">Impact</div>
                    <div className="text-3xl font-black text-[#1A1C1E]">High</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-[#00C853] text-white px-6 py-3 rounded-2xl font-bold shadow-xl flex items-center gap-2 animate-bounce">
                <Star className="w-5 h-5 fill-current" />
                Top 1% Resume
              </div>
            </div>

            {/* Background Shape */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0052FF]/5 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </div>

      {/* Analysis Modal Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1C1E]/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-12 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                <motion.div 
                  className="h-full bg-[#0052FF]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(analysisStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-[#0052FF]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-[#0052FF] animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1C1E] mb-2">Analyzing your resume</h3>
                <p className="text-[#4A4D52]">Our AI is evaluating your professional profile against 500k+ successful resumes.</p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === analysisStep;
                  const isCompleted = index < analysisStep;

                  return (
                    <div 
                      key={step.text}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group/step relative",
                        isActive ? "bg-[#F8FAFF] border border-[#0052FF]/20 translate-x-2" : "opacity-50"
                      )}
                    >
                      {/* Tooltip */}
                      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-48 p-3 bg-[#1A1C1E] text-white text-xs rounded-xl opacity-0 invisible group-hover/step:opacity-100 group-hover/step:visible transition-all z-[110] shadow-xl pointer-events-none">
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#1A1C1E]" />
                        {step.tooltip}
                      </div>

                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        isCompleted ? "bg-[#00C853] text-white" : isActive ? "bg-[#0052FF] text-white" : "bg-gray-100 text-gray-400"
                      )}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={cn(
                        "font-semibold transition-colors",
                        isActive ? "text-[#1A1C1E]" : "text-[#4A4D52]"
                      )}>
                        {step.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1C1E]/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-12 max-w-lg w-full shadow-2xl text-center relative"
            >
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>

              <div className="w-20 h-20 bg-[#00C853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#00C853]" />
              </div>
              <h3 className="text-3xl font-bold text-[#1A1C1E] mb-4">Analysis Complete!</h3>
              <p className="text-lg text-[#4A4D52] mb-8">
                Your resume scored <span className="text-[#00C853] font-bold">84/100</span>. We've identified 3 key areas where you can improve to stand out to recruiters.
              </p>
              <div className="space-y-4">
                <button className="w-full py-4 bg-[#0052FF] text-white font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20">
                  View Full Report
                </button>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 bg-white text-[#1A1C1E] border border-gray-200 font-bold rounded-full hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
