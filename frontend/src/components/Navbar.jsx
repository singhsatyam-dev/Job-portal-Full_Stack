import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  LogOut,
  Plus,
  LayoutDashboard,
  LogIn,
  UserPlus,
  Menu,
  X,
  User,
} from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../api/auth.api";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout from CareerForge?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#6b7280",
      background: "#111827",
      color: "#ffffff",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;
    
    try {
      await logoutUser();
    } catch (_) {}
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10, 10, 15, 0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "11px",
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              boxShadow: "0 4px 16px rgba(139,92,246,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Briefcase size={18} color="white" />
          </div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            Career<span className="gradient-text">Forge</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "0.5rem" }}
        >
          <Link
            to="/jobs"
            className="btn-ghost"
            style={{ fontSize: "0.875rem" }}
          >
            Browse Jobs
          </Link>

          {isAuthenticated && user?.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/dashboard"
                className="btn-ghost"
                style={{ fontSize: "0.875rem" }}
              >
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <Link
                to="/recruiter/create-job"
                className="btn-primary"
                style={{ fontSize: "0.875rem" }}
              >
                <Plus size={15} /> Post Job
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginLeft: "0.25rem",
              }}
            >
              {/* User badge — same height as buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.45rem 0.875rem",
                  borderRadius: "10px",
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  color: "var(--accent-light)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  height: "36px",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                {user?.name}
              </div>

              <button
                onClick={handleLogout}
                className="btn-danger"
                style={{
                  height: "36px",
                  padding: "0 14px",
                  fontSize: "0.875rem",
                }}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginLeft: "0.25rem",
              }}
            >
              <Link
                to="/login"
                className="btn-ghost"
                style={{ fontSize: "0.875rem" }}
              >
                <LogIn size={15} /> Login
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                style={{ fontSize: "0.875rem" }}
              >
                <UserPlus size={15} /> Register
              </Link>
            </div>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "0.45rem",
            cursor: "pointer",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(15, 15, 22, 0.97)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
          }}
        >
          <Link
            to="/jobs"
            className="btn-ghost"
            onClick={() => setMenuOpen(false)}
          >
            Browse Jobs
          </Link>

          {isAuthenticated && user?.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/dashboard"
                className="btn-ghost"
                onClick={() => setMenuOpen(false)}
              >
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <Link
                to="/recruiter/create-job"
                className="btn-primary"
                onClick={() => setMenuOpen(false)}
              >
                <Plus size={15} /> Post Job
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  color: "var(--accent-light)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                <User size={14} />
                {user?.name}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn-danger"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-ghost"
                onClick={() => setMenuOpen(false)}
              >
                <LogIn size={15} /> Login
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                onClick={() => setMenuOpen(false)}
              >
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
