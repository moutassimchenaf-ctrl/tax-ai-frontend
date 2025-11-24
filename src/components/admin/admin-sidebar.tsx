import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    Server,
    Settings,
    ShieldAlert,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
    {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-sky-500",
    },
    {
        label: "Users",
        icon: Users,
        href: "/admin/users",
        color: "text-violet-500",
    },
    {
        label: "MCP Registry",
        icon: Server,
        href: "/admin/mcp",
        color: "text-pink-700",
    },
    {
        label: "Security & RBAC",
        icon: ShieldAlert,
        href: "/admin/security",
        color: "text-orange-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/admin/settings",
    },
];

export const AdminSidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#1e1e24] text-white border-r border-red-900/20">
            <div className="px-3 py-2 flex-1">
                <Link href="/admin" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center font-bold text-xs">
                            ADM
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-red-500">
                        Titan Admin
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <Link
                    href="/dashboard"
                    className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400"
                >
                    <div className="flex items-center flex-1">
                        <LogOut className="h-5 w-5 mr-3" />
                        Exit to Dashboard
                    </div>
                </Link>
            </div>
        </div>
    );
};
