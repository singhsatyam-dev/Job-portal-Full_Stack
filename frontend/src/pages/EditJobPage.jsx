import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Pencil, ArrowLeft, Briefcase } from "lucide-react";
import { getJobById, updateJob } from "../api/jobs.api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getJobById(id);
        const j = res.data.job;
        setForm({
          title: j.title,
          company: j.company,
          location: j.location,
          salary: j.salary || "",
          description: j.description,
          skills: Array.isArray(j.skills) ? j.skills.join(", ") : "",
        });
      } catch {
        toast.error("Failed to load job data");
        navigate("/recruiter/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

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
    setSaving(true);
    try {
      await updateJob(id, payload);
      toast.success("Job updated successfully!");
      navigate("/recruiter/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ minHeight: "60vh" }}><Loader size="lg" /></div>;

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
            <Pencil size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Edit Job
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Update the job listing details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="form-label">Job Title *</label>
              <input type="text" name="title" className="form-input" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Company Name *</label>
              <input type="text" name="company" className="form-input" value={form.company} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="form-label">Location *</label>
              <input type="text" name="location" className="form-input" value={form.location} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Salary</label>
              <input type="text" name="salary" className="form-input" value={form.salary} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="form-label">Job Description *</label>
            <textarea
              name="description"
              className="form-input"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
              style={{ resize: "vertical", fontFamily: "inherit" }}
            />
          </div>

          <div>
            <label className="form-label">Required Skills (comma separated)</label>
            <input type="text" name="skills" className="form-input" value={form.skills} onChange={handleChange} />
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
            disabled={saving}
            style={{
              justifyContent: "center",
              padding: "13px",
              fontSize: "0.95rem",
              marginTop: 4,
              opacity: saving ? 0.7 : 1,
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                Saving…
              </span>
            ) : (
              <><Briefcase size={16} /> Save Changes</>
            )}
          </button>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default EditJobPage;
