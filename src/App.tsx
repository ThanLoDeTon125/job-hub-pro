import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import CandidateLayout from "./layouts/CandidateLayout";
import EmployerLayout from "./layouts/EmployerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public pages
import HomePage from "./pages/HomePage";
import JobListPage from "./pages/JobListPage";
import JobDetailPage from "./pages/JobDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Candidate pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import CandidateApplied from "./pages/candidate/CandidateApplied";
import CandidateSaved from "./pages/candidate/CandidateSaved";

// Employer pages
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerCompany from "./pages/employer/EmployerCompany";
import EmployerJobs from "./pages/employer/EmployerJobs";
import EmployerApplicants from "./pages/employer/EmployerApplicants";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminStats from "./pages/admin/AdminStats";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Candidate */}
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route index element={<CandidateDashboard />} />
            <Route path="profile" element={<CandidateProfile />} />
            <Route path="applied" element={<CandidateApplied />} />
            <Route path="saved" element={<CandidateSaved />} />
          </Route>

          {/* Employer */}
          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<EmployerDashboard />} />
            <Route path="company" element={<EmployerCompany />} />
            <Route path="jobs" element={<EmployerJobs />} />
            <Route path="applicants" element={<EmployerApplicants />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
