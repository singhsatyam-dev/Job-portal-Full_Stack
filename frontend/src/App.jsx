import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#16161f",
            color: "#f1f1f5",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontSize: "0.875rem",
            fontFamily: "'Inter', sans-serif",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#0a0a0f" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#0a0a0f" },
          },
        }}
      />
    </>
  );
}

export default App;
