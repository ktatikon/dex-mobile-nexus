
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
import TradePage from "./pages/TradePage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import WalletPage from "./pages/WalletPage";
import ActivityPage from "./pages/ActivityPage";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import LimitPage from "./pages/LimitPage";
import SendPage from "./pages/SendPage";
import ReceivePage from "./pages/ReceivePage";

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
                path="/"
                element={
                  <PrivateRoute>
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
                  <PrivateRoute>
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
                path="/wallet"
                element={
                  <PrivateRoute>
                    <div className="pt-16 pb-20">
                      <DexNavigation />
                      <div className="container mx-auto px-4">
                        <WalletPage />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/activity"
                element={
                  <PrivateRoute>
                    <div className="pt-16 pb-20">
                      <DexNavigation />
                      <div className="container mx-auto px-4">
                        <ActivityPage />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <PrivateRoute>
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
                  <PrivateRoute>
                    <div className="pt-16 pb-20">
                      <DexNavigation />
                      <div className="container mx-auto px-4">
                        <ProfilePage />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/buy"
                element={
                  <PrivateRoute>
                    <BuyPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sell"
                element={
                  <PrivateRoute>
                    <SellPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/limit"
                element={
                  <PrivateRoute>
                    <LimitPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/send"
                element={
                  <PrivateRoute>
                    <SendPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/receive"
                element={
                  <PrivateRoute>
                    <ReceivePage />
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
