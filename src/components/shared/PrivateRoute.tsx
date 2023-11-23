import { useCurrentUser } from "@/lib/react-query/auth-queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

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
  if (isAuthenticated) return children;
}
