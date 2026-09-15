import { ThemeProvider } from "@/providers/theme-provider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toast";

const App = () => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
       <Toaster position="top-right" richColors />
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
