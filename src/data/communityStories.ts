import { CommunityStory } from '../types';

export const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'story-clerkship-transition',
    authorName: 'Ahmed Zahran',
    authorYear: 'Year 4 Clinical Student',
    medicalSchool: 'Kasr Al-Ainy, Cairo University',
    title: 'From Lecture Hall to Bedside: My First Month in General Surgery',
    quote: 'The textbook gives you the algorithm; the ward teaches you that patients do not present with highlighted chapters.',
    storySnippet: 'When I stepped onto the surgical floor for my first emergency intake, I knew the anatomy of the appendix by heart. But when a patient arrived with atypical flank pain, I froze. My registrar gently guided me through palpation and rebound tenderness.',
    fullStory: 'During my first two weeks, I felt like an imposter. The nurses worked at lightspeed, and the registrar rattled off arterial blood gas parameters faster than I could write. What turned things around was arriving 30 minutes before the morning professor rounds to take histories on two assigned patients. By taking my time and listening to their symptoms, I could present their cases cleanly during rounds. My advice to anyone entering clinical rotations: your clinical curiosity matters far more than knowing every rare eponym.',
    tags: ['Clinical Clerkship', 'Surgery', 'Ward Confidence'],
    lessonsLearned: [
      'Pre-round on 1 or 2 patients early to build confidence before the consultant arrives.',
      'Always wash hands and explain every step before touching a patient.',
      'Treat the nursing staff with immense respect—they are the greatest teachers in the ward.'
    ]
  },
  {
    id: 'story-first-pub-journey',
    authorName: 'Dina El-Gohary',
    authorYear: 'Year 5 Medical Student',
    medicalSchool: 'Faculty of Medicine, Mansoura University',
    title: 'How 14 Rejections Led to Our Team’s First Lancet Regional Health Publication',
    quote: 'Research is not a sprint of brilliant ideas; it is the discipline of fixing reviewer comments on a Friday evening.',
    storySnippet: 'Our student research team spent eight months analyzing antibiotic stewardship patterns across regional pediatric clinics in the Nile Delta. When our manuscript was rejected four times in a row, we almost abandoned the project.',
    fullStory: 'We reached out to a clinical pharmacology professor who reviewed our methodology and pointed out that our statistical regression had not accounted for seasonal respiratory infection variations. We restructured the dataset, re-ran the multivariate models in R, and submitted to a specialized regional journal. Six months later, the acceptance letter arrived. For any medical student feeling defeated by research rejections: peer review criticism is free consulting that makes your science bulletproof.',
    tags: ['Research Publication', 'Biostatistics', 'Teamwork'],
    lessonsLearned: [
      'Never take a rejection personally—it is standard academic currency.',
      'Invest time early in solid statistical training before collecting raw survey data.',
      'Keep clear version control of your drafts and spreadsheet sheets.'
    ]
  },
  {
    id: 'story-anki-preclinical-discipline',
    authorName: 'Omar Hegazi',
    authorYear: 'Intern / House Officer',
    medicalSchool: 'Ain Shams Faculty of Medicine',
    title: 'How Spaced Repetition Saved My Preclinical Sanity in Pathology',
    quote: 'Consistency beats intensity. 30 minutes of daily Anki defeated 14-hour weekend cram sessions every time.',
    storySnippet: 'In my second year, I failed my first systemic pathology midterm. I was studying 10 hours a day using highlighters and re-reading slides, yet on the exam I could not distinguish membranous from minimal change nephropathy.',
    fullStory: 'A senior student introduced me to spaced repetition and Anki. Instead of passively reading histology descriptions, I converted each condition into differential diagnostic cards and cloze deletions. I committed to reviewing cards on my daily commute on the Cairo Metro. By finals, I went from the bottom 30% of our cohort to the top decile. Spaced repetition works because it forces the brain to retrieve knowledge at the edge of forgetting.',
    tags: ['Study Strategy', 'Anki & Flashcards', 'Resilience'],
    lessonsLearned: [
      'Caps your new cards at 30-40 per day so reviews don’t snowball beyond 200.',
      'Use high-yield tags (e.g., #cardio, #renal) so you can do targeted cramming before rotations.',
      'Trust the algorithm: don’t hit "Easy" unless you knew the fact instantaneously.'
    ]
  },
  {
    id: 'story-rural-volunteering',
    authorName: 'Laila Mostafa',
    authorYear: 'Year 5 Medical Student',
    medicalSchool: 'Assiut Faculty of Medicine',
    title: 'What Rural Medical Caravans Taught Me That Textbooks Never Could',
    quote: 'In Upper Egypt villages, patient communication and health literacy determine clinical outcomes just as much as pharmacology.',
    storySnippet: 'Joining a mobile medical caravan to rural villages outside Minya changed how I see clinical practice. We saw over 400 patients in two days, many managing uncontrolled diabetes with limited access to refrigeration for insulin.',
    fullStory: 'Explaining insulin storage in clay pots (zeer) to maintain temperature when electricity was intermittent taught me real-world patient adaptation. As future Egyptian physicians, understanding social determinants of health is just as critical as memorizing Krebs cycle enzymes. Volunteering grounded my medical education in the actual needs of our community.',
    tags: ['Community Volunteering', 'Patient Communication', 'Upper Egypt'],
    lessonsLearned: [
      'Learn to communicate medical instructions in simple colloquial Egyptian Arabic.',
      'Always ask patients about their daily living realities and financial constraints.',
      'Volunteering reminds you why you entered medicine during difficult exam seasons.'
    ]
  }
];
