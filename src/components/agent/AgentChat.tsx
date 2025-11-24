'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, X, Minimize2, Maximize2, Sparkles, Video, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VideoGenerationPanel } from '@/components/video/VideoGenerationPanel';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

import { useAgentState } from './AgentStateContext';

export function AgentChat() {
    const MotionButton = motion.button as any;
    const MotionDiv = motion.div as any;
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const { setIsThinking } = useAgentState();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I am the Ultra Super AI Agent. How can I assist you with your tax queries today?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVideoPanelOpen, setIsVideoPanelOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const [selectedModel, setSelectedModel] = useState('anthropic-haiku');

    const models = [
        { id: 'anthropic-haiku', name: 'Claude 3 Haiku', provider: 'anthropic', model: 'claude-3-haiku-20240307' },
        { id: 'anthropic-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic', model: 'claude-3-5-sonnet-20241022' },
        { id: 'glm-4', name: 'GLM-4 (Zhipu)', provider: 'glm', model: 'glm-4' },
        { id: 'kimi', name: 'Kimi (Moonshot)', provider: 'kimi', model: 'moonshot-v1-8k' },
        { id: 'openrouter', name: 'OpenRouter (KAT)', provider: 'openrouter', model: 'kwaipilot/kat-coder-pro-v1:free' },
    ];

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

        const currentModel = models.find(m => m.id === selectedModel);
        const fallbackModel = models[0];
        
        if (!fallbackModel) {
            throw new Error('No models available');
        }

        try {
            const response = await fetch('http://localhost:3008/api/agent/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    modelProvider: currentModel?.provider || fallbackModel.provider,
                    modelName: currentModel?.model || fallbackModel.model
                })
            });

            const data = await response.json();

            const agentMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response || "I'm sorry, I encountered an error.",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, agentMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting to the server. Please try again later.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
            setIsThinking(false);
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <AnimatePresence>
                {!isOpen && (
                    <MotionButton
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-diamond shadow-lg shadow-primary/25 text-white"
                        aria-label="Open AI Agent Chat"
                    >
                        <MessageSquare className="w-6 h-6" />
                    </MotionButton>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <MotionDiv
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '600px',
                            width: isMinimized ? '300px' : '400px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={cn(
                            "fixed bottom-6 right-6 z-50 flex flex-col bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
                            isMinimized ? "w-[300px]" : "w-[400px] h-[600px]"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-gradient-diamond">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-white">Tax.ai Agent</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-white/50 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Online
                                        </p>
                                        {/* Model Selector */}
                                        <select
                                            value={selectedModel}
                                            onChange={(e) => setSelectedModel(e.target.value)}
                                            className="bg-black/20 border border-white/10 rounded text-[10px] text-white/70 px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        >
                                            {models.map(m => (
                                                <option key={m.id} value={m.id} className="bg-gray-900 text-white">
                                                    {m.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-1.5 rounded-md hover:bg-white/10 text-white/70 transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-md hover:bg-red-500/20 hover:text-red-400 text-white/70 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex w-full",
                                                msg.role === 'user' ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-[80%] p-3 rounded-2xl text-sm",
                                                    msg.role === 'user'
                                                        ? "bg-primary text-white rounded-tr-none"
                                                        : "bg-white/10 text-white/90 rounded-tl-none border border-white/5"
                                                )}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-white/10 bg-white/5">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Ask about UAE Tax Law..."
                                            className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        />
                                        <Button
                                            onClick={() => setIsVideoPanelOpen(true)}
                                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                                            title="Generate Video"
                                        >
                                            <Video className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            onClick={handleSend}
                                            disabled={isLoading || !input.trim()}
                                            className="p-2 rounded-xl bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </MotionDiv>
                )}
            </AnimatePresence>

            {/* Video Generation Panel */}
            <VideoGenerationPanel
                isOpen={isVideoPanelOpen}
                onClose={() => setIsVideoPanelOpen(false)}
            />
        </>
    );
};
