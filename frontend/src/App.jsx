import { ThemeProvider } from "@/providers/theme-provider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { TooltipProvider } from "./components/ui/tooltip";

const App = () => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
