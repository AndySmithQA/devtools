# Module 4: React DevTools Debugging - Scenario Guide

## Scenario Overview
The application is built with React. Your goal is to use React DevTools to inspect components, track state changes, and identify UI bugs.

---

## Prerequisite: Install React DevTools

### Browser Extension Installation
1. Open Microsoft Edge (or Chrome/Firefox)
2. Go to the Extensions store:
   - Edge: `edge://extensions` → Open Edge Add-ons
   - Chrome: `chrome://extensions` → Open Chrome Web Store
3. Search for "React Developer Tools"
4. Install the extension
5. Reload the application tab

### Verify Installation
- Press F12 to open DevTools
- Look for a new **Components** tab (or **Profiler** tab)
- If tabs aren't visible, click `>>` to see more tabs

---

## Lab 1: State Not Updating
**Difficulty**: ⭐⭐ Intermediate

### What to Look For
State changes don't appear in the UI. Look for:
- Component renders but shows wrong data
- State value doesn't match displayed value
- UI doesn't update when it should
- Direct object mutations (should use setState)

### Debugging Techniques
1. Open **React DevTools → Components tab**
2. Inspect the component showing wrong data:
   - Click component in tree
   - Look at **Props** and **State** sections
3. Compare displayed value with actual state
4. Trigger the action that should update state
5. Watch if state changes in DevTools
6. Check if UI updates
7. If state changes but UI doesn't:
   - Check if it's truly a new object
   - Look for direct mutations (object.property = value)

### State Updating Issues
```javascript
// ❌ WRONG - Direct mutation (won't trigger re-render)
state.name = "New Name"

// ✅ RIGHT - Create new object (triggers re-render)
setState({ ...state, name: "New Name" })
```

### What You'll Discover
- State has a value but UI shows different value
- State doesn't change after action
- State changes but UI doesn't update
- Objects are being mutated instead of replaced

### Tools to Use
- **React DevTools → Components** - Inspect component state
- **Props/State panels** - See current values
- **Hooks panel** - See useState values
- **Rendered by** - See which component is selected
- **Highlight updates** - Watch components re-render (⚙️ settings)

---

## Lab 2: Unnecessary Renders
**Difficulty**: ⭐⭐⭐ Advanced

### What to Look For
Components re-render too often. Look for:
- Component renders when props didn't change
- Performance is slow (many re-renders)
- Parent updates cause child re-renders
- Heavy operations run repeatedly

### Debugging Techniques
1. Open **React DevTools → Profiler tab**
2. Click **Record** button (blue circle)
3. Perform actions in the app
4. Click **Record** again to stop
5. Look at the **Flame Graph**:
   - Each bar = one component render
   - Taller = longer to render
   - Yellow = medium, red = slow
6. Click on component bars to see details
7. Check **Render Duration** and **Render Count**

### What You'll Discover
- Some components render 10+ times per action
- Renders that should be single are multiple
- Heavy computations run on every render
- Parent re-renders unnecessarily trigger children

### Optimization Techniques
```javascript
// Use memo to prevent re-renders
const MyComponent = React.memo(({ prop }) => { ... })

// Use useMemo for expensive operations
const value = useMemo(() => expensive(), [deps])

// Use useCallback for function stability
const handler = useCallback(() => { ... }, [deps])
```

### Tools to Use
- **React DevTools → Profiler** - Record and analyze renders
- **Flame Graph** - Visual render timeline
- **Ranked Chart** - See components by render time
- **Component Stats** - Render count per component
- **Why did you render** - Debug unnecessary renders
- **Highlight updates** - Watch re-renders happen (⚙️)

---

## Lab 3: Hook Dependencies
**Difficulty**: ⭐⭐⭐ Advanced

### What to Look For
useEffect and other hooks have dependency issues. Look for:
- useEffect runs too often (should run once)
- useEffect never runs (should run on mount)
- Infinite loops (effect triggers itself)
- Stale data (effect uses old values)

### Debugging Techniques
1. Open **React DevTools → Components tab**
2. Select component using hooks
3. Look at **Hooks** section on right side
4. Find "State" entries (useState) and "Effect" entries
5. Check the dependency array values:
   - Empty `[]` = runs once
   - Missing deps = runs every render
   - Changing deps = runs when they change
6. Watch console for warnings like:
   - "exhaustive-deps warning"
   - "missing dependency"
7. Trigger actions and watch if effect runs

