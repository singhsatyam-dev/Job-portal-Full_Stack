import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { ProtectedRoute, RoleRoute } from "./ProtectedRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import JobDetailPage from "../pages/JobDetailPage";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import CreateJobPage from "../pages/CreateJobPage";
import EditJobPage from "../pages/EditJobPage";
import ApplicantsPage from "../pages/ApplicantsPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />

        {/* Protected — any authenticated user */}
        <Route element={<ProtectedRoute />}>
          <Route path="/recruiter/jobs/:id/applicants" element={<ApplicantsPage />} />
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
