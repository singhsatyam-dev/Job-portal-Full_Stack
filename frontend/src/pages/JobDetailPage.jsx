import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Building2,
  Clock,
  ArrowLeft,
  Briefcase,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  X,
  Banknote,
  LogIn,
} from "lucide-react";
import { getJobById, applyJob } from "../api/jobs.api";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const isJobseeker = isAuthenticated && user?.role === "jobseeker";

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [resume, setResume] = useState(null);
  const [resumeDragOver, setResumeDragOver] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const resumeFileRef = useRef(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data.job);
      } catch {
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
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
      toast.success(
        "Application submitted! Check your email for confirmation.",
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };

  const handleResumeFile = (file) => {
    if (!file) return;
    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      toast.error("Only PDF or DOC files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5 MB.");
      return;
    }
    setResume(file);
  };

  if (loading)
    return (
      <div className="min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  if (!job)
    return (
      <div className="text-center py-20 px-6">
        <AlertCircle
          size={48}
          className="mx-auto mb-4"
          style={{ color: "var(--danger)" }}
        />
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Job not found
        </h2>
        <Link to="/jobs" className="btn-primary">
          Back to Jobs
        </Link>
      </div>
    );

  const skills = Array.isArray(job.skills) ? job.skills : [];

  return (
    <div
      className="page-container-md"
      style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}
    >
      {/* Back */}
      <Link to="/jobs" className="btn-ghost inline-flex mb-8">
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      {/* ─── Job Header ─── */}
      <div
        className="glass fade-in mb-6"
        style={{ padding: "2.25rem", borderRadius: "20px" }}
      >
        <div className="flex flex-wrap gap-4 justify-between items-start">
          <div className="flex-1">
            <h1
              className="font-extrabold mb-3 leading-tight"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: "var(--text-primary)",
              }}
            >
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 mt-2">
              <div
                className="flex items-center gap-1.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <Building2 size={14} /> <span>{job.company}</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <MapPin size={14} /> <span>{job.location}</span>
              </div>
              {job.salary && (
                <div
                  className="flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--success)" }}
                >
                  <Banknote size={14} /> <span>{job.salary}</span>
                </div>
              )}
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                <Clock size={13} />
                <span>
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Apply button area */}
          <div className="flex flex-col items-end gap-3">
            {applied ? (
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "var(--success)",
                }}
              >
                <CheckCircle size={16} /> Applied Successfully
              </div>
            ) : isJobseeker ? (
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary"
                style={{ padding: "11px 26px" }}
              >
                <Briefcase size={16} />
                {showForm ? "Cancel" : "Apply Now"}
              </button>
            ) : isAuthenticated ? (
              <div
                className="text-sm px-4 py-2 rounded-lg"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  color: "var(--warning)",
                }}
              >
                Recruiters cannot apply to jobs
              </div>
            ) : (
              <button
                onClick={() => navigate(`/login`)}
                className="btn-primary"
                style={{ padding: "11px 26px" }}
              >
                <LogIn size={16} /> Login to Apply
              </button>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ─── Description ─── */}
      <div
        className="glass mb-6"
        style={{ padding: "2.25rem", borderRadius: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "8px",
              background: "var(--accent-dim)",
              border: "1px solid var(--border-hover)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Briefcase size={14} style={{ color: "var(--accent-light)" }} />
          </div>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Job Description
          </h2>
        </div>
        <div
          style={{
            height: "1px",
            background: "var(--border)",
            marginBottom: "1.25rem",
          }}
        />
        <p
          className="text-sm leading-relaxed whitespace-pre-wrap"
          style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
        >
          {job.description}
        </p>
      </div>

      {/* ─── Apply Form (jobseekers only) ─── */}
      {showForm && !applied && isJobseeker && (
        <div
          className="glass fade-in mb-6"
          style={{ padding: "2.25rem", borderRadius: "20px" }}
        >
          {/* Form header */}
          <div style={{ marginBottom: "1.75rem" }}>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
              }}
            >
              Submit Your Application
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Fill in your details and upload your resume to apply for this
              role.
            </p>
          </div>

          <form
            onSubmit={handleApply}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Name + Email row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
              id="apply-grid"
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Full Name
                </label>
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
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email Address
                </label>
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

            {/* Premium Resume Drop Zone */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                <FileText size={12} /> Resume (PDF / DOC)
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setResumeDragOver(true);
                }}
                onDragLeave={() => setResumeDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setResumeDragOver(false);
                  handleResumeFile(e.dataTransfer.files[0]);
                }}
                onClick={() => resumeFileRef.current?.click()}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  padding: "2.5rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: `2px dashed ${
                    resumeDragOver
                      ? "var(--accent)"
                      : resume
                        ? "#10b981"
                        : "rgba(139,92,246,0.3)"
                  }`,
                  background: resumeDragOver
                    ? "rgba(139,92,246,0.08)"
                    : resume
                      ? "rgba(16,185,129,0.06)"
                      : "rgba(139,92,246,0.03)",
                }}
              >
                <input
                  ref={resumeFileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleResumeFile(e.target.files[0])}
                />

                {resume ? (
                  <>
                    <div
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: "12px",
                        background: "rgba(16,185,129,0.15)",
                        border: "1px solid rgba(16,185,129,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FileText size={26} style={{ color: "#10b981" }} />
                    </div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#10b981",
                        margin: 0,
                      }}
                    >
                      {resume.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        margin: 0,
                      }}
                    >
                      {(resume.size / 1024).toFixed(0)} KB · Click to change
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setResume(null);
                      }}
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                        padding: "5px",
                        borderRadius: "8px",
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        color: "#f87171",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: "12px",
                        background: "rgba(139,92,246,0.12)",
                        border: "1px solid rgba(139,92,246,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Upload
                        size={24}
                        style={{ color: "var(--accent-light)" }}
                      />
                    </div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Drag &amp; drop your resume here
                    </p>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        margin: 0,
                      }}
                    >
                      or click to browse · PDF, DOC, DOCX · Max 5 MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary justify-center"
              disabled={applying}
              style={{
                padding: "0.9rem 2rem",
                fontSize: "0.95rem",
                opacity: applying ? 0.7 : 1,
                cursor: applying ? "not-allowed" : "pointer",
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                boxShadow: applying
                  ? "none"
                  : "0 4px 20px rgba(139,92,246,0.4)",
                transition: "all 0.2s ease",
              }}
            >
              {applying ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Briefcase size={16} /> Submit Application
                </span>
              )}
            </button>
          </form>
          <style>{`@media (max-width: 540px) { #apply-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      )}

      {/* Prompt unauthenticated users */}
      {!isAuthenticated && (
        <div className="glass p-6 mb-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <p
              className="font-semibold text-sm mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Ready to apply for this role?
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Sign in or create a free account to submit your application.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/login" className="btn-ghost text-sm">
              <LogIn size={14} /> Login
            </Link>
            <Link to="/register" className="btn-primary text-sm">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
