import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Compass, FileText, ArrowRight, RotateCcw, ExternalLink } from 'lucide-react';
import { Resource, Opportunity, Article } from '../types';
import { RESOURCES } from '../data/resources';
import { OPPORTUNITIES } from '../data/opportunities';
import { ARTICLES } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResource: (resource: Resource) => void;
  onSelectArticle: (article: Article) => void;
  onNavigateToTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResource,
  onSelectArticle,
  onNavigateToTab
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'resources' | 'opportunities' | 'articles'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setFilterType('all');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Collect all unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    RESOURCES.forEach((r) => set.add(r.categoryLabel));
    OPPORTUNITIES.forEach((o) => set.add(o.categoryLabel));
    return Array.from(set);
  }, []);

  // Filtered Results
  const { matchedResources, matchedOpportunities, matchedArticles } = useMemo(() => {
    const q = query.toLowerCase().trim();

    const matchesSearch = (text: string) => text.toLowerCase().includes(q);

    const res = RESOURCES.filter((r) => {
      if (selectedCategory !== 'all' && r.categoryLabel !== selectedCategory) return false;
      if (!q) return true;
      return (
        matchesSearch(r.title) ||
        matchesSearch(r.summary) ||
        matchesSearch(r.fullDescription) ||
        matchesSearch(r.publisher) ||
        matchesSearch(r.categoryLabel) ||
        matchesSearch(r.resourceType) ||
        r.keyTakeaways.some((k) => matchesSearch(k))
      );
    });

    const opp = OPPORTUNITIES.filter((o) => {
      if (selectedCategory !== 'all' && o.categoryLabel !== selectedCategory) return false;
      if (!q) return true;
      return (
        matchesSearch(o.title) ||
        matchesSearch(o.institution) ||
        matchesSearch(o.summary) ||
        matchesSearch(o.location) ||
        matchesSearch(o.categoryLabel)
      );
    });

    const art = ARTICLES.filter((a) => {
      if (!q) return true;
      return (
        matchesSearch(a.title) ||
        matchesSearch(a.excerpt) ||
        matchesSearch(a.category) ||
        matchesSearch(a.author.name)
      );
    });

    return {
      matchedResources: filterType === 'all' || filterType === 'resources' ? res : [],
      matchedOpportunities: filterType === 'all' || filterType === 'opportunities' ? opp : [],
      matchedArticles: filterType === 'all' || filterType === 'articles' ? art : []
    };
  }, [query, filterType, selectedCategory]);

  const totalResults = matchedResources.length + matchedOpportunities.length + matchedArticles.length;

  if (!isOpen) return null;

  const handleResetFilters = () => {
    setQuery('');
    setFilterType('all');
    setSelectedCategory('all');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full shadow-2xl relative my-auto overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search active recall, systematic reviews, electives, Cairo congresses..."
            className="flex-1 text-sm sm:text-base outline-none text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              title="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-slate-400 mr-1 font-medium">Type:</span>
            {(['all', 'resources', 'opportunities', 'articles'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors font-medium ${
                  filterType === type
                    ? 'bg-[#102C3A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-md border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#176B65]"
            >
              <option value="all">All Topics</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {(query || filterType !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 hover:underline"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {totalResults === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-sm font-semibold text-slate-800">No matching medical resources found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for keywords like "Anki", "Cochrane", "CV", "Kasr Al-Ainy", "Exchange", or reset your topic filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#176B65] bg-[#EEF9F5] rounded-lg hover:bg-[#A8E6CF]/30 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Search Filters</span>
              </button>
            </div>
          ) : (
            <>
              {/* Study & Career Resources */}
              {matchedResources.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#176B65]" />
                      <span>Study & Career Resources ({matchedResources.length})</span>
                    </span>
                  </div>
                  <div className="space-y-2">
                    {matchedResources.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => {
                          onClose();
                          onSelectResource(res);
                        }}
                        className="p-3.5 rounded-xl border border-slate-200/80 hover:border-[#176B65]/40 hover:bg-slate-50/70 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-semibold text-[#176B65]">{res.categoryLabel}</span>
                          <span>{res.publisher}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#176B65] transition-colors mb-1">
                          {res.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {res.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Opportunities & Electives */}
              {matchedOpportunities.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#176B65]" />
                      <span>Opportunities & Electives ({matchedOpportunities.length})</span>
                    </span>
                  </div>
                  <div className="space-y-2">
                    {matchedOpportunities.map((opp) => (
                      <div
                        key={opp.id}
                        className="p-3.5 rounded-xl border border-slate-200/80 hover:border-[#176B65]/40 hover:bg-slate-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                            <span className="font-semibold text-[#176B65]">{opp.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{opp.institution}</span>
                            <span aria-hidden="true">·</span>
                            <span>{opp.location}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-slate-900 mb-1">
                            {opp.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-1">
                            {opp.summary}
                          </p>
                        </div>
                        <a
                          href={opp.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-[#176B65] hover:underline"
                        >
                          <span>Official Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Editorial Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#176B65]" />
                      <span>Student Magazine Articles ({matchedArticles.length})</span>
                    </span>
                  </div>
                  <div className="space-y-2">
                    {matchedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onClose();
                          onSelectArticle(art);
                        }}
                        className="p-3.5 rounded-xl border border-slate-200/80 hover:border-[#176B65]/40 hover:bg-slate-50/70 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                          <span className="font-semibold text-[#176B65]">{art.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.readTime}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.author.name}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#176B65] transition-colors mb-1">
                          {art.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {art.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            {totalResults} matching item{totalResults === 1 ? '' : 's'} across directory
          </span>
          <span className="text-slate-400">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};
