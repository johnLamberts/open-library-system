import { useCurrentUser } from "@/lib/react-query/auth-queries";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function RequiredAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, user } = useCurrentUser();
  // const navigate = useNavigate();
  const location = useLocation();

  //   useEffect(() => {
  //     if (user?.userRole !== "Admin")
  //       return (
  //         <Navigate to={"unauthorized"} state={{ from: location }} replace />
  //       );
  //   }, [user.userRole, navigate]);

  if (isLoading)
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <div className="flex justify-center items-center max-w-fit">
            <Loader height={24} width={24} />
            <div>Loading...</div>
          </div>
        </div>
      </>
    );
  //   if (user?.userRole === "Admin") return children;

  return user?.userRole === "Admin" ? (
    children
  ) : (
    <Navigate to={"unauthorized"} state={{ from: location }} replace />
  );
}
