import React from 'react';
import { motion } from 'motion/react';

interface StatPanelProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  accentColor?: 'lime' | 'blue' | 'amber' | 'white';
  isLarge?: boolean;
  trendText?: string;
}

export const StatPanel: React.FC<StatPanelProps> = ({
  label,
  value,
  subValue,
  icon,
  accentColor = 'white',
  isLarge = false,
  trendText,
}) => {
  const bgStyles = {
    white: {
      backgroundColor: 'var(--surface-primary)',
      color: 'var(--text-main)',
    },
    lime: {
      backgroundColor: 'var(--accent-secondary)',
      color: 'var(--text-main)',
    },
    blue: {
      backgroundColor: 'var(--accent-primary)',
      color: '#FFFFFF',
    },
    amber: {
      backgroundColor: 'var(--accent-supporting)',
      color: 'var(--text-main)',
    },
  }[accentColor];

  const isDark = accentColor === 'blue';

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="brutal-card"
      style={{
        ...bgStyles,
        padding: isLarge ? '24px 28px' : '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner tag / indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: isDark ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)',
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--border-color)',
            backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '1px 1px 0px var(--border-color)',
            color: isDark ? '#FFFFFF' : 'var(--text-main)',
          }}
        >
          {icon}
        </div>
      </div>

      {/* Main numerical statistic */}
      <div>
        <div
          className="font-data"
          style={{
            fontSize: isLarge ? '2.4rem' : '1.9rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '6px',
            color: isDark ? '#FFFFFF' : 'var(--text-main)',
          }}
        >
          {value}
        </div>

        {subValue && (
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: isDark ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)',
            }}
          >
            {subValue}
          </div>
        )}

        {trendText && (
          <div
            style={{
              marginTop: '10px',
              display: 'inline-block',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-data)',
              fontWeight: 700,
              padding: '2px 8px',
              border: '1.5px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.9)',
              color: isDark ? '#FFFFFF' : 'var(--text-main)',
            }}
          >
            {trendText}
          </div>
        )}
      </div>
    </motion.div>
  );
};

