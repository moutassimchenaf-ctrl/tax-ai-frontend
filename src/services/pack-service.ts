import { API_BASE_URL } from '@/lib/config';

export interface SolutionPack {
    id: string;
    name: string;
    description: string;
    version: string;
    jurisdiction: string;
    toolCount: number;
}

export const PackService = {
    async getPacks(): Promise<SolutionPack[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/mcp/packs`);
            if (!response.ok) {
                throw new Error('Failed to fetch packs');
            }
            const data = await response.json();
            return data.data.packs;
        } catch (error) {
            console.error('Error fetching packs:', error);
            return [];
        }
    }
};
