import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: 12,
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <div style={{ position: "relative", flex: 1 }}>
        <Search
          size={18}
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Search jobs by title or location…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ paddingLeft: 44, paddingRight: value ? 40 : 16 }}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button type="submit" className="btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
