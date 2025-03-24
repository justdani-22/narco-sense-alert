
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PreferenceProvider } from "@/context/PreferenceContext";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Questionnaire from "./pages/Questionnaire";
import Consultation from "./pages/Consultation";
import Profile from "./pages/Profile";
import Doctor from "./pages/Doctor";
import NotFound from "./pages/NotFound";
import AttackHistory from "@/components/AttackHistory";
import MedicationTracking from "@/components/MedicationTracking";
import WearableSection from "@/components/WearableSection";
import CommunitySection from "@/components/CommunitySection";
import Personalization from "./pages/Personalization";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PreferenceProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/attacks" element={<AttackHistory />} />
            <Route path="/medications" element={<MedicationTracking />} />
            <Route path="/wearable" element={<WearableSection />} />
            <Route path="/community" element={<CommunitySection />} />
            <Route path="/personalization" element={<Personalization />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PreferenceProvider>
  </QueryClientProvider>
);

export default App;
