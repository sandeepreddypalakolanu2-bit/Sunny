import { AnimatePresence, LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Project', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#articles' },
];

const heroTags = ['Designer', 'Digital', 'Creative', 'Innovative'];
const tickerItems = ['Innovative', 'Creative', 'Digital', 'Designer'];

const stats = [
  { value: 1700, label: 'Projects Completed', useGrouping: false },
  { value: 145, label: 'Happy Clients', suffix: '+', useGrouping: false },
  { value: 10459, label: 'Cups of Coffee', useGrouping: true },
];

const testimonials = [
  {
    quote:
      'Working with Ishwarya was a smooth and exciting experience. She transformed my ideas into a portfolio that feels strong, polished, and truly personal.',
    author: 'Cameron Williamson',
    role: 'Content Creator',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    quote:
      'She understood my brand instantly and gave me a portfolio that looks premium, confident, and professional. It made me take my own work more seriously.',
    author: 'Ananya Rao',
    role: 'Freelance Designer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    quote:
      'My online presence feels completely different now. The design is clean, modern, and intentional, and it helps me present myself with much more confidence.',
    author: 'Daniel Brooks',
    role: 'Startup Consultant',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
];

const services = [
  {
    number: '01.',
    title: 'Web Development',
    image: 'https://framerusercontent.com/images/gZQJMwYScmj86fTl2jFqe8YbvRc.jpg?width=1400&height=788',
    slug: 'web-development',
  },
  {
    number: '02.',
    title: 'Branding & Identity',
    image: 'https://framerusercontent.com/images/YSFFIPqVrr2tIjlkHMC2PDbiDM.jpg?width=1400&height=788',
    slug: 'branding-identity',
  },
  {
    number: '03.',
    title: 'UX/UI Design',
    image: 'https://framerusercontent.com/images/bCZFlo66Qb5cVO4f5hPxi7I.jpg?width=1400&height=944',
    slug: 'ux-ui-design',
  },
  {
    number: '04.',
    title: 'Analytics & Strategy',
    image: 'https://framerusercontent.com/images/zmIVTE8LySXUXbZ6EJeQVR1xcGY.jpg?width=1400&height=933',
    slug: 'analytics-strategy',
  },
];

const whyChooseMePoints = [
  'Clean & modern design',
  'Focus on personal branding',
  'Beginner-friendly guidance',
  'Affordable pricing',
];

const projects = [
  {
    title: 'Ishwarya Portfolio Reel 01',
    category: 'Video Project',
    video: '/projects/ishwarya-portfolio/VID-20260323-WA0007.mp4',
  },
  {
    title: 'Ishwarya Portfolio Reel 02',
    category: 'Video Project',
    video: '/projects/ishwarya-portfolio/VID-20260323-WA0008.mp4',
  },
  {
    title: 'Ishwarya Portfolio Reel 03',
    category: 'Video Project',
    video: '/projects/ishwarya-portfolio/VID-20260323-WA0009.mp4',
  },
  {
    title: 'Digiket Marketing Site',
    category: 'UX/UI Design',
    image: 'https://framerusercontent.com/images/9hybUyqF8L1PRsInxXS8jHxaOw.jpg?width=900&height=1125',
  },
  {
    title: 'Solarify Framer Template',
    category: 'Analytics & Strategy',
    image: 'https://framerusercontent.com/images/xKUrJdhloWBDbXJPIWFcuYzdSp4.jpg?width=904&height=1200',
  },
  {
    title: 'Vinency Creative Website',
    category: 'Technology',
    image: 'https://framerusercontent.com/images/pcZ2Ig3bIdBCm9UYYkXYPnX0IE.jpg?width=1200&height=960',
  },
];

const awards = [
  {
    year: '2024',
    title: 'Excellency Award',
    description: 'Awarded for excellence in web design, showcasing my talent in creating engaging user interactions.',
  },
  {
    year: '2023',
    title: 'Web Design Award',
    description: 'Recognized for outstanding work in a community web design competition, highlighting innovation.',
  },
  {
    year: '2022',
    title: 'Best in Town',
    description: 'Honored as a rising talent in a local web design competition, recognized for creativity and skill.',
  },
  {
    year: '2021',
    title: 'Featured in Dehance',
    description: 'Featured on Dehance for web design excellence, showcasing dynamic and engaging interactions.',
  },
];

const articles = [
  {
    category: 'Business',
    date: 'Oct 25, 2024',
    title: 'Effective Strategies to Boost Your Online',
    image: 'https://framerusercontent.com/images/OYsOTzdfdbBueMoCEpLadRHzAu0.jpg',
  },
  {
    category: 'Business',
    date: 'Oct 4, 2024',
    title: "Importance of UX/UI Design in Today's",
    image: 'https://framerusercontent.com/images/0g1NFFzgEwVSVsRaGntwvAkeSIA.jpg',
  },
  {
    category: 'Business',
    date: 'Sep 6, 2024',
    title: '10 UI Design Tricks & Marketing Tips',
    image: 'https://framerusercontent.com/images/Y1dUMQSt2LjbjGAdmMsAIiRaIw8.jpg',
  },
];

const footerLinks = {
  Navigation: ['Home', 'About', 'Services', 'My Projects', 'Blog', '404'],
  Services: ['Analytics & Strategy', 'UX/UI Design', 'Branding & Identity', 'Web Development', 'Get the Template'],
};

const whatsappPrefillMessage = encodeURIComponent(
  'Hi Ishwarya, I want to build my portfolio and personal brand.'
);
const emailSubject = encodeURIComponent('Portfolio Inquiry');
const emailBody = encodeURIComponent(
  'Hi Ishwarya, I want to build my portfolio and would like to discuss the details.'
);

const contactDetails = {
  whatsapp: '+91 7358369538',
  whatsappHref: `https://api.whatsapp.com/send?phone=917358369538&text=${whatsappPrefillMessage}`,
  instagram: '@brandbyaishu_04',
  instagramHref: 'https://www.instagram.com/brandbyaishu_04/',
  email: 'aishuaishu4288@gmail.com',
  emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=aishuaishu4288@gmail.com&su=${emailSubject}&body=${emailBody}`,
};

const initialContactForm = {
  name: '',
  email: '',
  service: services[0].title,
  message: '',
};

const initialSubmissionState = {
  status: 'idle',
  message: '',
};

const sectionVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function formatStatNumber(value, { useGrouping = true, suffix = '' } = {}) {
  return `${new Intl.NumberFormat('en-US', { useGrouping }).format(value)}${suffix}`;
}

function CountUpStat({ stat, prefersReducedMotion }) {
  const statRef = useRef(null);
  const isInView = useInView(statRef, { once: true, amount: 0.65 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    if (prefersReducedMotion) {
      setDisplayValue(stat.value);
      return undefined;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 1400;

    const tick = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setDisplayValue(Math.round(stat.value * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isInView, prefersReducedMotion, stat.value]);

  return (
    <m.article ref={statRef} className="stat-card" variants={itemVariants} whileHover={{ y: -6 }}>
      <span className="stat-value">
        {formatStatNumber(displayValue, { useGrouping: stat.useGrouping, suffix: stat.suffix })}
      </span>
      <span className="stat-label">{stat.label}</span>
    </m.article>
  );
}

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [contactState, setContactState] = useState(initialSubmissionState);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState(initialSubmissionState);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen || contactOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, contactOpen]);

  useEffect(() => {
    if (!contactOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setContactOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [contactOpen]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, -14, 0], rotate: [0, 1.25, 0] },
        transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
      };
  const currentTestimonial = testimonials[activeTestimonial];
  const testimonialStack = testimonials.map((testimonial, index) => {
    const order = (index - activeTestimonial + testimonials.length) % testimonials.length;

    return {
      ...testimonial,
      index,
      order,
    };
  });

  function openContactModal() {
    setMenuOpen(false);
    setContactState(initialSubmissionState);
    setContactOpen(true);
  }

  function closeContactModal() {
    setContactOpen(false);
  }

  function handleContactFieldChange(event) {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    setContactState({ status: 'loading', message: 'Sending your project request...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to send your project request.');
      }

      setContactState({ status: 'success', message: payload.message });
      setContactForm(initialContactForm);
    } catch (error) {
      setContactState({
        status: 'error',
        message: error.message || 'Unable to send your project request.',
      });
    }
  }

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setNewsletterState({ status: 'loading', message: 'Saving your email...' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to save your email.');
      }

      setNewsletterState({ status: 'success', message: payload.message });
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterState({
        status: 'error',
        message: error.message || 'Unable to save your email.',
      });
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="page-shell">
        <div className="page-glow page-glow-left" />
        <div className="page-glow page-glow-right" />

        <m.header
          className="site-header"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container header-shell">
            <a className="brand" href="#hero" aria-label="Ishwarya">
              <span className="brand-mark" aria-hidden="true" />
              <span className="brand-text">Ishwarya.</span>
            </a>

            <nav className="desktop-nav" aria-label="Primary">
              {navLinks.map((link, index) => (
                <a key={link.label} className={index === 0 ? 'active' : ''} href={link.href}>
                  {link.label}
                </a>
              ))}
              <button className="all-pages-button" type="button">
                All Pages
                <ArrowIcon />
              </button>
            </nav>

            <div className="header-actions">
              <button className="button button-accent" type="button" onClick={openContactModal}>
                Contact
                <ArrowIcon />
              </button>
              <button
                className="menu-toggle"
                type="button"
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </m.header>

        <AnimatePresence>
          {menuOpen ? (
            <m.div
              className="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <m.nav
                className="mobile-menu-panel"
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <button
                  className="button button-accent button-full"
                  type="button"
                  onClick={openContactModal}
                >
                  Contact
                  <ArrowIcon />
                </button>
              </m.nav>
            </m.div>
          ) : null}
        </AnimatePresence>

        <main>
          <section className="hero-section" id="hero">
            <div className="container">
              <m.div
                className="hero-frame"
                initial={{ opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hero-pattern" />
                <div className="hero-accent-ring" />
                <div className="hero-acid-shape" />

                <div className="hero-copy">
                  <div className="eyebrow-line">
                    <span>Hey There! Ishwarya Here</span>
                  </div>

                  <div className="hero-title-block">
                    <div className="hero-title-row hero-title-row-top">
                      <h1>DESIGN</h1>
                      <img
                        className="hero-star"
                        src="https://framerusercontent.com/images/Otde49cy0PsLSCUBY073AdND0s.svg?width=116&height=116"
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
                    <div className="hero-title-row hero-title-row-bottom">
                      <h1>PARTNER</h1>
                    </div>
                  </div>

                  <div className="hero-ornaments" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  <p className="hero-description">
                    I&apos;m a portfolio designer and personal branding enthusiast helping
                    students, freelancers, and creators build a presence that opens real
                    opportunities.
                  </p>

                  <div className="hero-actions">
                    <button className="circle-button" type="button" onClick={openContactModal}>
                      <span>LET&apos;S TALK</span>
                      <ArrowIcon />
                    </button>
                  </div>

                  <div className="hero-tags" aria-label="Creative disciplines">
                    {heroTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <m.div className="hero-art" {...floatAnimation}>
                  <div className="hero-art-glow" />
                  <div className="hero-art-shell">
                    <div className="hero-art-sweep" aria-hidden="true" />
                    <img
                      className="hero-art-main"
                      src="https://framerusercontent.com/images/JGg5KjTeGFwN7ZTVdwXdIpA13No.png?width=500&height=612"
                      alt="Abstract hero artwork"
                    />
                  </div>
                </m.div>
              </m.div>
            </div>
          </section>

          <SectionShell id="about" label="About Me" title="Passion for Digital Innovation">
            <div className="about-grid">
              <div className="about-copy">
                <p>
                  Hi, I&apos;m Ishwarya, a portfolio designer and personal branding enthusiast who
                  believes the way you present yourself can change your entire life.
                </p>
                <p>
                  I didn&apos;t come from a perfect path. I&apos;m building myself step by step through
                  independence, discipline, and growth, and along the way I realized that many
                  talented people struggle not because they lack skill, but because they do not
                  know how to showcase themselves.
                </p>
                <p>
                  That&apos;s where I come in. I help students, freelancers, and creators build clean,
                  powerful portfolios that reflect who they truly are, not just what they do. My
                  goal is to help you stand out, attract opportunities, and feel confident about
                  your journey.
                </p>
                <p>
                  Beyond work, I&apos;m deeply focused on self-growth through fitness, discipline, and
                  becoming stronger mentally and physically. For me, this is more than a service.
                  It&apos;s about helping people take control of their lives and create opportunities on
                  their own terms.
                </p>
              </div>

              <div className="about-photo-card">
                <img
                  src="https://framerusercontent.com/images/xpmH2RdbITEStJi8eg19H0zrwU.jpg?width=2709&height=1548"
                  alt="Ishwarya portrait"
                />
                <div className="about-photo-overlay" />
              </div>
            </div>

            <div className="stats-grid">
              {stats.map((stat) => (
                <CountUpStat key={stat.label} stat={stat} prefersReducedMotion={prefersReducedMotion} />
              ))}
            </div>

            <div className="about-cta-wrap">
              <button
                className="circle-button circle-button-outline about-circle-cta"
                type="button"
                onClick={openContactModal}
              >
                <span>ABOUT ME</span>
                <ArrowIcon />
              </button>
            </div>
          </SectionShell>

          <SectionShell
            id="why-choose"
            label="Why Choose Me"
            title="I don&apos;t just design websites. I help you present yourself with confidence."
          >
            <div className="why-grid">
              <div className="why-copy">
                <p>
                  Every portfolio should feel clear, confident, and true to you. My process is
                  designed to help you stand out without making things confusing or overwhelming.
                </p>
              </div>

              <div className="why-points" aria-label="Why choose Ishwarya">
                {whyChooseMePoints.map((point) => (
                  <m.div key={point} className="why-point" variants={itemVariants} whileHover={{ x: 8 }}>
                    <span className="why-point-bullet" aria-hidden="true" />
                    <span className="why-point-text">{point}</span>
                  </m.div>
                ))}
              </div>
            </div>
          </SectionShell>

          <section className="ticker-section" aria-label="Creative ticker">
            <div className="container">
              <div className="ticker-strip">
                <div className="ticker-track">
                  {[...Array(4)].flatMap((_, repeatIndex) =>
                    tickerItems.map((item) => (
                      <span key={`${item}-${repeatIndex}`} className="ticker-item">
                        <span className="ticker-star" aria-hidden="true" />
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          <SectionShell id="services" label="Services" title="Expertise Solutions">
            <div className="services-list">
              {services.map((service) => (
                <m.a
                  key={service.title}
                  className="service-row"
                  href="#footer-cta"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="service-row-main">
                    <span className="service-number">{service.number}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <span className="service-row-arrow">
                    <ArrowIcon />
                  </span>
                  <span className="service-row-preview" aria-hidden="true">
                    <img src={service.image} alt="" />
                  </span>
                </m.a>
              ))}
            </div>
          </SectionShell>

          <SectionShell id="portfolio" label="Portfolio" title="Selected Works">
            <div className="section-header-inline">
              <div className="portfolio-title-wrap">
                <h2 className="portfolio-title">PORTFOLIO</h2>
                <img
                  className="portfolio-star"
                  src="https://framerusercontent.com/images/Otde49cy0PsLSCUBY073AdND0s.svg?width=116&height=116"
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="portfolio-grid">
              {projects.map((project, index) => (
                <m.article
                  key={project.title}
                  className={`project-card project-card-${(index % 3) + 1}`}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="project-media">
                    {project.video ? (
                      <video
                        src={project.video}
                        className="project-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img src={project.image} alt={project.title} />
                    )}
                  </div>
                  <div className="project-category-chip">{project.category}</div>
                  <div className="project-title-chip">{project.title}</div>
                </m.article>
              ))}
            </div>

            <div className="section-circle-cta-wrap">
              <a className="circle-button circle-button-outline section-circle-cta" href="#footer-cta">
                <span>All Projects</span>
                <ArrowIcon />
              </a>
            </div>
          </SectionShell>

          <SectionShell id="testimonials" label="Testimonials" title="What my clients say">
            <div className="testimonial-card">
              <div className="testimonial-copy">
                <img
                  className="testimonial-quote-icon"
                  src="https://framerusercontent.com/images/ttJWXF1xCg8sWDNE2i8PYtXZb64.svg?width=136&height=103"
                  alt=""
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait">
                  <m.p
                    key={currentTestimonial.quote}
                    className="testimonial-quote"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentTestimonial.quote}
                  </m.p>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <m.div
                    key={currentTestimonial.author}
                    className="testimonial-author"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <strong>{currentTestimonial.author}</strong>
                    <span>{currentTestimonial.role}</span>
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="testimonial-visual">
                <div className="testimonial-stack" aria-label="Client portraits">
                  {testimonialStack.map((testimonial) => {
                    const isActive = testimonial.order === 0;
                    const translateX = testimonial.order === 0 ? 0 : testimonial.order === 1 ? 34 : 56;
                    const translateY = testimonial.order === 0 ? 0 : testimonial.order === 1 ? 18 : 34;
                    const rotate = testimonial.order === 0 ? -7 : testimonial.order === 1 ? 4 : 10;
                    const scale = testimonial.order === 0 ? 1 : testimonial.order === 1 ? 0.92 : 0.86;
                    const opacity = testimonial.order === 0 ? 1 : testimonial.order === 1 ? 0.52 : 0.28;

                    return (
                      <m.div
                        key={testimonial.author}
                        className={`testimonial-photo-card${isActive ? ' is-active' : ''}`}
                        animate={{
                          x: translateX,
                          y: translateY,
                          rotate,
                          scale,
                          opacity,
                        }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="testimonial-photo-frame">
                          <img src={testimonial.image} alt={testimonial.author} />
                          <div className="testimonial-photo-overlay" aria-hidden="true" />
                        </div>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SectionShell>

          <SectionShell id="awards" label="Excellency Awards" title="Awards & Recognitions">
            <div className="awards-list">
              {awards.map((award) => (
                <m.article
                  key={award.year}
                  className="award-row"
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                >
                  <span className="award-year">{award.year}</span>
                  <div className="award-dot" />
                  <div className="award-content">
                    <h3>{award.title}</h3>
                    <p>{award.description}</p>
                  </div>
                </m.article>
              ))}
            </div>
          </SectionShell>

          <SectionShell id="articles" label="Blog & Articles" title="Latest Articles">
            <div className="articles-grid">
              {articles.map((article) => (
                <m.article
                  key={article.title}
                  className="article-card"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="article-meta-line">
                    <span className="article-meta-item">
                      <MetaDotIcon />
                      {article.category}
                    </span>
                    <span className="article-meta-item">
                      <CalendarIcon />
                      {article.date}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                  <div className="article-media">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <a href="#footer-cta">
                    View
                    <ArrowIcon />
                  </a>
                </m.article>
              ))}
            </div>

            <div className="section-circle-cta-wrap">
              <a className="circle-button circle-button-outline section-circle-cta" href="#footer-cta">
                <span>VIEW ALL</span>
                <ArrowIcon />
              </a>
            </div>
          </SectionShell>
        </main>

        <AnimatePresence>
          {contactOpen ? (
            <m.div
              className="contact-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeContactModal}
            >
              <m.div
                className="contact-modal"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="contact-modal-header">
                  <div>
                    <span className="footer-heading">Start a Project</span>
                    <h3>Tell me what you need built.</h3>
                  </div>
                  <button
                    className="contact-modal-close"
                    type="button"
                    aria-label="Close contact form"
                    onClick={closeContactModal}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <p className="contact-modal-text">
                  Share a few details and the backend will save your request instantly.
                </p>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="contact-form-grid">
                    <label className="contact-field">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={handleContactFieldChange}
                        required
                      />
                    </label>

                    <label className="contact-field">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={contactForm.email}
                        onChange={handleContactFieldChange}
                        required
                      />
                    </label>

                    <label className="contact-field contact-field-full">
                      <span>Service</span>
                      <select name="service" value={contactForm.service} onChange={handleContactFieldChange}>
                        {services.map((service) => (
                          <option key={service.title} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="contact-field contact-field-full">
                      <span>Project details</span>
                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Tell me about your website, brand, goals, and timeline."
                        value={contactForm.message}
                        onChange={handleContactFieldChange}
                        required
                      />
                    </label>
                  </div>

                  <div className="contact-form-footer">
                    {contactState.message ? (
                      <p className={`form-status form-status-${contactState.status}`}>
                        {contactState.message}
                      </p>
                    ) : (
                      <p className="form-status-helper">
                        Your message will be saved in the project backend.
                      </p>
                    )}

                    <button
                      className="button button-accent"
                      type="submit"
                      disabled={contactState.status === 'loading'}
                    >
                      {contactState.status === 'loading' ? 'Sending...' : 'Send Request'}
                      <ArrowIcon />
                    </button>
                  </div>
                </form>
              </m.div>
            </m.div>
          ) : null}
        </AnimatePresence>

        <footer className="site-footer" id="footer-cta">
          <div className="container">
            <m.section
              className="footer-cta"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="footer-cta-copy">
                <span className="footer-cta-kicker">LET&apos;S TALK</span>
                <p className="footer-cta-note">
                  Let&apos;s build your portfolio and personal brand with confidence.
                </p>
              </div>

              <div className="contact-direct-list">
                <a
                  className="contact-direct-item"
                  href={contactDetails.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open WhatsApp chat"
                >
                  <span className="contact-direct-label">
                    <span className="contact-direct-icon" aria-hidden="true">
                      <WhatsAppIcon />
                    </span>
                    WhatsApp
                  </span>
                  <strong>{contactDetails.whatsapp}</strong>
                </a>
                <a
                  className="contact-direct-item"
                  href={contactDetails.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Instagram profile"
                >
                  <span className="contact-direct-label">
                    <span className="contact-direct-icon" aria-hidden="true">
                      <InstagramIcon />
                    </span>
                    Instagram
                  </span>
                  <strong>{contactDetails.instagram}</strong>
                </a>
                <a
                  className="contact-direct-item"
                  href={contactDetails.emailHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Gmail compose"
                >
                  <span className="contact-direct-label">
                    <span className="contact-direct-icon" aria-hidden="true">
                      <MailIcon />
                    </span>
                    Email
                  </span>
                  <strong>{contactDetails.email}</strong>
                </a>
              </div>

              <div className="footer-cta-actions">
                <button className="button button-accent portfolio-build-button" type="button" onClick={openContactModal}>
                  Let&apos;s Build Your Portfolio
                  <ArrowIcon />
                </button>
                <button
                  className="circle-button circle-button-outline section-circle-cta footer-circle-cta"
                  type="button"
                  onClick={openContactModal}
                >
                  <span>CONTACT</span>
                  <ArrowIcon />
                </button>
              </div>
            </m.section>

            <div className="footer-grid">
              <div className="footer-column footer-column-wide">
                <span className="footer-heading">About Ishwarya</span>
                <p>
                  I help students, freelancers, and creators build clean, powerful portfolios and
                  stronger personal brands so they can stand out, attract opportunities, and move
                  forward with confidence.
                </p>
                <div className="footer-socials">
                  <a href="#hero" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                  <a href="#hero" aria-label="X">
                    <XIcon />
                  </a>
                  <a href="#hero" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href="#hero" aria-label="YouTube">
                    <YouTubeIcon />
                  </a>
                </div>
              </div>

              {Object.entries(footerLinks).map(([heading, links]) => (
                <div key={heading} className="footer-column">
                  <span className="footer-heading">{heading}</span>
                  <ul>
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#hero">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="footer-column">
                <span className="footer-heading">Newsletter</span>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    required
                  />
                  <button
                    className="button button-accent button-full"
                    type="submit"
                    disabled={newsletterState.status === 'loading'}
                  >
                    <span className="newsletter-submit-dot" />
                  </button>
                </form>
                {newsletterState.message ? (
                  <p className={`form-status form-status-inline form-status-${newsletterState.status}`}>
                    {newsletterState.message}
                  </p>
                ) : null}
              </div>
            </div>

              <div className="footer-bottom">
                <span>&copy; 2024 All rights reserved for Ishwarya</span>
              </div>
              <div className="footer-wordmark-stage">
                <div className="footer-wordmark-backdrop" aria-hidden="true">
                  <div className="footer-wordmark-map" />
                  <div className="footer-wordmark-glow" />
                </div>
                <p className="footer-wordmark-tagline">
                  If you&apos;re ready to build your presence and move forward with confidence,
                  I&apos;m here to help.
                </p>
                <div className="footer-wordmark">ISHWARYA</div>
              </div>
            </div>
          </footer>
      </div>
    </LazyMotion>
  );
}

function SectionShell({ children, id, label, title }) {
  return (
    <m.section
      id={id}
      className={`content-section${id ? ` section-${id}` : ''}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      <div className="container">
        <div className="section-heading">
          <div className="eyebrow-line">
            <span>{label}</span>
          </div>
          <m.h2 variants={itemVariants}>{title}</m.h2>
        </div>
        <m.div variants={itemVariants}>{children}</m.div>
      </div>
    </m.section>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 14L14 6M8 6H14V12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetaDotIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3.4" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="13" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.5 2.8V6M13.5 2.8V6M3.5 8H16.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M11.3 17V10.8H13.4L13.7 8.4H11.3V6.9C11.3 6.2 11.5 5.7 12.5 5.7H13.8V3.5C13.2 3.4 12.6 3.3 12 3.3C10.1 3.3 8.9 4.4 8.9 6.6V8.4H7V10.8H8.9V17H11.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4.1 4H6.9L10.2 8.7L14.2 4H15.9L11 9.6L16.1 16H13.3L9.7 11.1L5.4 16H3.7L8.9 10.1L4.1 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3.4C6.5 3.4 3.7 6.1 3.7 9.5C3.7 10.7 4 11.8 4.7 12.9L4 16.4L7.6 15.5C8.6 16.1 9.6 16.4 10.8 16.4C14.2 16.4 17 13.7 17 10.3C17 6.9 13.9 3.4 10 3.4Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 7.7C8 7.2 7.9 7.2 7.6 7.2C7.4 7.2 7.2 7.2 7 7.2C6.8 7.2 6.5 7.3 6.3 7.5C6.1 7.7 5.7 8 5.7 8.7C5.7 9.4 6.3 10.1 6.4 10.2C6.5 10.3 7.5 11.8 9.1 12.4C10.4 12.9 10.7 12.8 11 12.7C11.3 12.6 11.9 12.1 12 11.8C12.1 11.5 12.1 11.2 12 11.1C11.9 11 11.8 10.9 11.5 10.7C11.2 10.6 10.9 10.5 10.7 10.7C10.6 10.8 10.3 11.1 10.2 11.2C10.1 11.3 10 11.4 9.8 11.3C9.6 11.2 9 11 8.3 10.4C7.8 9.9 7.5 9.4 7.4 9.2C7.3 9 7.4 8.9 7.5 8.8C7.6 8.7 7.7 8.5 7.8 8.4C7.9 8.2 8 8.1 8 8C8.1 7.9 8.1 7.8 8.2 7.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="12" height="12" rx="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="13.8" cy="6.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M4.6 6.7L9.1 10.2C9.6 10.6 10.4 10.6 10.9 10.2L15.4 6.7"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M16.5 6.8C16.3 5.9 15.6 5.3 14.8 5.1C13.6 4.8 10 4.8 10 4.8C10 4.8 6.4 4.8 5.2 5.1C4.4 5.3 3.7 5.9 3.5 6.8C3.2 8 3.2 10 3.2 10C3.2 10 3.2 12 3.5 13.2C3.7 14.1 4.4 14.7 5.2 14.9C6.4 15.2 10 15.2 10 15.2C10 15.2 13.6 15.2 14.8 14.9C15.6 14.7 16.3 14.1 16.5 13.2C16.8 12 16.8 10 16.8 10C16.8 10 16.8 8 16.5 6.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M8.4 12.7V7.3L12.7 10L8.4 12.7Z" fill="currentColor" />
    </svg>
  );
}

export default App;
