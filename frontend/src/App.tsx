import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/toaster"
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./assets/Navbar";
import { ThemeProvider } from "./assets/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="min-h-[100vh]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
    <Toaster />
    </ThemeProvider>
  );
}

export default App;
