import { GlassCard } from '../components/GlassCard';
import { Lock, EyeOff, ShieldCheck } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Privacy Policy</h2>
        <p className="text-slate-400">How we protect your data and maintain your trust.</p>
      </header>

      <GlassCard className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-blue/20 rounded-xl">
            <Lock className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">No Data Retention</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We do not store your uploaded documents, images, or text inputs. Once the AI analysis is complete and you close your session, the data is permanently erased from our temporary processing memory.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-emerald/20 rounded-xl">
            <EyeOff className="w-6 h-6 text-brand-emerald" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Private Processing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your data is processed directly via encrypted channels to the Gemini API. We do not use your personal documents to train our models or any third-party models.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">User Control</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              You have full control over your history. The "Recent History" shown in your sidebar is stored locally in your browser's session and never sent to our servers.
            </p>
          </div>
        </div>

        <section className="pt-6 border-t border-white/10">
          <h4 className="text-white font-medium mb-2">Third-Party Services</h4>
          <p className="text-xs text-slate-500">
            We use Google's Gemini API for processing. By using this service, you agree to their terms of service regarding data processing for API users.
          </p>
        </section>
      </GlassCard>
    </div>
  );
};
