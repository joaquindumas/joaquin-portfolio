import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  FolderOpen,
  ChevronRight,
  Eye,
  Bot,
  Database,
  ExternalLink,
  Settings2,
  GraduationCap,
  Award,
  CheckCircle2,
  Briefcase,
  Cpu,
  Sun,
  Moon,
  Palette,
  X,
  Image as ImageIcon,
} from "lucide-react";

// --- IMPORT YOUR IMAGES HERE ---
import profilePic from "./assets/grad.png";
import resume from "./assets/joaquindumas_resume.pdf";

// Helper to match multiple formats
// This looks for .webp, .jpg, .jpeg, or .png
const imgPattern = './assets/*.{webp,jpg,jpeg,png}'; 

// 1. Vision Guard Images
const vgGlob = import.meta.glob('./assets/vg-*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' });
const vgImages = Object.values(vgGlob); 
const [vg1, vg2, vg3, vg4, vg5, vg6, vg7, vg8] = vgImages;

// 2. National Museum Images
const museumGlob = import.meta.glob('./assets/nu-*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' });
const museumImages = Object.values(museumGlob); 
const [nu1, nu2, nu3, nu4, nu5, nu6, nu7, nu8] = museumImages;

// 3. Conveyor Belt Images
const cbGlob = import.meta.glob('./assets/cb-*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' });
const cbImages = Object.values(cbGlob); 
const [cb1] = cbImages;

// 4. Line Follower Images
const lfGlob = import.meta.glob('./assets/lf-*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' });
const lfImages = Object.values(lfGlob); 
const [lf1, lf2] = lfImages;
// --- DATA ---

const projects = [
  {
    title: "Vision Guard",
    year: "2025",
    desc: "Real-time person detection system utilizing YOLO and OpenCV. Optimized for low latency (<200ms) with 98% detection accuracy.",
    tags: ["Python", "YOLOv8", "OpenCV"],
    icon: <Eye className="w-5 h-5" />,
    images: [vg1, vg3, vg2, vg4, vg5].filter(Boolean),
  },
  {
    title: "Line Following Robot",
    year: "2025",
    desc: "Embedded firmware for PIC16 microcontrollers. Direct register manipulation for sensor processing and stepper motor control.",
    tags: ["PIC 16", "C++", "Embedded"],
    icon: <Bot className="w-5 h-5" />,
    images: [lf1, lf2].filter(Boolean),
  },
  {
    title: "Thesis System",
    year: "2024",
    desc: "Full-stack web application for academic process management. Normalized RDBMS design reduced redundancy by 30%.",
    tags: ["PHP", "MySQL", "JS"],
    icon: <Database className="w-5 h-5" />,
    images: [],
  },
  {
    title: "Conveyor Belt System",
    year: "2025",
    desc: "Designed DC motor control circuits, optimizing torque and speed for reliable material handling.",
    tags: ["Arduino", "C++", "Circuit"],
    icon: <Settings2 className="w-5 h-5" />,
    images: [cb1].filter(Boolean),
  },
];

// 2. Graphic Design Projects
// CHANGELOG: Restored 2nd item for visual balance
const designProjects = [
  {
    title: "National Museum Exhibition",
    year: "2023",
    role: "Graphic Designer",
    desc: "Designed large-scale informative panels and visual layouts for the National University Museum. Focused on historical accuracy and visual hierarchy.",
    tags: ["Adobe Illustrator", "Layout", "Print Design"],
    link: "https://www.manilatimes.net/2023/11/20/photos/national-university-museum/1920737",
    images: [nu8, nu2, nu1, nu3, nu7, nu4, nu5, nu6].filter(Boolean),
  },
  {
    title: "Book Cover Design for 'Architectural Wonders'",
    year: "2026",
    role: "Photographer & Designer",
    desc: "Complete branding package including logo design, typography selection, and social media assets for a tech startup.",
    tags: ["Photoshop", "Branding", "Figma"],
    
    images: [
      "",
    ],
  },
];

const certifications = [
  "Deep Learning 101: Neural Networks",
  "Microsoft Azure Seminar",
  "PLC Programming & Logic Design",
  "Open Standard SIP Based Telephone System",
];

