import { useState } from 'react';
import axios from 'axios';

// SCENARIO 2: Loading State Never Ends
// Bugs in async error handling leave UI in loading state forever

const API_URL = 'http://localhost:3001/api';

interface FormData {
  name: string;
  price: string;
}

function Scenario2LoadingNeverEnds() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [submitCount, setSubmitCount] = useState(0);

  // BUG 1: Loading state not handled in all paths
  const handleSubmitBuggy = async () => {
    setLoading(true);
    setResult(null);
    setSubmitCount(prev => prev + 1);

    console.log('Submitting form (buggy version)...');
    console.log('Form data:', formData);

    try {
      // BUG 2: Not validating data before sending
      // BUG 3: Sending string instead of number for price
      const response = await axios.post(`${API_URL}/products`, {
        name: formData.name,
        price: formData.price, // BUG: Should be parseFloat(formData.price)
        category: 'Test',
      });

      console.log('Success:', response.data);
      setResult('Product created successfully!');
      setLoading(false);

      // Reset form
      setFormData({ name: '', price: '' });
    } catch (error: any) {
      console.error('Error:', error);
      
      // BUG 4: Not setting loading to false in catch block
      if (error.response) {
        setResult(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        // BUG: Missing setLoading(false) here!
      } else {
        setResult(`Network error: ${error.message}`);
        // BUG: Missing setLoading(false) here too!
      }
    }
    // BUG 5: No finally block to ensure loading is always set to false
  };

  // CORRECT VERSION: Properly handles all cases
  const handleSubmitCorrect = async () => {
    setLoading(true);
    setResult(null);
    setSubmitCount(prev => prev + 1);

    console.log('Submitting form (correct version)...');

    // Validation
    if (!formData.name || !formData.price) {
      setResult('Please fill in all fields');
      setLoading(false);
      return;
    }

    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setResult('Price must be a valid positive number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/products`, {
        name: formData.name,
        price: priceValue, // Correctly converted to number
        category: 'Test',
      });

      console.log('Success:', response.data);
      setResult('Product created successfully!');
      setFormData({ name: '', price: '' });
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        setResult(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else {
        setResult(`Network error: ${error.message}`);
      }
    } finally {
      // CORRECT: Always executed, even if error occurs
      setLoading(false);
    }
  };

  // BUG 6: Simulating a random network failure
  const handleSubmitRandomFailure = async () => {
    setLoading(true);
    setResult(null);

    console.log('Attempting submit with random failure...');

    try {
      // Simulate random network failure
      if (Math.random() > 0.5) {
        throw new Error('Random network failure!');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult('Success!');
      setLoading(false);
    } catch (error: any) {
      console.error('Random failure occurred');
      setResult(`Error: ${error.message}`);
      // BUG: Forgot to set loading false!
    }
  };

  return (
    <div className="lab-card">
      <h3>🔴 Scenario 2: Loading State Never Ends</h3>
      
      <div className="error" style={{ marginBottom: '1rem' }}>
        <strong>The Problem:</strong> When you submit invalid data or when the API returns an error, 
        the loading spinner never goes away and the UI becomes stuck!
      </div>

      <div className="warning" style={{ marginBottom: '1rem' }}>
        <strong>🔍 Your Investigation:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Console:</strong> Check for error messages when submit fails</li>
          <li><strong>Network Tab:</strong> Look at the API response - is it 400 or 500?</li>
          <li><strong>React DevTools:</strong> Check the loading state - is it still true?</li>
          <li><strong>Breakpoint:</strong> Set breakpoint in catch block - does it execute?</li>
          <li><strong>Code Review:</strong> Is setLoading(false) called in all code paths?</li>
        </ol>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Test Case 1: Submit with Missing Data</h4>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Enter price (e.g., 99.99)"
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            className="btn btn-danger"
            onClick={handleSubmitBuggy}
            disabled={loading}
          >
            Submit (Buggy - Stays Loading!)
          </button>
          <button 
            className="btn"
            onClick={handleSubmitCorrect}
            disabled={loading}
          >
            Submit (Correct - Handles Errors)
          </button>
        </div>
        
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Try submitting with:
          <ul style={{ marginLeft: '1.5rem' }}>
            <li>Empty fields (buggy version gets stuck)</li>
            <li>Price as text like "abc" (causes 400 error, buggy version gets stuck)</li>
            <li>Valid data (both work)</li>
          </ul>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Test Case 2: Random Network Failure</h4>
        <button 
          className="btn btn-danger"
          onClick={handleSubmitRandomFailure}
          disabled={loading}
        >
          Submit with 50% Failure Rate
        </button>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Click this button multiple times. About half the time it will fail and get stuck in loading state!
        </p>
      </div>

      {loading && (
        <div className="warning">
          <div className="loading"></div> 
          <strong>Loading... (Submit #{submitCount})</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            If this never goes away, you've found the bug! Check React DevTools to see loading state.
          </p>
        </div>
      )}

      {result && (
        <div className={result.includes('Error') ? 'error' : 'success'}>
          <strong>Result:</strong> {result}
        </div>
      )}

      <div className="warning" style={{ marginTop: '2rem' }}>
        <strong>💡 Debugging Steps:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Submit with invalid data using the buggy button</li>
          <li>Notice loading spinner doesn't go away</li>
          <li>Open React DevTools → Components → find this component</li>
          <li>Look at hooks section - loading state is still true!</li>
          <li>Open Console - see the error message</li>
          <li>Set breakpoint in handleSubmitBuggy's catch block</li>
          <li>Step through code - notice setLoading(false) is never called!</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🐛 Bugs to Find:</strong>
        <details>
          <summary style={{ cursor: 'pointer', padding: '0.5rem', background: '#fff', borderRadius: '4px' }}>
            Click to reveal bugs
          </summary>
          <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>No validation before API call</li>
            <li>Price sent as string instead of number (causes 400 error)</li>
            <li>setLoading(false) not called in catch block</li>
            <li>No finally block to ensure loading state is reset</li>
            <li>Random failure handler also missing setLoading(false)</li>
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
{`// Solution 1: Add validation
if (!formData.name || !formData.price) {
  setResult('Please fill in all fields');
  setLoading(false); // Important!
  return;
}

// Solution 2: Convert price to number
const priceValue = parseFloat(formData.price);
if (isNaN(priceValue)) {
  setResult('Invalid price');
  setLoading(false); // Important!
  return;
}

// Solution 3: Use finally block
try {
  // ... API call
} catch (error) {
  // ... handle error
  setResult('Error occurred');
} finally {
  setLoading(false); // Always executes!
}

// Alternative: Call setLoading(false) in every path
try {
  // ... API call
  setLoading(false);
} catch (error) {
  setResult('Error');
  setLoading(false); // Don't forget this!
}`}
          </pre>
        </details>
      </div>

      <div className="error" style={{ marginTop: '1rem' }}>
        <strong>⚠️ Common Mistake:</strong> Forgetting to reset loading state in error paths. 
        Always use a finally block or ensure setLoading(false) is called in every code path!
      </div>
    </div>
  );
}

export default Scenario2LoadingNeverEnds;
