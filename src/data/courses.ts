import { CourseCategory, Course } from '../types';

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: 'clinical-skills',
    title: 'Medical & Clinical Skills',
    shortTitle: 'Clinical Skills',
    description: 'Develop practical clinical examination skills, patient assessment, emergency triage, and inpatient clinical nutrition fundamentals.',
    intendedFor: 'Clinical examination, inpatient clinical nutrition, patient assessment, and ward-readiness skills.',
    imageKey: 'courseClinicalSkills',
    imageAlt: 'Medical student learning clinical examination and chest auscultation under senior physician supervision in a teaching hospital ward',
    statusType: 'verified',
    courseCount: 3
  },
  {
    id: 'study-academic',
    title: 'Study & Academic Skills',
    shortTitle: 'Study & Academic',
    description: 'Master academic study strategies, high-yield medical English terminology, patient communication, and digital learning methodologies.',
    intendedFor: 'Medical terminology, scientific reading, English communication for rounds, and academic learning tools.',
    imageKey: 'courseEnglishDigital',
    imageAlt: 'Medical student studying medical terminology and professional English with clinical textbooks and laptop in university library',
    statusType: 'verified',
    courseCount: 1
  },
  {
    id: 'research-skills',
    title: 'Research & Professional Development',
    shortTitle: 'Research & Professional',
    description: 'Build an evidence-based foundation through applied biostatistics, hypothesis testing, study methodology, systematic reviews, and meta-analyses.',
    intendedFor: 'Medical biostatistics, clinical epidemiology, hypothesis testing, study design, and statistical data analysis.',
    imageKey: 'courseResearchSkills',
    imageAlt: 'Medical researcher analyzing clinical trial biostatistics datasets and research papers on a laptop computer',
    statusType: 'verified',
    courseCount: 2
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-clinical-nutrition-101',
    categoryId: 'clinical-skills',
    categoryLabel: 'Medical & Clinical Skills',
    title: 'Clinical Nutrition 101 — كورس التغذية العلاجية في المستشفى — Dr2hmedgad',
    provider: 'Dr2hmedgad',
    instructor: 'Dr. Ahmed Gad (Dr2hmedgad)',
    description: 'A comprehensive hospital-oriented clinical nutrition lecture series covering macronutrient balance, fluid and electrolyte management, inpatient nutritional assessment, and enteral nutrition protocols.',
    fullDescription: 'Clinical Nutrition 101 by Dr. Ahmed Gad (Dr2hmedgad) is a specialized clinical lecture series designed for medical students, house officers, and clinical hospital staff dealing with inpatient nutritional management and acute patient care. The course focuses on practical clinical application: calculating caloric and protein targets, monitoring electrolytes and fluids, interpreting nutritional laboratory panels, and formulating structured nutritional care plans for hospitalized patients.',
    status: 'verified',
    statusLabel: 'Verified Playlist',
    statusNote: 'Verified complete 19-lecture clinical nutrition playlist from Dr2hmedgad. Official responsive YouTube player with exact module selection enabled.',
    type: 'playlist',
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLI1Mn7ToCxNYJ_7aDaKDgj7wprou239Xk',
    playlistId: 'PLI1Mn7ToCxNYJ_7aDaKDgj7wprou239Xk',
    keyTopics: [
      'Principles of Inpatient Clinical Nutrition',
      'Macronutrient Calculation: Carbohydrates, Proteins & Lipids',
      'Fluids & Electrolytes Balance in Hospitalized Patients',
      'Micronutrients, Vitamins & Trace Elements',
      'Nutritional Screening & Clinical Assessment in Inpatients',
      'Anthropometric Measurements & Laboratory Markers',
      'Enteral Nutrition Indications & Administration Protocols',
      'Parenteral Nutrition Fundamentals & Calculations',
      'Designing Specialized Hospital Nutritional Care Plans'
    ],
    lessons: [
      {
            "id": "nutr-01",
            "index": 1,
            "title": "Clinical Nutrition 101 intro - مقدمة كورس التغذية العلاجية في المستشفي",
            "videoId": "WbIgPDP_rCM"
      },
      {
            "id": "nutr-02",
            "index": 2,
            "title": "Clinical Nutrition 1 Carbohydrates - كورس التغذية العلاجية 1 الكاربوهيدرات",
            "videoId": "Cmu9hpCEzcg"
      },
      {
            "id": "nutr-03",
            "index": 3,
            "title": "Clinical Nutrition 2 Protein - كورس التغذية العلاجية 2 بروتين",
            "videoId": "llz0jE5ggX0"
      },
      {
            "id": "nutr-04",
            "index": 4,
            "title": "Clinical Nutrition 3 fat - كورس التغذية العلاجية 3 دهون",
            "videoId": "SRVGXXR9hhM"
      },
      {
            "id": "nutr-05",
            "index": 5,
            "title": "Clinical Nutrition 4 Electrolytes - كورس التغذية العلاجية 4 املاح معدنية",
            "videoId": "Ii2MRzH3pwc"
      },
      {
            "id": "nutr-06",
            "index": 6,
            "title": "Clinical Nutrition 5 Vitamins and Minerals - كورس التغذية العلاجية 5 الفيتامينات و المعادن",
            "videoId": "QpKUFJIZ9hM"
      },
      {
            "id": "nutr-07",
            "index": 7,
            "title": "Clinical Nutrition 6 Fluids and Sodium - كورس التغذية العلاجية 6 السوائل و الصوديوم",
            "videoId": "Yoos_itdDJ0"
      },
      {
            "id": "nutr-08",
            "index": 8,
            "title": "Clinical Nutrition 7 Assessment intro - كورس التغذية العلاجية 7 مقدمة عن تقييم التغذية للمريض",
            "videoId": "ra7ZuGp4IQc"
      },
      {
            "id": "nutr-09",
            "index": 9,
            "title": "Clinical Nutrition 8 Anthropometric measures - كورس التغذية العلاجية 8 قياسات لتقيم التغذية",
            "videoId": "sw1nhy0WqCM"
      },
      {
            "id": "nutr-10",
            "index": 10,
            "title": "Clinical Nutrition 9 Labs in nutrition assessment - كورس التغذية العلاجية 9 معامل تقييم التغذية",
            "videoId": "VCXSCLHCl4s"
      },
      {
            "id": "nutr-11",
            "index": 11,
            "title": "Clinical Nutrition 10 Nutrition Clinical examination - كورس التغذية العلاجية 10 اعراض سوء التغذية",
            "videoId": "0eQ4uzOOdgw"
      },
      {
            "id": "nutr-12",
            "index": 12,
            "title": "Clinical Nutrition 11 Dietary assessment - كورس التغذية العلاجية 11 تقييم الاكل في تقييم التغذية",
            "videoId": "PTYRP_Br6VQ"
      },
      {
            "id": "nutr-13",
            "index": 13,
            "title": "Clinical Nutrition 12  monitoring system - كورس التغذية العلاجية 12 ورقيات لتقييم التغذية العلاجية",
            "videoId": "Xc-cugqlbRA"
      },
      {
            "id": "nutr-14",
            "index": 14,
            "title": "Clinical Nutrition 13  Nutrition causes - كورس التغذية العلاجية 13 مناقشة حالات التغذية لمرضي مستشفى",
            "videoId": "SZcjHmhAio0"
      },
      {
            "id": "nutr-15",
            "index": 15,
            "title": "Clinical Nutrition14 Enteral Nutrition Overview - كورس التغذية العلاجية14 مقدمة عن التغذية الانبوبية",
            "videoId": "2p7f4VsHK8o"
      },
      {
            "id": "nutr-16",
            "index": 16,
            "title": "Clinical Nutrition 15 Enteral Formulation - كورس التغذية العلاجية 15 كيفية عمل التغذية الانبوبية",
            "videoId": "IG9Y1KftusY"
      },
      {
            "id": "nutr-17",
            "index": 17,
            "title": "Clinical Nutrition 16 Enteral Nutrition Monitoring-كورس التغذية العلاجية 16 متابعة التغذية الانبوبية",
            "videoId": "REpGuKy2B3U"
      },
      {
            "id": "nutr-18",
            "index": 18,
            "title": "Clinical Nutrition 17 Enteral Nutrition Products-كورس التغذية العلاجية 17 منتجات التغذية الانبوبية",
            "videoId": "SfAOs-7AgsU"
      },
      {
            "id": "nutr-19",
            "index": 19,
            "title": "Clinical Nutrition 18 Enteral Nutrition Discussion-كورس التغذية العلاجية 18 مناقشة محاضرة التغذية",
            "videoId": "maF13RI_Q0A"
      }
],
    targetAudience: 'Medical students, clinical interns, house officers, and hospital healthcare providers.',
    language: 'Arabic (with clinical medical terminology)',
    verificationDetails: 'Verified active YouTube playlist (PLI1Mn7ToCxNYJ_7aDaKDgj7wprou239Xk) with 19 full clinical lectures from Dr2hmedgad.'
  },
  {
    id: 'course-sports-nutrition',
    categoryId: 'clinical-skills',
    categoryLabel: 'Medical & Clinical Skills',
    title: 'Sports Nutrition Course — كورس التغذية الرياضية من الصفر',
    provider: 'Dr2hmedgad',
    instructor: 'Dr. Ahmed Gad (Dr2hmedgad)',
    description: 'A practical clinical course covering athlete nutritional assessment, exercise metabolism, diet planning, supplement evaluation, and performance recovery.',
    fullDescription: 'Sports Nutrition by Dr. Ahmed Gad explores the science and clinical practice of sports dietetics and metabolic conditioning. Tailored for future clinicians, lifestyle medicine practitioners, and sports physicians, the series covers physiological energy systems, nutrient timing around training sessions, body composition evaluation, and managing athlete sleep and psychological stress.',
    status: 'verified',
    statusLabel: 'Verified Playlist',
    statusNote: 'Verified active sports nutrition lecture series from Dr2hmedgad with synchronized playlist and video selection.',
    type: 'playlist',
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLI1Mn7ToCxNYFdCNXIuRb-k8ANRb5KZOX',
    playlistId: 'PLI1Mn7ToCxNYFdCNXIuRb-k8ANRb5KZOX',
    keyTopics: [
      'Introduction to Sports Nutrition & Metabolic Energy Systems',
      'Clinical & Anthropometric Assessment of Athletes',
      'Selecting & Customizing Individualized Athletic Diet Regimens',
      'Stress, Cortisol & Sleep Optimization for Recovery',
      'Practical Meal Planning & High-Performance Fueling'
    ],
    lessons: [
      {
            "id": "sport-01",
            "index": 1,
            "title": "🎯6 التخطيط ووضع الوجبات للرياضي | كورس مجاني  د. أحمد جاد 💪 Sports Nutrition Free Course",
            "videoId": "uAXGGfYWvjs"
      },
      {
            "id": "sport-02",
            "index": 2,
            "title": "🎯5 تقييم حالة فعلية لتغذية الرياضيين | كورس مجاني  د. أحمد جاد 💪 Sports Nutrition Free Course",
            "videoId": "u73EdMHwjUQ"
      },
      {
            "id": "sport-03",
            "index": 3,
            "title": "🎯4 تقييم الضغط النفسي والنوم للرياضي | كورس مجاني  د. أحمد جاد 💪 Sports Nutrition Free Course",
            "videoId": "u4CnpVVP73E"
      },
      {
            "id": "sport-04",
            "index": 4,
            "title": "🎯3 ازاي تخترا النظام الرياضي المناسب | كورس مجاني  د. أحمد جاد 💪 Sports Nutrition Free Course",
            "videoId": "zavopblmLg4"
      },
      {
            "id": "sport-05",
            "index": 5,
            "title": "2 ازاى تعمل تقييم محترف للتغذية للرياضيين | كورس مجاني  د. أحمد جاد 💪 Sports Nutrition Free Course",
            "videoId": "Q2A_N5naB1U"
      },
      {
            "id": "sport-06",
            "index": 6,
            "title": "1 مقدمة عن مجال العمل في التغذية الرياضية | كورس مجاني  د. أحمد جاد 💪 Sports Nutrition Free Course",
            "videoId": "Cg_ftLqgGho"
      }
],
    targetAudience: 'Medical students, sports medicine trainees, clinical nutritionists, and physicians.',
    language: 'Arabic (with standard sports nutrition terminology)',
    verificationDetails: 'Verified active YouTube playlist (PLI1Mn7ToCxNYFdCNXIuRb-k8ANRb5KZOX) from official Dr2hmedgad channel.'
  },
  {
    id: 'course-clinical-examination-osce',
    categoryId: 'clinical-skills',
    categoryLabel: 'Medical & Clinical Skills',
    title: 'Clinical Examination & OSCE Practical Guides — Geeky Medics',
    provider: 'Geeky Medics',
    instructor: 'Geeky Medics Clinical Faculty',
    description: 'Essential high-yield clinical examination demonstrations, vital signs assessment, emergency ABCDE resuscitation, and procedural OSCE skill guides.',
    fullDescription: 'Geeky Medics provides world-renowned, step-by-step clinical examination videos recognized across medical faculties in the UK, Egypt, and internationally. This curriculum covers foundational clinical encounters: vital signs and NEWS2 scoring, emergency ABCDE assessment, automated external defibrillator (AED) operation, basic life support airway maneuvers, and aseptic venepuncture protocols.',
    status: 'verified',
    statusLabel: 'Verified Playlist',
    statusNote: 'Verified playlist from Geeky Medics with interactive step-by-step clinical examination and procedural guides.',
    type: 'playlist',
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLwYICl63HBzkPEzAtc2Ua6MPARTmTiWa-',
    playlistId: 'PLwYICl63HBzkPEzAtc2Ua6MPARTmTiWa-',
    keyTopics: [
      'Foundation Doctor & Intern Clinical Survival Overview',
      'Vital Signs Measurement & NEWS2 Clinical Score Charting',
      'ABCDE Emergency Patient Assessment & Sepsis Pathway',
      'Automated External Defibrillator (AED) Setup & Operation',
      'Cardiopulmonary Resuscitation (CPR) & High-Quality Compressions',
      'Basic Life Support Airway Maneuvers (Head-Tilt, Chin-Lift, Jaw-Thrust)',
      'Nasopharyngeal & Oropharyngeal Airway (Guedel) Insertion',
      'Diagnostic Venepuncture & Blood Culture Aseptic Technique  '
    ],
    lessons: [
      {
            "id": "osce-01",
            "index": 1,
            "title": "Podcast | Das Leben als Assistenzarzt (FY1/PGY1/Intern) | UKMLA | CPSA | PLAB 2",
            "videoId": "qi_1PgkF2A4"
      },
      {
            "id": "osce-02",
            "index": 2,
            "title": "Vitalzeichenmessung | OSCE-Leitfaden | Beobachtungen | NEWS2-Diagramm | UKMLA | CPSA | PLAB 2",
            "videoId": "llosVAoeojQ"
      },
      {
            "id": "osce-03",
            "index": 3,
            "title": "ABCDE-Beurteilung | Sepsis | Notfallsimulationsszenario | OSCE-Leitfaden | UKMLA | CPSA | PLAB 2",
            "videoId": "Ix7kP8-rIpA"
      },
      {
            "id": "osce-04",
            "index": 4,
            "title": "So verwenden Sie einen AED | Automatisierter externer Defibrillator – OSCE-Leitfaden | UKMLA | CP...",
            "videoId": "ckUvaQ-z4xA"
      },
      {
            "id": "osce-05",
            "index": 5,
            "title": "Anleitung zur Herzdruckmassage | Reanimationstechnik | OSCE-Leitfaden | UKMLA | CPSA | PLAB 2",
            "videoId": "3Y5sO2REU2o"
      },
      {
            "id": "osce-06",
            "index": 6,
            "title": "Airway Manoeuvres (BLS) | Head-Tilt & Chin-Lift | Jaw Thrust | ABCDE Emergency | OSCE Guide | PLAB 2",
            "videoId": "7NNe_Qje3yg"
      },
      {
            "id": "osce-07",
            "index": 7,
            "title": "Nasopharyngealer Atemweg (NPA) Einlage | ABCDE-Notfall | OSCE-Leitfaden | UKMLA | CPSA | PLAB 2",
            "videoId": "_hri0MCSFYM"
      },
      {
            "id": "osce-08",
            "index": 8,
            "title": "Einführen eines oropharyngealen Atemwegs | Guedel | OPA | ABCDE-Notfallplan | OSCE-Leitfaden | UK...",
            "videoId": "cF2PZ5NpcLA"
      },
      {
            "id": "osce-09",
            "index": 9,
            "title": "Venepuncture - How to take a blood sample - OSCE Guide | UKMLA | CPSA | PLAB 2",
            "videoId": "DzTmDlcE_3U"
      },
      {
            "id": "osce-10",
            "index": 10,
            "title": "Blood Culture Collection - OSCE Guide | UKMLA | CPSA | PLAB 2",
            "videoId": "SHx_P08m3_Y"
      },
      {
            "id": "osce-11",
            "index": 11,
            "title": "Intravenous (IV) cannulation | OSCE Guide | UKMLA | CPSA | PLAB 2",
            "videoId": "vE99rZ7JT3Q"
      },
      {
            "id": "osce-12",
            "index": 12,
            "title": "Simple interrupted suture (wound suturing) - OSCE Guide | UKMLA | CPSA | PLAB 2",
            "videoId": "z8oWv-nVO6g"
      }
],
    targetAudience: 'Medical students preparing for ward rounds, OSCE exams, UKMLA CPSA, and clinical internships.',
    language: 'English (clear international medical instruction)',
    verificationDetails: 'Verified active YouTube playlist (PLwYICl63HBzkPEzAtc2Ua6MPARTmTiWa-) from official Geeky Medics educational channel.'
  },
  {
    id: 'course-applied-medical-statistics',
    categoryId: 'research-skills',
    categoryLabel: 'Research & Professional Development',
    title: 'Applied Medical Statistics — Dr. Mohamed Elsherif',
    provider: 'Dr. Mohamed Elsherif',
    instructor: 'Dr. Mohamed Elsherif (Stats4Drs)',
    description: 'A structured, 53-part high-yield Arabic-language medical biostatistics course focused on practical understanding of statistical tests, clinical trial data, hypothesis testing, and software interpretation.',
    fullDescription: 'Applied Medical Statistics by Dr. Mohamed Elsherif is widely recommended among Egyptian and Arab medical students and junior researchers preparing for clinical research, postgraduate dissertations, and international fellowship applications. The series breaks down abstract mathematical concepts into practical, clinically relevant frameworks—covering study variable classification, parametric versus non-parametric tests, p-values, confidence intervals, regression analysis, and sample size rationale.',
    status: 'verified',
    statusLabel: 'Verified Playlist',
    statusNote: 'Verified comprehensive 53-video medical statistics playlist from Dr. Mohamed Elsherif with direct module jump support.',
    type: 'playlist',
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLnruVGowQilf3qPLK-Jhz2Suc06DBH5Cz',
    playlistId: 'PLnruVGowQilf3qPLK-Jhz2Suc06DBH5Cz',
    keyTopics: [
      'Types of Medical Variables (Categorical, Numerical, Ordinal)',
      'Descriptive Statistics, Central Tendency & Dispersion',
      'Normal Distribution & Skewness in Clinical Datasets',
      'Hypothesis Testing, P-values & Alpha Levels',
      'Student’s t-test (One-sample, Paired, Independent Samples)',
      'One-Way & Two-Way ANOVA with Post-Hoc Tests',
      'Chi-Square Test & Fisher’s Exact Test for Contingency Tables',
      'Non-parametric Tests (Mann-Whitney U, Wilcoxon, Kruskal-Wallis)',
      'Correlation (Pearson & Spearman) & Linear Regression',
      'Logistic Regression, Odds Ratios (OR) & Relative Risk (RR)',
      'Diagnostic Tests: Sensitivity, Specificity, ROC Curves & Nomograms',
      'Survival Analysis, Cox Regression & Sample Size Calculation  '
    ],
    lessons: [
      {
            "id": "stat-01",
            "index": 1,
            "title": "Applied Medical Statistics Course, 1- Introduction",
            "videoId": "8lIC-_5YFGY"
      },
      {
            "id": "stat-02",
            "index": 2,
            "title": "2- Types of data variables",
            "videoId": "kMJ_JMSWQHc"
      },
      {
            "id": "stat-03",
            "index": 3,
            "title": "3- Data Entry",
            "videoId": "EX7MdVDm70I"
      },
      {
            "id": "stat-04",
            "index": 4,
            "title": "4- Descriptive Statistics (part A)",
            "videoId": "vIotW469KXc"
      },
      {
            "id": "stat-05",
            "index": 5,
            "title": "5- Descriptive Statistics (part B)",
            "videoId": "K3kNqlj-wQI"
      },
      {
            "id": "stat-06",
            "index": 6,
            "title": "6- Descriptive Statistics (part C, application)",
            "videoId": "uS78nK1H7-k"
      },
      {
            "id": "stat-07",
            "index": 7,
            "title": "7- Tabular presentation of data",
            "videoId": "DJ-AvkXdpVk"
      },
      {
            "id": "stat-08",
            "index": 8,
            "title": "8- Graphical presentation of data (part A)",
            "videoId": "Hx81MiQyJVQ"
      },
      {
            "id": "stat-09",
            "index": 9,
            "title": "9- Graphical presentation of data (part B, application)",
            "videoId": "orSHjdmWLWY"
      },
      {
            "id": "stat-10",
            "index": 10,
            "title": "10- Hypothesis testing  (null and alternative hypotheses)",
            "videoId": "g0l866mu6N4"
      },
      {
            "id": "stat-11",
            "index": 11,
            "title": "11- Type I and type II errors",
            "videoId": "ttXgkhZW8kU"
      },
      {
            "id": "stat-12",
            "index": 12,
            "title": "12- P-value",
            "videoId": "64ByjXMD8kI"
      },
      {
            "id": "stat-13",
            "index": 13,
            "title": "13- Confidence Interval",
            "videoId": "I6l2M0TvKcs"
      },
      {
            "id": "stat-14",
            "index": 14,
            "title": "14- Incidence and Prevalence",
            "videoId": "G-x_PqXjjyQ"
      },
      {
            "id": "stat-15",
            "index": 15,
            "title": "15- Observational and interventional studies",
            "videoId": "TMgyRLGa61Y"
      },
      {
            "id": "stat-16",
            "index": 16,
            "title": "16- Cross-sectional studies",
            "videoId": "m51m8ldweSw"
      },
      {
            "id": "stat-17",
            "index": 17,
            "title": "17- Case-control Studies",
            "videoId": "DvbFjx7FaEY"
      },
      {
            "id": "stat-18",
            "index": 18,
            "title": "18- Cohort Studies",
            "videoId": "mmJkYGk9x2M"
      },
      {
            "id": "stat-19",
            "index": 19,
            "title": "19-Randomized Controlled Trials (RCTs), Part A",
            "videoId": "lvF32Cb7ZgE"
      },
      {
            "id": "stat-20",
            "index": 20,
            "title": "20- RCTs, Part B : (Blinding and Randomization)",
            "videoId": "9PjRZnlYgZE"
      },
      {
            "id": "stat-21",
            "index": 21,
            "title": "21- How to do Randomization in RTCs",
            "videoId": "15wZA66UJc4"
      },
      {
            "id": "stat-22",
            "index": 22,
            "title": "22- RCTs part C: Design and analysis",
            "videoId": "CIayok5JKpo"
      },
      {
            "id": "stat-23",
            "index": 23,
            "title": "23- Choosing the suitable statistical test",
            "videoId": "EcfmUYxBcgM"
      },
      {
            "id": "stat-24",
            "index": 24,
            "title": "24- Parametric and Non-parametric tests",
            "videoId": "v0dxNzOW_dw"
      },
      {
            "id": "stat-25",
            "index": 25,
            "title": "25- Independent t test (Student t test)",
            "videoId": "H-iwe7g_1yo"
      },
      {
            "id": "stat-26",
            "index": 26,
            "title": "26-Mann-Whitney test",
            "videoId": "W01rXNHcyU4"
      },
      {
            "id": "stat-27",
            "index": 27,
            "title": "27- Paired t test",
            "videoId": "Ukm1NbJtULk"
      },
      {
            "id": "stat-28",
            "index": 28,
            "title": "28- Wilcoxon Signed Rank test",
            "videoId": "RFTBaaH0s7Y"
      },
      {
            "id": "stat-29",
            "index": 29,
            "title": "29- One-way ANOVA",
            "videoId": "GyzJtgRhsFU"
      },
      {
            "id": "stat-30",
            "index": 30,
            "title": "30- Kruskal-Wallis test",
            "videoId": "tkLhYID0k6Y"
      },
      {
            "id": "stat-31",
            "index": 31,
            "title": "31- Repeated measures ANOVA",
            "videoId": "wfGreQXjj5g"
      },
      {
            "id": "stat-32",
            "index": 32,
            "title": "32- Friedman test",
            "videoId": "dSaHOBc31Os"
      },
      {
            "id": "stat-33",
            "index": 33,
            "title": "33- Two-way ANOVA",
            "videoId": "a5yQuBApUy4"
      },
      {
            "id": "stat-34",
            "index": 34,
            "title": "34- Relative Risk and Odds Ratio",
            "videoId": "lnWxFwbMxvY"
      },
      {
            "id": "stat-35",
            "index": 35,
            "title": "35- Chi Square test and Fisher's Exact test",
            "videoId": "Afs0DNYtFug"
      },
      {
            "id": "stat-36",
            "index": 36,
            "title": "36- McNemar test",
            "videoId": "MQNoif6eX-M"
      },
      {
            "id": "stat-37",
            "index": 37,
            "title": "37- Correlation",
            "videoId": "KjN_ZyMu6-M"
      },
      {
            "id": "stat-38",
            "index": 38,
            "title": "38- What is regression & Types of regression",
            "videoId": "oQ-pMsrnwHk"
      },
      {
            "id": "stat-39",
            "index": 39,
            "title": "39- Simple linear regression",
            "videoId": "RY-dTVSr0jw"
      },
      {
            "id": "stat-40",
            "index": 40,
            "title": "40- Multiple linear regression",
            "videoId": "fCDiWbNyU9w"
      },
      {
            "id": "stat-41",
            "index": 41,
            "title": "41- Model Building in Regression",
            "videoId": "oPlX6vDit4E"
      },
      {
            "id": "stat-42",
            "index": 42,
            "title": "42- Checking Assumptions of Linear Regression",
            "videoId": "O3b118TIzD0"
      },
      {
            "id": "stat-43",
            "index": 43,
            "title": "43- Simple Logistic Regression",
            "videoId": "Dqe7VsKAoQ8"
      },
      {
            "id": "stat-44",
            "index": 44,
            "title": "44- Multiple Logistic Regression",
            "videoId": "FdJ3qjcInqY"
      },
      {
            "id": "stat-45",
            "index": 45,
            "title": "45- Diagnostic tests (Sensitivity, Specificity, PPV, NPV)",
            "videoId": "luL2Wt92JqI"
      },
      {
            "id": "stat-46",
            "index": 46,
            "title": "46- ROC curve",
            "videoId": "DsedJ5p8CpE"
      },
      {
            "id": "stat-47",
            "index": 47,
            "title": "47- Logistic regression as a dignostic (prediction) tool and developing Nomogram",
            "videoId": "2HhzOEwmHrw"
      },
      {
            "id": "stat-48",
            "index": 48,
            "title": "Bland-Altman plot",
            "videoId": "7gogSKYhajE"
      },
      {
            "id": "stat-49",
            "index": 49,
            "title": "Kappa Agreement",
            "videoId": "EnFpnSDF_S0"
      },
      {
            "id": "stat-50",
            "index": 50,
            "title": "Survival Analysis and Cox Regression",
            "videoId": "gS2Bj29CWWo"
      },
      {
            "id": "stat-51",
            "index": 51,
            "title": "Questionnaire: Design , Validity , Reliability, Aanalysis تحليل الاستبيانات",
            "videoId": "FnNXQCbat1M"
      },
      {
            "id": "stat-52",
            "index": 52,
            "title": "Sample size calculation for clinical trials and observational studies",
            "videoId": "QQjx0HuKBaM"
      },
      {
            "id": "stat-53",
            "index": 53,
            "title": "Meta-analysis",
            "videoId": "cKWK7D0Zdq8"
      }
],
    targetAudience: 'Medical students, clinical researchers, house officers, and academic postgraduates.',
    language: 'Arabic (with standard English medical terminology)',
    verificationDetails: 'Verified active YouTube playlist (PLnruVGowQilf3qPLK-Jhz2Suc06DBH5Cz) with 53 comprehensive lectures from Dr. Mohamed Elsherif.'
  },
  {
    id: 'course-systematic-reviews',
    categoryId: 'research-skills',
    categoryLabel: 'Research & Professional Development',
    title: 'Systematic Review & Meta-Analysis — Dr. Mohamed Elsherif',
    provider: 'Dr. Mohamed Elsherif',
    instructor: 'Dr. Mohamed Elsherif',
    description: 'A complete step-by-step masterclass on conducting and publishing medical systematic reviews and meta-analyses in international indexed journals.',
    fullDescription: 'Systematic Review & Meta-Analysis by Dr. Mohamed Elsherif guides medical students and clinicians through every phase of publishing a high-impact evidence-based synthesis. The course details research question formulation using PICO, building comprehensive search strategies in PubMed and Scopus, title/abstract screening with Rayyan AI, PRISMA reporting flowcharts, risk of bias assessment (ROB-2), Cochrane RevMan forest plot generation, and academic journal submission strategies.',
    status: 'verified',
    statusLabel: 'Verified Playlist',
    statusNote: 'Verified 26-lecture systematic review and meta-analysis playlist by Dr. Mohamed Elsherif.',
    type: 'playlist',
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PL9GrBMsvivVWMywC_8aSJqU6RdwLmbVmC',
    playlistId: 'PL9GrBMsvivVWMywC_8aSJqU6RdwLmbVmC',
    keyTopics: [
      'Scientific Research Outline & Protocol Design',
      'Types of Academic Reviews (Narrative, Scoping, Systematic)',
      'Systematic Review Question Formulation using PICO',
      'PubMed, Scopus & Web of Science Database Search Strategies',
      'Rayyan AI for Title & Abstract Screening',
      'PRISMA Flowchart Guidelines & Reporting Compliance',
      'PROSPERO Protocol Registration Process',
      'Risk of Bias & Quality Assessment Tools (ROB-2, ROBINS-I)',
      'Meta-Analysis Data Extraction & RevMan Web Software',
      'Interpreting & Drawing Forest Plots',
      'Strategic Journal Selection & High-Impact Manuscript Acceptance  '
    ],
    lessons: [
      {
            "id": "sr-01",
            "index": 1,
            "title": "Scientific Research Outline",
            "videoId": "bf7jayBIgCY"
      },
      {
            "id": "sr-02",
            "index": 2,
            "title": "Types of Academic Reviews",
            "videoId": "23GRV5TIGsg"
      },
      {
            "id": "sr-03",
            "index": 3,
            "title": "Systematic Review Question | Part 1",
            "videoId": "4jgIonzM-E8"
      },
      {
            "id": "sr-04",
            "index": 4,
            "title": "Systematic Review Question | Part 2",
            "videoId": "oOR1YXa6Ol0"
      },
      {
            "id": "sr-05",
            "index": 5,
            "title": "Systematic Review Questions Examples",
            "videoId": "4wcomx5RsMI"
      },
      {
            "id": "sr-06",
            "index": 6,
            "title": "Systematic Review Search Strategy",
            "videoId": "b0njQTzMRbY"
      },
      {
            "id": "sr-07",
            "index": 7,
            "title": "Searching Databases (PubMed, Scopus and Web of Science)",
            "videoId": "1hqYYY3oU40"
      },
      {
            "id": "sr-08",
            "index": 8,
            "title": "Systematic Review Screening (filter search results)",
            "videoId": "nboPMyPogNo"
      },
      {
            "id": "sr-09",
            "index": 9,
            "title": "Systematic Review Results | PRISMA flowchart | شرح معايير البريزما",
            "videoId": "URTGlexAu9Y"
      },
      {
            "id": "sr-10",
            "index": 10,
            "title": "Systematic Review Data Extraction",
            "videoId": "WIcIxP74BBo"
      },
      {
            "id": "sr-11",
            "index": 11,
            "title": "Register your Systematic Review Protocol on PROSPERO",
            "videoId": "xYmuvoq2xIE"
      },
      {
            "id": "sr-12",
            "index": 12,
            "title": "Quality Assessment | Systematic Review & Meta-analysis",
            "videoId": "_Fv83mQrDwU"
      },
      {
            "id": "sr-13",
            "index": 13,
            "title": "Systematic Review Data Extraction 2",
            "videoId": "HNdDNVA21eY"
      },
      {
            "id": "sr-14",
            "index": 14,
            "title": "Data Analysis | Systematic Review & Meta-Analysis",
            "videoId": "Hqe_7DBmP48"
      },
      {
            "id": "sr-15",
            "index": 15,
            "title": "Easy way to find Journals for your paper!",
            "videoId": "NkIBsyGGUUU"
      },
      {
            "id": "sr-16",
            "index": 16,
            "title": "Full-Text Screening using Rayyan AI!",
            "videoId": "VdWxAIjK4NY"
      },
      {
            "id": "sr-17",
            "index": 17,
            "title": "Systematic Review and Meta-Analysis: 6 Key Questions Answered!",
            "videoId": "dFDRgYjU7Jg"
      },
      {
            "id": "sr-18",
            "index": 18,
            "title": "‫دليل احتراف تقييم خطر التحيز (Risk of Bias) في المراجعات المنهجية‬",
            "videoId": "6jTePn3INRQ"
      },
      {
            "id": "sr-19",
            "index": 19,
            "title": "شرح موقع RevMan Web الجديد لعمل الميتا اناليسيز 💪",
            "videoId": "yfn4PBD8U6M"
      },
      {
            "id": "sr-20",
            "index": 20,
            "title": "A Beginner’s Roadmap to Writing DTA Systematic Reviews ( تعليمات واضحة للمبتدئين)",
            "videoId": "aDyqWXFNdZ0"
      },
      {
            "id": "sr-21",
            "index": 21,
            "title": "ازاي بقدر احمل أي بحث بشكل مجاني بالكامل | ٤ طرق مختلفة لتحميل أي بحث علمي مجانا!",
            "videoId": "FOm8ob3ThTI"
      },
      {
            "id": "sr-22",
            "index": 22,
            "title": "أفضل أداة ذكاء اصطناعي للبحث العلمي | Google Notebook LM",
            "videoId": "AeOiMuaaJzY"
      },
      {
            "id": "sr-23",
            "index": 23,
            "title": "ازاي الريفيو بتاعك يتقبل للنشر بسهولة؟ | نصائح قبل البدء في الكتابة 👌",
            "videoId": "kwkvtFMoQ4k"
      },
      {
            "id": "sr-24",
            "index": 24,
            "title": "Forest Plot Easily Explained!! شرح مبسط باللغة العربية",
            "videoId": "Rb3XBNWDQDM"
      },
      {
            "id": "sr-25",
            "index": 25,
            "title": "Drawing Forest Plot using RevMan!",
            "videoId": "iDZ8Fsh99So"
      },
      {
            "id": "sr-26",
            "index": 26,
            "title": "Top 5 Skills Every Researcher Must Have",
            "videoId": "xJpd7wSONLA"
      }
],
    targetAudience: 'Medical undergraduates, residents, postgraduates, and aspiring academic researchers.',
    language: 'Arabic (with international academic English research terminology)',
    verificationDetails: 'Verified active YouTube playlist (PL9GrBMsvivVWMywC_8aSJqU6RdwLmbVmC) with 26 lectures by Dr. Mohamed Elsherif.'
  },
  {
    id: 'course-english-from-scratch',
    categoryId: 'study-academic',
    categoryLabel: 'Study & Academic Skills',
    title: 'Learn English from Scratch in the Medical Field — Let\'s Practice English',
    provider: 'Let\'s Practice English',
    instructor: 'Let\'s Practice English Channel (Elias Ez)',
    description: 'A foundational 8-part medical English masterclass covering essential clinical vocabulary, hospital departments, anatomical terminology, doctor-patient dialogues, and accurate pronunciation.',
    fullDescription: 'Learn English from Scratch in the Medical Field by Let\'s Practice English is an 8-part comprehensive training video created specifically for medical students and healthcare professionals. The course covers medical terms, hospital equipment, anatomical structures, patient complaints, clinical ward conversations, and practical pronunciation—essential for students studying from international medical textbooks, presenting at hospital rounds, and preparing for PLAB/USMLE examinations.',
    status: 'verified',
    statusLabel: 'Verified Masterclass · 8 Parts',
    statusNote: 'Verified 8-part medical English masterclass from Let\'s Practice English. Interactive module timestamps and responsive player enabled.',
    type: 'single-video',
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=llnqL4AZag8',
    videoId: 'llnqL4AZag8',
    keyTopics: [
      'Foundational Medical Vocabulary & Latin/Greek Roots',
      'Hospital Departments, Wards & Intensive Care Nomenclature',
      'Diagnostic Instruments & Medical Equipment',
      'Anatomical & Physiological Systems Terminology',
      'Patient Symptoms, Pain Scales & Chief Complaints',
      'Doctor-Patient Consultations & Morning Round Presentations',
      'Prescription Phrasing, Dosage Abbreviations & Drug Routes',
      'Accurate Medical Pronunciation & Phonetics in Practice  '
    ],
    lessons: [
      {
            "id": "eng-01",
            "index": 1,
            "title": "Part 1: Foundational Medical Vocabulary & Terminology Roots",
            "summary": "Prefixes, suffixes, and Latin/Greek roots in clinical medicine (cardio-, nephro-, -itis, -ectomy).",
            "videoId": "llnqL4AZag8"
      },
      {
            "id": "eng-02",
            "index": 2,
            "title": "Part 2: Hospital Departments, Clinical Wards & Facilities",
            "summary": "Emergency department, intensive care unit, surgical theatre, outpatient clinics, and triage vocabulary.",
            "videoId": "llnqL4AZag8"
      },
      {
            "id": "eng-03",
            "index": 3,
            "title": "Part 3: Common Medical Equipment, Instruments & Diagnostic Tools",
            "summary": "Stethoscope, sphygmomanometer, cannula, scalpel, ultrasound probe, and ward monitoring gear.",
            "videoId": "llnqL4AZag8"
      },
      {
            "id": "eng-04",
            "index": 4,
            "title": "Part 4: Anatomical & Physiological Systems Nomenclature",
            "summary": "Cardiovascular, respiratory, gastrointestinal, musculoskeletal, and nervous system terms.",
            "videoId": "llnqL4AZag8"
      },
      {
            "id": "eng-05",
            "index": 5,
            "title": "Part 5: Patient Symptom Descriptions & Chief Complaints",
            "summary": "Expressing pain scales, radiating pain, shortness of breath, palpitation, and intermittent symptoms.",
            "videoId": "llnqL4AZag8"
      },
      {
            "id": "eng-06",
            "index": 6,
            "title": "Part 6: Clinical Communication, Ward Rounds & Doctor-Patient Dialogues",
            "summary": "History-taking open questions, empathetic listening phrases, and presenting cases on consultant rounds.",
            "videoId": "llnqL4AZag8"
      },
      {
            "id": "eng-07",
            "index": 7,
            "title": "Part 7: Prescriptions, Pharmacological Formulations & Dosage Instructions",
            "summary": "Route abbreviations (PO, IV, IM, SC), frequency (bid, tid, qds, prn), and dispensing terminology.",
            "videoId": "llnqL4AZag8"
      },
      {
            "id": "eng-08",
            "index": 8,
            "title": "Part 8: Professional Medical Pronunciation & Phonetics in Practice",
            "summary": "Avoiding common phonetic mistakes in clinical presentations and international licensing exams.",
            "videoId": "llnqL4AZag8"
      }
],
    targetAudience: 'Preclinical and clinical medical students wishing to strengthen clinical communication and medical English.',
    language: 'English with bilingual Arabic instructional cues',
    verificationDetails: 'Verified active 8-part medical lecture (llnqL4AZag8) with full curriculum syllabus from Let\'s Practice English.'
  }
];
