/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { StudySmarterPage } from './components/pages/StudySmarterPage';
import { CareerDevelopmentPage } from './components/pages/CareerDevelopmentPage';
import { OpportunitiesPage } from './components/pages/OpportunitiesPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { SubmitResourceModal } from './components/SubmitResourceModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SearchModal } from './components/SearchModal';
import { RESOURCES } from './data/resources';
import { OPPORTUNITIES } from './data/opportunities';
import { ARTICLES } from './data/articles';
import { COMMUNITY_STORIES } from './data/communityStories';
import { useBookmarks } from './hooks/useBookmarks';
import { Resource, Article } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const {
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    clearAllBookmarks,
    savedResources,
    savedOpportunities,
    totalCount: bookmarksCount
  } = useBookmarks();

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredResources = RESOURCES.filter((r) => r.featured);
  const spotlightOpportunities = OPPORTUNITIES.filter((o) => o.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F7] text-[#102C3A]">
      {/* Top Bar / Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarksCount={bookmarksCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            featuredResources={featuredResources}
            spotlightOpportunities={spotlightOpportunities}
            featuredArticles={ARTICLES}
            communityStories={COMMUNITY_STORIES}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
            onSelectResource={(r) => setSelectedResource(r)}
            onSelectArticle={(a) => setSelectedArticle(a)}
          />
        )}

        {currentTab === 'study-smarter' && (
          <StudySmarterPage
            resources={RESOURCES}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
            onSelectResource={(r) => setSelectedResource(r)}
          />
        )}

        {currentTab === 'career-development' && (
          <CareerDevelopmentPage
            resources={RESOURCES}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
            onSelectResource={(r) => setSelectedResource(r)}
          />
        )}

        {currentTab === 'opportunities' && (
          <OpportunitiesPage
            opportunities={OPPORTUNITIES}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {currentTab === 'community' && (
          <CommunityPage
            stories={COMMUNITY_STORIES}
            onOpenSubmit={() => setIsSubmitOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSubmit={() => setIsSubmitOpen(true)}
      />

      {/* Modals & Slide-out Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResource={(r) => setSelectedResource(r)}
        onSelectArticle={(a) => setSelectedArticle(a)}
        onNavigateToTab={handleNavigate}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedResources={savedResources}
        savedOpportunities={savedOpportunities}
        onRemoveBookmark={removeBookmark}
        onClearAll={clearAllBookmarks}
        onSelectResource={(r) => setSelectedResource(r)}
        onNavigate={handleNavigate}
      />

      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        isBookmarked={selectedResource ? isBookmarked(selectedResource.id) : false}
        onToggleBookmark={(id) => toggleBookmark(id, 'resource')}
        onSelectRelated={(r) => setSelectedResource(r)}
      />

      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <SubmitResourceModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </div>
  );
}
