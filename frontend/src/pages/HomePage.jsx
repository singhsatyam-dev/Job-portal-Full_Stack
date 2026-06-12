import { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  Upload,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { getJobs } from "../api/jobs.api";
import { scoreResume } from "../api/ai.api";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ScoreGauge from "../components/ScoreGauge";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";



/* ── Centered container helper ── */
const Container = ({ children, className = "" }) => (
  <div
    className={className}
    style={{ maxWidth: "80rem", margin: "0 auto", width: "100%" }}
  >
    {children}
  </div>
);

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const isJobseeker = isAuthenticated && user?.role === "jobseeker";

  /* ── Jobs state ── */
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ── ATS state ── */
  const [showAts, setShowAts] = useState(false);
  const [atsResume, setAtsResume] = useState(null);
  const [atsDragOver, setAtsDragOver] = useState(false);
  const [jobPref, setJobPref] = useState("");
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const atsFileRef = useRef(null);

  const fetchJobs = async (q = "", page = 1) => {
    setLoading(true);
    try {
      const res = await getJobs(q, page);
      setJobs(res.data.jobs);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(search, currentPage);
  }, []);

  const handleSearch = (q) => {
    setSearch(q);
    setCurrentPage(1);
    fetchJobs(q, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchJobs(search, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── ATS handlers ── */
  const handleAtsFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5 MB.");
      return;
    }
    setAtsResume(file);
    setAtsResult(null);
  };

  const handleAtsScore = async () => {
    if (!atsResume) {
      toast.error("Please upload your resume first.");
      return;
    }
    if (!jobPref.trim()) {
      toast.error("Please enter a job preference.");
      return;
    }
    setAtsLoading(true);
    try {
      const data = await scoreResume(atsResume, jobPref);
      setAtsResult({ score: data.score, feedback: data.feedback });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to score resume.");
    } finally {
      setAtsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden" style={{ paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid var(--border-hover)",
              color: "var(--accent-light)",
            }}
          >
            <Zap size={13} fill="currentColor" />
            Find Your Dream Job Today
          </div>

          <h1
            className="font-extrabold leading-tight"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            Discover Amazing <br />
            <span className="gradient-text">Career Opportunities</span>
          </h1>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "520px",
              marginBottom: "2.5rem",
            }}
          >
            Browse thousands of jobs from top companies. Find the perfect role
            that matches your skills and ambitions.
          </p>

          <div style={{ width: "100%", maxWidth: "600px" }}>
            <SearchBar onSearch={handleSearch} initialValue={search} />
          </div>
        </div>
      </section>



      {/* ─── ATS Scorer Panel (jobseekers only) ─── */}
      {isJobseeker && (
        <section style={{ padding: "0 1.5rem 3rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div className="glass overflow-hidden">
              {/* Toggle Header */}
              <button
                onClick={() => {
                  setShowAts(!showAts);
                  setAtsResult(null);
                }}
                className="w-full flex items-center justify-between px-7 py-5 transition-all hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                    }}
                  >
                    <Sparkles size={18} color="white" />
                  </div>
                  <div className="text-left">
                    <div
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Check Your ATS Score
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Upload your resume and see how well it matches any role
                    </div>
                  </div>
                </div>
                {showAts ? (
                  <ChevronUp size={18} style={{ color: "var(--text-muted)" }} />
                ) : (
                  <ChevronDown
                    size={18}
                    style={{ color: "var(--text-muted)" }}
                  />
                )}
              </button>

              {/* Panel Body */}
              {showAts && (
                <div className="px-7 pb-7 flex flex-col gap-5 fade-in">
                  {/* Job preference input */}
                  <div>
                    <label className="form-label">
                      <Briefcase size={13} className="inline mr-1.5" />
                      Job Preference / Role you're targeting
                    </label>
                    <textarea
                      rows={3}
                      className="form-input resize-none"
                      placeholder="e.g. Frontend Developer with React, TypeScript. Looking for remote roles..."
                      value={jobPref}
                      onChange={(e) => setJobPref(e.target.value)}
                    />
                  </div>

                  {/* Resume drop zone */}
                  <div>
                    <label className="form-label">Resume (PDF)</label>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setAtsDragOver(true);
                      }}
                      onDragLeave={() => setAtsDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setAtsDragOver(false);
                        handleAtsFile(e.dataTransfer.files[0]);
                      }}
                      onClick={() => atsFileRef.current?.click()}
                      className="relative rounded-xl p-7 text-center cursor-pointer transition-all"
                      style={{
                        border: `2px dashed ${atsDragOver ? "var(--accent)" : atsResume ? "var(--success)" : "var(--border)"}`,
                        background: atsDragOver
                          ? "rgba(139,92,246,0.08)"
                          : atsResume
                            ? "rgba(16,185,129,0.06)"
                            : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <input
                        ref={atsFileRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleAtsFile(e.target.files[0])}
                      />
                      {atsResume ? (
                        <>
                          <FileText
                            size={30}
                            className="mx-auto mb-2"
                            style={{ color: "var(--success)" }}
                          />
                          <p
                            className="font-semibold text-sm mb-0.5"
                            style={{ color: "var(--success)" }}
                          >
                            {atsResume.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {(atsResume.size / 1024).toFixed(0)} KB · Click to
                            change
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAtsResume(null);
                              setAtsResult(null);
                            }}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-md"
                            style={{
                              background: "rgba(239,68,68,0.15)",
                              border: "1px solid rgba(239,68,68,0.3)",
                              color: "#f87171",
                            }}
                          >
                            <X size={13} />
                          </button>
                        </>
                      ) : (
                        <>
                          <Upload
                            size={30}
                            className="mx-auto mb-2"
                            style={{ color: "var(--text-muted)" }}
                          />
                          <p
                            className="font-semibold text-sm mb-0.5"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Drop your resume here or click to browse
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            PDF only · Max 5 MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Score button */}
                  <button
                    onClick={handleAtsScore}
                    disabled={atsLoading || !atsResume || !jobPref.trim()}
                    className="btn-primary justify-center py-3"
                    style={{
                      opacity: !atsResume || !jobPref.trim() ? 0.5 : 1,
                      cursor:
                        !atsResume || !jobPref.trim()
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {atsLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing…
                      </span>
                    ) : (
                      <>
                        <Sparkles size={16} /> Score My Resume
                      </>
                    )}
                  </button>

                  {/* Results */}
                  {atsResult && (
                    <div className="flex flex-col gap-5 fade-in">
                      <ScoreGauge score={atsResult.score} />

                      <div
                        className="flex gap-2.5 items-start p-4 rounded-xl"
                        style={{
                          background:
                            atsResult.score >= 80
                              ? "rgba(16,185,129,0.08)"
                              : "rgba(245,158,11,0.08)",
                          border: `1px solid ${atsResult.score >= 80 ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                        }}
                      >
                        {atsResult.score >= 80 ? (
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color: "var(--success)" }}
                          />
                        ) : (
                          <AlertTriangle
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color: "var(--warning)" }}
                          />
                        )}
                        <p
                          className="text-sm leading-relaxed font-medium"
                          style={{
                            color:
                              atsResult.score >= 80
                                ? "var(--success)"
                                : "var(--warning)",
                          }}
                        >
                          {atsResult.score >= 80
                            ? "Great match! Your resume is well-aligned for this role."
                            : "Needs improvement. Review the AI feedback below to strengthen your resume."}
                        </p>
                      </div>

                      {atsResult.feedback?.length > 0 && (
                        <div>
                          <p
                            className="text-xs font-bold uppercase tracking-wider mb-3"
                            style={{ color: "var(--text-muted)" }}
                          >
                            AI Feedback
                          </p>
                          <div className="flex flex-col gap-2">
                            {atsResult.feedback.map((point, i) => (
                              <div
                                key={i}
                                className="flex gap-2.5 items-start p-3 rounded-xl"
                                style={{
                                  background: "rgba(255,255,255,0.03)",
                                  border: "1px solid var(--border)",
                                }}
                              >
                                <div
                                  className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold"
                                  style={{
                                    background: "var(--accent-dim)",
                                    border: "1px solid rgba(139,92,246,0.3)",
                                    color: "var(--accent-light)",
                                  }}
                                >
                                  {i + 1}
                                </div>
                                <p
                                  className="text-sm leading-relaxed"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  {point}
                                </p>
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
          </div>
        </section>
      )}

      {/* ─── Jobs Section ─── */}
      <section style={{ padding: "0 1.5rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              {search ? `Results for "${search}"` : "Latest Jobs"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {loading ? (
            <Loader size="lg" />
          ) : jobs.length === 0 ? (
            <div
              style={{
                background: "rgba(22,22,31,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "4rem",
                textAlign: "center",
              }}
            >
              <Briefcase
                size={48}
                style={{ color: "var(--text-muted)", margin: "0 auto 1rem" }}
              />
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: "0.5rem",
                }}
              >
                No jobs found
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Try adjusting your search or check back later.
              </p>
            </div>
          ) : (
            <div
              className="stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: "1.5rem",
              }}
              id="jobs-grid"
            >
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
      <style>{`
        @media (min-width: 768px)  { #jobs-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1280px) { #jobs-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </div>
  );
};

export default HomePage;
