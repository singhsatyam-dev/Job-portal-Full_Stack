import { Link } from "react-router-dom";
import { Home, Frown } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 24px",
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          fontWeight: 900,
          fontFamily: "'Outfit', sans-serif",
          lineHeight: 1,
          marginBottom: 8,
        }}
        className="gradient-text"
      >
        404
      </div>
      <Frown size={48} color="var(--text-muted)" style={{ margin: "16px auto" }} />
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>
        Page Not Found
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: 360, lineHeight: 1.6, marginBottom: 28 }}>
        Looks like this page doesn't exist. It may have been removed or the URL might be wrong.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={16} /> Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
