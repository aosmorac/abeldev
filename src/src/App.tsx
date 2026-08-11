import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'

type Locale = 'en' | 'es'
type SectionId = 'about' | 'experience' | 'last-project'

type Experience = {
  company: string
  companyUrl?: string
  date: string
  description: string
  role: string
  technologies: string[]
}

type Copy = {
  about: ReactNode[]
  footer: ReactNode
  intro: string
  nav: Record<SectionId, string>
  profileLink: string
  project: {
    description: string
    imageLabel: string
    technologies: string[]
  }
  role: string
  sections: Record<SectionId, string>
  skip: string
  social: string
  technologiesLabel: string
}

const links = {
  bigmelo: 'https://bigmelo.com/',
  cv: '/abel_moreno.pdf',
  github: 'https://github.com/aosmorac',
  linkedin: 'https://www.linkedin.com/in/abelmoreno/',
}

const experiences: Record<Locale, Experience[]> = {
  en: [
    {
      date: '2026 — Present',
      role: 'AI Product Engineer',
      company: 'Bigmelo',
      companyUrl: links.bigmelo,
      description:
        'Created and lead an AI-native SaaS product end to end: product strategy, architecture, backend APIs, public and administrative experiences, generative AI, voice, avatars, social integrations, payments, analytics, and cloud operations.',
      technologies: ['PHP', 'Laravel', 'React', 'TypeScript', 'Astro', 'PostgreSQL', 'pgVector', 'Redis', 'Docker', 'AWS', 'OpenAI'],
    },
    {
      date: '2023 — 2025',
      role: 'Senior PHP Developer',
      company: 'Nu Image Medical',
      companyUrl: 'https://nuimagemedical.com/',
      description:
        'Built high-impact backend systems with Laravel and contributed to Vue.js interfaces. Delivered payment and clinical-laboratory integrations, introduced OpenAI-powered capabilities, and developed advanced reporting and data-transformation processes.',
      technologies: ['Laravel', 'Vue.js', 'OpenAI', 'Payments', 'Data Pipelines'],
    },
    {
      date: '2021 — 2023',
      role: 'Senior PHP Developer',
      company: 'BL3NDlabs',
      companyUrl: 'https://www.bl3ndlabs.com/',
      description:
        'Engineered Laravel APIs for web and mobile products, integrated payments, Twilio, and veterinary platforms, and used test-driven development to ship reliable services on scalable Azure infrastructure.',
      technologies: ['Laravel', 'MySQL', 'Azure', 'TDD', 'REST APIs'],
    },
    {
      date: 'Mar — Nov 2021',
      role: 'Senior Full Stack Developer',
      company: 'Teravision Technologies',
      companyUrl: 'https://www.teravisiontech.com/',
      description:
        'Joined the BL3NDlabs delivery team and developed Laravel APIs that powered both web and mobile applications, connecting product requirements with stable, production-ready backend services.',
      technologies: ['Laravel', 'PHP', 'REST APIs', 'Web', 'Mobile'],
    },
    {
      date: '2019 — 2021',
      role: 'Senior Software Developer',
      company: 'SproutLoud Media Networks',
      companyUrl: 'https://sproutloud.com/',
      description:
        'Maintained mature Zend Framework systems, created new Laravel services and Vue.js interfaces, and helped move the platform toward event-driven microservices using Kafka, MongoDB, and PostgreSQL.',
      technologies: ['PHP', 'Zend Framework', 'Laravel', 'Vue.js', 'Kafka', 'MongoDB', 'PostgreSQL'],
    },
    {
      date: '2017 — 2018',
      role: 'Business Intelligence Engineer',
      company: 'Universidad Distrital',
      companyUrl: 'https://www.udistrital.edu.co/',
      description:
        'Launched a business-intelligence environment by integrating and analyzing institutional data, designing the data warehouse, and establishing the supporting ETL and reporting workflows.',
      technologies: ['Business Intelligence', 'ETL', 'Data Warehousing', 'Analytics'],
    },
    {
      date: '2014 — 2018',
      role: 'Development Coordinator · IT Professional',
      company: 'World Food Programme',
      companyUrl: 'https://www.wfp.org/',
      description:
        'Defined software architecture and delivery practices, coordinated development, and worked directly with operations to design, build, integrate, and deploy cloud solutions for complex organizational processes.',
      technologies: ['Software Architecture', 'PHP', 'Zend Framework', 'MySQL', 'BI', 'Cloud'],
    },
    {
      date: 'Apr — Dec 2017',
      role: 'Web Developer Contractor',
      company: 'Parques Nacionales Naturales',
      companyUrl: 'https://www.parquesnacionales.gov.co/',
      description:
        'Built and maintained interoperable web services and thematic portals, integrating multiple information sources through REST APIs under Colombia’s public-sector technology standards.',
      technologies: ['Web Development', 'REST APIs', 'Integration', 'PHP'],
    },
    {
      date: '2013 — 2014',
      role: 'CTO',
      company: 'SquadrApp',
      companyUrl: links.linkedin,
      description:
        'Led technology for a sports-booking startup supported by Apps.co and accelerated by HubBog, shaping the product and the web and mobile platform used to reserve venues and connect players.',
      technologies: ['Product', 'Startup', 'Web', 'Mobile', 'Leadership'],
    },
    {
      date: '2012 — 2013',
      role: 'Technology Engineer',
      company: 'Blulogistics',
      companyUrl: links.linkedin,
      description:
        'Planned and managed technology projects, gathered requirements, and delivered data-mining, reporting, ETL, OLAP, PHP, and .NET solutions for logistics operations.',
      technologies: ['PHP', '.NET', 'Business Intelligence', 'ETL', 'Data Mining'],
    },
  ],
  es: [
    {
      date: '2026 — Actualidad',
      role: 'AI Product Engineer',
      company: 'Bigmelo',
      companyUrl: links.bigmelo,
      description:
        'Creo y lidero un producto SaaS nativo de IA de extremo a extremo: estrategia de producto, arquitectura, APIs, experiencias pública y administrativa, IA generativa, voz, avatares, integraciones sociales, pagos, analítica y operación cloud.',
      technologies: ['PHP', 'Laravel', 'React', 'TypeScript', 'Astro', 'PostgreSQL', 'pgVector', 'Redis', 'Docker', 'AWS', 'OpenAI'],
    },
    {
      date: '2023 — 2025',
      role: 'Senior PHP Developer',
      company: 'Nu Image Medical',
      companyUrl: 'https://nuimagemedical.com/',
      description:
        'Construí sistemas backend de alto impacto con Laravel y aporté a interfaces en Vue.js. Implementé integraciones de pagos y laboratorios clínicos, capacidades con OpenAI, reportes avanzados y procesos de transformación de datos.',
      technologies: ['Laravel', 'Vue.js', 'OpenAI', 'Pagos', 'Pipelines de datos'],
    },
    {
      date: '2021 — 2023',
      role: 'Senior PHP Developer',
      company: 'BL3NDlabs',
      companyUrl: 'https://www.bl3ndlabs.com/',
      description:
        'Desarrollé APIs con Laravel para productos web y móviles, integré pagos, Twilio y plataformas veterinarias, y apliqué desarrollo guiado por pruebas para entregar servicios confiables sobre infraestructura escalable en Azure.',
      technologies: ['Laravel', 'MySQL', 'Azure', 'TDD', 'REST APIs'],
    },
    {
      date: 'Mar — Nov 2021',
      role: 'Senior Full Stack Developer',
      company: 'Teravision Technologies',
      companyUrl: 'https://www.teravisiontech.com/',
      description:
        'Formé parte del equipo asignado a BL3NDlabs y desarrollé APIs en Laravel para aplicaciones web y móviles, conectando los requerimientos de producto con servicios backend estables y listos para producción.',
      technologies: ['Laravel', 'PHP', 'REST APIs', 'Web', 'Mobile'],
    },
    {
      date: '2019 — 2021',
      role: 'Senior Software Developer',
      company: 'SproutLoud Media Networks',
      companyUrl: 'https://sproutloud.com/',
      description:
        'Mantuve sistemas maduros en Zend Framework, construí nuevos servicios en Laravel e interfaces en Vue.js, y participé en la evolución hacia microservicios orientados a eventos con Kafka, MongoDB y PostgreSQL.',
      technologies: ['PHP', 'Zend Framework', 'Laravel', 'Vue.js', 'Kafka', 'MongoDB', 'PostgreSQL'],
    },
    {
      date: '2017 — 2018',
      role: 'Ingeniero BI',
      company: 'Universidad Distrital',
      companyUrl: 'https://www.udistrital.edu.co/',
      description:
        'Puse en marcha un entorno de inteligencia de negocio mediante la integración y el análisis de información institucional, el diseño de la bodega de datos y la construcción de procesos ETL y reportería.',
      technologies: ['Business Intelligence', 'ETL', 'Data Warehousing', 'Analítica'],
    },
    {
      date: '2014 — 2018',
      role: 'Coordinador de Desarrollo · Profesional IT',
      company: 'World Food Programme',
      companyUrl: 'https://www.wfp.org/',
      description:
        'Definí arquitectura y prácticas de entrega, coordiné desarrollo y trabajé directamente con la operación para diseñar, construir, integrar y desplegar soluciones cloud para procesos organizacionales complejos.',
      technologies: ['Arquitectura de software', 'PHP', 'Zend Framework', 'MySQL', 'BI', 'Cloud'],
    },
    {
      date: 'Abr — Dic 2017',
      role: 'Contratista Desarrollador Web',
      company: 'Parques Nacionales Naturales',
      companyUrl: 'https://www.parquesnacionales.gov.co/',
      description:
        'Construí y mantuve servicios web y portales temáticos interoperables, integrando múltiples fuentes de información mediante APIs REST bajo lineamientos tecnológicos del sector público colombiano.',
      technologies: ['Desarrollo web', 'REST APIs', 'Integración', 'PHP'],
    },
    {
      date: '2013 — 2014',
      role: 'CTO',
      company: 'SquadrApp',
      companyUrl: links.linkedin,
      description:
        'Lideré la tecnología de una startup de reservas deportivas apoyada por Apps.co y acelerada por HubBog, definiendo el producto y la plataforma web y móvil para reservar espacios y conectar jugadores.',
      technologies: ['Producto', 'Startup', 'Web', 'Mobile', 'Liderazgo'],
    },
    {
      date: '2012 — 2013',
      role: 'Ingeniero de Tecnologia',
      company: 'Blulogistics',
      companyUrl: links.linkedin,
      description:
        'Planifiqué y gestioné proyectos de tecnología, levanté requerimientos y entregué soluciones de minería de datos, reportería, ETL, cubos OLAP, PHP y .NET para operaciones logísticas.',
      technologies: ['PHP', '.NET', 'Business Intelligence', 'ETL', 'Minería de datos'],
    },
  ],
}

