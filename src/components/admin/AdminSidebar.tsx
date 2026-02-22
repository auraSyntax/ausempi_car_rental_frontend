import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Video, Users, LogOut, UserCircle, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store";

export function AdminSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/";
    };

    const navItems = [
        { name: "Home", icon: Home, path: "/" },
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Video Master", icon: Video, path: "/admin/video-master" },
        { name: "User Master", icon: Users, path: "/admin/user-master" },
    ];

    return (
        <div className="hidden lg:flex flex-col w-64 h-screen bg-sidebar border-r border-sidebar-border text-sidebar-foreground fixed left-0 top-0 z-50">
            {/* Logo Area */}
            <div className="px-5 py-4 flex flex-col items-center gap-2 border-b border-sidebar-border/50 bg-black/20">
                <img
                    src="/ausempi-logo.png"
                    alt="Ausempi Logo"
                    className="h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(234,179,8,0.15)]"
                />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm bg-primary/10 border border-primary/25 text-primary text-[9px] font-bold tracking-[0.35em] uppercase">
                    Admin Portal
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.path} to={item.path}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 group",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <item.icon
                                    size={20}
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />
                                <span className="text-sm font-medium tracking-wide">{item.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Profile Section */}
            <div className="p-4 border-t border-sidebar-border/50 bg-black/20">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                        <UserCircle size={24} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate text-white">
                            {user?.employeeName || "Admin User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user?.email || "admin@ausempi.com"}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-900/10 gap-2 pl-2"
                >
                    <LogOut size={16} />
                    <span className="text-xs uppercase tracking-widest">Sign Out</span>
                </Button>
            </div>
        </div>
    );
}
