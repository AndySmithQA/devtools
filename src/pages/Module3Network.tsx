import { useState } from 'react';
import Lab1HttpStatusCodes from '../components/module3/Lab1HttpStatusCodes';
import Lab2CorsIssues from '../components/module3/Lab2CorsIssues';
import Lab3AuthenticationErrors from '../components/module3/Lab3AuthenticationErrors';
import Lab4PayloadDebugging from '../components/module3/Lab4PayloadDebugging';

function Module3Network() {
  const [activeTab, setActiveTab] = useState('lab1');

  return (
    <div className="module-section">
      <h2>Module 3: Network Debugging & HTTP Status Codes</h2>
      <p style={{ marginBottom: '2rem' }}>
        Learn to use the Network panel, understand HTTP status codes, and debug API calls.
        Make sure to start the mock API server: <code>npm run server</code>
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          className={activeTab === 'lab1' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab1')}
        >
          Lab 1: HTTP Status Codes
        </button>
        <button 
          className={activeTab === 'lab2' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab2')}
        >
          Lab 2: CORS Issues
        </button>
        <button 
          className={activeTab === 'lab3' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab3')}
        >
          Lab 3: Authentication
        </button>
        <button 
          className={activeTab === 'lab4' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab4')}
        >
          Lab 4: Payload Debugging
        </button>
      </div>

      {activeTab === 'lab1' && <Lab1HttpStatusCodes />}
      {activeTab === 'lab2' && <Lab2CorsIssues />}
      {activeTab === 'lab3' && <Lab3AuthenticationErrors />}
      {activeTab === 'lab4' && <Lab4PayloadDebugging />}
    </div>
  );
}

export default Module3Network;
