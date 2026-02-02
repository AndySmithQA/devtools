import { useState } from 'react';
import Lab1StateNotUpdating from '../components/module4/Lab1StateNotUpdating';
import Lab2UnnecessaryRenders from '../components/module4/Lab2UnnecessaryRenders';
import Lab3HookDependencies from '../components/module4/Lab3HookDependencies';
import Lab4PropDrilling from '../components/module4/Lab4PropDrilling';

function Module4React() {
  const [activeTab, setActiveTab] = useState('lab1');

  return (
    <div className="module-section">
      <h2>Module 4: Debugging React with React Developer Tools</h2>
      <p style={{ marginBottom: '2rem' }}>
        Learn to use React DevTools to inspect components, props, state, and hooks.
        Install the React Developer Tools extension for Edge if you haven't already.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          className={activeTab === 'lab1' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab1')}
        >
          Lab 1: State Not Updating
        </button>
        <button 
          className={activeTab === 'lab2' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab2')}
        >
          Lab 2: Unnecessary Re-renders
        </button>
        <button 
          className={activeTab === 'lab3' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab3')}
        >
          Lab 3: Hook Dependencies
        </button>
        <button 
          className={activeTab === 'lab4' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveTab('lab4')}
        >
          Lab 4: Prop Drilling
        </button>
      </div>

      {activeTab === 'lab1' && <Lab1StateNotUpdating />}
      {activeTab === 'lab2' && <Lab2UnnecessaryRenders />}
      {activeTab === 'lab3' && <Lab3HookDependencies />}
      {activeTab === 'lab4' && <Lab4PropDrilling />}
    </div>
  );
}

export default Module4React;
