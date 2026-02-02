import { useState } from 'react';
import axios from 'axios';

// LAB 1: Understanding HTTP Status Codes
// Practice identifying and handling different HTTP status codes

const API_URL = 'http://localhost:3001/api';

function Lab1HttpStatusCodes() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);

  const makeRequest = async (endpoint, method, body) => {
    setLoading(true);
    setResult('');
    setStatusCode(null);

    try {
      const config = {
        method,
        url: `${API_URL}${endpoint}`,
        data: body,
        validateStatus: () => true, // Don't throw on any status
      };

      const response = await axios(config);
      setStatusCode(response.status);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Network Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusCodeInfo = (code) => {
    if (!code) return null;

    const info = {
      200: { type: 'success', meaning: 'OK - Request succeeded' },
      201: { type: 'success', meaning: 'Created - Resource created successfully' },
      204: { type: 'success', meaning: 'No Content - Success but no response body' },
      400: { type: 'error', meaning: 'Bad Request - Invalid data sent to server' },
      401: { type: 'error', meaning: 'Unauthorized - Authentication required' },
      403: { type: 'error', meaning: 'Forbidden - Not allowed to access resource' },
      404: { type: 'error', meaning: 'Not Found - Resource does not exist' },
      422: { type: 'error', meaning: 'Unprocessable Entity - Validation failed' },
      500: { type: 'error', meaning: 'Internal Server Error - Server-side problem' },
      502: { type: 'error', meaning: 'Bad Gateway - Server received invalid response' },
      503: { type: 'error', meaning: 'Service Unavailable - Server is down' },
    };

    return info[code] || { type: 'unknown', meaning: 'Unknown status code' };
  };

  const statusInfo = getStatusCodeInfo(statusCode);

  return (
    <div className="lab-card">
      <h3>Lab 1: HTTP Status Codes in Action</h3>
      <p>
        <strong>Learning Goal:</strong> Understand different HTTP status codes by making API requests
        and observing the responses in the Network panel.
      </p>
      <p>
        <strong>Your Task:</strong> Open the Network panel (F12 → Network tab) and click each button.
        Watch the requests and examine:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>The Status Code column</li>
        <li>Request headers and payload</li>
        <li>Response headers and body</li>
        <li>Timing information</li>
      </ul>

      <div className="warning" style={{ marginBottom: '1rem' }}>
        <strong>⚠️ Prerequisites:</strong> Make sure the mock API server is running:
        <code style={{ display: 'block', marginTop: '0.5rem', background: '#f0f0f0', padding: '0.5rem' }}>
          npm run server
        </code>
      </div>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h4>2xx Success Responses</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn"
              onClick={() => makeRequest('/products', 'GET')}
              disabled={loading}
            >
              GET Products (200 OK)
            </button>
            <button 
              className="btn"
              onClick={() => makeRequest('/products', 'POST', { name: 'New Item', price: 99 })}
              disabled={loading}
            >
              Create Product (201 Created)
            </button>
            <button 
              className="btn"
              onClick={() => makeRequest('/products/1', 'DELETE')}
              disabled={loading}
            >
              Delete Product (204 No Content)
            </button>
          </div>
        </div>

        <div>
          <h4>4xx Client Errors</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-danger"
              onClick={() => makeRequest('/products', 'POST', { invalid: 'data' })}
              disabled={loading}
            >
              Invalid Payload (400 Bad Request)
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => makeRequest('/secure', 'GET')}
              disabled={loading}
            >
              No Auth Token (401 Unauthorized)
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => makeRequest('/admin', 'GET')}
              disabled={loading}
            >
              Insufficient Permissions (403 Forbidden)
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => makeRequest('/products/9999', 'GET')}
              disabled={loading}
            >
              Non-existent Resource (404 Not Found)
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => makeRequest('/products/1', 'PUT', { price: -100 })}
              disabled={loading}
            >
              Validation Error (422)
            </button>
          </div>
        </div>

        <div>
          <h4>5xx Server Errors</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-danger"
              onClick={() => makeRequest('/error', 'GET')}
              disabled={loading}
            >
              Server Error (500)
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => makeRequest('/slow', 'GET')}
              disabled={loading}
            >
              Slow Request (Test Timeout)
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="warning">
          <div className="loading"></div> Making request... Check the Network panel!
        </div>
      )}

      {statusCode && statusInfo && (
        <div className={statusInfo.type === 'success' ? 'success' : 'error'}>
          <h4>Status Code: {statusCode}</h4>
          <p><strong>{statusInfo.meaning}</strong></p>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Response:</h4>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px', 
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {result}
          </pre>
        </div>
      )}

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 What to Look For in Network Panel:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Status column:</strong> Color-coded (red = error, black = success)</li>
          <li><strong>Method column:</strong> GET, POST, PUT, DELETE</li>
          <li><strong>Type column:</strong> xhr, fetch, document, etc.</li>
          <li><strong>Size column:</strong> Response size</li>
          <li><strong>Time column:</strong> Request duration</li>
          <li><strong>Waterfall:</strong> Visual timeline of request</li>
          <li>Click a request to see Headers, Preview, Response, Timing tabs</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab1HttpStatusCodes;
