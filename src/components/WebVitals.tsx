/**
 * Web Vitals Monitoring
 * 
 * Tracks Core Web Vitals and sends to analytics.
 * Monitors: LCP, FID, CLS, FCP, TTFB
 */

'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals'

function sendToAnalytics(metric: Metric) {
  // Send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    console.log('[Web Vitals]', metric)
    
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_rating: metric.rating,
      })
    }
  } else {
    console.log('[Web Vitals - Dev]', metric)
  }
}

export function WebVitals() {
  useEffect(() => {
    // Cumulative Layout Shift (target: < 0.1)
    onCLS(sendToAnalytics)
    
    // Interaction to Next Paint (target: < 200ms)
    onINP(sendToAnalytics)
    
    // First Contentful Paint (target: < 1.8s)
    onFCP(sendToAnalytics)
    
    // Largest Contentful Paint (target: < 2.5s)
    onLCP(sendToAnalytics)
    
    // Time to First Byte (target: < 600ms)
    onTTFB(sendToAnalytics)
  }, [])

  return null
}
