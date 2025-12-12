import { useState, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/Toast";

function App() {
  const [toast, setToast] = useState(null);

  // 🌞 Make LIGHT the default + apply saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme || savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      {/* GLOBAL TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ROUTES */}
      <AppRoutes setToast={setToast} />
    </>
  );
}

export default App;
