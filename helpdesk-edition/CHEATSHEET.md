# DevTools Cheat Sheet - Quick Reference

## Opening DevTools

| Browser | Shortcut |
|---------|----------|
| Edge/Chrome | F12 or Ctrl+Shift+I |
| Firefox | F12 or Ctrl+Shift+I |
| Safari | Cmd+Option+I |

**Right-click on element → Inspect** - Open DevTools and select element

---

## Console Tab

### Reading Errors
```
❌ Red text = Error
⚠️ Yellow text = Warning
ℹ️ Blue "i" = Info
```

### Common Error Messages
| Error | Meaning | Check |
|-------|---------|-------|
| Cannot read property 'x' of undefined | Using property on null/undefined | Use optional chaining `?.` |
| Syntax Error | Code has typo or bad format | Look at line number in error |
| CORS policy error | API from different domain | Check CORS headers in Network |
| ReferenceError: x is not defined | Variable doesn't exist | Check variable scope |
| TypeError: x is not a function | Calling non-function as function | Verify type in console |

### Useful Console Commands
```javascript
// View object properties
console.log(obj)

// Format array as table
console.table(arrayOfObjects)

// Group related messages
console.group("Label")
console.log("Message 1")
console.log("Message 2")
console.groupEnd()

// Conditional logging
console.assert(condition, "Message if false")

// Timing
console.time("myTimer")
// ... code ...
console.timeEnd("myTimer")

// View all properties of an element
console.dir(element)

// View calculated styles of element
console.log(getComputedStyle(element))
```

### Evaluating Expressions (while paused)
```javascript
// Type directly in console while paused:
myVariable                    // See value
myFunction()                  // Call function
someObj.property              // Access property
Array.isArray(x)              // Test type
JSON.stringify(obj, null, 2)  // Pretty print JSON
document.querySelector("button")  // Find elements
```

---

## Network Tab

### Understanding Status Codes

| Code | Meaning | Color | Action |
|------|---------|-------|--------|
| 200 | OK - Success | 🟢 Green | Data received |
| 201 | Created | 🟢 Green | Resource created |
| 204 | No Content | 🟢 Green | Success, no data |
| 300 | Redirect | 🟡 Orange | Followed redirect |
| 304 | Not Modified | 🟡 Orange | Cached, not changed |
| 400 | Bad Request | 🔴 Red | Wrong data sent |
| 401 | Unauthorized | 🔴 Red | Need token/login |
| 403 | Forbidden | 🔴 Red | No permission |
| 404 | Not Found | 🔴 Red | URL doesn't exist |
| 500 | Server Error | 🔴 Red | Server crashed |
| 503 | Service Unavailable | 🔴 Red | Server down |
| Pending | Still loading | ⚪ Gray | Wait for response |

### Reading Network Requests

1. **General Tab**
   - URL - What was requested
   - Method - GET, POST, PUT, DELETE
   - Status Code - Success or failure
   - Request Headers - What was sent
   - Response Headers - Server's response metadata

2. **Request Tab**
   - See exact data sent to server
   - For GET - see URL parameters
   - For POST - see body data (JSON)

3. **Response Tab**
   - See server's response
   - For JSON - see the data returned
   - For errors - see error message

4. **Preview Tab**
   - Formatted view of response
   - Pretty-printed JSON

### Network Tab Filters

| Button | Shows |
|--------|-------|
| All | Everything |
| XHR | API calls only |
| Fetch | Fetch API calls |
| Img | Image files |
| Media | Videos/audio |
| Font | Font files |
| Doc | Document files |

### Common Network Issues

| Problem | Check |
|---------|-------|
| CORS Error | Response Headers - need `Access-Control-Allow-Origin` |
| 401 Error | Request Headers - check `Authorization: Bearer token` |
| 403 Error | Request Headers - token valid? User has permission? |
| 404 Error | Request URL - is endpoint correct? |
| Timeout | Time column - is request taking >30s? |
| Empty response | Response tab - is data actually there? |
| Wrong data | Response body - is it what you expected? |

