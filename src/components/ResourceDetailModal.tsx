import React from 'react';
import { X, ExternalLink, Bookmark, CheckCircle2, Clock, User, Building, BookOpen, Share2 } from 'lucide-react';
import { Resource } from '../types';
import { RESOURCES } from '../data/resources';

interface ResourceDetailModalProps {
  resource: Resource | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectRelated: (resource: Resource) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated
}) => {
  if (!resource) return null;

  // Find 2 related resources in the same category or pillar
  const relatedResources = RESOURCES.filter(
    (r) => r.id !== resource.id && (r.category === resource.category || r.pillar === resource.pillar)
  ).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Resource link copied to clipboard!');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-[#176B65]">{resource.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{resource.resourceType}</span>
            {resource.duration && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{resource.duration}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(resource.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'border-[#176B65] bg-[#EEF9F5] text-[#176B65]'
                  : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#102C3A] leading-tight mb-2">
              {resource.title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {resource.summary}
            </p>
          </div>

          {/* Attribution Strip */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-slate-400">Publisher:</span>{' '}
                <span className="font-semibold text-slate-800">{resource.publisher}</span>
              </div>
            </div>
            {resource.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Author:</span>{' '}
                  <span className="font-semibold text-slate-800">{resource.author}</span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-slate-400">Pillar:</span>{' '}
                <span className="font-medium capitalize text-slate-800">
                  {resource.pillar.replace('-', ' ')}
                </span>
              </div>
            </div>
            {resource.publishedDate && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Curated:</span>{' '}
                  <span className="font-medium text-slate-800">{resource.publishedDate}</span>
                </div>
              </div>
            )}
          </div>

          {/* Full Academic Abstract / Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Overview & Academic Context
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {resource.fullDescription}
            </p>
          </div>

          {/* Key Takeaways Checklist */}
          {resource.keyTakeaways && resource.keyTakeaways.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Educational Takeaways
              </h4>
              <ul className="space-y-2.5">
                {resource.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#176B65] shrink-0 mt-0.5" />
                    <span className="leading-snug">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Primary Action Button to Original Publisher */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={resource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#176B65] hover:bg-[#11534E] rounded-xl transition-colors shadow-sm"
            >
              <span>Access Original Resource at {resource.publisher}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => onToggleBookmark(resource.id)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border transition-colors ${
                isBookmarked
                  ? 'border-[#176B65] text-[#176B65] bg-[#EEF9F5]'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Item'}</span>
            </button>
          </div>

          {/* Academic Copyright & Ownership Transparency Notice */}
          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            MedRise provides original educational abstracts and study guides directing learners to verified original publications. Full copyright remains with {resource.publisher}.
          </div>

          {/* Related Resources */}
          {relatedResources.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Related Study Resources
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedResources.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="text-left p-3 rounded-lg border border-slate-200 hover:border-[#176B65]/40 hover:bg-slate-50 transition-all text-xs"
                  >
                    <span className="font-medium text-[#176B65] block mb-1">
                      {rel.categoryLabel}
                    </span>
                    <span className="font-semibold text-slate-900 block line-clamp-1 mb-1">
                      {rel.title}
                    </span>
                    <span className="text-slate-500 line-clamp-2">
                      {rel.summary}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
