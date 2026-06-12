import { Link } from "react-router-dom";
import { MapPin, Building2, Banknote, ArrowRight, Clock, Briefcase } from "lucide-react";

const JobCard = ({ job }) => {
  const skills = Array.isArray(job.skills) ? job.skills : [];

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  // Pick a color accent based on job title hash
  const accentColors = [
    { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.25)" },
    { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.25)" },
    { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
    { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
    { color: "#ec4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)" },
  ];
  const accent = accentColors[(job.title?.charCodeAt(0) || 0) % accentColors.length];

  const initials = job.company
    ? job.company.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "CF";

  return (
    <div
      style={{
        background: "rgba(22, 22, 31, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "all 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      className="job-card-hover"
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${accent.color}, transparent)`,
          borderRadius: "20px 20px 0 0",
          opacity: 0.7,
        }}
      />

      {/* Header row: company avatar + meta */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
        {/* Company Avatar */}
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            background: accent.bg,
            border: `1px solid ${accent.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 800,
            color: accent.color,
            flexShrink: 0,
            letterSpacing: "0.03em",
          }}
        >
          {initials}
        </div>

        {/* Title + company */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.3rem",
              lineHeight: 1.3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {job.title}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.825rem",
              color: "var(--text-secondary)",
            }}
          >
            <Building2 size={13} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {job.company}
            </span>
          </div>
        </div>

        {/* Time badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "8px",
            padding: "0.25rem 0.6rem",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          <Clock size={11} />
          {timeAgo(job.createdAt)}
        </div>
      </div>

      {/* Location + salary row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.625rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "8px",
            padding: "0.3rem 0.7rem",
          }}
        >
          <MapPin size={12} />
          {job.location}
        </div>

        {job.salary && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--success)",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: "8px",
              padding: "0.3rem 0.7rem",
            }}
          >
            <Banknote size={12} />
            {job.salary}
          </div>
        )}
      </div>

      {/* Description preview */}
      <p
        style={{
          fontSize: "0.845rem",
          lineHeight: 1.65,
          color: "var(--text-muted)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {job.description}
      </p>

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="skill-chip">{skill}</span>
          ))}
          {skills.length > 4 && (
            <span
              style={{
                display: "inline-block",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                padding: "3px 8px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              +{skills.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.06)",
        }}
      />

      {/* CTA */}
      <Link
        to={`/jobs/${job._id}`}
        className="btn-primary"
        style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}
      >
        View Details <ArrowRight size={15} />
      </Link>

      <style>{`
        .job-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(139,92,246,0.35) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,92,246,0.15);
        }
      `}</style>
    </div>
  );
};

export default JobCard;
