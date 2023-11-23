// import { useCurrentUser } from "@/lib/react-query/auth-queries";
// import { createContext, useContext } from "react";

// type AuthState = {
//   isCurrentUser: boolean;
//   currentUser: Record<string, any>;
//   login: () => void;
//   logout: () => void;
// };

// export const AuthContext = createContext<AuthState>({} as AuthState);

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (context === undefined)
//     throw new Error("useAuth must be used within the AuthContext");

//   return context;
// };

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const { isLoading: isCurrentUser, user: currentUser } = useCurrentUser();
//   return (
//     <>
//       <AuthContext.Provider
//         value={{
//           currentUser,
//           isCurrentUser,
//         }}
//       >
//         {children}
//       </AuthContext.Provider>
//     </>
//   );
// }
