import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SolutionPack } from "@/services/pack-service";
import { Box, ShieldCheck } from "lucide-react";

interface PackCardProps {
    pack: SolutionPack;
}

export function PackCard({ pack }: PackCardProps) {
    return (
        <Card className="w-full hover:shadow-lg transition-all duration-300 border-indigo-500/20 bg-white/5 backdrop-blur-sm">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Box className="h-6 w-6 text-indigo-400" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-white">{pack.name}</CardTitle>
                            <CardDescription className="text-indigo-200/60">{pack.jurisdiction} • v{pack.version}</CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Active
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-slate-300 text-sm mb-4">{pack.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{pack.toolCount} Compliance Tools</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Manage Pack
                </Button>
            </CardFooter>
        </Card>
    );
}
