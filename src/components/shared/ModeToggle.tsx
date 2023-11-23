import { useTheme } from "@/context/ThemeProvider";
import React from "react";
import { Button } from "../ui/button";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "@radix-ui/react-icons";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme == "dark" ? (
        <Button size="icon" variant="ghost" onClick={() => setTheme("light")}>
          <SunIcon className="h-5 w-5" />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
