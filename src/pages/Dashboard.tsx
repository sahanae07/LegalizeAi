import { FileText, Beaker, ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { motion } from 'motion/react';

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to LegalizeAI</h2>
        <p className="text-slate-400">Your professional assistant for legal clarity and product safety.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/legal" className="group">
          <GlassCard className="h-full border-brand-blue/20 hover:border-brand-blue/50 transition-all duration-300 group-hover:translate-y-[-4px]">
            <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue/30 transition-colors">
              <FileText className="text-brand-blue w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Legal Document Analysis</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Upload contracts, terms of service, or legal notices. We'll simplify the jargon, identify risks, and explain the real-world impact in plain English.
            </p>
            <div className="flex items-center gap-2 text-brand-blue font-medium text-sm">
              Start Analysis <span>→</span>
            </div>
          </GlassCard>
        </Link>

        <Link to="/ingredients" className="group">
          <GlassCard className="h-full border-brand-emerald/20 hover:border-brand-emerald/50 transition-all duration-300 group-hover:translate-y-[-4px]">
            <div className="w-12 h-12 bg-brand-emerald/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-emerald/30 transition-colors">
              <Beaker className="text-brand-emerald w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Ingredient Safety Checker</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Analyze food labels, cosmetics, or health supplements. Identify harmful chemicals, allergens, and understand potential side effects instantly.
            </p>
            <div className="flex items-center gap-2 text-brand-emerald font-medium text-sm">
              Check Ingredients <span>→</span>
            </div>
          </GlassCard>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex items-start gap-4 p-5">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Privacy First</h4>
            <p className="text-xs text-slate-500">Your documents are processed securely and never stored.</p>
          </div>
        </GlassCard>
        
        <GlassCard className="flex items-start gap-4 p-5">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Risk Detection</h4>
            <p className="text-xs text-slate-500">Advanced AI identifies hidden clauses and harmful additives.</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-start gap-4 p-5">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Info className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Plain English</h4>
            <p className="text-xs text-slate-500">Complex terminology translated to a 5th-grade reading level.</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
