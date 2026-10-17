import React from 'react';
import { Bookmark, ExternalLink, Calendar, MapPin, CheckCircle2, AlertCircle, Building2, Coins } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const formatFunding = (funding: string, details?: string) => {
  switch (funding) {
    case 'fully-funded':
      return details ? `Fully Funded (${details})` : 'Fully Funded';
    case 'partial':
      return details ? `Partial Subsidy (${details})` : 'Partial Funding';
    case 'free-entry':
      return 'Free Entry / Tuition Waived';
    case 'self-funded':
      return 'Self-Funded';
    default:
      return 'Funding Details on Site';
  }
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <div className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200/90 hover:border-[#176B65]/40 transition-all duration-200 p-6 hover:shadow-md">
      <div>
        {/* Verification Status Banner & Category (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#176B65]">
              {opportunity.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600">
              {opportunity.locationScope}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(opportunity.id);
            }}
            className={`p-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
              isBookmarked
                ? 'text-[#176B65] bg-[#EEF9F5]'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this opportunity'}
            title={isBookmarked ? 'Saved to Bookmarks' : 'Save for later'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Status Callout (Demonstration vs Verified Official) */}
        {opportunity.isDemonstration ? (
          <div className="mb-3 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Demonstration Entry:</span>{' '}
              <span className="text-amber-800">
                {opportunity.verificationNote || 'Curated reference entry awaiting next cycle publication.'}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-3 py-1 text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Official Organizer Program</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-semibold text-[#102C3A] group-hover:text-[#176B65] transition-colors leading-snug mb-1">
          {opportunity.title}
        </h3>

        {/* Institution */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mb-3">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="line-clamp-1">{opportunity.institution}</span>
        </div>

        {/* Summary */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {opportunity.summary}
        </p>

        {/* Key Metadata Grid */}
        <div className="space-y-2 text-xs text-slate-600 py-3 border-t border-b border-slate-100 mb-4 bg-slate-50/50 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400">Location:</span>{' '}
              <span className="font-medium text-slate-800">{opportunity.location}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400">Deadline:</span>{' '}
              {opportunity.deadlineVerified ? (
                <span className="font-semibold text-slate-800 tabular-nums">
                  {opportunity.deadline}
                </span>
              ) : (
                <span className="text-amber-700 italic">
                  {opportunity.deadline || 'Pending official cycle confirmation'}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Coins className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400">Funding:</span>{' '}
              <span className="font-medium text-slate-800">
                {formatFunding(opportunity.funding, opportunity.fundingDetails)}
              </span>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="text-xs text-slate-600 mb-4">
          <span className="font-semibold text-slate-700">Eligibility:</span>{' '}
          <span className="line-clamp-2">{opportunity.eligibility}</span>
        </div>
      </div>

      {/* Action: Official Application Link */}
      <div className="pt-2">
        <a
          href={opportunity.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#102C3A] hover:text-white bg-slate-100 hover:bg-[#176B65] border border-slate-200 hover:border-transparent rounded-lg transition-colors cursor-pointer"
        >
          <span>Official Application & Info</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
