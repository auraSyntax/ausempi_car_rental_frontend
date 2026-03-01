import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Video, Users, User, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Using existing UI component if available, or simpler approach

export function AdminMobileNav() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const navItems = [
        { name: "Home", icon: Home, path: "/" },
        // { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Videos", icon: Video, path: "/admin/video-master" },
        { name: "Users", icon: Users, path: "/admin/user-master" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/10 lg:hidden px-4 pb-4 pt-2 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.5)]">
            <div className="flex justify-around items-end">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.path} to={item.path} className="flex-1">
                            <div className="flex flex-col items-center justify-center py-2 relative group">
                                {isActive && (
                                    <div className="absolute top-0 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] transform -translate-y-[9px]" />
                                )}
                                <item.icon
                                    size={24}
                                    className={cn(
                                        "mb-1 transition-all duration-300",
                                        isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />
                                <span className={cn(
                                    "text-[10px] font-medium tracking-wide uppercase transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}>
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    );
                })}

                {/* Profile / More Menu Item */}
                <div className="flex-1 flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex flex-col items-center justify-center py-2 cursor-pointer group">
                                <div className={cn(
                                    "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 transition-all",
                                    "group-hover:border-primary/50 group-hover:bg-primary/10"
                                )}>
                                    <User size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground mt-1 group-hover:text-foreground">
                                    Profile
                                </span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mb-4 mr-2 bg-black/90 border-white/10 text-white backdrop-blur-xl">
                            <DropdownMenuLabel>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-primary">{user?.employeeName || "Admin"}</span>
                                    <span className="text-xs text-muted-foreground font-light">{user?.email}</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-500 focus:bg-red-950/30 cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
