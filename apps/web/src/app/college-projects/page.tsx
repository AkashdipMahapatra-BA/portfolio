"use client";

import "./college-projects.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Project {
  title: string;
  difficulty: string | string[];
  desc: string;
  img: string;
  link: string;
  technologies?: string[];
  technologiesOptions?: Record<string, string[]>;
  categories: string[];
}

/* ─── Static data ────────────────────────────────────────────────────────── */
const TECH_LEVELS: Record<string, string> = {
  JavaScript: "easy",
  HTML: "easy",
  CSS: "easy",
  PHP: "hard",
  SQL: "hard",
  React: "hard",
  Nodejs: "hard",
  MongoDB: "hard",
  Express: "hard",
  WebSocket: "hard",
  Python: "easy",
  ESP32: "hard",
  "GPS-module": "hard",
  ESP8266: "hard",
};

const PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    difficulty: "easy",
    desc: `<ul>
             <li>Create your own portfolio website to showcase your projects and skills. &</li>
             <li>Includes a contact form using SMTP (must take user email & phone number), and</li>
             <li>store the data in a database for future contact.</li>
           </ul>`,
    img: "/img/Portfolio Website.png",
    link: "https://github.com/akashdip2001/",
    technologiesOptions: {
      "PHP + SQL": ["JavaScript", "PHP", "SQL"],
      "MERN Stack": ["MongoDB", "Express", "React", "Nodejs"],
    },
    categories: ["Development"],
  },
  {
    title: "Realtime Tracker",
    difficulty: "sample",
    desc: "Dynamic web app for tracking devices in real-time using WebSockets.",
    img: "https://github.com/akashdip2001/Realtime_Tracker/raw/main/public/images/Title%20img%2002.jpg",
    link: "https://github.com/akashdip2001/Realtime_Tracker",
    technologies: ["JavaScript", "WebSocket"],
    categories: ["Development"],
  },
  {
    title: "server.py",
    difficulty: "easy",
    desc: `<ul>
              <li>This project includes a Python-based server that exposes <code>index.html</code> on a local port (see <code>LAN-server.py</code>).</li>
              <li>Your task is to work on <code>WAN-server.py</code> to expose your local site over the internet.</li>
              <li>Also, implement SSL for secure connections (like a secure tunnel).</li>
              <li>It helps developers test their local sites on real devices — completely free and open-source.</li>
           </ul>`,
    img: "/img/server-py.png",
    link: "https://github.com/akashdip2001/server.py",
    technologies: ["Python"],
    categories: ["Networking", "Development"],
  },
  {
    title: "NAS",
    difficulty: "medium",
    desc: `<ul>
             <li>It's the iOT projects, but this time you have to fix web issues.</li>
             <li>Upgrade the HTML interface (Development), Or</li>
             <li>Add or fix features, e.g., fix image preview in web UI, Or</li>
             <li>Fix extension issue when downloading files</li>
           </ul>`,
    img: "/img/NAS.jpg",
    link: "https://github.com/akashdip2001/NAS-with-ESP32",
    technologies: ["ESP8266"],
    categories: ["Networking", "Development"],
  },
  {
    title: "GPS-with-ESP",
    difficulty: "easy",
    desc: "Detect user location with ESP32 and GPS module over secure SSL.",
    img: "https://github.com/akashdip2001/GPS-with-ESP/raw/main/public/Leaflet%20JS%2001.jpg",
    link: "https://github.com/akashdip2001/GPS-with-ESP",
    technologies: ["JavaScript", "WebSocket", "ESP32", "GPS-module"],
    categories: ["IoT"],
  },
  {
    title: "iOT Game",
    difficulty: "hard",
    desc: `<ul>
            <li>Add new obstacles, Or</li>
            <li>Optimize the game for this OLED display</li>
          </ul>`,
    img: "/img/iOT game.jpg",
    link: "https://github.com/akashdip2001/ARDUINO-with-OLED-Display-Game",
    technologies: ["Python"],
    categories: ["IoT"],
  },
  {
    title: "Network Scanner & Blocker",
    difficulty: "sample",
    desc: `<ul>
             <li>Scan any network for connected devices, and</li>
             <li>Block any device without connecting to the router.</li>
           </ul>`,
    img: "/img/Wi-Fi-deauther.jpg",
    link: "https://github.com/akashdip2001/Wi-Fi-deauther-with-ESP8266-OLED-module",
    technologies: [],
    categories: ["H@cking", "Networking", "IoT"],
  },
  {
    title: "Fake AP + Captive Portal",
    difficulty: ["hard", "scratch"],
    desc: `<ul>
            <li>Create a honey pot (fake Wi-Fi network) to capture user credentials, and</li>
            <li>redirect them to a fake login page.</li>
            <li>Store the captured data in a database for future use.</li>
          </ul>`,
    img: "https://github.com/akashdip2001/High-end-autonomous-anomaly-detection-robot/raw/main/img/modules%20(4).jpg",
    link: "https://github.com/akashdip2001/Wi-Fi-deauther-with-ESP8266-OLED-module",
    technologies: [],
    categories: ["IoT", "H@cking", "Networking"],
  },
  {
    title: "Fake AP + Captive Portal (v2)",
    difficulty: ["hard", "scratch"],
    desc: `<ul>
            <li>Check the previous project, and</li>
            <li>use the password from database & try to connect to the main network automatically, and</li>
            <li>If wrong, again request for password.</li>
          </ul>`,
    img: "https://github.com/akashdip2001/High-end-autonomous-anomaly-detection-robot/raw/main/img/modules%20(4).jpg",
    link: "https://github.com/akashdip2001/Wi-Fi-deauther-with-ESP8266-OLED-module",
    technologies: [],
    categories: ["IoT", "H@cking", "Networking"],
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function truncateText(html: string, limit = 150): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > limit ? text.slice(0, limit) + "…" : text;
}

