'use client';

import { useEffect, useState } from 'react';
import { PackService, SolutionPack } from '@/services/pack-service';
import { PackCard } from '@/components/packs/pack-card';
import { Loader2 } from 'lucide-react';

export default function PacksPage() {
    const [packs, setPacks] = useState<SolutionPack[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPacks() {
            try {
                const data = await PackService.getPacks();
                setPacks(data);
            } catch (error) {
                console.error('Failed to load packs', error);
            } finally {
                setLoading(false);
            }
        }
        loadPacks();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Solution Packs</h1>
                <p className="text-slate-400 mt-2">
                    Extend Titan's capabilities with specialized tax modules and compliance tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packs.map((pack) => (
                    <PackCard key={pack.id} pack={pack} />
                ))}
            </div>

            {packs.length === 0 && (
                <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-slate-700">
                    <p className="text-slate-400">No solution packs found.</p>
                </div>
            )}
        </div>
    );
}
