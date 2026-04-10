import { GlassCard } from '../components/GlassCard';
import { HelpCircle, MessageSquare, FileText, Beaker } from 'lucide-react';

export const Help = () => {
  const faqs = [
    {
      q: "How accurate is the legal analysis?",
      a: "Our AI uses the latest Gemini models to provide high-accuracy summaries. However, legal nuances can be complex, so we recommend using our analysis as a starting point for discussion with a legal professional.",
      icon: FileText
    },
    {
      q: "What file formats do you support?",
      a: "We support PDF, DOCX, TXT for documents, and PNG, JPG, JPEG for images of labels or contracts.",
      icon: HelpCircle
    },
    {
      q: "How do I use the Voice Assistant?",
      a: "Click the floating message icon in the bottom right. You can speak to the assistant or type your questions about the analyzed content.",
      icon: MessageSquare
    },
    {
      q: "Can I analyze food from a different country?",
      a: "Yes, our AI is trained on global ingredient databases and can recognize most international additives and chemicals.",
      icon: Beaker
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Help Center</h2>
        <p className="text-slate-400">Frequently asked questions and usage guides.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <GlassCard className="h-full space-y-3">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <faq.icon className="w-5 h-5 text-brand-blue" />
              </div>
              <h3 className="text-white font-semibold">{faq.q}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </GlassCard>
          </div>
        ))}
      </div>

      <GlassCard className="bg-brand-blue/10 border-brand-blue/20 text-center py-10">
        <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
        <p className="text-slate-400 mb-6">Our support team is here to help you understand your data.</p>
        <button className="btn-primary">Contact Support</button>
      </GlassCard>
    </div>
  );
};
