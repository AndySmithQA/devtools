import bannerImage from '../images/banner.png';
import logoImage from '../images/logo.png';

function Home() {
  return (
    <div className="module-section">
      {/* Hero Section with Banner */}
      <div style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '3rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <img 
          src={bannerImage} 
          alt="Edge DevTools Course Banner"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maxHeight: '300px',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,120,212,0.85) 0%, rgba(16,110,190,0.85) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <img 
            src={logoImage} 
            alt="Course Logo"
            style={{
              width: '80px',
              height: '80px',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
            }}
          />
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 1rem 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontWeight: '700'
          }}>
            Edge DevTools Debugging Course
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            margin: 0,
            maxWidth: '800px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Master debugging web applications with hands-on labs and real-world scenarios
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        padding: '0 1rem'
      }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
          This interactive application contains hands-on labs for each module of the course.
          Each module includes intentional bugs and issues for you to discover and fix using
          Microsoft Edge DevTools.
        </p>
      </div>

      {/* Cards Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        
        {/* Course Modules Card */}
        <div className="lab-card" style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
          borderLeft: '4px solid #0078d4'
        }}>
          <h3 style={{ color: '#0078d4', marginBottom: '1rem' }}>📋 Course Modules</h3>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
            <li><strong>Module 2:</strong> Console Debugging & JavaScript Execution</li>
            <li><strong>Module 3:</strong> Network Debugging & HTTP Status Codes</li>
            <li><strong>Module 4:</strong> Debugging React with React Developer Tools</li>
            <li><strong>Module 5:</strong> End-to-End Debugging Scenarios</li>
          </ul>
        </div>

        {/* How to Use Card */}
        <div className="lab-card" style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
          borderLeft: '4px solid #107c10'
        }}>
          <h3 style={{ color: '#107c10', marginBottom: '1rem' }}>🎯 How to Use These Labs</h3>
          <ol style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
            <li>Navigate to each module using the navigation bar above</li>
            <li>Read the lab description and try to reproduce the issue</li>
            <li>Use Edge DevTools to investigate and diagnose the problem</li>
            <li>Apply fixes and verify the solution</li>
            <li>Check the instructor solutions if you get stuck</li>
          </ol>
        </div>

        {/* Required Tools Card */}
        <div className="lab-card" style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
          borderLeft: '4px solid #5c2d91'
        }}>
          <h3 style={{ color: '#5c2d91', marginBottom: '1rem' }}>🔧 Required Tools</h3>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
            <li>Microsoft Edge browser (latest version)</li>
            <li>React Developer Tools extension for Edge</li>
            <li>Edge DevTools (built-in - press F12 to open)</li>
          </ul>
        </div>
      </div>

      {/* Important Notice */}
      <div className="warning" style={{
        borderLeft: '4px solid #d83b01',
        background: 'linear-gradient(to right, #fff4e6, #ffffff)',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <strong style={{ color: '#d83b01' }}>⚠️ Important:</strong> These labs contain intentional bugs and issues.
        This is by design to help you practice debugging skills. Don't worry if things
        don't work correctly at first - that's the point!
      </div>

      {/* Quick Start */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#f0f6ff',
        borderRadius: '8px',
        border: '1px solid #0078d4',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#0078d4', marginBottom: '1rem' }}>🚀 Ready to Start?</h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Press <kbd style={{
            background: '#fff',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontFamily: 'monospace'
          }}>F12</kbd> to open DevTools, then select a module from the navigation bar to begin!
        </p>
      </div>
    </div>
  );
}

export default Home;
