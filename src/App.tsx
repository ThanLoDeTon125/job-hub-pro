import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import CandidateLayout from "./layouts/CandidateLayout";
import EmployerLayout from "./layouts/EmployerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import HomePage from "./pages/HomePage";
import JobListPage from "./pages/JobListPage";
import JobDetailPage from "./pages/JobDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

// Candidate Pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import CandidateApplied from "./pages/candidate/CandidateApplied";
import CandidateSaved from "./pages/candidate/CandidateSaved";

// Employer Pages
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerCompany from "./pages/employer/EmployerCompany";
import EmployerJobs from "./pages/employer/EmployerJobs";
import EmployerApplicants from "./pages/employer/EmployerApplicants";
import EmployerLoginPage from "./pages/employer/EmployerLoginPage";
import EmployerRegisterPage from "./pages/employer/EmployerRegisterPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminStats from "./pages/admin/AdminStats";

// THÊM: Pages Tin Tức (Articles)
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminReviews from "./pages/admin/AdminReviews";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />

            {/* Thêm Route cho Tin Tức */}
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
          </Route>

          {/* AUTH ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* THÊM 2 DÒNG NÀY CHO NHÀ TUYỂN DỤNG */}
          <Route path="/employer/login" element={<EmployerLoginPage />} />
          <Route path="/employer/register" element={<EmployerRegisterPage />} />

          {/* CANDIDATE ROUTES */}
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<CandidateProfile />} />
            <Route path="applied" element={<CandidateApplied />} />
            <Route path="saved" element={<CandidateSaved />} />
          </Route>

          {/* EMPLOYER ROUTES */}
          <Route path="/employer" element={<EmployerLayout />}>
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="company" element={<EmployerCompany />} />
            <Route path="jobs" element={<EmployerJobs />} />
            <Route path="applicants" element={<EmployerApplicants jobId={0} />} />
            {/* Cho phép NTD viết bài */}
            <Route path="articles" element={<AdminArticles />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="stats" element={<AdminStats />} />
            {/* Cho phép Admin viết/quản lý bài */}
            <Route path="articles" element={<AdminArticles />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;