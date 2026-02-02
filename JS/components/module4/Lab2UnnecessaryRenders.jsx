import { useState, memo } from 'react';

// LAB 2: Unnecessary Re-renders
// Bug: Components re-rendering too often, causing performance issues

let globalRenderCount = 0;

// Component that re-renders unnecessarily
const ExpensiveComponent = ({ value, onChange }) => {
  const renderCount = ++globalRenderCount;
  console.log(`🔄 ExpensiveComponent rendered (${renderCount} times)`);
  
  // Simulate expensive calculation
  const expensiveCalculation = (num) => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.sqrt(num);
    }
    return result.toFixed(2);
  };

  return (
    <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '4px', marginBottom: '1rem' }}>
      <p><strong>Expensive Component (watch console!)</strong></p>
      <p>Render count: {renderCount}</p>
      <p>Calculation result: {expensiveCalculation(value)}</p>
      <button className="btn" onClick={onChange}>Trigger Parent Update</button>
    </div>
  );
};

// Memoized version - only re-renders when props change
const ExpensiveComponentMemo = memo(({ value, onChange }) => {
  console.log('✅ MemoizedComponent rendered');
  
  const expensiveCalculation = (num) => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.sqrt(num);
    }
    return result.toFixed(2);
  };

  return (
    <div style={{ padding: '1rem', background: '#d4edda', borderRadius: '4px', marginBottom: '1rem' }}>
      <p><strong>Memoized Component (optimized!)</strong></p>
      <p>Calculation result: {expensiveCalculation(value)}</p>
      <button className="btn" onClick={onChange}>Trigger Parent Update</button>
    </div>
  );
});

ExpensiveComponentMemo.displayName = 'ExpensiveComponentMemo';

// Child component that logs renders
const ChildComponent = ({ title, data }) => {
  console.log(`🔄 ChildComponent "${title}" rendered`);
  
  return (
    <div style={{ 
      padding: '1rem', 
      background: '#fff', 
      border: '1px solid #ddd', 
      borderRadius: '4px',
      marginBottom: '0.5rem'
    }}>
      <strong>{title}</strong>
      <pre style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

const ChildComponentMemo = memo(ChildComponent);
ChildComponentMemo.displayName = 'ChildComponentMemo';

function Lab2UnnecessaryRenders() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [expensiveValue, setExpensiveValue] = useState(100);

  // BUG 1: Creating new object/array on every render
  const userData = { name: 'John', age: 30 }; // New object every render!
  const items = [1, 2, 3]; // New array every render!

  // BUG 2: Creating new function on every render
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="lab-card">
      <h3>Lab 2: Unnecessary Re-renders & Performance</h3>
      <p>
        <strong>Bug:</strong> Components re-render even when their props haven't changed.
      </p>
      <p>
        <strong>Your Task:</strong> Use React DevTools Profiler and console:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Open React DevTools → <strong>Profiler</strong> tab</li>
        <li>Click "Record" button (blue circle)</li>
        <li>Interact with the UI below</li>
        <li>Click "Stop" to see which components rendered</li>
        <li>Look for components that rendered unnecessarily</li>
        <li>Check console logs to see render counts</li>
        <li>In <strong>Components</strong> tab, enable "Highlight updates when components render"</li>
      </ul>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Scenario 1: Typing in Input</h4>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Type in the input and watch console. Child components re-render even though 
          their props didn't change!
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <h5>❌ Not Memoized - Re-renders on every keystroke:</h5>
            <ChildComponent title="User Data (Buggy)" data={userData} />
            <ChildComponent title="Items (Buggy)" data={items} />
          </div>
          
          <div>
            <h5>✅ Memoized - Only re-renders when props change:</h5>
            <ChildComponentMemo title="User Data (Optimized)" data={userData} />
            <ChildComponentMemo title="Items (Optimized)" data={items} />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Scenario 2: Unrelated State Updates</h4>
        <div className="success" style={{ padding: '1rem', fontSize: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>
          Counter: {count}
        </div>
        <button 
          className="btn"
          onClick={() => setCount(count + 1)}
        >
          Increment Counter
        </button>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Click the button. The expensive component below will re-render even though 
          its value prop didn't change!
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Scenario 3: Expensive Calculations</h4>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          These components do expensive calculations. The unmemoized one will 
          recalculate on every parent re-render!
        </p>
        
        <ExpensiveComponent 
          value={expensiveValue} 
          onChange={() => setCount(count + 1)}
        />
        
        <ExpensiveComponentMemo 
          value={expensiveValue} 
          onChange={() => setCount(count + 1)}
        />

        <button 
          className="btn"
          onClick={() => setExpensiveValue(expensiveValue + 10)}
        >
          Update Expensive Value
        </button>
      </div>

      <div className="warning">
        <strong>💡 Using React DevTools Profiler:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Open React DevTools → Profiler tab</li>
          <li>Click record button (blue circle)</li>
          <li>Type in the input field above</li>
          <li>Click stop button</li>
          <li>You'll see a flame graph showing which components rendered</li>
          <li>Gray components = didn't render</li>
          <li>Colored components = rendered (yellow = fast, red = slow)</li>
          <li>Click a component to see why it rendered</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 Enabling Highlight Updates:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Open React DevTools → Components tab</li>
          <li>Click settings icon (gear)</li>
          <li>Enable "Highlight updates when components render"</li>
          <li>Now interact with the UI - components will flash when they re-render</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔧 Common Causes of Unnecessary Re-renders:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Creating objects/arrays inline:</strong> Each render creates new reference</li>
          <li><strong>Creating functions inline:</strong> New function on every render</li>
          <li><strong>Parent re-renders:</strong> All children re-render by default</li>
          <li><strong>Context updates:</strong> All consumers re-render</li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}><strong>Solutions:</strong></p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Use <code>React.memo()</code> to memoize components</li>
          <li>Use <code>useMemo()</code> for expensive calculations</li>
          <li>Use <code>useCallback()</code> to memoize functions</li>
          <li>Move static data outside component</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab2UnnecessaryRenders;
