import { useState } from 'react';

// LAB 2: Understanding Error Messages and Stack Traces
// Bug: Multiple errors that need to be diagnosed using console error messages

interface User {
  id: number;
  name: string;
  email: string;
}

function Lab2ErrorMessages() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // BUG 1: Accessing property on potentially null object
  const getUserEmail = (userId: number) => {
    const user = users.find(u => u.id === userId);
    // This will error if user is not found
    return user.email.toUpperCase();
  };

  // BUG 2: Array method on non-array
  const searchUsers = (term: string) => {
    if (!term) return users;
    
    // Intentional bug: trying to use filter on undefined
    const result: any = undefined;
    return result.filter((u: User) => 
      u.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  // BUG 3: Undefined function call
  const processUserData = (user: User) => {
    const data = {
      ...user,
      displayName: user.name.toUpperCase(),
    };
    
    // Intentional bug: calling non-existent method
    return (data as any).format();
  };

  // BUG 4: Type coercion issue
  const calculateUserScore = (userId: number) => {
    // Intentional bug: string concatenation instead of addition
    const baseScore: any = '10';
    const bonus: any = '5';
    return baseScore + bonus + userId; // Will result in "1051" instead of 16
  };

  const handleSelectUser = (userId: number) => {
    try {
      const email = getUserEmail(userId);
      console.log('User email:', email);
      setSelectedUser(users.find(u => u.id === userId) || null);
    } catch (error) {
      console.error('Error selecting user:', error);
    }
  };

  const handleSearch = () => {
    try {
      const results = searchUsers(searchTerm);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleProcessUser = () => {
    try {
      if (selectedUser) {
        const processed = processUserData(selectedUser);
        console.log('Processed:', processed);
      }
    } catch (error) {
      console.error('Processing error:', error);
    }
  };

  const handleCalculateScore = () => {
    try {
      const score = calculateUserScore(1);
      console.log('Score:', score, 'Type:', typeof score);
      alert(`User score: ${score}`);
    } catch (error) {
      console.error('Score calculation error:', error);
    }
  };

  return (
    <div className="lab-card">
      <h3>Lab 2: Reading Error Messages & Stack Traces</h3>
      <p>
        <strong>Bug:</strong> This component has multiple errors that will appear in the console.
      </p>
      <p>
        <strong>Your Task:</strong> Open the Console (F12) and click each button to trigger different 
        errors. Read the error messages and stack traces to understand:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>What type of error occurred</li>
        <li>Which line of code caused the error</li>
        <li>The sequence of function calls leading to the error</li>
        <li>How to fix each bug</li>
      </ul>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h4>Error 1: Null Reference</h4>
          <button className="btn" onClick={() => handleSelectUser(999)}>
            Select Non-Existent User (ID: 999)
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Try to access email of user that doesn't exist
          </p>
        </div>

        <div>
          <h4>Error 2: Undefined Filter</h4>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: '0.5rem', padding: '0.5rem' }}
          />
          <button className="btn" onClick={handleSearch}>
            Search Users
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Try to filter undefined array
          </p>
        </div>

        <div>
          <h4>Error 3: Undefined Function</h4>
          <select onChange={(e) => setSelectedUser(users.find(u => u.id === Number(e.target.value)) || null)}>
            <option value="">Select a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <button 
            className="btn" 
            onClick={handleProcessUser}
            disabled={!selectedUser}
            style={{ marginLeft: '0.5rem' }}
          >
            Process User Data
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Call non-existent method on object
          </p>
        </div>

        <div>
          <h4>Error 4: Type Coercion Bug</h4>
          <button className="btn" onClick={handleCalculateScore}>
            Calculate User Score
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            String concatenation instead of numeric addition
          </p>
        </div>
      </div>

      {selectedUser && (
        <div className="success">
          <strong>Selected User:</strong> {selectedUser.name} ({selectedUser.email})
        </div>
      )}

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 Learning Points:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Read the error type (TypeError, ReferenceError, etc.)</li>
          <li>Look at the line number in the stack trace</li>
          <li>Click the file link to jump to the error location</li>
          <li>Trace back through the call stack to understand the flow</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab2ErrorMessages;
