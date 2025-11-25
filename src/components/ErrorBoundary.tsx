'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.fallback
    }

    return this.props.children
  }

  private get fallback() {
    if (this.props.fallback) {
      return this.props.fallback
    }

    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
          <p className="mt-2 text-sm text-gray-600">The 3D scene could not be loaded.</p>
        </div>
      </div>
    )
  }
}