### Common useEffect Issues
```javascript
// ❌ Runs on every render (missing deps)
useEffect(() => fetchData())

// ❌ Infinite loop (dependency changes itself)
useEffect(() => { setData(...) }, [data])

// ✅ Runs once on mount
useEffect(() => { ... }, [])

// ✅ Runs when dependency changes
useEffect(() => { ... }, [userId])
```

### What You'll Discover
- Effects run more often than expected
- Effects never run when they should
- Missing dependencies cause stale data
- Circular dependencies cause loops

### Tools to Use
- **React DevTools → Components** - View hooks
- **Hooks panel** - See useEffect dependencies
- **Console warnings** - ESLint exhaustive-deps
- **Console logs** - Add to effect to track when it runs
- **Network tab** - See how many API calls are made

---

## Lab 4: Prop Drilling
**Difficulty**: ⭐⭐ Intermediate

### What to Look For
Data is passed through many component levels. Look for:
- Props passed through components that don't use them
- Long prop chains (Parent → Child → GrandChild → ...)
- Difficult to trace data flow
- Props with the same name at multiple levels

### Debugging Techniques
1. Open **React DevTools → Components tab**
2. Click on a component in the tree
3. Look at **Props** section on right
4. See what props it receives
5. Click on parent in tree (⬆️ arrow or click parent in breadcrumb)
6. See what props parent receives
7. Trace the path from root to leaf
8. Look for props that are just passed through

### Component Tree Navigation
```
App (root)
├── Page (receives data)
│   └── Container (receives data - doesn't use it)
│       └── List (receives data - doesn't use it)
│           └── Item (receives data - uses it here!)
```

### What You'll Discover
- Data is passed through 3+ levels
- Middle components don't use the prop
- Difficult to find where data comes from
- Hard to refactor or change prop names

### Solutions to Look For
- Props should only pass through 1-2 levels
- Context API reduces prop drilling
- Some apps may use state management library
- Direct passing creates "props tunnels"

### Tools to Use
- **React DevTools → Components** - Navigate component tree
- **Props panel** - See all props at each level
- **Breadcrumb** - Quick navigation up the tree
- **Search** - Find components by name
- **Highlight updates** - Watch which components re-render

---

## React DevTools Navigation

### Finding Components
1. Click the **Select** button (mouse icon, top-left of Components tab)
2. Click on element in webpage
3. Component highlights in DevTools tree
4. Right-click component → "Show source location" → Opens code location

### Inspecting Props & State
1. Click component in tree
2. Right panel shows:
   - **Props** - Data passed to component
   - **State** - Internal state (useState values)
   - **Hooks** - useEffect, useMemo, etc.
3. Click on values to expand and inspect

### Profiler Features
1. Click **Profiler** tab
2. Click **Record** (blue circle)
3. Perform actions in app
4. Click **Record** again to stop
5. View results:
   - **Flame Graph** - Timeline of renders
   - **Ranked Chart** - Components by time
   - **Component Stats** - Counts per component
6. Click on bars for details

### Useful Settings
Click ⚙️ (Settings icon):
- ☑️ **Highlight updates** - Flash when components re-render
- ☑️ **Hide logs during second firingEffect** - Reduce console noise
- ☑️ **Disable logs** - Suppress React logs in console

---

## Performance Profiling

### Finding Slow Components
1. Open **Profiler tab**
2. Record user actions
3. Look at **Flame Graph**:
   - Taller bars = slower renders
   - Red = very slow (>1s)
   - Yellow = moderate
4. Click on slow bars for details
5. See:
   - Component name
   - Render duration
   - "Rendered by" chain
   - Props that changed

### Optimization Opportunities
Look for:
- Components rendering when nothing changed
- Heavy computation on every render
- Large lists re-rendering items
- State updates causing cascading renders

---

## Troubleshooting

### "I don't see React DevTools"
- Extension not installed - Install from store
- Tab not showing - Click `>>` to see more tabs
- Page not a React app - Will show "Create React App" message
- Reload page after installing extension

### "State shows but UI doesn't update"
- State might be mutated directly (not replaced)
- Component might not be dependent on that state
- UI might be rendering from props instead
- Check if re-render is actually happening (look for yellow flash)

### "Effect runs too often"
- Check dependency array - should be `[]` or list specific deps
- Console shows "exhaustive-deps warning"
- Add missing dependencies to array
- Or intentionally omit array to run every render

### "I can't find the component"
- Use Select button (mouse icon) to click on element
- Search for component name in Components tab
- Component might be wrapped in memo or Higher-Order Component
- Look in component tree breadcrumbs

