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
  
  //Fetching all present jobs
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

  //fetching side effect
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
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: "5rem", paddingBottom: "4rem" }}
      >
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
        <section style={{ padding: "0 1.5rem 3.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* ── Card ── */}
            <div
              className="overflow-hidden"
              style={{
                borderRadius: "24px",
                background: "rgba(17,17,27,0.85)",
                border: "1px solid rgba(139,92,246,0.25)",
                boxShadow:
                  "0 0 60px rgba(139,92,246,0.08), 0 2px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* ── Gradient accent strip ── */}
              <div
                style={{
                  height: "3px",
                  background:
                    "linear-gradient(90deg, #8b5cf6, #6d28d9, #a78bfa)",
                }}
              />

              {/* ── Toggle Header ── */}
              <button
                onClick={() => {
                  setShowAts(!showAts);
                  setAtsResult(null);
                }}
                className="w-full transition-all"
                style={{
                  padding: "1.5rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "transparent",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {/* Icon with glow */}
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "14px",
                      flexShrink: 0,
                      background:
                        "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 20px rgba(139,92,246,0.45)",
                    }}
                  >
                    <Sparkles size={20} color="white" />
                  </div>

                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        AI Resume Scorer
                      </span>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          background:
                            "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(109,40,217,0.3))",
                          border: "1px solid rgba(139,92,246,0.4)",
                          color: "var(--accent-light)",
                        }}
                      >
                        AI POWERED
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Upload your resume · Enter a target role · Get your ATS
                      match score instantly
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {showAts ? (
                    <ChevronUp
                      size={16}
                      style={{ color: "var(--accent-light)" }}
                    />
                  ) : (
                    <ChevronDown
                      size={16}
                      style={{ color: "var(--accent-light)" }}
                    />
                  )}
                </div>
              </button>

              {/* ── Panel Body ── */}
              {showAts && (
                <div
                  className="fade-in"
                  style={{
                    padding: "0 2rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(139,92,246,0.3), transparent)",
                    }}
                  />

                  {/* Two-column layout */}
                  <div
                    id="ats-cols"
                    style={{
                      display: "grid",
                      gap: "1.5rem",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    {/* ── Left: Job Preference ── */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Briefcase size={12} /> Target Role / Job Preference
                      </label>
                      <textarea
                        rows={7}
                        className="form-input resize-none"
                        placeholder="e.g. Frontend Developer with React & TypeScript. Looking for remote roles in product-based companies…"
                        value={jobPref}
                        onChange={(e) => setJobPref(e.target.value)}
                        style={{ height: "100%", minHeight: "170px" }}
                      />
                    </div>

                    {/* ── Right: Resume Drop Zone ── */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                        }}
                      >
                        <FileText size={12} /> Resume Upload (PDF)
                      </label>
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
                        className="relative cursor-pointer transition-all"
                        style={{
                          flex: 1,
                          minHeight: "170px",
                          borderRadius: "16px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          textAlign: "center",
                          padding: "1.5rem",
                          border: `2px dashed ${
                            atsDragOver
                              ? "var(--accent)"
                              : atsResume
                                ? "#10b981"
                                : "rgba(139,92,246,0.3)"
                          }`,
                          background: atsDragOver
                            ? "rgba(139,92,246,0.1)"
                            : atsResume
                              ? "rgba(16,185,129,0.07)"
                              : "rgba(139,92,246,0.04)",
                          transition: "all 0.2s ease",
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
                              <FileText
                                size={26}
                                style={{ color: "#10b981" }}
                              />
                            </div>
                            <p
                              style={{
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                color: "#10b981",
                                margin: 0,
                              }}
                            >
                              {atsResume.name}
                            </p>
                            <p
                              style={{
                                fontSize: "0.72rem",
                                color: "var(--text-muted)",
                                margin: 0,
                              }}
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
                              style={{
                                position: "absolute",
                                top: "0.6rem",
                                right: "0.6rem",
                                padding: "4px",
                                borderRadius: "8px",
                                background: "rgba(239,68,68,0.15)",
                                border: "1px solid rgba(239,68,68,0.3)",
                                color: "#f87171",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <X size={13} />
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
                                fontSize: "0.85rem",
                                color: "var(--text-secondary)",
                                margin: 0,
                              }}
                            >
                              Drop your resume here
                            </p>
                            <p
                              style={{
                                fontSize: "0.72rem",
                                color: "var(--text-muted)",
                                margin: 0,
                              }}
                            >
                              or click to browse · PDF only · Max 5 MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Score Button ── */}
                  <button
                    onClick={handleAtsScore}
                    disabled={atsLoading || !atsResume || !jobPref.trim()}
                    className="btn-primary justify-center"
                    style={{
                      padding: "0.9rem 2rem",
                      fontSize: "0.95rem",
                      opacity: !atsResume || !jobPref.trim() ? 0.45 : 1,
                      cursor:
                        !atsResume || !jobPref.trim()
                          ? "not-allowed"
                          : "pointer",
                      background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                      boxShadow:
                        !atsResume || !jobPref.trim()
                          ? "none"
                          : "0 4px 20px rgba(139,92,246,0.4)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {atsLoading ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                        }}
                      >
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing your resume…
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Sparkles size={17} /> Analyze & Score My Resume
                      </span>
                    )}
                  </button>

                  {/* ── Results ── */}
                  {atsResult && (
                    <div
                      className="fade-in"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem",
                      }}
                    >
                      {/* Divider */}
                      <div
                        style={{
                          height: "1px",
                          background: "rgba(255,255,255,0.06)",
                        }}
                      />

                      <ScoreGauge score={atsResult.score} />

                      {/* Summary banner */}
                      <div
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-start",
                          padding: "1rem 1.25rem",
                          borderRadius: "14px",
                          background:
                            atsResult.score >= 80
                              ? "rgba(16,185,129,0.08)"
                              : "rgba(245,158,11,0.08)",
                          border: `1px solid ${atsResult.score >= 80 ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                        }}
                      >
                        {atsResult.score >= 80 ? (
                          <CheckCircle2
                            size={18}
                            style={{
                              color: "var(--success)",
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          />
                        ) : (
                          <AlertTriangle
                            size={18}
                            style={{
                              color: "var(--warning)",
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          />
                        )}
                        <p
                          style={{
                            fontSize: "0.88rem",
                            lineHeight: 1.6,
                            fontWeight: 500,
                            margin: 0,
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

                      {/* Feedback list */}
                      {atsResult.feedback?.length > 0 && (
                        <div>
                          <p
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                              marginBottom: "0.75rem",
                            }}
                          >
                            AI Feedback
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.6rem",
                            }}
                          >
                            {atsResult.feedback.map((point, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  gap: "0.75rem",
                                  alignItems: "flex-start",
                                  padding: "0.75rem 1rem",
                                  borderRadius: "12px",
                                  background: "rgba(255,255,255,0.03)",
                                  border: "1px solid var(--border)",
                                }}
                              >
                                <div
                                  style={{
                                    width: "1.4rem",
                                    height: "1.4rem",
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    marginTop: "1px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.7rem",
                                    fontWeight: 800,
                                    background: "var(--accent-dim)",
                                    border: "1px solid rgba(139,92,246,0.3)",
                                    color: "var(--accent-light)",
                                  }}
                                >
                                  {i + 1}
                                </div>
                                <p
                                  style={{
                                    fontSize: "0.85rem",
                                    lineHeight: 1.7,
                                    color: "var(--text-secondary)",
                                    margin: 0,
                                  }}
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

          <style>{`
            @media (max-width: 640px) { #ats-cols { grid-template-columns: 1fr !important; } }
          `}</style>
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
