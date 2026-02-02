import { useState } from 'react';
import axios from 'axios';

// LAB 2: CORS (Cross-Origin Resource Sharing) Issues
// Bug: Demonstrates common CORS problems

function Lab2CorsIssues() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const makeRequest = async (url, withCredentials = false) => {
    setLoading(true);
    setResult('');

    try {
      const response = await axios.get(url, {
        withCredentials,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setResult(`Success! Status: ${response.status}\nData: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      if (error.response) {
        setResult(`Error: ${error.response.status} - ${error.response.statusText}\n${JSON.stringify(error.response.data, null, 2)}`);
      } else if (error.message.includes('Network Error')) {
        setResult(`CORS Error! ${error.message}\n\nThis is typically a CORS issue. Check the console for details.`);
      } else {
        setResult(`Error: ${error.message}`);
      }
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lab-card">
      <h3>Lab 2: Understanding and Debugging CORS Issues</h3>
      <p>
        <strong>Bug:</strong> CORS errors prevent requests to external APIs or APIs without proper headers.
      </p>
      <p>
        <strong>Your Task:</strong> Open DevTools (F12) and observe:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Console errors mentioning CORS</li>
        <li>Network panel showing failed requests (often in red)</li>
        <li>Look for "Access-Control-Allow-Origin" in response headers</li>
        <li>Distinguish between CORS errors and other network failures</li>
      </ul>

      <div className="warning" style={{ marginBottom: '1rem' }}>
        <strong>📚 What is CORS?</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
          CORS (Cross-Origin Resource Sharing) is a security feature that restricts web pages 
          from making requests to a different domain than the one serving the web page. 
          The server must include specific headers to allow cross-origin requests.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h4>Scenario 1: Valid CORS Request</h4>
          <button 
            className="btn"
            onClick={() => makeRequest('http://localhost:3001/api/products')}
            disabled={loading}
          >
            Request to Same Origin (Works)
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            This works because the API server has CORS enabled for localhost
          </p>
        </div>

        <div>
          <h4>Scenario 2: External API without CORS</h4>
          <button 
            className="btn btn-danger"
            onClick={() => makeRequest('https://httpbin.org/get')}
            disabled={loading}
          >
            Request to External API
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            May work or fail depending on the external API's CORS policy
          </p>
        </div>

        <div>
          <h4>Scenario 3: CORS with Credentials</h4>
          <button 
            className="btn btn-danger"
            onClick={() => makeRequest('http://localhost:3001/api/secure', true)}
            disabled={loading}
          >
            Request with Credentials
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Requires server to explicitly allow credentials in CORS headers
          </p>
        </div>

        <div>
          <h4>Scenario 4: Preflight Request</h4>
          <button 
            className="btn"
            onClick={async () => {
              setLoading(true);
              setResult('');
              try {
                // This triggers a preflight OPTIONS request
                const response = await axios.post('http://localhost:3001/api/products', 
                  { name: 'Test', price: 100 },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Custom-Header': 'test', // Custom header triggers preflight
                    }
                  }
                );
                setResult(`Success! Status: ${response.status}\nData: ${JSON.stringify(response.data, null, 2)}`);
              } catch (error) {
                setResult(`Error: ${error.message}`);
                console.error('Preflight failed:', error);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            POST with Custom Header (Preflight)
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Watch for TWO requests in Network panel: OPTIONS (preflight) then POST
          </p>
        </div>
      </div>

      {loading && (
        <div className="warning">
          <div className="loading"></div> Making request... Watch the Network and Console panels!
        </div>
      )}

      {result && (
        <div className={result.includes('Success') ? 'success' : 'error'}>
          <h4>Result:</h4>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            marginTop: '0.5rem' 
          }}>
            {result}
          </pre>
        </div>
      )}

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 Debugging CORS in Edge DevTools:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Console:</strong> Look for red CORS error messages</li>
          <li><strong>Network Panel:</strong> 
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Failed requests often show status 0 or "CORS error"</li>
              <li>Click the request → Headers tab</li>
              <li>Check for "Access-Control-Allow-Origin" in Response Headers</li>
              <li>For preflight: Look for OPTIONS request before POST/PUT/DELETE</li>
            </ul>
          </li>
          <li><strong>Common CORS Headers:</strong>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Access-Control-Allow-Origin</li>
              <li>Access-Control-Allow-Methods</li>
              <li>Access-Control-Allow-Headers</li>
              <li>Access-Control-Allow-Credentials</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔧 Common CORS Solutions:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Backend:</strong> Add CORS headers to API responses</li>
          <li><strong>Development:</strong> Use a proxy in vite.config.ts or package.json</li>
          <li><strong>Production:</strong> Ensure API and frontend are on same domain, or configure CORS properly</li>
          <li><strong>Never:</strong> Disable web security in browser (insecure!)</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab2CorsIssues;
