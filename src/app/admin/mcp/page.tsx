import { Server, Power, RefreshCw } from "lucide-react";

const servers = [
    { id: 1, name: "python-exec", status: "connected", tools: 12, latency: "45ms" },
    { id: 2, name: "github-integration", status: "connected", tools: 8, latency: "120ms" },
    { id: 3, name: "postgres-db", status: "disconnected", tools: 0, latency: "-" },
];

export default function MCPRegistryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">MCP Registry</h2>
                <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                    <RefreshCw className="w-4 h-4" />
                    Refresh Catalog
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {servers.map((server) => (
                    <div key={server.id} className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <Server className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{server.name}</h3>
                                    <p className="text-xs text-gray-500">ID: {server.id}</p>
                                </div>
                            </div>
                            <div className={`h-2.5 w-2.5 rounded-full ${server.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-1 border-b border-dashed">
                                <span className="text-gray-500">Status</span>
                                <span className="font-medium capitalize">{server.status}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-dashed">
                                <span className="text-gray-500">Tools Available</span>
                                <span className="font-medium">{server.tools}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-dashed">
                                <span className="text-gray-500">Latency</span>
                                <span className="font-medium">{server.latency}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button className="flex-1 bg-gray-900 text-white text-xs font-medium py-2 rounded hover:bg-gray-800">
                                View Details
                            </button>
                            <button className="p-2 border rounded hover:bg-gray-50 text-gray-600">
                                <Power className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
