import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/constants/routes.constants";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const GuestRoute = () => {
  const { isAuthenticated, isInitializing } = useSelector(
    (state) => state.auth
  );

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};