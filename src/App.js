import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  FaGithub, FaLinkedin, FaDownload,
  FaCode, FaReact, FaAngular, FaVuejs,
  FaPhp, FaNodeJs, FaGit, FaHtml5, FaCss3, FaBootstrap, FaJava
} from 'react-icons/fa';
import {
  SiLaravel, SiIonic, SiTypescript, SiMysql, SiFirebase,
  SiJquery, SiApache, SiRedis, SiGoogleanalytics
} from 'react-icons/si';
import {
  HiOutlineMenuAlt4, HiOutlineX, HiOutlineExternalLink,
  HiOutlineMail, HiOutlinePhone,
  HiOutlineArrowNarrowRight, HiOutlineArrowNarrowDown
} from 'react-icons/hi';

/* -------------------- DATA -------------------- */

const NAV = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'experience', label: 'Experience', num: '03' },
  { id: 'skills', label: 'Skills', num: '04' },
  { id: 'projects', label: 'Work', num: '05' },
  { id: 'education', label: 'Education', num: '06' },
];

const EXPERIENCE = [
  {
    title: 'Web Developer',
    company: 'Brantum Technologies',
    location: 'Rawalpindi, Pakistan',
    period: '2023 — Present',
    current: true,
    points: [
      'Full-stack development across PHP, JavaScript, React, and Angular.',
      'Designed and shipped responsive, user-centric web applications.',
      'Led database design, development, and performance optimization.',
      'Partnered with design teams to deliver seamless user experiences.',
      'Built scalable applications with Laravel and Ionic Angular.',
      'Engaged in agile ceremonies — sprint planning, stand-ups, and reviews.',
    ],
  },
  {
    title: 'Internship',
    company: 'EWAXAL',
    location: 'Islamabad, Pakistan',
    period: '2022 — 2023',
    current: false,
    points: [
      'Applied PHP to develop dynamic web applications from the ground up.',
      'Implemented CRUD operations for efficient data management.',
      'Developed backend functionality with SQL and PHP.',
      'Crafted front-end interfaces using HTML, CSS, and JavaScript.',
      'Integrated front-end and back-end for seamless functionality.',
      'Debugged, tested, and optimized for smooth performance.',
    ],
  },
];

const PROJECTS = [
  {
    num: 'I',
    title: 'Dimunet',
    subtitle: 'Music Streaming Platform',
    url: 'https://streams.yomie.be',
    description:
      'A comprehensive music streaming platform where paid users manage, schedule, and listen to thousands of songs — locally or on remote hardware. Features playlist management, offline playback, remote hardware control, audio equalizer, crossfade, and social sharing.',
    tech: ['Ionic', 'Angular', 'TypeScript', 'Node.js', 'PHP', 'MySQL', 'Firebase', 'Java'],
  },
  {
    num: 'II',
    title: 'CoSignage Player',
    subtitle: 'Digital Signage CMS',
    url: 'https://player.cosignage.com',
    description:
      'A powerful narrowcasting web application linked to a backend CMS for playlist management. Supports videos, images, website links, weather slides, news feeds, RSS, and music — with real-time mobile sync, scheduling, and duration control.',
    tech: ['Laravel', 'Node.js', 'PHP', 'MySQL', 'WebSockets', 'Redis', 'jQuery'],
  },
  {
    num: 'III',
    title: 'SnabbCab',
    subtitle: 'Cab Management System',
    url: 'https://new.snabbcab.com/',
    description:
      'A web-based cab and dispatch system for administrators and dispatchers to manage ride operations — drivers, trips, customers, and real-time ride assignments. Includes ride allocation, driver tracking, fare management, and reporting.',
    tech: ['Laravel', 'Bootstrap 5', 'CSS3', 'HTML5', 'jQuery', 'MySQL', 'Git'],
  },
];

const TECH_SKILLS = [
  { name: 'Laravel', icon: SiLaravel, level: 95 },
  { name: 'PHP', icon: FaPhp, level: 92 },
  { name: 'JavaScript', icon: FaCode, level: 90 },
  { name: 'React', icon: FaReact, level: 88 },
  { name: 'Angular', icon: FaAngular, level: 85 },
  { name: 'Vue.js', icon: FaVuejs, level: 78 },
  { name: 'Ionic', icon: SiIonic, level: 82 },
  { name: 'TypeScript', icon: SiTypescript, level: 80 },
  { name: 'Node.js', icon: FaNodeJs, level: 78 },
  { name: 'Java', icon: FaJava, level: 75 },
  { name: 'MySQL', icon: SiMysql, level: 88 },
  { name: 'Firebase', icon: SiFirebase, level: 76 },
  { name: 'Git', icon: FaGit, level: 90 },
  { name: 'HTML5', icon: FaHtml5, level: 95 },
  { name: 'CSS3', icon: FaCss3, level: 92 },
  { name: 'Bootstrap', icon: FaBootstrap, level: 88 },
  { name: 'jQuery', icon: SiJquery, level: 82 },
  { name: 'Redis', icon: SiRedis, level: 72 },
  { name: 'Apache', icon: SiApache, level: 74 },
  { name: 'Analytics', icon: SiGoogleanalytics, level: 70 },
];

