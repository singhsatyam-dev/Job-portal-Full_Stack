import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Plus, Pencil, Trash2,
  Users, Briefcase, MapPin, Building2,
  AlertTriangle, TrendingUp, Clock,
} from "lucide-react";
import { getMyJobs, deleteJob } from "../api/jobs.api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getMyJobs();
      setJobs(res.data.jobs);
    } catch {
      toast.error("Failed to load your jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      toast.success("Job deleted");
    } catch {
      toast.error("Failed to delete job");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicants?.length || 0), 0);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "3rem 1.5rem 5rem",
      }}
    >
      {/* ── Page Header ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
              }}
            >
              <LayoutDashboard size={20} color="white" />
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Recruiter Dashboard
            </h1>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Welcome,{" "}
            <span style={{ color: "var(--accent-light)", fontWeight: 700 }}>
              {user?.name}
            </span>
            . Manage your job listings below.
          </p>
        </div>

        <Link
          to="/recruiter/create-job"
          className="btn-primary"
          style={{ padding: "0.75rem 1.375rem", fontSize: "0.9rem" }}
        >
          <Plus size={16} /> Post New Job
        </Link>
      </div>

      {/* ── Stats Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}
        id="dashboard-stats"
      >
        {/* Total Jobs */}
        <div
          style={{
            background: "rgba(22,22,31,0.85)",
            border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: "20px",
            padding: "1.75rem",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.25s ease",
          }}
          className="dash-stat-card"
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #8b5cf6, transparent)",
              borderRadius: "20px 20px 0 0",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Briefcase size={20} style={{ color: "var(--accent-light)" }} />
            </div>
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "var(--accent-light)",
              lineHeight: 1,
              marginBottom: "0.4rem",
            }}
          >
            {jobs.length}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Total Jobs Posted
          </div>
        </div>

        {/* Total Applicants */}
        <div
          style={{
            background: "rgba(22,22,31,0.85)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "20px",
            padding: "1.75rem",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.25s ease",
          }}
          className="dash-stat-card"
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #10b981, transparent)",
              borderRadius: "20px 20px 0 0",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={20} style={{ color: "var(--success)" }} />
            </div>
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "var(--success)",
              lineHeight: 1,
              marginBottom: "0.4rem",
            }}
          >
            {totalApplicants}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Total Applicants
          </div>
        </div>
      </div>

      {/* ── Section Label ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          Your Job Listings
        </h2>
        {jobs.length > 0 && (
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "0.25rem 0.75rem",
            }}
          >
            {jobs.length} {jobs.length === 1 ? "listing" : "listings"}
          </span>
        )}
      </div>

      {/* ── Job List ── */}
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
            style={{ color: "var(--text-muted)", margin: "0 auto 1rem", display: "block" }}
          />
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.5rem",
            }}
          >
            No jobs posted yet
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Start by posting your first job listing.
          </p>
          <Link to="/recruiter/create-job" className="btn-primary">
            <Plus size={15} /> Post First Job
          </Link>
        </div>
      ) : (
        <div
          className="stagger"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {jobs.map((job) => {
            const applicantCount = job.applicants?.length || 0;
            const initials = job.company
              ? job.company.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
              : "CF";

            return (
              <div
                key={job._id}
                style={{
                  background: "rgba(22,22,31,0.85)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "18px",
                  padding: "1.5rem 1.75rem",
                  transition: "all 0.25s ease",
                }}
                className="dash-job-card"
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Left — job info */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flex: 1,
                      minWidth: "200px",
                    }}
                  >
                    {/* Company Avatar */}
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "12px",
                        background: "rgba(139,92,246,0.15)",
                        border: "1px solid rgba(139,92,246,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "var(--accent-light)",
                        flexShrink: 0,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {initials}
                    </div>

                    <div>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: "0.35rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {job.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.875rem",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          <Building2 size={12} /> {job.company}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          <MapPin size={12} /> {job.location}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: applicantCount > 0 ? "var(--success)" : "var(--text-muted)",
                            background: applicantCount > 0 ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.05)",
                            border: `1px solid ${applicantCount > 0 ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.08)"}`,
                            borderRadius: "6px",
                            padding: "0.2rem 0.6rem",
                          }}
                        >
                          <Users size={11} />
                          {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right — action buttons */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      flexWrap: "wrap",
                      flexShrink: 0,
                    }}
                  >
                    <Link
                      to={`/recruiter/jobs/${job._id}/applicants`}
                      className="btn-ghost"
                      style={{ fontSize: "0.825rem", padding: "0.5rem 1rem" }}
                    >
                      <Users size={13} /> Applicants
                    </Link>
                    <Link
                      to={`/recruiter/edit-job/${job._id}`}
                      className="btn-secondary"
                      style={{ fontSize: "0.825rem", padding: "0.5rem 1rem" }}
                    >
                      <Pencil size={13} /> Edit
                    </Link>
                    <button
                      onClick={() => setConfirmDelete(job._id)}
                      className="btn-danger"
                      style={{ fontSize: "0.825rem", padding: "0.5rem 1rem" }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "1.5rem",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setConfirmDelete(null)}
        >
          <div
            style={{
              background: "rgba(22,22,31,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
              maxWidth: "380px",
              width: "100%",
              padding: "2.5rem",
              textAlign: "center",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}
            >
              <AlertTriangle size={24} style={{ color: "var(--warning)" }} />
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.625rem",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Delete this job?
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
              This action cannot be undone. All applicant data will be permanently lost.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={() => setConfirmDelete(null)}
                className="btn-ghost"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="btn-danger"
                disabled={deletingId === confirmDelete}
                style={{ padding: "0.75rem 1.5rem" }}
              >
                {deletingId === confirmDelete ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { #dashboard-stats { grid-template-columns: repeat(2, 1fr); } }
        .dash-stat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .dash-job-card:hover { border-color: rgba(139,92,246,0.3) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.25); }
      `}</style>
    </div>
  );
};

export default RecruiterDashboard;
