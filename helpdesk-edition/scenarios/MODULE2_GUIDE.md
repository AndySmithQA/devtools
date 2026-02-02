# Module 2: Console & JavaScript Debugging - Scenario Guide

## Scenario Overview
The application has JavaScript issues that can only be found through the Console and breakpoints. Your goal is to use browser DevTools to identify and understand the bugs.

---

## Lab 1: Console Logging
**Difficulty**: ⭐ Beginner

### What to Look For
The Console tab shows messy and unhelpful logging. Look for:
- Unclear console messages
- Missing context information
- Unstructured data output
- Repeated logging without labels

### Debugging Techniques
1. Open **Console tab** (F12 → Console)
2. Trigger actions in the application
3. Look at the console messages
4. Notice how some logs are hard to interpret
5. Check for `console.log()`, `console.error()`, `console.table()` calls

### What You'll Discover
- Application logs product data but formatting is poor
- Messages don't clearly indicate what's happening
- Some data is logged but not labeled properly
- Console output is hard to follow

### Tools to Use
- **Console Tab** - Read console output
- **Console API** - Type `console.table([...])` to format arrays

---

## Lab 2: Error Messages
**Difficulty**: ⭐⭐ Intermediate

### What to Look For
The application throws errors. Look for:
- Error messages in Console
- Stack traces
- Uncaught exceptions
- Async promise rejections

### Debugging Techniques
1. Open **Console tab**
2. Look for red error messages
3. Click on error to expand full stack trace
4. Read the error message carefully
5. Identify the file and line number (in minified code, these are cryptic)
6. Click on the error to see related code

### What You'll Discover
- Multiple types of errors occur
- Some errors show helpful stack traces
- Some errors are cryptic (minified code)
- Errors reveal what's broken in the application

### Tools to Use
- **Console** - View error stack traces
- **Click on errors** - See where they originated
- **Preserve Logs** - Keep logs even after page reload (⚙️ → Preserve log)

---

## Lab 3: Async Debugging
**Difficulty**: ⭐⭐ Intermediate

### What to Look For
The application uses async operations. Look for:
- Promise rejections
- Await expressions waiting for data
- Timeout issues
- Async error handling

### Debugging Techniques
1. Open **Console tab**
2. Trigger async operations in the app
3. Look for promise rejection errors
4. Check timing - operations should complete
5. Look for "rejected promise" warnings
6. Check Network tab to see if requests complete

### What You'll Discover
- Some async operations fail silently
- Promise rejections appear in Console
- Some awaits timeout or hang
- Network requests may fail

### Tools to Use
- **Console** - See promise rejections
- **Network tab** - Check if API calls complete
- **Debugger pausing on exceptions** - F12 → Sources → ⚙️ → Pause on exceptions

---

## Lab 4: Breakpoint Practice
**Difficulty**: ⭐⭐ Intermediate

### What to Look For
Set breakpoints and step through execution. Look for:
- Code execution flow
- Variable values at breakpoints
- Function calls and returns
- State changes during execution

### Debugging Techniques
1. Open **Console tab**
2. Trigger an action that runs JavaScript
3. When console shows activity:
   - **F8 or Continue** - Resume execution
   - **F10 or Step Over** - Execute current line
   - **F11 or Step Into** - Enter function calls
   - **Shift+F11 or Step Out** - Exit current function
4. Watch variables in Scope panel
5. Evaluate expressions in Console while paused

### What You'll Discover
- Code execution order is different than expected
- Variables have unexpected values
- Function calls happen in wrong sequence
- State doesn't update properly

### Tools to Use
- **Sources/Debugger Tab** - Set breakpoints
- **Step controls** - F10 (over), F11 (into), Shift+F11 (out)
- **Scope/Variables** - View current variable values
- **Console (while paused)** - Evaluate expressions

---

## Key Console Commands to Try

```javascript
// While paused at breakpoint, try these in Console:

// View all properties of an object
console.log(variableName)

// See detailed object structure
console.dir(variableName)

// Create formatted table of array data
console.table(arrayVariable)

// Group related messages
console.group("label")
console.log("item 1")
console.log("item 2")
console.groupEnd()

// Conditional logging
console.assert(condition, "message if false")
```

---

## Troubleshooting Tips

### "I don't see any console output"
- Make sure you're in the **Console tab** (not Elements, Network, etc.)
- Check if Filters are hiding messages (look for filter icon)
- Refresh the page and trigger the action again
- Check if messages are being logged to a different console (look at top of console)

### "I can't set a breakpoint"
- You can only set breakpoints on lines with actual code
- The code is minified, so line numbers may not be obvious
- Try clicking on different lines to find executable code
- Breakpoints won't trigger if that code doesn't run

### "Step controls don't work"
- Make sure code is paused (should see "Paused" indicator)
- Step commands only work while paused
- Make sure you're using the right step button:
  - **Step Over** - Skips function calls
  - **Step Into** - Enters functions
  - **Step Out** - Exits current function

### "I can't see variable values"
- Check the Scope panel on the right side
- Variables only appear when code is paused
- Minified variable names may be cryptic (x, y, a, b, etc.)
- Use Console to print values while paused

