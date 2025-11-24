import { UserCircle } from "lucide-react";

export const Header = () => {
    return (
        <div className="flex items-center p-4 border-b h-full">
            {/* Mobile Sidebar Trigger would go here */}
            <div className="flex w-full justify-end">
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2 text-sm font-medium">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <UserCircle className="h-5 w-5 text-slate-500" />
                        </div>
                        <span>User</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
