# Edge DevTools Debugging Cheat Sheet

## 🔧 Opening DevTools

| Action | Shortcut |
|--------|----------|
| Open/Close DevTools | `F12` or `Ctrl+Shift+I` |
| Inspect Element | `Ctrl+Shift+C` |
| Command Menu | `Ctrl+Shift+P` |
| Hard Refresh | `Ctrl+Shift+R` |

## 📊 DevTools Panels

### Console Panel
**Use for:** Logging, errors, JavaScript execution

**Commands:**
```javascript
console.log(data)           // General logging
console.error(error)        // Error logging (red)
console.warn(warning)       // Warning (yellow)
console.table(array)        // Display array as table
console.group('Title')      // Start grouped logs
console.groupEnd()          // End grouped logs
console.clear()             // Clear console
```

**Tips:**
- Filter by type (Info, Warnings, Errors)
- Use `$0` to reference selected element
- Right-click → "Preserve log" to keep logs across page loads

### Network Panel
**Use for:** API calls, HTTP requests, loading resources

**What to Check:**
- Status code (200 = OK, 4xx = client error, 5xx = server error)
- Request method (GET, POST, PUT, DELETE)
- Response time
- Request/Response headers
- Payload (sent data)
- Response body

**Workflow:**
1. Open Network panel BEFORE triggering action
2. Click request to see details
3. Check Headers, Payload, Preview, Response tabs

**Common Issues:**
- Status 0 or "CORS error" = CORS issue
- Status 401 = Authentication required
- Status 403 = Insufficient permissions
- Status 404 = Resource not found
- Status 500 = Server error

### Sources Panel
**Use for:** Breakpoints, debugging JavaScript execution

**Debugger Actions:**
| Action | Shortcut | What it Does |
|--------|----------|--------------|
| Resume | `F8` | Continue execution |
| Step Over | `F10` | Execute current line |
| Step Into | `F11` | Go into function call |
| Step Out | `Shift+F11` | Exit current function |

**Setting Breakpoints:**
1. Find your file in Sources panel
2. Click line number to set breakpoint
3. Trigger the code
4. Use stepping commands to walk through

**Watch Panel:** Add variables to watch their values

**Scope Panel:** See all variables in current scope

### Elements Panel
**Use for:** HTML structure, CSS styling

**Tips:**
- Click element to inspect
- Edit HTML/CSS live
- See applied styles
- Debug layout issues

### Application Panel
**Use for:** Storage, cookies, service workers

**Check:**
- Local Storage
- Session Storage
- Cookies
- Cache

## ⚛️ React Developer Tools

### Components Tab
**Use for:** Inspecting React component tree

**Features:**
- Navigate component hierarchy
- View props for each component
- View state and hooks
- Edit props/state live
- Search for components
- Highlight component on hover

**Workflow:**
1. Open React DevTools
2. Find component in tree
3. Right panel shows:
   - Props
   - Hooks (state, effects, etc.)
   - Rendered by (parent)
   - Source location

**Tips:**
- Click component to see props
- Double-click values to edit
- Use search box to find components

### Profiler Tab
**Use for:** Performance optimization

**Workflow:**
1. Click Record (blue circle)
2. Interact with your app
3. Click Stop
4. View flame graph showing renders

**What to Look For:**
- Which components rendered
- How long each took
- Why each rendered
- Unnecessary re-renders (yellow/red)

**Settings:**
- Enable "Highlight updates when components render"
- Components flash when they re-render

## 🐛 Common Bug Types & How to Debug

### Bug: UI Not Updating