function TechList({
  technologies,
  technologiesOptions,
}: {
  technologies?: string[] | undefined;
  technologiesOptions?: Record<string, string[]> | undefined;
}) {
  const firstStack = technologiesOptions
    ? Object.keys(technologiesOptions)[0]
    : null;
  const [selectedStack, setSelectedStack] = useState(firstStack ?? "");

  const techs = technologiesOptions
    ? (technologiesOptions[selectedStack] ?? [])
    : (technologies ?? []);

  if (techs.length === 0 && !technologiesOptions) return null;

  return (
    <div style={{ marginTop: 10, fontSize: "0.9rem" }}>
      <strong>Used Technologies:</strong>
      <br />
      {techs.map((t) => {
        const level = TECH_LEVELS[t] ?? "easy";
        const bg = level === "easy" ? "#4caf50" : "#ff9800";
        return (
          <span
            key={t}
            style={{
              display: "inline-block",
              margin: "2px 6px",
              padding: "3px 6px",
              borderRadius: 8,
              background: bg,
              color: "white",
            }}
          >
            {t}
          </span>
        );
      })}
      {technologiesOptions && (
        <label style={{ display: "block", marginTop: 10, fontSize: "0.8rem" }}>
          Choose Stack:{" "}
          <select
            value={selectedStack}
            onChange={(e) => setSelectedStack(e.target.value)}
          >
            {Object.keys(technologiesOptions).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string | string[] }) {
  if (Array.isArray(difficulty)) {
    return (
      <>
        {difficulty.map((level) => (
          <span key={level} className={`tech-tag tech-${level}`}>
            {level}
          </span>
        ))}
      </>
    );
  }
  if (difficulty === "sample") {
    return (
      <span className="tooltip-sample">
        <span className="tech-tag tech-sample">sample</span>
        <span className="tooltip-text">
          This is a sample project. Take ideas and create your own.
        </span>
      </span>
    );
  }
  return (
    <span className={`tech-tag tech-${difficulty}`}>{difficulty}</span>
  );
}

/* ─── Project Card ───────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  onImageClick,
  onLearnMore,
}: {
  project: Project;
  onImageClick: (src: string) => void;
  onLearnMore: (html: string) => void;
}) {
  return (
    <div className="project-card">
      <img
        src={project.img}
        alt={project.title}
        onClick={() => onImageClick(project.img)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginBottom: 0 }}>{project.title}</h3>
        <div style={{ display: "flex", gap: 4 }}>
          <DifficultyBadge difficulty={project.difficulty} />
        </div>
      </div>
      <div className="desc">{truncateText(project.desc)}</div>
      <span className="learn-more" onClick={() => onLearnMore(project.desc)}>
        ... (Learn more)
      </span>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      <TechList
        technologies={project.technologies}
        technologiesOptions={project.technologiesOptions}
      />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function CollegeProjectsPage() {
  const [descModal, setDescModal] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [rewardVisible, setRewardVisible] = useState(false);
  const [floatLabel, setFloatLabel] = useState<"reward" | "challenge">("reward");
  const [submitModal, setSubmitModal] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const rewardRef = useRef<HTMLDivElement>(null);

  /* Auto-dismiss image preview after 2 s */
  useEffect(() => {
    if (!imgPreview) return;
    const t = setTimeout(() => setImgPreview(null), 2000);
    return () => clearTimeout(t);
  }, [imgPreview]);

  /* Floating button label tracks reward section visibility */
  useEffect(() => {
    const onScroll = () => {
      if (!rewardRef.current) return;
      const rect = rewardRef.current.getBoundingClientRect();
      const inView =
        rect.top <= window.innerHeight / 2 && rect.bottom >= 100;
      setFloatLabel(inView ? "challenge" : "reward");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFloatButton = () => {
    if (floatLabel === "challenge") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setRewardVisible(true);
      setTimeout(
        () => rewardRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    }
  };

  const byCategory = (cat: string) =>
    PROJECTS.filter((p) => p.categories.includes(cat));

  return (
    <div className="college-projects-root" suppressHydrationWarning={true}>
      {/* ── Back button ── */}
      <Link href="/" className="back-button">
        ← Back to Professional Portfolio
      </Link>

      {/* ── Archive notice ── */}
      <div className="archive-notice">
        🗄️ Archive — original UI preserved as a nod to early web development days.
      </div>

      {/* ── Header ── */}
      <header>
        <h1>College Projects Archive (2021 – 2025)</h1>
        <p style={{ color: "#928dab", marginTop: 12, lineHeight: 1.7 }}>
          This is an archive of experimental hardware, IoT, and low-level
          networking projects I built during my Mechanical Engineering degree. I
          preserved the original UI of this page as a nod to my early web
          development days.
        </p>
      </header>

      {/* ── Social links ── */}
      <div className="social-buttons">
        <a
          href="https://github.com/akashdip2001"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button github"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
          />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/akashdip2001"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button linkedin"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
            alt="LinkedIn"
          />
          LinkedIn
        </a>
        <a
          href="https://www.youtube.com/@akashdip2001"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button youtube"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
            alt="YouTube"
          />
          YouTube
        </a>
      </div>

      {/* ── Floating Claim Reward button ── */}
      <button className="reward-float-button" onClick={handleFloatButton}>
        <span className="emoji">{floatLabel === "reward" ? "🎁" : "🚀"}</span>
        {floatLabel === "reward" ? "Claim Reward" : "Challenge!"}
      </button>

      {/* ── Project categories ── */}
      {(
        [
          { label: "Development", id: "development" },
          { label: "IoT",         id: "iot"         },
          { label: "Networking",  id: "networking"  },
          { label: "H@cking",     id: "hacking"     },
        ] as const
      ).map(({ label, id }) => (
        <div key={id} id={id} className="category">
          <h2>{label}</h2>
          <div className="projects">
            {byCategory(label).map((project, i) => (
              <ProjectCard
                key={`${id}-${i}`}
                project={project}
                onImageClick={setImgPreview}
                onLearnMore={setDescModal}
              />
            ))}
          </div>
        </div>
      ))}

      {/* ── More projects link ── */}
      <div className="social-buttons" style={{ display: "flex" }}>
        <a
          href="https://github.com/akashdip2001/akashdip2001/blob/main/README.md#projects001"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button github"
          style={{ justifyContent: "center" }}
        >
          more Projects
        </a>
      </div>

      {/* ── Reward section ── */}
      {rewardVisible && (
        <div ref={rewardRef} className="reward-container">
          <div className="reward-header">
            <h2>🎉 Reward Program</h2>
            <p style={{ color: "#928dab" }}>
              Hi, I am a Mechanical Engineering student (2025), and I am here to
              help you learn and grow in the world of technology, to build
              something new and innovative.
            </p>
            <p>
              Complete challenges, earn GitHub vouchers, and gain recognition!
              💪
            </p>
          </div>

          <div className="reward-grid">
            <div className="reward-card">
              <h3>🎯 Easy + Hard Combo</h3>
              <p>
                ✅ 1 Easy Project (complete)
                <br />
                <br />
                ⚠ 1 Hard project (may not complete — fork the repo and try to
                do something new)
              </p>
              <span className="badge">1 Voucher 🎟️</span>
            </div>
            <div className="reward-card">
              <h3>🧠 Medium Project</h3>
              <p>
                ✅ Complete and Pull one medium-level project and explain what
                you do, and get
              </p>
              <span className="badge">1 Voucher 🎟️</span>
            </div>
            <div className="reward-card">
              <h3>🔥 Hard Project</h3>
              <p>
                ✅ Complete and Pull one hard-level project.
                <br />
                <br />
                ✅ Unique idea with excellent UX or features
              </p>
              <span className="badge">2 Vouchers 🎟️🎟️*</span>
            </div>
            <div className="reward-card special">
              <h3>🚀 Scratch Project</h3>
              <p>✅ Fully original concept from scratch</p>
              <span className="badge gold">3 Vouchers 🎟️🎟️🎟️*</span>
            </div>
          </div>

          <div className="reward-info">
            <ul>
              <li>🕒 2 months to submit your Pull Request</li>
              <li>👥 Max 3 members per team/project</li>
              <li>
                🏆 Top 5–10 projects can earn the reward (depending on their
                projects)
              </li>
              <li>📧 Submit your work via the form below</li>
            </ul>
          </div>

          <div className="reward-cta-flex">
            <button
              className="cta-button outline-button"
              onClick={() => setSubmitModal(true)}
            >
              📥 Submit Your Work
            </button>
            <a
              href="https://examregistration.github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              🔗 Register for Exam
            </a>
          </div>
        </div>
      )}

      <p
        style={{
          color: "#dad6e9",
          fontSize: "0.75rem",
          textAlign: "center",
          cursor: "pointer",
          marginTop: 12,
        }}
        onClick={() => setTermsModal(true)}
      >
        *Terms and Conditions apply
      </p>

      {/* ── Footer ── */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px 0",
          marginTop: 50,
          borderTop: "1px solid #fff",
          fontSize: "0.85rem",
          color: "#ccc",
        }}
      >
        Created by Akashdip Mahapatra, 2025 May 25
        <br />
        <a
          href="https://github.com/akashdip2001"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#ff9800", textDecoration: "none", marginRight: 15 }}
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/akashdip2001"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#ff9800", textDecoration: "none" }}
        >
          LinkedIn
        </a>
      </footer>

      {/* ── Desc modal ── */}
      {descModal && (
        <div className="modal-overlay" onClick={() => setDescModal(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: descModal }}
          />
        </div>
      )}

      {/* ── Image preview overlay ── */}
      {imgPreview && (
        <div
          className="img-preview-overlay"
          onClick={() => setImgPreview(null)}
        >
          <img src={imgPreview} alt="Preview" />
        </div>
      )}

      {/* ── Submit modal — Voucher Program Concluded ── */}
      {submitModal && (
        <div className="modal-overlay" onClick={() => setSubmitModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="concluded-content">
              <h2>Voucher Program Concluded</h2>
              <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
                Thank you for your interest! During my college years, I
                distributed GitHub vouchers to encourage students to contribute
                to these open-source projects. Since I graduated in 2025, this
                program is no longer active and the vouchers have expired.
                However, the repositories remain open — feel free to fork them
                and continue building!
              </p>
            </div>
            <button
              onClick={() => setSubmitModal(false)}
              style={{
                display: "block",
                margin: "0 auto",
                padding: "8px 24px",
                color: "#ff9800",
                cursor: "pointer",
                background: "transparent",
                border: "1.5px solid #ff9800",
                borderRadius: "999px",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#ff9800";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#ff9800";
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Terms modal ── */}
      {termsModal && (
        <div className="modal-overlay" onClick={() => setTermsModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 15 }}>🎓 Terms and Conditions</h3>
            <ul style={{ paddingLeft: 20, fontSize: "0.9rem", color: "#ddd", textAlign: "left" }}>
              <li>This time I am a final year B.Tech Mechanical Engineering student.</li>
              <li>And because I am a GitHub Campus Expert, I get the vouchers 🎟️.</li>
              <li>So I give those vouchers to students who have a hunger to create something new.</li>
              <li>After I pass out, it&apos;s not possible to get vouchers again, so this is a limited-time offer.</li>
              <li>That&apos;s why I set a 2-month deadline to complete your projects.</li>
              <li>If students complete hard projects well, I may send the voucher within a week.</li>
              <li>But once I pass out, my ID will likely expire, so I cannot send any more vouchers after that.</li>
            </ul>
            <button
              onClick={() => setTermsModal(false)}
              style={{
                display: "block",
                margin: "15px auto 0",
                padding: "8px 24px",
                color: "#ff9800",
                cursor: "pointer",
                background: "transparent",
                border: "1.5px solid #ff9800",
                borderRadius: "999px",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
