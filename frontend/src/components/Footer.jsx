import { Briefcase, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        padding: "40px 24px 24px",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Briefcase size={16} color="white" />
              </div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
                Job<span className="gradient-text">Portal</span>
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: 240, lineHeight: 1.6 }}>
              Connecting talented job seekers with amazing opportunities across the globe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent-light)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >Browse Jobs</Link>
              <Link to="/login" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent-light)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >Login</Link>
              <Link to="/register" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent-light)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >Register</Link>
            </div>
          </div>

          {/* For Recruiters */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              For Recruiters
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to="/recruiter/dashboard" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent-light)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >Dashboard</Link>
              <Link to="/recruiter/create-job" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent-light)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >Post a Job</Link>
            </div>
          </div>
        </div>

        <div className="glow-divider" style={{ marginBottom: 20 }} />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.82rem" }}>
          <span>Made with</span>
          <Heart size={13} fill="var(--accent)" color="var(--accent)" />
          <span>using React &amp; Node.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
