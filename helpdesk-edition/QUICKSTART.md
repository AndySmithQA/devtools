# Quick Start Guide - Helpdesk Edition

## 5-Minute Setup

### Prerequisites Check
```bash
# Check Node.js version (should be 18 or higher)
node --version    # v18.x or higher
npm --version     # 9.x or higher
```

### Installation
```bash
# 1. Navigate to the helpdesk-edition folder
cd helpdesk-edition

# 2. Install dependencies (takes ~2 minutes)
npm install

# 3. Start everything
npm start

# This will start:
# - API Server on http://localhost:3001
# - App preview on http://localhost:4173
```

### Manual Start (if npm start doesn't work)
```bash
# Terminal 1 - Start the API Server
npm run server

# Terminal 2 - Start the app
npm run preview
```

---

## First Steps

### 1. Open the Application
- Open your browser
- Go to `http://localhost:4173`
- You should see the "Edge DevTools Debugging Course" homepage

### 2. Open DevTools
Press **F12** to open developer tools

### 3. Start with Module 2
- Click "Module 2: Console & JavaScript"
- Start with Lab 1: Console Logging
- Follow the scenario guide in `scenarios/MODULE2_GUIDE.md`

---

## DevTools Keyboard Shortcuts

| Task | Windows/Linux | Mac |
|------|---------------|-----|
| Open DevTools | F12 | Cmd+Option+I |
| Console Tab | Ctrl+Shift+J | Cmd+Option+J |
| Network Tab | Ctrl+Shift+E | Cmd+Option+E |
| Elements Tab | Ctrl+Shift+C | Cmd+Option+C |
| Sources/Debugger | Ctrl+Shift+I → Sources | Cmd+Option+I → Sources |
| Pause on Exception | Ctrl+Shift+P | Cmd+Option+P |
| Continue | F8 | F8 |
| Step Over | F10 | F10 |
| Step Into | F11 | F11 |
| Step Out | Shift+F11 | Shift+F11 |

---

## What to Do When Stuck

### Console Shows Errors
1. Click on the red error message
2. Read the error message carefully
3. Look at the "call stack" below
4. See if you can identify what operation caused it

### Network Shows 400/401/403 Error
1. Click on the failed request
2. Go to **Response** tab
3. Read the error message from server
4. Go to **Request** tab
5. See what data was being sent

### UI is Blank
1. Check **Network tab** - Did API requests complete?
2. Check **React DevTools** - What's in state?
3. Check **Elements tab** - Is HTML being rendered?

### Loading Never Finishes
1. Check **Network tab** - Is the request still pending?
2. Check **Console** - Any errors?
3. Check **React DevTools** - Is loading state stuck on true?

### Can't Find the Problem
1. Use **Preserve Log** in Network tab (so logs don't disappear)
2. Set a breakpoint and step through with F10/F11
3. Use Console to print variables: `console.log(variableName)`
4. Check all three places: Console, Network, React DevTools

---

## API Server Endpoints (for testing)

| Method | URL | Purpose | Notes |
|--------|-----|---------|-------|
| GET | /api/products | Get all products | Always succeeds |
| POST | /api/products | Create product | Needs {name, price} |
| GET | /api/products/:id | Get one product | Replace :id with number |
| POST | /api/auth/login | Login | Returns token |
| GET | /api/profile | Get user profile | Needs token |
| GET | /api/error | Get error | Intentionally fails |
| GET | /api/slow | Slow response | Takes 5 seconds |

### Test Credentials
```
User:  username: "user",  password: "password"
Admin: username: "admin", password: "admin123"
```

---

## Folder Structure

```
helpdesk-edition/
├── README.md                      # Full documentation
├── package.json                   # Dependencies
├── server/
│   └── index.js                  # API server
└── scenarios/
    ├── MODULE2_GUIDE.md          # Console debugging guide
    ├── MODULE3_GUIDE.md          # Network debugging guide
    ├── MODULE4_GUIDE.md          # React DevTools guide
    └── MODULE5_GUIDE.md          # End-to-end scenarios
```

---

## Common Issues & Solutions

### "Port 3001 already in use"
```bash
# Kill the process using port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3001 | xargs kill -9
```

### "Cannot find module 'express'"
```bash
# Reinstall dependencies
npm install
```

### "React DevTools not showing"
1. Install the extension from Edge Add-ons store
2. Search for "React Developer Tools"
3. Reload the app tab after installing

### "Network tab shows nothing"
1. Click the **XHR** button to filter API calls
2. Make sure you're not in offline mode
3. Check if requests are going to `http://localhost:3001`

### "Breakpoints don't work"
1. Make sure code is paused (should show "Paused" indicator)
2. Try clicking on a different line
3. Minified code makes breakpoints tricky - try console.log instead

---

## Next Steps

1. **Read README.md** - Full course documentation
2. **Start Module 2** - Begin with Lab 1
3. **Follow Scenario Guides** - Use MODULE2_GUIDE.md through MODULE5_GUIDE.md
4. **Complete all 5 modules** - 7.5 hours total
5. **Practice with real applications** - Use these skills on work issues

---

## Getting Help

### Check These Guides First
- Module issues → Read corresponding MODULE#_GUIDE.md
- DevTools questions → Read README.md
- Setup problems → See this file (QUICKSTART.md)

### Useful Resources
- Microsoft Edge DevTools: https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/
- React DevTools: https://react-devtools-tutorial.vercel.app/
- Network Debugging: https://developer.chrome.com/docs/devtools/network/

---

## Remember
- **There are no stupid questions** - Debugging is hard
- **Take your time** - Some labs take 30+ minutes
- **Read error messages carefully** - They usually tell you what's wrong
- **Use all three tools** - Console, Network, React DevTools together
- **Practice makes perfect** - The more you debug, the faster you get

Good luck! You've got this! 🔧

