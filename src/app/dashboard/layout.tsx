import { GlassSidebar } from "@/components/layout/GlassSidebar";
import { GlassHeader } from "@/components/layout/GlassHeader";
import { AuthGuard } from "@/components/auth/AuthGuard";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <AuthGuard>
            <div className="h-full relative bg-white">
                {/* Global Grid Background for Dashboard Area */}
                <div className="absolute inset-0 z-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
                
                <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
                    <GlassSidebar />
                </div>
                <main className="md:pl-72 h-full relative z-10">
                    <div className="h-16 fixed w-full z-50 inset-y-0 md:pl-72">
                        <GlassHeader />
                    </div>
                    <div className="pt-20 h-full p-8">
                        {children}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}

export default DashboardLayout;
