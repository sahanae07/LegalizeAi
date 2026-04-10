import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Beaker, Upload, Loader2, AlertCircle, CheckCircle2, ShieldAlert, Info } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { analyzeIngredients, IngredientAnalysisResult } from '../services/gemini';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const IngredientSafety = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IngredientAnalysisResult | null>(null);
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
          const analysis = await analyzeIngredients({ data: base64, mimeType: file.type });
          setResult(analysis);
          setLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        const text = await file.text();
        const analysis = await analyzeIngredients(text);
        setResult(analysis);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to analyze ingredients. Please try again.');
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt']
    },
    multiple: false
  } as any);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysis = await analyzeIngredients(textInput);
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
        <h2 className="text-3xl font-bold text-white mb-2">Ingredient Safety Checker</h2>
        <p className="text-slate-400">Analyze food, health, and cosmetic ingredients for potential risks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="border-brand-emerald/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-brand-emerald" />
              Upload Photo
            </h3>
            <div 
              {...getRootProps()} 
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                isDragActive ? "border-brand-emerald bg-brand-emerald/10" : "border-white/10 hover:border-white/20 hover:bg-white/5"
              )}
            >
              <input {...getInputProps()} />
              <Beaker className="w-10 h-10 text-slate-500 mx-auto mb-4" />
              <p className="text-sm text-slate-400">
                Drag & drop or click to upload product label photo
              </p>
            </div>
          </GlassCard>

          <GlassCard className="border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Paste Ingredients</h3>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste ingredient list here..."
              className="w-full h-40 bg-brand-slate-light border border-white/10 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-brand-emerald/50 resize-none"
            />
            <button
              onClick={handleTextSubmit}
              disabled={loading || !textInput.trim()}
              className="w-full bg-brand-emerald hover:bg-brand-emerald/90 text-white px-4 py-2 rounded-lg transition-all active:scale-95 font-medium mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Analyze Ingredients'}
            </button>
          </GlassCard>
        </div>

        <div className="lg:col-span-2">
          {loading && (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-brand-emerald" />
              <p className="animate-pulse">Scanning ingredients for potential hazards...</p>
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
              <GlassCard className="border-brand-emerald/30 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Safety Report</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">Safety Score:</span>
                    <div className={cn(
                      "w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold text-white shadow-lg",
                      result.safetyScore > 70 ? "border-brand-emerald shadow-brand-emerald/20" : 
                      result.safetyScore > 40 ? "border-amber-500 shadow-amber-500/20" : "border-red-500 shadow-red-500/20"
                    )}>
                      {result.safetyScore}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-semibold text-brand-emerald uppercase tracking-wider mb-3">Ingredient Breakdown</h4>
                    <div className="space-y-3">
                      {result.ingredients.map((ing, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-white font-medium">{ing.name}</h5>
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                              ing.riskLevel === 'Hazardous' ? "bg-red-500/20 text-red-400" :
                              ing.riskLevel === 'Caution' ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                            )}>
                              {ing.riskLevel}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 mb-2">{ing.explanation}</p>
                          {ing.sideEffects && (
                            <div className="flex items-start gap-2 text-xs text-slate-500 italic">
                              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>Side effects: {ing.sideEffects}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-brand-emerald/10 p-4 rounded-xl border border-brand-emerald/20">
                    <h4 className="text-sm font-semibold text-brand-emerald uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      General Advice
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed italic">"{result.generalAdvice}"</p>
                  </section>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {!loading && !result && !error && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-2xl p-20">
              <Beaker className="w-16 h-16 mb-4 opacity-20" />
              <p>Upload a photo or paste ingredients to see the safety report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
