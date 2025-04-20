
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import DexNavigation from "@/components/DexNavigation";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import KYCForm from "./components/KYCForm";
import TradePage from "./pages/TradePage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-dex-dark via-dex-primary/20 to-dex-secondary/20">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/kyc"
                element={
                  <PrivateRoute>
                    <KYCForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute requireKyc={true}>
                    <div className="pt-16 pb-20">
                      <DexNavigation />
                      <div className="container mx-auto px-4">
                        <HomePage />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/trade"
                element={
                  <PrivateRoute requireKyc={true}>
                    <div className="pt-16 pb-20">
                      <DexNavigation />
                      <div className="container mx-auto px-4">
                        <TradePage />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <PrivateRoute requireKyc={true}>
                    <div className="pt-16 pb-20">
                      <DexNavigation />
                      <div className="container mx-auto px-4">
                        <ExplorePage />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute requireKyc={true}>
                    <div className="pt-16 pb-20">
                      <DexNavigation />
                      <div className="container mx-auto px-4">
                        <ProfilePage />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
