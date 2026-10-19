import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, Mail, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  bookmarksCount,
  onOpenAuth
}) => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu if viewport resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
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
              className="group text-left flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF] rounded-lg py-1"
              aria-label="MedRise Home"
            >
              <div className="w-8 h-8 rounded-lg bg-[#176B65] border border-[#A8E6CF]/30 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-[#1F8880] transition-colors">
                <span className="text-[#A8E6CF] text-lg font-black tracking-tighter">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#A8E6CF] transition-colors whitespace-nowrap">
                  MedRise
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#A8E6CF] font-medium -mt-1 hidden sm:block">
                  Learn · Connect · Rise
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF] rounded ${
                    isActive
                      ? 'text-[#A8E6CF] font-semibold'
                      : 'text-slate-200 hover:text-white'
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

          {/* Zone 3: Actions (Search, Bookmarks, Contact, Mobile Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs font-medium text-slate-100 bg-[#183C4F]/80 hover:bg-[#183C4F] hover:text-white rounded-lg border border-slate-700/80 transition-colors cursor-pointer min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label="Search resources and opportunities"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-200" />
              <span className="hidden sm:inline text-xs">Search directory</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] text-slate-300 bg-[#102C3A] rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Saved Bookmarks Trigger */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2.5 text-slate-100 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
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

            {/* Contact Email Trigger (Desktop & Tablet) */}
            <a
              href="mailto:mohammedalsadeg33@gmail.com"
              className="hidden sm:flex p-2.5 text-slate-100 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label="Contact official email"
              title="Email: mohammedalsadeg33@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Authentication Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-2 border-l border-[#183C4F] pl-2.5 ml-1">
              {user ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#183C4F]/70 text-slate-200 text-xs font-medium border border-slate-700/70 max-w-[150px] truncate"
                    title={user.email || 'Authenticated User'}
                  >
                    <User className="w-3.5 h-3.5 text-[#A8E6CF] shrink-0" />
                    <span className="truncate">{user.email ? user.email.split('@')[0] : 'Account'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="p-2 text-slate-300 hover:text-red-400 hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    aria-label="Log Out"
                    title="Log Out of MedRise"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('login')}
                    className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('signup')}
                    className="px-3.5 py-2 text-xs font-bold text-[#102C3A] bg-[#A8E6CF] hover:bg-[#95d6bf] rounded-lg transition-colors cursor-pointer min-h-[44px] flex items-center shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-100 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for outside click to dismiss */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[4.5rem] bg-black/50 backdrop-blur-xs z-30 lg:hidden transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Dropdown Menu */}
      <div
        id="mobile-navigation-menu"
        role="navigation"
        aria-label="Mobile Navigation"
        className={`lg:hidden absolute top-full left-0 right-0 z-40 bg-[#102C3A] border-b border-[#183C4F] shadow-2xl transition-all duration-200 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="max-h-[calc(100vh-4.5rem)] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain px-4 pt-3 pb-5 space-y-3">
          {/* Menu Header Label */}
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-slate-200 px-3 py-1.5 border-b border-[#183C4F]/70">
            <span>Navigation Menu</span>
            <span className="text-[11px] text-[#A8E6CF] font-medium tracking-normal capitalize">MedRise Egypt</span>
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF] ${
                    isActive
                      ? 'bg-[#176B65] text-white font-semibold shadow-xs'
                      : 'text-slate-100 hover:bg-[#183C4F] hover:text-white active:bg-[#183C4F]/90'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-sm tracking-wide">{item.label}</span>
                  {isActive && (
                    <span className="flex items-center gap-1.5 text-xs text-[#A8E6CF] font-semibold">
                      <span>Active</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Authentication Section */}
          <div className="pt-2 border-t border-[#183C4F]/70">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0E2430] border border-[#183C4F] text-xs text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-[#176B65] flex items-center justify-center text-[#A8E6CF] font-bold shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Logged in</p>
                    <p className="font-semibold text-white truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-950/70 text-red-200 border border-red-800/40 text-xs font-semibold min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of MedRise</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#183C4F] hover:bg-[#1f4c63] text-white text-xs font-semibold border border-slate-700 min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                >
                  <LogIn className="w-4 h-4 text-[#A8E6CF]" />
                  <span>Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#A8E6CF] hover:bg-[#95d6bf] text-[#102C3A] text-xs font-bold min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Hub Shortcuts inside Mobile Menu */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#183C4F]/70 hover:bg-[#183C4F] text-slate-100 text-xs font-medium border border-slate-700/70 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
            >
              <Search className="w-3.5 h-3.5 text-slate-200" />
              <span>Search Hub</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookmarks();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#183C4F]/70 hover:bg-[#183C4F] text-slate-100 text-xs font-medium border border-slate-700/70 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#A8E6CF]" />
              <span>Saved Items ({bookmarksCount})</span>
            </button>
          </div>

          {/* Mobile Footer Info & Contact */}
          <div className="pt-3 border-t border-[#183C4F] flex items-center justify-between px-3 text-xs text-slate-300">
            <span className="text-slate-300 font-medium">Egypt Medical Student Hub</span>
            <a
              href="mailto:mohammedalsadeg33@gmail.com"
              className="text-[#A8E6CF] hover:text-white hover:underline flex items-center gap-1.5 font-semibold py-1.5 px-2.5 rounded-md hover:bg-[#183C4F]/60 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8E6CF]"
              aria-label="Contact official email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
