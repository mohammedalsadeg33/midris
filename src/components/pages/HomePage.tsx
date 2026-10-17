import React from 'react';
import { ArrowRight, BookOpen, Compass, Award, Users, Sparkles, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { Resource, Opportunity, Article, CommunityStory } from '../../types';
import { ResourceCard } from '../ResourceCard';
import { OpportunityCard } from '../OpportunityCard';
import { IMAGES } from '../../assets/images';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  featuredResources: Resource[];
  spotlightOpportunities: Opportunity[];
  featuredArticles: Article[];
  communityStories: CommunityStory[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string, type: 'resource' | 'opportunity') => void;
  onSelectResource: (resource: Resource) => void;
  onSelectArticle: (article: Article) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  featuredResources,
  spotlightOpportunities,
  featuredArticles,
  communityStories,
  isBookmarked,
  onToggleBookmark,
  onSelectResource,
  onSelectArticle
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* SECTION B: HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65]">
                <span className="w-2 h-2 rounded-full bg-[#176B65]" />
                <span className="uppercase tracking-wider">Medical Student Growth Platform · Egypt</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102C3A] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Your Medical Journey, <span className="text-[#176B65]">Elevated.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Discover smarter ways to study, build your professional future, and find opportunities that help you grow beyond the classroom.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('study-smarter')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#176B65] hover:bg-[#11534E] rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Resources</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('opportunities')}
                  className="px-6 py-3 text-sm font-semibold text-[#102C3A] hover:text-[#176B65] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Discover Opportunities</span>
                  <Compass className="w-4 h-4 text-[#176B65]" />
                </button>
              </div>

              {/* Trust Indicators: Contextual Medical Faculties in Egypt */}
              <div className="pt-6 border-t border-slate-200/80">
                <div className="text-xs text-slate-400 font-medium mb-2.5">
                  Curated for students across Egyptian medical schools & international bodies:
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 font-medium">
                  <span>Kasr Al-Ainy</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>Ain Shams</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>Mansoura</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>Alexandria</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>Assiut</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-[#176B65]">IFMSA-Egypt</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group">
                <img
                  src={IMAGES.heroStudy}
                  alt="Medical students studying together in a university library in Egypt"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C3A]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs font-semibold text-[#A8E6CF] uppercase tracking-wider mb-1">
                      Academic Rigor & Peer Collaboration
                    </div>
                    <div className="text-sm font-medium text-slate-100 leading-snug">
                      Active recall, research publications, and clinical clerkship preparation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: QUICK-ACCESS CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#176B65] uppercase tracking-wider mb-1">
            Core Pillars
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A]">
            Four Pathways to Medical Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Study Smarter */}
          <div
            onClick={() => onNavigate('study-smarter')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#176B65] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF9F5] text-[#176B65] flex items-center justify-center mb-5 group-hover:bg-[#176B65] group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102C3A] mb-2 group-hover:text-[#176B65] transition-colors">
                Study Smarter
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Evidence-based study protocols: active recall, spaced repetition with Anki, time blocking, and question-bank mastery.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B65] pt-2 border-t border-slate-100">
              <span>View study guides</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Career Development */}
          <div
            onClick={() => onNavigate('career-development')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#176B65] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF9F5] text-[#176B65] flex items-center justify-center mb-5 group-hover:bg-[#176B65] group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102C3A] mb-2 group-hover:text-[#176B65] transition-colors">
                Career Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Research methodology, systematic reviews, academic CV formulation, mentor outreach, and clinical communication.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B65] pt-2 border-t border-slate-100">
              <span>Explore career tracks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Opportunities */}
          <div
            onClick={() => onNavigate('opportunities')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#176B65] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF9F5] text-[#176B65] flex items-center justify-center mb-5 group-hover:bg-[#176B65] group-hover:text-white transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102C3A] mb-2 group-hover:text-[#176B65] transition-colors">
                Opportunities
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Searchable directory of clinical electives, international scholarships, national congresses, and student leadership roles.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B65] pt-2 border-t border-slate-100">
              <span>Browse directory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Student Community */}
          <div
            onClick={() => onNavigate('community')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#176B65] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF9F5] text-[#176B65] flex items-center justify-center mb-5 group-hover:bg-[#176B65] group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102C3A] mb-2 group-hover:text-[#176B65] transition-colors">
                Student Community
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Curated insights, hospital clerkship survival stories, research lessons, and peer wisdom from senior Egyptian medical students.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B65] pt-2 border-t border-slate-100">
              <span>Read student stories</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: FEATURED RESOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#176B65] uppercase tracking-wider mb-1">
              Curated Academic Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A]">
              Featured Learning Resources
            </h2>
          </div>
          <button
            onClick={() => onNavigate('study-smarter')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65] hover:underline cursor-pointer shrink-0"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.slice(0, 3).map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              isBookmarked={isBookmarked(res.id)}
              onToggleBookmark={(id) => onToggleBookmark(id, 'resource')}
              onSelectResource={onSelectResource}
            />
          ))}
        </div>
      </section>

      {/* SECTION E: OPPORTUNITIES SPOTLIGHT */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold text-[#176B65] uppercase tracking-wider mb-1">
                Verified Programs & Callouts
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A]">
                Opportunities Spotlight
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Conferences, research traineeships, clinical electives, and exchange clerkships in Egypt and abroad.
              </p>
            </div>
            <button
              onClick={() => onNavigate('opportunities')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65] hover:underline cursor-pointer shrink-0"
            >
              <span>Explore All Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlightOpportunities.slice(0, 3).map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isBookmarked={isBookmarked(opp.id)}
                onToggleBookmark={(id) => onToggleBookmark(id, 'opportunity')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: FEATURED ARTICLES (STUDENT MAGAZINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#176B65] uppercase tracking-wider mb-1">
            MedRise Magazine · Editorial Column
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A]">
            Student-Focused Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Practical strategies written by doctors, residents, and senior medical scholars in Egypt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-[#176B65] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {article.imagePath && (
                  <div className="h-40 overflow-hidden bg-slate-100">
                    <img
                      src={article.imagePath}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <span className="font-semibold text-[#176B65]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#102C3A] group-hover:text-[#176B65] transition-colors leading-snug line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate mr-2 font-medium">{article.author.name}</span>
                  <span className="text-[#176B65] font-semibold shrink-0 group-hover:underline">
                    Read Story
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION G: COMMUNITY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#102C3A] text-white">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-semibold text-[#A8E6CF] uppercase tracking-wider mb-2">
              Peer Mentorship & Voices
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Wisdom from Students Ahead of You
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Unvarnished reflections on navigating high-volume hospital rotations, conquering residency exams, and turning research rejections into publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityStories.slice(0, 2).map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-xl bg-[#183C4F]/60 border border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <blockquote className="text-sm font-medium italic text-slate-100 mb-4 leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {story.storySnippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{story.authorName}</div>
                    <div className="text-slate-400 text-[11px]">{story.medicalSchool} · {story.authorYear}</div>
                  </div>
                  <button
                    onClick={() => onNavigate('community')}
                    className="text-xs font-semibold text-[#A8E6CF] hover:underline"
                  >
                    Full story
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Have a medical school milestone or hard-learned clinical lesson to share?
            </span>
            <button
              onClick={() => onNavigate('community')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#102C3A] bg-[#A8E6CF] hover:bg-[#A8E6CF]/90 rounded-lg transition-colors cursor-pointer"
            >
              <span>Explore Student Knowledge Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ACADEMIC ETHICS & DISCLAIMER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-xl bg-slate-100 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="space-y-1">
            <span className="font-bold text-[#102C3A] text-sm block">Academic Disclaimer</span>
            <p className="max-w-3xl leading-relaxed">
              Study strategies and research guides are designed to optimize independent learning workflows. MedRise makes no guarantee of specific examination outcomes. Always follow the official course syllabi and clinical supervision protocols of your university medical school.
            </p>
          </div>
          <button
            onClick={() => onNavigate('study-smarter')}
            className="shrink-0 px-4 py-2 text-xs font-semibold text-[#102C3A] bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors"
          >
            Review Study Strategies
          </button>
        </div>
      </section>
    </div>
  );
};
