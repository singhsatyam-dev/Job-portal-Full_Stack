import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Mail, FileText, Calendar, Inbox } from "lucide-react";
import { getApplicants, getJobById } from "../api/jobs.api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const ApplicantsPage = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [applicantsRes, jobRes] = await Promise.all([
          getApplicants(id),
          getJobById(id),
        ]);
        setApplicants(applicantsRes.data.applicants);
        setJobTitle(jobRes.data.job.title);
      } catch {
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <Link to="/recruiter/dashboard" className="btn-ghost" style={{ marginBottom: 24, display: "inline-flex" }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="glass fade-in" style={{ padding: "28px 32px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Users size={20} color="var(--accent-light)" />
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Applicants
          </h1>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          For: <span style={{ color: "var(--accent-light)", fontWeight: 600 }}>{jobTitle}</span>
        </p>
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "var(--accent-dim)",
            border: "1px solid var(--border-hover)",
            borderRadius: 8,
            padding: "4px 12px",
            color: "var(--accent-light)",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          <Users size={12} />
          {applicants.length} {applicants.length === 1 ? "applicant" : "applicants"}
        </div>
      </div>

      {loading ? (
        <Loader size="lg" />
      ) : applicants.length === 0 ? (
        <div className="glass" style={{ padding: "60px 24px", textAlign: "center" }}>
          <Inbox size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ color: "var(--text-secondary)", marginBottom: 8 }}>No applicants yet</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Share your job listing to attract candidates.
          </p>
        </div>
      ) : (
        <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {applicants.map((applicant, i) => (
            <div
              key={i}
              className="glass glass-hover"
              style={{ padding: "20px 24px" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
                {/* Applicant Info */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    {applicant.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                      {applicant.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.82rem", marginTop: 2 }}>
                      <Mail size={12} />
                      <span>{applicant.email}</span>
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.8rem" }}>
                    <Calendar size={12} />
                    <span>{new Date(applicant.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>

                  {applicant.resume ? (
                    <a
                      href={`http://localhost:3000/uploads/resumes/${applicant.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: "0.82rem", padding: "7px 14px" }}
                    >
                      <FileText size={13} /> Resume
                    </a>
                  ) : (
                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>No resume</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsPage;
