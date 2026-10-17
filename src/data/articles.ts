import { Article } from '../types';
import { IMAGES } from '../assets/images';

export const ARTICLES: Article[] = [
  {
    id: 'art-2pass-method-egypt',
    title: 'The 2-Pass Method for Egyptian Medical Exams: Bridging Theory & MCQs',
    slug: '2-pass-method-egyptian-medical-exams',
    excerpt: 'How to transition from passive textbook scanning to active retrieval practice under the 5+2 modular medical curriculum.',
    readTime: '6 min read',
    category: 'Study Strategy',
    publishedDate: 'October 2026',
    author: {
      name: 'Dr. Youssef Fayed',
      role: 'Internal Medicine Resident & Clinical Tutor',
      institution: 'Kasr Al-Ainy, Cairo University'
    },
    keyTakeaways: [
      'Split your revision timeline: 60% retrieval-based question banks, 40% high-yield concept review.',
      'Stop re-reading full textbook chapters within four weeks of final modular exams.',
      'Create an error log categorizing mistakes as knowledge deficits vs trap answers.'
    ],
    content: [
      'One of the most persistent bottlenecks among preclinical medical students in Egypt is the belief that completing a 400-page textbook from cover to cover guarantees high MCQ scores. Under the 5+2 modular system, exam questions are increasingly vignette-based, testing clinical application rather than rote recitation of histological details.',
      'The 2-Pass framework replaces the exhaustive single-pass read with two synchronized cycles. In Pass 1 (Concept Acquisition), the student skims learning objectives, reviews summary tables, and immediately tests baseline comprehension on 20 untimed MCQs. In Pass 2 (Targeted Consolidation), high-yield flashcards and timed question sets reveal the exact conceptual boundaries where diagnostic reasoning fails.',
      'When reviewing incorrect answers, write down the single key differentiator that separated the correct diagnosis from the distractors. By the final two weeks of the rotation, your review document becomes a tailored map of your personal cognitive blind spots rather than someone else\'s generic summary.'
    ],
    imagePath: IMAGES.editorialActiveRecall
  },
  {
    id: 'art-first-systematic-review',
    title: 'How to Publish Your First Systematic Review During Preclinical Years',
    slug: 'publish-first-systematic-review-preclinical',
    excerpt: 'A pragmatic roadmap for Egyptian medical students seeking peer-reviewed research output before clinical clerkships.',
    readTime: '8 min read',
    category: 'Academic Research',
    publishedDate: 'September 2026',
    author: {
      name: 'Salma El-Sayed',
      role: 'Final Year Medical Scholar & SCORE Trainer',
      institution: 'Ain Shams Faculty of Medicine'
    },
    keyTakeaways: [
      'Focus on focused, answerable clinical questions with narrow scope rather than broad textbooks.',
      'Form a reliable team of 3–4 student researchers with strictly defined responsibilities.',
      'Find a consultant willing to act as senior corresponding author before launching data extraction.'
    ],
    content: [
      'Undergraduate medical students often assume that research requires expensive laboratory benches or years of clinical seniority. However, systematic reviews and meta-analyses offer students an accessible and academically rigorous gateway into peer-reviewed publishing.',
      'The first hurdle is formulating an unambiguous PICO question (Population, Intervention, Comparison, Outcome). Rather than asking a broad question like "Are GLP-1 agonists effective?", narrow it to "What is the cardiovascular mortality benefit of semaglutide in patients with chronic kidney disease stages 3 to 4?"',
      'Always formulate and register a formal protocol on PROSPERO before screening titles. Having an established protocol protects against publication bias and provides an unshakeable methodology when responding to peer-reviewer critiques.'
    ],
    imagePath: IMAGES.editorialClinicalResearch
  },
  {
    id: 'art-building-academic-cv-year1',
    title: 'Building an Academic CV for Residency & Fellowships from Year 1',
    slug: 'building-academic-cv-from-year-one',
    excerpt: 'The non-obvious activities that differentiate competitive candidates for national fellowships and international electives.',
    readTime: '5 min read',
    category: 'Career Development',
    publishedDate: 'August 2026',
    author: {
      name: 'Dr. Karim Mansour',
      role: 'Clinical Fellow & Research Mentor',
      institution: 'Mansoura University Hospitals'
    },
    keyTakeaways: [
      'Maintain an updated Master CV tracking every conference abstract, audit, and committee role.',
      'Prioritize depth of leadership in one student organization over superficial membership in ten.',
      'Clinical audits and quality improvement projects count as meaningful scholarly activity.'
    ],
    content: [
      'When candidates submit their CVs for competitive residency matching or foreign clinical electives, selection committees quickly look past standard grade transcripts. They search for evidence of sustained curiosity, teamwork, and resilience under academic pressure.',
      'Begin by separating your activities into four distinct pillars: Academic Honors, Scholarly Publications/Presentations, Clinical Audits, and Institutional Leadership. Every entry must feature a quantitative metric: "Coordinated emergency triage workshop for 120 preclinical students" holds substantially more weight than "Workshop organizer."',
      'Never wait until the final year or internship to draft your CV. By tracking projects in real-time as they occur, you preserve accurate dates, supervisor contact details, and project deliverable specifics.'
    ],
    imagePath: IMAGES.heroStudy
  },
  {
    id: 'art-surviving-clinical-internship',
    title: 'Surviving the 36-Hour Ward Shift: Cognitive Stamina for Egyptian Interns',
    slug: 'surviving-ward-shift-egyptian-interns',
    excerpt: 'Practical sleep hygiene, bedside prioritization, and mental endurance for the Egyptian House Officer year.',
    readTime: '7 min read',
    category: 'Student Life & Wellness',
    publishedDate: 'July 2026',
    author: {
      name: 'Dr. Mariam Bassiouny',
      role: 'Internal Medicine House Officer',
      institution: 'Alexandria Main University Hospital'
    },
    keyTakeaways: [
      'Master the "run list" technique: sort patient tasks by urgency rather than room number.',
      'Strategic 20-minute power naps between 2:00 AM and 5:00 AM preserve cognitive reaction time.',
      'Debrief difficult resuscitations with seniors to prevent emotional desensitization.'
    ],
    content: [
      'The transition from classroom lectures to the bustling casualty department of a public tertiary hospital in Egypt is the steepest learning curve in medical training. You will be responsible for blood sampling, IV cannulation, ordering urgent blood gases, and liaising between anxious families and senior registrars.',
      'Cognitive stamina relies on rigorous organization. Carry an organized paper tracking list. Mark critical labs with high-priority check boxes, and never rely on memory when carrying verbal orders across three floors.',
      'Most importantly, remember that asking for senior help during diagnostic ambiguity is a hallmark of clinical maturity, not weakness. Patient safety always trumps student ego.'
    ],
    imagePath: IMAGES.opportunityHospital
  }
];
