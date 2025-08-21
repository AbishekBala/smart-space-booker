import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Index from "./pages/Index";
import OfficeBooking from "./pages/OfficeBooking";
import MeetingRooms from "./pages/MeetingRooms";
import Coworking from "./pages/Coworking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Spaces from "./pages/Spaces";
import SpaceDetails from "./pages/SpaceDetails";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import BookSpace from "./pages/BookSpace";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/office-booking" element={<OfficeBooking />} />
        <Route path="/meeting-rooms" element={<MeetingRooms />} />
        <Route path="/coworking" element={<Coworking />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:id" element={<SpaceDetails />} />
        <Route path="/book" element={<BookSpace />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <ScrollToTopButton />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
