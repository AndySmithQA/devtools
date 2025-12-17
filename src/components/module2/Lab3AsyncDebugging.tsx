import { useState } from 'react';

// LAB 3: Debugging Async Code, Promises, and Async/Await
// Bug: Multiple issues with async operations

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
}

interface ApiResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
}

function Lab3AsyncDebugging() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('London');

  // Simulated API call with intentional bugs
  const fetchWeatherData = (cityName: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      console.log('Fetching weather for:', cityName);
      
      setTimeout(() => {
        // BUG 1: Random failures not handled properly
        if (Math.random() > 0.7) {
          reject('Network error: Connection timeout');
          return;
        }

        const mockData: Record<string, WeatherData> = {
          'London': { city: 'London', temperature: 15, condition: 'Cloudy' },
          'Paris': { city: 'Paris', temperature: 18, condition: 'Sunny' },
          'New York': { city: 'New York', temperature: 22, condition: 'Clear' },
          'Tokyo': { city: 'Tokyo', temperature: 25, condition: 'Rainy' },
        };

        const data = mockData[cityName];
        
        if (data) {
          resolve({ success: true, data });
        } else {
          // BUG 2: Rejecting with wrong format
          reject({ success: false, error: 'City not found' });
        }
      }, 1500);
    });
  };

  // BUG 3: Not handling promise rejection properly
  const handleFetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    // Intentional bug: missing try-catch
    const response = await fetchWeatherData(city);
    
    // BUG 4: Not checking response structure
    setWeather(response.data!);
    setLoading(false);
  };

  // BUG 5: Promise chain without proper error handling
  const handleFetchWeatherPromise = () => {
    setLoading(true);
    setError(null);
    setWeather(null);

    fetchWeatherData(city)
      .then(response => {
        console.log('Response received');
        setWeather(response.data!);
      })
      // Intentional bug: not catching errors
      .finally(() => {
        setLoading(false);
      });
  };

  // BUG 6: Race condition with multiple async calls
  const handleFetchMultipleCities = async () => {
    setLoading(true);
    const cities = ['London', 'Paris', 'Tokyo'];
    
    // Intentional bug: not using Promise.all correctly
    cities.forEach(async (cityName) => {
      const response = await fetchWeatherData(cityName);
      console.log('Received data for', cityName);
      // BUG: This will only keep the last result
      setWeather(response.data!);
    });
    
    setLoading(false); // BUG: This runs before async operations complete
  };

  // BUG 7: Not handling async errors in event handlers
  const handleQuickFetch = async () => {
    // No loading state, no error handling
    const response = await fetchWeatherData(city);
    setWeather(response.data!);
    console.log('Quick fetch complete');
  };

  return (
    <div className="lab-card">
      <h3>Lab 3: Debugging Async/Await and Promises</h3>
      <p>
        <strong>Bug:</strong> Multiple async operations with poor error handling and race conditions.
      </p>
      <p>
        <strong>Your Task:</strong> Use breakpoints and the console to debug async code:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Set breakpoints inside async functions</li>
        <li>Use "Step over" to follow async execution</li>
        <li>Watch the call stack during async operations</li>
        <li>Add proper try-catch blocks</li>
        <li>Handle promise rejections correctly</li>
      </ul>

      <div className="form-group">
        <label>Select City:</label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="New York">New York</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Berlin">Berlin (Not in database)</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button className="btn" onClick={handleFetchWeather} disabled={loading}>
          Fetch Weather (Async/Await)
        </button>
        <button className="btn" onClick={handleFetchWeatherPromise} disabled={loading}>
          Fetch Weather (Promise Chain)
        </button>
        <button className="btn" onClick={handleFetchMultipleCities} disabled={loading}>
          Fetch Multiple Cities
        </button>
        <button className="btn" onClick={handleQuickFetch} disabled={loading}>
          Quick Fetch (No Error Handling)
        </button>
      </div>

      {loading && (
        <div className="warning">
          <div className="loading"></div> Loading weather data...
        </div>
      )}

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {weather && !loading && (
        <div className="success">
          <h4>Weather in {weather.city}</h4>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Condition:</strong> {weather.condition}</p>
        </div>
      )}

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 Debugging Tips:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Set a breakpoint on the first line of each async function</li>
          <li>Watch how promises resolve/reject in the debugger</li>
          <li>Look for unhandled promise rejections in the console</li>
          <li>Check if loading states are properly managed</li>
          <li>Notice the order of console.logs with multiple async calls</li>
        </ul>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>⚠️ Known Issues:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>API calls fail randomly (30% chance) - not handled</li>
          <li>Berlin is not in the database - error not caught</li>
          <li>Multiple cities fetch has race condition</li>
          <li>Loading states don't wait for async completion</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab3AsyncDebugging;
