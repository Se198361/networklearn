/**
 * ============================================================================
 * ROOT APPLICATION COMPONENT
 * ============================================================================
 * 
 * The main entry point component for the NetWorkLearn application.
 * Sets up global providers and routing configuration.
 * 
 * PROVIDERS CONFIGURED:
 * - QueryClientProvider: React Query for data fetching (if needed later)
 * - TooltipProvider: Shadcn/ui tooltip context
 * - Toaster components: For toast notifications
 * - BrowserRouter: React Router for client-side routing
 * 
 * ROUTES:
 * - "/" : Landing page (Index component)
 * - "/game" : Main game page (Game component)
 * - "*" : 404 Not Found page (catch-all)
 * 
 * NOTE: All custom routes should be added ABOVE the catch-all "*" route
 * ============================================================================
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

// =============================================================================
// QUERY CLIENT SETUP
// =============================================================================

/**
 * React Query client instance
 * Used for server state management and caching
 * Currently not heavily used but available for future API integration
 */
const queryClient = new QueryClient();

// =============================================================================
// MAIN APP COMPONENT
// =============================================================================

/**
 * App Component
 * 
 * Root component that wraps the entire application with necessary providers
 * and sets up the routing structure.
 */
const App = () => (
  // React Query provider for data fetching utilities
  <QueryClientProvider client={queryClient}>
    {/* Tooltip provider for shadcn/ui tooltip components */}
    <TooltipProvider>
      {/* Toast notification containers */}
      <Toaster />
      <Sonner />
      
      {/* Client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<Index />} />
          
          {/* Main game route */}
          <Route path="/game" element={<Game />} />
          
          {/* ============================================================= */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* ============================================================= */}
          
          {/* 404 catch-all route (must be last) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
