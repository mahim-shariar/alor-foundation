import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar         from "./shared/Navbar";
import Footer         from "./shared/Footer";
import ScrollToTop    from "./components/ScrollToTop";
import LoadingScreen  from "./components/LoadingScreen";

import HomePage     from "./pages/HomePage";
import AboutPage    from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import GalleryPage  from "./pages/GalleryPage";
import NewsPage     from "./pages/NewsPage";
import ContactPage  from "./pages/ContactPage";
import TeamPage     from "./pages/TeamPage";
import StoriesPage  from "./pages/StoriesPage";
import NotFoundPage from "./pages/NotFoundPage";

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

function PublicRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<HomePage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/gallery"  element={<GalleryPage />} />
        <Route path="/news"     element={<NewsPage />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/team"     element={<TeamPage />} />
        <Route path="/stories"  element={<StoriesPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function PublicLayout({ loading }) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <PublicRoutes />
      <Footer />
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2600);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#050f0a] flex items-center justify-center text-white">Loading...</div>}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="/*" element={<PublicLayout loading={loading} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
