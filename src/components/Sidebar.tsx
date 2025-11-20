import { Home, Plus, ClipboardList, Key, Settings, User, Building2 } from "lucide-react";
import { NavLink } from "./NavLink";
import UserMenu from "./UserMenu";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navItems = [
    { icon: Home, path: "/", label: "Dashboard" },
    { icon: Plus, path: "/add-property", label: "Add Property" },
    { icon: ClipboardList, path: "/properties", label: "Properties" },
    { icon: Key, path: "/leases", label: "Leases" },
    { icon: Building2, path: "/tenants", label: "Tenants" },
    { icon: User, path: "/clients", label: "Clients" },
    { icon: Settings, path: "/settings", label: "Settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-secondary flex flex-col items-center py-6 z-50 justify-between">
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <div className="w-12 h-12 bg-card rounded-2xl flex items-center justify-center">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
        </div>
        
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                "hover:bg-secondary-foreground/10"
              )}
              activeClassName="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <item.icon className="w-5 h-5" />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="pb-2">
        <UserMenu />
      </div>
    </aside>
  );
};

export default Sidebar;