import { useState } from 'react';

// LAB 4: Prop Drilling and Component Tree Inspection
// Bug: Props being passed through many layers, hard to track data flow

// Deep nested component structure
const DeepChildLevel4 = ({ 
  theme, 
  userName, 
  onToggle 
}) => {
  console.log('Rendering DeepChildLevel4', { theme, userName });
  
  return (
    <div style={{ 
      padding: '1rem', 
      background: theme.background,
      border: `2px solid ${theme.primary}`,
      borderRadius: '4px'
    }}>
      <h5>Level 4 (Deepest)</h5>
      <p>Theme Primary: {theme.primary}</p>
      <p>User: {userName}</p>
      <button 
        className="btn"
        onClick={onToggle}
        style={{ background: theme.primary }}
      >
        Toggle Notifications
      </button>
    </div>
  );
};

const DeepChildLevel3 = ({ 
  theme, 
  userName, 
  onToggle 
}) => {
  console.log('Rendering DeepChildLevel3');
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h5>Level 3</h5>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Passing props: theme, userName, onToggle
      </p>
      <DeepChildLevel4 theme={theme} userName={userName} onToggle={onToggle} />
    </div>
  );
};

const DeepChildLevel2 = ({ 
  theme, 
  userName, 
  email,
  onToggle 
}) => {
  console.log('Rendering DeepChildLevel2');
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #aaa', borderRadius: '4px' }}>
      <h5>Level 2</h5>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Has email prop but doesn't use it. Still passes other props down.
      </p>
      <p>Email available here: {email}</p>
      <DeepChildLevel3 theme={theme} userName={userName} onToggle={onToggle} />
    </div>
  );
};

const DeepChildLevel1 = ({ 
  settings, 
  onToggle 
}) => {
  console.log('Rendering DeepChildLevel1');
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #888', borderRadius: '4px' }}>
      <h5>Level 1</h5>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Receives full settings object, extracts what's needed, passes down.
      </p>
      <p>Notifications: {settings.notifications ? 'Enabled' : 'Disabled'}</p>
      <DeepChildLevel2 
        theme={settings.theme} 
        userName={settings.name} 
        email={settings.email}
        onToggle={onToggle} 
      />
    </div>
  );
};

// Another example: Sidebar with multiple levels
const SidebarItem = ({ 
  label, 
  isActive, 
  theme 
}) => {
  return (
    <div style={{
      padding: '0.5rem 1rem',
      background: isActive ? theme.primary : theme.background,
      color: isActive ? 'white' : 'black',
      borderRadius: '4px',
      marginBottom: '0.25rem',
      cursor: 'pointer'
    }}>
      {label}
    </div>
  );
};

const SidebarSection = ({ 
  title, 
  items, 
  activeItem, 
  theme 
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h5>{title}</h5>
      {items.map(item => (
        <SidebarItem 
          key={item}
          label={item} 
          isActive={item === activeItem}
          theme={theme}
        />
      ))}
    </div>
  );
};

const Sidebar = ({ 
  sections, 
  activeItem, 
  theme 
}) => {
  return (
    <div style={{ 
      width: '200px', 
      padding: '1rem', 
      background: theme.background,
      border: `1px solid ${theme.secondary}`,
      borderRadius: '4px'
    }}>
      <h4>Sidebar</h4>
      {sections.map(section => (
        <SidebarSection
          key={section.title}
          title={section.title}
          items={section.items}
          activeItem={activeItem}
          theme={theme}
        />
      ))}
    </div>
  );
};

