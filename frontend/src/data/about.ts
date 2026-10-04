// Everything the About page says. Edit the copy here, the page just renders it.
import type { Service } from '../components/serviceRing/serviceRing'

const images = '/assets/images/about'
const teamPhotos = '/assets/images/team'

export const aboutHero = {
  label: 'About Us',
  title: 'Building the Future of Digital Learning',
  highlight: ['Digital'], // words shown in amber
}

export const aboutWho = {
  label: 'Who We Are',
  title: 'Technology That Solves Real Problems',
  paragraphs: [
    'At Deewan, we believe technology should be purposeful, accessible, and built around the people who use it.',
    'Every organization has different goals, audiences, and challenges. That is why we take a collaborative approach to every project—starting with understanding what our clients need and then identifying the right combination of technology, design, and digital strategy.',
    'Whether it is a new website, mobile application, stronger online presence, digital marketing campaign, or e-learning experience, our team works from concept to delivery to create solutions that are both functional and impactful.',
  ],
}

// "to" points at the matching section on the Offer page ]
export const aboutServices = {
  label: 'Our Services',
  title: 'What We Do',
  services: [
    { title: 'Web Design & Development', image: `${images}/our-service-1.webp`, to: '/offer#web' },
    { title: 'Mobile App Design', image: `${images}/our-services-2.webp`, to: '/offer#mobile' },
    { title: 'UI/UX Design', image: `${images}/our-services-4.webp`, to: '/offer#ux' },
    { title: 'Social Media Management', image: `${images}/our-services-5.webp`, to: '/offer#social' },
    { title: 'Digital Marketing', image: `${images}/our-services-6.webp`, to: '/offer#marketing' },
  ] satisfies Service[],
}

export type TeamMember = {
  name: string
  role: string
  photo?: string // leave out and a placeholder is shown
}

const members: TeamMember[] = [
  { name: 'Saba Saed', role: 'Head of Product Design & Technology', photo: `${teamPhotos}/saba.webp` },
  { name: 'Qutaibh Subeh', role: 'Full Stack Developer and Trainer', photo: `${teamPhotos}/qutaiba.webp` },
  { name: 'Rula Tbakhi', role: 'Media and Digital Marketing Specialist', photo: `${teamPhotos}/rula2.jpg` },
]

export const aboutTeam = {
  label: 'Our Team',
  title: 'Meet the Team Behind Deewan',
  description:
    'Behind every digital experience we create is a team that brings together technology, creativity, design, and strategy. Each member brings a different perspective and area of expertise, but we share one goal: creating digital experiences that are functional, engaging, and built around real needs. From the first idea and design concept to development, launch, and digital growth, our team works together to make every project meaningful and impactful.',
  members,
}
