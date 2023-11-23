import { Button } from "@/components/ui/button";
import { useLogoutUser } from "@/lib/react-query/auth-queries";
import React from "react";

export default function Librarian() {
  const { signOut } = useLogoutUser();

  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
