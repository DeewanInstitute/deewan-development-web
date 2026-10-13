// Everything the Home page says. Edit the copy here, the page just renders it.
import type { ServiceCard } from '../components/serviceSlider/serviceSlider'

const art = '/assets/images/home'

export const homeHero = {
  // one entry per line; the amber words are coloured by <SplitWords highlight>
  lines: [
    { text: 'Empowering Your', highlight: [] as string[] },
    { text: 'Digital Future', highlight: ['Digital', 'Future'] },
  ],
  text: 'Innovative web and mobile solutions tailored for your business. We bridge the gap between technical mastery and business precision.',
  primary: { label: 'Contact Us', to: '/contact' },
  secondary: { label: 'Check What We Offer', to: '/offer' },
}

export const homeWho = {
  label: 'Who We Are',
  title: ['Technology That Solves', 'Real Problems'], // the design breaks the title here
  paragraphs: [
    'Deewan for Digital Learning Development is a technology company specializing in digital transformation, software development, and innovative learning solutions. We partner with businesses, educational institutions, NGOs, and government organizations to design, develop, and implement technology that improves productivity, enhances user experiences, and drives measurable results.',
    'From custom software and mobile applications to learning management systems and digital training platforms, we deliver solutions that combine creativity, technology, and strategy.',
  ],
}

// Each card turns a service into a big numbered tile; "to" points at the matching section of the Offer page.
export const homeServices = {
  label: 'Services',
  title: 'Our Core Competencies',
  description:
    "We provide end-to-end digital solutions tailored to your organization's needs. From strategy and design to development, deployment, and ongoing support, we help businesses leverage technology to improve efficiency, enhance user experiences, and achieve lasting growth.",
  cards: [
    { title: ['Web', 'Design &', 'Application'], to: '/offer#web' },
    { title: ['Mobile', 'Design &', 'Application'], to: '/offer#mobile' },
    { title: ['UI/UX', 'Design'], to: '/offer#ux' },
    { title: ['Social', 'Media', 'Management'], to: '/offer#social' },
    { title: ['Digital', 'Marketing'], to: '/offer#marketing' },
  ] satisfies ServiceCard[],
}

export const homePortfolio = {
  label: 'Our Portfolio',
  title: 'Ideas We Brought to Life',
  description:
    "Explore our recent projects and see how we've helped organizations transform their digital presence. Each case study highlights our approach to solving real-world challenges through thoughtful design and robust technology.",
  project: {
    name: 'Deewan Bookshop',
    to: '/portfolio',
    laptop: `${art}/macbook.webp`,
    screen: `${art}/bookshop-screen.webp`,
  },
}
