import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">تم رفع الموقع بنجاح!</h1>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
