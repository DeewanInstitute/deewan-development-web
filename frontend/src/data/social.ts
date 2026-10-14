const art = '/assets/images/social'

export type PlatformName = 'Instagram' | 'Facebook' | 'LinkedIn' | 'Google Business Profile'

export type Platform = {
  name: PlatformName
  href?: string
}

export type SocialProject = {
  id: string
  category: string
  name: string
  description: string
  image: string
  services: string[]
  platforms: Platform[]
}

export const socialHero = {
  label: 'Our Portfolio',
  title: 'Our Social Media Portfolio',
}

export const platformIcons: Record<PlatformName, string> = {
  Instagram: `${art}/instagram.webp`,
  Facebook: `${art}/facebook.webp`,
  LinkedIn: `${art}/linkedin.webp`,
  'Google Business Profile': `${art}/google.webp`,
}

const platforms = (links: Partial<Record<PlatformName, string>> = {}): Platform[] =>
  (['Instagram', 'Facebook', 'LinkedIn', 'Google Business Profile'] as const).map((name) => ({
    name,
    href: links[name],
  }))

export const socialProjects: SocialProject[] = [
  {
    id: 'institute',
    category: 'Education & Language Learning',
    name: 'Deewan Institute for Languages and Cultural Studies',
    description:
      'We manage digital content that showcases Deewan Institute’s Arabic language programs, educational resources, cultural activities, and community events, helping connect learners with the institute.',
    image: `${art}/institute-social.webp`,
    services: [
      'Social Media Posts',
      'Stories',
      'Reels',
      'Promotional Campaigns',
      'Paid Ads',
      'Event Promotion',
      'Copywriting',
    ],
    platforms: platforms(
      {
        Instagram: 'https://www.instagram.com/deewan_arabic_institute/',
        Facebook: 'https://www.facebook.com/p/Deewan-Arabic-Institute-61579964781468/?locale=fr_FR',
        LinkedIn: 'https://www.linkedin.com/company/deewaninstitute/?originalSubdomain=jo',
        'Google Business Profile': 'https://share.google/pZo2JcPcZkSO3glKC'

      }
    ),
  },
  {
    id: 'tourism',
    category: 'Tourism & Cultural Experiences',
    name: 'Deewan Tourism',
    description:
      'We create digital content that highlights Jordan’s cultural heritage, trips, hiking experiences, accommodation, and local activities, inspiring travelers to explore the country through authentic experiences.',
    image: `${art}/torism-social.webp`,
    services: [
      'Social Media Posts',
      'Stories',
      'Reels & Videos',
      'Trip Promotion',
      'Paid Ads',
      'Event Promotion',
      'Photography & Visuals',
    ],
    platforms: platforms(
      {
        Instagram: 'https://www.instagram.com/deewan_cultural__experiences/',
        Facebook: 'https://www.facebook.com/p/Deewan-Cultural-Tourism-61580701541707/',
        LinkedIn: 'https://www.linkedin.com/company/deewan-tourism-cultural-experiences/',
        'Google Business Profile': 'https://www.google.com/search?rlz=1C5CHFA_enJO1086JO1086&biw=1915&bih=865&sca_esv=074237d04407bddc&sxsrf=APpeQnvUFR61kIcaEUvjlYMaAK4hlKD_qA:1791902978667&kgmid=/g/11nhgb1285&q=Deewan+Tourism+%26+Cultural+Experiences&shem=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/uni/m1/1&kgs=50a30efd1d763fdd&utm_source=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/uni/m1/1'
      }
    ),
  },
  {
    id: 'development',
    category: 'IT & Digital Solutions',
    name: 'Deewan Development',
    description:
      'We develop social media content that communicates Deewan Development’s technology services, software solutions, and digital capabilities, making technical concepts accessible to businesses and potential clients.',
    image: `${art}/development-social.webp`,
    services: [
      'Educational Posts',
      'Stories',
      'Reels & Videos',
      'Service Promotion',
      'Paid Ads',
      'Brand Awareness',
      'Copywriting',
    ],
    platforms: platforms({
      Instagram: 'https://www.instagram.com/deewan_for_digital_learning/',
      Facebook: 'https://www.facebook.com/people/Deewan-for-Digital-Learning-Developmen/61589663083228/',
      LinkedIn: 'https://www.linkedin.com/company/deewan-for-digital-learning-development/',
      'Google Business Profile': 'https://www.google.com/search?kgmid=/g/11njsyjs30&hl=en-JO&q=Deewan+for+Digital+Learning+Development&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/osrp/m5/1&kgs=26010c3089e9cb63&utm_source=epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/osrp/m5/1'
    }),
  },
  {
    id: 'bookshop',
    category: 'Books & Retail',
    name: 'Deewan Bookshop',
    description:
      'We create social media content that showcases books, reading recommendations, new arrivals, and bookshop updates, encouraging readers to discover titles and engage with the bookshop community.',
    image: `${art}/bookshop-social.webp`,
    services: [
      'Book Promotion Posts',
      'Stories',
      'Reels',
      'Product Promotion',
      'Paid Ads',
      'Reading Recommendations',
      'Campaign Content',
    ],
    platforms: platforms({
      Instagram: 'https://www.instagram.com/deewanbookshop/',
      Facebook: 'https://www.facebook.com/p/Deewan-Bookshop-61594204447058/',
      'Google Business Profile': 'https://www.google.com/search?rlz=1C5CHFA_enJO1086JO1086&sca_esv=074237d04407bddc&cs=0&output=search&kgmid=/g/11zg9d0g1k&q=Deewan+Bookshop&shem=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/uni/m1/1&kgs=7e3ec5cb823431fd&utm_source=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/uni/m1/1',
      
    }
    ),
  },
]
