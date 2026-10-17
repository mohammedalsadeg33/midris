import React from 'react';
import { Bookmark, ExternalLink, ArrowRight, BookOpen, Video, FileText, GraduationCap, Wrench, FileCode2 } from 'lucide-react';
import { Resource, ResourceType } from '../types';

interface ResourceCardProps {
  resource: Resource;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectResource: (resource: Resource) => void;
}

const getTypeIcon = (type: ResourceType) => {
  switch (type) {
    case 'guide':
      return <BookOpen className="w-3.5 h-3.5" />;
    case 'video':
      return <Video className="w-3.5 h-3.5" />;
    case 'article':
      return <FileText className="w-3.5 h-3.5" />;
    case 'course':
      return <GraduationCap className="w-3.5 h-3.5" />;
    case 'tool':
      return <Wrench className="w-3.5 h-3.5" />;
    case 'template':
      return <FileCode2 className="w-3.5 h-3.5" />;
    default:
      return <BookOpen className="w-3.5 h-3.5" />;
  }
};

const formatAcademicLevel = (level: string) => {
  switch (level) {
    case 'preclinical':
      return 'Preclinical (Y1-Y2)';
    case 'clinical':
      return 'Clinical (Y3-Y5)';
    case 'intern':
      return 'House Officer / Intern';
    default:
      return 'All Medical Levels';
  }
};

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isBookmarked,
  onToggleBookmark,
  onSelectResource
}) => {
  return (
    <div className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200/90 hover:border-[#176B65]/40 transition-all duration-200 p-6 hover:shadow-md">
      <div>
        {/* Anti-Slop Zero-Pill Metadata Line */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#176B65]">
              {resource.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1 text-slate-600 capitalize">
              {getTypeIcon(resource.resourceType)}
              <span>{resource.resourceType}</span>
            </span>
            {resource.duration && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="tabular-nums text-slate-500">{resource.duration}</span>
              </>
            )}
          </div>

          {/* Bookmark Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(resource.id);
            }}
            className={`p-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
              isBookmarked
                ? 'text-[#176B65] bg-[#EEF9F5]'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this resource'}
            title={isBookmarked ? 'Saved to Bookmarks' : 'Save for later'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelectResource(resource)}
          className="text-base font-semibold text-[#102C3A] group-hover:text-[#176B65] transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
        >
          {resource.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {resource.summary}
        </p>
      </div>

      {/* Footer Zone: Publisher & Actions */}
      <div className="pt-4 border-t border-slate-100 mt-2">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="truncate mr-2">
            <span className="text-slate-400">Publisher:</span>{' '}
            <span className="font-medium text-slate-700">{resource.publisher}</span>
          </div>
          <span className="shrink-0 text-slate-400">
            {formatAcademicLevel(resource.level)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => onSelectResource(resource)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#102C3A] hover:text-[#176B65] transition-colors cursor-pointer"
          >
            <span>Key Takeaways</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={resource.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-white bg-slate-50 hover:bg-[#176B65] border border-slate-200 rounded-lg transition-colors"
          >
            <span>View Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
