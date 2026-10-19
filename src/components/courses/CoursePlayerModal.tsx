import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Play,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  BookOpen,
  ListOrdered,
  Sparkles,
  Info,
  Clock,
  Layers,
  Send,
  Video
} from 'lucide-react';
import { Course, CourseLesson } from '../../types';

interface CoursePlayerModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenSubmit?: () => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  onClose,
  onOpenSubmit,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(() => {
    return course?.lessons && course.lessons.length > 0 ? course.lessons[0] : null;
  });
  const [embedLoadError, setEmbedLoadError] = useState(false);

  // Synchronize default selected lesson whenever a new course is opened
  useEffect(() => {
    if (course?.lessons && course.lessons.length > 0) {
      setSelectedLesson(course.lessons[0]);
    } else {
      setSelectedLesson(null);
    }
    setEmbedLoadError(false);
  }, [course?.id]);

  if (!course) return null;

  // Compute embed URL strictly according to YouTube specifications.
  // Using direct video embed with &list= parameter guarantees that YouTube loads the EXACT video requested
  // without index-mismatch or skipping errors.
  const getEmbedUrl = () => {
    // 1. If a specific lesson with a videoId is selected:
    if (selectedLesson?.videoId) {
      const playlistParam = course.playlistId ? `&list=${encodeURIComponent(course.playlistId)}` : '';
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(selectedLesson.videoId)}?autoplay=1&rel=0${playlistParam}`;
    }

    // 2. If it's a playlist:
    if (course.type === 'playlist' && course.playlistId) {
      if (course.lessons && course.lessons.length > 0 && course.lessons[0].videoId) {
        return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(course.lessons[0].videoId)}?autoplay=0&rel=0&list=${encodeURIComponent(course.playlistId)}`;
      }
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(course.playlistId)}&autoplay=0&rel=0`;
    }

    // 3. If it's a single video:
    if (course.type === 'single-video' && course.videoId) {
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(course.videoId)}?autoplay=0&rel=0`;
    }

    return null;
  };

  const embedUrl = getEmbedUrl();
  const directLink = selectedLesson?.videoId
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(selectedLesson.videoId)}${course.playlistId ? `&list=${encodeURIComponent(course.playlistId)}` : ''}`
    : selectedLesson?.youtubeUrl || course.youtubePlaylistUrl || course.youtubeVideoUrl || 'https://www.youtube.com/';

  const handleSelectLesson = (lesson: CourseLesson) => {
    setSelectedLesson(lesson);
    setEmbedLoadError(false);
    const container = document.getElementById('course-player-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#102C3A] text-white shrink-0">
          <div className="flex items-center gap-2 overflow-hidden mr-3">
            <div className="w-7 h-7 rounded-lg bg-[#176B65] flex items-center justify-center text-[#A8E6CF] shrink-0 font-bold text-xs">
              M
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#A8E6CF] font-semibold block truncate">
                  {course.categoryLabel}
                </span>
                {selectedLesson && (
                  <span className="text-[10px] bg-[#176B65] text-white px-2 py-0.5 rounded-full font-semibold shrink-0">
                    Video {selectedLesson.index} of {course.lessons?.length || 1}
                  </span>
                )}
              </div>
              <h2 id="course-modal-title" className="text-sm sm:text-base font-bold text-white truncate">
                {course.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#183C4F] transition-colors shrink-0 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Close course modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-slate-800">
          {/* Status & Verification Callout */}
          {course.status === 'verified' ? (
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold block">{course.statusLabel}</span>
                <p className="text-emerald-800 leading-relaxed">
                  {course.statusNote}
                </p>
              </div>
            </div>
          ) : course.status === 'provisional' ? (
            <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 text-xs text-teal-900 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#176B65] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold block">{course.statusLabel}</span>
                <p className="text-teal-800 leading-relaxed">
                  {course.statusNote}
                </p>
              </div>
            </div>
          ) : course.status === 'link-under-verification' ? (
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold block">{course.statusLabel}</span>
                <p className="text-slate-600 leading-relaxed">
                  {course.statusNote}
                </p>
              </div>
            </div>
          ) : null}

          {/* Player Section or Awaiting Placeholder */}
          {embedUrl && !embedLoadError ? (
            <div id="course-player-container" className="space-y-2 scroll-mt-4">
              {/* Active Playing Video Indicator */}
              {selectedLesson && (
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-[#EEF9F5] border border-[#176B65]/30 rounded-xl text-xs">
                  <div className="flex items-center gap-2 overflow-hidden mr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#176B65] shrink-0 animate-pulse" />
                    <span className="font-bold text-[#176B65] shrink-0 whitespace-nowrap">
                      Playing Video {selectedLesson.index}:
                    </span>
                    <span className="font-semibold text-slate-900 truncate" title={selectedLesson.title}>
                      {selectedLesson.title}
                    </span>
                  </div>
                  {selectedLesson.videoId && (
                    <span className="text-[11px] font-mono text-[#176B65] bg-white px-2 py-0.5 rounded border border-[#176B65]/20 shrink-0 font-medium hidden sm:inline-block">
                      ID: {selectedLesson.videoId}
                    </span>
                  )}
                </div>
              )}

              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner border border-slate-200">
                <iframe
                  key={embedUrl}
                  src={embedUrl}
                  title={selectedLesson ? `${course.title} — ${selectedLesson.title}` : course.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  onError={() => setEmbedLoadError(true)}
                />
              </div>

              {/* Player helper tip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#176B65] shrink-0" />
                  <span>
                    {course.type === 'playlist'
                      ? 'Selecting any module below loads that exact video in the player with its playlist context.'
                      : 'Single video lecture. Respects YouTube terms, playback controls, and publisher copyright.'}
                  </span>
                </div>
                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#176B65] hover:underline font-semibold shrink-0"
                >
                  <span>Open {selectedLesson ? `Video ${selectedLesson.index}` : 'Course'} on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            /* Fallback or Broken Link Alert */
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">
                Direct YouTube Playback Available
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                If the embedded frame is restricted by your browser or network settings, you can open and stream the playlist directly via YouTube.
              </p>
              <div className="pt-2">
                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B65] text-white hover:bg-[#102C3A] text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Launch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Course Overview & Metadata */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#102C3A]">
              Course Syllabus & Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {course.fullDescription || course.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium">Instructor / Channel:</span>
                <div className="font-semibold text-slate-800">{course.provider}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium">Instruction Language:</span>
                <div className="font-semibold text-slate-800">{course.language}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1 sm:col-span-2">
                <span className="text-slate-400 font-medium">Target Audience:</span>
                <div className="font-medium text-slate-700">{course.targetAudience}</div>
              </div>
            </div>
          </div>

          {/* Interactive Lesson Selector (For Playlists) */}
          {course.lessons && course.lessons.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#102C3A]">
                  <ListOrdered className="w-4 h-4 text-[#176B65]" />
                  <span>Curriculum Modules & Lessons ({course.lessons.length})</span>
                </div>
                <span className="text-[11px] text-slate-400">Select to jump in player</span>
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
                {course.lessons.map((lesson) => {
                  const isCurrent = selectedLesson?.id === lesson.id;
                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      aria-current={isCurrent ? 'true' : undefined}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#EEF9F5] border-[#176B65] text-[#102C3A] ring-2 ring-[#176B65]/40 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        isCurrent ? 'bg-[#176B65] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {lesson.index}
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className={`font-semibold leading-snug ${isCurrent ? 'text-[#102C3A]' : 'text-slate-900'}`}>
                            {lesson.title}
                          </div>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              Playing Now
                            </span>
                          )}
                        </div>
                        {lesson.summary && (
                          <p className="text-[11px] text-slate-500 line-clamp-1 leading-normal">
                            {lesson.summary}
                          </p>
                        )}
                        {lesson.videoId && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            Video ID: {lesson.videoId}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 mt-0.5">
                        {isCurrent ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#176B65] text-white">
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 group-hover:bg-slate-200">
                            <Play className="w-3 h-3 ml-0.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Topics List */}
          {course.keyTopics && course.keyTopics.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Key High-Yield Topics Covered
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {course.keyTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#176B65] shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Educational Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-100 text-[11px] text-slate-600 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-800 block">Editorial Transparency & Attribution:</span>
            <p>
              External educational courses and video materials are the copyrighted property of their respective creators and YouTube channels. MedRise embeds standard public players under fair educational indexing principles. No proprietary videos are hosted on MedRise servers.
            </p>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#102C3A] hover:text-[#176B65] bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
          >
            <span>Open on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="w-full sm:w-auto flex items-center justify-end gap-2">
            {onOpenSubmit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSubmit();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Suggest an Update</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-[#176B65] hover:bg-[#102C3A] rounded-lg transition-colors cursor-pointer"
            >
              Done Watching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
