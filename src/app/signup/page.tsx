'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignUpPage() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signUp(email, password, { full_name: fullName });
        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    const MotionDiv = motion.div as any;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-navy-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <MotionDiv
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-white/10 mb-4">
                            <div className="w-4 h-4 rounded-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
                        </div>
                        <h1 className="font-inter text-2xl font-light text-white tracking-wide">
                            Create Account
                        </h1>
                        <p className="text-white/40 text-sm mt-2">
                            Join the autonomous tax revolution
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50 focus:ring-teal-500/20"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50 focus:ring-teal-500/20"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-teal-500/50 focus:ring-teal-500/20"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-xs text-center bg-red-500/10 py-2 rounded border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-400 text-white font-medium py-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/40 text-xs mb-2">Already have an account?</p>
                        <Link href="/login" className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </MotionDiv>
        </div>
    );
}