**Check:**
1. React DevTools → Is state actually changing?
2. Are you mutating state directly? (Don't!)
3. Console → Any errors?

**Solution:** Always create new objects/arrays
```javascript
// ❌ Wrong
state.push(item);
setState(state);

// ✅ Right
setState([...state, item]);
```

### Bug: API Call Failing

**Check:**
1. Network panel → Status code?
2. Response tab → Error message?
3. Headers → Authorization header present?
4. Payload → Correct data format?

**Questions:**
- Is the endpoint correct?
- Are you sending the right data type?
- Is auth token included?
- Is CORS configured?

### Bug: Async Code Not Working

**Check:**
1. Console → Unhandled promise rejection?
2. Set breakpoint in .catch() or catch block
3. Is error being caught?
4. Is loading state being reset?

**Solution:** Always handle errors
```javascript
try {
  await apiCall();
} catch (error) {
  console.error(error);
  setError(error.message);
} finally {
  setLoading(false); // Always!
}
```

### Bug: Component Re-rendering Too Much

**Check:**
1. React DevTools Profiler → Record interactions
2. Which components render?
3. Are props changing? (Objects/arrays recreated?)
4. Console → Add logs to track renders

**Solutions:**
- Use `React.memo()` for components
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for functions
- Move static data outside component

### Bug: Effect Running Too Often/Not At All

**Check:**
1. Console → Log when effect runs
2. Dependencies correct?
3. Missing dependencies?
4. Objects/functions in dependencies?

**Rules:**
- `[]` = run once on mount
- `[dep]` = run when dep changes
- No array = run after every render
- Include ALL values used from component scope

## 📋 HTTP Status Codes Reference

### 2xx Success
| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 204 | No Content - Success but no response body |

### 4xx Client Errors
| Code | Meaning | Common Cause |
|------|---------|--------------|
| 400 | Bad Request | Invalid data, wrong format |
| 401 | Unauthorized | Missing/invalid auth token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Wrong URL or resource deleted |
| 422 | Unprocessable Entity | Validation failed |

### 5xx Server Errors
| Code | Meaning |
|------|---------|
| 500 | Internal Server Error - Something wrong on server |
| 502 | Bad Gateway - Server got invalid response |
| 503 | Service Unavailable - Server is down |

## 🔄 Systematic Debugging Workflow

### Step 1: Reproduce
- Can you make it happen consistently?
- What are the exact steps?

### Step 2: Observe
- **Console:** Any errors?
- **Network:** Any failed requests?
- **React DevTools:** State/props correct?
- **UI:** What's actually displayed?

### Step 3: Isolate
- Is it UI, logic, or network?
- Which component/function is involved?
- What's the minimal reproduction?

### Step 4: Hypothesize
- Form a theory about the cause
- What evidence supports it?

### Step 5: Verify
- Set breakpoints
- Add logging
- Test your hypothesis

### Step 6: Fix
- Apply the solution
- Understand WHY it works

### Step 7: Validate
- Test the fix thoroughly
- Check for side effects
- Verify nothing else broke

## 💡 Quick Debugging Tips

1. **Check Console First** - Many bugs show errors there
2. **Network Panel Before Action** - Open it before triggering requests
3. **Read Full Error Messages** - Don't skip the details
4. **Follow Stack Traces** - Click links to jump to code
5. **Use Breakpoints** - Don't just guess, see it happen
6. **React DevTools for State** - See what React sees
7. **Preserve Logs** - Right-click console → Preserve log
8. **Disable Cache** - Network panel → Disable cache checkbox
9. **Hard Refresh** - Ctrl+Shift+R to bypass cache
10. **Simplify** - Remove code until bug disappears, then add back

## 🚫 Common Mistakes

### ❌ Don't:
- Guess without checking DevTools
- Ignore error messages
- Mutate state directly
- Forget to handle errors
- Skip the Network panel
- Forget about async timing

### ✅ Do:
- Open DevTools before starting
- Read error messages completely
- Check Network tab for API calls
- Use breakpoints for complex logic
- Log strategically, not everywhere
- Handle all error cases
- Reset loading states

## 🎯 Practice Exercises

Try debugging these scenarios:
1. Button click does nothing → Check Console, React DevTools
2. API call fails → Check Network panel, status code
3. Data shows wrong values → Check Network response vs state
4. Page won't load → Check Console for errors
5. Loading spinner stuck → Check Network, error handling

## 📚 Additional Resources

- [Edge DevTools Documentation](https://docs.microsoft.com/microsoft-edge/devtools-guide-chromium/)
- [React DevTools Guide](https://react.dev/learn/react-developer-tools)
- [HTTP Status Codes](https://httpstatuses.com/)
- [JavaScript Error Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)

---

**Remember:** Debugging is a skill that improves with practice. The more you use DevTools, the faster you'll find bugs!
