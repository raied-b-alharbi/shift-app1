import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MonthlyReports from "./pages/MonthlyReports";
import NotificationCenter from "./pages/NotificationCenter";

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
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
