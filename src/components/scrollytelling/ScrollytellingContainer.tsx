'use client'

import { narrativeSections } from './narrative-data'
import ScrollytellingSection from './ScrollytellingSection'
import ScrollSync from './ScrollSync'
import dynamic from 'next/dynamic'

const ScrollytellingScene = dynamic(() => import('./ScrollytellingScene'), { ssr: false })

export default function ScrollytellingContainer() {
    return (
        <section className="relative w-full" aria-label="Product Features">
            <ScrollSync />
            <ScrollytellingScene />
            {narrativeSections.map((section, index) => (
                <ScrollytellingSection
                    key={section.id}
                    index={index}
                    align={section.align}
                    className="h-screen"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-secondary-900 dark:text-secondary-50">
                        {section.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300">
                        {section.description}
                    </p>
                </ScrollytellingSection>
            ))}
        </section>
    )
}
