import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, ArrowLeft, Briefcase } from "lucide-react";
import { createJob } from "../api/jobs.api";
import toast from "react-hot-toast";

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    setLoading(true);
    try {
      await createJob(payload);
      toast.success("Job posted successfully!");
      navigate("/recruiter/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      <Link to="/recruiter/dashboard" className="btn-ghost" style={{ marginBottom: 24, display: "inline-flex" }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="glass fade-in" style={{ padding: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Post a New Job
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Fill in the details below to publish your listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="form-label">Job Title *</label>
              <input type="text" name="title" className="form-input" placeholder="e.g. Frontend Developer" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Company Name *</label>
              <input type="text" name="company" className="form-input" placeholder="e.g. TechCorp Inc." value={form.company} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="form-label">Location *</label>
              <input type="text" name="location" className="form-input" placeholder="e.g. Remote, Bangalore" value={form.location} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Salary (optional)</label>
              <input type="text" name="salary" className="form-input" placeholder="e.g. ₹12-18 LPA" value={form.salary} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="form-label">Job Description *</label>
            <textarea
              name="description"
              className="form-input"
              placeholder="Describe the role, responsibilities, and requirements…"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
              style={{ resize: "vertical", fontFamily: "inherit" }}
            />
          </div>

          <div>
            <label className="form-label">Required Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              className="form-input"
              placeholder="e.g. React, Node.js, MongoDB"
              value={form.skills}
              onChange={handleChange}
            />
            {form.skills && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {form.skills.split(",").map((s, i) => s.trim() && (
                  <span key={i} className="skill-chip">{s.trim()}</span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              justifyContent: "center",
              padding: "13px",
              fontSize: "0.95rem",
              marginTop: 4,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                Posting Job…
              </span>
            ) : (
              <><Briefcase size={16} /> Publish Job</>
            )}
          </button>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default CreateJobPage;
