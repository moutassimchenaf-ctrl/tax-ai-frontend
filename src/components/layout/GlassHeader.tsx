'use client';

import { Bell, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GlassHeader() {
    return (
        <div className="flex items-center justify-between w-full h-full px-8 bg-white/5 backdrop-blur-sm border-b border-navy-900/5">
            {/* Breadcrumb / Location Indicator */}
            <div className="flex items-center gap-2">
                <div className="h-4 w-1 bg-teal-500 rounded-full" />
                <span className="font-inter font-light text-sm text-navy-900/60 tracking-widest uppercase">
                    Command Center
                </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Search Bar (Visual Only for now) */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/5 border border-navy-900/10">
                    <Search className="w-4 h-4 text-navy-900/40" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-transparent border-none outline-none text-sm font-inter font-light text-navy-900 placeholder:text-navy-900/30 w-48"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-navy-900/5 transition">
                    <Bell className="w-5 h-5 text-navy-900/60" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full border border-white" />
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-navy-900/10">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-inter font-medium text-navy-900">Admin User</p>
                        <p className="text-xs font-inter font-light text-navy-900/50">Level 5 Access</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-navy-900 to-teal-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm">
                        AU
                    </div>
                </div>
            </div>
        </div>
    );
}
