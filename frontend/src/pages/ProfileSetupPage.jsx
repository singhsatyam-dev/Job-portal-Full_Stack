import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Upload,
  FileText,
  X,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  SkipForward,
} from "lucide-react";
import { scoreResume } from "../api/ai.api";
import ScoreGauge from "../components/ScoreGauge";
import toast from "react-hot-toast";

/* ── Step Indicator ── */
const StepIndicator = ({ current }) => {
  const steps = ["Job Preference", "Resume Upload", "ATS Score"];
  return (
    <div className="flex items-center mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div
            key={label}
            className="flex items-center"
            style={{ flex: i < 2 ? 1 : 0 }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300"
                style={{
                  background: done
                    ? "var(--success)"
                    : active
                      ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                      : "rgba(255,255,255,0.06)",
                  border: active
                    ? "2px solid var(--accent)"
                    : done
                      ? "2px solid var(--success)"
                      : "2px solid var(--border)",
                  color: done || active ? "white" : "var(--text-muted)",
                  boxShadow: active ? "0 0 12px rgba(139,92,246,0.5)" : "none",
                }}
              >
                {done ? <CheckCircle2 size={16} /> : idx}
              </div>
              <span
                className="text-xs font-semibold whitespace-nowrap"
                style={{
                  color: active
                    ? "var(--accent-light)"
                    : done
                      ? "var(--success)"
                      : "var(--text-muted)",
                }}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className="flex-1 h-0.5 mx-1 mb-6 transition-all duration-300"
                style={{
                  background: done
                    ? "var(--success)"
                    : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ── Main Page ── */
const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [jobPreference, setJobPreference] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5 MB.");
      return;
    }
    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handlePreferenceNext = (e) => {
    e.preventDefault();
    if (!jobPreference.trim()) return;
    setStep(2);
  };

  const handleScore = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume PDF first.");
      return;
    }
    setLoading(true);
    try {
      const data = await scoreResume(resumeFile, jobPreference);
      setResult({ score: data.score, feedback: data.feedback });
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to score resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => navigate("/jobs");

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-10 relative">
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full"
        style={{
          top: "30%",
          left: "25%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full"
        style={{
          bottom: "20%",
          right: "20%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="fade-in"
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "rgba(22, 22, 31, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "2.75rem",
          position: "relative",
          zIndex: 1,
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-7">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3.5"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              boxShadow: "0 6px 20px rgba(139,92,246,0.4)",
            }}
          >
            <Sparkles size={24} color="white" />
          </div>
          <h1
            className="font-extrabold text-2xl mb-1.5"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Set Up Your Profile
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Tell us what you're looking for and get your resume scored
          </p>
        </div>

        <StepIndicator current={step} />

        {/* ──── STEP 1: Job Preference ──── */}
        {step === 1 && (
          <form onSubmit={handlePreferenceNext} className="flex flex-col gap-5">
            <div>
              <label className="form-label" htmlFor="jobPref">
                <Briefcase size={13} className="inline mr-1.5" />
                Your Job Preference
              </label>
              <textarea
                id="jobPref"
                value={jobPreference}
                onChange={(e) => setJobPreference(e.target.value)}
                placeholder="e.g. Frontend Developer with experience in React, TypeScript, and REST APIs. Looking for remote-friendly roles..."
                required
                rows={5}
                className="form-input resize-y"
                style={{ minHeight: 120 }}
              />
              <p
                className="text-xs mt-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Describe the role, skills, and technologies you're targeting.
                This will be used to evaluate your resume.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center py-3.5"
            >
              Continue <ChevronRight size={16} />
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="btn-ghost w-full justify-center"
            >
              <SkipForward size={15} /> Skip for now
            </button>
          </form>
        )}

        {/* ──── STEP 2: Resume Upload ──── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            {/* Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-300"
              style={{
                border: `2px dashed ${dragOver ? "var(--accent)" : resumeFile ? "var(--success)" : "var(--border)"}`,
                background: dragOver
                  ? "rgba(139,92,246,0.08)"
                  : resumeFile
                    ? "rgba(16,185,129,0.06)"
                    : "rgba(255,255,255,0.02)",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {resumeFile ? (
                <>
                  <FileText
                    size={36}
                    className="mx-auto mb-2.5"
                    style={{ color: "var(--success)" }}
                  />
                  <p
                    className="font-bold mb-1"
                    style={{ color: "var(--success)" }}
                  >
                    {resumeFile.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {(resumeFile.size / 1024).toFixed(0)} KB · Click to change
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setResumeFile(null);
                    }}
                    className="absolute top-2.5 right-2.5 flex items-center p-1.5 rounded-md cursor-pointer"
                    style={{
                      background: "rgba(239,68,68,0.15)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#f87171",
                    }}
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <Upload
                    size={36}
                    className="mx-auto mb-2.5"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Drop your resume here, or click to browse
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    PDF only · Max 5 MB
                  </p>
                </>
              )}
            </div>

            {/* AI hint box */}
            <div
              className="flex gap-2.5 items-start p-3 rounded-xl"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <Sparkles
                size={16}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--accent-light)" }}
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Our AI will compare your resume against your job preference and
                give you an ATS compatibility score with actionable feedback.
              </p>
            </div>

            <button
              onClick={handleScore}
              disabled={loading || !resumeFile}
              className="btn-primary w-full justify-center py-3.5"
              style={{
                opacity: !resumeFile ? 0.5 : 1,
                cursor: !resumeFile ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing resume…
                </span>
              ) : (
                <>
                  <Sparkles size={16} /> Score My Resume
                </>
              )}
            </button>

            <button
              onClick={handleSkip}
              className="btn-ghost w-full justify-center"
            >
              <SkipForward size={15} /> Skip — I'll do this later
            </button>
          </div>
        )}

        {/* ──── STEP 3: ATS Score Result ──── */}
        {step === 3 && result && (
          <div className="stagger flex flex-col gap-6">
            <ScoreGauge score={result.score} />

            {/* Threshold info */}
            <div
              className="flex gap-2.5 items-start p-4 rounded-xl"
              style={{
                background:
                  result.score >= 80
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(245,158,11,0.08)",
                border: `1px solid ${result.score >= 80 ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
              }}
            >
              {result.score >= 80 ? (
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
                    result.score >= 80 ? "var(--success)" : "var(--warning)",
                }}
              >
                {result.score >= 80
                  ? "Your resume is a strong match! You're well-positioned for this type of role."
                  : "Scores below 80 typically need improvement. Review the feedback below to strengthen your resume."}
              </p>
            </div>

            {/* Feedback bullets */}
            {result.feedback && result.feedback.length > 0 && (
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  AI Feedback
                </p>
                <div className="flex flex-col gap-2.5">
                  {result.feedback.map((point, i) => (
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

            <button
              onClick={() => navigate("/jobs")}
              className="btn-primary w-full justify-center py-3.5"
            >
              Browse Jobs <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetupPage;
