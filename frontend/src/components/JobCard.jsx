import { Link } from "react-router-dom";
import { MapPin, Building2, DollarSign, ArrowRight, Clock } from "lucide-react";

const JobCard = ({ job }) => {
  const skills = Array.isArray(job.skills) ? job.skills : [];

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  return (
    <div className="glass glass-hover" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 4,
              lineHeight: 1.3,
            }}
          >
            {job.title}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            <Building2 size={13} />
            <span>{job.company}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
          }}
        >
          <Clock size={11} />
          <span>{timeAgo(job.createdAt)}</span>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.82rem" }}>
          <MapPin size={12} />
          <span>{job.location}</span>
        </div>
        {job.salary && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--success)", fontSize: "0.82rem", fontWeight: 600 }}>
            <DollarSign size={12} />
            <span>{job.salary}</span>
          </div>
        )}
      </div>

      {/* Description preview */}
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.85rem",
          lineHeight: 1.6,
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="skill-chip">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="skill-chip" style={{ color: "var(--text-muted)", background: "transparent" }}>
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop: "auto", paddingTop: 4 }}>
        <Link to={`/jobs/${job._id}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          View Details <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