function Lab4PropDrilling() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    notifications: true,
    theme: {
      primary: '#0078d4',
      secondary: '#106ebe',
      background: '#f0f0f0',
    }
  });

  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleToggleNotifications = () => {
    setSettings(prev => ({
      ...prev,
      notifications: !prev.notifications
    }));
    console.log('Toggled notifications');
  };

  const handleChangeTheme = (newTheme) => {
    setSettings(prev => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme }
    }));
  };

  const sections = [
    { title: 'Main', items: ['Dashboard', 'Analytics', 'Reports'] },
    { title: 'Settings', items: ['Profile', 'Preferences', 'Security'] },
  ];

  return (
    <div className="lab-card">
      <h3>Lab 4: Prop Drilling & Component Tree</h3>
      <p>
        <strong>Bug:</strong> Props being passed through multiple layers, making it hard to track data flow.
      </p>
      <p>
        <strong>Your Task:</strong> Use React DevTools to inspect the component tree:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Open React DevTools → Components tab</li>
        <li>Expand the component tree to see the hierarchy</li>
        <li>Click on each component to see its props</li>
        <li>Notice how props are passed through intermediate components</li>
        <li>Some components receive props they don't use (just to pass down)</li>
        <li>Use the search box to find specific components</li>
        <li>Hover over components to highlight them in the UI</li>
      </ul>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Current Settings</h4>
        <div className="success" style={{ padding: '1rem' }}>
          <p><strong>Name:</strong> {settings.name}</p>
          <p><strong>Email:</strong> {settings.email}</p>
          <p><strong>Notifications:</strong> {settings.notifications ? 'Enabled' : 'Disabled'}</p>
          <p><strong>Theme Primary:</strong> {settings.theme.primary}</p>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h5>Change Theme:</h5>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn"
              onClick={() => handleChangeTheme({ primary: '#0078d4', background: '#f0f0f0' })}
            >
              Blue Theme
            </button>
            <button 
              className="btn"
              onClick={() => handleChangeTheme({ primary: '#107c10', background: '#e6f4ea' })}
            >
              Green Theme
            </button>
            <button 
              className="btn"
              onClick={() => handleChangeTheme({ primary: '#d83b01', background: '#fef0e6' })}
            >
              Orange Theme
            </button>
            <button 
              className="btn"
              onClick={() => handleChangeTheme({ primary: '#5c2d91', background: '#f4f0fa' })}
            >
              Purple Theme
            </button>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Change theme and watch all nested components update in React DevTools
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Example 1: Deep Prop Drilling (4 levels)</h4>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          The toggle button is in Level 4, but the function comes from this parent. 
          It's passed through 3 intermediate components!
        </p>
        <DeepChildLevel1 settings={settings} onToggle={handleToggleNotifications} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Example 2: Sidebar with Theme Prop</h4>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          Theme prop is passed through Sidebar → SidebarSection → SidebarItem (3 levels)
        </p>
        <Sidebar 
          sections={sections}
          activeItem={activeItem}
          theme={settings.theme}
        />
      </div>

      <div className="warning">
        <strong>💡 Inspecting Components in React DevTools:</strong>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Open React DevTools → Components tab</li>
          <li>You'll see a tree: App → Module4React → Lab4PropDrilling → ...</li>
          <li>Expand Lab4PropDrilling to see DeepChildLevel1, Level2, etc.</li>
          <li>Click on DeepChildLevel3:
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Right panel shows its props: theme, userName, onToggle</li>
              <li>Notice it receives props but only passes them down</li>
            </ul>
          </li>
          <li>Click on DeepChildLevel4:
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>See the same props, but this component actually uses them</li>
            </ul>
          </li>
          <li>Change the theme using buttons above</li>
          <li>Watch the props update in real-time in DevTools</li>
        </ol>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔍 What to Look For:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Prop drilling:</strong> Same prop appearing in multiple levels</li>
          <li><strong>Unused props:</strong> Components receiving props they don't use</li>
          <li><strong>Deep nesting:</strong> Many layers in the component tree</li>
          <li><strong>Complex objects:</strong> Entire objects passed when only one property is needed</li>
        </ul>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>🔧 Solutions to Prop Drilling:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Context API:</strong> Share data without passing props</li>
          <li><strong>Component composition:</strong> Pass children instead of data</li>
          <li><strong>State management:</strong> Redux, Zustand, Jotai, etc.</li>
          <li><strong>Lift state down:</strong> Move state closer to where it's used</li>
        </ul>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>💡 React DevTools Features:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Search:</strong> Find components by name</li>
          <li><strong>Highlight:</strong> Hover over component to highlight in UI</li>
          <li><strong>Edit props:</strong> Double-click prop values to edit them live</li>
          <li><strong>Filter:</strong> Show only components matching a pattern</li>
          <li><strong>Source:</strong> Click "view source" to jump to component code</li>
        </ul>
      </div>
    </div>
  );
}

export default Lab4PropDrilling;
