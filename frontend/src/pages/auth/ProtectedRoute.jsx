import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { Spinner } from "@/components/ui/spinner";

export const ProtectedRoute = () => {
  const { user, isAuthenticated, isInitializing } = useSelector(
    (state) => state.auth
  );

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return isAuthenticated && user ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} replace />;
};