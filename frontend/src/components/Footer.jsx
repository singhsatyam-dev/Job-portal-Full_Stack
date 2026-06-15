import { Briefcase, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-auto"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      <div className="mx-auto px-6 pt-14 pb-8">
        <div className="flex flex-wrap justify-center gap-16 text-center mb-14">
          {/* Brand */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                }}
              >
                <Briefcase size={16} color="white" />
              </div>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Career<span className="gradient-text">Forge</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-sm mx-auto text-center"
              style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}
            >
              The AI-powered job portal connecting talented professionals with
              their dream careers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4
              className="font-semibold text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Quick Links
            </h4>
            <div className="flex flex-col items-center gap-2">
              {[
                { label: "Browse Jobs", to: "/jobs" },
                { label: "Login", to: "/login" },
                { label: "Register", to: "/register" },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-sm transition-colors hover:text-violet-400"
                  style={{ color: "var(--text-muted)", textDecoration: "none" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* For Recruiters */}
          <div className="flex flex-col items-center">
            <h4
              className="font-semibold text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              For Recruiters
            </h4>
            <div className="flex flex-col items-center gap-2">
              {[
                { label: "Dashboard", to: "/recruiter/dashboard" },
                { label: "Post a Job", to: "/recruiter/create-job" },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-sm transition-colors hover:text-violet-400"
                  style={{ color: "var(--text-muted)", textDecoration: "none" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="glow-divider mb-6 mt-2" />

        <div
          className="flex justify-center items-center gap-2 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <span>Made with</span>
          <Heart size={13} fill="var(--accent)" color="var(--accent)" />
          <span>by CareerForge · React &amp; Node.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