const skills = {
  languages: [
    "Python",
    "C / C++",
    "JavaScript",
    "TypeScript",
    "Java",
    "SQL",
    "PHP",
  ],
  frameworks: [
    "React",
    "Node.js",
    "Flutter",
    "Tailwind CSS",
    "OpenCV",
    "Arduino",
    "MPLAB X",
    "Cisco Packet Tracker",
    "Android Studio",
    "EagleCAD",
    "Git",
    "XAMPP",
  ],
  specialized: [
    "Computer Vision",
    "Embedded Architecture",
    "PCB Design",
    "Deep Learning",
    "Digital Marketing",
    "Video Editing",
  ],
};

// --- Sub-Components ---

const SkillBadge = ({ text }) => (
  <span
    className="px-3 py-1.5 rounded-md text-xs font-medium border cursor-default transition-all duration-200 
    bg-gray-100 text-gray-700 border-gray-200 
    hover:bg-gray-200 hover:scale-105
    dark:bg-[#1c1c1e] dark:text-[#d1d1d6] dark:border-white/10 
    dark:hover:bg-white/10 dark:hover:text-white"
  >
    {text}
  </span>
);

// New Component: The Gallery Modal
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl flex flex-col">
        
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{project.tags?.join(" • ")}</p>
          </div>

          <div className="flex items-center gap-2">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                View Live <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            {project.desc}
          </p>

          {project.images && project.images.length > 0 ? (
            <div className="grid gap-6">
              {project.images.map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm bg-gray-50 dark:bg-white/5 min-h-[200px]">
                  {/* PERFORMANCE FIXES HERE */}
                  <img 
                    src={img} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    className="w-full h-auto object-cover"
                    loading="lazy"         // <--- 1. Lazy load: Only load when scrolled into view
                    decoding="async"       // <--- 2. Async decoding: Prevents UI freeze while parsing image
                    width="800"            // <--- 3. Hinting width helps browser reserve space
                    height="600"           // <--- 4. Hinting height
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl">
              <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
              <p>No images available for this project yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const Portfolio = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    console.log(`[Interaction] Theme toggled. Dark mode: ${!isDark}`);
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    console.log(`[Interaction] Project viewed: ${project.title}`);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 100;
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <div
      className={`min-h-screen antialiased selection:bg-blue-500/20 selection:text-blue-500 overflow-x-hidden relative transition-colors duration-300
      bg-[#faf8f2] text-[#3f3f46]
      dark:bg-[#050505] dark:text-[#86868b]`}
    >
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <nav
        className="fixed top-0 w-full z-40 transition-all duration-300 backdrop-blur-xl border-b 
        bg-white/80 border-black/5
        dark:bg-[#050505]/70 dark:border-white/[0.08]"
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="#"
            className="font-semibold tracking-tight text-sm flex items-center gap-2 transition-colors
            text-gray-900 hover:text-black
            dark:text-[#f5f5f7] dark:hover:text-white"
          >
            Joaquin Miguel Dumas
          </a>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://github.com/joaquindumas"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 transition-colors
              text-gray-500 hover:text-black
              dark:text-[#86868b] dark:hover:text-white"
            >
              <Github className="w-3.5 h-3.5" />
              Github
            </a>
            <a
              href="https://linkedin.com/in/imjoaquindumas"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 transition-colors
              text-gray-500 hover:text-black
              dark:text-[#86868b] dark:hover:text-white"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>

            <div className="h-4 w-px bg-gray-300 dark:bg-white/10 hidden sm:block mx-1"></div>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-[#f5f5f7]"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <a
              href="mailto:imjoaquindumas@gmail.com"
              className="px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-2 hover:scale-105 active:scale-95
              bg-gray-900 text-white hover:bg-black
              dark:bg-[#f5f5f7] dark:text-black dark:hover:bg-white"
            >
              <Mail className="w-3 h-3" />
              Email
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-40 px-6 pb-24">
        {/* Hero Section */}
        <section className="min-h-[56vh] flex flex-col justify-center mb-24">
          <div className="grid md:grid-cols-2 gap-14 items-center fade-in-init">
            <div className="order-2 md:order-1 flex flex-col items-start text-left">
              <p className="text-[11px] uppercase tracking-[0.35em] mb-4 text-gray-500 dark:text-[#6e6e73]">
                Computer Engineer | Designer
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-gray-900 dark:text-[#f5f5f7] whitespace-nowrap">
                Hi, I'm Joaquin <span className="waving-hand">👋</span>
              </h1>
              <p className="leading-relaxed mb-8 max-w-xl text-gray-500 dark:text-[#a1a1a6]">
                I build practical systems and polished visuals, combining
                computer engineering, embedded work, and design into a simple,
                clean portfolio story.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#skills"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium
                  border-black/10 text-gray-700 hover:text-black hover:bg-white hover:border-black/15 shadow-sm
                  dark:border-[#2c2c2e] dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] dark:hover:border-[#525255] dark:hover:bg-white/5"
                >
                  <span className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    &lt;/&gt;
                  </span>
                  Skills
                </a>
                <a
                  href="#projects"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium
                  border-black/10 text-gray-700 hover:text-black hover:bg-white hover:border-black/15 shadow-sm
                  dark:border-[#2c2c2e] dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] dark:hover:border-[#525255] dark:hover:bg-white/5"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
                  Work
                </a>
                <a
                  href={resume}
                  download="Joaquin - Resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium
                   border-black/10 text-gray-700 hover:text-black hover:bg-white hover:border-black/15 shadow-sm
                  dark:border-[#2c2c2e] dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] dark:hover:border-[#525255] dark:hover:bg-white/5"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
                  Resume
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div
                  className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-2 bg-[#1c1c1e]
                  border-gray-200 dark:border-white/10"
                >
                  <img
                    src={profilePic}
                    alt="Joaquin Miguel Dumas"
                    className="w-full h-full object-cover object-[50%_28%] transform-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-10 border-t reveal border-black/5 dark:border-[#1d1d1f]"
        >
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] mb-4 text-gray-500 dark:text-[#6e6e73]">
                ABOUT ME
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
                Get to know me more
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-500 dark:text-[#a1a1a6] max-w-2xl">
                Joaquin Miguel Dumas, based in the Philippines, is a BS Computer
                Engineering student at De La Salle University - Dasmariñas who
                works across embedded systems, computer vision, and design.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-2xl">
                <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm dark:bg-white/[0.03] dark:border-white/5">
                  <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-[#6e6e73] mb-2">
                    Location
                  </p>
                  <p className="text-gray-900 dark:text-[#f5f5f7] font-medium">
                    Philippines
                  </p>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm dark:bg-white/[0.03] dark:border-white/5">
                  <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-[#6e6e73] mb-2">
                    Degree
                  </p>
                  <p className="text-gray-900 dark:text-[#f5f5f7] font-medium">
                    BS in Computer Engineering
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm dark:bg-white/[0.03] dark:border-white/5">
              <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-[#f2f2f2] dark:bg-white/5 mb-5">
                <img
                  src={profilePic}
                  alt="Joaquin Miguel Dumas portrait"
                  className="h-full w-full object-cover object-[50%_28%]"
                />
              </div>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-[#a1a1a6]">
                I like keeping layouts simple, readable, and intentional while
                still highlighting the technical and creative sides of my work.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section
          id="projects"
          className="py-12 border-t reveal
          border-black/5 dark:border-[#1d1d1f]"
        >
          <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2
                className="font-semibold text-2xl tracking-tight
                text-gray-900 dark:text-[#f5f5f7]"
              >
                Recent Projects
              </h2>
              <p className="text-sm mt-1 text-gray-500 dark:text-[#86868b]">
                Hardware, computer vision, and web systems.
              </p>
            </div>
            <a
              href="https://github.com/joaquindumas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors flex items-center gap-1 group"
            >
              View full archive
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleOpenModal(project)}
                className="group cursor-pointer rounded-2xl p-8 flex flex-col justify-between h-full border relative overflow-hidden transition-all duration-400 
                hover:-translate-y-1 hover:shadow-xl
                bg-white/80 border-black/5 hover:border-blue-500/20 shadow-sm
                dark:bg-[#0a0a0a] dark:border-white/5 dark:hover:bg-white/[0.05] dark:hover:border-white/20 dark:hover:shadow-black/50"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="p-2.5 rounded-lg border transition-colors
                      bg-gray-50 border-gray-200 text-gray-900 group-hover:text-blue-500
                      dark:bg-[#1c1c1e] dark:border-white/5 dark:text-[#f5f5f7] dark:group-hover:text-blue-400"
                    >
                      {project.icon}
                    </div>
                    <span
                      className="text-[10px] font-mono border px-2 py-0.5 rounded-md
                      text-gray-500 border-gray-200
                      dark:text-[#6e6e73] dark:border-[#2c2c2e]"
                    >
                      {project.year}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-lg mb-2
                    text-gray-900 dark:text-[#f5f5f7]"
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6
                    text-gray-500 dark:text-[#a1a1a6]"
                  >
                    {project.desc}
                  </p>
                </div>
                <div>
                  <div
                    className="h-px w-full mb-4 transition-colors
                    bg-gray-200 group-hover:bg-gray-300
                    dark:bg-white/5 dark:group-hover:bg-white/10"
                  ></div>
                  <div className="flex flex-wrap gap-x-2 gap-y-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-1 rounded
                        bg-gray-100 text-gray-600
                        dark:bg-white/5 dark:text-[#d1d1d6]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View Gallery <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEW SECTION: Graphic Design */}
        <section
          id="design"
          className="py-12 border-t reveal border-black/5 dark:border-[#1d1d1f]"
        >
          <div className="mb-10">
            <h2 className="font-semibold text-2xl tracking-tight text-gray-900 dark:text-[#f5f5f7]">
              Creative Works
            </h2>
            <p className="text-sm mt-1 text-gray-500 dark:text-[#86868b]">
              Graphic design, branding, and visual layouts.
            </p>
          </div>

          <div
            className={
              designProjects.length === 1
                ? "max-w-2xl mx-auto"
                : "grid md:grid-cols-2 gap-6"
            }
          >
            {designProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleOpenModal(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-400 
               hover:-translate-y-1 hover:shadow-xl
               bg-white/80 border-black/5 hover:border-purple-500/20 shadow-sm
               dark:bg-[#0a0a0a] dark:border-white/5 dark:hover:bg-white/[0.05] dark:hover:border-white/20 dark:hover:shadow-black/50"
              >
                {/* Image Preview at Top */}
                <div className="h-48 overflow-hidden relative bg-gray-100 dark:bg-white/5">
                  {project.images?.[0] && (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      decoding="async" // <--- Add this
                      loading="eager" // <--- Keep this eager because it's "above the fold" or high priority
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-purple-500" />
                      <span className="text-xs font-semibold text-purple-500">
                        {project.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono border px-2 py-0.5 rounded-md text-gray-500 border-gray-200 dark:text-[#6e6e73] dark:border-[#2c2c2e]">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-[#f5f5f7]">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 text-gray-500 dark:text-[#a1a1a6] line-clamp-2">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 rounded bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-[#d1d1d6]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education Grid */}
        <section
          id="experience"
          className="py-12 border-t reveal
           border-black/5 dark:border-[#1d1d1f]"
        >
          <div className="grid md:grid-cols-2 gap-14">
            {/* Left Column: Education & Certs */}
            <div>
              <h2
                className="font-semibold text-lg mb-8 flex items-center gap-2
                text-gray-900 dark:text-[#f5f5f7]"
              >
                <GraduationCap className="w-4.5 h-4.5 text-gray-500 dark:text-[#86868b]" />
                Education
              </h2>
              <div className="space-y-8">
                <div className="relative pl-6 border-l border-gray-300 dark:border-[#2c2c2e]">
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-black bg-gray-900 dark:bg-[#f5f5f7]"></div>
                  <h3 className="font-medium text-base text-gray-900 dark:text-[#f5f5f7]">
                    De La Salle University - Dasmariñas
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-[#86868b] mt-1 mb-2">
                    Aug 2021 — Aug 2026
                  </p>
                  <p className="text-sm text-gray-600 dark:text-[#a1a1a6]">
                    BS in Computer Engineering
                  </p>
                </div>
                <div className="relative pl-6 border-l border-gray-300 dark:border-[#2c2c2e]">
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-black bg-gray-500 dark:bg-[#424245]"></div>
                  <h3 className="font-medium text-base text-gray-900 dark:text-[#f5f5f7]">
                    Lyceum of the Philippines - Cavite
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-[#86868b] mt-1 mb-2">
                    Jun 2018 — Jun 2020
                  </p>
                  <p className="text-sm text-gray-600 dark:text-[#a1a1a6]">
                    TVL - ICT Track
                  </p>
                </div>
              </div>

              <h2
                className="font-semibold text-lg mt-12 mb-8 flex items-center gap-2
                 text-gray-900 dark:text-[#f5f5f7]"
              >
                <Award className="w-4.5 h-4.5 text-gray-500 dark:text-[#86868b]" />
                Certifications
              </h2>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <span
                        className="block transition-colors
                        text-gray-700 group-hover:text-black
                        dark:text-[#f5f5f7] dark:group-hover:text-white"
                      >
                        {cert}
                      </span>
                      <span
                        className="text-xs
                        text-gray-500
                        dark:text-[#6e6e73]"
                      >
                        DLSU-D CpE Dept • 2025
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Experience & Skills */}
            <div>
              {/* Experience */}
              <h2
                className="font-semibold text-lg mb-8 flex items-center gap-2
                 text-gray-900 dark:text-[#f5f5f7]"
              >
                <Briefcase className="w-4.5 h-4.5 text-gray-500 dark:text-[#86868b]" />
                Experience
              </h2>
              <div className="space-y-8">
                <div className="relative pl-6 border-l border-gray-300 dark:border-[#2c2c2e]">
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-black bg-gray-900 dark:bg-[#f5f5f7]"></div>
                  <h3 className="font-medium text-base text-gray-900 dark:text-[#f5f5f7]">
                    Hayakawa Electronics Philippines
                  </h3>
                  <p className="text-sm text-blue-500 dark:text-blue-400 mt-0.5">
                    IT Technical Support
                  </p>
                  <p className="text-xs text-gray-500 dark:text-[#86868b] mt-1 mb-3">
                    Feb 2026 — May 2026
                  </p>
                  <p
                    className="text-sm leading-relaxed
                    text-gray-600 dark:text-[#a1a1a6]"
                  >
                    Handles different maintenance tasks and supports day-to-day technical operations.
                  </p>
                </div>

                <div className="relative pl-6 border-l border-gray-300 dark:border-[#2c2c2e]">
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-black bg-gray-900 dark:bg-[#f5f5f7]"></div>
                  <h3 className="font-medium text-base text-gray-900 dark:text-[#f5f5f7]">
                    New Era Signs & Graphics
                  </h3>
                  <p className="text-sm text-blue-500 dark:text-blue-400 mt-0.5">
                    Student Intern
                  </p>
                  <p className="text-xs text-gray-500 dark:text-[#86868b] mt-1 mb-3">
                    Feb 2019 — Apr 2019 • Cavite
                  </p>
                  <p
                    className="text-sm leading-relaxed
                    text-gray-600 dark:text-[#a1a1a6]"
                  >
                    Managed print production logistics for 50+ projects. Optimized
                    vector rendering processes to reduce material waste by 15%.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div id="skills" className="mt-16 reveal">
                <h2
                  className="font-semibold text-lg mb-8 flex items-center gap-2
                   text-gray-900 dark:text-[#f5f5f7]"
                >
                  <Cpu className="w-4.5 h-4.5 text-gray-500 dark:text-[#86868b]" />
                  Technical Proficiency
                </h2>

                <div className="space-y-8">
                  <div>
                    <h4
                      className="text-[11px] uppercase tracking-wider font-bold mb-4
                      text-gray-500 dark:text-[#6e6e73]"
                    >
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {skills.languages.map((skill) => (
                        <SkillBadge key={skill} text={skill} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4
                      className="text-[11px] uppercase tracking-wider font-bold mb-4
                       text-gray-500 dark:text-[#6e6e73]"
                    >
                      Frameworks & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {skills.frameworks.map((skill) => (
                        <SkillBadge key={skill} text={skill} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4
                      className="text-[11px] uppercase tracking-wider font-bold mb-4
                       text-gray-500 dark:text-[#6e6e73]"
                    >
                      Specialized Areas
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {skills.specialized.map((skill) => (
                        <SkillBadge key={skill} text={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="mt-20 pt-10 border-t flex flex-col sm:flex-row justify-between items-center gap-6 reveal
          border-gray-200 dark:border-[#1d1d1f]"
        >
          <div className="text-center sm:text-left">
            <p
              className="text-sm font-medium
              text-gray-900 dark:text-[#f5f5f7]"
            >
              Joaquin Miguel Dumas
            </p>
            <p
              className="text-xs mt-1
              text-gray-500 dark:text-[#6e6e73]"
            >
              Based in Philippines.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/imjoaquindumas"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:scale-110
              text-gray-500 hover:text-black
              dark:text-[#86868b] dark:hover:text-white"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/joaquindumas"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:scale-110
              text-gray-500 hover:text-black
              dark:text-[#86868b] dark:hover:text-white"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:imjoaquindumas@gmail.com"
              className="transition-colors hover:scale-110
              text-gray-500 hover:text-black
              dark:text-[#86868b] dark:hover:text-white"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
