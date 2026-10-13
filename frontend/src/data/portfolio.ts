
const logos = '/assets/images/portfolio'

export type TechName = 'Figma' | 'React' | 'Firebase' | 'JavaScript' | 'Flutter' | 'Dart'

export type CaseStudy = {
  duration: string
  service: string
  industry: string
  what: string
  challenge: string
  solution: string
  // walkthrough played inside the laptop; without one the laptop shows the logo
  video?: string
  // shown under the laptop, e.g. the live website or the Play Store page
  link?: { href: string; label: string }
  stack: TechName[]
}

export type Project = {
  id: string
  name: string
  logo: string
  tags: [string, string, string, string]
  caseStudy: CaseStudy
}

export const portfolioHero = {
  label: 'Our Portfolio',
  title: 'What We’ve Built',
}

export const caseStudyHeading = {
  label: 'Case Study',
  title: 'Project Case',
}


export const projects: Project[] = [
  {
    id: 'development',
    name: 'Deewan for Digital Learning Development',
    logo: `${logos}/development_logo.webp`,
    tags: ['Company information and capabilities', 'Contact and inquiry forms', 'Scalable content structure', 'Project portfolio'],
    caseStudy: {
      duration: '1 month',
      service: 'Web Design & Development',
      industry: 'Digital Learning',
      what: 'The home of Deewan for Digital Learning Development: a website that introduces who we are, what we offer and the work we have delivered.',
      challenge:
        'Deewan Development needed a digital presence that clearly communicates its capabilities as a technology company, while presenting its services, expertise, projects, and approach to developing digital solutions for businesses.',
      solution:
        'We developed a modern, responsive website that presents Deewan Development\'s IT services and capabilities in a clear and structured way. The website provides a central platform to showcase its work, explain its technology solutions, and communicate how technology can be adapted to different business needs.',
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
  {
    id: 'tourism',
    name: 'Deewan Tourism & Cultural Experience',
    logo: `${logos}/tourism_logo.webp`,
    tags: ['Experience Listings', 'Trip Details', 'Accommodation Listings', 'Workshop & Event Pages'],
    caseStudy: {
      duration: '1 month',
      service: 'Web Design & Development',
      industry: 'Tourism & Culture',
      what: 'Deewan Tourism & Cultural Experience presents cultural trips and experiences, and makes it easy for travelers to discover and enquire about them.',
      challenge:
        'Deewan Tourism offers diverse experiences across Jordan, including trips, accommodation, cultural activities, and workshops. The challenge was to create a platform that could present these different offerings clearly while supporting the continuous addition of new experiences and activities.',
      solution:
        'We developed a tourism-focused website that brings all experiences together in one platform. With a flexible content management system, the website allows the team to organize, manage, and showcase trips, accommodation, and cultural activities while providing visitors with an accessible way to explore available experiences.',
      video:
        'https://firebasestorage.googleapis.com/v0/b/deewanweb.firebasestorage.app/o/development%20videos%2Fdeewan-tourism-video.mp4?alt=media&token=83bc2608-02e7-40f4-af53-8a2d55a6e333',
      link: { href:'https://www.deewantourism.com', label: 'Deewan Tourism' },
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
  {
    id: 'linguarabi',
    name: 'LinguArabi',
    logo: `${logos}/linguarabi_logo.webp`,
    tags: ['FusHa & Ammiyeh Dictionary', 'Interactive quizzes', 'Audio & pronunciation', 'Vocabulary flashcards'],
    caseStudy: {
      duration: '6 months',
      service: 'Web Design & Development',
      industry: 'Education',
      what: 'LinguArabi is an Arabic learning platform that brings courses, teachers and learners together in one welcoming place.',
      challenge:
        'Learners come with different levels and goals, so the platform had to feel friendly for beginners and still be organized enough to grow.',
      solution:
        'We designed a warm, easy-to-explore experience with clear course journeys and a structure that can grow as new programs are added.',
      // TODO: Play Store page, e.g. link: { href: 'https://play.google.com/...', label: 'Get it on Google Play' }
      stack: ['Figma', 'Flutter', 'Dart', 'Firebase'],
    },
  },
  {
    id: 'bookshop',
    name: 'Deewan Bookshop',
    logo: `${logos}/bookshop_logo.webp`,
    tags: ['Books & Retail', 'Custom CMS', 'Responsive website for desktop and mobile', 'E-commerce'],
    caseStudy: {
      duration: '1.5 months',
      service: 'Web Design & Development',
      industry: 'Books / Retail',
      what: 'Deewan Bookshop is a platform for discovering, buying, and renting books. We developed a dedicated website to bring the bookshop’s collection online and make its content and services easier to manage and access.',
      challenge:
        'The project required more than a standard website. The bookshop needed a flexible system to manage a growing collection of books, organize content, and keep the website updated without relying on technical support for every change.',
      solution:
        'We developed a custom website supported by a dedicated CMS, giving the team control over books, categories, content, and other website information through a centralized management system.',
      video:
        'https://firebasestorage.googleapis.com/v0/b/deewanweb.firebasestorage.app/o/development%20videos%2Fdeewan-bookshop-video.mp4?alt=media&token=19a93f6d-2507-4a27-8d41-e98399c689c1',
      link: { href:'https://www.deewanbookshop.com', label: 'Deewan Bookshop' },  
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
  {
    id: 'institute',
    name: 'Deewan Institute for Languages & Cultural Studies',
    logo: `${logos}/institute_logo.webp`,
    tags: ['Course & Program Pages', 'Educational Resources', 'Responsive Development', 'Multilingual Content'],
    caseStudy: {
      duration: '4 months',
      service: 'Web Design & Development',
      industry: 'Education',
      what: 'Deewan Institute for Languages & Cultural Studies is the online face of the institute, presenting its programs, teachers and events.',
      challenge:
        'Programs change every term, and the institute needed visitors to find the right course quickly without the team rebuilding pages by hand.',
      solution:
        'We created a structured website with a reusable course layout, so new programs and events can be published in minutes.',
      video:
        'https://firebasestorage.googleapis.com/v0/b/deewanweb.firebasestorage.app/o/development%20videos%2Fdeewan-institute-video.mp4?alt=media&token=f0d066ac-2711-419b-9f1b-2a1bab266ee9',
      link: { href: 'https://www.deewaninstitute.com', label: 'Deewan Institute' },
      stack: ['Figma', 'React', 'Firebase', 'JavaScript'],
    },
  },
]

// Which project sits in the middle when the page opens
export const initialProject = 'linguarabi'
