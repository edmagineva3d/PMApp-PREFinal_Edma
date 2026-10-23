import React from 'react';

interface StatPanelProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  accentColor?: 'lime' | 'blue' | 'amber' | 'white';
  isLarge?: boolean;
}

export const StatPanel: React.FC<StatPanelProps> = ({
  label,
  value,
  subValue,
  icon,
  accentColor = 'white',
  isLarge = false,
}) => {
  return (
    <div className="brutal-card" style={{ padding: isLarge ? '24px' : '18px' }}>
      <div>{label}</div>
      <div style={{ fontSize: isLarge ? '2.2rem' : '1.8rem', fontWeight: 800 }}>{value}</div>
      {subValue && <div>{subValue}</div>}
      <div>{icon}</div>
    </div>
  );
};
