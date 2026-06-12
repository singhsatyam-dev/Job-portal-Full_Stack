import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Pencil, ArrowLeft, Briefcase } from "lucide-react";
import { getJobById, updateJob } from "../api/jobs.api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", company: "", location: "", salary: "", description: "", skills: "" });
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
    const payload = { ...form, skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) };
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

  if (loading) return <div className="min-h-[60vh]"><Loader size="lg" /></div>;

  return (
    <div className="page-container-sm" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      <Link to="/recruiter/dashboard" className="btn-ghost inline-flex mb-6">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="glass fade-in" style={{ padding: "2.5rem", borderRadius: "24px" }}>
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
            <Pencil size={20} color="white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)" }}>
              Edit Job
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Update the job listing details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Job Title *</label>
              <input type="text" name="title" className="form-input" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Company Name *</label>
              <input type="text" name="company" className="form-input" value={form.company} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <textarea name="description" className="form-input resize-y" style={{ fontFamily: "inherit" }}
              value={form.description} onChange={handleChange} required rows={6} />
          </div>

          <div>
            <label className="form-label">Required Skills (comma separated)</label>
            <input type="text" name="skills" className="form-input" value={form.skills} onChange={handleChange} />
            {form.skills && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {form.skills.split(",").map((s, i) => s.trim() && (
                  <span key={i} className="skill-chip">{s.trim()}</span>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary justify-center py-3.5 text-base mt-1"
            disabled={saving} style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving…
              </span>
            ) : (
              <><Briefcase size={16} /> Save Changes</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
