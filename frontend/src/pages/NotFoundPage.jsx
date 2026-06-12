import { Link } from "react-router-dom";
import { Home, Frown } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="gradient-text font-black leading-none mb-2"
        style={{ fontSize: "8rem", fontFamily: "'Outfit', sans-serif" }}>
        404
      </div>
      <Frown size={48} className="mx-auto my-4" style={{ color: "var(--text-muted)" }} />
      <h1 className="text-2xl font-bold mb-2.5" style={{ color: "var(--text-primary)" }}>
        Page Not Found
      </h1>
      <p className="text-sm leading-relaxed mb-7 max-w-sm" style={{ color: "var(--text-muted)" }}>
        Looks like this page doesn't exist. It may have been removed or the URL might be wrong.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={16} /> Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