const copy: Record<Locale, Copy> = {
  en: {
    skip: 'Skip to content',
    role: 'AI Product Engineer',
    intro: 'I build intelligent, useful, and scalable products where full-stack engineering, generative AI, and product strategy meet.',
    social: 'Social media',
    nav: { about: 'ABOUT', experience: 'EXPERIENCE', 'last-project': 'LAST PROJECT' },
    sections: { about: 'About', experience: 'Experience', 'last-project': 'Last Project' },
    technologiesLabel: 'Technologies used',
    profileLink: 'View full professional profile',
    about: [
      <>I am an <strong>AI Product Engineer</strong> with more than a decade of experience turning complex problems into useful, reliable, and scalable digital products.</>,
      <>Currently, I create and lead <ExternalLink href={links.bigmelo}>Bigmelo</ExternalLink>, an AI SaaS platform that transforms the knowledge, experience, and authorized voice of professionals and creators into intelligent, interactive digital presences.</>,
      <>I work across product and engineering: backend systems and APIs, web experiences, generative AI, voice, avatars, social integrations, payments, analytics, and cloud infrastructure. My toolkit includes PHP, Laravel, React, TypeScript, Astro, PostgreSQL, Redis, Docker, and AWS, together with OpenAI, ElevenLabs, and Runway.</>,
      <>Before Bigmelo, I built robust backend platforms, dynamic interfaces, integrations, data products, and cloud systems for health, product studios, media technology, education, humanitarian operations, and early-stage startups.</>,
    ],
    project: {
      description:
        'An AI-native SaaS platform for creating authorized, interactive digital presences. Each public profile can answer questions from verified sources, converse through text and cloned voice, present an approved avatar, connect official social channels, showcase products, and remain available around the clock. I designed the product and built its full stack, AI orchestration, payments, analytics, and AWS-based delivery architecture.',
      imageLabel: 'Bigmelo interactive digital presence preview',
      technologies: ['Laravel', 'React', 'TypeScript', 'Astro', 'PostgreSQL', 'pgVector', 'Redis', 'OpenAI', 'ElevenLabs', 'Runway', 'AWS'],
    },
    footer: <>Designed with intention and coded in Visual Studio Code. Built with React, TypeScript, and Vite, containerized with Docker. All text is set in the Inter typeface.</>,
  },
  es: {
    skip: 'Ir al contenido',
    role: 'AI Product Engineer',
    intro: 'Construyo productos inteligentes, útiles y escalables en la intersección de la ingeniería full stack, la IA generativa y la estrategia de producto.',
    social: 'Redes sociales',
    nav: { about: 'SOBRE MÍ', experience: 'EXPERIENCIA', 'last-project': 'ÚLTIMO PROYECTO' },
    sections: { about: 'Sobre mí', experience: 'Experiencia', 'last-project': 'Último proyecto' },
    technologiesLabel: 'Tecnologías utilizadas',
    profileLink: 'Ver perfil profesional completo',
    about: [
      <>Soy <strong>AI Product Engineer</strong> y combino más de una década de experiencia para convertir problemas complejos en productos digitales útiles, confiables y escalables.</>,
      <>Actualmente creo y lidero <ExternalLink href={links.bigmelo}>Bigmelo</ExternalLink>, una plataforma SaaS de IA que transforma el conocimiento, la experiencia y la voz autorizada de profesionales y creadores en presencias digitales inteligentes e interactivas.</>,
      <>Trabajo entre producto e ingeniería: sistemas backend y APIs, experiencias web, IA generativa, voz, avatares, integraciones sociales, pagos, analítica e infraestructura cloud. Mi stack incluye PHP, Laravel, React, TypeScript, Astro, PostgreSQL, Redis, Docker y AWS, junto con OpenAI, ElevenLabs y Runway.</>,
      <>Antes de Bigmelo construí plataformas backend robustas, interfaces dinámicas, integraciones, productos de datos y sistemas cloud para salud, estudios de producto, tecnología de medios, educación, operaciones humanitarias y startups.</>,
    ],
    project: {
      description:
        'Plataforma SaaS nativa de IA para crear presencias digitales autorizadas e interactivas. Cada perfil público puede responder preguntas desde fuentes verificadas, conversar por texto y voz clonada, presentar un avatar aprobado, conectar canales sociales oficiales, mostrar productos y permanecer disponible todo el día. Diseñé el producto y construí su stack completo, la orquestación de IA, los pagos, la analítica y la arquitectura de entrega sobre AWS.',
      imageLabel: 'Vista previa de una presencia digital interactiva de Bigmelo',
      technologies: ['Laravel', 'React', 'TypeScript', 'Astro', 'PostgreSQL', 'pgVector', 'Redis', 'OpenAI', 'ElevenLabs', 'Runway', 'AWS'],
    },
    footer: <>Diseñado con intención y programado en Visual Studio Code. Construido con React, TypeScript y Vite, y contenerizado con Docker. Todos los textos usan la tipografía Inter.</>,
  },
}

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const savedLocale = window.localStorage.getItem('abeldev-locale')
    return savedLocale === 'en' || savedLocale === 'es' ? savedLocale : 'es'
  })
  const [activeSection, setActiveSection] = useState<SectionId>('about')
  const spotlightRef = useRef<HTMLDivElement>(null)
  const content = copy[locale]
  const work = useMemo(() => experiences[locale], [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = locale === 'es' ? 'Abel Moreno | AI Product Engineer' : 'Abel Moreno | AI Product Engineer'
    window.localStorage.setItem('abeldev-locale', locale)
  }, [locale])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id as SectionId)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.1, 0.25] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const updatePointer = (event: MouseEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) return
    const y = event.clientY + window.scrollY
    spotlightRef.current.style.background = `radial-gradient(600px at ${event.clientX}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
  }

  return (
    <div className="portfolio" onMouseMove={updatePointer}>
      <div
        ref={spotlightRef}
        className="spotlight"
        aria-hidden="true"
        style={{ background: 'radial-gradient(600px at 0 0, rgba(29, 78, 216, 0.15), transparent 80%)' }}
      />
      <a className="skip-link" href="#content">{content.skip}</a>

      <div className="page-shell">
        <div className="page-grid">
          <header className="intro-panel">
            <div>
              <div className="language-switcher" aria-label="Language selector">
                <button type="button" onClick={() => setLocale('en')} aria-pressed={locale === 'en'}>EN</button>
                <span aria-hidden="true">|</span>
                <button type="button" onClick={() => setLocale('es')} aria-pressed={locale === 'es'}>ES</button>
              </div>

              <h1><a href="/">Abel Moreno</a></h1>
              <h2>{content.role}</h2>
              <p className="intro-copy">{content.intro}</p>

              <nav className="section-nav" aria-label="In-page navigation">
                <ul>
                  {(Object.keys(content.nav) as SectionId[]).map((id) => (
                    <li key={id}>
                      <a className={activeSection === id ? 'nav-link active' : 'nav-link'} href={`#${id}`}>
                        <span className="nav-line" aria-hidden="true" />
                        <span>{content.nav[id]}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <ul className="social-links" aria-label={content.social}>
              <li><SocialLink href={links.github} label="GitHub"><GithubIcon /></SocialLink></li>
              <li><SocialLink href={links.linkedin} label="LinkedIn"><LinkedinIcon /></SocialLink></li>
              <li><SocialLink href={links.cv} label="CV"><CvIcon /></SocialLink></li>
            </ul>
          </header>

          <main id="content">
            <section id="about" aria-labelledby="about-heading">
              <SectionHeading id="about-heading">{content.sections.about}</SectionHeading>
              <div className="about-copy">
                {content.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </section>

            <section id="experience" aria-labelledby="experience-heading">
              <SectionHeading id="experience-heading">{content.sections.experience}</SectionHeading>
              <ol className="card-list experience-list">
                {work.map((item) => (
                  <li className="card-item" key={`${item.company}-${item.role}`}>
                    <a
                      className="interactive-card experience-card"
                      href={item.companyUrl ?? links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${item.role} · ${item.company}`}
                    >
                      <span className="card-surface" aria-hidden="true" />
                      <header className="experience-date">{item.date}</header>
                      <div className="card-content">
                        <h3>
                          <span className="title-link">
                            <span>{item.role} <span className="company">· {item.company}</span></span>
                            <ArrowIcon />
                          </span>
                        </h3>
                        <p className="card-description">{item.description}</p>
                        <Tags label={content.technologiesLabel} items={item.technologies} />
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
              <ExternalLink className="profile-link" href={links.linkedin}>{content.profileLink}</ExternalLink>
            </section>

            <section id="last-project" aria-labelledby="project-heading">
              <SectionHeading id="project-heading">{content.sections['last-project']}</SectionHeading>
              <ol className="card-list project-list">
                <li className="card-item">
                  <a
                    className="interactive-card project-card"
                    href={links.bigmelo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Bigmelo"
                  >
                    <span className="card-surface" aria-hidden="true" />
                    <div className="card-content project-content">
                      <h3>
                        <span className="title-link">
                          <span>Bigmelo</span>
                          <ArrowIcon />
                        </span>
                      </h3>
                      <p className="card-description">{content.project.description}</p>
                      <Tags label={content.technologiesLabel} items={content.project.technologies} />
                    </div>
                    <ProjectPreview label={content.project.imageLabel} />
                  </a>
                </li>
              </ol>
            </section>

            <footer>{content.footer}</footer>
          </main>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ children, id }: { children: ReactNode; id: string }) {
  return (
    <div className="section-heading-wrap">
      <h2 id={id}>{children}</h2>
    </div>
  )
}

function ExternalLink({ children, className = '', href }: { children: ReactNode; className?: string; href: string }) {
  return (
    <a className={`external-link ${className}`.trim()} href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ArrowIcon />
    </a>
  )
}

function SocialLink({ children, href, label }: { children: ReactNode; href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={`${label} (opens in a new tab)`}>
      {children}
      <span className="sr-only">{label}</span>
    </a>
  )
}

function Tags({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function ProjectPreview({ label }: { label: string }) {
  return (
    <svg className="project-preview" viewBox="0 0 240 135" role="img" aria-label={label}>
      <defs>
        <linearGradient id="preview-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="avatar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.45" opacity="0.7" />
        </pattern>
      </defs>
      <rect width="240" height="135" rx="8" fill="url(#preview-bg)" />
      <rect width="240" height="135" rx="8" fill="url(#grid)" />
      <text x="14" y="23" fill="#0f172a" fontSize="16" fontWeight="800" letterSpacing="-0.8">bigmelo</text>
      <rect x="181" y="11" width="43" height="18" rx="9" fill="#0f172a" />
      <text x="193" y="23.5" fill="#f8fafc" fontSize="8" fontWeight="700">AI</text>
      <rect x="13" y="39" width="214" height="82" rx="7" fill="#ffffff" stroke="#cbd5e1" />
      <circle cx="44" cy="72" r="17" fill="url(#avatar)" />
      <circle cx="44" cy="69" r="5.5" fill="#cbd5e1" />
      <path d="M32 82c3-7 20-7 24 0" fill="#cbd5e1" />
      <rect x="70" y="54" width="103" height="8" rx="4" fill="#0f172a" opacity="0.9" />
      <rect x="70" y="68" width="138" height="5" rx="2.5" fill="#94a3b8" />
      <rect x="70" y="78" width="117" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="70" y="94" width="95" height="17" rx="8.5" fill="#0f172a" />
      <path d="M80 102h2m3-3v7m4-10v13m4-8v5m4-9v11m4-6v4m4-7v8m4-5v3m4-8v9m4-6v4m4-5v5m4-8v9" stroke="#5eead4" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="204" cy="102.5" r="8.5" fill="#e2e8f0" />
      <path d="M201 99l6 3.5-6 3.5z" fill="#0f172a" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5m0 0H7m8 0v8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.58-.3-5.29-1.29-5.29-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.72 5.39-5.31 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  )
}

function CvIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 1.75h9.25L19.5 7.5v14.75h-15z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M13.75 1.75V7.5h5.75"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M10.7 12.05a2.9 2.9 0 1 0 0 4.4M12.3 11.65l2.05 5.9 2.05-5.9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
    </svg>
  )
}

export default App
