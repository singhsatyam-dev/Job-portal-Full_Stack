import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, Building2, DollarSign, Clock, ArrowLeft,
  Briefcase, Upload, CheckCircle, AlertCircle
} from "lucide-react";
import { getJobById, applyJob } from "../api/jobs.api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [resume, setResume] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data.job);
      } catch {
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume (PDF)");
      return;
    }
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("resume", resume);

    setApplying(true);
    try {
      await applyJob(id, fd);
      setApplied(true);
      toast.success("Application submitted! Check your email for confirmation.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div style={{ minHeight: "60vh" }}><Loader size="lg" /></div>;

  if (!job)
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <AlertCircle size={48} color="var(--danger)" style={{ margin: "0 auto 16px" }} />
        <h2 style={{ color: "var(--text-primary)" }}>Job not found</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: 16 }}>
          Back to Jobs
        </Link>
      </div>
    );

  const skills = Array.isArray(job.skills) ? job.skills : [];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      {/* Back */}
      <Link to="/" className="btn-ghost" style={{ marginBottom: 24, display: "inline-flex" }}>
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      {/* Job Header */}
      <div className="glass fade-in" style={{ padding: "36px", marginBottom: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 8,
                lineHeight: 1.2,
              }}
            >
              {job.title}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <Building2 size={15} /> <span>{job.company}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <MapPin size={15} /> <span>{job.location}</span>
              </div>
              {job.salary && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--success)", fontSize: "0.9rem", fontWeight: 600 }}>
                  <DollarSign size={15} /> <span>{job.salary}</span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                <Clock size={14} />
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {!applied && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
              style={{ padding: "12px 28px", fontSize: "0.95rem" }}
            >
              <Briefcase size={16} />
              {showForm ? "Cancel" : "Apply Now"}
            </button>
          )}

          {applied && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 10,
                padding: "10px 18px",
                color: "var(--success)",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              <CheckCircle size={16} /> Applied Successfully
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((skill, i) => (
              <span key={i} className="skill-chip">{skill}</span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="glass" style={{ padding: "32px", marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Job Description
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
          {job.description}
        </p>
      </div>

      {/* Apply Form */}
      {showForm && !applied && (
        <div className="glass fade-in" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 24 }}>
            Submit Your Application
          </h2>

          <form onSubmit={handleApply} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Resume (PDF)</label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  borderRadius: 10,
                  border: "1px dashed",
                  borderColor: resume ? "var(--accent)" : "var(--border)",
                  background: resume ? "var(--accent-dim)" : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  color: resume ? "var(--accent-light)" : "var(--text-muted)",
                }}
              >
                <Upload size={18} />
                <span style={{ fontSize: "0.9rem" }}>
                  {resume ? resume.name : "Click to upload your resume (PDF, DOC)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={applying}
              style={{
                justifyContent: "center",
                padding: "13px",
                fontSize: "0.95rem",
                opacity: applying ? 0.7 : 1,
                cursor: applying ? "not-allowed" : "pointer",
              }}
            >
              {applying ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Submitting…
                </span>
              ) : (
                <><Briefcase size={16} /> Submit Application</>
              )}
            </button>
          </form>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default JobDetailPage;
