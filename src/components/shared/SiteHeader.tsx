import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { buttonVariants } from "../ui/button";
import { GithubIcon } from "lucide-react";
import ModeToggle from "./ModeToggle";
import AdminNav from "./AdminNav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Navbar />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link to="/">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <GithubIcon className="h-5 w-5" />
              </div>
            </Link>
            {/* <Link to="/">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <TwitterIcon className="h-5 w-5" />
              </div>
            </Link> */}
            <ModeToggle />
            <AdminNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
