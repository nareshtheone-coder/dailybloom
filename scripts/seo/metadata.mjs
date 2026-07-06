/**
 * DailyBloom SEO metadata — US, British, and Indian English variants.
 * Used by generate-seo.mjs and vite.config.ts (via dynamic import).
 */

export const SITE = {
  name: 'DailyBloom',
  tagline: 'Free Educational Games for Kids Aged 2–6',
  version: '1.0.0',
  defaultUrl: process.env.VITE_SITE_URL || 'https://dailybloom.app',
  contact: 'hello@dailybloom.app',
  ageRange: '2-6',
  gameCount: 31,
  categories: ['education', 'games', 'kids', 'learning', 'preschool', 'toddler'],
}

export const locales = {
  'en-US': {
    label: 'US English',
    htmlLang: 'en-US',
    hreflang: 'en-US',
    title: 'DailyBloom — Free Learning Games for Kids Ages 2–6 | Install on Phone, Tablet & PC',
    shortTitle: 'DailyBloom — Kids Learning Games',
    description:
      'DailyBloom is a free installable learning app with 31 colorful games for toddlers and preschoolers. Practice ABCs, phonics, counting, colors, shapes, sight words, and spelling. Works offline on iPhone, Android, iPad, and computers. No download from an app store required.',
    keywords: [
      'free kids games',
      'toddler learning games',
      'preschool educational games',
      'ABC games for kids',
      'phonics games',
      'counting games for toddlers',
      'sight words practice',
      'offline kids app',
      'install web app kids',
      'PWA for children',
      'homeschool preschool',
      'kindergarten prep games',
      'math games for preschoolers',
      'color matching games',
      'shape games for toddlers',
    ],
    spellings: {
      color: 'color',
      colors: 'colors',
      math: 'math',
      favorite: 'favorite',
      organize: 'organize',
      center: 'center',
    },
    audienceNote:
      'Built for American families, homeschool parents, and preschool teachers looking for ad-light, privacy-friendly screen time.',
    regions: ['United States', 'Canada'],
  },
  'en-GB': {
    label: 'British English',
    htmlLang: 'en-GB',
    hreflang: 'en-GB',
    title: 'DailyBloom — Free Learning Games for Children Aged 2–6 | Phone, Tablet & PC',
    shortTitle: 'DailyBloom — Children\'s Learning Games',
    description:
      'DailyBloom is a free installable learning app with 31 colourful games for toddlers and pre-schoolers. Practise ABCs, phonics, maths, colours, shapes, sight words, and spelling. Works offline on mobile, tablet, and computer — no app store required.',
    keywords: [
      'free children learning games',
      'toddler games UK',
      'pre-school educational games',
      'phonics games UK',
      'maths games for children',
      'colour matching games',
      'EYFS learning games',
      'reception year games',
      'offline children app',
      'install PWA UK',
      'nursery learning activities',
      'early years foundation stage',
      'sight words UK',
      'home education resources',
    ],
    spellings: {
      color: 'colour',
      colors: 'colours',
      math: 'maths',
      favorite: 'favourite',
      organize: 'organise',
      center: 'centre',
    },
    audienceNote:
      'Ideal for British parents, nurseries, childminders, and home educators seeking EYFS-friendly digital play.',
    regions: ['United Kingdom', 'Ireland'],
  },
  'en-IN': {
    label: 'Indian English',
    htmlLang: 'en-IN',
    hreflang: 'en-IN',
    title: 'DailyBloom — Free Educational Games for Kids 2–6 | Mobile, Tablet & Laptop',
    shortTitle: 'DailyBloom — Kids Educational Games India',
    description:
      'DailyBloom is a free installable educational app with 31 colourful games for toddlers and pre-school children. Learn ABCs, phonics, maths, colours, shapes, sight words, and spelling. Works offline on mobile, tablet, and laptop — perfect for Indian parents, playschools, and homeschoolers. No Play Store download needed.',
    keywords: [
      'free kids learning games India',
      'toddler educational app',
      'preschool games India',
      'ABC learning for kids',
      'phonics games India',
      'maths games for kids',
      'offline learning app',
      'install app on phone',
      'playschool activities',
      'nursery class games',
      'LKG UKG learning games',
      'homeschool India',
      'sight words for children',
      'educational PWA India',
      'low data kids app',
    ],
    spellings: {
      color: 'colour',
      colors: 'colours',
      math: 'maths',
      favorite: 'favourite',
      organize: 'organise',
      center: 'centre',
    },
    audienceNote:
      'Designed for Indian parents and teachers who want quality English-medium learning on any device, including low-bandwidth and offline use.',
    regions: ['India', 'South Asia'],
  },
}

