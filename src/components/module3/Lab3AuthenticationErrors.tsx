import { useState } from 'react';
import axios from 'axios';

// LAB 3: Authentication and Authorization Errors (401 vs 403)
// Bug: Demonstrates auth token issues and permission problems

const API_URL = 'http://localhost:3001/api';

function Lab3AuthenticationErrors() {
  const [authToken, setAuthToken] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setResult('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      const token = response.data.token;
      setAuthToken(token);
      setIsLoggedIn(true);
      setResult(`Login successful! Token: ${token.substring(0, 20)}...`);
    } catch (error: any) {
      if (error.response) {
        setResult(`Login failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else {
        setResult(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const makeAuthenticatedRequest = async (
    endpoint: string, 
    useToken: boolean,
    wrongToken: boolean = false
  ) => {
    setLoading(true);
    setResult('');

    try {
      const headers: any = {};
      
      if (useToken) {
        // BUG: Common mistakes with auth headers
        if (wrongToken) {
          headers['Authorization'] = 'InvalidToken123'; // Wrong format
        } else {
          headers['Authorization'] = `Bearer ${authToken}`;
        }
      }
      // BUG: Sometimes developers forget to include the token at all

      console.log('Request headers:', headers);

      const response = await axios.get(`${API_URL}${endpoint}`, { headers });
      setResult(`Success! Status: ${response.status}\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        let message = '';

        if (status === 401) {
          message = '🔒 401 Unauthorized - Authentication required or token invalid/expired';
        } else if (status === 403) {
          message = '⛔ 403 Forbidden - You are authenticated but don\'t have permission';
        }

        setResult(`${message}\n\nStatus: ${status}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        setResult(`Network Error: ${error.message}`);
      }
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    setIsLoggedIn(false);
    setResult('Logged out successfully');
  };

  return (
    <div className="lab-card">
      <h3>Lab 3: Authentication & Authorization Debugging</h3>
      <p>
        <strong>Learning Goal:</strong> Understand the difference between 401 (Unauthorized) 
        and 403 (Forbidden) errors, and how to debug authentication issues.
      </p>
      <p>
        <strong>Your Task:</strong> Use the Network panel to inspect:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Request headers (especially Authorization header)</li>
        <li>Response status codes (401 vs 403)</li>
        <li>Response bodies with error details</li>
        <li>Whether tokens are being sent correctly</li>
      </ul>

      {!isLoggedIn ? (
        <div>
          <h4>Step 1: Login to Get Token</h4>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn"
              onClick={() => handleLogin('user', 'password')}
              disabled={loading}
            >
              Login as Regular User
            </button>
            <button 
              className="btn"
              onClick={() => handleLogin('admin', 'admin123')}
              disabled={loading}
            >
              Login as Admin
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => handleLogin('wrong', 'credentials')}
              disabled={loading}
            >
              Login with Wrong Credentials
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="success" style={{ marginBottom: '1rem' }}>
            ✅ Logged in! Token: <code>{authToken.substring(0, 30)}...</code>
            <button className="btn btn-secondary" onClick={handleLogout} style={{ marginLeft: '1rem' }}>
              Logout
            </button>
          </div>

          <h4>Step 2: Make Authenticated Requests</h4>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h5>✅ Correct Authentication</h5>
              <button 
                className="btn"
                onClick={() => makeAuthenticatedRequest('/profile', true)}
                disabled={loading}
              >
                Get Profile (With Token)
              </button>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                Should work - token is sent correctly
              </p>
            </div>

            <div>
              <h5>❌ No Authentication</h5>
              <button 
                className="btn btn-danger"
                onClick={() => makeAuthenticatedRequest('/profile', false)}
                disabled={loading}
              >
                Get Profile (No Token) → 401
              </button>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                Will fail with 401 - no auth token provided
              </p>
            </div>

            <div>
              <h5>❌ Wrong Token Format</h5>
              <button 
                className="btn btn-danger"
                onClick={() => makeAuthenticatedRequest('/profile', true, true)}
                disabled={loading}
              >
                Get Profile (Invalid Token) → 401
              </button>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                Will fail with 401 - token format is incorrect
              </p>
            </div>

            <div>
              <h5>⛔ Insufficient Permissions</h5>
              <button 
                className="btn btn-danger"
                onClick={() => makeAuthenticatedRequest('/admin/users', true)}
                disabled={loading}
              >
                Access Admin Endpoint → 403
              </button>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                May fail with 403 if logged in as regular user (not admin)
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="warning">
          <div className="loading"></div> Processing... Check Network panel!
        </div>
      )}

      {result && (
        <div className={result.includes('Success') || result.includes('successful') ? 'success' : 'error'}>
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
        <strong>💡 Key Differences:</strong>
        <table className="data-table" style={{ marginTop: '0.5rem' }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Meaning</th>
              <th>Common Causes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>401</strong></td>
              <td>Unauthorized</td>
              <td>Authentication required</td>
              <td>
                • No token sent<br/>
                • Invalid token<br/>
                • Expired token<br/>
                • Wrong token format
              </td>
            </tr>
            <tr>
              <td><strong>403</strong></td>
              <td>Forbidden</td>
              <td>Authenticated but not authorized</td>
              <td>
                • Valid token but insufficient permissions<br/>
                • User role doesn't allow action<br/>
                • Resource access denied
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔍 How to Debug Auth Issues in Network Panel:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Click the failed request in Network panel</li>
          <li>Go to <strong>Headers</strong> tab</li>
          <li>Check <strong>Request Headers</strong>:
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Is "Authorization" header present?</li>
              <li>Is the format correct? (Usually "Bearer &lt;token&gt;")</li>
              <li>Is the token value complete?</li>
            </ul>
          </li>
          <li>Check <strong>Response</strong> tab for error details</li>
          <li>401 = Fix authentication (add/fix token)</li>
          <li>403 = Check user permissions/roles</li>
        </ol>
      </div>
    </div>
  );
}

export default Lab3AuthenticationErrors;
