// Everything the "What We Offer" page says. Edit the copy here, the page just renders it.

const art = '/assets/images/about'

export type Offer = {
  id: string // also the #anchor, e.g. /offer#social
  eyebrow: string
  title: string
  intro: string[]
  capabilities: string[]
  image: string
  // optional half-globe stuck to the page edge, just above this section
  decor?: 'left' | 'right'
}

export const offerHero = {
  label: 'What We Offer',
  title: 'Our Services',
  text: 'At Deewan, we combine technology, design, creativity, and digital strategy to help organizations build stronger digital experiences.',
}

export const offers: Offer[] = [
  {
    id: 'web',
    eyebrow: 'Websites Designed to Perform',
    title: 'Web Design & Development',
    intro: [
      'At Deewan, we believe technology should be purposeful, accessible, and built around the people who use it.',
      'Every organization has different goals, audiences, and challenges. That is why we take a collaborative approach to every project—starting with understanding what our clients need and then identifying the right combination of technology, design, and digital strategy.',
      'Whether it is a new website, mobile application, stronger online presence, digital marketing campaign, or e-learning experience, our team works from concept to delivery to create solutions that are both functional and impactful.',
    ],
    capabilities: [
      'Website design',
      'Responsive web development',
      'Corporate websites',
      'Landing pages',
      'Website redesign',
      'Front-end and back-end development',
      'Website maintenance and optimization',
    ],
    image: `${art}/our-service-1.webp`,
  },
  {
    id: 'mobile',
    eyebrow: 'Turning Ideas Into Mobile Experiences',
    title: 'Mobile App Design & Development',
    intro: [
      'We design and develop mobile applications that combine intuitive interfaces with reliable functionality.',
      "From early concepts and user journeys to interface design and development, we focus on creating mobile experiences that are simple to use, visually engaging, and aligned with your organization's goals.",
    ],
    capabilities: [
      'Mobile app UI/UX',
      'Mobile application development',
      'User journey design',
      'Prototyping',
      'App testing and optimization',
      'Ongoing improvements and support',
    ],
    image: `${art}/our-services-2.webp`,
    decor: 'left',
  },
  {
    id: 'ux',
    eyebrow: 'Designed Around the User',
    title: 'UI/UX Design',
    intro: [
      'Great digital products should feel simple—even when the technology behind them is complex.',
      'Our UI/UX approach focuses on understanding how people interact with digital products and creating clear, intuitive experiences around those behaviors. We design interfaces and user journeys for websites, mobile applications, platforms, and other digital products.',
    ],
    capabilities: [
      'User experience design',
      'User interface design',
      'Wireframing',
      'Prototyping',
      'User journeys',
      'Design systems',
    ],
    image: `${art}/our-services-4.webp`,
    decor: 'right',
  },
  {
    id: 'social',
    eyebrow: 'Build a Digital Presence People Remember',
    title: 'Social Media Management',
    intro: [
      'A strong social media presence requires more than simply posting content.',
      'We help brands communicate consistently and strategically across their digital channels through content planning, creative execution, and ongoing account management.',
    ],
    capabilities: [
      'Social media strategy',
      'Content planning',
      'Content creation',
      'Copywriting',
      'Graphic design',
      'Account management',
      'Community engagement',
      'Performance monitoring',
    ],
    image: `${art}/our-services-5.webp`,
    decor: 'left',
  },
  {
    id: 'marketing',
    eyebrow: 'Reach the Right People',
    title: 'Digital Marketing',
    intro: [
      'We create digital marketing strategies designed to help organizations increase visibility, connect with their audiences, and support business growth.',
      'Our approach combines strategy, content, creativity, and performance insights to make digital marketing more purposeful and measurable.',
    ],
    capabilities: [
      'Digital marketing strategy',
      'Campaign planning',
      'Content marketing',
      'Social media marketing',
      'Paid digital campaigns',
      'Audience targeting',
      'Campaign monitoring and optimization',
      'Performance reporting',
    ],
    image: `${art}/our-services-6.webp`,
  },
]
