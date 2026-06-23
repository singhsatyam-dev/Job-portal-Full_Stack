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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <div
      className="page-container-sm"
      style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}
    >
      <Link to="/recruiter/dashboard" className="btn-ghost inline-flex mb-6">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div
        className="glass fade-in"
        style={{ padding: "2.5rem", borderRadius: "24px" }}
      >
        <div className="flex items-center gap-3 mb-7">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
          >
            <Plus size={20} color="white" />
          </div>
          <div>
            <h1
              className="font-extrabold text-xl"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "var(--text-primary)",
              }}
            >
              Post a New Job
            </h1>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Fill in the details below to publish your listing
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g. Frontend Developer"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="company"
                className="form-input"
                placeholder="e.g. TechCorp Inc."
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Location *</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="e.g. Remote, Bangalore"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label">Salary (optional)</label>
              <input
                type="text"
                name="salary"
                className="form-input"
                placeholder="e.g. ₹12-18 LPA"
                value={form.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Job Description *</label>
            <textarea
              name="description"
              className="form-input resize-y"
              style={{ fontFamily: "inherit" }}
              placeholder="Describe the role, responsibilities, and requirements…"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
            />
          </div>

          <div>
            <label className="form-label">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              className="form-input"
              placeholder="e.g. React, Node.js, MongoDB"
              value={form.skills}
              onChange={handleChange}
            />
            {form.skills && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {form.skills.split(",").map(
                  (s, i) =>
                    s.trim() && (
                      <span key={i} className="skill-chip">
                        {s.trim()}
                      </span>
                    ),
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary justify-center py-3.5 text-base mt-1"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting Job…
              </span>
            ) : (
              <>
                <Briefcase size={16} /> Publish Job
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
