import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Header } from "@/components/header";
import { redirect } from "next/navigation";

// Mock function to get current user - replace with actual auth call
const getCurrentUser = async () => {
    // TODO: Implement actual auth check
    return {
        id: "1",
        role: "admin" // Mocked as admin for development
    };
};

const AdminLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
        redirect("/dashboard");
    }

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <AdminSidebar />
            </div>
            <main className="md:pl-72 h-full bg-slate-50">
                <div className="h-16 fixed w-full z-50 bg-white/50 backdrop-blur-md inset-y-0 md:pl-72 border-b border-red-100">
                    <Header />
                </div>
                <div className="pt-20 h-full p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;
