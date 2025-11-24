'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle, Search, ArrowRight } from 'lucide-react';
import { HudCard } from '@/components/control-center/HudCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TaxAnalysisPage() {
    const MotionDiv = motion.div as any;
    return (
        <div className="h-[calc(100vh-64px)] w-full overflow-hidden bg-white p-6">
            <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
                
                {/* Left Panel: Document Viewer / Upload */}
                <MotionDiv 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col rounded-2xl border border-navy-900/5 bg-navy-900/[0.02] p-6 relative overflow-hidden"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

                    <div className="mb-6 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-white p-2 shadow-sm border border-navy-900/5">
                                <FileText className="h-5 w-5 text-navy-900" />
                            </div>
                            <div>
                                <h2 className="font-inter font-medium text-navy-900">Source Documents</h2>
                                <p className="text-xs text-navy-900/50">Upload financial records for analysis</p>
                            </div>
                        </div>
                        <Button variant="outline" className="gap-2 border-navy-900/10 text-navy-900 hover:bg-navy-900/5">
                            <Upload className="h-4 w-4" />
                            Upload
                        </Button>
                    </div>

                    {/* Drop Zone / Viewer Placeholder */}
                    <div className="flex-1 rounded-xl border-2 border-dashed border-navy-900/10 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center relative z-10 transition-colors hover:bg-white/80 hover:border-teal-500/30 group cursor-pointer">
                        <div className="rounded-full bg-navy-900/5 p-4 mb-4 group-hover:bg-teal-500/10 transition-colors">
                            <Upload className="h-8 w-8 text-navy-900/30 group-hover:text-teal-600 transition-colors" />
                        </div>
                        <p className="font-inter font-medium text-navy-900/70">Drag & drop files here</p>
                        <p className="text-sm text-navy-900/40 mt-1">PDF, Excel, CSV supported</p>
                    </div>
                </MotionDiv>

                {/* Right Panel: Analysis Results */}
                <MotionDiv 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-6 overflow-y-auto pr-2"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-inter text-xl font-light text-navy-900">Analysis Report</h2>
                            <p className="text-sm text-navy-900/50">Real-time compliance verification</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 text-xs font-medium border border-teal-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            System Ready
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <HudCard title="Risk Score" accentColor="teal" className="h-32">
                            <div className="flex items-end gap-2 mt-2">
                                <span className="text-4xl font-inter font-light text-navy-900">98</span>
                                <span className="text-sm font-medium text-teal-600 mb-1.5">/ 100</span>
                            </div>
                            <p className="text-xs text-navy-900/40 mt-2">Low compliance risk detected</p>
                        </HudCard>
                        <HudCard title="Deductions" accentColor="navy" className="h-32">
                            <div className="flex items-end gap-2 mt-2">
                                <span className="text-4xl font-inter font-light text-navy-900">12</span>
                                <span className="text-sm font-medium text-navy-900/40 mb-1.5">Found</span>
                            </div>
                            <p className="text-xs text-navy-900/40 mt-2">Potential tax savings identified</p>
                        </HudCard>
                    </div>

                    {/* Findings List */}
                    <div className="space-y-4">
                        <h3 className="font-inter font-medium text-sm text-navy-900/70 uppercase tracking-wide">Recent Findings</h3>
                        
                        {[
                            { title: 'VAT Compliance Verified', type: 'success', desc: 'All invoices match standard VAT rates.' },
                            { title: 'Missing Receipt #4022', type: 'warning', desc: 'Transaction value > 1000 AED requires documentation.' },
                            { title: 'Corporate Tax Liability', type: 'info', desc: 'Projected liability calculated based on current profit margins.' }
                        ].map((item, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="group flex items-start gap-4 p-4 rounded-xl border border-navy-900/5 bg-white hover:border-teal-500/20 hover:shadow-lg hover:shadow-teal-500/5 transition-all"
                            >
                                <div className={cn(
                                    "mt-0.5 p-1.5 rounded-full shrink-0",
                                    item.type === 'success' ? "bg-emerald-100 text-emerald-600" :
                                    item.type === 'warning' ? "bg-amber-100 text-amber-600" :
                                    "bg-blue-100 text-blue-600"
                                )}>
                                    {item.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                                     item.type === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                                     <Search className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-inter font-medium text-navy-900 text-sm">{item.title}</h4>
                                    <p className="text-xs text-navy-900/60 mt-1 leading-relaxed">{item.desc}</p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-navy-900/5 rounded-lg transition-all">
                                    <ArrowRight className="w-4 h-4 text-navy-900/40" />
                                </button>
                            </MotionDiv>
                        ))}
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
