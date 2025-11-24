'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Key, Bell, Shield, Globe, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
    const MotionDiv = motion.div as any;
    const [activeSection, setActiveSection] = useState('profile');

    const sections = [
        { id: 'profile', label: 'Profile & Account', icon: User },
        { id: 'api', label: 'API Configuration', icon: Key },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'localization', label: 'Localization', icon: Globe },
    ];

    return (
        <div className="min-h-screen w-full bg-white p-6 md:p-8 overflow-hidden flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0 space-y-2">
                <div className="mb-8 px-4">
                    <h1 className="font-inter text-2xl font-light text-navy-900">Settings</h1>
                    <p className="text-sm text-navy-900/50">System Configuration</p>
                </div>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                            activeSection === section.id
                                ? "bg-navy-900 text-white shadow-lg shadow-navy-900/10"
                                : "text-navy-900/60 hover:bg-navy-900/5 hover:text-navy-900"
                        )}
                    >
                        <section.icon className="h-4 w-4" />
                        {section.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 max-w-3xl">
                <MotionDiv
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-navy-900/5 bg-white p-8 shadow-sm"
                >
                    {activeSection === 'profile' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-medium text-navy-900">Profile Information</h2>
                                <p className="text-sm text-navy-900/50">Update your personal details and public profile.</p>
                            </div>
                            
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium text-navy-900">Full Name</label>
                                    <input type="text" defaultValue="Commander Shepard" className="w-full rounded-lg border border-navy-900/10 bg-navy-900/[0.02] px-4 py-2.5 text-sm text-navy-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all" />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium text-navy-900">Email Address</label>
                                    <input type="email" defaultValue="shepard@alliance.nav" className="w-full rounded-lg border border-navy-900/10 bg-navy-900/[0.02] px-4 py-2.5 text-sm text-navy-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all" />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium text-navy-900">Role</label>
                                    <input type="text" defaultValue="System Administrator" disabled className="w-full rounded-lg border border-navy-900/10 bg-navy-900/5 px-4 py-2.5 text-sm text-navy-900/50 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'api' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-medium text-navy-900">API Configuration</h2>
                                <p className="text-sm text-navy-900/50">Manage your API keys for external integrations.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                                    <div className="flex gap-3">
                                        <Key className="h-5 w-5 text-amber-600 shrink-0" />
                                        <div>
                                            <h3 className="text-sm font-medium text-amber-900">Security Warning</h3>
                                            <p className="text-xs text-amber-700 mt-1">Never share your API keys. Regenerate immediately if compromised.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium text-navy-900">OpenAI API Key</label>
                                    <div className="flex gap-2">
                                        <input type="password" value="sk-........................" readOnly className="flex-1 rounded-lg border border-navy-900/10 bg-navy-900/[0.02] px-4 py-2.5 text-sm text-navy-900 font-mono" />
                                        <Button variant="outline" className="text-navy-900 border-navy-900/10">Reveal</Button>
                                    </div>
                                </div>
                                
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium text-navy-900">Anthropic API Key</label>
                                    <div className="flex gap-2">
                                        <input type="password" value="sk-ant-...................." readOnly className="flex-1 rounded-lg border border-navy-900/10 bg-navy-900/[0.02] px-4 py-2.5 text-sm text-navy-900 font-mono" />
                                        <Button variant="outline" className="text-navy-900 border-navy-900/10">Reveal</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other sections */}
                    {['notifications', 'security', 'localization'].includes(activeSection) && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="h-12 w-12 rounded-full bg-navy-900/5 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-navy-900/30" />
                            </div>
                            <h3 className="text-lg font-medium text-navy-900">Section Under Construction</h3>
                            <p className="text-sm text-navy-900/50 max-w-xs mx-auto mt-2">
                                This configuration module is currently being updated. Please check back later.
                            </p>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-navy-900/5 flex justify-end gap-3">
                        <Button variant="ghost" className="text-navy-900/60 hover:text-navy-900">Cancel</Button>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
