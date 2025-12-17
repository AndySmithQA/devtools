# Instructor Guide - Edge DevTools Debugging Course

## 🎯 Course Philosophy

This course uses **intentional bugs** to teach debugging skills. Students learn by:
1. Encountering realistic problems
2. Using DevTools to investigate
3. Forming hypotheses
4. Verifying with evidence
5. Applying fixes

## 📋 Pre-Course Checklist

### 1 Week Before
- [ ] Send setup instructions to participants
- [ ] Verify Microsoft Edge is installed
- [ ] Test React DevTools extension installation
- [ ] Confirm all participants have Node.js installed

### 1 Day Before
- [ ] Test all labs on fresh install
- [ ] Verify API server runs correctly
- [ ] Prepare backup USB drives with code
- [ ] Test projector/screen sharing

### Morning Of
- [ ] Start both servers (React + API)
- [ ] Open Edge DevTools on presentation screen
- [ ] Have React DevTools visible
- [ ] Open VS Code with project

## 📖 Module-by-Module Guide

### Module 1: Introduction (30 minutes)

**Key Points:**
- Debugging is a systematic process, not guessing
- DevTools are powerful when you know what to look for
- Console, Network, Sources, and React tabs each serve specific purposes

**Live Demo:**
- Open Edge DevTools (F12)
- Tour each panel briefly
- Show React DevTools extension
- Demonstrate basic navigation

**Tips:**
- Keep it high-level
- Don't dive deep yet
- Build confidence

---

### Module 2: Console Debugging (75 minutes)

#### Lab 1: Console Logging (20 min)

**Learning Objectives:**
- Use console.table() for arrays of objects
- Use console.group() for organization
- Understand when to use .log vs .warn vs .error

**Demo Flow:**
1. Show current console output (messy)
2. Introduce console.table() for products array
3. Show console.group() for organizing related logs
4. Demonstrate filtering console messages

**Common Student Issues:**
- Forgetting to open Console tab
- Not seeing console.table() output
- Unclear what "structured logging" means

**Solution Walkthrough:**
```javascript
// Before
console.log('Filtering products...');
console.log(filter);
console.log(result);

// After
console.group('🔍 Product Filtering');
console.log('Filter type:', filter);
console.table(result);
console.log('Result count:', result.length);
console.groupEnd();
```

#### Lab 2: Error Messages (20 min)

**Learning Objectives:**
- Read error type (TypeError, ReferenceError, etc.)
- Navigate stack traces
- Click links to jump to error location

**Demo Flow:**
1. Trigger each error scenario
2. Point out error type in red
3. Show stack trace
4. Click file link to jump to code
5. Explain call stack

**Common Student Issues:**
- Not reading full error message
- Ignoring stack trace
- Not clicking through to source

**Key Teaching Point:**
> "The error message tells you WHAT, the stack trace tells you WHERE"

#### Lab 3: Async Debugging (20 min)

**Learning Objectives:**
- Understand async execution flow
- Debug promises and async/await
- Handle async errors properly

**Demo Flow:**
1. Show promise that rejects
2. Demonstrate unhandled rejection in console
3. Set breakpoint in async function
4. Step through with debugger

**Common Student Issues:**
- Not understanding async timing
- Missing .catch() or try/catch
- Confused by promise states

**Solution Highlights:**
```javascript
// Wrong
const response = await fetchData();
setData(response.data); // Crashes if error

// Right
try {
  const response = await fetchData();
  setData(response.data);
} catch (error) {
  console.error('Failed:', error);
  setError(error.message);
}
```

#### Lab 4: Breakpoints (15 min)

**Learning Objectives:**
- Set breakpoints in Sources panel
- Step Over (F10) vs Step Into (F11) vs Step Out (Shift+F11)
- Watch variables in Scope panel

**Demo Flow:**
1. Open Sources panel
2. Find the component file
3. Set breakpoint on first line of function
4. Click button to trigger
5. Show Scope panel with variables
6. Demonstrate Step Over vs Step Into

**Keyboard Shortcuts to Emphasize:**
- F10: Step Over
- F11: Step Into
- Shift+F11: Step Out
- F8: Resume

**Common Student Issues:**
- Can't find the right file
- Confused about which step command to use
- Not watching the Scope panel

---

### Module 3: Network Debugging (90 minutes)

**Start Module:** Ensure `npm run server` is running!

#### Lab 1: HTTP Status Codes (25 min)

**Learning Objectives:**
- Understand 2xx (success), 4xx (client error), 5xx (server error)
- Use Network panel to inspect requests
- Read request/response headers and body

