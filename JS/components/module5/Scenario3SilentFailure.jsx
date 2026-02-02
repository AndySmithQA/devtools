import { useState, useEffect } from 'react';
import axios from 'axios';

// SCENARIO 3: Silent API Failure - No Error Shown to User
// API calls fail but user has no idea anything went wrong

const API_URL = 'http://localhost:3001/api';

function Scenario3SilentFailure() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  // BUG 1: Silent failure - no user feedback
  const loadTodos = async () => {
    setLoading(true);
    setLastAction('Loading todos...');

    try {
      // This endpoint doesn't exist!
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data.data || []);
      setLastAction('Todos loaded successfully');
    } catch (error) {
      // BUG: Error is logged but user sees nothing
      console.error('Failed to load todos:', error);
      // Should show error message to user!
    } finally {
      setLoading(false);
    }
  };

  // BUG 2: Optimistic update without rollback
  const handleToggleTodo = async (id) => {
    setLastAction(`Toggling todo ${id}...`);
    
    // Optimistically update UI
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));

    try {
      // This will fail - endpoint doesn't exist
      await axios.put(`${API_URL}/todos/${id}`, { completed: true });
      setLastAction('Todo updated');
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      // BUG: UI shows todo as completed but API call failed
      // Should rollback the optimistic update!
      setLastAction('Failed to update todo (but UI still changed!)');
    }
  };

  // BUG 3: Adding todo without checking response
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    setLastAction('Adding todo...');
    const tempId = Date.now();
    const tempTodo = {
      id: tempId,
      text: newTodo,
      completed: false,
    };

    // Optimistically add to UI
    setTodos([...todos, tempTodo]);
    setNewTodo('');

    try {
      // This will fail with 404
      const response = await axios.post(`${API_URL}/todos`, {
        text: newTodo,
        completed: false,
      });
      
      // BUG: Not updating with real ID from server
      // If this code ran, we'd have mismatched IDs
      setLastAction('Todo added');
    } catch (error) {
      console.error('Failed to add todo:', error);
      // BUG: Todo remains in UI even though API failed!
      setLastAction('Failed to add todo (but it\'s still in the list!)');
    }
  };

  // BUG 4: Delete without checking if it succeeded
  const handleDeleteTodo = async (id) => {
    setLastAction(`Deleting todo ${id}...`);
    
    // Remove from UI immediately
    setTodos(todos.filter(todo => todo.id !== id));

    try {
      // This will fail - endpoint doesn't exist
      await axios.delete(`${API_URL}/todos/${id}`);
      setLastAction('Todo deleted');
    } catch (error) {
      console.error('Failed to delete todo:', error);
      // BUG: Todo removed from UI but still exists on server!
      setLastAction('Delete failed (but UI already removed it!)');
    }
  };

  // CORRECT VERSION: Proper error handling with user feedback
  const handleAddTodoCorrect = async () => {
    if (!newTodo.trim()) {
      alert('Please enter a todo');
      return;
    }

    setLoading(true);
    setLastAction('Adding todo...');

    try {
      // Even though this fails, we handle it properly
      const response = await axios.post(`${API_URL}/todos`, {
        text: newTodo,
        completed: false,
      });
      
      // Only update UI after success
      const newTodoItem = {
        id: response.data.id,
        text: newTodo,
        completed: false,
      };
      
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setLastAction('✅ Todo added successfully');
      alert('Todo added successfully!');
    } catch (error) {
      console.error('Failed to add todo:', error);
      
      // CORRECT: Show error to user
      const errorMsg = error.response?.data?.message || error.message;
      setLastAction(`❌ Failed to add todo: ${errorMsg}`);
      alert(`Failed to add todo: ${errorMsg}`);
      
      // UI is unchanged - no optimistic update
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lab-card">
      <h3>🔴 Scenario 3: Silent API Failures</h3>
      
      <div className="error" style={{ marginBottom: '1rem' }}>
        <strong>The Problem:</strong> API calls are failing (404 errors), but the user has no idea! 
        The UI updates optimistically, making it look like everything worked, but data is out of sync.
      </div>

      <div className="warning" style={{ marginBottom: '1rem' }}>
        <strong>🔍 Your Investigation:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Network Tab:</strong> Look for failed requests (red, status 404)</li>
          <li><strong>Console:</strong> See error logs that user never sees</li>
          <li><strong>UI vs Reality:</strong> UI shows changes but API calls failed</li>
          <li><strong>React DevTools:</strong> State updated but not reflecting reality</li>
          <li><strong>User Experience:</strong> No feedback - looks like it worked!</li>
        </ol>
      </div>

      <div className="warning" style={{ marginBottom: '1rem' }}>
        <strong>Last Action:</strong> {lastAction}
      </div>

      {loading && (
        <div className="warning">
          <div className="loading"></div> Processing...
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h4>Buggy Todo List (Silent Failures)</h4>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          Try adding, toggling, or deleting todos. Watch the Network tab - all API calls fail with 404, 
          but the UI still updates! Check console for error logs.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Enter new todo..."
            style={{ flex: 1, padding: '0.5rem' }}
          />
          <button 
            className="btn btn-danger"
            onClick={handleAddTodo}
          >
            Add (Buggy - Silent Failure)
          </button>
          <button 
            className="btn"
            onClick={handleAddTodoCorrect}
          >
            Add (Correct - Shows Error)
          </button>
        </div>

        {todos.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No todos yet. Try adding one above!
          </p>
        ) : (
          <div>
            {todos.map(todo => (
              <div 
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem',
                  background: todo.completed ? '#d4edda' : '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '0.5rem'
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span style={{ 
                  flex: 1, 
                  textDecoration: todo.completed ? 'line-through' : 'none' 
                }}>
                  {todo.text}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>
                  ID: {todo.id}
                </span>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{ padding: '0.25rem 0.75rem' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="warning">
        <strong>💡 What's Happening:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Open Network tab before interacting</li>
          <li>Try adding a todo with the buggy button - it appears in the UI!</li>
          <li>Check Network tab - the POST request failed with 404</li>
          <li>Check Console - error logged but user sees nothing</li>
          <li>Try toggling a todo - UI updates immediately</li>
          <li>Network tab shows PUT request failed</li>
          <li>Try deleting - disappears from UI, but DELETE failed in Network tab</li>
          <li>Now try adding with the correct button - you'll see an error alert!</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🐛 Bugs to Find:</strong>
        <details>
          <summary style={{ cursor: 'pointer', padding: '0.5rem', background: '#fff', borderRadius: '4px' }}>
            Click to reveal bugs
          </summary>
          <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><strong>No user feedback:</strong> Errors logged to console but user sees nothing</li>
            <li><strong>Optimistic updates without rollback:</strong> UI changes even when API fails</li>
            <li><strong>Wrong endpoint:</strong> /api/todos doesn't exist (should be /api/products for this demo)</li>
            <li><strong>State out of sync:</strong> UI shows data that doesn't exist on server</li>
            <li><strong>No loading indicators:</strong> User doesn't know something failed</li>
          </ol>
        </details>
      </div>

      <div className="success" style={{ marginTop: '1rem' }}>
        <strong>✅ Solutions:</strong>
        <details>
          <summary style={{ cursor: 'pointer', padding: '0.5rem', background: '#fff', borderRadius: '4px' }}>
            Click to reveal solutions
          </summary>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: '0.5rem',
            fontSize: '0.85rem'
          }}>
{`// Solution 1: Show errors to users
try {
  await axios.post(url, data);
  // Success actions
} catch (error) {
  // Don't just console.error!
  alert('Failed: ' + error.message);
  // or show error in UI
  setError(error.message);
}

// Solution 2: Don't update UI until success
// BAD:
setTodos([...todos, newTodo]); // Immediate
await axios.post(...); // Might fail

// GOOD:
const response = await axios.post(...);
setTodos([...todos, response.data]); // Only after success

// Solution 3: Rollback optimistic updates
const previousTodos = todos;
setTodos(updatedTodos); // Optimistic

try {
  await axios.put(...);
} catch (error) {
  setTodos(previousTodos); // Rollback!
  alert('Update failed');
}

// Solution 4: Always provide feedback
try {
  await apiCall();
  setSuccess('Operation successful');
} catch (error) {
  setError('Operation failed: ' + error.message);
}`}
          </pre>
        </details>
      </div>

      <div className="error" style={{ marginTop: '1rem' }}>
        <strong>⚠️ Real-World Impact:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>User thinks todo was added but it doesn't exist on server</li>
          <li>When page refreshes, "saved" data disappears</li>
          <li>User wastes time entering data that never saves</li>
          <li>Data loss and poor user experience</li>
          <li>User loses trust in the application</li>
        </ul>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔧 Best Practices:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Always show errors:</strong> Toast, alert, error message, etc.</li>
          <li><strong>Pessimistic updates:</strong> Wait for API success before updating UI</li>
          <li><strong>Optimistic updates:</strong> Only if you can rollback on failure</li>
          <li><strong>Loading states:</strong> Show user that something is happening</li>
          <li><strong>Network checking:</strong> Test with Network tab open</li>
          <li><strong>Error boundaries:</strong> Catch React errors</li>
        </ul>
      </div>
    </div>
  );
}

export default Scenario3SilentFailure;
