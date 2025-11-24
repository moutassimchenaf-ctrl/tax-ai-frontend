'use client';

import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { DocumentCard } from '@/components/dashboard/knowledge/DocumentCard';
import { Button } from '@/components/ui/button';

// Mock Data
const documents = [
    { title: 'UAE Corporate Tax Law 2023', type: 'pdf' as const, size: '2.4 MB', date: 'Oct 24, 2023', tags: ['Law', 'Federal'] },
    { title: 'VAT Executive Regulations', type: 'pdf' as const, size: '1.8 MB', date: 'Sep 15, 2023', tags: ['VAT', 'Regulation'] },
    { title: 'Free Zone Tax Incentives Guide', type: 'doc' as const, size: '850 KB', date: 'Nov 02, 2023', tags: ['Free Zone', 'Guide'] },
    { title: 'Transfer Pricing Guidelines', type: 'pdf' as const, size: '3.1 MB', date: 'Aug 10, 2023', tags: ['Compliance', 'Global'] },
    { title: 'Tax Calculation Schema', type: 'xls' as const, size: '45 KB', date: 'Nov 12, 2023', tags: ['Tool', 'Calculation'] },
    { title: 'API Integration Docs', type: 'code' as const, size: '120 KB', date: 'Nov 20, 2023', tags: ['Technical', 'API'] },
];

export default function KnowledgeBasePage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="min-h-screen w-full bg-white p-6 md:p-8 overflow-y-auto">
            {/* Hero Search Section */}
            <div className="relative mb-12 rounded-3xl bg-navy-900 p-8 md:p-12 overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
                <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium backdrop-blur-sm border border-white/10">
                        <BookOpen className="h-3 w-3" />
                        <span>Knowledge Base v2.4</span>
                    </div>
                    <h1 className="font-inter text-3xl md:text-4xl font-light text-white">
                        Regulatory Intelligence Library
                    </h1>
                    <p className="text-white/60 font-light">
                        Access the complete repository of UAE tax laws, executive regulations, and compliance guides.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-white/40" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for laws, articles, or keywords..."
                            className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 backdrop-blur-md transition-all"
                        />
                        <div className="absolute inset-y-2 right-2">
                            <Button size="sm" className="h-full bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
                {['All Documents', 'Laws & Decrees', 'Guides', 'Templates', 'Technical'].map((tab) => {
                    const id = tab.toLowerCase().split(' ')[0] || '';
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                activeTab === id || (activeTab === 'all' && id === 'all')
                                    ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20'
                                    : 'bg-white border border-navy-900/5 text-navy-900/60 hover:bg-navy-900/5'
                            }`}
                        >
                            {tab}
                        </button>
                    );
                })}
                <div className="ml-auto">
                    <Button variant="ghost" size="sm" className="gap-2 text-navy-900/60">
                        <Filter className="h-4 w-4" />
                        Advanced Filter
                    </Button>
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc, index) => (
                    <DocumentCard
                        key={doc.title}
                        {...doc}
                        delay={index * 0.05}
                    />
                ))}
            </div>
        </div>
    );
}
