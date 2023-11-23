import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button";

interface BuildSideNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    to: string;
    title: string;
    id: string | number;
  }[];
}

export default function BuildSideNav({
  className,
  items,
  ...props
}: BuildSideNavProps) {
  const location = useLocation();

  return (
    <nav
      className={cn(`flex lg:flex-col lg:space-x-0 lg:space-y-1`, className)}
      {...props}
    >
      {items.map((item) => {
        return (
          <Link
            key={item.id}
            to={item.to}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              location.pathname === item.to
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
