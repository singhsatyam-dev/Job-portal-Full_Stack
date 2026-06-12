import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { ProtectedRoute, RoleRoute, JobseekerRoute } from "./ProtectedRoute";

import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import JobDetailPage from "../pages/JobDetailPage";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import CreateJobPage from "../pages/CreateJobPage";
import EditJobPage from "../pages/EditJobPage";
import ApplicantsPage from "../pages/ApplicantsPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfileSetupPage from "../pages/ProfileSetupPage";
import GuestRoute from "../pages/GuestRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/profile-setup" element={<ProfileSetupPage />} />

        {/* Protected — any authenticated user */}
        <Route element={<ProtectedRoute />}>
          <Route path="/jobs" element={<HomePage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route
            path="/recruiter/jobs/:id/applicants"
            element={<ApplicantsPage />}
          />
        </Route>

        {/* Jobseeker-only — ATS re-check (no separate page needed, handled in JobDetailPage) */}
        <Route element={<JobseekerRoute />}>
          {/* placeholder — can add jobseeker-only pages here */}
        </Route>

        {/* Recruiter-only routes */}
        <Route element={<RoleRoute role="recruiter" />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/create-job" element={<CreateJobPage />} />
          <Route path="/recruiter/edit-job/:id" element={<EditJobPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
