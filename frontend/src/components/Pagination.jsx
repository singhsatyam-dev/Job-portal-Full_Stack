import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "24px 0" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-ghost"
        style={{
          padding: "8px 14px",
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid",
              borderColor: page === currentPage ? "var(--accent)" : "var(--border)",
              background: page === currentPage ? "var(--accent-dim)" : "transparent",
              color: page === currentPage ? "var(--accent-light)" : "var(--text-secondary)",
              fontWeight: page === currentPage ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "0.9rem",
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-ghost"
        style={{
          padding: "8px 14px",
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
