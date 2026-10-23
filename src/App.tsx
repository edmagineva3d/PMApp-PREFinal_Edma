import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <main className="content-area">
          <h1>Product Management Workspace</h1>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
