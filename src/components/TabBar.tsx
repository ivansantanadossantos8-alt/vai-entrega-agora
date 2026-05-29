import { Link, useLocation } from "@tanstack/react-router";
import { Home, Package, Wallet, LifeBuoy, User } from "lucide-react";

const tabs = [
  { to: "/home", label: "Início", icon: Home },
  { to: "/deliveries", label: "Entregas", icon: Package },
  { to: "/earnings", label: "Ganhos", icon: Wallet },
  { to: "/profile", label: "Perfil", icon: User },
] as const;

export function TabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border">
      <div className="grid grid-cols-4">
        {tabs.map((t) => {
          const active = pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              {t.label}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