**Demo Flow:**
1. Open Network panel
2. Clear previous requests
3. Click a button to make request
4. Point out: Status, Method, Type, Size, Time
5. Click request → show Headers, Preview, Response tabs
6. Explain status code meanings

**Status Codes to Cover:**
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Server Error

**Common Student Issues:**
- Network panel empty (forgot to open first)
- Not clicking on requests to see details
- Confusing 401 and 403

#### Lab 2: CORS Issues (20 min)

**Learning Objectives:**
- Recognize CORS errors
- Distinguish CORS from other network failures
- Understand preflight requests

**Demo Flow:**
1. Trigger CORS error
2. Show error in Console (red)
3. Show failed request in Network (often status 0)
4. Explain CORS headers
5. Show preflight OPTIONS request

**Key Teaching Point:**
> "CORS errors happen in the browser, not the server. The server responded, but the browser blocked it."

**Common Student Issues:**
- Thinking CORS is a server error
- Not seeing the OPTIONS preflight request
- Trying to "fix" CORS in frontend code

#### Lab 3: Authentication (25 min)

**Learning Objectives:**
- Difference between 401 (not authenticated) and 403 (not authorized)
- Inspect Authorization header
- Debug token issues

**Demo Flow:**
1. Login to get token
2. Make authenticated request
3. Show Authorization header in Network tab
4. Try request without token → 401
5. Try admin endpoint as user → 403

**Test Accounts:**
```
User: username: "user", password: "password"
Admin: username: "admin", password: "admin123"
```

**Common Student Issues:**
- Not checking if Authorization header is present
- Confusing authentication vs authorization
- Not seeing that token format is wrong

#### Lab 4: Payload Debugging (20 min)

**Learning Objectives:**
- Inspect request payload
- Identify data type mismatches
- Compare sent vs expected data

**Demo Flow:**
1. Send invalid payload
2. Network panel → Payload tab
3. Show what was sent
4. Response tab → show error message
5. Identify the mismatch

**Common Payload Bugs:**
- Numbers sent as strings
- Missing required fields
- Wrong data structure (nested vs flat)
- Date format issues

---

### Module 4: React DevTools (75 minutes)

#### Lab 1: State Not Updating (20 min)

**Learning Objectives:**
- Never mutate state directly
- Use functional updates when needed
- Understand setState is async

**Demo Flow:**
1. Open React DevTools → Components tab
2. Find component in tree
3. Show hooks section
4. Click buggy button → state doesn't change in DevTools!
5. Click correct button → state updates

**Key Teaching Point:**
> "If you mutate state, React doesn't know to re-render. Always create new objects/arrays."

**Common Student Issues:**
- Still trying to mutate arrays with push/splice
- Not using spread operator
- Forgetting functional updates for closures

#### Lab 2: Unnecessary Re-renders (20 min)

**Learning Objectives:**
- Use Profiler to identify re-renders
- Understand why components re-render
- Apply React.memo when appropriate

**Demo Flow:**
1. Open React DevTools → Profiler tab
2. Click Record
3. Type in input field
4. Stop recording
5. Show flame graph
6. Explain colored vs gray components

**Profiler Features to Show:**
- Flame graph view
- Ranked view
- Component timing
- Why did this render?

**Common Student Issues:**
- Not recording before interacting
- Not understanding the flame graph
- Over-optimizing with memo

#### Lab 3: Hook Dependencies (20 min)

**Learning Objectives:**
- Include all dependencies in useEffect
- Use functional updates to reduce dependencies
- Understand empty array vs no array

**Demo Flow:**
1. Show effect with missing dependency
2. Change the value
3. Effect doesn't run!
4. Add dependency → now it runs
5. Show console logs for effect execution

**Dependency Rules:**
- Empty array []: Run once on mount
- No array: Run after every render
- [dep1, dep2]: Run when dependencies change

**Common Student Issues:**
- Omitting dependencies to prevent re-runs
- Including objects/arrays that change every render
- Not using useCallback for functions

#### Lab 4: Prop Drilling (15 min)

**Learning Objectives:**
- Navigate component tree
- Inspect props at each level
- Identify prop drilling patterns

**Demo Flow:**
1. Components tab in React DevTools
2. Expand component tree
3. Click each level
4. Show props being passed down
5. Highlight components that just pass props through

**What to Look For:**
- Same prop in multiple levels
- Components receiving props they don't use
- Deep nesting (4+ levels)

---

### Module 5: End-to-End Scenarios (90 minutes)

**These are complex scenarios - give more time!**

#### Scenario 1: Data Not Showing (30 min)

**Bug Summary:**
- API succeeds (200 OK)
- But data doesn't display
- Multiple compounding issues

