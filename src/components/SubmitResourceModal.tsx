import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface SubmitResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitResourceModal: React.FC<SubmitResourceModalProps> = ({ isOpen, onClose }) => {
  const [submissionType, setSubmissionType] = useState<'resource' | 'opportunity'>('resource');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [publisher, setPublisher] = useState('');
  const [category, setCategory] = useState('study-strategies');
  const [targetLevel, setTargetLevel] = useState('all');
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !publisher.trim()) {
      setError('Please provide a title, official URL, and organizing institution/publisher.');
      return;
    }

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid website URL (starting with https:// or http://).');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTitle('');
    setUrl('');
    setPublisher('');
    setNotes('');
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-[#EEF9F5] text-[#176B65] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#102C3A]">
              Submission Received!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Thank you for contributing to the MedRise community. Our editorial team verifies all external citations, academic accuracy, and organizer criteria before publishing.
            </p>
            <p className="text-xs text-slate-500">
              For direct inquiries or urgent updates, email{' '}
              <a
                href="mailto:mohammedalsadeg33@gmail.com"
                className="text-[#176B65] font-semibold hover:underline"
              >
                mohammedalsadeg33@gmail.com
              </a>
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#176B65] hover:bg-[#11534E] rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#176B65] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMUNITY CONTRIBUTION</span>
              </div>
              <h2 className="text-xl font-bold text-[#102C3A]">
                Submit a Resource or Opportunity
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Help fellow medical students discover high-yield study tools, research electives, and conferences across Egypt.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Submission Type Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Submission Type
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSubmissionType('resource')}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                      submissionType === 'resource'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Study / Career Resource
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionType('opportunity')}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                      submissionType === 'opportunity'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Opportunity / Elective
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title or Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    submissionType === 'resource'
                      ? 'e.g., Cairo University Clinical Skills Video Series'
                      : 'e.g., Alexandria Summer Pediatric Elective 2027'
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#176B65] focus:border-transparent text-slate-900"
                />
              </div>

              {/* Official URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official URL / Source Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#176B65] focus:border-transparent text-slate-900"
                />
              </div>

              {/* Publisher / Institution */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organizing Institution or Publisher <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasr Al-Ainy, IFMSA-Egypt, Cochrane, WHO"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#176B65] focus:border-transparent text-slate-900"
                />
              </div>

              {/* Target Academic Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Student Level
                </label>
                <select
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#176B65] focus:border-transparent text-slate-900 bg-white"
                >
                  <option value="all">All Medical Students</option>
                  <option value="preclinical">Preclinical Years (Y1-Y2)</option>
                  <option value="clinical">Clinical Years (Y3-Y5)</option>
                  <option value="intern">Interns / House Officers</option>
                </select>
              </div>

              {/* Brief Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Summary / Why is it high-yield?
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain why Egyptian medical students should know about this..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#176B65] focus:border-transparent text-slate-900"
                />
              </div>

              {/* Submitter Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Student / Academic Email (Optional, for verification)
                </label>
                <input
                  type="email"
                  placeholder="student@med.asu.edu.eg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#176B65] focus:border-transparent text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#176B65] hover:bg-[#11534E] rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Review</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
