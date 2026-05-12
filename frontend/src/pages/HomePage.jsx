import { useState, useEffect } from "react";
import { Briefcase, TrendingUp, Users, Zap } from "lucide-react";
import { getJobs } from "../api/jobs.api";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const STATS = [
  { icon: Briefcase, label: "Jobs Listed", value: "10K+" },
  { icon: Users, label: "Job Seekers", value: "50K+" },
  { icon: TrendingUp, label: "Placements", value: "5K+" },
  { icon: Zap, label: "Companies", value: "200+" },
];

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (q = "", page = 1) => {
    setLoading(true);
    try {
      const res = await getJobs(q, page);
      setJobs(res.data.jobs);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          padding: "80px 24px 64px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="fade-in" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--accent-dim)",
              border: "1px solid var(--border-hover)",
              borderRadius: 100,
              padding: "6px 16px",
              fontSize: "0.8rem",
              color: "var(--accent-light)",
              fontWeight: 600,
              marginBottom: 24,
              letterSpacing: "0.04em",
            }}
          >
            <Zap size={13} fill="currentColor" />
            Find Your Dream Job Today
          </div>

          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
              color: "var(--text-primary)",
            }}
          >
            Discover Amazing <br />
            <span className="gradient-text">Career Opportunities</span>
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              marginBottom: 40,
              maxWidth: 540,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Browse thousands of jobs from top companies. Find the perfect role that matches your skills and ambitions.
          </p>

          <SearchBar onSearch={handleSearch} initialValue={search} />
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "0 24px 60px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 16,
          }}
        >
          {STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="glass"
              style={{ padding: "20px", textAlign: "center" }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-hover)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <Icon size={18} color="var(--accent-light)" />
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Outfit', sans-serif" }}>
                {value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs Section */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Outfit', sans-serif" }}>
                {search ? `Results for "${search}"` : "Latest Jobs"}
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: 4 }}>
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>

          {loading ? (
            <Loader size="lg" />
          ) : jobs.length === 0 ? (
            <div
              className="glass"
              style={{ padding: "60px 24px", textAlign: "center" }}
            >
              <Briefcase size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ color: "var(--text-secondary)", marginBottom: 8 }}>No jobs found</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Try adjusting your search or check back later.
              </p>
            </div>
          ) : (
            <div
              className="stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 20,
              }}
            >
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
