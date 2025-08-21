import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/office-booking" element={<OfficeBooking />} />
          <Route path="/meeting-rooms" element={<MeetingRooms />} />
          <Route path="/coworking" element={<Coworking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/spaces/:id" element={<SpaceDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTopButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