---

## Elements/Inspector Tab

### Inspecting HTML

| Action | How |
|--------|-----|
| Find element | Click **Select** (mouse icon) then click element |
| Edit HTML | Right-click element → Edit as HTML |
| Change styles | Click **Styles** panel on right |
| Add class | Right-click element → :hov (for hover state) |
| View computed styles | Scroll in Styles panel |

### Debugging Layout Issues

1. Click **Select** button (mouse icon)
2. Click on element
3. Look at **Box Model** in Styles panel
4. Check margins, padding, borders, size
5. Look for `display: none` or `visibility: hidden`
6. Check z-index for overlapping elements

### Finding Elements in DOM
```javascript
// In Console while inspecting:
document.querySelector(".className")           // Find by class
document.getElementById("idName")              // Find by ID
document.querySelectorAll("p")                 // Find all paragraphs
$(".className")                                // jQuery-style
element.style.display                          // Check display
element.offsetHeight                           // Check height
```

---

## Debugger/Sources Tab

### Setting Breakpoints

| Action | How |
|--------|-----|
| Break on line | Click line number |
| Conditional break | Right-click line → Add conditional breakpoint |
| Break on exception | ⚙️ (Pause on exceptions icon) |
| Break on DOM change | Right-click element → Break on → subtree modification |
| Break on event | Right-click event in code → Break on |

### Stepping Through Code

| Button | Keyboard | What it does |
|--------|----------|-------------|
| Continue | F8 | Resume execution |
| Step Over | F10 | Execute current line, don't enter functions |
| Step Into | F11 | Enter function calls |
| Step Out | Shift+F11 | Exit current function |

### While Paused

| Feature | Location |
|---------|----------|
| Current code | Center pane - highlighted line |
| Local variables | Right panel under Scope |
| Global variables | Scope panel → Global |
| Watch expressions | Right panel - type expressions |
| Call stack | Shows function call chain |

### Useful Breakpoint Commands
```javascript
// In console while paused:
variableName          // See value
functionName()        // Call function
typeof variableName   // Check type
Object.keys(obj)      // List object properties
```

---

## React DevTools

### Installing Extension
1. Open Microsoft Edge
2. Go to extensions store
3. Search "React Developer Tools"
4. Install extension
5. Reload page

### Components Tab

| Task | How |
|------|-----|
| Find component | Click **Select** (mouse), then click element |
| View props | Click component → Props panel |
| View state | Click component → Hooks/State panel |
| Navigate tree | Click parent/child names |
| Search components | Use search box |

### Inspecting State and Props

1. Click component in tree
2. Right panel shows:
   - Props - data passed in
   - State - internal useState values
   - Hooks - useEffect, useCallback, etc.
3. Click arrows to expand/collapse values
4. Hover over values to see full content

### Profiler Tab (Performance)

| Action | How |
|--------|-----|
| Record renders | Click red **Record** button |
| Perform actions | Do things in app |
| Stop recording | Click **Record** again |
| View results | See Flame Graph or Ranked Chart |
| Click bar | See component render details |

### What to Look For in Profiler
- **Tall bars** = Slow components
- **Yellow/Red** = Performance issues
- **Render count** = How many times rendered
- **Commit** = When render happened

---

## React DevTools Settings

Click ⚙️ (Settings icon):
- ☑️ **Highlight updates when components render** - Flash on change
- ☑️ **Hide logs during second firingEffect** - Reduce noise
- ☑️ **Track which components caused a render** - Show parent

---

## Storage/Application Tab

### Debugging State Issues

| Store | Location | Use Case |
|-------|----------|----------|
| localStorage | Application → Local Storage | Persistent data |
| sessionStorage | Application → Session Storage | Per-tab data |
| Cookies | Application → Cookies | Auth tokens |
| Cache | Application → Cache | Offline data |

