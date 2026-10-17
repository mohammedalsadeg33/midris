import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Brain, CheckCircle2, SlidersHorizontal, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { Resource, ResourceType } from '../../types';
import { ResourceCard } from '../ResourceCard';

interface StudySmarterPageProps {
  resources: Resource[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string, type: 'resource' | 'opportunity') => void;
  onSelectResource: (resource: Resource) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Topics' },
  { id: 'active-recall', label: 'Active Recall' },
  { id: 'spaced-repetition', label: 'Spaced Repetition & Anki' },
  { id: 'time-management', label: 'Time Management' },
  { id: 'exam-prep', label: 'Exam Preparation' },
  { id: 'note-taking', label: 'Note-Taking' },
  { id: 'burnout-prevention', label: 'Avoiding Burnout' },
];

export const StudySmarterPage: React.FC<StudySmarterPageProps> = ({
  resources,
  isBookmarked,
  onToggleBookmark,
  onSelectResource
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'duration' | 'title'>('recommended');

  const studyResources = useMemo(() => {
    return resources.filter((r) => r.pillar === 'study-smarter');
  }, [resources]);

  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const result = studyResources.filter((res) => {
      // Category filter
      if (selectedCategory !== 'all' && res.category !== selectedCategory) {
        return false;
      }

      // Resource type filter
      if (selectedType !== 'all' && res.resourceType !== selectedType) {
        return false;
      }

      // Keyword search
      if (q) {
        const matchTitle = res.title.toLowerCase().includes(q);
        const matchSummary = res.summary.toLowerCase().includes(q);
        const matchDesc = res.fullDescription.toLowerCase().includes(q);
        const matchPublisher = res.publisher.toLowerCase().includes(q);
        const matchTakeaways = res.keyTakeaways.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSummary && !matchDesc && !matchPublisher && !matchTakeaways) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'duration') {
        return (a.duration || '').localeCompare(b.duration || '');
      }
      // 'recommended'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [studyResources, searchQuery, selectedCategory, selectedType, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65]">
          <Brain className="w-4 h-4 text-[#176B65]" />
          <span className="uppercase tracking-wider">Cognitive Learning Science</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102C3A] tracking-tight">
          Study Smarter Hub
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          High-yield academic workflows designed for medical students. Master difficult preclinical concepts, optimize your spaced repetition decks, and build enduring clinical memory.
        </p>

        {/* Realistic Medical Disclaimer Box */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Realistic Expectations:</strong> These study methods represent evidence-based strategies derived from cognitive psychology and medical education research. They do not promise guaranteed exam scores or effortless mastery. Consistency, self-testing, and individualized adaptation remain paramount.
          </p>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search active recall strategies, Anki deck structures, time blocking..."
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

        {/* Category Filters (Horizontal Segmented Buttons) */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Topic Filter
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

        {/* Secondary Filters: Resource Type & Sorting */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Format:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#176B65]"
            >
              <option value="all">All Formats</option>
              <option value="guide">Guides</option>
              <option value="article">Articles</option>
              <option value="template">Templates</option>
              <option value="course">Courses</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#176B65]"
              >
                <option value="recommended">Highest Yield / Recommended</option>
                <option value="title">Alphabetical (A-Z)</option>
                <option value="duration">Study Duration</option>
              </select>
            </div>

            {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredResources.length}</strong> study resource{filteredResources.length === 1 ? '' : 's'}
          </span>
          <span className="text-slate-400">All materials cite verified medical publishers</span>
        </div>

        {filteredResources.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/90 space-y-3">
            <Search className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No study guides match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try selecting a different topic or resetting the search query to browse all preclinical and clinical study resources.
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
            {filteredResources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                isBookmarked={isBookmarked(res.id)}
                onToggleBookmark={(id) => onToggleBookmark(id, 'resource')}
                onSelectResource={onSelectResource}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
