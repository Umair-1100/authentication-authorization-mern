import { ThemeProvider } from "@/providers/theme-provider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setInitializing, setUser } from "./store/slices/auth.slice";
import api from "./api/axios";
import { Spinner } from "./components/ui/spinner";

const App = () => {
  const dispatch = useDispatch();
  const { isInitializing } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        dispatch(setInitializing(false));
        return;
      }

      try {
        const res = await api.get("/auth/me");
        console.log(res);
        
        dispatch(setUser(res.data.user));
      } catch (error) {
        console.error("Session rehydration failed", error);
        dispatch(logout());
      }
    };
    fetchUserProfile();
  }, [dispatch]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

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
