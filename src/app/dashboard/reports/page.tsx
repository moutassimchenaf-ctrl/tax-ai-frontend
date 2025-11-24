'use client';

import React from 'react';
import { ReportChart } from '@/components/dashboard/reports/ReportChart';
import { Calendar, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Data
const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
];

const expenseData = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 },
    { name: 'May', value: 4800 },
    { name: 'Jun', value: 3800 },
    { name: 'Jul', value: 4300 },
];

const profitData = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 2210 },
    { name: 'Mar', value: 2290 },
    { name: 'Apr', value: 2000 },
    { name: 'May', value: 2181 },
    { name: 'Jun', value: 2500 },
    { name: 'Jul', value: 2100 },
];

const taxLiabilityData = [
    { name: 'Q1', value: 12500 },
    { name: 'Q2', value: 15000 },
    { name: 'Q3', value: 8000 },
    { name: 'Q4', value: 18000 },
];

export default function ReportsPage() {
    return (
        <div className="min-h-screen w-full bg-white p-6 md:p-8 overflow-y-auto">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="font-inter text-3xl font-light text-navy-900">Financial Intelligence</h1>
                    <p className="mt-1 text-navy-900/50">Comprehensive analysis of your financial performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 border-navy-900/10 text-navy-900 hover:bg-navy-900/5">
                        <Calendar className="h-4 w-4" />
                        Last 6 Months
                    </Button>
                    <Button variant="outline" className="gap-2 border-navy-900/10 text-navy-900 hover:bg-navy-900/5">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button className="gap-2 bg-teal-500 hover:bg-teal-600 text-white">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Main Revenue Chart - Spans 2 cols on large screens */}
                <ReportChart
                    title="Total Revenue"
                    subtitle="Monthly revenue stream analysis"
                    data={revenueData}
                    type="area"
                    dataKey="value"
                    color="#14b8a6" // Teal
                    className="lg:col-span-2"
                    height={350}
                />

                {/* Tax Liability */}
                <ReportChart
                    title="Projected Tax Liability"
                    subtitle="Estimated corporate tax based on current profit"
                    data={taxLiabilityData}
                    type="bar"
                    dataKey="value"
                    color="#0f172a" // Navy
                    height={350}
                />

                {/* Expenses */}
                <ReportChart
                    title="Operational Expenses"
                    subtitle="Breakdown of monthly operational costs"
                    data={expenseData}
                    type="line"
                    dataKey="value"
                    color="#ef4444" // Red
                />

                {/* Net Profit */}
                <ReportChart
                    title="Net Profit Margin"
                    subtitle="Post-tax profit analysis"
                    data={profitData}
                    type="area"
                    dataKey="value"
                    color="#8b5cf6" // Purple
                />

                {/* Cash Flow (Mock) */}
                <ReportChart
                    title="Cash Flow Velocity"
                    subtitle="Inflow vs Outflow rate"
                    data={revenueData.map(d => ({ ...d, value: d.value * 0.8 }))}
                    type="line"
                    dataKey="value"
                    color="#f59e0b" // Amber
                />
            </div>
        </div>
    );
}
