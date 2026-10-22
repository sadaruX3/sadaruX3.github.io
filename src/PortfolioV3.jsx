import React, { useEffect, useRef, useState } from "react";

/* ---------------- Portfolio Data ---------------- */

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

// Paste your free Web3Forms access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
const PROFILE_EMAIL = "saviwijethunga2002@gmail.com";
const PROFILE_LOCATION = "Colombo, Sri Lanka";
const PROFILE_GITHUB = "https://github.com/sadaruX3";
const PROFILE_LINKEDIN = "https://www.linkedin.com/in/sadaru-wijethunga-bb510b440";
const PROFILE_PHOTO_URL = "https://github.com/sadaruX3.png";

const SKILL_GROUPS = [
  {
    title: "QA & Testing",
    badge: "Specialization",
    items: [
      "Playwright Automation",
      "Manual Testing",
      "Test Case Design",
      "Bug Reporting",
      "API Testing (Postman)",
      "Regression & Smoke Testing",
    ],
  },
  {
    title: "Programming Languages",
    badge: "Core",
    items: ["JavaScript (ES6+)", "Kotlin", "Java", "Python", "PHP", "SQL"],
  },
  {
    title: "Web & Full Stack",
    badge: "Development",
    items: ["React.js", "Node.js", "Express.js", "HTML5", "CSS3 / Tailwind", "Bootstrap", "REST APIs"],
  },
  {
    title: "Mobile Development",
    badge: "Android",
    items: ["Android Studio", "Kotlin", "Material Design UI", "XML Layouts", "Activity Lifecycle"],
  },
  {
    title: "Databases",
    badge: "Data",
    items: ["MongoDB", "MySQL", "Relational Database Design", "Mongoose"],
  },
  {
    title: "Tools & DevOps",
    badge: "Workflow",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vite", "npm"],
  },
];

const JOURNEY_ITEMS = [
  {
    period: "2022 — Present",
    title: "BSc (Hons) in Information Technology",
    org: "Sri Lanka Institute of Information Technology (SLIIT)",
    type: "Education",
    desc: "Undergraduate focusing on Software Quality Assurance, Full-Stack Web Development, Mobile Application Development, and Database Systems. Actively engaged in hands-on coursework and team projects.",
    highlights: ["QA & Testing Specialization", "OOP & System Architecture", "Agile & Team Collaboration"],
  },
  {
    period: "2024",
    title: "QA Test Automation Lead (Academic Project)",
    org: "ITPM Project · SLIIT",
    type: "QA Testing",
    desc: "Designed and executed comprehensive automated test suites using Playwright for a Singlish-to-Sinhala real-time transliteration tool, testing functional correctness, UI reactivity, and edge-case transliterations.",
    highlights: ["Playwright Automation", "Positive & Negative Test Matrices", "Detailed Bug Reporting"],
  },
  {
    period: "2023 — 2024",
    title: "Full-Stack & Mobile Developer (Project Lead)",
    org: "Self-Directed & Academic Builds",
    type: "Engineering",
    desc: "Engineered real-world Android apps (MindWell wellness tracker, InShotLK e-commerce platform) in Kotlin and full-stack MERN web solutions, taking projects from initial requirements to complete implementation.",
    highlights: ["Kotlin Native Apps", "MERN Stack Client-Server", "Modern Responsive UI"],
  },
];

const PROJECTS = [
  {
    n: "01",
    name: "Singlish → Sinhala Test Suite",
    category: "qa",
    type: "QA · Test Automation",
    desc: "End-to-end automated testing suite for a Singlish transliteration engine using Playwright. Covers extensive positive, negative, and edge-case linguistic combinations with automated validation.",
    highlights: "Playwright test runner, rigorous validation matrix & boundary tests",
    stack: ["Playwright", "JavaScript", "Automated QA", "Test Runner"],
    source: "https://github.com/sadaruX3/IT23643536-ITPM-Assigment-01",
    color: "#22C1C3",
  },
  {
    n: "02",
    name: "MindWell",
    category: "mobile",
    type: "Android · Health & Wellness",
    desc: "Native Android application built to track daily moods, hydration levels, and wellness habits, fostering positive lifestyle routines with an intuitive Material UI.",
    highlights: "Kotlin architecture, habit tracking logic, smooth responsive screens",
    stack: ["Kotlin", "Android Studio", "Material Design", "Local Storage"],
    source: "https://github.com/sadaruX3/Wellness-app",
    color: "#FF6B6B",
  },
  {
    n: "03",
    name: "InShotLK — Camera Equipment Store",
    category: "mobile",
    type: "Android · E-Commerce",
    desc: "Full-featured mobile store application for buying and renting cameras, lenses, and cinematography equipment with instant catalog search and checkout flow.",
    highlights: "Category filtering, item cart, rent/buy workflows & order management",
    stack: ["Kotlin", "Android Studio", "E-Commerce", "UI/UX"],
    source: "https://github.com/sadaruX3/online-Camera-Store-",
    color: "#FFA94D",
  },
  {
    n: "04",
    name: "MERN Y2S2 University System",
    category: "web",
    type: "Web · Full-Stack Platform",
    desc: "University group project built on the MERN stack with complete client-server data flow, RESTful API endpoints, CRUD operations, and responsive dashboards.",
    highlights: "Full-stack architecture, secure API routes, team Git workflow",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    source: "https://github.com/theshanGeeth123/MERN-Y2S2-PROJECT",
    color: "#A29BFE",
  },
  {
    n: "05",
    name: "Online Pharmacy Authentication UI",
    category: "web",
    type: "Web · Modern Auth System",
    desc: "Sleek, responsive authentication system featuring split-panel layouts, user registration, validation guards, and seamless tab transitions.",
    highlights: "Form validation, responsive split-screen, polished transitions",
    stack: ["PHP", "JavaScript", "HTML5", "CSS3"],
    source: "https://github.com/sadaruX3/online-pharmacy-auth-ui",
    color: "#6C5CE7",
  },
];

