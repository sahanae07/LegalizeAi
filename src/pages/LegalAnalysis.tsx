import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Loader2, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { analyzeLegalDocument, LegalAnalysisResult } from '../services/gemini';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const LegalAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LegalAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = (reader.result as string).split(',')[1];
          const analysis = await analyzeLegalDocument({ data: base64, mimeType: file.type });
          setResult(analysis);
          setLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        const text = await file.text();
        const analysis = await analyzeLegalDocument(text);
        setResult(analysis);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to analyze document. Please try again.');
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  } as any);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysis = await analyzeLegalDocument(textInput);
      setResult(analysis);
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Legal Document Analysis</h2>
        <p className="text-slate-400">Simplify complex contracts and identify potential risks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="border-brand-blue/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-brand-blue" />
              Upload Document
            </h3>
            <div 
              {...getRootProps()} 
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                isDragActive ? "border-brand-blue bg-brand-blue/10" : "border-white/10 hover:border-white/20 hover:bg-white/5"
              )}
            >
              <input {...getInputProps()} />
              <FileText className="w-10 h-10 text-slate-500 mx-auto mb-4" />
              <p className="text-sm text-slate-400">
                Drag & drop or click to upload PDF, DOCX, TXT or Image
              </p>
            </div>
          </GlassCard>

          <GlassCard className="border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Paste Text</h3>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste legal text here..."
              className="w-full h-40 bg-brand-slate-light border border-white/10 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-brand-blue/50 resize-none"
            />
            <button
              onClick={handleTextSubmit}
              disabled={loading || !textInput.trim()}
              className="w-full btn-primary mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Analyze Text'}
            </button>
          </GlassCard>
        </div>

        <div className="lg:col-span-2">
          {loading && (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
              <p className="animate-pulse">Analyzing document structure and clauses...</p>
            </div>
          )}

          {error && (
            <GlassCard className="border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-6 h-6" />
                <p>{error}</p>
              </div>
            </GlassCard>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <GlassCard className="border-brand-blue/30 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Analysis Results</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">Risk Score:</span>
                    <div className="w-16 h-16 rounded-full border-4 border-brand-blue flex items-center justify-center text-xl font-bold text-white shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                      {result.riskScore}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2">Simple Summary</h4>
                    <p className="text-slate-200 leading-relaxed">{result.summary}</p>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3">Key Risks</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.keyRisks.map((risk, i) => (
                        <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-start gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-1.5 shrink-0",
                            risk.level === 'High' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                            risk.level === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
                          )} />
                          <div>
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded mb-1 inline-block",
                              risk.level === 'High' ? "bg-red-500/20 text-red-400" :
                              risk.level === 'Medium' ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                            )}>
                              {risk.level} Risk
                            </span>
                            <p className="text-sm text-slate-300">{risk.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3">Important Clauses</h4>
                    <div className="space-y-3">
                      {result.importantClauses.map((clause, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/5">
                          <h5 className="text-white font-medium mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                            {clause.title}
                          </h5>
                          <p className="text-sm text-slate-400">{clause.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-brand-blue/10 p-4 rounded-xl border border-brand-blue/20">
                    <h4 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Real World Impact
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed italic">"{result.realWorldImpact}"</p>
                  </section>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {!loading && !result && !error && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-2xl p-20">
              <FileText className="w-16 h-16 mb-4 opacity-20" />
              <p>Upload or paste a document to see the analysis here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
