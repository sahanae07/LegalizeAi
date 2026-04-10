import { GlassCard } from '../components/GlassCard';
import { Shield, Scale, HeartPulse } from 'lucide-react';

export const About = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">About LegalizeAI</h2>
        <p className="text-slate-400">Bridging the gap between complex information and human understanding.</p>
      </header>

      <GlassCard className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="text-brand-blue w-6 h-6" />
            Our Mission
          </h3>
          <p className="text-slate-300 leading-relaxed">
            LegalizeAI was founded on the principle that everyone deserves to understand the documents they sign and the products they consume. We leverage cutting-edge AI to democratize access to legal and health expertise.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-white font-medium flex items-center gap-2">
              <Scale className="text-brand-blue w-5 h-5" />
              Legal Clarity
            </h4>
            <p className="text-sm text-slate-400">
              We believe legal jargon shouldn't be a barrier to justice or informed consent. Our AI translates complex legalese into plain English.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-medium flex items-center gap-2">
              <HeartPulse className="text-brand-emerald w-5 h-5" />
              Safety First
            </h4>
            <p className="text-sm text-slate-400">
              Transparency in ingredients is vital for health. We help you identify hidden risks in everyday products, from food to skincare.
            </p>
          </div>
        </div>

        <section className="pt-6 border-t border-white/10">
          <p className="text-xs text-slate-500 italic">
            Disclaimer: LegalizeAI provides AI-generated analysis for informational purposes only. It is not a substitute for professional legal advice or medical consultation.
          </p>
        </section>
      </GlassCard>
    </div>
  );
};
