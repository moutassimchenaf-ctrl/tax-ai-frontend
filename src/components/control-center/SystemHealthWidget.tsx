'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
    { name: '00:00', cpu: 10, mem: 20 },
    { name: '04:00', cpu: 15, mem: 22 },
    { name: '08:00', cpu: 35, mem: 40 },
    { name: '12:00', cpu: 45, mem: 45 },
];

export function SystemHealthWidget() {
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3008/api/system/stats');
                const stats = await res.json();

                setData(prev => {
                    const newData = [...prev, {
                        name: new Date().toLocaleTimeString(),
                        cpu: stats.cpu * 10, // Scale for visibility
                        mem: (stats.memory.used / stats.memory.total) * 100
                    }];
                    return newData.slice(-20); // Keep last 20 points for smoother flow
                });
            } catch (err) {
                // console.error('Failed to fetch stats', err);
                // Fallback mock data for demo if backend offline
                setData(prev => {
                    const newData = [...prev, {
                        name: new Date().toLocaleTimeString(),
                        cpu: 20 + Math.random() * 30,
                        mem: 40 + Math.random() * 10
                    }];
                    return newData.slice(-20);
                });
            }
        };

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0f172a" strokeOpacity={0.05} />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter' }} 
                        interval={4}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter' }} 
                    />
                    <Tooltip
                        contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            backdropFilter: 'blur(8px)',
                            borderRadius: '8px', 
                            border: '1px solid rgba(15, 23, 42, 0.05)', 
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                            fontFamily: 'Inter',
                            fontSize: '12px'
                        }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="#14b8a6" 
                        strokeWidth={1.5} 
                        fillOpacity={1} 
                        fill="url(#colorCpu)" 
                        isAnimationActive={false}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="mem" 
                        stroke="#0f172a" 
                        strokeWidth={1.5} 
                        strokeOpacity={0.2}
                        fillOpacity={1} 
                        fill="url(#colorMem)" 
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
