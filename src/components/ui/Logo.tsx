interface LogoProps {
  className?: string
  variant?: 'default' | 'icon-only' | 'text-only'
}

export function Logo({ className = '', variant = 'default' }: LogoProps) {
  if (variant === 'icon-only') {
    return (
      <svg
        className={className}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="8" fill="#06708A" />
        <path
          d="M8 12h16v8H8v-8z"
          fill="white"
          fillOpacity="0.9"
        />
        <path
          d="M12 8h8v16h-8V8z"
          fill="white"
          fillOpacity="0.7"
        />
        <circle cx="16" cy="16" r="3" fill="#0898BB" />
      </svg>
    )
  }

  if (variant === 'text-only') {
    return (
      <span className={className}>
        <span className="font-light text-2xl text-gray-900">Tax</span>
        <span className="font-light text-2xl text-primary-teal">.ai</span>
      </span>
    )
  }

  return (
    <div className={className}>
      <svg
        className="h-8 w-auto"
        width="120"
        height="32"
        viewBox="0 0 120 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="4" width="24" height="24" rx="6" fill="#06708A" />
        <path
          d="M6 14h12v6H6v-6z"
          fill="white"
          fillOpacity="0.9"
        />
        <path
          d="M9 6h6v12H9V6z"
          fill="white"
          fillOpacity="0.7"
        />
        <circle cx="12" cy="17" r="2" fill="#0898BB" />
        
        <text
          x="32"
          y="20"
          fontFamily="Inter, sans-serif"
          fontSize="20"
          fontWeight="300"
          fill="#111827"
        >
          Tax
        </text>
        <text
          x="58"
          y="20"
          fontFamily="Inter, sans-serif"
          fontSize="20"
          fontWeight="300"
          fill="#06708A"
        >
          .ai
        </text>
      </svg>
    </div>
  )
}