import React, { useEffect, useRef, useState } from "react";

/* ---------------- Portfolio Data ---------------- */

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

// Web3Forms access key
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
const PROFILE_NAME = "Sadaru Wijethunga";
const PROFILE_EMAIL = "saviwijethunga2002@gmail.com";
const PROFILE_PHONE = "+94 77 035 1127";
const PROFILE_PHONE_RAW = "+94770351127";
const PROFILE_LOCATION = "Matara, Sri Lanka";
const PROFILE_GITHUB = "https://github.com/sadaruX3";
const PROFILE_LINKEDIN = "https://www.linkedin.com/in/sadaru-wijethunga-bb510b440";
const PROFILE_PHOTO_URL = "https://github.com/sadaruX3.png";

// 8 Skill Groups matching official CV
const SKILL_GROUPS = [
  {
    title: "Backend",
    badge: "Enterprise & APIs",
    items: ["Spring Boot", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Frontend",
    badge: "Web UI",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "Languages",
    badge: "Core",
    items: ["Java", "PHP", "Python", "Kotlin"],
  },
  {
    title: "Databases",
    badge: "Data",
    items: ["MySQL", "MongoDB"],
  },
  {
    title: "Testing & API",
    badge: "QA & Automation",
    items: ["Postman", "Playwright"],
  },
  {
    title: "Tools",
    badge: "Dev Workflow",
    items: ["Git", "GitHub", "Vite", "IntelliJ IDEA", "VS Code", "Eclipse", "Android Studio"],
  },
  {
    title: "Design & Prototyping Tools",
    badge: "UI/UX",
    items: ["Figma", "Mockflow"],
  },
  {
    title: "Soft Skills",
    badge: "Professional",
    items: ["Problem-Solving", "Critical Thinking", "Team Player", "Effective Communication"],
  },
];

// Education & Journey matching official CV
const JOURNEY_ITEMS = [
  {
    period: "2023 — Present",
    title: "BSc (Hons) in Information Technology",
    org: "Sri Lanka Institute of Information Technology (SLIIT)",
    type: "Education",
    desc: "Third-year BSc (Hons) Information Technology undergraduate at SLIIT with hands-on experience in Java, Spring Boot, React.js, Node.js, MongoDB, MySQL, and Android development. Developed academic and personal projects involving web applications, REST APIs, database management, UI development, and software testing. Seeking an internship opportunity.",
    highlights: ["Third-Year Undergraduate", "Java & Spring Boot + MERN", "Android (Kotlin)", "Software Testing (Playwright & Postman)"],
  },
  {
    period: "2024 — 2025",
    title: "Full-Stack Web & Backend Engineering",
    org: "JW-Studio Management & Web Applications",
    type: "Engineering",
    desc: "Developed Feedback and Question Management modules for both client and admin interfaces using React.js, Node.js, Express.js, and MongoDB. Engineered Java Event Management CRUD systems and designed responsive authentication interfaces in PHP.",
    highlights: ["JW-Studio MERN Platform", "Java & MySQL CRUD Modules", "Secure REST APIs", "Git Teamwork"],
  },
  {
    period: "2023 — 2024",
    title: "Android Mobile Development & QA Testing",
    org: "InShotLK, MindWell & Automation Suites",
    type: "Mobile & QA",
    desc: "Engineered responsive Android applications in Kotlin (InShotLK Camera Store e-commerce & MindWell wellness tracker) following Android development principles. Designed and executed automated testing suites with Playwright and Postman API validation.",
    highlights: ["InShotLK Camera Store", "MindWell Wellness Tracker", "Playwright QA Automation", "Postman API Testing"],
  },
];

// Featured Projects with exact CV bullet points
const PROJECTS = [
  {
    n: "01",
    name: "JW-Studio Management System",
    category: "web",
    type: "Web · Full-Stack Platform",
    desc: "Comprehensive web platform for studio management featuring dedicated client and administrator interfaces with full client-server data synchronization.",
    bullets: [
      "Developed Feedback and Question Management modules for both client and admin interfaces.",
      "Built responsive React.js interfaces for creating, viewing, updating, and managing feedback and questions.",
      "Developed backend REST APIs using Node.js and Express.js.",
      "Integrated MongoDB for persistent data storage and retrieval.",
      "Collaborated with team members using Git/GitHub to integrate modules into the overall application.",
    ],
    highlights: "Feedback & Question modules, React.js UI, Node/Express REST APIs & MongoDB persistence",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Git/GitHub"],
    source: "https://github.com/theshanGeeth123/MERN-Y2S2-PROJECT",
    color: "#6C5CE7",
  },
  {
    n: "02",
    name: "InShotLK – Online Camera Store",
    category: "mobile",
    type: "Android · E-Commerce App",
    desc: "Mobile store application for browsing, renting, and purchasing cameras, lenses, and cinematography equipment with a streamlined shopping experience.",
    bullets: [
      "Developed an Android e-commerce application for browsing, renting, and purchasing cameras and accessories.",
      "Implemented product browsing, search, promotional offers, and top-deal sections.",
      "Designed responsive Android interfaces using Kotlin following Android development principles.",
    ],
    highlights: "Camera rental & sales catalog, smart search, promotional deals & responsive Kotlin UI",
    stack: ["Kotlin", "Android", "Gradle", "Android Studio"],
    source: "https://github.com/sadaruX3/online-Camera-Store-",
    color: "#FFA94D",
  },
  {
    n: "03",
    name: "MindWell – Wellness & Habit Tracking Application",
    category: "mobile",
    type: "Android · Health & Lifestyle",
    desc: "Native Android application dedicated to personal wellness, enabling users to log moods, daily hydration, and healthy lifestyle routines.",
    bullets: [
      "Developed an Android application for tracking mood, hydration, and daily habits.",
      "Implemented user interfaces for recording and monitoring daily activities.",
      "Designed an intuitive mobile experience focused on simple navigation and user interaction.",
    ],
    highlights: "Habit monitoring, daily hydration tracking, intuitive navigation & responsive Kotlin UI",
    stack: ["Kotlin", "Android", "Gradle", "Android Studio"],
    source: "https://github.com/sadaruX3/Wellness-app",
    color: "#FF6B6B",
  },
  {
    n: "04",
    name: "Online Event Planning System",
    category: "java",
    type: "Java · Event Management CRUD",
    desc: "Backend event planning and coordination module with complete CRUD functionality, MySQL database integration, and reliable data handling.",
    bullets: [
      "Developed the Event Management module with complete CRUD functionality.",
      "Developed backend functionality for creating, retrieving, updating, and deleting event records.",
      "Designed and integrated MySQL database tables for event data management.",
      "Implemented database operations for efficient event creation, retrieval, modification, and deletion.",
    ],
    highlights: "Full CRUD Event module, Java backend logic, MySQL relational tables & data persistence",
    stack: ["Java", "HTML", "CSS", "MySQL"],
    source: "https://github.com/sadaruX3",
    color: "#22C1C3",
  },
  {
    n: "05",
    name: "Online Pharmacy Authentication UI",
    category: "web",
    type: "Web · Modern Auth System",
    desc: "Modern, responsive authentication interface for an online pharmacy system with dedicated split-panel layouts for Sign In and Sign Up.",
    bullets: [
      "Developed a responsive authentication interface for an online pharmacy system, focusing on user-friendly Sign In and Sign Up experiences.",
      "Designed a modern authentication interface with responsive layouts and smooth UI transitions.",
      "Applied HTML, CSS, JavaScript, and PHP to implement the frontend interface and authentication-related functionality.",
    ],
    highlights: "Clean split-screen auth UI, smooth layout transitions & PHP authentication logic",
    stack: ["PHP", "HTML", "CSS", "JavaScript"],
    source: "https://github.com/sadaruX3/online-pharmacy-auth-ui",
    color: "#A29BFE",
  },
  {
    n: "06",
    name: "Singlish → Sinhala Test Suite",
    category: "qa",
    type: "QA · Test Automation Suite",
    desc: "End-to-end automated testing suite for a Singlish transliteration engine using Playwright, validating linguistic boundary conditions and UI reactivity.",
    bullets: [
      "Designed automated test suite using Playwright test runner.",
      "Structured positive, negative, and edge-case transliteration matrices.",
      "Validated UI reactivity, input-output correctness, and automated regression suites.",
    ],
    highlights: "Playwright test runner, rigorous validation matrix & boundary tests",
    stack: ["Playwright", "Postman", "JavaScript", "Software Testing"],
    source: "https://github.com/sadaruX3/IT23643536-ITPM-Assigment-01",
    color: "#20BF6B",
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
  if (name === "phone")
    return (
      <svg {...c}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

/* ---------------- Main Portfolio Component ---------------- */

export default function PortfolioV3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectCategory, setProjectCategory] = useState("all");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(PROFILE_PHONE).then(() => {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 3000);
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

      {/* Top Reading Progress Bar */}
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
              <span className="text-[10px] text-gray-400 hidden sm:inline">Undergraduate · SLIIT</span>
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

            {/* Avatar link */}
            <button
              id="nav-avatar-btn"
              onClick={() => scrollTo("about")}
              className="w-9 h-9 rounded-full overflow-hidden items-center justify-center flex-shrink-0 border border-white/20 hover:border-[#FF6B6B] transition-colors"
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
              <Icon name="download" size={18} />
              <span className="text-[17px]">CV Download (PDF)</span>
            </button>
          </li>
        </ul>

        <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-3">
          <div className="flex gap-3">
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
          <a
            href={`tel:${PROFILE_PHONE_RAW}`}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12.5px] border border-white/10 bg-white/[0.03] text-gray-300"
          >
            <Icon name="phone" size={14} /> {PROFILE_PHONE}
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
                <span>Third-year BSc (Hons) in Information Technology · SLIIT (2023 - Present)</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="text-[13px] font-semibold tracking-[0.25em] mb-2 text-[#9996b8] uppercase">
                Undergraduate · Software Engineering & Full-Stack
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
                className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.8] max-w-[560px] mx-auto md:mx-0"
                style={{ color: "#c4c2d8" }}
              >
                Third-year BSc (Hons) Information Technology undergraduate at SLIIT with hands-on experience in{" "}
                <strong className="text-white">Java, Spring Boot, React.js, Node.js, MongoDB, MySQL</strong>, and{" "}
                <strong className="text-white">Android development</strong>. Developed academic and personal projects
                involving web applications, REST APIs, database management, UI development, and software testing.
                Seeking an internship opportunity where I can apply my technical skills, gain industry experience, and
                contribute to effective software solutions.
              </p>
            </Reveal>

            {/* Quick highlight pills */}
            <Reveal delay={0.26}>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-6">
                {[
                  "☕ Java & Spring Boot",
                  "⚛️ React.js & Node.js",
                  "📱 Kotlin Android",
                  "🗄️ MySQL & MongoDB",
                  "🧪 Postman & Playwright",
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
                  id="hero-cv-btn"
                  onClick={() => setShowResumeModal(true)}
                  className="rounded-full px-6 py-3 text-[14px] font-semibold flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-colors text-white"
                >
                  <Icon name="download" size={15} />
                  <span>Download CV</span>
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

            {/* Socials, Phone & Copy Email */}
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
            Engineering Reliable Web, Mobile & Enterprise Solutions.
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
                  SLIIT · 2023 - Present
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  "JAVA & SPRING BOOT",
                  "REACT.JS & NODE.JS",
                  "ANDROID & KOTLIN",
                  "MYSQL & MONGODB",
                  "SOFTWARE TESTING",
                ].map((tag) => (
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
                  <div className="disp font-bold text-[28px] text-white">3rd Year</div>
                  <div className="text-[11.5px] text-gray-400">SLIIT IT Undergraduate</div>
                </div>
                <div>
                  <div className="disp font-bold text-[28px] text-[#22C1C3]">5+</div>
                  <div className="text-[11.5px] text-gray-400">Shipped Projects</div>
                </div>
                <div>
                  <div className="disp font-bold text-[28px] text-[#FFA94D]">Full-Stack</div>
                  <div className="text-[11.5px] text-gray-400">Java & MERN Stack</div>
                </div>
                <div>
                  <div className="disp font-bold text-[28px] text-[#FF6B6B]">Internship</div>
                  <div className="text-[11.5px] text-gray-400">Seeking Opportunities</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column Bio */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <p className="text-[16px] leading-[1.8] text-[#c4c2d8]">
                I am a{" "}
                <strong className="text-white font-semibold">
                  Third-year BSc (Hons) Information Technology undergraduate at SLIIT, Sri Lanka (2023 - Present)
                </strong>
                . I possess hands-on experience in{" "}
                <strong className="text-white font-semibold">
                  Java, Spring Boot, React.js, Node.js, MongoDB, MySQL, and Android development
                </strong>
                .
              </p>
              <p className="text-[15.5px] leading-[1.8] text-[#c4c2d8]">
                Throughout my academic and personal endeavors, I have engineered full-featured web applications,
                REST APIs, database management architectures, interactive UIs, and automated software test suites.
                I am actively seeking an <strong className="text-white">internship opportunity</strong> where I can apply
                my technical skills, gain valuable industry experience, and contribute to effective software solutions.
              </p>

              {/* Feature pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="disp text-[13px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <span className="text-[#FFA94D]">☕</span> Backend & Java
                  </div>
                  <p className="text-[12px] leading-[1.6] text-gray-400">
                    Java, Spring Boot, Node.js, Express.js, REST APIs & CRUD database systems.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="disp text-[13px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <span className="text-[#6C5CE7]">🌐</span> Frontend & UI
                  </div>
                  <p className="text-[12px] leading-[1.6] text-gray-400">
                    React.js, Tailwind CSS, HTML5, CSS3, Figma prototyping & responsive layouts.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="disp text-[13px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <span className="text-[#22C1C3]">📱</span> Mobile & QA
                  </div>
                  <p className="text-[12px] leading-[1.6] text-gray-400">
                    Kotlin Android apps with Gradle, Postman API testing & Playwright test suites.
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  id="about-open-cv-btn"
                  onClick={() => setShowResumeModal(true)}
                  className="px-5 py-2.5 rounded-full text-[13px] font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
                >
                  <Icon name="download" size={15} />
                  <span>Download CV</span>
                </button>
                <button
                  id="about-contact-btn"
                  onClick={() => scrollTo("contact")}
                  className="px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#FFA94D] hover:underline flex items-center gap-1.5"
                >
                  <span>Discuss Internship Opportunities</span>
                  <Icon name="arrow" size={13} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Journey / Education Section ---------------- */}
      <section id="journey" className="relative z-[2] px-6 md:px-14 py-24">
        <Reveal className="text-center mb-14 max-w-[800px] mx-auto">
          <div className="text-[12px] font-semibold mb-2.5 tracking-wider text-[#FFA94D] uppercase">
            Education & Journey
          </div>
          <h2 className="disp font-bold" style={{ fontSize: "clamp(26px, 3.8vw, 38px)" }}>
            Academic Foundation & Practical Milestones
          </h2>
          <p className="mt-3 text-[14px] text-gray-400">
            A solid educational trajectory at SLIIT combined with practical project engineering across modern tech stacks.
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
            Languages, frameworks, databases, and testing tools utilized across projects.
          </p>
        </Reveal>

        <div className="max-w-[1040px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04}>
              <div
                className="card-interactive rounded-2xl p-5 h-full bg-white/[0.035] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="disp font-bold text-[15px] text-white">{g.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                      {g.badge}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="text-[12px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#d8d6eb] hover:border-[#6C5CE7] hover:text-white transition-all"
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
            Shipped Applications & Technical Projects
          </h2>
          <p className="mt-3 text-[14px] text-gray-400">
            Real-world systems, mobile applications, and enterprise modules developed to date.
          </p>
        </Reveal>

        {/* Project Category Filter Tabs */}
        <Reveal delay={0.05} className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap p-1.5 rounded-full bg-white/5 border border-white/10 gap-1">
            {[
              { id: "all", label: "All Projects" },
              { id: "web", label: "Web & Full-Stack" },
              { id: "mobile", label: "Android Apps" },
              { id: "java", label: "Java & Enterprise" },
              { id: "qa", label: "QA & Testing" },
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
            <Reveal key={p.name} delay={i * 0.05}>
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

                  <h3 className="disp font-bold text-[19px] md:text-[20px] text-white mb-2.5">{p.name}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-[#c4c2d8] mb-4">{p.desc}</p>

                  {/* Bullet Points from CV */}
                  <div className="mb-4 space-y-1.5 text-[12.5px] text-gray-300">
                    {p.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#FFA94D] mt-0.5">•</span>
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>

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
          className="max-w-[940px] mx-auto rounded-3xl p-8 md:p-14"
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
              Let's Connect & Collaborate
            </h2>
            <p className="text-[14.5px] max-w-[560px] mx-auto text-[#c4c2d8]">
              Seeking an internship opportunity where I can apply my technical skills, gain industry experience, and
              contribute to effective software solutions.
            </p>
          </div>

          {/* Direct Contact Cards - 4 items matching CV */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
            {/* Email */}
            <button
              onClick={copyEmailToClipboard}
              className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#22C1C3] text-left transition-all group"
            >
              <div className="text-[11px] font-mono text-gray-400 mb-1 flex items-center justify-between">
                <span>EMAIL ADDRESS</span>
                <span className="text-[#22C1C3]">{copiedEmail ? "Copied!" : "Copy"}</span>
              </div>
              <div className="text-[12.5px] font-medium text-white truncate">{PROFILE_EMAIL}</div>
            </button>

            {/* Phone */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FFA94D] text-left transition-all">
              <div className="text-[11px] font-mono text-gray-400 mb-1 flex items-center justify-between">
                <span>PHONE / WHATSAPP</span>
                <button
                  onClick={copyPhoneToClipboard}
                  className="text-[#FFA94D] hover:underline"
                  title="Copy Phone"
                >
                  {copiedPhone ? "Copied!" : "Copy"}
                </button>
              </div>
              <a
                href={`tel:${PROFILE_PHONE_RAW}`}
                className="text-[12.5px] font-medium text-white hover:text-[#FFA94D] transition-colors block"
              >
                {PROFILE_PHONE}
              </a>
            </div>

            {/* Location */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
              <div className="text-[11px] font-mono text-gray-400 mb-1">LOCATION</div>
              <div className="text-[12.5px] font-medium text-white">{PROFILE_LOCATION}</div>
            </div>

            {/* LinkedIn */}
            <a
              href={PROFILE_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#0077b5] text-left transition-all"
            >
              <div className="text-[11px] font-mono text-gray-400 mb-1">LINKEDIN</div>
              <div className="text-[12.5px] font-medium text-white truncate">sadaru-wijethunga</div>
            </a>
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
                placeholder="Tell me about your internship opportunity, project, or inquiry..."
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
            <a
              href={`tel:${PROFILE_PHONE_RAW}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium border border-white/20 hover:border-[#FFA94D] hover:bg-[#FFA94D]/10 transition-all text-white"
            >
              <Icon name="phone" size={16} /> {PROFILE_PHONE}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="relative z-[2] px-6 md:px-14 py-10 text-center border-t border-white/5 text-[12px] text-gray-500">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-400">Seeking Internship Opportunities (Colombo & Remote)</span>
          </div>
          <div>
            © 2026 Sadaru Wijethunga · BSc (Hons) IT (SLIIT)
          </div>
          <div className="text-gray-400 font-mono text-[11px]">
            Java · Spring Boot · React · Node.js · Kotlin
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
            className="relative w-full max-w-[840px] max-h-[92vh] overflow-y-auto rounded-3xl bg-[#121324] border border-white/20 p-6 sm:p-10 text-white shadow-2xl"
            style={{ color: "#f5f4fb" }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#FFA94D] uppercase">
                  Curriculum Vitae (CV)
                </span>
                <h3 className="disp font-extrabold text-[26px] sm:text-[30px] text-white">
                  SADARU WIJETHUNGA
                </h3>
                <p className="text-[13px] font-semibold text-[#6C5CE7] tracking-wider uppercase">
                  UNDERGRADUATE
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  id="cv-download-btn-header"
                  href="/Sadaru_Wijethunga_CV.pdf"
                  download="Sadaru_Wijethunga_CV.pdf"
                  className="px-4 py-2 rounded-full text-[12px] font-semibold bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 transition-all text-white"
                >
                  <Icon name="download" size={14} />
                  <span>CV Download (PDF)</span>
                </a>
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
                <div>📞 {PROFILE_PHONE}</div>
                <div>📍 Matara</div>
                <div>🐙 github.com/sadaruX3</div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Professional Profile
                </h4>
                <p>
                  Third-year BSc (Hons) Information Technology undergraduate at SLIIT with hands-on experience in
                  Java, Spring Boot, React.js, Node.js, MongoDB, MySQL, and Android development. Developed academic
                  and personal projects involving web applications, REST APIs, database management, UI development,
                  and software testing. Seeking an internship opportunity where I can apply my technical skills,
                  gain industry experience, and contribute to effective software solutions.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Education
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-white text-[14.5px]">Sri Lanka Institute of Information Technology</strong>
                    <span className="text-[12px] font-mono text-[#FFA94D] font-bold">2023 - Present</span>
                  </div>
                  <div className="text-[#22C1C3] text-[13px]">BSc (Hons) in Information Technology</div>
                </div>
              </div>

              {/* Skills - 8 groups matching CV */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Skills
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Languages:</span>
                    <span>Java, PHP, Python, Kotlin</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Frontend:</span>
                    <span>React.js, HTML5, CSS3, Tailwind CSS</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Backend:</span>
                    <span>Spring Boot, Node.js, Express.js</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Databases:</span>
                    <span>MySQL, MongoDB</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Testing & API:</span>
                    <span>Postman, Playwright</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Tools:</span>
                    <span>Git, GitHub, Vite, IntelliJ IDEA, VS Code, Eclipse, Android Studio</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Design & Prototyping Tools:</span>
                    <span>Figma, Mockflow</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-0.5">Soft Skills:</span>
                    <span>Problem-Solving, Critical Thinking, Team Player, Effective Communication</span>
                  </div>
                </div>
              </div>

              {/* Projects matching CV */}
              <div>
                <h4 className="disp font-bold text-[15px] text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Projects
                </h4>
                <div className="space-y-4">
                  {/* P1 */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-semibold text-white">
                      <span className="text-[14px]">JW-Studio Management System</span>
                      <span className="text-[11.5px] font-mono text-[#6C5CE7]">React.js | Node.js | Express.js | MongoDB</span>
                    </div>
                    <ul className="text-[12.5px] text-gray-300 mt-1.5 space-y-1 pl-3 list-disc">
                      <li>Developed Feedback and Question Management modules for both client and admin interfaces.</li>
                      <li>Built responsive React.js interfaces for creating, viewing, updating, and managing feedback and questions.</li>
                      <li>Developed backend REST APIs using Node.js and Express.js.</li>
                      <li>Integrated MongoDB for persistent data storage and retrieval.</li>
                      <li>Collaborated with team members using Git/GitHub to integrate modules into the overall application.</li>
                    </ul>
                  </div>

                  {/* P2 */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-semibold text-white">
                      <span className="text-[14px]">InShotLK – Online Camera Store</span>
                      <span className="text-[11.5px] font-mono text-[#FFA94D]">Kotlin | Android | Gradle</span>
                    </div>
                    <ul className="text-[12.5px] text-gray-300 mt-1.5 space-y-1 pl-3 list-disc">
                      <li>Developed an Android e-commerce application for browsing, renting, and purchasing cameras and accessories.</li>
                      <li>Implemented product browsing, search, promotional offers, and top-deal sections.</li>
                      <li>Designed responsive Android interfaces using Kotlin following Android development principles.</li>
                    </ul>
                  </div>

                  {/* P3 */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-semibold text-white">
                      <span className="text-[14px]">MindWell – Wellness & Habit Tracking Application</span>
                      <span className="text-[11.5px] font-mono text-[#FF6B6B]">Kotlin | Android | Gradle</span>
                    </div>
                    <ul className="text-[12.5px] text-gray-300 mt-1.5 space-y-1 pl-3 list-disc">
                      <li>Developed an Android application for tracking mood, hydration, and daily habits.</li>
                      <li>Implemented user interfaces for recording and monitoring daily activities.</li>
                      <li>Designed an intuitive mobile experience focused on simple navigation and user interaction.</li>
                    </ul>
                  </div>

                  {/* P4 */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-semibold text-white">
                      <span className="text-[14px]">Online Event Planning System</span>
                      <span className="text-[11.5px] font-mono text-[#22C1C3]">Java | HTML | CSS | MySQL</span>
                    </div>
                    <ul className="text-[12.5px] text-gray-300 mt-1.5 space-y-1 pl-3 list-disc">
                      <li>Developed the Event Management module with complete CRUD functionality.</li>
                      <li>Developed backend functionality for creating, retrieving, updating, and deleting event records.</li>
                      <li>Designed and integrated MySQL database tables for event data management.</li>
                      <li>Implemented database operations for efficient event creation, retrieval, modification, and deletion.</li>
                    </ul>
                  </div>

                  {/* P5 */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-semibold text-white">
                      <span className="text-[14px]">Online Pharmacy Authentication UI</span>
                      <span className="text-[11.5px] font-mono text-[#A29BFE]">PHP | HTML | CSS | JavaScript</span>
                    </div>
                    <ul className="text-[12.5px] text-gray-300 mt-1.5 space-y-1 pl-3 list-disc">
                      <li>Developed a responsive authentication interface for an online pharmacy system, focusing on user-friendly Sign In and Sign Up experiences.</li>
                      <li>Designed a modern authentication interface with responsive layouts and smooth UI transitions.</li>
                      <li>Applied HTML, CSS, JavaScript, and PHP to implement the frontend interface and authentication-related functionality.</li>
                    </ul>
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
              <a
                id="cv-download-btn-footer"
                href="/Sadaru_Wijethunga_CV.pdf"
                download="Sadaru_Wijethunga_CV.pdf"
                className="px-6 py-2.5 rounded-full text-[13px] font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFA94D] text-[#0c0d19] flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Icon name="download" size={15} />
                <span>CV Download (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
