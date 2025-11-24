import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming UI components exist or will be created
import { Users, Server, Activity, AlertTriangle } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Users</h3>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Active MCP Servers</h3>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">System Load</h3>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">24%</div>
                    <p className="text-xs text-muted-foreground">Normal operating range</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Security Alerts</h3>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-red-500">3</div>
                    <p className="text-xs text-muted-foreground">Requires attention</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">User Action {i}</p>
                                    <p className="text-sm text-muted-foreground">
                                        executed tool run_code on server python-exec
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">Just now</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-3 bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-semibold mb-4">System Health</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">API Gateway</span>
                            <span className="text-green-500 text-sm font-medium">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Orchestrator</span>
                            <span className="text-green-500 text-sm font-medium">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Vector DB</span>
                            <span className="text-yellow-500 text-sm font-medium">Degraded</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
