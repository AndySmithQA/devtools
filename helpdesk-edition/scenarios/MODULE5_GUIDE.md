# Module 5: End-to-End Scenarios - Debugging Guide

## Overview
These scenarios combine multiple debugging techniques from modules 2-4. Real-world bugs rarely involve just one tool or skill. You'll need to:
- Use Console for logs and errors
- Use Network tab for API issues
- Use React DevTools for state
- Trace issues across multiple layers

---

## Scenario 1: Data Not Showing
**Difficulty**: ⭐⭐⭐ Advanced  
**Estimated Time**: 30 minutes

### The Problem
The application is supposed to display data from an API, but the screen is blank. Everything looks like it's loading fine, but no data appears.

### Where to Start
1. **Check the Console** - Are there error messages?
2. **Check the Network tab** - Did the API call succeed?
3. **Check React DevTools** - What's the component state?
4. **Check the Page** - Is it rendering at all or is it blank?

### Debugging Steps

#### Step 1: Check for Visual Errors
- Open the application
- Look at the page - what do you see?
- Is there a loading message? Error message? Blank page?

#### Step 2: Check the Console
- Open DevTools → **Console tab**
- Look for errors (red messages)
- Look for warnings
- Look for any logs or messages
- **Question**: Are there any error messages?

#### Step 3: Check the Network Tab
- Open DevTools → **Network tab**
- Refresh the page or trigger data loading
- Look for API requests
- Find requests ending in `/api/...`
- Check their status codes
- **Questions**: 
  - Did the API request succeed (200) or fail (4xx, 5xx)?
  - What does the Response show?
  - Is the response data empty or has errors?

#### Step 4: Check React State
- Open DevTools → **Components tab**
- Find the main component displaying data
- Look at the **State** section
- Look for any data arrays or objects
- **Questions**:
  - Does state have the data (non-empty array)?
  - Is data the right format?
  - Is loading state set to false?

#### Step 5: Trace the Problem
Based on what you found:

**If API fails:**
- Check Network response for error message
- Look at status code (400, 401, 403, 404, 500)
- See what error server returned
- Common causes:
  - Missing authentication (401)
  - Wrong URL or parameters (404)
  - Server error (500)

**If API succeeds but state is empty:**
- Check if response was parsed correctly
- Look for JSON parsing errors in Console
- Check if data is stored in right place in state
- Verify API response structure matches code expectations

**If API succeeds, state has data, but UI blank:**
- Component might not be rendering at all
- Component might not be reading state correctly
- CSS might be hiding elements (check Elements tab)
- Check if component is even being displayed

### What You'll Discover
- Multiple bugs combined: API issue + state issue + render issue
- You need all three tools to find root cause
- Fixing one issue might reveal another
- Order matters: fix API first, then state, then rendering

### Expected Issues
Typically this scenario has bugs like:
- API returns 400 due to missing authentication
- Data structure doesn't match UI expectations
- Component reads from wrong state variable
- Array is empty due to bad data transformation

---

## Scenario 2: Loading Never Ends
**Difficulty**: ⭐⭐⭐ Advanced  
**Estimated Time**: 30 minutes

### The Problem
You trigger an action that shows "Loading..." and it never completes. The spinner keeps spinning forever, or the request seems stuck.

### Where to Start
1. **Check the Console** - Are there error messages that were missed?
2. **Check the Network tab** - Did the request complete?
3. **Check React DevTools** - Is loading state stuck on true?
4. **Check timing** - How long has it been loading?

### Debugging Steps

#### Step 1: Identify the Stuck Action
- Open the application
- Find what action shows "Loading..."
- Click it or trigger it
- Watch the page - does it load?
- **Question**: How long does it stay in loading state?

#### Step 2: Check the Console
- Open DevTools → **Console tab**
- Look for error messages
- Look for promise rejection errors
- Look for "Uncaught" errors
- **Important**: Errors might be after loading started
- **Question**: Do you see error messages related to loading?

#### Step 3: Check the Network Tab
- Open DevTools → **Network tab**
- Trigger the action again
- Look for API requests
- Check their status codes
- **Key questions**:
  - Did the request complete (shows a status code)?
  - Did it fail (4xx, 5xx)?
  - Or is it still "pending" (no status)?
  - If failed, what's the error message?

#### Step 4: Check React State
- Open DevTools → **Components tab**
- Find component showing loading
- Look at the state:
  - `loading` or `isLoading` - should be false when done
  - `error` - might have error message
  - `data` - might be empty or null
- **Questions**:
  - Is `loading` state stuck on `true`?
  - Is there an `error` value set?
  - Is data present or empty?

#### Step 5: Analyze the Error Chain
The loading likely fails due to:

**If request failed (4xx or 5xx):**
- Check Network response for error details
- Check status code:
  - 401 = Authentication required
  - 404 = Wrong endpoint or missing resource
  - 500 = Server crashed
- Check if error handling code exists
- **Question**: Does app handle errors? Or just stay loading?

**If request "pending" (no status):**
- Request might be hanging
- Check if it eventually times out
- Look at time column - how long?
- Check if network is slow or server is down

**If request succeeded but state still loading:**
- Check Console for errors in parsing response
- Look at how response is processed
- Check if state update actually happened
- Error handler might not be removing loading state

