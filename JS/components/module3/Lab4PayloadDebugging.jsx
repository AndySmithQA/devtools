import { useState } from 'react';
import axios from 'axios';

// LAB 4: Payload Debugging - Request and Response Data Issues
// Bug: Various payload and data format problems

const API_URL = 'http://localhost:3001/api';

function Lab4PayloadDebugging() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    price: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPayload = async (endpoint, payload, scenario) => {
    setLoading(true);
    setResult('');

    console.group(`Sending ${scenario}`);
    console.log('Endpoint:', endpoint);
    console.log('Payload:', payload);
    console.log('Payload type:', typeof payload);
    console.table(payload);

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      console.log('Response:', response.data);
      console.groupEnd();
      setResult(`✅ Success!\nStatus: ${response.status}\nResponse: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.groupEnd();
        setResult(`❌ Error ${error.response.status}\n${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        console.error('Network error:', error);
        console.groupEnd();
        setResult(`❌ Network Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // BUG 1: Sending numbers as strings
  const handleStringNumberBug = () => {
    const payload = {
      name: 'Product A',
      price: '99.99', // BUG: Should be number
      quantity: '5',  // BUG: Should be number
    };
    sendPayload('/products', payload, 'Numbers as Strings');
  };

  // BUG 2: Missing required fields
  const handleMissingFieldsBug = () => {
    const payload = {
      name: formData.name,
      // BUG: Missing required 'price' field
    };
    sendPayload('/products', payload, 'Missing Required Fields');
  };

  // BUG 3: Extra fields that API doesn't expect
  const handleExtraFieldsBug = () => {
    const payload = {
      name: 'Product B',
      price: 199,
      unexpectedField: 'This should not be here', // BUG: Unknown field
      anotherBadField: true,
    };
    sendPayload('/products', payload, 'Extra Unknown Fields');
  };

  // BUG 4: Nested object structure wrong
  const handleNestedStructureBug = () => {
    const payload = {
      user: {
        name: formData.name,
        email: formData.email,
        // BUG: API expects flat structure, not nested
      }
    };
    sendPayload('/users', payload, 'Wrong Nested Structure');
  };

  // BUG 5: Sending string instead of object
  const handleStringPayloadBug = () => {
    // BUG: Sending JSON string instead of object
    const payload = JSON.stringify({
      name: 'Product C',
      price: 299,
    });
    sendPayload('/products', payload, 'JSON String Instead of Object');
  };

  // BUG 6: Array when expecting object
  const handleArrayInsteadOfObjectBug = () => {
    const payload = [
      { name: 'Item 1', price: 50 },
      { name: 'Item 2', price: 75 },
    ];
    sendPayload('/products', payload, 'Array Instead of Object');
  };

  // BUG 7: Date format issues
  const handleDateFormatBug = () => {
    const payload = {
      name: 'Event',
      date: new Date(), // BUG: Sending Date object, API expects ISO string
      timestamp: Date.now(), // BUG: Unix timestamp instead of ISO string
    };
    sendPayload('/events', payload, 'Date Format Issues');
  };

  // CORRECT: Properly formatted payload
  const handleCorrectPayload = () => {
    const payload = {
      name: formData.name || 'Valid Product',
      price: parseFloat(formData.price) || 99.99,
      category: 'Electronics',
      inStock: true,
    };
    sendPayload('/products', payload, 'Correct Payload');
  };

  return (
    <div className="lab-card">
      <h3>Lab 4: Payload Debugging - Request & Response Data</h3>
      <p>
        <strong>Bug:</strong> Various payload formatting and data type issues that cause API failures.
      </p>
      <p>
        <strong>Your Task:</strong> Use the Network panel to inspect payloads:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Click failed request → <strong>Payload</strong> tab to see what was sent</li>
        <li>Compare with <strong>Response</strong> tab to see error details</li>
        <li>Check <strong>Preview</strong> tab for formatted response</li>
        <li>Look at console logs showing payload structure</li>
      </ul>

      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label>Test Data (optional):</label>
        <input
          type="text"
          placeholder="Product name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price (e.g., 99.99)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h4>❌ Bug Scenario 1: Type Mismatch</h4>
          <button 
            className="btn btn-danger"
            onClick={handleStringNumberBug}
            disabled={loading}
          >
            Send Numbers as Strings
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            API expects numbers but receives strings "99.99" and "5"
          </p>
        </div>

        <div>
          <h4>❌ Bug Scenario 2: Missing Required Fields</h4>
          <button 
            className="btn btn-danger"
            onClick={handleMissingFieldsBug}
            disabled={loading}
          >
            Send Incomplete Data
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Required field 'price' is missing → 400 Bad Request or 422 Validation Error
          </p>
        </div>

        <div>
          <h4>❌ Bug Scenario 3: Extra Unknown Fields</h4>
          <button 
            className="btn btn-danger"
            onClick={handleExtraFieldsBug}
            disabled={loading}
          >
            Send Extra Fields
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Payload contains fields the API doesn't recognize
          </p>
        </div>

        <div>
          <h4>❌ Bug Scenario 4: Wrong Structure</h4>
          <button 
            className="btn btn-danger"
            onClick={handleNestedStructureBug}
            disabled={loading}
          >
            Send Nested Object
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            API expects flat structure, not nested objects
          </p>
        </div>

        <div>
          <h4>❌ Bug Scenario 5: JSON String vs Object</h4>
          <button 
            className="btn btn-danger"
            onClick={handleStringPayloadBug}
            disabled={loading}
          >
            Send JSON String
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Sending stringified JSON instead of object
          </p>
        </div>

        <div>
          <h4>❌ Bug Scenario 6: Array vs Object</h4>
          <button 
            className="btn btn-danger"
            onClick={handleArrayInsteadOfObjectBug}
            disabled={loading}
          >
            Send Array Instead of Object
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            API expects single object, receives array
          </p>
        </div>

        <div>
          <h4>❌ Bug Scenario 7: Date Formatting</h4>
          <button 
            className="btn btn-danger"
            onClick={handleDateFormatBug}
            disabled={loading}
          >
            Send Date Objects
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Sending Date object instead of ISO string
          </p>
        </div>

        <div>
          <h4>✅ Correct Payload</h4>
          <button 
            className="btn"
            onClick={handleCorrectPayload}
            disabled={loading}
          >
            Send Correct Data
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Properly formatted with correct types
          </p>
        </div>
      </div>

      {loading && (
        <div className="warning">
          <div className="loading"></div> Sending request... Check Network panel and Console!
        </div>
      )}

      {result && (
        <div className={result.includes('✅') ? 'success' : 'error'}>
          <h4>Result:</h4>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            marginTop: '0.5rem',
            fontSize: '0.9rem'
          }}>
            {result}
          </pre>
        </div>
      )}

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔍 How to Debug Payload Issues:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Network Panel:</strong>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Click the request</li>
              <li>Go to <strong>Payload</strong> tab (or Headers → Request Payload)</li>
              <li>Verify structure and data types</li>
              <li>Compare with API documentation</li>
            </ul>
          </li>
          <li><strong>Response Tab:</strong>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Check error messages</li>
              <li>Look for validation errors</li>
              <li>Note which fields are problematic</li>
            </ul>
          </li>
          <li><strong>Console:</strong>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Use console.table() to inspect objects</li>
              <li>Check typeof values before sending</li>
              <li>Log the payload right before sending</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>⚠️ Common Payload Bugs:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Numbers sent as strings (form inputs default to strings!)</li>
          <li>Missing required fields</li>
          <li>Incorrect field names (typos, wrong casing)</li>
          <li>Wrong data structure (nested vs flat, array vs object)</li>
          <li>Date/time format mismatches</li>
          <li>Sending stringified JSON instead of objects</li>
          <li>Boolean sent as string "true" instead of true</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab4PayloadDebugging;
