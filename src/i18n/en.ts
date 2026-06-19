const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    badge: 'Fullstack Developer · Ho Chi Minh City',
    viewProjects: 'View Projects',
    description:
      'Specialized in backend systems & databases. Building robust APIs, high-performance systems, and smooth user experiences with React, Angular, NestJS.',
  },
  about: {
    label: 'About Me',
    title1: 'Backend-first,',
    title2: 'Fullstack in practice',
    p1: "I'm Binh, a Fullstack Developer at ITSS Company, studying IT at Hoa Sen University (2022–present). My strengths are backend system design, database architecture, and high-performance RESTful APIs.",
    p2: "I can also handle the frontend with React, Angular, and Next.js. I've shipped real products serving thousands of users — FormCV, Partner Portal, and Ryhza.",
    timeline: [
      {
        year: '06/2025–present',
        role: 'Fullstack Developer',
        org: 'ITSS Company',
        note: 'Web & mobile app development, 20% traffic growth in 3 months',
      },
      {
        year: '2025',
        role: 'Web Developer Intern',
        org: 'Mikademy Co., Ltd.',
        note: 'Gained hands-on experience in a professional environment',
      },
      {
        year: '2022–present',
        role: 'IT — Bachelor',
        org: 'Hoa Sen University',
        note: 'GPA 2.15 · Information Technology',
      },
    ],
    stats: {
      projects: 'Real Projects',
      users: 'Users Served',
      uptime: 'API Uptime',
    },
  },
  skills: {
    label: 'Tech Stack',
    title: 'Skills',
  },
  projects: {
    label: 'Portfolio',
    title: 'Featured Projects',
    viewLive: 'View live',
    list: [
      {
        desc: 'AI-powered CV builder helping 5,000+ job seekers optimize their profiles. CV analysis algorithm achieves 85% candidate filtering accuracy.',
      },
      {
        desc: 'Partner tenant system for enterprise collaboration with FormCV, handling 10,000+ requests/day at 99.5% uptime.',
      },
      {
        desc: 'Music streaming platform with real-time audio processing, serving 1,000+ users with seamless playback.',
      },
    ],
  },
  contact: {
    label: 'Get In Touch',
    title1: 'Got a project or',
    title2: 'opportunity?',
    subtitle: "I'm always open to discussing interesting projects. Reach out via email or connect directly.",
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    messagePlaceholder: 'Your message...',
    send: 'Send Message',
    sending: 'Sending...',
    success: "✓ Sent successfully! I'll get back to you as soon as possible.",
    error: '✗ Failed to send. Please try again or email directly.',
  },
  footer: {
    rights: '© 2026 Nguyễn Phương Bình. All rights reserved.',
  },
} as const;

export default en;
