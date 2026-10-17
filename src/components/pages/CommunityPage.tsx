import React, { useState } from 'react';
import { Users, Quote, CheckCircle2, Heart, Sparkles, BookOpen, MessageSquare, ArrowRight, X } from 'lucide-react';
import { CommunityStory } from '../../types';

interface CommunityPageProps {
  stories: CommunityStory[];
  onOpenSubmit: () => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ stories, onOpenSubmit }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeStoryModal, setActiveStoryModal] = useState<CommunityStory | null>(null);

  const allTags = Array.from(new Set(stories.flatMap((s) => s.tags)));

  const filteredStories = selectedTag === 'all'
    ? stories
    : stories.filter((s) => s.tags.includes(selectedTag));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65]">
          <Users className="w-4 h-4 text-[#176B65]" />
          <span className="uppercase tracking-wider">Curated Student Knowledge Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102C3A] tracking-tight">
          Voices of the Egyptian Medical Community
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Real experiences, ward breakthroughs, and candid lessons from medical students across Cairo, Ain Shams, Mansoura, Alexandria, and Assiut. Structured as a trusted peer knowledge repository.
        </p>

        {/* Phase 1 Moderation Notice */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/90 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <strong>Editorial Standard:</strong> To maintain high academic credibility and prevent misinformation, version 1 features peer-reviewed student reflections verified by the MedRise editorial board.
          </div>
          <button
            onClick={onOpenSubmit}
            className="shrink-0 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#176B65] hover:bg-[#11534E] rounded-lg transition-colors cursor-pointer"
          >
            Submit Your Story
          </button>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-400 font-medium mr-1 shrink-0">Topic:</span>
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            selectedTag === 'all'
              ? 'bg-[#102C3A] text-white shadow-xs font-semibold'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          All Reflections ({stories.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedTag === tag
                ? 'bg-[#102C3A] text-white shadow-xs font-semibold'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#176B65]/40 transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              {/* Author Strip */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#176B65] text-[#A8E6CF] font-bold flex items-center justify-center text-sm shadow-xs">
                    {story.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102C3A]">{story.authorName}</h4>
                    <p className="text-xs text-slate-500">
                      {story.medicalSchool} · {story.authorYear}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Kicker */}
              <blockquote className="text-sm sm:text-base font-semibold text-[#176B65] leading-snug mb-3 italic">
                "{story.quote}"
              </blockquote>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#102C3A] mb-3 group-hover:text-[#176B65] transition-colors leading-snug">
                {story.title}
              </h3>

              {/* Snippet */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {story.storySnippet}
              </p>

              {/* High-Yield Lessons Learned List */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Takeaways for Juniors
                </div>
                <ul className="space-y-1.5">
                  {story.lessonsLearned.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#176B65] shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Read Full Story Button */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {story.tags.map((t) => (
                  <span key={t} className="text-[11px] text-slate-400 font-medium">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActiveStoryModal(story)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B65] hover:underline cursor-pointer"
              >
                <span>Read Full Reflection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Story Modal */}
      {activeStoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setActiveStoryModal(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#176B65] text-[#A8E6CF] font-bold flex items-center justify-center text-sm shadow-xs">
                  {activeStoryModal.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeStoryModal.authorName}</h4>
                  <p className="text-xs text-slate-500">
                    {activeStoryModal.medicalSchool} · {activeStoryModal.authorYear}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStoryModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <blockquote className="text-base font-semibold text-[#176B65] italic mb-3">
                "{activeStoryModal.quote}"
              </blockquote>
              <h2 className="text-xl sm:text-2xl font-bold text-[#102C3A] mb-4">
                {activeStoryModal.title}
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{activeStoryModal.storySnippet}</p>
                <p>{activeStoryModal.fullStory}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EEF9F5] border border-[#A8E6CF]/50 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#11534E]">
                Actionable Advice for Future Doctors
              </div>
              <ul className="space-y-1.5">
                {activeStoryModal.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#176B65] shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveStoryModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#176B65] hover:bg-[#11534E] rounded-lg transition-colors cursor-pointer"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
