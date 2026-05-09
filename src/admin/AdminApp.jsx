import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SetupPage from './pages/SetupPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import StoriesPage from './pages/StoriesPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import MilestonesPage from './pages/MilestonesPage.jsx';
import ValuesPage from './pages/ValuesPage.jsx';
import FAQsPage from './pages/FAQsPage.jsx';
import PartnersPage from './pages/PartnersPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NewsletterPage from './pages/NewsletterPage.jsx';
import ChangePasswordPage from './pages/ChangePasswordPage.jsx';
import SecurityQuestionPage from './pages/SecurityQuestionPage.jsx';

export default function AdminApp() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="setup" element={<ProtectedRoute><SetupPage /></ProtectedRoute>} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="milestones" element={<MilestonesPage />} />
          <Route path="values" element={<ValuesPage />} />
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="security-question" element={<SecurityQuestionPage />} />
        </Route>
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
}