**Investigation Steps:**
1. Network tab → API succeeds
2. Check response structure
3. Console → see console.logs
4. React DevTools → check products state
5. Notice state is object, not array
6. Find wrong data path in code

**Teaching Approach:**
- Let students investigate 5-10 minutes
- Ask: "What do you see in Network tab?"
- Ask: "What does the response look like?"
- Ask: "What's in the state?"
- Guide them to find data path issue

#### Scenario 2: Loading Never Ends (30 min)

**Bug Summary:**
- Submit fails
- Loading spinner never goes away
- UI stuck

**Investigation Steps:**
1. Try submitting invalid data
2. Notice loading spinner stays
3. React DevTools → loading is still true
4. Console → see error logged
5. Code review → setLoading(false) missing in catch

**Teaching Approach:**
- Demonstrate the stuck state
- Ask: "What should happen when an error occurs?"
- Show finally block as solution
- Discuss importance of resetting state in all paths

#### Scenario 3: Silent Failures (30 min)

**Bug Summary:**
- API calls fail (404)
- But UI updates anyway
- No error shown to user

**Investigation Steps:**
1. Add a todo
2. Network tab → 404 error!
3. But todo appears in UI
4. Console → error logged but user sees nothing
5. Discuss optimistic updates

**Teaching Approach:**
- Emphasize user experience
- Show how silent failures lose user trust
- Discuss when optimistic updates are appropriate
- Cover rollback strategies

---

## 🎤 Teaching Tips

### Opening Each Lab

**Formula:**
1. Show the bug first
2. Ask: "What's wrong?"
3. Ask: "How would you investigate?"
4. Guide them to the right tool
5. Let them explore
6. Show the solution

### During Labs

**Do:**
- Walk around and observe
- Answer questions with questions
- Point them to the right DevTools tab
- Praise good debugging approaches

**Don't:**
- Give away answers immediately
- Do the work for them
- Skip past "obvious" bugs
- Assume they remember everything

### Common Questions

**Q: "Why would anyone write bugs like this?"**
A: "These exact bugs happen in real projects! We're just isolating them for practice."

**Q: "Can we fix the code?"**
A: "Absolutely! Feel free to fix bugs and test your solutions."

**Q: "The API server stopped working"**
A: "Check the terminal - you might need to restart `npm run server`"

### Time Management

**If Running Behind:**
- Skip Lab 2.1 or 4.4
- Do Scenario 3 as instructor demo only
- Combine similar labs

**If Ahead of Schedule:**
- Add pair debugging exercises
- Have students present their findings
- Cover additional DevTools features
- Discuss real debugging war stories

## 🔧 Technical Troubleshooting

### Students Can't Access Localhost

**Solution:**
```bash
# Check if servers are running
npm run dev    # Should show port 3000
npm run server # Should show port 3001

# If ports are taken
lsof -ti:3000 | xargs kill  # Mac/Linux
# Or change port in vite.config.ts
```

### React DevTools Not Working

**Solutions:**
1. Verify extension is installed
2. Refresh the page
3. Check React is in development mode
4. Restart browser

### CORS Errors

**If mock server has CORS issues:**
Edit `server/index.js`:
```javascript
app.use(cors({
  origin: '*', // Allow all origins for dev
  credentials: true
}));
```

## 📊 Assessment

### Informal Checks

Throughout the day, ask:
- "What tool would you use to check this?"
- "Where would you look first?"
- "What does this error mean?"

### Final Exercise

Give them a new bug scenario and have them:
1. Identify the problem
2. Explain their debugging process
3. Propose a fix

## 🎁 Takeaways

Provide students with:
- Link to this repository
- DevTools cheat sheet
- HTTP status code reference
- Debugging workflow checklist

## 📝 Post-Course Follow-Up

Suggested homework:
- Fix all bugs in the app
- Add 2 new lab scenarios
- Practice with their own projects
- Install React DevTools on their work machine

---

## Quick Reference

### Essential Keyboard Shortcuts

**DevTools:**
- F12: Open/close DevTools
- Ctrl+Shift+C: Inspect element
- Ctrl+Shift+P: Command menu

**Debugging:**
- F8: Resume
- F10: Step over
- F11: Step into
- Shift+F11: Step out
- Ctrl+Shift+E: Run command

### When Students Are Stuck

1. "What tool would help here?"
2. "What does the Network/Console/DevTools show?"
3. "Let's check together..."
4. Never let them struggle more than 5 minutes

### Emergency Fixes

If something breaks:
```bash
# Reset everything
rm -rf node_modules package-lock.json
npm install
npm run dev  # New terminal
npm run server  # New terminal
```

Good luck! 🚀
