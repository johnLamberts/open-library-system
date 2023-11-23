import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queries-keys";
import { getCurrentUser, logout } from "@/services/auth";
import { useNavigate } from "react-router-dom";

export function useCurrentUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USERS],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated:
      user?.userRole === "Admin" ||
      user?.userRole === "Librarian" ||
      user?.userRole === "Staff",
  };
}

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLogout, mutate: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(), navigate("/login");
    },
  });

  return { isLogout, signOut };
}
