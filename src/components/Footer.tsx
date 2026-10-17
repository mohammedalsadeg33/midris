import React, { useState } from 'react';
import { ShieldCheck, Mail, Send, Heart, ExternalLink, X } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenSubmit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSubmit }) => {
  const [modalContent, setModalContent] = useState<{ title: string; content: string[] } | null>(null);

  const openDisclaimer = () => {
    setModalContent({
      title: 'Medical & Educational Disclaimer',
      content: [
        'MedRise is an educational resource discovery and student growth platform curated primarily for medical undergraduates, interns, and academic trainees in Egypt.',
        'Content published or indexed on MedRise—including study guides, research methodologies, and clinical presentation frameworks—is provided solely for academic enrichment and informational purposes.',
        'This platform does not provide medical diagnoses, treatment recommendations, patient care advice, or formal clinical supervision. None of the materials substitute for official university faculty curriculum guidelines, accredited hospital clinical governance, or the direct judgment of a qualified, registered medical consultant.',
        'Opportunity listings (scholarships, electives, conferences) are compiled from public and institutional organizers. While MedRise clearly marks verified information and demonstration entries, students are strongly advised to confirm current deadlines and eligibility criteria directly with the official organizing institution prior to formal application.'
      ]
    });
  };

  const openPrivacy = () => {
    setModalContent({
      title: 'Privacy Policy',
      content: [
        'Version 1.0 — Effective October 2026',
        'MedRise respects student privacy. In this initial release, no account registration or cloud profiling is required to access all study materials, opportunities, and articles.',
        'Saved bookmarks are stored strictly within your local browser storage (localStorage) and never transmitted to remote analytics servers.',
        'If you submit a resource or opportunity through our editorial intake form, your provided name and contact email are used solely for editorial review and fact-checking regarding the suggested resource.',
        'We do not sell, rent, or monetize student contact information or study activity logs.',
        'For inquiries, editorial requests, or data feedback, please contact us directly at mohammedalsadeg33@gmail.com.'
      ]
    });
  };

  const openTerms = () => {
    setModalContent({
      title: 'Terms of Use',
      content: [
        'Welcome to MedRise. By accessing this platform, you agree to these Terms of Use.',
        'Intellectual Property: MedRise indexes, summarizes, and links to educational materials created by universities, medical societies, and academic publishers. Original external content remains the copyrighted intellectual property of its respective authors and publishers. MedRise provides synthesized educational abstracts and direct navigational links under fair informational discovery principles.',
        'Fair Usage: Users agree to use MedRise resources for personal academic growth and non-commercial educational study.',
        'Feedback & Submissions: When proposing resources, submitters affirm that recommended materials are legitimate, reputable, and beneficial for medical student training.'
      ]
    });
  };

  return (
    <footer className="bg-[#102C3A] text-slate-300 border-t border-[#183C4F] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#183C4F]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#176B65] border border-[#A8E6CF]/30 flex items-center justify-center text-white font-bold text-base shadow-sm">
                <span className="text-[#A8E6CF] text-lg font-black tracking-tighter">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MedRise
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              A trusted medical student growth and resource platform in Egypt. Bridging the gap between exam memorization, academic research, and meaningful clinical careers.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-[#A8E6CF]">Learn · Connect · Rise</span>
              <span aria-hidden="true">·</span>
              <span>Cairo, Alexandria & Across Egypt</span>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenSubmit}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#102C3A] bg-[#A8E6CF] hover:bg-[#A8E6CF]/90 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit a Resource or Opportunity</span>
              </button>
              <a
                href="mailto:mohammedalsadeg33@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#183C4F]/60 hover:bg-[#183C4F] rounded-lg border border-slate-700/60 transition-colors"
                title="Send email to mohammedalsadeg33@gmail.com"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Overview & Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('study-smarter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Study Smarter Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('career-development'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Career & Research
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('opportunities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Opportunities Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('community'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Student Community
                </button>
              </li>
            </ul>
          </div>

          {/* Core Topics */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Focus Areas
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Active Recall & Spaced Repetition</li>
              <li>Undergraduate Systematic Reviews</li>
              <li>Academic CV Standards</li>
              <li>Clinical Morning Rounds SBAR</li>
              <li>House Officer Endurance</li>
              <li>SCOP/SCORE Exchange Programs</li>
            </ul>
          </div>

          {/* Legal & Editorial */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Trust & Governance
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={openDisclaimer}
                  className="hover:text-white transition-colors text-left text-slate-300"
                >
                  Medical Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={openPrivacy}
                  className="hover:text-white transition-colors text-left text-slate-300"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={openTerms}
                  className="hover:text-white transition-colors text-left text-slate-300"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <a
                  href="mailto:mohammedalsadeg33@gmail.com"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-slate-300"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact (mohammedalsadeg33@gmail.com)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner & Medical Advisory */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-[#A8E6CF] shrink-0" />
            <span>
              All external resources cite original authors and peer-reviewed publishers. Provided for academic study only.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} MedRise Platform</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Egypt Medical Student Initiative</span>
          </div>
        </div>
      </div>

      {/* Legal / Policy Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#102C3A] border border-[#183C4F] rounded-xl max-w-lg w-full p-6 text-slate-200 shadow-2xl relative">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#183C4F] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 pr-6">
              {modalContent.title}
            </h3>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {modalContent.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#183C4F] flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#176B65] hover:bg-[#1F8880] rounded-lg transition-colors cursor-pointer"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
