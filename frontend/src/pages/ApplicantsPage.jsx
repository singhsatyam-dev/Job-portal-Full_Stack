import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Mail,
  FileText,
  Calendar,
  Inbox,
} from "lucide-react";
import { getApplicants, getJobById } from "../api/jobs.api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const ApplicantsPage = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching all applicants for a job, Fetching job details, Storing data into component state ,
  // and Running whenever job Id changes 
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
    <div
      className="page-container-md"
      style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}
    >
      <Link to="/recruiter/dashboard" className="btn-ghost inline-flex mb-6">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="glass fade-in px-8 py-7 mb-6">
        <div className="flex items-center gap-2.5 mb-1.5">
          <Users size={20} style={{ color: "var(--accent-light)" }} />
          <h1
            className="font-extrabold text-2xl"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Applicants
          </h1>
        </div>
        <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
          For:{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--accent-light)" }}
          >
            {jobTitle}
          </span>
        </p>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--border-hover)",
            color: "var(--accent-light)",
          }}
        >
          <Users size={12} />
          {applicants.length}{" "}
          {applicants.length === 1 ? "applicant" : "applicants"}
        </div>
      </div>

      {loading ? (
        <Loader size="lg" />
      ) : applicants.length === 0 ? (
        <div className="glass p-16 text-center">
          <Inbox
            size={48}
            className="mx-auto mb-4"
            style={{ color: "var(--text-muted)" }}
          />
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            No applicants yet
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Share your job listing to attract candidates.
          </p>
        </div>
      ) : (
        <div className="stagger flex flex-col gap-3.5">
          {applicants.map((applicant, i) => (
            <div key={i} className="glass glass-hover px-6 py-5">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                {/* Applicant Info */}
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                      color: "white",
                    }}
                  >
                    {applicant.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {applicant.name}
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Mail size={12} /> <span>{applicant.email}</span>
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Calendar size={12} />
                    <span>
                      {new Date(applicant.appliedAt).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </span>
                  </div>
                  {applicant.resume ? (
                    <a
                      href={`http://localhost:3000/uploads/resumes/${applicant.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                      style={{ padding: "7px 13px" }}
                    >
                      <FileText size={13} /> Resume
                    </a>
                  ) : (
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      No resume
                    </span>
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
