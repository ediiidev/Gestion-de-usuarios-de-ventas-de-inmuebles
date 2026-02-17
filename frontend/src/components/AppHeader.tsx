import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

export function AppHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border-2 border-accent">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.email || "admin@correo.com"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
