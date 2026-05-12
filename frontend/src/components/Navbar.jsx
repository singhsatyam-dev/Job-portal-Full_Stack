import { Link, useNavigate } from "react-router-dom";
import { Briefcase, LogOut, Plus, LayoutDashboard, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../api/auth.api";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (_) {}
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(139,92,246,0.4)",
            }}
          >
            <Briefcase size={18} color="white" />
          </div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "var(--text-primary)",
            }}
          >
            Job<span className="gradient-text">Portal</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden md:flex">
          <Link to="/" className="btn-ghost" style={{ fontSize: "0.9rem" }}>
            Browse Jobs
          </Link>

          {isAuthenticated && user?.role === "recruiter" && (
            <>
              <Link to="/recruiter/dashboard" className="btn-ghost" style={{ fontSize: "0.9rem" }}>
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <Link to="/recruiter/create-job" className="btn-primary" style={{ fontSize: "0.9rem" }}>
                <Plus size={15} />
                Post Job
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-hover)",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: "0.85rem",
                  color: "var(--accent-light)",
                  fontWeight: 600,
                }}
              >
                {user?.name}
              </div>
              <button onClick={handleLogout} className="btn-danger" style={{ padding: "8px 14px" }}>
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/login" className="btn-ghost">
                <LogIn size={15} />
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                <UserPlus size={15} />
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn-ghost md:hidden"
          style={{ padding: 8, border: "none" }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--bg-secondary)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
          className="md:hidden"
        >
          <Link to="/" className="btn-ghost" onClick={() => setMenuOpen(false)}>
            Browse Jobs
          </Link>
          {isAuthenticated && user?.role === "recruiter" && (
            <>
              <Link to="/recruiter/dashboard" className="btn-ghost" onClick={() => setMenuOpen(false)}>
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <Link to="/recruiter/create-job" className="btn-primary" onClick={() => setMenuOpen(false)}>
                <Plus size={15} /> Post Job
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn-danger">
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" onClick={() => setMenuOpen(false)}>
                <LogIn size={15} /> Login
              </Link>
              <Link to="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>
                <UserPlus size={15} /> Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
