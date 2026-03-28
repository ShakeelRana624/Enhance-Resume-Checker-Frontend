import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleGenAI, Type } from '@google/genai';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Target, 
  Zap, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  ShieldCheck,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default function Analysis() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState('');

  const steps = [
    { icon: Search, text: "Scanning resume structure...", tooltip: "We check for proper headings, margins, and section order." },
    { icon: FileText, text: "Analyzing keyword density...", tooltip: "Our AI identifies industry-specific keywords recruiters look for." },
    { icon: Target, text: "Checking ATS compatibility...", tooltip: "We ensure your resume can be correctly parsed by standard ATS." },
    { icon: TrendingUp, text: "Measuring impact & metrics...", tooltip: "We look for quantifiable achievements and action-oriented language." },
    { icon: ShieldCheck, text: "Finalizing your report...", tooltip: "Compiling all insights into a comprehensive report." },
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(0);
    setError('');

    try {
      // Step-by-step animation simulation
      for (let i = 0; i < steps.length; i++) {
        setAnalysisStep(i);
        await new Promise(r => setTimeout(r, 1000));
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Analyze the following resume against the job description.
          Resume: ${resumeText}
          Job Description: ${jobDescription}
          
          Provide a detailed report in JSON format with the following structure:
          {
            "score": number (0-100),
            "missingKeywords": string[],
            "recommendations": string[],
            "coreStrengths": string[],
            "skillStrength": { "technical": number, "soft": number },
            "writingSuggestions": [ { "section": string, "original": string, "suggestion": string, "reason": string } ]
          }
        `,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              coreStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              skillStrength: { 
                type: Type.OBJECT,
                properties: {
                  technical: { type: Type.NUMBER },
                  soft: { type: Type.NUMBER }
                }
              },
              writingSuggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    section: { type: Type.STRING },
                    original: { type: Type.STRING },
                    suggestion: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                }
              }
            },
            required: ['score', 'missingKeywords', 'recommendations', 'coreStrengths', 'skillStrength', 'writingSuggestions']
          }
        }
      });

      const result = JSON.parse(response.text);
      setReport(result);

      // Save to Firestore
      await addDoc(collection(db, 'analyses'), {
        userId: user.uid,
        resumeText,
        jobDescription,
        report: result,
        createdAt: new Date().toISOString(),
      });

    } catch (err: any) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!report ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-gray-100"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1A1C1E] mb-2">Rate My Resume</h2>
              <p className="text-[#4A4D52]">Upload your resume and the job description for a deep AI analysis.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <form onSubmit={handleAnalyze} className="space-y-8">
              <div className="space-y-4">
                <label className="text-lg font-bold text-[#1A1C1E] block">Your Resume Text</label>
                <textarea
                  required
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full h-48 p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-[#0052FF] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Paste your resume content here..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-lg font-bold text-[#1A1C1E] block">Job Description</label>
                <textarea
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-48 p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-[#0052FF] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Paste the job description you're targeting..."
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-5 bg-[#0052FF] text-white text-lg font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20 flex items-center justify-center gap-3"
              >
                {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    Analyze Resume
                    <Zap className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Score Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0052FF]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0052FF]/10 text-[#0052FF] text-sm font-bold uppercase tracking-wider mb-6">
                  <Star className="w-4 h-4 fill-current" />
                  Analysis Complete
                </div>
                <h2 className="text-2xl font-bold text-[#1A1C1E] mb-8">Your ATS Score</h2>
                <div className="relative inline-block">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-100"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={552.9}
                      initial={{ strokeDashoffset: 552.9 }}
                      animate={{ strokeDashoffset: 552.9 - (552.9 * report.score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="text-[#00C853]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-black text-[#1A1C1E]">{report.score}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Missing Keywords */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-[#1A1C1E] mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-[#0052FF]" />
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {report.missingKeywords.map((kw: string) => (
                    <span key={kw} className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold border border-red-100">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Strengths */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-[#1A1C1E] mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#00C853]" />
                  Core Strengths
                </h3>
                <ul className="space-y-3">
                  {report.coreStrengths.map((strength: string) => (
                    <li key={strength} className="flex items-center gap-3 text-[#4A4D52] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Writing Assistant Suggestions */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1A1C1E] mb-8 flex items-center gap-3">
                <Zap className="w-7 h-7 text-[#0052FF]" />
                AI Writing Assistant Suggestions
              </h3>
              <div className="space-y-8">
                {report.writingSuggestions.map((s: any, i: number) => (
                  <div key={i} className="p-8 rounded-3xl bg-[#F8FAFF] border border-gray-100">
                    <div className="text-xs font-bold text-[#0052FF] uppercase mb-4 tracking-widest">{s.section}</div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Original</div>
                        <p className="text-[#4A4D52] italic">"{s.original}"</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#00C853] uppercase mb-2">AI Suggestion</div>
                        <p className="text-[#1A1C1E] font-bold">"{s.suggestion}"</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Why this works</div>
                      <p className="text-sm text-[#4A4D52]">{s.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setReport(null)}
                className="px-10 py-4 bg-[#1A1C1E] text-white font-bold rounded-full hover:bg-black transition-all flex items-center gap-2"
              >
                Analyze Another Resume
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
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
    </div>
  );
}