### Common Checks
```javascript
// In Console:
localStorage.getItem("myKey")           // Get value
localStorage.setItem("myKey", "value")  // Set value
localStorage.removeItem("myKey")        // Delete
localStorage.clear()                    // Clear all
JSON.parse(localStorage.getItem("key")) // Get as JSON
```

---

## Common Debugging Workflows

### Workflow 1: API Call Failing
1. Open **Network tab**
2. Perform action that calls API
3. Find request in list
4. Check Status Code
5. Click → View **Response** tab
6. Read error message from server

### Workflow 2: Data Not Showing
1. Check **Network tab** - Did API succeed? (200)
2. Check **React DevTools** - Is data in state?
3. Check **Elements tab** - Is HTML being rendered?
4. Use **Console** - Print values to verify

### Workflow 3: Performance Problem
1. Open **React DevTools → Profiler**
2. Click **Record**
3. Perform action
4. Click **Record** to stop
5. Look at **Flame Graph** for slow components

### Workflow 4: JavaScript Error
1. Check **Console** - See error message
2. Click error → View **Source/Debugger**
3. Set breakpoint near error
4. Use **Step** controls to find issue

### Workflow 5: Missing Data in Request
1. Open **Network tab**
2. Find POST/PUT request
3. Click → View **Request** tab
4. Check what data was sent
5. Compare with what should be sent

---

## Tips & Tricks

### Console Tricks
```javascript
// Copy to clipboard
copy(obj)           // Copy JSON to clipboard
copy(JSON.stringify(obj, null, 2))  // Pretty-print copy

// Multiple console instances
// Dock DevTools to side (more comfortable)
// Console is accessible from any tab

// Keep errors visible
// ⚙️ Settings → Keep open after navigation
```

### Network Tab Tricks
```
// Right-click request → Copy as cURL
// Paste in terminal to replay exact request

// Preserve logs - ⚙️ → Preserve log
// So errors don't disappear on navigation

// Replay request - Right-click → Replay XHR
// To test API without clicking buttons again
```

### Breakpoint Tricks
```javascript
// Log without pausing - Right-click line → Add logpoint
// Logs to console when line executes

// Break only if condition true
// Right-click line → Add conditional breakpoint
// Enter: someVar > 10

// DOM breakpoints
// Right-click element → Break on → subtree/attribute change
// Pause when DOM changes
```

### React DevTools Tricks
```javascript
// Select element in React Tree
// Right-click in tree → "Show source location"
// Opens source code (if available)

// Inspect component props
// Click component → Props tab
// Expand and explore nested objects

// Watch re-renders
// ⚙️ Settings → Highlight updates when components render
// Components flash yellow when they re-render
```

---

## Quick Reference - When Things Go Wrong

| Symptom | First Check | Second Check |
|---------|-------------|--------------|
| Blank page | Network tab (API call succeeded?) | React DevTools (state has data?) |
| Wrong data | Network Response | React DevTools state |
| Error message | Console | Network response |
| Won't load | Network (requests pending?) | Console (errors?) |
| Performance slow | React DevTools Profiler | Network (slow requests?) |
| Page lag | React DevTools (too many renders?) | Network (requests blocking?) |

---

## Keyboard Shortcuts Cheat Sheet

```
F12 or Ctrl+Shift+I    Open DevTools
Ctrl+Shift+J           Console
Ctrl+Shift+E           Network
Ctrl+Shift+C           Element picker
F8                     Continue (resume)
F10                    Step Over
F11                    Step Into
Shift+F11              Step Out
Ctrl+L                 Clear console
Ctrl+\                 Pause execution
```

---

## Remember
- **Read error messages carefully** - They usually tell you what's wrong
- **Check all three tools** - Console, Network, DevTools
- **Step through code slowly** - F10 (step over) is safer than F11 (step into)
- **Use console while paused** - Evaluate variables when stopped at breakpoint
- **Network tab is honest** - It shows exactly what was sent/received
- **React DevTools shows truth** - State values are never lies

You're doing great! Keep learning! 🔧