### What You'll Discover
- Request might fail silently without error message
- Error occurs but `loading` state doesn't update
- Component shows loading despite having data
- Network request times out or hangs

### Expected Issues
Typically this scenario has bugs like:
- API request fails with 401 or 403
- Error handler doesn't set `loading = false`
- Response parsing throws error (caught somewhere)
- Missing error handling causes state to never reset
- Promise rejection isn't handled

---

## Scenario 3: Silent Failure
**Difficulty**: ⭐⭐⭐⭐ Hard  
**Estimated Time**: 45 minutes

### The Problem
The most insidious bug: everything looks fine, no errors shown, but something failed silently. You'll see no loading, no error message, but also no data or wrong data.

### Where to Start
This is hardest because there's no obvious error. You must:
1. **Assume something failed** (even though you see nothing)
2. **Check every layer** - Console, Network, React DevTools
3. **Look for missing data** rather than errors
4. **Watch carefully** for small clues

### Debugging Steps

#### Step 1: Identify the Silent Failure
- Open the application
- Perform an action or load data
- Look at what appears on screen
- Compare with what should appear
- **Question**: What's missing? What's wrong?

#### Step 2: Check Console Very Carefully
- Open DevTools → **Console tab**
- Filter to show only errors: Look for red messages
- Look for "Uncaught" errors
- Look for promise rejections (might be subtle)
- Check if there are INFO or DEBUG logs that hint at problem
- **Important**: Error might not be highlighted red
- **Question**: Do you see ANY warning or error message at all?

#### Step 3: Check Network Tab Thoroughly
- Open DevTools → **Network tab**
- Look at ALL requests, not just obvious ones
- Check every API request:
  - What's the status code?
  - What's in the Response?
  - Did it return data or error?
- Filter by XHR to see only API calls
- Sort by Status to group errors
- **Key observations**:
  - Did request succeed but with wrong data?
  - Did multiple requests fail?
  - Did one fail that shouldn't?

#### Step 4: Check React DevTools
- Open DevTools → **Components tab**
- Inspect main component
- Check state values:
  - Is `error` empty? (might be set but not displayed)
  - Is `data` null/empty when shouldn't be?
  - Is `loading` false? (might have completed but failed)
- Look at all state - might find clue
- Check if component updated with latest data
- **Question**: State shows completion but data is wrong?

#### Step 5: Trace to Find Root Cause
Silent failures often involve:

**API succeeded but wrong data format:**
- Network shows 200 but Response is wrong
- Code expected { items: [...] } but got { data: [...] }
- Type mismatch (string instead of number)
- Missing fields in response
- Check Network → Response tab carefully

**Error was thrown but caught silently:**
- Try/catch block caught error without telling user
- Error happened during data processing
- Console shows no error because it was caught
- Look for try/catch in code flow
- Set breakpoint and step through to find catch

**Request succeeded but to wrong endpoint:**
- Status is 200 but it's the wrong response
- Check Network tab - is URL correct?
- Are parameters being sent?
- Is it hitting the right endpoint?

**Multiple requests, one failed:**
- Look at every API request in Network tab
- One might have 404 or 401 while others have 200
- UI might be using partial data (first request worked, second didn't)
- Check if all dependent requests completed

### What You'll Discover
- One small error causes entire feature to fail
- Error is caught and hidden from user
- Request completes but returns wrong data
- Multiple bugs work together to hide the problem

### Expected Issues
Typically this scenario has bugs like:
- API call returns 401 but error isn't shown
- Data processing throws error in try/catch
- Response has wrong structure but looks OK
- Request to wrong endpoint succeeds with no-data response
- Multiple requests, second one fails, app uses partial data

---

## General End-to-End Debugging Strategy

### The Investigation Checklist
- [ ] **Console** - Any errors or warnings?
- [ ] **Network** - All requests succeed? Check status codes and responses
- [ ] **React DevTools** - State correct? Data loaded? Loading state reset?
- [ ] **Elements/HTML** - Is data actually in DOM or is it hidden/missing?
- [ ] **Timing** - What took longer than expected? What completed in wrong order?

### Tools You'll Need
1. **Console tab** - Errors and logs
2. **Network tab** - API calls and responses
3. **React DevTools Components** - State inspection
4. **Debugger/Breakpoints** - Step through code
5. **Elements tab** - Inspect actual HTML rendered

### Debugging Methodology
1. **Observe** - What's actually happening vs what should happen
2. **Hypothesize** - What could cause this?
3. **Test** - Check Console, Network, State
4. **Isolate** - Is it API? State? Rendering? Or combination?
5. **Verify** - Confirm fix works and doesn't break other things

### Common Patterns
- **Blank/No Data** → API failed (check Network), or state empty (check React DevTools), or not rendering (check Elements)
- **Loading Forever** → Error not caught (check Console), or API hanging (check Network), or error state not updated (check React DevTools)
- **Silent Failure** → Catch block hiding error (check Console carefully), or wrong data being used (check Network Response), or state mismatch (check React DevTools)

### Tips for Hard Scenarios
- **Assume multiple bugs** - Rarely just one thing
- **Check everything** - Even if you don't think it's the problem
- **Look for small clues** - Missing field, wrong type, unexpected value
- **Verify each layer** - API works? State updated? Component renders?
- **Use breakpoints** - When stuck, step through code with debugger

