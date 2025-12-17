import { useState } from 'react';

// LAB 1: State Not Updating - Common React State Bugs
// Bugs: Direct state mutation, stale closures, async state updates

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function Lab1StateNotUpdating() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Debug with DevTools', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [counter, setCounter] = useState(0);

  // BUG 1: Direct mutation of state
  const handleToggleBuggy = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      // BUG: Directly mutating state - React won't detect the change
      todo.completed = !todo.completed;
      console.log('Toggled todo (buggy):', todo);
      console.log('Current todos:', todos);
      // setTodos(todos); // Even this won't work because it's the same reference
    }
  };

  // CORRECT: Creating new array with updated object
  const handleToggleCorrect = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
    console.log('Toggled todo (correct)');
  };

  // BUG 2: Stale closure in multiple rapid updates
  const handleIncrementBuggy = () => {
    // BUG: If clicked rapidly, counter won't increase correctly
    // because each click uses the same initial value
    setTimeout(() => {
      setCounter(counter + 1); // Uses stale value
      console.log('Counter (buggy):', counter + 1);
    }, 1000);
  };

  // CORRECT: Using functional update
  const handleIncrementCorrect = () => {
    setTimeout(() => {
      setCounter(prev => {
        console.log('Counter (correct), previous value:', prev);
        return prev + 1;
      });
    }, 1000);
  };

  // BUG 3: Trying to use state immediately after setState
  const handleAddTodoBuggy = () => {
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    
    // BUG: Trying to read the updated state immediately
    // This will show the OLD state, not the new one
    console.log('Total todos (buggy - shows old count):', todos.length);
    console.log('Should be:', todos.length + 1);
    
    setInputValue('');
  };

  // CORRECT: Using the value you're setting
  const handleAddTodoCorrect = () => {
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    
    // CORRECT: Use the new array we just created
    console.log('Total todos (correct):', updatedTodos.length);
    
    setInputValue('');
  };

  // BUG 4: Array mutation methods
  const handleDeleteBuggy = (id: number) => {
    // BUG: splice mutates the original array
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1); // Mutating!
      setTodos(todos); // Same reference, React won't re-render
      console.log('Deleted (buggy)');
    }
  };

  // CORRECT: Using filter to create new array
  const handleDeleteCorrect = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
    console.log('Deleted (correct)');
  };

  return (
    <div className="lab-card">
      <h3>Lab 1: State Not Updating - Mutation vs Immutability</h3>
      <p>
        <strong>Bug:</strong> State appears to update in console but UI doesn't reflect changes.
      </p>
      <p>
        <strong>Your Task:</strong> Open React DevTools (F12 → Components tab):
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Select this component in the component tree</li>
        <li>Watch the "hooks" section (shows state values)</li>
        <li>Click buggy buttons - state doesn't update in DevTools!</li>
        <li>Compare with correct buttons - state updates properly</li>
        <li>Check console to see what's happening behind the scenes</li>
      </ul>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Bug 1: Direct State Mutation</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {todos.map(todo => (
            <div key={todo.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '0.5rem',
              background: todo.completed ? '#d4edda' : '#f8f9fa',
              borderRadius: '4px'
            }}>
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                flex: 1
              }}>
                {todo.text}
              </span>
              <button 
                className="btn btn-danger"
                onClick={() => handleToggleBuggy(todo.id)}
                style={{ padding: '0.25rem 0.75rem' }}
              >
                Toggle (Buggy)
              </button>
              <button 
                className="btn"
                onClick={() => handleToggleCorrect(todo.id)}
                style={{ padding: '0.25rem 0.75rem' }}
              >
                Toggle (Correct)
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleDeleteBuggy(todo.id)}
                style={{ padding: '0.25rem 0.75rem' }}
              >
                Delete (Buggy)
              </button>
              <button 
                className="btn"
                onClick={() => handleDeleteCorrect(todo.id)}
                style={{ padding: '0.25rem 0.75rem' }}
              >
                Delete (Correct)
              </button>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          🐛 Buggy buttons mutate state directly - UI won't update!
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Bug 2: Stale Closure</h4>
        <div className="success" style={{ padding: '1rem', fontSize: '2rem', textAlign: 'center' }}>
          Counter: {counter}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            className="btn btn-danger"
            onClick={handleIncrementBuggy}
          >
            Increment (Buggy - Click Fast!)
          </button>
          <button 
            className="btn"
            onClick={handleIncrementCorrect}
          >
            Increment (Correct - Click Fast!)
          </button>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          🐛 Click buggy button 3 times rapidly. After 1 second, counter only increases by 1!
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Bug 3: Reading State Immediately After setState</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter new todo..."
            style={{ flex: 1, padding: '0.5rem' }}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodoCorrect()}
          />
          <button 
            className="btn btn-danger"
            onClick={handleAddTodoBuggy}
          >
            Add (Buggy)
          </button>
          <button 
            className="btn"
            onClick={handleAddTodoCorrect}
          >
            Add (Correct)
          </button>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          🐛 Check console - buggy version shows wrong count!
        </p>
      </div>

      <div className="warning">
        <strong>💡 What to Look For in React DevTools:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Open Components tab in DevTools</li>
          <li>Select "Lab1StateNotUpdating" component</li>
          <li>Right panel shows hooks (State values)</li>
          <li>Click buggy buttons - hooks don't update!</li>
          <li>Click correct buttons - hooks update immediately</li>
          <li>You can even edit state directly in DevTools to test</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔧 The Rules:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Never mutate state directly</strong> - Always create new objects/arrays</li>
          <li><strong>Use functional updates</strong> when new state depends on old state</li>
          <li><strong>setState is async</strong> - Don't read state immediately after setting</li>
          <li><strong>Array methods:</strong> Use filter, map, concat (not push, splice, sort)</li>
          <li><strong>Object updates:</strong> Use spread operator or Object.assign</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab1StateNotUpdating;