export const faqs = [
  {
    question: 'What is DailyBloom?',
    answer:
      'DailyBloom is a free Progressive Web App (PWA) with 31 educational mini-games for children aged 2–6. It covers ABCs, phonics, counting, colours/colors, shapes, memory, puzzles, sight words, and simple sentences. Install it on a phone, tablet, or computer and play offline after the first visit.',
  },
  {
    question: 'Is DailyBloom free?',
    answer:
      'Yes. DailyBloom is free to play and install. Optional light advertising may appear on the menu screen only — never during active gameplay — to support development.',
  },
  {
    question: 'Does DailyBloom work offline?',
    answer:
      'Yes. After you open DailyBloom once online, it caches the app (~400 KB) so children can continue learning without an internet connection — useful for travel, rural areas, and saving mobile data.',
  },
  {
    question: 'What ages is DailyBloom for?',
    answer:
      'DailyBloom organises 31 games into four age bands: 2–3 years (sensory and early letters), 3–4 years (numbers and matching), 4–5 years (alphabet and words), and 5–6 years (reading and sequencing).',
  },
  {
    question: 'How do I install DailyBloom on my phone?',
    answer:
      'On Android Chrome: open the website, tap the menu, then "Install app" or "Add to Home screen". On iPhone Safari: tap Share, then "Add to Home Screen". On desktop Chrome or Edge: click the install icon in the address bar.',
  },
  {
    question: 'Is DailyBloom safe for young children?',
    answer:
      'DailyBloom is designed for young learners with large touch targets, no social features, no chat, and no account required. Parents choose the age group. Ads, if enabled, never appear during gameplay.',
  },
  {
    question: 'What subjects does DailyBloom teach?',
    answer:
      'DailyBloom covers early literacy (A–Z, phonics, rhyming, sight words, spelling), numeracy (counting 1–20, number sequences), cognitive skills (memory, patterns, puzzles), and motor skills (tapping, dragging, catching).',
  },
  {
    question: 'Can teachers use DailyBloom in class?',
    answer:
      'Yes. Teachers, playschools, nurseries, and homeschool educators can use DailyBloom on classroom tablets or laptops. The app is lightweight (~0.5 MB), works on shared hosting, and supports offline classroom use.',
  },
]

export const gameHighlights = [
  { age: '2–3', count: 7, topics: 'Tap games, colour/color matching, shapes, sounds, letter painting, bubble pop, A-for-Apple puzzles' },
  { age: '3–4', count: 7, topics: 'Numbers 1–5, counting, patterns, animal sounds, shape matcher, colour memory, emoji pairs' },
  { age: '4–5', count: 8, topics: 'ABC quest A–M, word builders, rhyming, count to 10, letter race, catch letters, word puzzles' },
  { age: '5–6', count: 9, topics: 'Full A–Z alphabet, spelling, numbers 1–20, sight words, sentences, story puzzles, pattern rush' },
]

export function buildJsonLd(siteUrl) {
  const combinedDescription = Object.values(locales)
    .map((l) => l.description)
    .join(' ')

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE.name,
      description: combinedDescription.slice(0, 500),
      inLanguage: ['en-US', 'en-GB', 'en-IN'],
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/discover.html?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: SITE.name,
      url: siteUrl,
      logo: `${siteUrl}/icon-512x512.png`,
      description: 'Free educational games PWA for children aged 2–6 worldwide.',
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Ireland' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#app`,
      name: SITE.name,
      url: siteUrl,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web, iOS, Android, Windows, macOS, Linux',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: undefined,
      screenshot: `${siteUrl}/icon-512x512.png`,
      featureList: [
        '31 educational mini-games',
        'Ages 2–6 with four age bands',
        'Offline PWA support',
        'ABC and phonics',
        'Maths and counting',
        'Sight words and spelling',
        'No account required',
        'Install on any device',
      ],
      inLanguage: ['en-US', 'en-GB', 'en-IN'],
      audience: {
        '@type': 'PeopleAudience',
        suggestedMinAge: 2,
        suggestedMaxAge: 6,
        audienceType: 'Children, Parents, Teachers',
      },
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      softwareVersion: SITE.version,
      description: combinedDescription.slice(0, 1000),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'DailyBloom Game Library by Age',
      numberOfItems: 4,
      itemListElement: gameHighlights.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Age ${g.age} — ${g.count} games`,
        description: g.topics,
      })),
    },
  ]
}

export function buildHeadTags(siteUrl) {
  const primary = locales['en-US']
  const allKeywords = [...new Set(Object.values(locales).flatMap((l) => l.keywords))].join(', ')
  const ogDescription = `${primary.description} Also available for UK (maths, colours) and India (playschool, offline mobile learning).`

  const hreflangTags = [
    { hreflang: 'x-default', href: siteUrl },
    { hreflang: 'en', href: siteUrl },
    ...Object.values(locales).map((l) => ({
      hreflang: l.hreflang,
      href: `${siteUrl}/discover.html#${l.hreflang.toLowerCase()}`,
    })),
    { hreflang: 'en-US', href: `${siteUrl}/discover.html#en-us` },
    { hreflang: 'en-GB', href: `${siteUrl}/discover.html#en-gb` },
    { hreflang: 'en-IN', href: `${siteUrl}/discover.html#en-in` },
  ]

  const uniqueHreflang = hreflangTags.filter(
    (tag, index, arr) => arr.findIndex((t) => t.hreflang === tag.hreflang) === index,
  )

  return { primary, allKeywords, ogDescription, hreflangTags: uniqueHreflang }
}
