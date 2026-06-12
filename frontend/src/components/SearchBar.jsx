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
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-xl mx-auto">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }} />
        <input type="text" className="form-input pl-11"
          style={{ paddingRight: value ? 40 : 16 }}
          placeholder="Search jobs by title or location…"
          value={value} onChange={(e) => setValue(e.target.value)} />
        {value && (
          <button type="button" onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
            <X size={16} />
          </button>
        )}
      </div>
      <button type="submit" className="btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;
