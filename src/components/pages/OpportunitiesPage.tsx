import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Compass, MapPin, CheckCircle2, AlertCircle, Building2, ShieldCheck, Filter } from 'lucide-react';
import { Opportunity, OpportunityCategory, FundingType } from '../../types';
import { OpportunityCard } from '../OpportunityCard';

interface OpportunitiesPageProps {
  opportunities: Opportunity[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string, type: 'resource' | 'opportunity') => void;
}

const CATEGORIES: { id: OpportunityCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Opportunities' },
  { id: 'conference', label: 'Conferences & Workshops' },
  { id: 'exchange', label: 'Student Exchanges' },
  { id: 'clinical-elective', label: 'Internships & Electives' },
  { id: 'research', label: 'Research Traineeships' },
  { id: 'scholarship', label: 'Scholarships & Fellowships' },
  { id: 'volunteering', label: 'Volunteering & Caravans' },
  { id: 'leadership', label: 'Student Leadership' }
];

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  opportunities,
  isBookmarked,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedFunding, setSelectedFunding] = useState<FundingType | 'all'>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'verified-only' | 'demonstration-only'>('all');

  const filteredOpportunities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return opportunities.filter((opp) => {
      // Category filter
      if (selectedCategory !== 'all' && opp.category !== selectedCategory) {
        return false;
      }

      // Location scope filter
      if (selectedLocation !== 'all' && opp.locationScope !== selectedLocation) {
        return false;
      }

      // Funding status filter
      if (selectedFunding !== 'all' && opp.funding !== selectedFunding) {
        return false;
      }

      // Verification filter
      if (verificationFilter === 'verified-only' && opp.isDemonstration) {
        return false;
      }
      if (verificationFilter === 'demonstration-only' && !opp.isDemonstration) {
        return false;
      }

      // Keyword search
      if (q) {
        const matchTitle = opp.title.toLowerCase().includes(q);
        const matchInst = opp.institution.toLowerCase().includes(q);
        const matchLoc = opp.location.toLowerCase().includes(q);
        const matchSummary = opp.summary.toLowerCase().includes(q);
        const matchElig = opp.eligibility.toLowerCase().includes(q);
        if (!matchTitle && !matchInst && !matchLoc && !matchSummary && !matchElig) {
          return false;
        }
      }

      return true;
    });
  }, [opportunities, searchQuery, selectedCategory, selectedLocation, selectedFunding, verificationFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedFunding('all');
    setVerificationFilter('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65]">
          <Compass className="w-4 h-4 text-[#176B65]" />
          <span className="uppercase tracking-wider">Academic & Clinical Opportunities Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102C3A] tracking-tight">
          Opportunities for Medical Students
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Discover conferences, clinical electives, exchange programs, research fellowships, and medical volunteering missions in Egypt and worldwide.
        </p>

        {/* Verification Transparency Banner */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/90 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#176B65] shrink-0" />
            <span>
              <strong>Editorial Transparency:</strong> We prioritize official organizer links. Verified programs indicate confirmed intake dates; demonstration entries highlight typical eligibility requirements awaiting next cycle announcements.
            </span>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified Official
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              Demonstration Model
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Hub */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Cairo University congress, IFMSA exchange, Resala volunteering, Chevening..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#176B65] text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Buttons */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Category
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#102C3A] text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Filters: Region, Funding, Verification */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Region:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#176B65]"
              >
                <option value="all">All Locations</option>
                <option value="Egypt">Egypt (Local Focus)</option>
                <option value="International">International</option>
                <option value="Online">Online / Hybrid</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Funding:</span>
              <select
                value={selectedFunding}
                onChange={(e) => setSelectedFunding(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#176B65]"
              >
                <option value="all">All Funding Types</option>
                <option value="fully-funded">Fully Funded</option>
                <option value="partial">Partial Subsidy</option>
                <option value="free-entry">Free Entry / Waived</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#176B65]"
              >
                <option value="all">All Listings</option>
                <option value="verified-only">Verified Official Only</option>
                <option value="demonstration-only">Demonstration Models</option>
              </select>
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedLocation !== 'all' || selectedFunding !== 'all' || verificationFilter !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Opportunities Directory Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredOpportunities.length}</strong> opportunit{filteredOpportunities.length === 1 ? 'y' : 'ies'}
          </span>
          <span className="text-slate-400">Default geographic context: Egypt</span>
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/90 space-y-3">
            <Compass className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No opportunities match this criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try broadening your category or region filter to browse all active conferences, electives, and exchange programs.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#176B65] bg-[#EEF9F5] rounded-lg hover:bg-[#A8E6CF]/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isBookmarked={isBookmarked(opp.id)}
                onToggleBookmark={(id) => onToggleBookmark(id, 'opportunity')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
