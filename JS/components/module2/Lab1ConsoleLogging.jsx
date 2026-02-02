import { useState } from 'react';

// LAB 1: Console Logging Practice
// Bug: Poor console logging makes it hard to track data flow
// Goal: Use console.table, console.group, and structured logging

function Lab1ConsoleLogging() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
    { id: 2, name: 'Mouse', price: 29, category: 'Electronics', inStock: true },
    { id: 3, name: 'Desk', price: 299, category: 'Furniture', inStock: false },
    { id: 4, name: 'Chair', price: 199, category: 'Furniture', inStock: true },
    { id: 5, name: 'Monitor', price: 349, category: 'Electronics', inStock: true },
  ]);

  const [filter, setFilter] = useState('all');

  const filterProducts = () => {
    console.log('Filtering products...');
    console.log(filter);
    
    // BUG: This logging is not helpful for debugging
    let result = products;
    
    if (filter === 'inStock') {
      result = products.filter(p => p.inStock);
      console.log('Filtered');
    } else if (filter === 'outOfStock') {
      result = products.filter(p => !p.inStock);
      console.log('Filtered');
    } else if (filter === 'expensive') {
      result = products.filter(p => p.price > 200);
      console.log('Filtered expensive items');
    }
    
    console.log(result);
    return result;
  };

  const calculateStats = () => {
    const filtered = filterProducts();
    
    // BUG: Complex calculation with poor logging
    const total = filtered.reduce((sum, p) => sum + p.price, 0);
    const avg = total / filtered.length;
    const categories = [...new Set(filtered.map(p => p.category))];
    
    console.log('Total: ' + total);
    console.log('Average: ' + avg);
    console.log('Categories: ' + categories);
    
    return { total, avg, categories, count: filtered.length };
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: 'New Product',
      price: 99,
      category: 'Electronics',
      inStock: true
    };
    
    // BUG: No logging of the operation
    setProducts([...products, newProduct]);
  };

  const stats = calculateStats();
  const filtered = filterProducts();

  return (
    <div className="lab-card">
      <h3>Lab 1: Console Logging Best Practices</h3>
      <p>
        <strong>Bug:</strong> The console output is cluttered and unhelpful. The logging doesn't 
        provide clear insights into the data flow.
      </p>
      <p>
        <strong>Your Task:</strong> Open the Console in Edge DevTools (F12). Click the buttons 
        and observe the console output. The logging is poor - it's hard to understand what's happening.
      </p>
      <p>
        <strong>What to fix:</strong>
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Use <code>console.table()</code> to display the products array</li>
        <li>Use <code>console.group()</code> and <code>console.groupEnd()</code> to organize related logs</li>
        <li>Use <code>console.warn()</code> for empty results</li>
        <li>Add structured logging with meaningful labels</li>
      </ul>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Products</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
          <option value="expensive">Expensive (&gt;$200)</option>
        </select>
        <button className="btn" onClick={handleAddProduct} style={{ marginLeft: '1rem' }}>
          Add Product
        </button>
      </div>

      <div className="success" style={{ marginBottom: '1rem' }}>
        <strong>Stats:</strong> {stats.count} products | Total: ${stats.total} | 
        Average: ${stats.avg.toFixed(2)} | Categories: {stats.categories.join(', ')}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.inStock ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 Hint:</strong> Look at the console while changing filters. The output should 
        be clear and organized. Consider using console.table() for arrays of objects.
      </div>
    </div>
  );
}

export default Lab1ConsoleLogging;
