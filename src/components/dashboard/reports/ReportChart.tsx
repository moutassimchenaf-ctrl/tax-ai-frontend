'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line
} from 'recharts';
import { cn } from '@/lib/utils';

interface ReportChartProps {
    title: string;
    subtitle?: string;
    data: any[];
    type: 'area' | 'bar' | 'line';
    dataKey: string;
    color?: string;
    height?: number;
    className?: string;
}

export function ReportChart({
    title,
    subtitle,
    data,
    type,
    dataKey,
    color = '#14b8a6', // Teal-500
    height = 300,
    className
}: ReportChartProps) {
    
    const renderChart = () => {
        const commonProps = {
            data,
            margin: { top: 10, right: 10, left: -20, bottom: 0 }
        };

        const AxisProps = {
            axisLine: false,
            tickLine: false,
            tick: { fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter' },
            dy: 10
        };

        const GridProps = {
            strokeDasharray: '3 3',
            vertical: false,
            stroke: '#0f172a',
            strokeOpacity: 0.05
        };

        const TooltipProps = {
            contentStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                fontFamily: 'Inter',
                fontSize: '12px',
                color: '#0f172a'
            },
            cursor: { stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }
        };

        switch (type) {
            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        <defs>
                            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid {...GridProps} />
                        <XAxis dataKey="name" {...AxisProps} />
                        <YAxis {...AxisProps} />
                        <Tooltip {...TooltipProps} />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill={`url(#gradient-${dataKey})`}
                            animationDuration={1500}
                        />
                    </AreaChart>
                );
            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid {...GridProps} />
                        <XAxis dataKey="name" {...AxisProps} />
                        <YAxis {...AxisProps} />
                        <Tooltip {...TooltipProps} cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
                        <Bar
                            dataKey={dataKey}
                            fill={color}
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                        />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid {...GridProps} />
                        <XAxis dataKey="name" {...AxisProps} />
                        <YAxis {...AxisProps} />
                        <Tooltip {...TooltipProps} />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={2}
                            dot={{ r: 3, fill: color, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                            animationDuration={1500}
                        />
                    </LineChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className={cn(
            "rounded-2xl border border-navy-900/5 bg-white/50 backdrop-blur-sm p-6 transition-all hover:bg-white/80 hover:shadow-lg hover:shadow-navy-900/5",
            className
        )}>
            <div className="mb-6">
                <h3 className="font-inter text-lg font-medium text-navy-900">{title}</h3>
                {subtitle && (
                    <p className="text-sm text-navy-900/50 font-light">{subtitle}</p>
                )}
            </div>
            <div style={{ height }} className="w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart() || <div />}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
