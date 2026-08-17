import { Link } from "@tanstack/react-router";
import { Home, Gauge, Swords, Users, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/score", label: "My Score", icon: Gauge },
  { to: "/challenges", label: "Challenges", icon: Swords },
  { to: "/friends", label: "Friends", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground transition-colors"
            activeProps={{ className: "!text-primary" }}
          >
            <Icon className="size-5" strokeWidth={2.2} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="mx-auto w-full max-w-md px-5 pb-28 pt-8"
        style={{ paddingTop: "calc(2rem + env(safe-area-inset-top))" }}
      >
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
