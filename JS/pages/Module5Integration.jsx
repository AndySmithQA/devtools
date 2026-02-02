import { useState } from 'react';
import Scenario1DataNotShowing from '../components/module5/Scenario1DataNotShowing';
import Scenario2LoadingNeverEnds from '../components/module5/Scenario2LoadingNeverEnds';
import Scenario3SilentFailure from '../components/module5/Scenario3SilentFailure';

function Module5Integration() {
  const [activeScenario, setActiveScenario] = useState('scenario1');

  return (
    <div className="module-section">
      <h2>Module 5: End-to-End Debugging Scenarios</h2>
      <p style={{ marginBottom: '2rem' }}>
        These are complex real-world scenarios that combine multiple debugging techniques.
        You'll need to use Console, Network, Sources, and React DevTools together.
      </p>

      <div className="warning" style={{ marginBottom: '2rem' }}>
        <strong>🎯 Debugging Workflow:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Reproduce:</strong> Make the bug happen consistently</li>
          <li><strong>Observe:</strong> Check UI, Console, Network, React DevTools</li>
          <li><strong>Isolate:</strong> Identify which layer is failing (UI, logic, network)</li>
          <li><strong>Hypothesize:</strong> Form a theory about the root cause</li>
          <li><strong>Verify:</strong> Use breakpoints and logging to confirm</li>
          <li><strong>Fix:</strong> Apply the solution</li>
          <li><strong>Validate:</strong> Ensure the fix works and doesn't break anything</li>
        </ol>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          className={activeScenario === 'scenario1' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveScenario('scenario1')}
        >
          Scenario 1: Data Not Showing
        </button>
        <button 
          className={activeScenario === 'scenario2' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveScenario('scenario2')}
        >
          Scenario 2: Loading Never Ends
        </button>
        <button 
          className={activeScenario === 'scenario3' ? 'btn' : 'btn btn-secondary'}
          onClick={() => setActiveScenario('scenario3')}
        >
          Scenario 3: Silent Failure
        </button>
      </div>

      {activeScenario === 'scenario1' && <Scenario1DataNotShowing />}
      {activeScenario === 'scenario2' && <Scenario2LoadingNeverEnds />}
      {activeScenario === 'scenario3' && <Scenario3SilentFailure />}
    </div>
  );
}

export default Module5Integration;
