import { useState, useEffect } from 'react';
import axios from 'axios';

// SCENARIO 1: API Call Succeeds But Data Doesn't Show
// Multiple bugs working together to hide the data from the user

const API_URL = 'http://localhost:3001/api';

function Scenario1DataNotShowing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // BUG 1: Effect doesn't run on category change
  useEffect(() => {
    fetchProducts();
  }, []); // Missing selectedCategory dependency

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching products...');
      const response = await axios.get(`${API_URL}/products`);
      console.log('API Response:', response);
      console.log('Response data:', response.data);

      // BUG 2: Accessing wrong property path
      const data = response.data; // Should be response.data.data
      console.log('Extracted data:', data);

      // BUG 3: Not checking if data is an array
      setProducts(data); // If data is not an array, map will fail later

      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // BUG 4: Filter logic is incorrect
  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') {
      return true;
    }
    // BUG: Case-sensitive comparison
    return product.category === selectedCategory;
  });

  console.log('Filtered products:', filteredProducts);
  console.log('Selected category:', selectedCategory);

  // BUG 5: Rendering issue - not checking if filteredProducts is valid
  const renderProducts = () => {
    // BUG: No check if filteredProducts is an array
    if (filteredProducts.length === 0) {
      return <p>No products found</p>;
    }

    return (
      <div className="card-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <h4>{product.name}</h4>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="lab-card">
      <h3>🔴 Scenario 1: API Succeeds But Data Doesn't Show</h3>
      
      <div className="error" style={{ marginBottom: '1rem' }}>
        <strong>The Problem:</strong> When you load this page, the API call succeeds (check Network tab!), 
        but no products are displayed. Why?
      </div>

      <div className="warning" style={{ marginBottom: '1rem' }}>
        <strong>🔍 Your Investigation:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Network Tab:</strong> Does the API call succeed? What's the status code?</li>
          <li><strong>Network Response:</strong> What does the response data look like?</li>
          <li><strong>Console:</strong> Are there any errors? What do the console.logs show?</li>
          <li><strong>React DevTools:</strong> What's in the products state? Is it an array?</li>
          <li><strong>Breakpoint:</strong> Set breakpoint in fetchProducts, step through the code</li>
        </ol>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>Filter by Category:</label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="electronics">electronics (lowercase)</option>
          <option value="Furniture">Furniture</option>
        </select>
        <button 
          className="btn" 
          onClick={fetchProducts}
          style={{ marginLeft: '1rem' }}
        >
          Refresh Data
        </button>
      </div>

      {loading && (
        <div className="warning">
          <div className="loading"></div> Loading products...
        </div>
      )}

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <div>
          <h4>Products ({filteredProducts?.length || 0})</h4>
          {renderProducts()}
        </div>
      )}

      <div className="warning" style={{ marginTop: '2rem' }}>
        <strong>💡 Hints (Don't Look Until You Try!):</strong>
        <details>
          <summary style={{ cursor: 'pointer', padding: '0.5rem', background: '#fff', borderRadius: '4px' }}>
            Click to reveal hints
          </summary>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><strong>Hint 1:</strong> Check the Network tab Response. Is the data in response.data or response.data.data?</li>
            <li><strong>Hint 2:</strong> Look at console.log('Extracted data:'). Is it an array or an object?</li>
            <li><strong>Hint 3:</strong> In React DevTools, what type is the products state?</li>
            <li><strong>Hint 4:</strong> Try changing the category filter - does anything happen?</li>
            <li><strong>Hint 5:</strong> Check if the useEffect has the right dependencies</li>
          </ul>
        </details>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🐛 Bugs to Find:</strong>
        <details>
          <summary style={{ cursor: 'pointer', padding: '0.5rem', background: '#fff', borderRadius: '4px' }}>
            Click to reveal bugs
          </summary>
          <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Data path is wrong: response.data should be response.data.data</li>
            <li>products state ends up being an object, not an array</li>
            <li>Array.map fails because products is not an array</li>
            <li>useEffect missing selectedCategory dependency</li>
            <li>Category filter is case-sensitive (should be case-insensitive)</li>
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
{`// Fix 1: Correct data path
const data = response.data.data; // Not response.data

// Fix 2: Add type checking
if (Array.isArray(data)) {
  setProducts(data);
} else {
  console.error('Data is not an array:', data);
  setProducts([]);
}

// Fix 3: Add dependency to useEffect
useEffect(() => {
  fetchProducts();
}, [selectedCategory]); // Include selectedCategory

// Fix 4: Case-insensitive comparison
return product.category.toLowerCase() === selectedCategory.toLowerCase();`}
          </pre>
        </details>
      </div>
    </div>
  );
}

export default Scenario1DataNotShowing;
