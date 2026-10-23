/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { StudySmarterPage } from './components/pages/StudySmarterPage';
import { CareerDevelopmentPage } from './components/pages/CareerDevelopmentPage';
import { OpportunitiesPage } from './components/pages/OpportunitiesPage';
import { CoursesPage } from './components/pages/CoursesPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { SubmitResourceModal } from './components/SubmitResourceModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { AccountSettingsModal } from './components/auth/AccountSettingsModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RESOURCES } from './data/resources';
import { OPPORTUNITIES } from './data/opportunities';
import { ARTICLES } from './data/articles';
import { COMMUNITY_STORIES } from './data/communityStories';
import { useBookmarks } from './hooks/useBookmarks';
import { Resource, Article } from './types';

function MainAppContent() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { notification, clearNotification } = useAuth();

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

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const featuredResources = RESOURCES.filter((r) => r.featured);
  const spotlightOpportunities = OPPORTUNITIES.filter((o) => o.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-app)] text-[var(--text-main)] dark:bg-[#0B1922] dark:text-[#F1F5F9] transition-colors duration-200">
      {/* Verification Notification Banner */}
      {notification && (
        <div
          className={`py-3 px-4 text-xs sm:text-sm font-medium transition-all sticky top-0 z-50 shadow-md ${
            notification.type === 'success'
              ? 'bg-[#176B65] text-white border-b border-[#A8E6CF]/40'
              : notification.type === 'error'
              ? 'bg-red-900 text-red-100 border-b border-red-700'
              : 'bg-[#183C4F] text-slate-100 border-b border-slate-700'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-[#A8E6CF] shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-300 shrink-0" />
              )}
              <span className="leading-snug">{notification.message}</span>
            </div>
            <button
              type="button"
              onClick={clearNotification}
              className="p-1.5 text-white/80 hover:text-white hover:bg-black/20 rounded-lg transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar / Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarksCount={bookmarksCount}
        onOpenAuth={handleOpenAuth}
        onOpenSettings={() => setIsSettingsOpen(true)}
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
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesPage
            onOpenSubmit={() => setIsSubmitOpen(true)}
            onNavigate={handleNavigate}
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

      {/* Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />

      {/* Account Profile & Security Settings Modal */}
      <AccountSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
