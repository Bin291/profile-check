import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Mail, Github as GithubIcon, Linkedin as LinkedinIcon, ExternalLink,
  Menu, X, Code2, Server, Database, Smartphone,
  MapPin, GraduationCap, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  canvas: '#faf9f5',
  surfaceCard: '#efe9de',
  surfaceDark: '#181715',
  surfaceDarkElevated: '#252320',
  ink: '#141413',
  body: '#3d3d3a',
  muted: '#6c6a64',
  mutedSoft: '#8e8b82',
  hairline: '#e6dfd8',
  primary: '#cc785c',
  onDark: '#faf9f5',
  onDarkSoft: '#a09d96',
};

// ─── Static project data (titles, urls, stack stay the same in both langs) ───
const projectsMeta = [
  { title: 'FormCV',              url: 'https://formcv.app/',             stack: ['Vite', 'Supabase', 'Express.js'],  screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fformcv.app%2F&screenshot=true&meta=false&embed=screenshot.url' },
  { title: 'FormCV Partner Portal', url: 'https://partner.formcv.app/',  stack: ['Next.js', 'Supabase', 'Strapi'],   screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fpartner.formcv.app%2F&screenshot=true&meta=false&embed=screenshot.url' },
  { title: 'Ryhza',               url: 'https://ryhza-732bd.web.app',    stack: ['Angular', 'NestJS', 'Supabase'],   screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fryhza-732bd.web.app&screenshot=true&meta=false&embed=screenshot.url' },
];

const skills = [
  { icon: Code2,     label: 'Frontend',    items: ['React', 'Next.js', 'Angular', 'Vue', 'Flutter'] },
  { icon: Server,    label: 'Backend',     items: ['NestJS', 'Express.js', 'Ruby', 'RESTful API'] },
  { icon: Database,  label: 'Database',    items: ['Supabase', 'PostgreSQL'] },
  { icon: Smartphone,label: 'Tools & Misc',items: ['Vite', 'Strapi', 'Git', 'Docker'] },
];

// ─── Language toggle ──────────────────────────────────────────────────────────
function LangToggle() {
  const { i18n: i } = useTranslation();
  const isEN = i.language === 'en';

  const toggle = () => {
    const next = isEN ? 'vi' : 'en';
    i.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <button
      onClick={toggle}
      className="relative flex items-center text-[12px] font-semibold tracking-wide rounded-full border p-0.5 select-none"
      style={{ borderColor: C.hairline, background: C.canvas }}
      title="Switch language"
      aria-label="Switch language"
    >
      <span
        className="absolute top-0.5 bottom-0.5 rounded-full transition-all duration-300 ease-out"
        style={{
          background: C.surfaceDark,
          width: 'calc(50% - 2px)',
          left: isEN ? '2px' : 'calc(50%)',
        }}
      />
      <span
        className="relative z-10 px-2.5 py-1 transition-colors duration-300"
        style={{ color: isEN ? C.onDark : C.muted }}
      >
        EN
      </span>
      <span
        className="relative z-10 px-2.5 py-1 transition-colors duration-300"
        style={{ color: !isEN ? C.onDark : C.muted }}
      >
        VI
      </span>
    </button>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
const inputStyle = {
  background: 'rgba(255,255,255,0.15)',
  border: '1px solid rgba(255,255,255,0.25)',
  color: 'white',
};

function ContactForm() {
  const { t } = useTranslation();
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('ok');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder={t('contact.namePlaceholder')} required
          value={fields.name} onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
          className="rounded-[8px] px-4 py-3 text-[14px] outline-none w-full placeholder:text-white/40" style={inputStyle} />
        <input type="email" placeholder={t('contact.emailPlaceholder')} required
          value={fields.email} onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
          className="rounded-[8px] px-4 py-3 text-[14px] outline-none w-full placeholder:text-white/40" style={inputStyle} />
      </div>
      <textarea placeholder={t('contact.messagePlaceholder')} rows={5} required
        value={fields.message} onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
        className="w-full rounded-[8px] px-4 py-3 text-[14px] outline-none resize-none placeholder:text-white/40" style={inputStyle} />

      {status === 'ok' && (
        <p className="text-[13px] text-white/80 bg-white/10 rounded-[8px] px-4 py-3">{t('contact.success')}</p>
      )}
      {status === 'error' && (
        <p className="text-[13px] text-white/80 bg-white/10 rounded-[8px] px-4 py-3">{t('contact.error')}</p>
      )}

      <button type="submit" disabled={status === 'sending'}
        className="w-full rounded-[8px] py-3 text-[14px] font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: C.canvas, color: C.primary }}>
        {status === 'sending' ? t('contact.sending') : t('contact.send')}
      </button>
    </form>
  );
}

// ─── Spike mark ───────────────────────────────────────────────────────────────
const SpikeMark = ({ size = 16, color = C.primary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 1v14M1 8h14M2.93 2.93l10.14 10.14M13.07 2.93L2.93 13.07"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.fromTo(el,
        { y: 32, opacity: 0 },
        { scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    });
  }, { scope: containerRef });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.about'),    id: 'about' },
    { label: t('nav.skills'),   id: 'skills' },
    { label: t('nav.projects'), id: 'projects' },
    { label: t('nav.contact'),  id: 'contact' },
  ];

  const timeline = t('about.timeline', { returnObjects: true }) as { year: string; role: string; org: string; note: string }[];
  const projectDescs = t('projects.list', { returnObjects: true }) as { desc: string }[];

  return (
    <div ref={containerRef} className="relative overflow-x-hidden"
      style={{ background: 'transparent', color: C.ink, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Single fixed shader sheet behind the whole page ──────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <ShaderGradientCanvas style={{ width: '100%', height: '100%' }} pointerEvents="none">
          <ShaderGradient
            animate="on"
            type="waterPlane"
            color1="#cc785c"
            color2="#dbba95"
            color3="#faf9f5"
            brightness={1.1}
            cAzimuthAngle={180}
            cDistance={3.6}
            cPolarAngle={90}
            cameraZoom={1}
            envPreset="city"
            grain="on"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            uAmplitude={1}
            uDensity={1.3}
            uFrequency={5.5}
            uSpeed={0.25}
            uStrength={2.4}
          />
        </ShaderGradientCanvas>
        {/* Cream scrim so text over the light sections stays readable */}
        <div className="absolute inset-0" style={{ background: 'rgba(250,249,245,0.6)' }} />
      </div>

      {/* Scroll progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{ scaleX: scrollYProgress, background: C.primary }} />

      {/* ── Nav ──────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b"
        style={{ background: C.canvas, borderColor: C.hairline, height: 64 }}>
        <div className="container mx-auto px-6 h-full flex justify-between items-center max-w-[1200px]">
          <button onClick={() => scrollTo('hero')} className="font-semibold text-[16px] tracking-wide"
            style={{ color: C.ink }}>
            NPB
          </button>

          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-[14px] font-medium transition-colors hover:opacity-70"
                style={{ color: C.muted }}>
                {label}
              </button>
            ))}
            <LangToggle />
            <button onClick={() => scrollTo('contact')}
              className="px-5 py-2 rounded-[8px] text-[14px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: C.primary }}>
              {t('nav.contact')}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <LangToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: C.ink }}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          style={{ background: C.canvas }}>
          {navLinks.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-2xl font-medium"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: C.ink }}>
              {label}
            </button>
          ))}
        </motion.div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center select-none" style={{ paddingTop: 64 }}>
        <div className="relative container mx-auto px-6 max-w-[1200px] py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium tracking-[1.5px] uppercase mb-8"
                style={{ background: C.surfaceCard, color: C.muted }}>
                <SpikeMark size={10} color={C.primary} />
                {t('hero.badge')}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-6 leading-[1.05]"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(60px, 9vw, 96px)', fontWeight: 400, letterSpacing: '-2px', color: C.ink }}>
                Nguyen<br />Phuong Binh
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}
                className="text-[19px] leading-[1.65] mb-10 max-w-lg" style={{ color: C.body }}>
                {t('hero.description')}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-3 flex-wrap">
                <button onClick={() => scrollTo('projects')}
                  className="px-6 py-3 rounded-[8px] text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: C.primary }}>
                  {t('hero.viewProjects')}
                </button>
                <a href="https://github.com/Bin291" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-[8px] text-[14px] font-medium border transition-colors hover:opacity-70 flex items-center gap-2"
                  style={{ borderColor: C.hairline, color: C.ink, background: C.canvas }}>
                  <GithubIcon size={16} /> GitHub
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-10 flex gap-6 text-[13px] flex-wrap" style={{ color: C.muted }}>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> Bình Chánh, HCM</span>
                <span className="flex items-center gap-1.5"><GraduationCap size={13} /> Hoa Sen University</span>
                <span className="flex items-center gap-1.5"><Briefcase size={13} /> ITSS Company</span>
              </motion.div>
            </div>

            {/* Avatar card */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-[20px] overflow-hidden border"
                  style={{ borderColor: C.hairline }}>
                  <img src="https://github.com/Bin291.png" alt="Nguyễn Phương Bình"
                    className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-[12px] px-4 py-3 border shadow-sm"
                  style={{ background: C.canvas, borderColor: C.hairline }}>
                  <div className="text-[22px] font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', color: C.primary }}>5K+</div>
                  <div className="text-[11px] tracking-widest uppercase" style={{ color: C.muted }}>{t('about.stats.users')}</div>
                </div>
                <div className="absolute -top-4 -right-4 rounded-[12px] px-4 py-3 border shadow-sm"
                  style={{ background: C.surfaceDark, borderColor: '#2a2825' }}>
                  <div className="text-[22px] font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', color: C.onDark }}>99.5%</div>
                  <div className="text-[11px] tracking-widest uppercase" style={{ color: C.onDarkSoft }}>{t('about.stats.uptime')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10" style={{ background: C.surfaceDark, padding: '96px 0' }}>
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-[12px] font-medium tracking-[1.5px] uppercase mb-6" style={{ color: C.primary }}>
                {t('about.label')}
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-1px', color: C.onDark, lineHeight: 1.1, marginBottom: 24 }}>
                {t('about.title1')}<br />{t('about.title2')}
              </h2>
              <div className="space-y-4 text-[16px] leading-[1.6]" style={{ color: C.onDarkSoft }}>
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="reveal space-y-6">
              {timeline.map(({ year, role, org, note }, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: C.primary }} />
                    {i < timeline.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: '#2a2825' }} />}
                  </div>
                  <div className="pb-6">
                    <div className="text-[11px] tracking-widest uppercase mb-1" style={{ color: C.onDarkSoft }}>{year}</div>
                    <div className="font-medium text-[15px]" style={{ color: C.onDark }}>{role}</div>
                    <div className="text-[13px] mb-1" style={{ color: C.primary }}>{org}</div>
                    <div className="text-[13px]" style={{ color: C.onDarkSoft }}>{note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10" style={{ background: 'transparent', padding: '96px 0' }}>
        <div className="relative container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-16 reveal">
            <p className="text-[12px] font-medium tracking-[1.5px] uppercase mb-4" style={{ color: C.primary }}>
              {t('skills.label')}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, letterSpacing: '-0.5px', color: C.ink }}>
              {t('skills.title')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {skills.map(({ icon: Icon, label, items }) => (
              <motion.div key={label} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
                className="reveal group rounded-[16px] p-8 border shadow-sm hover:shadow-xl transition-shadow duration-300"
                style={{ background: '#ffffff', borderColor: C.hairline }}>
                <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ background: 'rgba(204,120,92,0.1)' }}>
                  <Icon size={22} strokeWidth={1.5} style={{ color: C.primary }} />
                </div>
                <h3 className="font-semibold text-[17px] mb-4 pb-4 border-b" style={{ color: C.ink, borderColor: C.hairline }}>{label}</h3>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="text-[14px] flex items-center gap-2" style={{ color: C.body }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.primary }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────────── */}
      <section id="projects" className="relative z-10" style={{ background: C.surfaceDark, padding: '96px 0' }}>
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-16 reveal">
            <p className="text-[12px] font-medium tracking-[1.5px] uppercase mb-4" style={{ color: C.primary }}>
              {t('projects.label')}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, letterSpacing: '-0.5px', color: C.onDark }}>
              {t('projects.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projectsMeta.map((project, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                className="reveal rounded-[12px] overflow-hidden" style={{ background: C.surfaceDarkElevated }}>
                <div className="aspect-video overflow-hidden relative">
                  <img src={project.screenshot} alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer" loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.title}/800/450`; }} />
                  <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-2"
                    style={{ background: 'rgba(24,23,21,0.85)' }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#c64545' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4a017' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#5db872' }} />
                    <span className="ml-2 text-[11px] px-3 py-0.5 rounded flex-1 text-center truncate"
                      style={{ background: C.surfaceDark, color: C.onDarkSoft, fontFamily: 'JetBrains Mono, monospace' }}>
                      {project.url.replace('https://', '')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack.map(s => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded-full font-medium tracking-wide"
                        style={{ background: 'rgba(204,120,92,0.12)', color: C.primary, border: '1px solid rgba(204,120,92,0.2)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-medium text-[18px] mb-2" style={{ color: C.onDark }}>{project.title}</h3>
                  <p className="text-[14px] leading-[1.6] mb-5" style={{ color: C.onDarkSoft }}>
                    {projectDescs[i]?.desc}
                  </p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70"
                    style={{ color: C.primary }}>
                    {t('projects.viewLive')} <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10" style={{ background: 'transparent', padding: '96px 0' }}>
        <div className="relative container mx-auto px-6 max-w-[1200px]">
          <div className="reveal rounded-[12px] p-12 md:p-16 grid md:grid-cols-2 gap-12 items-start"
            style={{ background: C.primary }}>
            <div>
              <p className="text-[12px] font-medium tracking-[1.5px] uppercase mb-6 text-white/70">
                {t('contact.label')}
              </p>
              <h2 className="mb-6 text-white leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, letterSpacing: '-0.5px' }}>
                {t('contact.title1')}<br />{t('contact.title2')}
              </h2>
              <p className="text-[15px] leading-[1.6] mb-8 text-white/80">{t('contact.subtitle')}</p>
              <div className="space-y-4">
                {[
                  { icon: Mail,     label: 'binhnguyen290104@gmail.com', href: 'mailto:binhnguyen290104@gmail.com' },
                  { icon: GithubIcon,   label: 'github.com/Bin291', href: 'https://github.com/Bin291' },
                  { icon: LinkedinIcon, label: 'linkedin.com/in/nguyen-binh', href: 'https://www.linkedin.com/in/nguy%E1%BB%85n-b%C3%ACnh-44717a385/' },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[14px] text-white/80 hover:text-white transition-colors">
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-10" style={{ background: C.surfaceDark, borderTop: '1px solid #2a2825', padding: '48px 0' }}>
        <div className="container mx-auto px-6 max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center" style={{ color: C.onDark }}>
            <span className="text-[16px] font-semibold tracking-wide">NPB</span>
          </div>
          <p className="text-[13px]" style={{ color: C.onDarkSoft }}>{t('footer.rights')}</p>
          <div className="flex gap-5">
            {[
              { icon: GithubIcon,   href: 'https://github.com/Bin291' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/nguy%E1%BB%85n-b%C3%ACnh-44717a385/' },
              { icon: Mail,     href: 'mailto:binhnguyen290104@gmail.com' },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="transition-opacity hover:opacity-60" style={{ color: C.onDarkSoft }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
