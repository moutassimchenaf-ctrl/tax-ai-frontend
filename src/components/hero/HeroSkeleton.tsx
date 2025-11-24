'use client'

export default function HeroSkeleton() {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 via-primary-steel/10 to-secondary-900/10 animate-pulse">
            {/* Simplified geometric patterns to hint at 3D content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-96 h-96">
                    {/* Animated circles representing loading 3D scene */}
                    <div className="absolute inset-0 border-4 border-primary-teal/20 rounded-full animate-ping" />
                    <div className="absolute inset-8 border-4 border-primary-steel/20 rounded-full animate-ping animation-delay-200" />
                    <div className="absolute inset-16 border-4 border-secondary-400/20 rounded-full animate-ping animation-delay-400" />

                    {/* Loading text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-secondary-600 text-sm font-medium">Loading 3D Experience...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