const SOFT_SKILLS = [
  { name: 'Communication', description: 'Written & verbal clarity, active listening' },
  { name: 'Problem Solving', description: 'Analytical thinking, creative solutions' },
  { name: 'Collaboration', description: 'Teamwork, adaptability, conflict resolution' },
  { name: 'Time Management', description: 'Prioritization, deadlines, multitasking' },
];

const EDUCATION = [
  {
    degree: 'BSIET — Information Engineering Technology',
    institution: 'Foundation University School of Science and Technology',
    location: 'Rawalpindi',
    period: '2019 — 2023',
  },
  { degree: 'ICs in Computer Science', institution: 'APSACS Rawat', location: 'Rawat', period: '2017 — 2019' },
  { degree: 'Matric', institution: 'APSACS Rawat', location: 'Rawat', period: '2015 — 2017' },
];

const CONTACT = {
  phone: '+92 306 5923078',
  phoneHref: 'tel:+923065923078',
  email: 'sharisaleem0@gmail.com',
  emailHref: 'mailto:sharisaleem0@gmail.com',
  location: 'Kallar Syedan, Rawalpindi, Pakistan',
  github: 'https://github.com/ShariSaleem',
  linkedin: 'https://linkedin.com/in/sheharyar-saleem-3a879b27b',
  cvPath: '/Sheharyar_Saleem_CV.pdf',
  cvFileName: 'Sheharyar_Saleem_CV.pdf',
};

/* -------------------- HOOKS -------------------- */

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return [ref, visible];
};

/* -------------------- PRIMITIVES -------------------- */

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({ number, label, title }) => (
  <Reveal>
    <div className="mb-16 sm:mb-20">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs tracking-[0.4em] uppercase text-[#C6A15B] font-medium">
          {number} — {label}
        </span>
        <span className="flex-1 h-px bg-gradient-to-r from-[#C6A15B]/40 to-transparent" />
      </div>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#F5F1EA] leading-tight tracking-tight max-w-3xl">
        {title}
      </h2>
    </div>
  </Reveal>
);

const SkillBar = ({ level }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="mt-3 h-px w-full bg-[#3a3a3a] overflow-hidden">
      <div
        className="h-full bg-[#C6A15B] transition-all duration-[1400ms] ease-out"
        style={{ width: visible ? `${level}%` : '0%' }}
      />
    </div>
  );
};

