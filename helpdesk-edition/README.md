# Edge DevTools Debugging Course - Helpdesk Edition

## Overview

This is a **production build** of the Edge DevTools Debugging Course designed for **helpdesk engineers and support staff** who need to debug web applications without access to source code.

### Key Features
- ✅ **Compiled Application** - No source code to view
- ✅ **Live Debugging Scenarios** - Real bugs you can find with DevTools
- ✅ **Same Learning Path** - All 5 modules included
- ✅ **Mock API Server** - Full backend for testing
- ✅ **Built for Professionals** - Focus on practical debugging techniques

---

## What You'll Learn

### Module 2: Console & JavaScript Debugging
Debug JavaScript execution using the Console panel, even without source code:
- Console logging patterns and debugging messages
- Error messages and stack traces
- Async/await issues and promise handling
- Breakpoints and stepping through code

### Module 3: Network & HTTP
Master HTTP debugging with the Network tab:
- HTTP status codes (2xx, 4xx, 5xx)
- CORS and authentication errors
- Request/response payloads
- Headers and cookies

### Module 4: React Application Debugging
Use React DevTools to inspect component trees:
- State management issues
- Performance and re-rendering problems
- Hook dependencies
- Component hierarchy and data flow

### Module 5: End-to-End Scenarios
Solve complex, multi-part debugging challenges:
- Data not displaying correctly
- Loading states stuck indefinitely
- Silent API failures
- Multiple debugging tools working together

---

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- Microsoft Edge (or Chrome/Firefox/Safari)
- Basic familiarity with web applications

### Installation
```bash
# Navigate to helpdesk-edition folder
cd helpdesk-edition

# Install dependencies
npm install

# Start both the server and preview
npm start

# OR run them separately:
# Terminal 1:
npm run server

# Terminal 2:
npm run preview
```

The application will be available at `http://localhost:4173` (preview mode) or `http://localhost:5173` (dev mode).

---

## How to Use This Version

### Important: No Source Code Access
This build is intentionally **compiled and minified**. You cannot view the original TypeScript or React code. This mirrors real-world helpdesk scenarios where you only have:
- ✅ Access to the running application
- ✅ Browser DevTools
- ✅ API endpoints and responses
- ✅ Error messages and logs
- ❌ No source code files

### Debugging Approach
1. **Open the application** in Microsoft Edge
2. **Open DevTools** (F12 or Right-click → Inspect)
3. **Navigate to each module** and work through the labs
4. **Use DevTools features**:
   - Console tab: Read logs and evaluate expressions
   - Network tab: Inspect API calls and responses
   - Elements tab: Inspect HTML structure
   - React DevTools extension: Inspect component state

---

## Course Structure

### Module 2: Console & JavaScript Debugging (75 min)
- **Lab 1**: Console Logging - Find debugging patterns in console output
- **Lab 2**: Error Messages - Read and understand error stack traces
- **Lab 3**: Async Debugging - Debug async/await and promise rejections
- **Lab 4**: Breakpoint Practice - Use breakpoints without seeing source code

### Module 3: Network & HTTP (90 min)
- **Lab 1**: HTTP Status Codes - Understand 2xx, 4xx, 5xx responses
- **Lab 2**: CORS Issues - Debug cross-origin resource sharing
- **Lab 3**: Authentication Errors - 401 vs 403, token issues
- **Lab 4**: Payload Debugging - Inspect request and response bodies

### Module 4: React DevTools (75 min)
- **Lab 1**: State Not Updating - Find state mutation issues
- **Lab 2**: Unnecessary Renders - Profile performance problems
- **Lab 3**: Hook Dependencies - Debug useEffect dependency issues
- **Lab 4**: Prop Drilling - Trace data through component hierarchy

### Module 5: End-to-End Scenarios (90 min)
- **Scenario 1**: Data Not Showing - Multiple bugs across layers
- **Scenario 2**: Loading Never Ends - State management issue
- **Scenario 3**: Silent Failure - API fails but no error shown

---

## API Server

The included mock Express server provides:
- Products CRUD endpoints
- Authentication system (login, tokens)
- Error scenarios (400, 401, 403, 404, 500)
- Slow responses and timeouts
- Payload validation

### Test Credentials
```
User:  username: "user",  password: "password"
Admin: username: "admin", password: "admin123"
```

### Available Endpoints
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/auth/login` - Login and get token
- `GET /api/profile` - Get user profile (auth required)
- `GET /api/secure` - Protected data (auth required)
- `GET /api/admin/users` - Admin data (admin required)

---

## Key Differences from Developer Edition

| Feature | Developer Edition | Helpdesk Edition |
|---------|-------------------|------------------|
| Source Code | ✅ Full TypeScript | ❌ Compiled/Minified |
| File Structure | ✅ All visible | ❌ Hidden |
| Component Source | ✅ Readable | ❌ Obfuscated |
| DevTools Usage | 📚 Learning tool | 🎯 Primary tool |
| Debugging Approach | Edit & fix | Find & diagnose |

---

## Tips for Success

### Console Debugging
- Look for console.log, console.error, console.table patterns
- Watch for repeated messages or missing logs
- Use Preserve Logs to catch transient errors

### Network Debugging
- Sort by status code to find errors
- Check request/response headers
- Inspect payload mismatches
- Look for CORS headers

### React Debugging
- Install React DevTools browser extension
- Inspect component tree structure
- Watch state changes in real-time
- Check render counts for performance

### General Tips
- Create break points and step through execution
- Use console to evaluate expressions at breakpoints
- Check browser Storage (localStorage, sessionStorage)
- Look at Application tab for cookies and cache

---

## Support & Resources

### Browser DevTools Docs
- **Microsoft Edge**: https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/
- **Chrome DevTools**: https://developer.chrome.com/docs/devtools/
- **React DevTools**: https://react-devtools-tutorial.vercel.app/

### Server Logs
Check terminal output when running the API server for request logging and error messages.

---

## Next Steps

1. **Start with Module 2** - Get comfortable with Console and breakpoints
2. **Move to Module 3** - Learn network debugging
3. **Complete Module 4** - Master React component debugging
4. **Solve Module 5** - Apply all skills to complex scenarios

---

## Version Info
- **Course Version**: 1.0.0
- **Edition**: Helpdesk (No Source Code)
- **Last Updated**: February 2026
- **Compatible Browsers**: Edge, Chrome, Firefox, Safari (latest versions)
