import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WarningOctagon, House, Package } from '@phosphor-icons/react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="page-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <div
        className="brutal-card"
        style={{
          maxWidth: 500,
          width: '100%',
          padding: 40,
          textAlign: 'center',
          backgroundColor: 'var(--surface-primary)',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            margin: '0 auto 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent-secondary)',
            border: '2px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <WarningOctagon size={44} weight="bold" />
        </div>

        <div
          className="font-data"
          style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 8,
            color: 'var(--accent-primary)',
          }}
        >
          404
        </div>

        <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>Route Not Found</h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: '0.95rem' }}>
          The requested page route does not exist in this inventory workspace. Use the options below
          to return to an active section.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            type="button"
            className="brutal-btn brutal-btn-primary"
            onClick={() => navigate('/')}
          >
            <House size={16} weight="bold" />
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            className="brutal-btn"
            onClick={() => navigate('/products')}
          >
            <Package size={16} weight="bold" />
            <span>Product Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
};

