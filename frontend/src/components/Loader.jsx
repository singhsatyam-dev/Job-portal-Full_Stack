const Loader = ({ size = "md" }) => {
  const sizeClass = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-12 h-12" : "w-8 h-8";
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className={`${sizeClass} border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;
