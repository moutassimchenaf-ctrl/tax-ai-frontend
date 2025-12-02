import React from 'react';
import styles from './GlitchHeader.module.css';
import Link from 'next/link';

interface GlitchHeaderProps {
  className?: string;
}

export const GlitchHeader: React.FC<GlitchHeaderProps> = ({ className }) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <Link href="/" className={styles.navBrand} data-text="TAX.AI">
        TAX.AI
      </Link>
    </div>
  );
};
