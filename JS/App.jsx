import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Module2Console from './pages/Module2Console';
import Module3Network from './pages/Module3Network';
import Module4React from './pages/Module4React';
import Module5Integration from './pages/Module5Integration';
import logoImage from './images/logo.png';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="nav" style={{
          background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            
            <h1 style={{ margin: 0 }}>🔧 Edge DevTools Debugging Course</h1>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/module2">Module 2: Console & JS</Link>
            <Link to="/module3">Module 3: Network</Link>
            <Link to="/module4">Module 4: React DevTools</Link>
            <Link to="/module5">Module 5: Integration</Link>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/module2" element={<Module2Console />} />
            <Route path="/module3" element={<Module3Network />} />
            <Route path="/module4" element={<Module4React />} />
            <Route path="/module5" element={<Module5Integration />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
