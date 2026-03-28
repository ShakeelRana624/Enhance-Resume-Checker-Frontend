import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleGenAI, Type } from '@google/genai';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { motion, AnimatePresence } from 'motion/react';
import * as pdfjs from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';
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
  Star,
  Upload,
  X,
  FileUp,
  Brain,
  Cpu,
  AlertTriangle,
  Award,
  Copy,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

// Set worker path for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

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
  const [isExtracting, setIsExtracting] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { icon: Search, text: "Scanning resume structure...", tooltip: "We check for proper headings, margins, and section order." },
    { icon: FileText, text: "Analyzing keyword density...", tooltip: "Our AI identifies industry-specific keywords recruiters look for." },
    { icon: Target, text: "Checking ATS compatibility...", tooltip: "We ensure your resume can be correctly parsed by standard ATS." },
    { icon: TrendingUp, text: "Measuring impact & metrics...", tooltip: "We look for quantifiable achievements and action-oriented language." },
    { icon: ShieldCheck, text: "Finalizing your report...", tooltip: "Compiling all insights into a comprehensive report." },
  ];

  const extractTextFromFile = async (file: File) => {
    setIsExtracting(true);
    setError('');
    setFileName(file.name);
    
    try {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        setResumeText(fullText);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setResumeText(result.value);
      } else if (file.type === 'text/plain') {
        const text = await file.text();
        setResumeText(text);
      } else {
        throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to extract text from file.');
      setFileName('');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      extractTextFromFile(file);
    }
  };

  const clearFile = () => {
    setFileName('');
    setResumeText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeKeyword = (keyword: string) => {
    if (!report) return;
    setReport((prev: any) => ({
      ...prev,
      missingKeywords: prev.missingKeywords.filter((kw: string) => kw !== keyword)
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const applySuggestion = (original: string, suggestion: string) => {
    setResumeText(prev => prev.replace(original, suggestion));
  };

  const applyAllSuggestions = () => {
    if (!report?.writingSuggestions) return;
    setResumeText(prev => {
      let updated = prev;
      report.writingSuggestions.forEach((s: any) => {
        updated = updated.replace(s.original, s.suggestion);
      });
      return updated;
    });
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!resumeText.trim()) {
      setError('Please provide your resume text or upload a file.');
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
      try {
        await addDoc(collection(db, 'analyses'), {
          userId: user.uid,
          resumeText,
          jobDescription,
          report: result,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'analyses');
      }

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
                <div className="flex justify-between items-end">
                  <label className="text-lg font-bold text-[#1A1C1E] block">Your Resume</label>
                  {fileName && (
                    <button 
                      type="button"
                      onClick={clearFile}
                      className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Clear File
                    </button>
                  )}
                </div>
                
                {!fileName ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-[#0052FF] hover:bg-[#F8FAFF] cursor-pointer transition-all group"
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#0052FF]/10 transition-colors">
                      {isExtracting ? (
                        <Loader2 className="w-8 h-8 text-[#0052FF] animate-spin" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#0052FF] transition-colors" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-[#1A1C1E]">Click to upload or drag and drop</p>
                      <p className="text-sm text-[#4A4D52]">PDF, DOCX, or TXT (Max 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden" 
                      accept=".pdf,.docx,.txt"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#0052FF]/10 text-[#0052FF] text-[10px] font-bold rounded-full uppercase tracking-widest">
                      Extracted Text
                    </div>
                    <textarea
                      required
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="w-full h-48 p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-[#0052FF] focus:border-transparent outline-none transition-all resize-none font-mono text-sm"
                      placeholder="Paste your resume content here..."
                    />
                    <div className="mt-2 flex items-center gap-2 text-sm text-[#4A4D52] font-medium">
                      <FileUp className="w-4 h-4 text-[#0052FF]" />
                      {fileName}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  Or paste text below if you don't have a file
                </div>
                {!fileName && (
                   <textarea
                   required
                   value={resumeText}
                   onChange={(e) => setResumeText(e.target.value)}
                   className="w-full h-32 p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-[#0052FF] focus:border-transparent outline-none transition-all resize-none"
                   placeholder="Paste your resume content here..."
                 />
                )}
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
                disabled={isAnalyzing || isExtracting}
                className="w-full py-5 bg-[#0052FF] text-white text-lg font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="space-y-10"
          >
            {/* Score & Skill Strength Bento Box */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Score Card */}
              <div className="lg:col-span-2 bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0052FF]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00C853]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0052FF]/10 text-[#0052FF] text-sm font-black uppercase tracking-widest mb-10">
                    <Award className="w-5 h-5" />
                    ATS Optimization Score
                  </div>
                  
                  <div className="relative inline-block mb-8">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 rounded-full bg-[#00C853]/20 blur-2xl animate-pulse" />
                    
                    <svg className="w-64 h-64 transform -rotate-90 relative z-10">
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00C853" />
                          <stop offset="100%" stopColor="#64DD17" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="128"
                        cy="128"
                        r="116"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        className="text-gray-100"
                      />
                      <motion.circle
                        cx="128"
                        cy="128"
                        r="116"
                        stroke="url(#scoreGradient)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={728.8}
                        initial={{ strokeDashoffset: 728.8 }}
                        animate={{ strokeDashoffset: 728.8 - (728.8 * report.score) / 100 }}
                        transition={{ duration: 2, ease: "circOut" }}
                      />
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-8xl font-black text-[#1A1C1E] tracking-tighter"
                      >
                        {report.score}
                      </motion.span>
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Percent Match</span>
                    </div>
                  </div>
                  
                  <p className="text-xl text-[#4A4D52] max-w-md mx-auto font-medium">
                    {report.score >= 80 
                      ? "Excellent! Your resume is highly optimized for this role." 
                      : report.score >= 60 
                      ? "Good start, but there's room for significant improvement." 
                      : "Your resume needs major optimization to pass ATS filters."}
                  </p>
                </div>
              </div>

              {/* Skill Strength Card */}
              <div className="bg-[#1A1C1E] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
                
                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <TrendingUp className="w-7 h-7 text-[#00C853]" />
                    Skill Balance
                  </h3>
                  
                  <div className="space-y-10">
                    {/* Technical Skills */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-xs tracking-widest">
                          <Cpu className="w-4 h-4" />
                          Technical
                        </div>
                        <div className="text-2xl font-black text-[#00C853]">{report.skillStrength.technical}%</div>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${report.skillStrength.technical}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-[#00C853] rounded-full shadow-[0_0_15px_rgba(0,200,83,0.5)]"
                        />
                      </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-xs tracking-widest">
                          <Brain className="w-4 h-4" />
                          Soft Skills
                        </div>
                        <div className="text-2xl font-black text-[#0052FF]">{report.skillStrength.soft}%</div>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${report.skillStrength.soft}%` }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                          className="h-full bg-[#0052FF] rounded-full shadow-[0_0_15px_rgba(0,82,255,0.5)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    We analyze the semantic weight of your experience to determine your professional balance.
                  </p>
                </div>
              </div>
            </div>

            {/* Keywords & Strengths Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Missing Keywords */}
              <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-[#1A1C1E] flex items-center gap-3">
                    <AlertTriangle className="w-7 h-7 text-[#FF3D00]" />
                    Missing Keywords
                  </h3>
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-black rounded-full uppercase tracking-widest">
                    {report.missingKeywords.length} Critical
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {report.missingKeywords.map((kw: string, i: number) => (
                    <motion.div 
                      key={kw} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 bg-red-50/30 text-[#1A1C1E] rounded-2xl text-sm font-bold border border-red-100 hover:border-red-200 transition-all flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF3D00]" />
                      {kw}
                      <button 
                        onClick={() => removeKeyword(kw)}
                        className="ml-1 p-0.5 hover:bg-red-100 rounded-full transition-colors text-red-400 hover:text-red-600"
                        title="Remove keyword"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
                {report.missingKeywords.length === 0 && (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-12 h-12 text-[#00C853] mx-auto mb-4 opacity-20" />
                    <p className="text-gray-400 font-medium">No critical keywords missing!</p>
                  </div>
                )}
              </div>

              {/* Core Strengths */}
              <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-[#1A1C1E] flex items-center gap-3">
                    <CheckCircle2 className="w-7 h-7 text-[#00C853]" />
                    Core Strengths
                  </h3>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-black rounded-full uppercase tracking-widest">
                    Verified
                  </span>
                </div>
                <div className="grid gap-4">
                  {report.coreStrengths.map((strength: string, i: number) => (
                    <motion.div 
                      key={strength}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFF] border border-gray-50 group hover:border-[#00C853]/30 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#00C853]/10 flex items-center justify-center text-[#00C853] group-hover:bg-[#00C853] group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-[#1A1C1E] font-bold">{strength}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Writing Assistant Suggestions */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="text-2xl font-bold text-[#1A1C1E] flex items-center gap-3">
                  <Zap className="w-7 h-7 text-[#0052FF]" />
                  AI Writing Assistant Suggestions
                </h3>
                <button
                  onClick={applyAllSuggestions}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0052FF] text-white font-bold rounded-full hover:bg-[#0042CC] transition-all shadow-lg shadow-[#0052FF]/20 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Apply All Suggestions
                </button>
              </div>
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
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs font-bold text-[#00C853] uppercase">AI Suggestion</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyToClipboard(s.suggestion)}
                              className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-[#0052FF]"
                              title="Copy suggestion"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => applySuggestion(s.original, s.suggestion)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00C853]/10 text-[#00C853] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#00C853] hover:text-white transition-all"
                              title="Apply to resume"
                            >
                              <Check className="w-3 h-3" />
                              Apply
                            </button>
                          </div>
                        </div>
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
                onClick={() => {
                  setReport(null);
                  setFileName('');
                  setResumeText('');
                }}
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
