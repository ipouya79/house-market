import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AdPage from "./pages/AdPage/AdPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useTheme } from "./contexts/ThemeContext";
import AddAdPage from "./pages/AddAdPage/AddAdPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <Toaster />
      <div className={`container ${theme}`}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-ad" element={<AddAdPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/ad/:id" element={<AdPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
