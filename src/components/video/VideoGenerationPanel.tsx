'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Upload, Wand2, Loader2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoGenerationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VideoGenerationPanel: React.FC<VideoGenerationPanelProps> = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState<'text' | 'image'>('text');
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [jobId, setJobId] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!prompt) return;

        setIsGenerating(true);
        setProgress(0);
        setVideoUrl(null);

        try {
            let response;

            if (mode === 'text') {
                response = await fetch('http://localhost:3008/api/video/text-to-video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prompt,
                        negative_prompt: negativePrompt,
                        height: 480,
                        width: 832,
                        num_frames: 93,
                        num_inference_steps: 50,
                        guidance_scale: 4.0
                    })
                });
            } else {
                const formData = new FormData();
                if (image) formData.append('image', image);
                formData.append('prompt', prompt);
                if (negativePrompt) formData.append('negative_prompt', negativePrompt);
                formData.append('resolution', '480p');
                formData.append('num_frames', '93');
                formData.append('num_inference_steps', '50');
                formData.append('guidance_scale', '4.0');

                response = await fetch('http://localhost:3008/api/video/image-to-video', {
                    method: 'POST',
                    body: formData
                });
            }

            const data = await response.json();
            setJobId(data.job_id);

            // Poll for status
            pollStatus(data.job_id);
        } catch (error) {
            console.error('Video generation error:', error);
            setIsGenerating(false);
        }
    };

    const pollStatus = async (id: string) => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`http://localhost:3008/api/video/status/${id}`);
                const data = await response.json();

                setProgress(data.progress);

                if (data.status === 'completed') {
                    clearInterval(interval);
                    setVideoUrl(`http://localhost:3008/api/video/download/${id}`);
                    setIsGenerating(false);
                } else if (data.status === 'failed') {
                    clearInterval(interval);
                    setIsGenerating(false);
                    alert('Video generation failed: ' + data.error);
                }
            } catch (error) {
                console.error('Status poll error:', error);
            }
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gradient-diamond">
                                    <Video className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Video Generation</h2>
                                    <p className="text-sm text-white/50">Powered by LongCat-Video</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 text-white/70 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Mode Selector */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMode('text')}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-xl font-medium transition-all",
                                        mode === 'text'
                                            ? "bg-primary text-white"
                                            : "bg-white/5 text-white/70 hover:bg-white/10"
                                    )}
                                >
                                    <Wand2 className="w-4 h-4 inline mr-2" />
                                    Text-to-Video
                                </button>
                                <button
                                    onClick={() => setMode('image')}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-xl font-medium transition-all",
                                        mode === 'image'
                                            ? "bg-primary text-white"
                                            : "bg-white/5 text-white/70 hover:bg-white/10"
                                    )}
                                >
                                    <Upload className="w-4 h-4 inline mr-2" />
                                    Image-to-Video
                                </button>
                            </div>

                            {/* Image Upload (Image mode only) */}
                            {mode === 'image' && (
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90"
                                    />
                                    {image && (
                                        <p className="mt-2 text-sm text-white/50">{image.name}</p>
                                    )}
                                </div>
                            )}

                            {/* Prompt */}
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">
                                    Prompt
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Describe the video you want to generate..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                                />
                            </div>

                            {/* Negative Prompt */}
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">
                                    Negative Prompt (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={negativePrompt}
                                    onChange={(e) => setNegativePrompt(e.target.value)}
                                    placeholder="What to avoid in the video..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            {/* Progress */}
                            {isGenerating && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white/70">Generating video...</span>
                                        <span className="text-white font-medium">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-diamond"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Video Preview */}
                            {videoUrl && (
                                <div className="space-y-3">
                                    <video
                                        src={videoUrl}
                                        controls
                                        className="w-full rounded-xl border border-white/10"
                                    />
                                    <a
                                        href={videoUrl}
                                        download
                                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Video
                                    </a>
                                </div>
                            )}

                            {/* Generate Button */}
                            <Button
                                onClick={handleGenerate}
                                disabled={!prompt || isGenerating || (mode === 'image' && !image)}
                                className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Video className="w-4 h-4" />
                                        Generate Video
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