/* ---------------- Icons ---------------- */

function Icon({ name, size = 18 }) {
  const c = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "github")
    return (
      <svg {...c}>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg {...c}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 11v5M8 8v.01M12 16v-3a2 2 0 0 1 4 0v3M12 13v3" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg {...c}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  if (name === "arrow")
    return (
      <svg {...c}>
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    );
  if (name === "menu")
    return (
      <svg {...c}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  if (name === "close")
    return (
      <svg {...c}>
        <path d="M6 6l12 12M6 18L18 6" />
      </svg>
    );
  if (name === "check")
    return (
      <svg {...c}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  if (name === "copy")
    return (
      <svg {...c}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    );
  if (name === "file-text")
    return (
      <svg {...c}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    );
  if (name === "download")
    return (
      <svg {...c}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    );
  if (name === "external")
    return (
      <svg {...c}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    );
  if (name === "chevron-up")
    return (
      <svg {...c}>
        <polyline points="18 15 12 9 6 15" />
      </svg>
    );
  if (name === "sparkles")
    return (
      <svg {...c}>
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
      </svg>
    );
  return null;
}

/* ---------------- Reveal on Scroll Wrapper ---------------- */

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function PortfolioV3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectCategory, setProjectCategory] = useState("all");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact Form
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
  const [formMessage, setFormMessage] = useState("");

  // Track scroll position for header blur, progress bar, & back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scroll);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer for active navbar indicator
  useEffect(() => {
    const ids = ["hero", "about", "journey", "skills", "projects", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id === "hero" ? "about" : e.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Lock body scroll on modal or drawer
  useEffect(() => {
    document.body.style.overflow = menuOpen || showResumeModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, showResumeModal]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PROFILE_EMAIL).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    });
  };

  const handleFormChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const missingKey = !WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY";
    if (missingKey) {
      const subject = `Portfolio Inquiry from ${form.name}`;
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
      const mailto = `mailto:${PROFILE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setFormStatus("success");
      setFormMessage("Email client opened! You can send the message directly to saviwijethunga2002@gmail.com.");
      return;
    }

    setFormStatus("sending");
    setFormMessage("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${form.name}`,
          from_name: "Sadaru Wijethunga Portfolio",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormMessage("Thank you! Your message has been sent successfully.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
        setFormMessage("There was an issue sending your message. Please email directly.");
      }
    } catch {
      setFormStatus("error");
      setFormMessage("Network error occurred. Please reach out via email directly.");
    }
  };

  const filteredProjects =
    projectCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === projectCategory);

  return (
    <div
      className="min-h-screen w-full relative selection:bg-rose-500 selection:text-white"
      style={{
        background: "#0c0d19",
        color: "#f5f4fb",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        .disp { font-family: 'Sora', sans-serif; }
        .grad-text {
          background: linear-gradient(100deg, #FF6B6B 0%, #FFA94D 35%, #6C5CE7 70%, #22C1C3 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradShift 8s ease infinite;
        }
        @keyframes gradShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.08); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 25px) scale(1.05); }
        }
        .blob-a { animation: blob1 10s ease-in-out infinite; }
        .blob-b { animation: blob2 12s ease-in-out infinite; }
        .pill-link {
          position: relative;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pill-link.is-active {
          color: #0c0d19 !important;
          background: linear-gradient(120deg, #FF6B6B, #FFA94D);
          box-shadow: 0 10px 24px rgba(255, 107, 107, 0.25);
        }
        .pill-link:not(.is-active):hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .btn-cta {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -8px rgba(255, 107, 107, 0.45);
        }
        .card-interactive {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-interactive:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
        }
        .field:focus {
          outline: none;
          border-color: #FF6B6B !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.15);
        }
        @keyframes floatTilt3d {
          0%, 100% { transform: rotateY(-12deg) rotateX(5deg) translateY(0px); }
          50% { transform: rotateY(12deg) rotateX(-5deg) translateY(-12px); }
        }
        .avatar3d { animation: floatTilt3d 8s ease-in-out infinite; }
        @keyframes groundPulse3d {
          0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.45; }
          50% { transform: translateX(-50%) scaleX(0.75); opacity: 0.25; }
        }
        .avatar3d-ground {
          animation: groundPulse3d 8s ease-in-out infinite;
          transform: translateX(-50%);
        }
      `}</style>

      {/* Top Scroll Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[999] bg-gradient-to-r from-[#FF6B6B] via-[#FFA94D] to-[#22C1C3] transition-all duration-75"
        style={{ width: scrollProgress }}
      />

      {/* Ambient background glows */}
      <div
        className="fixed pointer-events-none blob-a z-0"
        style={{
          top: -120,
          left: -100,
          width: 440,
          height: 440,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,107,0.22), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="fixed pointer-events-none blob-b z-0"
        style={{
          bottom: -120,
          right: -80,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,92,231,0.22), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ---------------- Navigation Bar ---------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
        <nav
          className="max-w-[1180px] mx-auto flex items-center justify-between rounded-full px-3 py-2"
          style={{
            background: scrolled ? "rgba(16, 17, 33, 0.88)" : "rgba(16, 17, 33, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(18px)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollTo("hero")}
            className="disp font-semibold text-[14px] flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full group"
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-extrabold shadow-sm transition-transform group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FF6B6B, #6C5CE7)",
                color: "#ffffff",
              }}
            >
              SW
            </span>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[13.5px] leading-tight text-white group-hover:text-[#FFA94D] transition-colors">
                Sadaru Wijethunga
              </span>
              <span className="text-[10px] text-gray-400 hidden sm:inline">QA & Full-Stack</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 text-[13px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`pill-link px-4 py-1.5 rounded-full font-medium ${
                    active === item.id ? "is-active" : ""
                  }`}
                  style={{ color: active === item.id ? "#0c0d19" : "#c4c2d8" }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* View Resume Button */}
            <button
              id="nav-resume-btn"
              onClick={() => setShowResumeModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all border border-white/20 hover:border-white/40 hover:bg-white/10 text-white"
            >
              <Icon name="file-text" size={14} />
              <span>Resume</span>
            </button>

            {/* Availability Pill */}
            <div
              className="hidden lg:flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(34, 193, 195, 0.12)",
                border: "1px solid rgba(34, 193, 195, 0.3)",
                color: "#22C1C3",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C1C3] animate-pulse" />
              <span>Available to Hire</span>
            </div>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
              aria-label="Open navigation menu"
            >
              <Icon name="menu" size={18} />
            </button>

            {/* Avatar quick link */}
            <button
              id="nav-avatar-btn"
              onClick={() => scrollTo("about")}
              className="hidden sm:flex w-9 h-9 rounded-full overflow-hidden items-center justify-center flex-shrink-0 border border-white/20 hover:border-[#FF6B6B] transition-colors"
              title="About Sadaru"
            >
              <img src={PROFILE_PHOTO_URL} alt="Sadaru profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </nav>
      </header>

      {/* ---------------- Mobile Drawer ---------------- */}
      <div
        className="fixed inset-0 z-[60] md:hidden"
        style={{
          background: "#101121",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ background: "linear-gradient(135deg,#FF6B6B,#6C5CE7)", color: "#fff" }}
            >
              SW
            </span>
            <span className="disp font-semibold text-[14px] text-white">Sadaru Wijethunga</span>
          </div>
          <button
            id="mobile-drawer-close-btn"
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
            aria-label="Close menu"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <ul className="px-6 pt-6 flex flex-col gap-1">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.id}>
              <button
                id={`drawer-link-${item.id}`}
                onClick={() => scrollTo(item.id)}
                className="w-full flex items-center gap-4 py-3.5 text-left border-b border-white/10"
              >
                <span className="text-[12px] font-mono text-[#6C5CE7]">0{i + 1}</span>
                <span
                  className={`text-[22px] font-semibold disp ${
                    active === item.id ? "text-[#FF6B6B]" : "text-white"
                  }`}
                >
                  {item.label}
                </span>
                <span className="ml-auto text-gray-400">
                  <Icon name="arrow" size={16} />
                </span>
              </button>
            </li>
          ))}
          <li>
            <button
              id="drawer-resume-btn"
              onClick={() => {
                setMenuOpen(false);
                setShowResumeModal(true);
              }}
              className="w-full flex items-center gap-3 py-4 mt-2 text-left font-semibold text-[#FFA94D]"
            >
              <Icon name="file-text" size={18} />
              <span className="text-[17px]">View Interactive Resume</span>
            </button>
          </li>
        </ul>

        <div className="absolute bottom-8 left-6 right-6 flex gap-3">
          <a
            href={PROFILE_GITHUB}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] border border-white/20 bg-white/5 text-white"
          >
            <Icon name="github" size={16} /> GitHub
          </a>
          <a
            href={PROFILE_LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] border border-white/20 bg-white/5 text-white"
          >
            <Icon name="linkedin" size={16} /> LinkedIn
          </a>
        </div>
      </div>

      {/* ---------------- Hero Section ---------------- */}
      <section
        id="hero"
        className="relative z-[2] min-h-screen flex items-center px-6 md:px-14 pt-28 pb-16"
      >
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-[1.18fr_0.82fr] gap-12 md:gap-16 items-center w-full">
          <div className="text-center md:text-left">
            <Reveal>
              <div
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[12px] mb-5 font-medium"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#d0cee2",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#22C1C3] shadow-[0_0_10px_#22C1C3]" />
                <span>BSc (Hons) in Information Technology · SLIIT University</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="text-[13px] font-semibold tracking-[0.25em] mb-2 text-[#9996b8] uppercase">
                Software QA & Full-Stack Developer
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <h1
                className="disp font-extrabold leading-[1.06]"
                style={{ fontSize: "clamp(34px, 5.5vw, 62px)", letterSpacing: "-0.025em" }}
              >
                Hi, I'm <span className="grad-text">Sadaru Wijethunga</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className="mt-5 text-[16px] md:text-[17px] leading-[1.75] max-w-[520px] mx-auto md:mx-0"
                style={{ color: "#c4c2d8" }}
              >
                IT undergraduate bridging <strong>Software Quality Assurance (Playwright test automation)</strong>,
                modern <strong>Android development (Kotlin)</strong>, and <strong>Full-Stack web engineering</strong>.
                I build reliable, test-driven systems that deliver real-world value.
              </p>
            </Reveal>

            {/* Quick highlight pills */}
            <Reveal delay={0.26}>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-6">
                {[
                  "🧪 Playwright QA Automation",
                  "📱 Kotlin Android",
                  "⚛️ React & Node.js",
                  "🗄️ SQL & MongoDB",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Action Buttons */}
            <Reveal delay={0.32}>
              <div className="flex flex-wrap gap-3.5 justify-center md:justify-start mt-8">
                <button
                  id="hero-view-projects-btn"
                  onClick={() => scrollTo("projects")}
                  className="btn-cta rounded-full px-7 py-3 text-[14px] font-semibold flex items-center gap-2"
                  style={{
                    background: "linear-gradient(120deg, #FF6B6B, #FFA94D)",
                    color: "#0c0d19",
                  }}
                >
                  <span>Explore Projects</span>
                  <Icon name="arrow" size={14} />
                </button>

                <button
                  id="hero-resume-btn"
                  onClick={() => setShowResumeModal(true)}
                  className="rounded-full px-6 py-3 text-[14px] font-semibold flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-colors text-white"
                >
                  <Icon name="file-text" size={15} />
                  <span>View Resume</span>
                </button>

                <button
                  id="hero-contact-btn"
                  onClick={() => scrollTo("contact")}
                  className="rounded-full px-6 py-3 text-[14px] font-semibold border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors text-gray-300"
                >
                  Get in Touch
                </button>
              </div>
            </Reveal>

            {/* Socials & Copy Email */}
            <Reveal delay={0.38}>
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mt-7">
                <a
                  href={PROFILE_GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-[12.5px] flex items-center gap-2 border border-white/20 hover:border-white hover:bg-white/10 text-gray-200 transition-all"
                >
                  <Icon name="github" size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={PROFILE_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-[12.5px] flex items-center gap-2 border border-white/20 hover:border-[#0077b5] hover:bg-[#0077b5]/15 text-gray-200 transition-all"
                >
                  <Icon name="linkedin" size={15} />
                  <span>LinkedIn</span>
                </a>
                <button
                  id="hero-copy-email-btn"
                  onClick={copyEmailToClipboard}
                  className="rounded-full px-4 py-2 text-[12.5px] flex items-center gap-2 border border-white/20 hover:border-[#22C1C3] hover:bg-[#22C1C3]/10 text-gray-200 transition-all"
                  title="Click to copy email address"
                >
                  {copiedEmail ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
                  <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* 3D Profile Avatar Card */}
          <Reveal delay={0.2}>
            <div
              className="avatar3d-wrap relative aspect-square max-w-[340px] mx-auto md:mx-0 md:ml-auto"
              style={{ perspective: "1000px" }}
            >
              <div
                className="avatar3d relative w-full h-full rounded-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(140deg, #FF6B6B, #6C5CE7)",
                    transform: "translateZ(-24px) scale(0.96)",
                    filter: "blur(2px)",
                    opacity: 0.8,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center p-2"
                  style={{ background: "linear-gradient(140deg, #FF6B6B, #6C5CE7)" }}
                >
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden bg-[#101121]"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <img
                      src={PROFILE_PHOTO_URL}
                      alt="Sadaru Wijethunga Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 60%)",
                    transform: "translateZ(30px)",
                    mixBlendMode: "overlay",
                  }}
                />
              </div>
              <div
                className="avatar3d-ground absolute left-1/2"
                style={{
                  bottom: -18,
                  width: "72%",
                  height: 24,
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- About Section ---------------- */}
      <section
        id="about"
        className="relative z-[2] px-6 md:px-14 py-28"
        style={{
          background: "radial-gradient(circle at 50% 30%, #1c1d36, #0e0f1e 75%)",
        }}
      >
        <Reveal className="text-center mb-3">
          <div className="text-[12px] font-semibold tracking-wider text-[#FFA94D] uppercase">
            About Me
          </div>
        </Reveal>
        <Reveal delay={0.05} className="text-center mb-14 max-w-[760px] mx-auto">
          <h2 className="disp font-bold" style={{ fontSize: "clamp(26px, 4vw, 42px)", color: "#f5f4fb" }}>
            Precision in Testing, Craftsmanship in Code.
          </h2>
        </Reveal>

        <div
          className="max-w-[1100px] mx-auto rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 items-start"
          style={{
            background: "rgba(255, 255, 255, 0.035)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Left Column */}
          <Reveal>
            <div className="space-y-6">
              <div className="relative aspect-square max-w-[200px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src={PROFILE_PHOTO_URL} alt="Sadaru Wijethunga" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center text-[11px] font-medium text-white/90">
                  SLIIT · IT Undergraduate
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {["QA ENGINEER", "FULL-STACK DEV", "KOTLIN ANDROID", "PROBLEM SOLVER"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold tracking-wide px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stat counters */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="disp font-bold text-[28px] text-white">5+</div>
                  <div className="text-[11.5px] text-gray-400">Shipped Repositories</div>
                </div>
                <div>
                  <div className="disp font-bold text-[28px] text-[#22C1C3]">QA</div>
                  <div className="text-[11.5px] text-gray-400">Playwright Automation</div>
                </div>
                <div>
                  <div className="disp font-bold text-[28px] text-[#FFA94D]">SLIIT</div>
                  <div className="text-[11.5px] text-gray-400">BSc (Hons) IT</div>
                </div>
                <div>
                  <div className="disp font-bold text-[28px] text-[#FF6B6B]">100%</div>
                  <div className="text-[11.5px] text-gray-400">Hands-on Focus</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column Bio */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <p className="text-[16px] leading-[1.8] text-[#c4c2d8]">
                I'm an undergraduate reading for a{" "}
                <strong className="text-white font-semibold">
                  BSc (Hons) in Information Technology at SLIIT, Sri Lanka
                </strong>
                . My professional ambition is centered on becoming a high-impact{" "}
                <strong className="text-white font-semibold">Software QA Engineer & Full-Stack Developer</strong>.
              </p>
              <p className="text-[15.5px] leading-[1.8] text-[#c4c2d8]">
                I believe software quality isn't an afterthought — it's built from the ground up. Whether
                writing automated regression suites with <strong className="text-white">Playwright</strong>,
                crafting native Android apps in <strong className="text-white">Kotlin</strong>, or
                architecting full-stack web solutions in <strong className="text-white">React & Node.js</strong>,
                I focus on robust code, edge-case coverage, and flawless user experiences.
              </p>

              {/* Feature pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="disp text-[13px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <span className="text-[#22C1C3]">🧪</span> QA & Automation
                  </div>
                  <p className="text-[12px] leading-[1.6] text-gray-400">
                    Playwright test suites, functional, negative, UI, and API testing with postman.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="disp text-[13px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <span className="text-[#FF6B6B]">📱</span> Mobile Native
                  </div>
                  <p className="text-[12px] leading-[1.6] text-gray-400">
                    Kotlin, Android Studio, Material Design UI, lifecycle management & clean architectures.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="disp text-[13px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <span className="text-[#FFA94D]">🌐</span> Full-Stack Web
                  </div>
                  <p className="text-[12px] leading-[1.6] text-gray-400">
                    React.js, Tailwind, Node.js, Express, MongoDB, MySQL & secure authentication.
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  id="about-open-resume-btn"
                  onClick={() => setShowResumeModal(true)}
                  className="px-5 py-2.5 rounded-full text-[13px] font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
                >
                  <Icon name="file-text" size={15} />
                  <span>View Detailed Resume</span>
                </button>
                <button
                  id="about-contact-btn"
                  onClick={() => scrollTo("contact")}
                  className="px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#FFA94D] hover:underline flex items-center gap-1.5"
                >
                  <span>Discuss an opportunity</span>
                  <Icon name="arrow" size={13} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- NEW: Journey / Education / Experience ---------------- */}
      <section id="journey" className="relative z-[2] px-6 md:px-14 py-24">
        <Reveal className="text-center mb-14 max-w-[800px] mx-auto">
          <div className="text-[12px] font-semibold mb-2.5 tracking-wider text-[#FFA94D] uppercase">
            Education & Journey
          </div>
          <h2 className="disp font-bold" style={{ fontSize: "clamp(26px, 3.8vw, 38px)" }}>
            Academic Foundation & Practical Milestones
          </h2>
          <p className="mt-3 text-[14px] text-gray-400">
            A continuous progression of technical learning, test automation, and full-stack software delivery.
          </p>
        </Reveal>

        <div className="max-w-[940px] mx-auto space-y-6">
          {JOURNEY_ITEMS.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.08}>
              <div
                className="card-interactive rounded-2xl p-6 md:p-8 bg-white/[0.035] border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                    <h3 className="disp font-bold text-[18px] md:text-[20px] text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#6C5CE7]/20 border border-[#6C5CE7]/40 text-[#c8c4f5]">
                      {item.type}
                    </span>
                    <span className="text-[12px] font-mono text-gray-400">{item.period}</span>
                  </div>
                </div>

                <div className="text-[13.5px] font-medium text-[#FFA94D] mb-3">{item.org}</div>
                <p className="text-[14px] leading-[1.7] text-[#c4c2d8] mb-4">{item.desc}</p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[11.5px] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Skills Section ---------------- */}
      <section id="skills" className="relative z-[2] px-6 md:px-14 py-24 bg-[#0a0b16]/70">
        <Reveal className="text-center mb-14 max-w-[900px] mx-auto">
          <div className="text-[12px] font-semibold mb-2.5 tracking-wider text-[#FFA94D] uppercase">
            Technical Stack
          </div>
          <h2 className="disp font-bold" style={{ fontSize: "clamp(26px, 3.8vw, 38px)" }}>
            Skills & Competencies Across the Stack
          </h2>
          <p className="mt-3 text-[14px] text-gray-400">
            From automated QA testing pipelines to mobile UI and backend REST endpoints.
          </p>
        </Reveal>

        <div className="max-w-[1040px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div
                className="card-interactive rounded-2xl p-6 h-full bg-white/[0.035] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="disp font-bold text-[16px] text-white">{g.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                      {g.badge}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="text-[12px] px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d8d6eb] hover:border-[#6C5CE7] hover:text-white transition-all"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Projects Section ---------------- */}
      <section id="projects" className="relative z-[2] px-6 md:px-14 py-24">
        <Reveal className="text-center mb-8 max-w-[900px] mx-auto">
          <div className="text-[12px] font-semibold mb-2.5 tracking-wider text-[#FFA94D] uppercase">
            Featured Projects
          </div>
          <h2 className="disp font-bold" style={{ fontSize: "clamp(26px, 3.8vw, 38px)" }}>
            Shipped Software & Automation Repos
          </h2>
          <p className="mt-3 text-[14px] text-gray-400">
            Every project links directly to live code on GitHub.
          </p>
        </Reveal>

        {/* Project Category Filter Tabs */}
        <Reveal delay={0.05} className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap p-1.5 rounded-full bg-white/5 border border-white/10 gap-1">
            {[
              { id: "all", label: "All Projects" },
              { id: "qa", label: "QA & Testing" },
              { id: "mobile", label: "Android Apps" },
              { id: "web", label: "Web & Full-Stack" },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`project-tab-${tab.id}`}
                onClick={() => setProjectCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-all ${
                  projectCategory === tab.id
                    ? "bg-gradient-to-r from-[#FF6B6B] to-[#FFA94D] text-[#0c0d19] font-bold shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div
                className="card-interactive rounded-2xl p-6 md:p-7 h-full bg-white/[0.035] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="disp font-bold text-[14px]" style={{ color: p.color }}>
                      {p.n}
                    </span>
                    <span
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{
                        color: p.color,
                        border: `1px solid ${p.color}55`,
                        background: `${p.color}15`,
                      }}
                    >
                      {p.type}
                    </span>
                  </div>

                  <h3 className="disp font-bold text-[20px] text-white mb-2.5">{p.name}</h3>
                  <p className="text-[14px] leading-[1.65] text-[#c4c2d8] mb-4">{p.desc}</p>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-4 text-[12px] text-gray-300">
                    <strong className="text-white">Highlights: </strong>
                    {p.highlights}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10.5px] px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-gray-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold hover:underline"
                    style={{ color: p.color }}
                  >
                    <Icon name="github" size={15} />
                    <span>View Repository</span>
                    <Icon name="arrow" size={13} />
                  </a>
                  <span className="text-[11px] font-mono text-gray-500">github.com/sadaruX3</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Contact Section ---------------- */}
      <section id="contact" className="relative z-[2] px-6 md:px-14 py-28">
        <Reveal
          className="max-w-[880px] mx-auto rounded-3xl p-8 md:p-14"
          style={{
            background: "radial-gradient(circle at 50% 0%, #1e1f3a, #111224)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 60px -20px rgba(0,0,0,0.7)",
          }}
        >
          <div className="text-center mb-10">
            <div className="text-[12px] font-semibold mb-2 tracking-wider text-[#FFA94D] uppercase">
              Get In Touch
            </div>
            <h2 className="disp font-bold text-white mb-4" style={{ fontSize: "clamp(26px, 4vw, 42px)" }}>
              Let's Build Something Great
            </h2>
            <p className="text-[14.5px] max-w-[480px] mx-auto text-[#c4c2d8]">
              Open for Software QA internships, full-time engineering roles, freelance builds, or tech collaborations.
            </p>
          </div>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
            <button
              onClick={copyEmailToClipboard}
              className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#22C1C3] text-left transition-all group"
            >
              <div className="text-[11px] font-mono text-gray-400 mb-1 flex items-center justify-between">
                <span>EMAIL ADDRESS</span>
                <span className="text-[#22C1C3]">{copiedEmail ? "Copied!" : "Click to copy"}</span>
              </div>
              <div className="text-[13px] font-medium text-white truncate">{PROFILE_EMAIL}</div>
            </button>

            <a
              href={PROFILE_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#0077b5] text-left transition-all"
            >
              <div className="text-[11px] font-mono text-gray-400 mb-1">LINKEDIN</div>
              <div className="text-[13px] font-medium text-white truncate">sadaru-wijethunga-bb510b440</div>
            </a>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
              <div className="text-[11px] font-mono text-gray-400 mb-1">LOCATION</div>
              <div className="text-[13px] font-medium text-white">{PROFILE_LOCATION}</div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] text-gray-300 font-medium mb-1.5">Your Name</label>
                <input
                  id="contact-name-input"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Kasun Perera"
                  required
                  className="field w-full rounded-xl px-4 py-3 text-[13.5px] bg-white/[0.04] border border-white/15 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-[12px] text-gray-300 font-medium mb-1.5">Email Address</label>
                <input
                  id="contact-email-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="kasun@company.com"
                  required
                  className="field w-full rounded-xl px-4 py-3 text-[13.5px] bg-white/[0.04] border border-white/15 text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] text-gray-300 font-medium mb-1.5">Your Message</label>
              <textarea
                id="contact-message-input"
                name="message"
                value={form.message}
                onChange={handleFormChange}
                placeholder="Tell me about your project, team opportunity, or inquiry..."
                required
                className="field w-full rounded-xl px-4 py-3 text-[13.5px] h-32 resize-none bg-white/[0.04] border border-white/15 text-white placeholder-gray-500"
              />
            </div>

            <div className="flex flex-col items-center gap-3 pt-2">
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={formStatus === "sending"}
                className="btn-cta rounded-full px-8 py-3.5 text-[14px] font-bold text-[#0c0d19] flex items-center gap-2"
                style={{
                  background: "linear-gradient(120deg, #FF6B6B, #FFA94D)",
                  opacity: formStatus === "sending" ? 0.7 : 1,
                }}
              >
                <span>{formStatus === "sending" ? "Sending Message..." : "Send Message"}</span>
                <Icon name="arrow" size={15} />
              </button>

              {formStatus === "success" && (
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-[13px] text-teal-300 text-center">
                  {formMessage}
                </div>
              )}
              {formStatus === "error" && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-[13px] text-rose-300 text-center">
                  {formMessage}
                </div>
              )}
            </div>
          </form>

          {/* Social Links Footer */}
          <div className="flex flex-wrap justify-center gap-4 pt-10 mt-10 border-t border-white/10">
            <a
              href={PROFILE_GITHUB}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium border border-white/20 hover:border-white hover:bg-white/10 transition-all text-white"
            >
              <Icon name="github" size={16} /> github.com/sadaruX3
            </a>
            <a
              href={PROFILE_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium border border-white/20 hover:border-[#0077b5] hover:bg-[#0077b5]/15 transition-all text-white"
            >
              <Icon name="linkedin" size={16} /> LinkedIn Profile
            </a>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="relative z-[2] px-6 md:px-14 py-10 text-center border-t border-white/5 text-[12px] text-gray-500">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-400">Available for Opportunities (Sri Lanka & Remote)</span>
          </div>
          <div>
            © 2026 Sadaru Wijethunga · BSc (Hons) IT (SLIIT)
          </div>
          <div className="text-gray-400 font-mono text-[11px]">
            React · Vite · Tailwind · Playwright
          </div>
        </div>
      </footer>

      {/* ---------------- Floating Back-to-Top Button ---------------- */}
      {scrolled && (
        <button
          id="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md shadow-lg transition-transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <Icon name="chevron-up" size={18} />
        </button>
      )}

      {/* ---------------- Interactive Resume Modal ---------------- */}
      {showResumeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121324] border border-white/20 p-6 sm:p-10 text-white shadow-2xl"
            style={{ color: "#f5f4fb" }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#FFA94D] uppercase">
                  Curriculum Vitae Preview
                </span>
                <h3 className="disp font-extrabold text-[26px] sm:text-[30px] text-white">
                  Sadaru Wijethunga
                </h3>
                <p className="text-[13px] text-gray-400">
                  QA Engineer & Full-Stack Developer · SLIIT Undergraduate
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="resume-print-btn"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 transition-all text-white"
                >
                  <Icon name="download" size={14} />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  id="resume-close-btn"
                  onClick={() => setShowResumeModal(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="py-6 space-y-6 text-[13.5px] leading-relaxed text-[#c4c2d8]">
              {/* Contact Information Bar */}
              <div className="flex flex-wrap gap-4 text-[12px] font-mono text-gray-300 p-3 rounded-xl bg-white/5 border border-white/10">
                <div>📧 {PROFILE_EMAIL}</div>
                <div>📍 {PROFILE_LOCATION}</div>
                <div>🔗 github.com/sadaruX3</div>
                <div>💼 LinkedIn: sadaru-wijethunga-bb510b440</div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Professional Profile
                </h4>
                <p>
                  Detail-oriented Information Technology undergraduate at SLIIT with a passionate focus on
                  Software Quality Assurance (automated and manual testing) alongside full-stack web and Android
                  application development. Experienced in designing test suites with Playwright, building mobile
                  solutions with Kotlin, and collaborating across modern Git development workflows.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Education
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-white">BSc (Hons) in Information Technology</strong>
                    <span className="text-[12px] font-mono text-gray-400">2022 — Present</span>
                  </div>
                  <div className="text-[#FFA94D] text-[12.5px]">Sri Lanka Institute of Information Technology (SLIIT)</div>
                  <p className="text-[12px] text-gray-400">
                    Relevant Coursework: Software Quality Assurance, Data Structures & Algorithms, Mobile Application
                    Engineering, Web Technology, Database Systems, Object-Oriented Analysis & Design.
                  </p>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Technical Expertise
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px]">
                  <li>• <strong className="text-white">QA Automation:</strong> Playwright, Postman API, Positive/Negative Cases</li>
                  <li>• <strong className="text-white">Languages:</strong> JavaScript, Kotlin, Java, Python, PHP, SQL</li>
                  <li>• <strong className="text-white">Web:</strong> React.js, Node.js, Express, HTML5, CSS3, Tailwind</li>
                  <li>• <strong className="text-white">Mobile:</strong> Android Studio, Kotlin, XML Layouts, Material Design</li>
                  <li>• <strong className="text-white">Databases:</strong> MongoDB, MySQL, Relational Database Modeling</li>
                  <li>• <strong className="text-white">DevOps & Tools:</strong> Git, GitHub, VS Code, REST APIs, npm/Vite</li>
                </ul>
              </div>

              {/* Highlighted Projects */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Key Projects & Case Studies
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline font-semibold text-white">
                      <span>Singlish → Sinhala QA Test Suite (Playwright)</span>
                      <span className="text-[11.5px] font-mono text-gray-400">QA Automation</span>
                    </div>
                    <p className="text-[12.5px] text-gray-300 mt-1">
                      Designed full end-to-end test suite using Playwright covering boundary conditions, UI feedback,
                      and error matrices for real-time linguistic transliteration engine.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline font-semibold text-white">
                      <span>MindWell Wellness Android App (Kotlin)</span>
                      <span className="text-[11.5px] font-mono text-gray-400">Mobile Engineering</span>
                    </div>
                    <p className="text-[12.5px] text-gray-300 mt-1">
                      Developed native Android application for mood and hydration tracking with responsive Material UI
                      and local persistence.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline font-semibold text-white">
                      <span>MERN Stack University Platform</span>
                      <span className="text-[11.5px] font-mono text-gray-400">Full-Stack Web</span>
                    </div>
                    <p className="text-[12.5px] text-gray-300 mt-1">
                      Collaborative academic project implementing complete client-server CRUD architecture, REST API routes,
                      and modern state management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-5 py-2 rounded-full text-[13px] border border-white/20 text-gray-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-full text-[13px] font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFA94D] text-[#0c0d19]"
              >
                Print / Save Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
