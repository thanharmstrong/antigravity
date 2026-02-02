"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Wand2, Download, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageCombiner() {
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setImg: (s: string | null) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImg(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateCombinedImage = async () => {
        if (!image1 || !image2 || !canvasRef.current) return;

        setIsGenerating(true);

        // Simulate "AI Processing" time for effect
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const img1 = new Image();
        const img2 = new Image();

        const loadImage = (img: HTMLImageElement, src: string) => {
            return new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.src = src;
            });
        };

        await Promise.all([loadImage(img1, image1), loadImage(img2, image2)]);

        // Determine canvas size (simple side-by-side, matching height of tallest)
        const gap = 20;
        const height = Math.max(img1.height, img2.height);
        // Scale images to have same height for better aesthetic? 
        // For now, let's keep original ratio but maybe fit to a container?
        // Let's just draw them raw for MVP, but centered vertically.

        const width = img1.width + img2.width + gap;

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        // Draw transparent background
        ctx.clearRect(0, 0, width, height);

        // Calculate vertical centering
        const y1 = (height - img1.height) / 2;
        const y2 = (height - img2.height) / 2;

        ctx.drawImage(img1, 0, y1);
        ctx.drawImage(img2, img1.width + gap, y2);

        const dataUrl = canvasRef.current.toDataURL("image/png");
        setResult(dataUrl);
        setIsGenerating(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image 1 */}
                <UploadCard
                    label="Person A"
                    image={image1}
                    onChange={(e) => handleUpload(e, setImage1)}
                />

                {/* Image 2 */}
                <UploadCard
                    label="Person B"
                    image={image2}
                    onChange={(e) => handleUpload(e, setImage2)}
                />
            </div>

            {/* Action Section */}
            <div className="flex justify-center">
                <Button
                    size="lg"
                    onClick={generateCombinedImage}
                    disabled={!image1 || !image2 || isGenerating}
                    className="relative group bg-white text-black hover:bg-zinc-200 px-8 py-6 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
                >
                    {isGenerating ? (
                        <span className="flex items-center gap-2">
                            <Wand2 className="w-5 h-5 animate-spin" /> Generating...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Wand2 className="w-5 h-5" /> Combine Images
                        </span>
                    )}
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/50 transition-all" />
                </Button>
            </div>

            {/* Result Section */}
            {result && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                            Result
                        </h2>
                        <p className="text-zinc-400">Here is your combined masterpiece.</p>
                    </div>

                    <div className="relative glass-panel rounded-2xl p-4 md:p-8 overflow-hidden group">
                        <img src={result} alt="Combined" className="w-full h-auto rounded-lg shadow-2xl" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <a href={result} download="combined-image.png">
                                <Button variant="secondary" size="lg" className="rounded-full gap-2">
                                    <Download className="w-5 h-5" /> Download
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Canvas for Processing */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}

function UploadCard({
    label,
    image,
    onChange,
}: {
    label: string;
    image: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <Card className="glass-panel border-0 relative h-[400px] flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:bg-white/10 group cursor-pointer">
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {image ? (
                <img
                    src={image}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
            ) : (
                <div className="flex flex-col items-center gap-4 text-zinc-500 group-hover:text-zinc-300 transition-colors z-0">
                    <div className="p-5 rounded-2xl bg-white/5 border border-dashed border-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-300">
                        <Upload className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-medium text-zinc-300">Upload {label}</p>
                        <p className="text-sm text-zinc-600 group-hover:text-zinc-500">Click or drag image</p>
                    </div>
                </div>
            )}

            {/* Label Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-medium text-white/80 z-20">
                {label}
            </div>
        </Card>
    );
}
