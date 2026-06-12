import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className="btn-ghost" style={{ padding: "8px 14px", opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
        <ChevronLeft size={16} /> Prev
      </button>

      <div className="flex gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => onPageChange(page)}
            className="w-9 h-9 rounded-lg border text-sm transition-all"
            style={{
              borderColor: page === currentPage ? "var(--accent)" : "var(--border)",
              background: page === currentPage ? "var(--accent-dim)" : "transparent",
              color: page === currentPage ? "var(--accent-light)" : "var(--text-secondary)",
              fontWeight: page === currentPage ? 700 : 400,
              cursor: "pointer",
            }}>
            {page}
          </button>
        ))}
      </div>

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className="btn-ghost" style={{ padding: "8px 14px", opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
