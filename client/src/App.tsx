import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MonthlyReports from "./pages/MonthlyReports";
import NotificationCenter from "./pages/NotificationCenter";
import { AuthProvider } from "./contexts/AuthContext";
import { ScheduleProvider } from "./contexts/ScheduleContext";
import { NotificationProvider } from "./contexts/NotificationContext";

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/"} component={Home} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/reports"} component={MonthlyReports} />
      <Route path={"/notifications"} component={NotificationCenter} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AuthProvider>
            <ScheduleProvider>
              <NotificationProvider>
                <Toaster />
                <Router />
              </NotificationProvider>
            </ScheduleProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
