import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin, Building2, Clock, ArrowLeft,
  Briefcase, Upload, CheckCircle, AlertCircle,
  Sparkles, ChevronDown, ChevronUp, FileText, X,
  AlertTriangle, CheckCircle2, Banknote, LogIn,
} from "lucide-react";
import { getJobById, applyJob } from "../api/jobs.api";
import { scoreResume } from "../api/ai.api";
import Loader from "../components/Loader";
import ScoreGauge from "../components/ScoreGauge";
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
  const [showForm, setShowForm] = useState(false);

  // ATS scorer state
  const [showAts, setShowAts] = useState(false);
  const [atsResume, setAtsResume] = useState(null);
  const [atsDragOver, setAtsDragOver] = useState(false);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const atsFileRef = useRef(null);

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
      toast.success("Application submitted! Check your email for confirmation.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };

  // ATS scoring
  const handleAtsFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Only PDF files are accepted."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("File must be under 5 MB."); return; }
    setAtsResume(file);
    setAtsResult(null);
  };

  const handleAtsScore = async () => {
    if (!atsResume) { toast.error("Please upload your resume first."); return; }
    const preference = `${job.title} at ${job.company}. ${job.description?.slice(0, 500)}`;
    setAtsLoading(true);
    try {
      const data = await scoreResume(atsResume, preference);
      setAtsResult({ score: data.score, feedback: data.feedback });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to score resume.");
    } finally {
      setAtsLoading(false);
    }
  };

  if (loading) return <div className="min-h-[60vh]"><Loader size="lg" /></div>;

  if (!job)
    return (
      <div className="text-center py-20 px-6">
        <AlertCircle size={48} className="mx-auto mb-4" style={{ color: "var(--danger)" }} />
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Job not found</h2>
        <Link to="/jobs" className="btn-primary">Back to Jobs</Link>
      </div>
    );

  const skills = Array.isArray(job.skills) ? job.skills : [];

  return (
    <div className="page-container-md" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      {/* Back */}
      <Link to="/jobs" className="btn-ghost inline-flex mb-8">
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      {/* ─── Job Header ─── */}
      <div className="glass fade-in mb-6" style={{ padding: "2.25rem", borderRadius: "20px" }}>
        <div className="flex flex-wrap gap-4 justify-between items-start">
          <div className="flex-1">
            <h1 className="font-extrabold mb-3 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--text-primary)" }}>
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <Building2 size={14} /> <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <MapPin size={14} /> <span>{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--success)" }}>
                  <Banknote size={14} /> <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <Clock size={13} />
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Apply button area */}
          <div className="flex flex-col items-end gap-3">
            {applied ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "var(--success)" }}>
                <CheckCircle size={16} /> Applied Successfully
              </div>
            ) : isJobseeker ? (
              <button onClick={() => { setShowForm(!showForm); setShowAts(false); }} className="btn-primary" style={{ padding: "11px 26px" }}>
                <Briefcase size={16} />
                {showForm ? "Cancel" : "Apply Now"}
              </button>
            ) : isAuthenticated ? (
              <div className="text-sm px-4 py-2 rounded-lg" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "var(--warning)" }}>
                Recruiters cannot apply to jobs
              </div>
            ) : (
              <button onClick={() => navigate(`/login`)} className="btn-primary" style={{ padding: "11px 26px" }}>
                <LogIn size={16} /> Login to Apply
              </button>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="skill-chip">{skill}</span>
            ))}
          </div>
        )}
      </div>

      {/* ─── Description ─── */}
      <div className="glass mb-6" style={{ padding: "2.25rem", borderRadius: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
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
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Job Description</h2>
        </div>
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "1.25rem" }} />
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
          {job.description}
        </p>
      </div>

      {/* ─── Apply Form (jobseekers only) ─── */}
      {showForm && !applied && isJobseeker && (
        <div className="glass fade-in mb-6" style={{ padding: "2.25rem", borderRadius: "20px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Submit Your Application</h2>
          <form onSubmit={handleApply} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="John Doe"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="you@example.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="form-label">Resume (PDF)</label>
              <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                style={{
                  border: `1px dashed ${resume ? "var(--accent)" : "var(--border)"}`,
                  background: resume ? "var(--accent-dim)" : "rgba(255,255,255,0.02)",
                  color: resume ? "var(--accent-light)" : "var(--text-muted)",
                }}>
                <Upload size={18} />
                <span className="text-sm">{resume ? resume.name : "Click to upload your resume (PDF, DOC)"}</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} className="hidden" />
              </label>
            </div>

            <button type="submit" className="btn-primary justify-center py-3 text-base"
              disabled={applying} style={{ opacity: applying ? 0.7 : 1, cursor: applying ? "not-allowed" : "pointer" }}>
              {applying ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </span>
              ) : (
                <><Briefcase size={16} /> Submit Application</>
              )}
            </button>
          </form>
        </div>
      )}

      {/* ─── ATS Scorer Panel (jobseekers only) ─── */}
      {isJobseeker && (
        <div className="glass mb-6 overflow-hidden">
          {/* Toggle header */}
          <button
            onClick={() => { setShowAts(!showAts); setShowForm(false); }}
            className="w-full flex items-center justify-between p-6 transition-all hover:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
                <Sparkles size={16} color="white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Check ATS Score</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Score your resume against this job's requirements
                </div>
              </div>
            </div>
            {showAts ? <ChevronUp size={18} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />}
          </button>

          {showAts && (
            <div className="px-6 pb-6 flex flex-col gap-5 fade-in">
              <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "var(--text-secondary)" }}>
                <Sparkles size={14} className="inline mr-2" style={{ color: "var(--accent-light)" }} />
                Our AI will evaluate your resume against <strong style={{ color: "var(--accent-light)" }}>{job.title}</strong> at {job.company}.
              </div>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setAtsDragOver(true); }}
                onDragLeave={() => setAtsDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setAtsDragOver(false); handleAtsFile(e.dataTransfer.files[0]); }}
                onClick={() => atsFileRef.current?.click()}
                className="relative rounded-xl p-7 text-center cursor-pointer transition-all"
                style={{
                  border: `2px dashed ${atsDragOver ? "var(--accent)" : atsResume ? "var(--success)" : "var(--border)"}`,
                  background: atsDragOver ? "rgba(139,92,246,0.08)" : atsResume ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)",
                }}
              >
                <input ref={atsFileRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => handleAtsFile(e.target.files[0])} />
                {atsResume ? (
                  <>
                    <FileText size={32} className="mx-auto mb-2" style={{ color: "var(--success)" }} />
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--success)" }}>{atsResume.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{(atsResume.size / 1024).toFixed(0)} KB · Click to change</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setAtsResume(null); setAtsResult(null); }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-md"
                      style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                      <X size={13} />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Drop your resume, or click to browse</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>PDF only · Max 5 MB</p>
                  </>
                )}
              </div>

              <button
                onClick={handleAtsScore}
                disabled={atsLoading || !atsResume}
                className="btn-primary justify-center py-3"
                style={{ opacity: !atsResume ? 0.5 : 1, cursor: !atsResume ? "not-allowed" : "pointer" }}
              >
                {atsLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing…
                  </span>
                ) : (
                  <><Sparkles size={16} /> Score My Resume</>
                )}
              </button>

              {/* Results */}
              {atsResult && (
                <div className="flex flex-col gap-5 fade-in">
                  <ScoreGauge score={atsResult.score} />

                  <div className="p-4 rounded-xl flex gap-3 items-start"
                    style={{
                      background: atsResult.score >= 80 ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)",
                      border: `1px solid ${atsResult.score >= 80 ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                    }}>
                    {atsResult.score >= 80
                      ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
                      : <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--warning)" }} />
                    }
                    <p className="text-sm leading-relaxed font-medium"
                      style={{ color: atsResult.score >= 80 ? "var(--success)" : "var(--warning)" }}>
                      {atsResult.score >= 80
                        ? "Great match! Your resume is well-aligned with this role."
                        : "Needs improvement. Review the AI feedback below to strengthen your resume."}
                    </p>
                  </div>

                  {atsResult.feedback?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>AI Feedback</p>
                      <div className="flex flex-col gap-2">
                        {atsResult.feedback.map((point, i) => (
                          <div key={i} className="flex gap-3 items-start p-3 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                            <div className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold"
                              style={{ background: "var(--accent-dim)", border: "1px solid rgba(139,92,246,0.3)", color: "var(--accent-light)" }}>
                              {i + 1}
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Prompt unauthenticated users */}
      {!isAuthenticated && (
        <div className="glass p-6 mb-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Want to apply or check your ATS score?</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Sign in or create a free account to apply and use the AI ATS scorer.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/login" className="btn-ghost text-sm"><LogIn size={14} /> Login</Link>
            <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
