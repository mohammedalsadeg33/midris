export type ResourceCategory =
  | 'active-recall'
  | 'spaced-repetition'
  | 'time-management'
  | 'exam-prep'
  | 'note-taking'
  | 'study-planning'
  | 'burnout-prevention'
  | 'research-intro'
  | 'methodology-ebm'
  | 'mentors-collaborators'
  | 'academic-cv'
  | 'personal-statements'
  | 'communication-presentation'
  | 'conferences-networking'
  | 'professionalism-leadership';

export type ResourceType = 'guide' | 'video' | 'article' | 'course' | 'tool' | 'template';

export type AcademicLevel = 'preclinical' | 'clinical' | 'intern' | 'all';

export interface Resource {
  id: string;
  title: string;
  summary: string;
  fullDescription: string;
  category: ResourceCategory;
  categoryLabel: string;
  pillar: 'study-smarter' | 'career-development';
  publisher: string;
  publisherType: 'university' | 'peer-reviewed' | 'medical-association' | 'student-organization' | 'educational-platform';
  author?: string;
  resourceType: ResourceType;
  duration?: string;
  level: AcademicLevel;
  sourceUrl: string;
  featured?: boolean;
  keyTakeaways: string[];
  recommendedBy?: string;
  publishedDate?: string;
}

export type OpportunityCategory =
  | 'scholarship'
  | 'research'
  | 'clinical-elective'
  | 'exchange'
  | 'conference'
  | 'volunteering'
  | 'leadership';

export type FundingType = 'fully-funded' | 'partial' | 'self-funded' | 'free-entry';

export interface Opportunity {
  id: string;
  title: string;
  institution: string;
  category: OpportunityCategory;
  categoryLabel: string;
  location: string;
  locationScope: 'Egypt' | 'Middle East' | 'International' | 'Online';
  eligibility: string;
  eligibleLevel: AcademicLevel;
  deadline?: string;
  deadlineVerified: boolean;
  funding: FundingType;
  fundingDetails?: string;
  summary: string;
  applicationUrl: string;
  isDemonstration?: boolean;
  featured?: boolean;
  verificationNote?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    institution: string;
  };
  readTime: string;
  category: string;
  publishedDate: string;
  keyTakeaways: string[];
  imagePath?: string;
}

export interface CommunityStory {
  id: string;
  authorName: string;
  authorYear: string;
  medicalSchool: string;
  title: string;
  quote: string;
  storySnippet: string;
  fullStory: string;
  tags: string[];
  lessonsLearned: string[];
}

export type CourseCategoryId = 'clinical-skills' | 'study-academic' | 'research-skills' | 'english-digital';

export type CourseStatus = 'verified' | 'provisional' | 'link-under-verification' | 'coming-soon';

export interface CourseLesson {
  id: string;
  title: string;
  duration?: string;
  summary?: string;
  index: number;
  videoId?: string;
  youtubeUrl?: string;
}

export interface Course {
  id: string;
  categoryId: CourseCategoryId;
  categoryLabel: string;
  title: string;
  provider: string;
  instructor?: string;
  description: string;
  fullDescription?: string;
  status: CourseStatus;
  statusLabel: string;
  statusNote: string;
  type: 'playlist' | 'single-video' | 'upcoming';
  youtubePlaylistUrl?: string;
  playlistId?: string;
  youtubeVideoUrl?: string;
  videoId?: string;
  lessons?: CourseLesson[];
  keyTopics: string[];
  targetAudience: string;
  language: string;
  verificationDetails: string;
}

export interface CourseCategory {
  id: CourseCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  intendedFor: string;
  imageKey: 'courseClinicalSkills' | 'courseResearchSkills' | 'courseEnglishDigital';
  imageAlt: string;
  statusBadge?: string;
  statusType?: 'verified' | 'provisional' | 'verification-required';
  courseCount: number;
}

