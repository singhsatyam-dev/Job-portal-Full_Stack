import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Plus, Pencil, Trash2, Users, Briefcase,
  MapPin, Building2, AlertTriangle
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

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <LayoutDashboard size={20} color="var(--accent-light)" />
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Recruiter Dashboard
            </h1>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Welcome, <span style={{ color: "var(--accent-light)", fontWeight: 600 }}>{user?.name}</span>. Manage your job listings below.
          </p>
        </div>
        <Link to="/recruiter/create-job" className="btn-primary">
          <Plus size={16} /> Post New Job
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div className="glass" style={{ padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-light)", fontFamily: "'Outfit', sans-serif" }}>
            {jobs.length}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 4 }}>Total Jobs</div>
        </div>
        <div className="glass" style={{ padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--success)", fontFamily: "'Outfit', sans-serif" }}>
            {jobs.reduce((sum, j) => sum + (j.applicants?.length || 0), 0)}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 4 }}>Total Applicants</div>
        </div>
      </div>

      {/* Job List */}
      {loading ? (
        <Loader size="lg" />
      ) : jobs.length === 0 ? (
        <div className="glass" style={{ padding: "60px 24px", textAlign: "center" }}>
          <Briefcase size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ color: "var(--text-secondary)", marginBottom: 8 }}>No jobs posted yet</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
            Start by posting your first job listing.
          </p>
          <Link to="/recruiter/create-job" className="btn-primary">
            <Plus size={15} /> Post First Job
          </Link>
        </div>
      ) : (
        <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {jobs.map((job) => (
            <div
              key={job._id}
              className="glass glass-hover"
              style={{ padding: "24px" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                    {job.title}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.83rem" }}>
                      <Building2 size={12} /> {job.company}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.83rem" }}>
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "rgba(16,185,129,0.1)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        borderRadius: 6,
                        padding: "2px 10px",
                        color: "var(--success)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      <Users size={11} /> {job.applicants?.length || 0} applicants
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link
                    to={`/recruiter/jobs/${job._id}/applicants`}
                    className="btn-ghost"
                    style={{ fontSize: "0.82rem", padding: "7px 14px" }}
                  >
                    <Users size={13} /> Applicants
                  </Link>
                  <Link
                    to={`/recruiter/edit-job/${job._id}`}
                    className="btn-secondary"
                    style={{ fontSize: "0.82rem", padding: "7px 14px" }}
                  >
                    <Pencil size={13} /> Edit
                  </Link>
                  <button
                    onClick={() => setConfirmDelete(job._id)}
                    className="btn-danger"
                    style={{ fontSize: "0.82rem", padding: "7px 14px" }}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 24,
          }}
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="glass"
            style={{ maxWidth: 380, width: "100%", padding: 32, textAlign: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle size={40} color="var(--warning)" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
              Delete Job?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 24 }}>
              This action cannot be undone. All applicants will be lost.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setConfirmDelete(null)} className="btn-ghost">Cancel</button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="btn-danger"
                disabled={deletingId === confirmDelete}
              >
                {deletingId === confirmDelete ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