const Navbar = ({ active, scrolled }) => {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#0E0E0E]/85 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => go('home')} className="group flex items-baseline gap-2">
              <span className="font-serif text-2xl text-[#F5F1EA] tracking-tight">
                Sheharyar
              </span>
              <span className="text-[#C6A15B] text-2xl font-serif">.</span>
            </button>

            <nav className="hidden lg:flex items-center gap-10">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className={`relative text-[13px] tracking-[0.15em] uppercase transition-colors duration-500 ${
                    active === id ? 'text-[#C6A15B]' : 'text-[#8a8a8a] hover:text-[#F5F1EA]'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-2 left-0 right-0 h-px bg-[#C6A15B] origin-left transition-transform duration-500 ${
                      active === id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <a
                href={CONTACT.cvPath}
                download={CONTACT.cvFileName}
                className="group inline-flex items-center gap-2 text-[13px] tracking-[0.15em] uppercase text-[#C6A15B] hover:text-[#F5F1EA] transition-colors duration-500"
              >
                <FaDownload size={11} className="group-hover:translate-y-0.5 transition-transform duration-500" />
                CV
              </a>
              <a
                href={CONTACT.emailHref}
                className="inline-flex items-center gap-3 text-[13px] tracking-[0.15em] uppercase text-[#F5F1EA] border-b border-[#C6A15B]/50 pb-1 hover:border-[#C6A15B] transition-colors duration-500"
              >
                Get in Touch
                <HiOutlineArrowNarrowRight className="text-[#C6A15B]" />
              </a>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-[#F5F1EA] p-2"
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt4 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#0E0E0E]/98 backdrop-blur-2xl" />
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between h-20 px-6 sm:px-10">
            <span className="font-serif text-2xl text-[#F5F1EA]">
              Sheharyar<span className="text-[#C6A15B]">.</span>
            </span>
            <button onClick={() => setOpen(false)} className="text-[#F5F1EA] p-2" aria-label="Close">
              <HiOutlineX size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-6 sm:px-10 gap-6">
            {NAV.map(({ id, label, num }, i) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`text-left group transition-all duration-700 ${
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 60 + 100}ms` }}
              >
                <span className="block text-xs tracking-[0.4em] text-[#C6A15B] mb-2">
                  {num}
                </span>
                <span className="font-serif text-5xl text-[#F5F1EA] group-hover:text-[#C6A15B] transition-colors duration-500">
                  {label}
                </span>
              </button>
            ))}
          </nav>
          <div className="px-6 sm:px-10 pb-10 space-y-6">
            <a
              href={CONTACT.cvPath}
              download={CONTACT.cvFileName}
              className="inline-flex items-center gap-3 px-6 py-3 border border-[#C6A15B]/40 text-[#C6A15B] text-[12px] tracking-[0.25em] uppercase hover:bg-[#C6A15B] hover:text-[#0E0E0E] transition-all duration-500"
            >
              <FaDownload size={12} />
              Download CV
            </a>
            <div className="text-xs tracking-[0.2em] text-[#8a8a8a] uppercase">
              {CONTACT.email}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* -------------------- MAIN -------------------- */

const Portfolio = () => {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        const pos = window.scrollY + 140;
        for (const { id } of NAV) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
            setActive(id);
            break;
          }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const techSkills = useMemo(() => TECH_SKILLS, []);

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F1EA] antialiased overflow-x-hidden">
      {/* Elegant ambient light */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#C6A15B]/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#8B6F47]/[0.03] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F5F1EA 1px, transparent 1px), linear-gradient(to bottom, #F5F1EA 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <Navbar active={active} scrolled={scrolled} />

      {/* ================= HERO ================= */}
      <section id="home" className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full pt-32 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-px bg-[#C6A15B]" />
                  <span className="text-xs tracking-[0.4em] uppercase text-[#C6A15B]">
                    Portfolio — MMXXV
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="font-serif text-[3.5rem] sm:text-[5rem] lg:text-[7rem] leading-[0.95] tracking-tight text-[#F5F1EA]">
                  Crafting
                  <br />
                  <span className="italic text-[#C6A15B]">digital</span> experiences
                  <br />
                  with precision.
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-12 max-w-2xl">
                  <p className="text-lg text-[#b8b8b8] leading-relaxed font-light">
                    I'm <span className="text-[#F5F1EA]">Sheharyar Saleem</span> — a full-stack developer
                    with <span className="text-[#C6A15B]">3+ years</span> of experience
                    architecting dynamic and responsive web applications. Focused on
                    clean, scalable code and thoughtful interfaces.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="mt-12 flex flex-wrap items-center gap-8">
                  <button
                    onClick={() => go('projects')}
                    className="group inline-flex items-center gap-4 text-[#F5F1EA]"
                  >
                    <span className="text-[13px] tracking-[0.25em] uppercase">
                      View Selected Work
                    </span>
                    <span className="w-12 h-12 rounded-full border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#0E0E0E] group-hover:border-[#C6A15B] transition-all duration-500">
                      <HiOutlineArrowNarrowRight />
                    </span>
                  </button>

                  <a
                    href={CONTACT.cvPath}
                    download={CONTACT.cvFileName}
                    className="group inline-flex items-center gap-3 text-[13px] tracking-[0.25em] uppercase text-[#C6A15B] hover:text-[#F5F1EA] transition-colors duration-500"
                  >
                    <FaDownload size={12} className="group-hover:translate-y-0.5 transition-transform duration-500" />
                    Download CV
                  </a>

                  <button
                    onClick={() => go('about')}
                    className="text-[13px] tracking-[0.25em] uppercase text-[#8a8a8a] hover:text-[#F5F1EA] transition-colors duration-500 border-b border-transparent hover:border-[#C6A15B]/40 pb-1"
                  >
                    About Me
                  </button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={700}>
                <div className="border-l border-[#C6A15B]/20 pl-8 space-y-6">
                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-2">
                      Based in
                    </div>
                    <div className="font-serif text-xl text-[#F5F1EA]">
                      Rawalpindi, Pakistan
                    </div>
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-2">
                      Focus
                    </div>
                    <div className="font-serif text-xl text-[#F5F1EA]">
                      Full-Stack Development
                    </div>
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-2">
                      Available
                    </div>
                    <div className="font-serif text-xl text-[#F5F1EA] flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
                      For opportunities
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Scroll cue */}
          <Reveal delay={900}>
            <div className="mt-24 flex items-center gap-4 text-[#8a8a8a]">
              <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
              <span className="flex-1 max-w-[120px] h-px bg-[#3a3a3a]" />
              <HiOutlineArrowNarrowDown className="text-[#C6A15B] animate-bounce" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="relative py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader number="01" label="About" title="A developer with a designer's eye." />

          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-[13px] tracking-[0.3em] uppercase text-[#C6A15B] mb-4">
                  Philosophy
                </p>
                <p className="text-[#b8b8b8] leading-relaxed">
                  I believe great software is born from the marriage of engineering rigor
                  and design sensibility. Every line of code should serve a purpose;
                  every pixel should have intent.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="space-y-6 text-lg text-[#c8c8c8] leading-[1.75] font-light">
                  <p className="first-letter:font-serif first-letter:text-6xl first-letter:text-[#C6A15B] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9]">
                    Results-oriented full-stack developer with over three years of
                    experience architecting dynamic and responsive web applications.
                  </p>
                  <p>
                    Proficient in backend development using <span className="text-[#F5F1EA]">PHP</span> and{' '}
                    <span className="text-[#F5F1EA]">Java</span>, with advanced expertise in the{' '}
                    <span className="text-[#F5F1EA]">Laravel</span> framework. On the frontend,
                    I work with HTML5, CSS3, and modern frameworks including{' '}
                    <span className="text-[#F5F1EA]">Angular</span>,{' '}
                    <span className="text-[#F5F1EA]">Ionic Angular</span>,{' '}
                    <span className="text-[#F5F1EA]">React</span>, and{' '}
                    <span className="text-[#F5F1EA]">Vue.js</span>.
                  </p>
                  <p>
                    Committed to writing clean, scalable code and solving complex problems
                    — delivering high-impact solutions in agile, team-oriented environments.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="relative py-32 border-t border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader number="02" label="Career" title="Where I've been." />

          <div className="space-y-px">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="group grid lg:grid-cols-12 gap-8 py-12 border-t border-white/[0.06] hover:bg-white/[0.015] transition-colors duration-500">
                  <div className="lg:col-span-3">
                    <div className="text-xs tracking-[0.3em] uppercase text-[#C6A15B] mb-2">
                      {exp.period}
                    </div>
                    <div className="text-sm text-[#8a8a8a]">{exp.location}</div>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="font-serif text-3xl text-[#F5F1EA] mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-[#C6A15B] text-sm tracking-wide">{exp.company}</p>
                  </div>

                  <div className="lg:col-span-5">
                    <ul className="space-y-3">
                      {exp.points.map((p, k) => (
                        <li key={k} className="flex items-start gap-4 text-[#b8b8b8] text-sm leading-relaxed">
                          <span className="mt-2 w-4 h-px bg-[#C6A15B]/60 flex-shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/[0.06]" />
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="relative py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader number="03" label="Craft" title="Tools of the trade." />

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Technical */}
            <div className="lg:col-span-8">
              <Reveal>
                <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-8">
                  Technical Proficiency
                </div>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                {techSkills.map(({ name, icon: Icon, level }, i) => (
                  <Reveal key={name} delay={(i % 10) * 50}>
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <Icon size={16} className="text-[#C6A15B]" />
                          <span className="font-serif text-lg text-[#F5F1EA]">{name}</span>
                        </div>
                        <span className="text-xs tracking-widest text-[#8a8a8a] tabular-nums">
                          {level}%
                        </span>
                      </div>
                      <SkillBar level={level} />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Soft skills */}
            <div className="lg:col-span-4">
              <Reveal>
                <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-8">
                  Beyond Code
                </div>
              </Reveal>
              <div className="space-y-8">
                {SOFT_SKILLS.map((s, i) => (
                  <Reveal key={s.name} delay={i * 100}>
                    <div className="border-l border-[#C6A15B]/30 pl-6">
                      <h4 className="font-serif text-xl text-[#F5F1EA] mb-2">{s.name}</h4>
                      <p className="text-sm text-[#8a8a8a] leading-relaxed">{s.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="relative py-32 border-t border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader number="04" label="Selected Work" title="A few things I've built." />

          <div className="space-y-px">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 150}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-12 border-t border-white/[0.06] hover:bg-white/[0.015] transition-colors duration-500"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-1">
                      <span className="font-serif text-2xl text-[#C6A15B] italic">
                        {p.num}
                      </span>
                    </div>

                    <div className="lg:col-span-5">
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F1EA] mb-2 group-hover:text-[#C6A15B] transition-colors duration-500">
                        {p.title}
                      </h3>
                      <p className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-6">
                        {p.subtitle}
                      </p>
                      <div className="inline-flex items-center gap-3 text-[#C6A15B] text-xs tracking-[0.25em] uppercase">
                        Visit project
                        <HiOutlineExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      <p className="text-[#b8b8b8] leading-relaxed mb-6 font-light">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs tracking-[0.15em] uppercase text-[#8a8a8a]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
            <div className="border-t border-white/[0.06]" />
          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section id="education" className="relative py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader number="05" label="Education" title="Foundations." />

          <div className="grid lg:grid-cols-3 gap-px bg-white/[0.06]">
            {EDUCATION.map((e, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="bg-[#0E0E0E] p-10 h-full hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="text-xs tracking-[0.3em] uppercase text-[#C6A15B] mb-6">
                    {e.period}
                  </div>
                  <h3 className="font-serif text-2xl text-[#F5F1EA] mb-4 leading-snug">
                    {e.degree}
                  </h3>
                  <p className="text-[#b8b8b8] text-sm mb-1">{e.institution}</p>
                  <p className="text-[#8a8a8a] text-xs tracking-widest uppercase mt-4">
                    {e.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CONTACT ================= */}
      <footer className="relative py-32 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-12 mb-20">
              <div className="lg:col-span-7">
                <p className="text-xs tracking-[0.4em] uppercase text-[#C6A15B] mb-6">
                  Let's build something
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F1EA] leading-tight">
                  Have a project in mind?
                  <br />
                  <a
                    href={CONTACT.emailHref}
                    className="italic text-[#C6A15B] hover:text-[#F5F1EA] transition-colors duration-500 underline decoration-[#C6A15B]/30 underline-offset-8 hover:decoration-[#F5F1EA]/50"
                  >
                    Let's talk.
                  </a>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:pt-16">
                <div className="space-y-6">
                  <a
                    href={CONTACT.emailHref}
                    className="group flex items-center justify-between border-b border-white/[0.06] pb-4 hover:border-[#C6A15B]/40 transition-colors duration-500"
                  >
                    <div>
                      <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-1">
                        Email
                      </div>
                      <div className="text-[#F5F1EA] text-sm">{CONTACT.email}</div>
                    </div>
                    <HiOutlineArrowNarrowRight className="text-[#C6A15B] group-hover:translate-x-1 transition-transform duration-500" />
                  </a>
                  <a
                    href={CONTACT.phoneHref}
                    className="group flex items-center justify-between border-b border-white/[0.06] pb-4 hover:border-[#C6A15B]/40 transition-colors duration-500"
                  >
                    <div>
                      <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-1">
                        Phone
                      </div>
                      <div className="text-[#F5F1EA] text-sm">{CONTACT.phone}</div>
                    </div>
                    <HiOutlineArrowNarrowRight className="text-[#C6A15B] group-hover:translate-x-1 transition-transform duration-500" />
                  </a>
                  <div className="border-b border-white/[0.06] pb-4">
                    <div className="text-xs tracking-[0.3em] uppercase text-[#8a8a8a] mb-1">
                      Location
                    </div>
                    <div className="text-[#F5F1EA] text-sm">{CONTACT.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="font-serif text-2xl text-[#F5F1EA]">
              Sheharyar<span className="text-[#C6A15B]">.</span>
            </div>

            <div className="flex items-center gap-6">
              {[
                { href: CONTACT.github, icon: FaGithub, label: 'GitHub' },
                { href: CONTACT.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
                { href: CONTACT.emailHref, icon: HiOutlineMail, label: 'Email' },
                { href: CONTACT.phoneHref, icon: HiOutlinePhone, label: 'Phone' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#8a8a8a] hover:text-[#C6A15B] transition-colors duration-500"
                >
                  <Icon size={16} />
                </a>
              ))}

              <a
                href={CONTACT.cvPath}
                download={CONTACT.cvFileName}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#C6A15B] border border-[#C6A15B]/40 px-4 py-2 hover:bg-[#C6A15B] hover:text-[#0E0E0E] transition-all duration-500"
              >
                <FaDownload size={11} />
                CV
              </a>
            </div>

            <div className="text-xs tracking-[0.25em] uppercase text-[#8a8a8a]">
              © {new Date().getFullYear()} — All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;