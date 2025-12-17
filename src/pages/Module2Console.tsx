import { useState } from 'react';
import Lab1ConsoleLogging from '../components/module2/Lab1ConsoleLogging';
import Lab2ErrorMessages from '../components/module2/Lab2ErrorMessages';
import Lab3AsyncDebugging from '../components/module2/Lab3AsyncDebugging';
import Lab4BreakpointPractice from '../components/module2/Lab4BreakpointPractice';

function Module2Console() {
  const [activeTab, setActiveTab] = useState('lab1');

  return (
    <div className="module-section">
      <h2>Module 2: Console Debugging & JavaScript Execution</h2>
      <p style={{ marginBottom: '2rem' }}>
        Practice using the Console panel, setting breakpoints, and debugging JavaScript execution.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          className={activeTab === 'lab1' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab1')}
        >
          Lab 1: Console Logging
        </button>
        <button 
          className={activeTab === 'lab2' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab2')}
        >
          Lab 2: Error Messages
        </button>
        <button 
          className={activeTab === 'lab3' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab3')}
        >
          Lab 3: Async Debugging
        </button>
        <button 
          className={activeTab === 'lab4' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab4')}
        >
          Lab 4: Breakpoints
        </button>
      </div>

      {activeTab === 'lab1' && <Lab1ConsoleLogging />}
      {activeTab === 'lab2' && <Lab2ErrorMessages />}
      {activeTab === 'lab3' && <Lab3AsyncDebugging />}
      {activeTab === 'lab4' && <Lab4BreakpointPractice />}
    </div>
  );
}

export default Module2Console;
