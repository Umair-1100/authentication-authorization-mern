import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constants";
import { logout } from "@/store/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    dispatch(logout());
    navigate(ROUTES.AUTH.LOGIN, { replace: true });
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h2 className="text-2xl">{user?.name || "Guest"}</h2>
      <Button className="w-full max-w-xs" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
