import { useState, useEffect } from 'react';

// LAB 3: useEffect Hook Dependency Issues
// Bug: Effects running too often or not at all due to incorrect dependencies

interface User {
  id: number;
  name: string;
  posts: number;
}

function Lab3HookDependencies() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [effectRunCount, setEffectRunCount] = useState(0);

  // BUG 1: Missing dependencies
  useEffect(() => {
    console.log('🐛 BUG 1: Effect with missing dependency');
    console.log('Current user ID:', userId);
    // BUG: This effect should re-run when userId changes, but dependency array is empty
    // It will only run once on mount
  }, []); // Empty array = run once on mount only

  // BUG 2: Including function that changes every render
  const fetchUserData = () => {
    console.log('📡 Fetching user data for ID:', userId);
    // Simulated API call
    setTimeout(() => {
      setUser({
        id: userId,
        name: `User ${userId}`,
        posts: Math.floor(Math.random() * 100),
      });
    }, 500);
  };

  useEffect(() => {
    console.log('🐛 BUG 2: Effect with function dependency (runs every render!)');
    fetchUserData(); // BUG: fetchUserData is recreated every render
    // This effect will run on EVERY render because fetchUserData is a new function each time
  }, [fetchUserData]); // This causes infinite loops or too many runs

  // BUG 3: Effect runs too often - including unnecessary dependencies
  useEffect(() => {
    console.log('🐛 BUG 3: Effect with too many dependencies');
    console.log('Searching for:', searchTerm);
    setEffectRunCount(prev => prev + 1);
    // This effect should only run when searchTerm changes
    // But it also has count in dependencies
  }, [searchTerm, count]); // BUG: count causes unnecessary re-runs

  // BUG 4: Updating state inside effect without proper dependencies
  useEffect(() => {
    console.log('🐛 BUG 4: Updating state based on other state');
    // BUG: Using count directly without including it in dependencies
    if (searchTerm.length > 0) {
      const newCount = count + 1; // Reading count but not in dependencies
      console.log('New count would be:', newCount);
    }
  }, [searchTerm]); // Missing count dependency

  // BUG 5: Object in dependencies (always triggers re-run)
  const config = { theme: 'dark', lang: 'en' }; // New object every render

  useEffect(() => {
    console.log('🐛 BUG 5: Effect with object dependency');
    console.log('Config:', config);
    // BUG: config is a new object every render, so this always runs
  }, [config]);

  // CORRECT EXAMPLES:

  // Correct 1: All dependencies included
  useEffect(() => {
    console.log('✅ CORRECT: Effect with proper dependencies');
    if (userId > 0) {
      console.log('User ID changed to:', userId);
    }
  }, [userId]); // Correctly includes userId

  // Correct 2: No dependencies for one-time setup
  useEffect(() => {
    console.log('✅ CORRECT: One-time setup effect');
    // Runs only once on mount
    return () => {
      console.log('✅ Cleanup on unmount');
    };
  }, []);

  // Correct 3: Functional update to avoid dependency
  const handleAutoIncrement = () => {
    setCount(prev => prev + 1); // No need to include count in dependencies
  };

  useEffect(() => {
    console.log('✅ CORRECT: Using functional update');
    const timer = setInterval(() => {
      handleAutoIncrement();
    }, 5000);

    return () => clearInterval(timer);
  }, []); // Empty array is fine because we use functional update

  return (
    <div className="lab-card">
      <h3>Lab 3: useEffect Hook Dependencies</h3>
      <p>
        <strong>Bug:</strong> Effects running too often, not often enough, or causing infinite loops.
      </p>
      <p>
        <strong>Your Task:</strong> Use Console and React DevTools:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Open Console to see when effects run</li>
        <li>Open React DevTools → Components tab</li>
        <li>Select "Lab3HookDependencies" component</li>
        <li>Look at the "hooks" section - see all useEffect hooks</li>
        <li>Watch for warning messages about missing dependencies</li>
        <li>Interact with the UI and observe effect re-runs</li>
      </ul>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Scenario 1: Missing Dependency</h4>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem' }}>User ID: {userId}</label>
          <button 
            className="btn"
            onClick={() => setUserId(userId + 1)}
          >
            Next User
          </button>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          🐛 Click "Next User". Check console - Bug 1 effect doesn't run even though 
          userId changed!
        </p>
      </div>

      {user && (
        <div className="success" style={{ marginBottom: '2rem' }}>
          <h4>Current User</h4>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Posts:</strong> {user.posts}</p>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h4>Scenario 2: Too Many Effect Runs</h4>
        <div className="warning">
          <p><strong>Effect Run Count:</strong> {effectRunCount}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            This counter shows how many times Bug 3 effect has run
          </p>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Type in the search box. Effect runs correctly.
          </p>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <div className="success" style={{ padding: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
            Counter: {count}
          </div>
          <button 
            className="btn"
            onClick={() => setCount(count + 1)}
            style={{ marginTop: '0.5rem' }}
          >
            Increment Counter
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            🐛 Click increment. Bug 3 effect runs even though searchTerm didn't change!
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Scenario 3: Watch Console Logs</h4>
        <div className="warning">
          <p>Open the Console and observe:</p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>🐛 Buggy effects running too often</li>
            <li>✅ Correct effects running at the right times</li>
            <li>Effects are labeled so you can identify them</li>
          </ul>
        </div>
      </div>

      <div className="warning">
        <strong>💡 Inspecting Effects in React DevTools:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Open React DevTools → Components tab</li>
          <li>Select this component in the tree</li>
          <li>Right panel shows "hooks" section</li>
          <li>Scroll through the list - you'll see multiple "Effect" entries</li>
          <li>Each Effect shows its current state</li>
          <li>You can't see dependencies in DevTools, but you can see when they run via console</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔧 useEffect Dependency Rules:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Include all values from component scope</strong> that the effect uses</li>
          <li><strong>Empty array []:</strong> Run once on mount</li>
          <li><strong>No array:</strong> Run after every render (rarely needed)</li>
          <li><strong>Use functional updates:</strong> setState(prev =&gt; prev + 1) to avoid including state in dependencies</li>
          <li><strong>Move functions inside effect:</strong> Or use useCallback for functions used in effects</li>
          <li><strong>Objects/arrays:</strong> Don't create new ones every render if used in dependencies</li>
        </ul>
      </div>

      <div className="error" style={{ marginTop: '1rem' }}>
        <strong>⚠️ Common Mistakes:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Omitting dependencies to avoid re-runs (creates stale closures)</li>
          <li>Including too many dependencies (effect runs too often)</li>
          <li>Creating objects/arrays/functions inside component and using in deps</li>
          <li>Not using cleanup functions (return statement in effect)</li>
          <li>Ignoring ESLint warnings about dependencies</li>
        </ul>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 ESLint Rule:</strong>
        <p style={{ marginTop: '0.5rem' }}>
          The eslint-plugin-react-hooks has a rule called "exhaustive-deps" that warns 
          you about missing dependencies. Don't disable it - fix the dependencies instead!
        </p>
      </div>
    </div>
  );
}

export default Lab3HookDependencies;
