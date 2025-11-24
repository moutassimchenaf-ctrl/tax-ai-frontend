'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, Video, History, Plus, ChevronRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAgentState } from '@/components/agent/AgentStateContext';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function ConversationPage() {
    const MotionDiv = motion.div as any;
    const { setIsThinking, isThinking } = useAgentState();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'System initialized. I am ready to assist with your tax inquiries and regulatory compliance analysis. Awaiting command.',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setIsThinking(true);

        // Simulate API call
        try {
            // In a real app, this would be the fetch call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const agentMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I've analyzed your request. Based on current UAE Corporate Tax regulations (Federal Decree-Law No. 47 of 2022), this transaction would likely be classified as...",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, agentMessage]);
        } catch (error) {
            console.error('Chat error:', error);
        } finally {
            setIsLoading(false);
            setIsThinking(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
            {/* Left Sidebar: Session History */}
            <div className="w-80 border-r border-navy-900/5 bg-white/50 backdrop-blur-sm hidden md:flex flex-col">
                <div className="p-4 border-b border-navy-900/5">
                    <Button className="w-full justify-start gap-2 bg-teal-500 hover:bg-teal-600 text-white font-inter font-medium">
                        <Plus className="w-4 h-4" />
                        New Session
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <div className="text-xs font-inter font-medium text-navy-900/40 uppercase tracking-wider mb-3">Today</div>
                    {['Corporate Tax Inquiry', 'VAT Compliance Check', 'Free Zone Analysis'].map((session) => (
                        <button key={session} className="w-full text-left px-3 py-2 rounded-lg hover:bg-navy-900/5 text-sm text-navy-900/70 font-inter transition-colors flex items-center gap-2 group">
                            <History className="w-3 h-3 text-navy-900/30 group-hover:text-teal-500 transition-colors" />
                            {session}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative bg-grid-pattern bg-[size:40px_40px]">
                <div className="absolute inset-0 bg-white/80 pointer-events-none" />
                
                {/* Header */}
                <div className="relative z-10 h-16 border-b border-navy-900/5 flex items-center justify-between px-6 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-inter font-medium text-navy-900">AI Consultant</h2>
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                </span>
                                <span className="text-xs text-navy-900/50 font-inter">Online • Claude 3.5 Sonnet</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full border border-navy-900/10 bg-white text-xs font-mono text-navy-900/60">
                            SECURE_CHANNEL_ESTABLISHED
                        </div>
                    </div>
                </div>

                {/* Messages Stream */}
                <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <MotionDiv
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            className={cn(
                                "flex w-full gap-4 max-w-4xl mx-auto",
                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            {/* Avatar */}
                            <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                msg.role === 'user' ? "bg-navy-900 text-white" : "bg-teal-500 text-white"
                            )}>
                                {msg.role === 'user' ? <Terminal className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>

                            {/* Content */}
                            <div className={cn(
                                "flex-1 p-4 rounded-2xl text-sm font-inter leading-relaxed shadow-sm",
                                msg.role === 'user' 
                                    ? "bg-white border border-navy-900/10 text-navy-900 rounded-tr-none" 
                                    : "bg-white/80 border border-teal-500/20 text-navy-900 rounded-tl-none backdrop-blur-sm"
                            )}>
                                {msg.content}
                            </div>
                        </MotionDiv>
                    ))}
                    
                    {isLoading && (
                        <div className="flex w-full gap-4 max-w-4xl mx-auto">
                            <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white/80 border border-teal-500/20 p-4 rounded-2xl rounded-tl-none backdrop-blur-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="relative z-10 p-6 bg-white/50 backdrop-blur-md border-t border-navy-900/5">
                    <div className="max-w-4xl mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 rounded-xl blur-xl" />
                        <div className="relative flex gap-2 bg-white border border-navy-900/10 rounded-xl p-2 shadow-lg shadow-navy-900/5 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Enter your command or query..."
                                className="flex-1 bg-transparent border-none px-4 py-2 text-sm text-navy-900 placeholder:text-navy-900/30 focus:outline-none font-inter"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="bg-navy-900 hover:bg-navy-800 text-white rounded-lg px-4"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-[10px] text-navy-900/30 font-mono uppercase tracking-widest">
                                AI-Powered Analysis • Confidential • Encrypted
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
