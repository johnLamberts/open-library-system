import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <>
      {/* <div className="flex items-center justify-between relative p-6">
        <div className="w-[40rem]">
          <nav className="relative">
            <ul className="flex flex-row justify-between relative">
              <li>Catalogue Management</li>
              <li>Students Management</li>
              <li>Users Management</li>
              <li>Circulation</li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-between gap-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-primary-foreground">
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-40">
              <h2 className="text-center">Settings</h2>
              <hr />

              <div className="flex flex-col gap-y-4 my-2">
                <Button variant="ghost" className="border-b border-l">
                  Test 1
                </Button>
                <Button variant="ghost" className="border-b border-l">
                  Test 2
                </Button>
                <Button variant="ghost" className="border-b border-l">
                  Test 3
                </Button>
              </div>
            </PopoverContent>
          </Popover>


          {theme == "dark" ? (
            <Button
              variant="outline"
              onClick={() => setTheme("light")}
            >
              <SunIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setTheme("dark")}>
              <MoonIcon className="h-4 w-4" />
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-primary-foreground">
                <UserIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-40">
              <h2 className="text-center">User Setting</h2>
              <hr />

              <div className="flex flex-col gap-y-4 my-2">
                <Button variant="ghost" className="border-b border-l">
                  Test 1
                </Button>
                <Button variant="ghost" className="border-b border-l">
                  Test 2
                </Button>
                <Button variant="ghost" className="border-b border-l">
                  Test 3
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div> */}
      <div className="mr-4 hidden md:flex">
        <div className="mr-6 flex items-center space-x-2">
          logo
          <div className="hidden font-bold sm:inline-block">NAME</div>
        </div>
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
          <Link
            to={"/"}
            className={cn(
              "transition-colors hover:text-foreground/80 ",
              location.pathname === "/"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Dashboard
          </Link>

          <Link
            to={"/builds"}
            className={cn(
              "transition-colors hover:text-foreground/80 ",
              // pathname === "/docs" ? "text-foreground" : "",
              location.pathname === "/builds/catalogue" ||
                location.pathname === "/builds/user-management" ||
                location.pathname === "/builds/student-management" ||
                location.pathname === "/builds/circulation"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Builds
          </Link>

          <Link
            to={"/"}
            className={cn(
              "transition-colors hover:text-foreground/80 text-foreground/60"
              // pathname === "/docs" ? "text-foreground" : ""
            )}
          >
            Reports
          </Link>

          <Link
            to={"/settings"}
            className={cn(
              "transition-colors hover:text-foreground/80 text-foreground/60",
              location.pathname === "/settings/genres" ||
                location.pathname === "/settings/item-types" ||
                location.pathname === "/settings/educational-stage" ||
                location.pathname === "/settings/user-roles" ||
                location.pathname === "/settings/authors"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Settings
          </Link>
        </nav>
      </div>
    </>
  );
}
