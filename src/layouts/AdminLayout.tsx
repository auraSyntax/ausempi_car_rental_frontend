
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
            {/* Desktop Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 lg:pl-64 min-h-screen transition-all duration-300">
                <div className="h-full p-6 pb-24 lg:p-8 lg:pb-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <AdminMobileNav />
        </div>
    );
}
