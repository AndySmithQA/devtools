import { useState } from 'react';

// LAB 4: Breakpoint Practice - Step Over, Step Into, Step Out
// Bug: Complex calculation logic with nested functions

function Lab4BreakpointPractice() {
  const [transactions] = useState([
    { id: 1, amount: 5000, type: 'income', category: 'Salary', date: '2024-01-01' },
    { id: 2, amount: 1200, type: 'expense', category: 'Rent', date: '2024-01-05' },
    { id: 3, amount: 300, type: 'expense', category: 'Groceries', date: '2024-01-10' },
    { id: 4, amount: 150, type: 'expense', category: 'Entertainment', date: '2024-01-12' },
    { id: 5, amount: 2000, type: 'income', category: 'Freelance', date: '2024-01-15' },
    { id: 6, amount: 500, type: 'expense', category: 'Utilities', date: '2024-01-20' },
  ]);

  const [result, setResult] = useState(null);

  // Helper function - practice "Step Into"
  const calculateTax = (income) => {
    console.log('Calculating tax for income:', income);
    
    if (income <= 0) {
      return 0;
    }
    
    let tax = 0;
    
    // BUG: Tax calculation logic is incorrect
    if (income > 10000) {
      tax = income * 0.3; // Should be progressive
    } else if (income > 5000) {
      tax = income * 0.2;
    } else {
      tax = income * 0.1;
    }
    
    console.log('Tax calculated:', tax);
    return tax;
  };

  // Helper function - practice "Step Into"
  const applyDiscount = (expense, category) => {
    console.log('Applying discount to', category, expense);
    
    const discounts = {
      'Groceries': 0.05,
      'Entertainment': 0.1,
      'Utilities': 0.02,
    };
    
    const discount = discounts[category] || 0;
    // BUG: Should subtract discount, but multiplies instead
    const result = expense * (1 + discount);
    
    console.log('After discount:', result);
    return result;
  };

  // Complex nested function - practice stepping through
  const processTransaction = (transaction) => {
    console.log('Processing transaction:', transaction.id);
    
    let processed = transaction.amount;
    
    if (transaction.type === 'income') {
      const tax = calculateTax(processed);
      // BUG: Should subtract tax, but adds it
      processed = processed + tax;
      console.log('After tax:', processed);
    } else if (transaction.type === 'expense') {
      processed = applyDiscount(processed, transaction.category);
    }
    
    return processed;
  };

  // Main calculation with multiple steps
  const calculateFinancialSummary = () => {
    console.log('=== Starting Financial Summary Calculation ===');
    
    let totalIncome = 0;
    let totalExpenses = 0;
    let processedIncome = 0;
    let processedExpenses = 0;
    
    // Practice: Set breakpoint here and step through
    for (const transaction of transactions) {
      console.log('\n--- Processing transaction', transaction.id, '---');
      
      const processed = processTransaction(transaction);
      
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
        processedIncome += processed;
      } else {
        totalExpenses += transaction.amount;
        processedExpenses += processed;
      }
    }
    
    // BUG: Incorrect net calculation
    const netIncome = totalIncome - totalExpenses;
    const netProcessed = processedIncome - processedExpenses;
    
    // BUG: Savings rate calculation is wrong
    const savingsRate = (netIncome / totalIncome) * 100;
    
    const summary = {
      totalIncome,
      totalExpenses,
      netIncome,
      processedIncome,
      processedExpenses,
      netProcessed,
      savingsRate: savingsRate.toFixed(2) + '%',
      transactionCount: transactions.length,
    };
    
    console.log('=== Final Summary ===');
    console.log(summary);
    
    return summary;
  };

  // Calculate average by category
  const calculateCategoryAverage = (category) => {
    console.log('Calculating average for category:', category);
    
    const categoryTransactions = transactions.filter(
      t => t.category === category
    );
    
    console.log('Found transactions:', categoryTransactions.length);
    
    if (categoryTransactions.length === 0) {
      return 0;
    }
    
    let sum = 0;
    
    // Practice: Step through this loop
    for (let i = 0; i < categoryTransactions.length; i++) {
      const transaction = categoryTransactions[i];
      console.log(`Transaction ${i + 1}:`, transaction.amount);
      sum += transaction.amount;
    }
    
    // BUG: Division by wrong number
    const average = sum / (categoryTransactions.length - 1);
    
    console.log('Average:', average);
    return average;
  };

  const handleCalculate = () => {
    // Add debugger statement here for practice
    debugger; // This will pause execution
    const summary = calculateFinancialSummary();
    setResult(summary);
  };

  const handleCategoryAverage = (category) => {
    const avg = calculateCategoryAverage(category);
    alert(`Average for ${category}: $${avg.toFixed(2)}`);
  };

  return (
    <div className="lab-card">
      <h3>Lab 4: Breakpoint Practice - Step Over, Into, Out</h3>
      <p>
        <strong>Bug:</strong> Complex calculations with multiple nested functions containing logic errors.
      </p>
      <p>
        <strong>Your Task:</strong> Practice using breakpoints and stepping through code:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Open Sources panel in DevTools (F12)</li>
        <li>Find this file and set breakpoints</li>
        <li><strong>Step Over (F10):</strong> Execute current line, don't go into functions</li>
        <li><strong>Step Into (F11):</strong> Go inside function calls</li>
        <li><strong>Step Out (Shift+F11):</strong> Exit current function</li>
        <li>Watch variables in the Scope panel</li>
        <li>Use the debugger statement to auto-pause</li>
      </ul>

      <div style={{ marginBottom: '1rem' }}>
        <button className="btn" onClick={handleCalculate}>
          Calculate Financial Summary
        </button>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Click this and debugger will pause. Practice stepping through the code.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={() => handleCategoryAverage('Salary')}>
          Avg: Salary
        </button>
        <button className="btn btn-secondary" onClick={() => handleCategoryAverage('Rent')}>
          Avg: Rent
        </button>
        <button className="btn btn-secondary" onClick={() => handleCategoryAverage('Groceries')}>
          Avg: Groceries
        </button>
      </div>

      {result && (
        <div className="success">
          <h4>Financial Summary</h4>
          <table className="data-table">
            <tbody>
              <tr>
                <td><strong>Total Income</strong></td>
                <td>${result.totalIncome}</td>
              </tr>
              <tr>
                <td><strong>Total Expenses</strong></td>
                <td>${result.totalExpenses}</td>
              </tr>
              <tr>
                <td><strong>Net Income</strong></td>
                <td>${result.netIncome}</td>
              </tr>
              <tr>
                <td><strong>Processed Income (after tax)</strong></td>
                <td>${result.processedIncome.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Processed Expenses (after discount)</strong></td>
                <td>${result.processedExpenses.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Net Processed</strong></td>
                <td>${result.netProcessed.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Savings Rate</strong></td>
                <td>{result.savingsRate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 Breakpoint Practice:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Set breakpoint at <code>calculateFinancialSummary</code> function start</li>
          <li>Click "Calculate" button - execution will pause</li>
          <li>Use <strong>Step Over (F10)</strong> to go line by line</li>
          <li>When you hit <code>processTransaction()</code>, use <strong>Step Into (F11)</strong></li>
          <li>Inside nested functions, try <strong>Step Out (Shift+F11)</strong></li>
          <li>Watch the variables change in the Scope panel</li>
          <li>Notice the Call Stack showing function hierarchy</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🐛 Bugs to Find:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Tax is being added instead of subtracted from income</li>
          <li>Discount increases expense instead of decreasing it</li>
          <li>Average calculation divides by (length - 1) instead of length</li>
          <li>Savings rate calculation is incorrect</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab4BreakpointPractice;
