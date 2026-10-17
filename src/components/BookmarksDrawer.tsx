import React, { useState } from 'react';
import { X, Bookmark, Trash2, ExternalLink, ArrowRight, BookOpen, Compass } from 'lucide-react';
import { Resource, Opportunity } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedResources: Resource[];
  savedOpportunities: Opportunity[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onSelectResource: (resource: Resource) => void;
  onNavigate: (tab: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedResources,
  savedOpportunities,
  onRemoveBookmark,
  onClearAll,
  onSelectResource,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'opportunities'>('resources');

  if (!isOpen) return null;

  const totalCount = savedResources.length + savedOpportunities.length;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#176B65] fill-[#176B65]" />
            <div>
              <h3 className="text-base font-bold text-[#102C3A]">Saved Items</h3>
              <p className="text-xs text-slate-500">
                {totalCount} item{totalCount === 1 ? '' : 's'} stored locally in your browser
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {totalCount > 0 && (
              <button
                onClick={onClearAll}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Clear all saved bookmarks"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Close bookmarks drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="p-3 border-b border-slate-100 bg-white">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-1.5 rounded-md transition-colors ${
                activeTab === 'resources'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Resources ({savedResources.length})
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`py-1.5 rounded-md transition-colors ${
                activeTab === 'opportunities'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Opportunities ({savedOpportunities.length})
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'resources' ? (
            savedResources.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-medium text-slate-700">No saved resources yet</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the bookmark icon on any study guide or methodology resource to save it for quick review.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('study-smarter');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B65] hover:underline"
                >
                  <span>Browse Study Resources</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              savedResources.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-[#176B65]/40 bg-white transition-all text-xs space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-[#176B65]">{res.categoryLabel}</span>
                    <button
                      onClick={() => onRemoveBookmark(res.id)}
                      className="text-slate-400 hover:text-red-600 p-0.5 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4
                    onClick={() => {
                      onClose();
                      onSelectResource(res);
                    }}
                    className="font-semibold text-slate-900 hover:text-[#176B65] transition-colors cursor-pointer line-clamp-2"
                  >
                    {res.title}
                  </h4>
                  <p className="text-slate-600 line-clamp-2 text-[11px]">
                    {res.summary}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[150px]">{res.publisher}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectResource(res);
                        }}
                        className="font-semibold text-[#176B65] hover:underline"
                      >
                        Deep Dive
                      </button>
                      <a
                        href={res.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Open external source"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : savedOpportunities.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Compass className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-medium text-slate-700">No saved opportunities yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Bookmark scholarships, exchange programs, and clinical electives to track application deadlines.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('opportunities');
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B65] hover:underline"
              >
                <span>Browse Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            savedOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-[#176B65]/40 bg-white transition-all text-xs space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-[#176B65]">{opp.categoryLabel}</span>
                  <button
                    onClick={() => onRemoveBookmark(opp.id)}
                    className="text-slate-400 hover:text-red-600 p-0.5 transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-semibold text-slate-900 line-clamp-2">
                  {opp.title}
                </h4>
                <div className="text-[11px] text-slate-500">
                  {opp.institution} · {opp.location}
                </div>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">{opp.deadline || 'Ongoing'}</span>
                  <a
                    href={opp.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#176B65] hover:underline"
                  >
                    <span>Apply / Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 text-center">
          Persisted locally on this device. No account sign-in required.
        </div>
      </div>
    </div>
  );
};
