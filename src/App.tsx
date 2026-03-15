import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import CompanyLayout from "@/layouts/CompanyLayout";
import MinistryLayout from "@/layouts/MinistryLayout";

// Public pages
import HomePage from "@/pages/Index";
import AboutPage from "@/pages/About";
import OpportunitiesPage from "@/pages/Opportunities";
import OpportunityDetailPage from "@/pages/OpportunityDetail";
import DirectoryPage from "@/pages/Directory";
import CompanyPublicProfilePage from "@/pages/CompanyPublicProfile";
import FAQPage from "@/pages/FAQ";
import ContactPage from "@/pages/Contact";

// Auth pages
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import ForgotPasswordPage from "@/pages/ForgotPassword";

// Company portal
import CompanyDashboard from "@/pages/company/Dashboard";
import CompanyProfile from "@/pages/company/Profile";
import CompanyOpportunities from "@/pages/company/CompanyOpportunities";
import CompanyApplications from "@/pages/company/Applications";
import CompanyNotifications from "@/pages/company/Notifications";

// Ministry portal
import MinistryDashboard from "@/pages/ministry/Dashboard";
import CompanyManagement from "@/pages/ministry/CompanyManagement";
import CompanyDetail from "@/pages/ministry/CompanyDetail";
import OpportunityManagement from "@/pages/ministry/OpportunityManagement";
import ApplicationManagement from "@/pages/ministry/ApplicationManagement";
import Reports from "@/pages/ministry/Reports";
import AuditLog from "@/pages/ministry/AuditLog";
import Settings from "@/pages/ministry/Settings";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="a-propos" element={<AboutPage />} />
              <Route path="opportunites" element={<OpportunitiesPage />} />
              <Route path="opportunites/:id" element={<OpportunityDetailPage />} />
              <Route path="annuaire" element={<DirectoryPage />} />
              <Route path="annuaire/:id" element={<CompanyPublicProfilePage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<SignupPage />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />

            {/* Company portal */}
            <Route path="/entreprise" element={<CompanyLayout />}>
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="profil" element={<CompanyProfile />} />
              <Route path="opportunites" element={<CompanyOpportunities />} />
              <Route path="candidatures" element={<CompanyApplications />} />
              <Route path="notifications" element={<CompanyNotifications />} />
            </Route>

            {/* Ministry portal */}
            <Route path="/ministere" element={<MinistryLayout />}>
              <Route path="dashboard" element={<MinistryDashboard />} />
              <Route path="entreprises" element={<CompanyManagement />} />
              <Route path="entreprises/:id" element={<CompanyDetail />} />
              <Route path="opportunites" element={<OpportunityManagement />} />
              <Route path="candidatures" element={<ApplicationManagement />} />
              <Route path="rapports" element={<Reports />} />
              <Route path="audit" element={<AuditLog />} />
              <Route path="parametres" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
