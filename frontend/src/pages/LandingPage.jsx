import { Link } from "react-router-dom";
import {
  Briefcase,
  Brain,
  Search,
  CheckCircle,
  ArrowRight,
  Zap,
  Star,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const STATS = [
  { value: "10K+", label: "Jobs Listed" },
  { value: "50K+", label: "Job Seekers" },
  { value: "5K+", label: "Placements" },
  { value: "200+", label: "Companies" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI ATS Scorer",
    desc: "Upload your resume and get an instant ATS compatibility score with actionable AI feedback — before you even apply.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
    glow: "rgba(139,92,246,0.08)",
  },
  {
    icon: Search,
    title: "Smart Job Search",
    desc: "Search thousands of listings by title, skill, or location. Filters help you zero in on your perfect next role.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.1)",
    border: "rgba(6,182,212,0.3)",
    glow: "rgba(6,182,212,0.06)",
  },
  {
    icon: Zap,
    title: "Instant Apply",
    desc: "One-click applications with your resume. Recruiters are notified instantly and you get a confirmation email.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.3)",
    glow: "rgba(16,185,129,0.06)",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign up as a job seeker in seconds. No credit card required.",
  },
  {
    num: "02",
    title: "Score Your Resume",
    desc: "Upload your resume and let our AI evaluate your ATS compatibility.",
  },
  {
    num: "03",
    title: "Apply & Get Hired",
    desc: "Browse jobs, apply with one click, and land your dream role.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Frontend Developer @ Razorpay",
    quote:
      "The ATS scorer was a game-changer. My score went from 55 to 88 in two revisions. Got 3 interview calls in a week!",
    avatar: "PS",
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
  },
  {
    name: "Rahul Mehta",
    role: "Backend Engineer @ Swiggy",
    quote:
      "CareerForge's feedback was brutally honest and incredibly useful. Landed my dream job within a month.",
    avatar: "RM",
    gradient: "linear-gradient(135deg, #06b6d4, #0284c7)",
  },
  {
    name: "Ananya Bose",
    role: "Data Analyst @ Flipkart",
    quote:
      "I love how I can check my ATS score directly on the job listing. Makes each application so much stronger.",
    avatar: "AB",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
  },
];

const LandingPage = () => {
  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── HERO ─── */}
      <section
        style={{
          position: "relative",
          paddingTop: "6rem",
          paddingBottom: "5rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background orb top-center */}
        <div
          className="float-orb"
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="page-container-md fade-in" style={{ position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            className="pulse-glow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 1.1rem",
              borderRadius: "100px",
              marginBottom: "1.75rem",
              background: "var(--accent-dim)",
              border: "1px solid var(--border-hover)",
              color: "var(--accent-light)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <Sparkles size={13} />
            AI-Powered Career Platform
          </div>

          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Land Your Dream Job
            <br />
            <span className="gradient-text">with the Power of AI</span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
            }}
          >
            CareerForge uses AI to score your resume against any job listing,
            helping you apply smarter and get hired faster.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.875rem",
              marginBottom: "2.5rem",
            }}
          >
            <Link
              to="/register"
              className="btn-primary"
              style={{ padding: "14px 32px", fontSize: "1rem" }}
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {["No credit card required", "Free ATS scoring", "Instant applications"].map((t) => (
              <span key={t} className="trust-badge">
                <CheckCircle size={14} color="var(--success)" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ paddingBottom: "4rem" }}>
        <div className="page-container-md">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
            className="stats-grid"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="stat-card">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 640px) {
            .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section">
        <div className="page-container">
          <div className="section-heading">
            <h2>
              Everything you need to{" "}
              <span className="gradient-text">get hired</span>
            </h2>
            <p>CareerForge puts smart tools in your hands — at every step of your journey.</p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
            }}
            className="features-grid"
          >
            {FEATURES.map(({ icon: Icon, title, desc, color, bg, border, glow }) => (
              <div
                key={title}
                className="feature-card"
                style={{ "--card-glow": glow }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: bg,
                    border: `1px solid ${border}`,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary)",
                  }}
                >
                  {desc}
                </p>
                {/* Bottom accent line */}
                <div
                  style={{
                    height: "2px",
                    borderRadius: "2px",
                    background: `linear-gradient(90deg, ${color}60, transparent)`,
                    marginTop: "auto",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .features-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-container-md">
          <div className="section-heading">
            <h2>How CareerForge works</h2>
            <p>Three simple steps from signup to offer letter.</p>
          </div>

          <div
            style={{ display: "grid", gap: "1.5rem", position: "relative" }}
            className="steps-grid"
          >
            {/* Connector line (desktop only) */}
            <div
              className="steps-connector"
              style={{
                position: "absolute",
                top: "1.75rem",
                left: "calc(33.33% + 1.5rem)",
                right: "calc(33.33% + 1.5rem)",
                height: "2px",
                background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                opacity: 0.3,
                display: "none",
              }}
            />

            {STEPS.map(({ num, title, desc }) => (
              <div
                key={num}
                className="glass"
                style={{
                  padding: "2rem 1.75rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                  position: "relative",
                }}
              >
                <div className="step-badge">{num}</div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary)",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .steps-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .steps-connector { display: block !important; }
          }
        `}</style>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-container">
          <div className="section-heading">
            <h2>
              Loved by <span className="gradient-text">job seekers</span>
            </h2>
            <p>Thousands of professionals trust CareerForge to advance their careers.</p>
          </div>

          <div
            style={{ display: "grid", gap: "1.5rem" }}
            className="testimonials-grid"
          >
            {TESTIMONIALS.map(({ name, role, quote, avatar, gradient }) => (
              <div key={name} className="testimonial-card">
                {/* Stars */}
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    flexGrow: 1,
                    fontStyle: "italic",
                  }}
                >
                  "{quote}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: "white",
                      background: gradient,
                      flexShrink: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {avatar}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="page-container-md">
          <div
            className="glass"
            style={{
              padding: "4rem 3rem",
              borderRadius: "28px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* CTA glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "28px",
                background:
                  "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "1.25rem",
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  boxShadow: "0 8px 32px rgba(139,92,246,0.4)",
                }}
              >
                <Shield size={28} color="white" />
              </div>

              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Ready to forge your career?
              </h2>

              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  maxWidth: "480px",
                  margin: "0 auto 2rem",
                  lineHeight: 1.6,
                }}
              >
                Join 50,000+ professionals who use CareerForge to land jobs faster with AI.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.875rem",
                }}
              >
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{ padding: "14px 36px", fontSize: "1rem" }}
                >
                  Create Free Account <ChevronRight size={18} />
                </Link>
                <Link
                  to="/login"
                  className="btn-ghost"
                  style={{ padding: "14px 28px", fontSize: "1rem" }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
