import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="dashboard-layout">
        <h2>Dashboard Overview</h2>
        <Button onClick={() => navigate('/products')}>Explore Catalog</Button>
      </div>
    </div>
  );
};
