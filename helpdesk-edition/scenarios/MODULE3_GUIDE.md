# Module 3: Network & HTTP Debugging - Scenario Guide

## Scenario Overview
The application makes HTTP requests to an API server. Your goal is to use the Network tab to debug communication issues, status codes, headers, and payloads.

---

## Lab 1: HTTP Status Codes
**Difficulty**: ⭐ Beginner

### What to Look For
Different HTTP requests return different status codes. Look for:
- **2xx (Success)** - Requests worked (200 OK, 201 Created)
- **4xx (Client Error)** - Bad request data (400, 401, 403, 404)
- **5xx (Server Error)** - Server failed (500)

### Debugging Techniques
1. Open **Network tab** (F12 → Network)
2. Refresh the page or trigger actions
3. Look at the "Status" column for each request
4. Click on a request to see details:
   - **General**: URL, method, status, size
   - **Response**: What server returned
   - **Request Headers**: What was sent
   - **Response Headers**: Server's response metadata

### What You'll Discover
- Some requests succeed with 200
- Some requests fail with 4xx (client error)
- Status codes tell you what went wrong
- Error responses show error messages

### Status Code Quick Reference
| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Data returned successfully |
| 201 | Created | New resource created |
| 400 | Bad Request | Missing/invalid data sent |
| 401 | Unauthorized | Need to login (no token) |
| 403 | Forbidden | Logged in but not allowed |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Server crashed or error |

### Tools to Use
- **Network tab** - See all HTTP requests
- **Status column** - Identify successes and failures
- **Response tab** - Read error messages
- **Filter by status** - Type in filter box to show only certain codes

---

## Lab 2: CORS Issues
**Difficulty**: ⭐⭐ Intermediate

### What to Look For
CORS (Cross-Origin Resource Sharing) errors occur when:
- Frontend and backend are on different origins
- Missing CORS headers in response
- Preflight requests failing
- Different protocols (http vs https)

### Debugging Techniques
1. Open **Network tab**
2. Look for failed requests (usually red status)
3. Check the **Response** tab for error message like:
   - "CORS policy: No 'Access-Control-Allow-Origin' header"
4. Check **Response Headers** for:
   - `Access-Control-Allow-Origin` (should be frontend URL)
   - `Access-Control-Allow-Methods` (should include request method)
5. Look for **OPTIONS requests** (preflight checks)

### What You'll Discover
- Some requests fail due to CORS policy
- Browser blocks requests to different domains
- Missing headers cause CORS failures
- Preflight requests check if actual request is allowed

### CORS Headers to Look For
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### Tools to Use
- **Network tab** - See CORS errors
- **Console** - CORS errors also appear here
- **Response Headers** - Look for Access-Control-Allow-* headers
- **Type filter** - Filter by "xhr" or "fetch" to see API calls

---

## Lab 3: Authentication Errors
**Difficulty**: ⭐⭐ Intermediate

### What to Look For
Authentication issues appear as 401 or 403 errors. Look for:
- **401 Unauthorized** - No token or invalid token
- **403 Forbidden** - Token valid but not allowed
- Missing **Authorization header** in requests
- Invalid **JWT tokens** or expired tokens

### Debugging Techniques
1. Open **Network tab**
2. Look for 401 or 403 responses
3. Click on the request and check:
   - **Request Headers**: Is `Authorization: Bearer <token>` present?
   - **Response**: What error message is returned?
4. For login requests, check if token was returned:
   - Look for 200 response
   - Check **Response body** for token
5. For subsequent requests, verify:
   - Token is being sent in header
   - Token hasn't expired
   - User has required role/permissions

### Authentication Flow
```
1. POST /api/auth/login → Get token in response
2. Store token (usually in localStorage)
3. For next requests: Add "Authorization: Bearer <token>" header
4. If 401: Token missing, invalid, or expired
5. If 403: Token valid but user lacks permission
```

### What You'll Discover
- Login returns a token
- Subsequent requests need token in header
- Missing token causes 401
- Wrong permissions cause 403

### Tools to Use
- **Network tab** - See auth requests and responses
- **Request Headers** - Check if Authorization header exists
- **Response body** - Look for token in login response
- **Storage/Application tab** - Check localStorage for saved token
- **Console** - Manually test with fetch:
  ```javascript
  fetch('/api/profile', {
    headers: { 'Authorization': 'Bearer your-token-here' }
  })
  ```

---

## Lab 4: Payload Debugging
**Difficulty**: ⭐⭐⭐ Advanced

### What to Look For
Request and response payloads may have issues:
- **Wrong data type** (string instead of number)
- **Nested wrong** (object in object when should be flat)
- **Missing required fields**
- **Wrong field names**
- **Invalid date format**

### Debugging Techniques
1. Open **Network tab**
2. Find a failed POST/PUT request
3. Click on request and check:
   - **Request** tab: What data was sent (view body)
   - **Response** tab: What error message server returned
4. Look for clues in error message:
   - "Expected number, got string"
   - "Missing required fields"
   - "Invalid format"
5. Use Console to test correct format:
   ```javascript
   fetch('/api/products', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name: 'Laptop', price: 999 })
   })
   ```

### Common Payload Mistakes
| Problem | Wrong | Correct |
|---------|-------|---------|
| Type | `{ price: "999" }` | `{ price: 999 }` |
| Structure | `{ user: { name: "John" } }` | `{ name: "John" }` |
| Date | `{ date: new Date() }` | `{ date: "2024-01-01T00:00:00Z" }` |
| Array | `[1, 2, 3]` | `{ items: [1, 2, 3] }` |
| Missing | `{ name: "John" }` | `{ name: "John", email: "..." }` |

### What You'll Discover
- Server validates request data
- Wrong types cause 400 errors
- Missing fields cause validation errors
- Response shows what was wrong

### Tools to Use
- **Request body** - See exactly what was sent
- **Response body** - See server's error message
- **Preview tab** - Pretty-print JSON responses
- **Console** - Test API calls with correct format
- **Network → Copy as cURL** - Examine exact request format

---

## Network Tab Tips

### Filtering Requests
- Click **XHR** button to show only API calls (not images, CSS, etc.)
- Use filter box to search by URL
- Sort by Status to find errors quickly

### Understanding Response Codes
- **Green status** = Success (2xx codes)
- **Orange/Red status** = Error (4xx, 5xx codes)
- Click on any request for full details

### Inspecting Payloads
1. Click on request name
2. Click **Request** tab to see what was sent
3. Click **Response** tab to see server's response
4. Click **Preview** for pretty-printed JSON
5. Click **Copy as cURL** to get exact command

### Finding Timing Issues
- Look at **Time** column (how long request took)
- Look for requests that take longer than others
- Check **Type** column - "xhr" or "fetch" are API calls

### Preserving Network Log
- Gear icon (⚙️) → Check "Preserve log"
- Useful for catching errors before page navigation
- Helps track requests across page reloads

---

## Common Network Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Wrong data format | Check request body format |
| 401 Unauthorized | No/invalid token | Add Authorization header |
| 403 Forbidden | No permission | Check user role/permissions |
| 404 Not Found | Wrong URL or missing data | Verify endpoint and ID |
| 500 Server Error | Server crashed | Check server logs |
| CORS error | Missing headers | Server needs CORS config |
| Timeout | Server too slow | Wait or check server |
| Connection refused | Server down | Restart server |

