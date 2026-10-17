import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, ArrowUpRight, Mail } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  bookmarksCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'study-smarter', label: 'Study Smarter' },
    { id: 'career-development', label: 'Career Development' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'community', label: 'Student Community' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#102C3A]/95 backdrop-blur-md border-b border-[#183C4F] shadow-sm'
          : 'bg-[#102C3A] border-b border-[#183C4F]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 md:gap-8">
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left flex items-center gap-2.5 focus:outline-none"
              aria-label="MedRise Home"
            >
              <div className="w-8 h-8 rounded-lg bg-[#176B65] border border-[#A8E6CF]/30 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-[#1F8880] transition-colors">
                <span className="text-[#A8E6CF] text-lg font-black tracking-tighter">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#A8E6CF] transition-colors whitespace-nowrap">
                  MedRise
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#A8E6CF]/80 font-medium -mt-1 hidden sm:block">
                  Learn · Connect · Rise
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-[#A8E6CF] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A8E6CF] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Bookmarks, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#183C4F]/70 hover:bg-[#183C4F] hover:text-white rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
              aria-label="Search resources and opportunities"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline text-xs">Search directory</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] text-slate-400 bg-[#102C3A] rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Saved Bookmarks Trigger */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer"
              aria-label="View saved bookmarks"
              title="Saved items"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-[#102C3A] bg-[#A8E6CF] rounded-full">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Contact Email Trigger */}
            <a
              href="mailto:mohammedalsadeg33@gmail.com"
              className="p-2 text-slate-300 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer"
              aria-label="Contact official email"
              title="Email: mohammedalsadeg33@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#183C4F] bg-[#102C3A] px-4 pt-3 pb-5 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] font-medium tracking-wider uppercase text-slate-400 px-3 py-1.5">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#176B65] text-white font-semibold'
                    : 'text-slate-200 hover:bg-[#183C4F] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#183C4F] flex items-center justify-between px-3 text-xs text-slate-400">
            <span>Egypt Medical Student Hub</span>
            <a
              href="mailto:mohammedalsadeg33@gmail.com"
              className="text-[#A8E6CF] hover:underline flex items-center gap-1.5 font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
