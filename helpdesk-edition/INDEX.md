# Helpdesk Edition - Complete Index

## Welcome! 👋

You now have a **complete debugging course for helpdesk engineers** without any source code access.

**Total Documentation:** 51+ pages  
**Scenarios:** 15 debugging labs  
**Duration:** ~7.5 hours of training  

---

## 📍 Start Here

### First Time? Read This Order:

1. **QUICKSTART.md** (5 min)
   - Fast setup instructions
   - What to do when stuck
   - Common problems solved

2. **README.md** (15 min)
   - Course overview
   - Module descriptions
   - Learning goals

3. **CHEATSHEET.md** (bookmark this!)
   - Keyboard shortcuts
   - Console commands
   - DevTools reference

---

## 📚 By Module

### Module 2: Console & JavaScript Debugging
**Time:** 75 minutes  
**Start here:** `scenarios/MODULE2_GUIDE.md`

What you'll learn:
- Console output and logs
- Reading error messages
- Debugging async/await
- Using breakpoints

**4 Labs:**
- Lab 1: Console Logging
- Lab 2: Error Messages
- Lab 3: Async Debugging
- Lab 4: Breakpoint Practice

### Module 3: Network & HTTP Debugging
**Time:** 90 minutes  
**Start here:** `scenarios/MODULE3_GUIDE.md`

What you'll learn:
- HTTP status codes
- CORS and authentication
- Request/response inspection
- API debugging

**4 Labs:**
- Lab 1: HTTP Status Codes
- Lab 2: CORS Issues
- Lab 3: Authentication Errors
- Lab 4: Payload Debugging

### Module 4: React DevTools
**Time:** 75 minutes  
**Start here:** `scenarios/MODULE4_GUIDE.md`

What you'll learn:
- React component inspection
- State and props debugging
- Performance profiling
- Component tree navigation

**4 Labs:**
- Lab 1: State Not Updating
- Lab 2: Unnecessary Renders
- Lab 3: Hook Dependencies
- Lab 4: Prop Drilling

### Module 5: End-to-End Scenarios
**Time:** 90 minutes  
**Start here:** `scenarios/MODULE5_GUIDE.md`

What you'll learn:
- Combining multiple tools
- Complex debugging
- Real-world scenarios
- Advanced techniques

**3 Scenarios:**
- Scenario 1: Data Not Showing
- Scenario 2: Loading Never Ends
- Scenario 3: Silent Failures

---

## 🗂️ File Directory

```
helpdesk-edition/
│
├── 📄 QUICKSTART.md              ← START HERE (5 min)
├── 📄 README.md                  ← Read next (15 min)
├── 📄 CHEATSHEET.md              ← Bookmark this!
├── 📄 PROJECT_SUMMARY.md         ← For managers/instructors
├── 📄 CREATION_SUMMARY.md        ← What was created
│
├── 📁 scenarios/                 ← Module guides
│   ├── MODULE2_GUIDE.md          ← Console debugging
│   ├── MODULE3_GUIDE.md          ← Network debugging
│   ├── MODULE4_GUIDE.md          ← React debugging
│   └── MODULE5_GUIDE.md          ← Advanced scenarios
│
├── 📁 server/                    ← API server
│   └── index.js                  ← Express mock API
│
├── 📁 dist/                      ← Build output (created later)
│
├── 📋 package.json               ← Dependencies
├── 🔧 vite.config.ts            ← Build config
├── 🔧 tsconfig.json             ← TypeScript config
└── 🔧 tsconfig.node.json        ← Node config
```

---

## 🎯 Quick Command Reference

### Setup
```bash
cd helpdesk-edition
npm install
npm start
```

### Manual Start
```bash
# Terminal 1 - API Server
npm run server

# Terminal 2 - Web App
npm run preview
```

### Access Points
- **App:** http://localhost:4173
- **API:** http://localhost:3001
- **Dev Mode:** http://localhost:5173 (if using npm run dev)

---

## 📖 Documentation by Topic

### For Setup & Troubleshooting
- **QUICKSTART.md** - Installation, what to do when stuck, common problems
- **README.md** - Full course description, prerequisites, tips

### For Learning DevTools
- **CHEATSHEET.md** - Shortcuts, console commands, network codes, tricks
- **scenarios/MODULE2_GUIDE.md** - Console tab tutorial
- **scenarios/MODULE3_GUIDE.md** - Network tab tutorial

### For React Debugging
- **scenarios/MODULE4_GUIDE.md** - React DevTools installation and use
- **scenarios/MODULE5_GUIDE.md** - Complex scenarios combining all tools

### For Instructors/Managers
- **PROJECT_SUMMARY.md** - Edition overview, features, deployment options
- **CREATION_SUMMARY.md** - What was created, statistics, verification

---

## 🎓 Learning Path (Recommended)

### Day 1 (Session 1)
1. Read **QUICKSTART.md** (5 min)
2. Install and run the app (5 min)
3. Read **README.md** (15 min)
4. Skim **CHEATSHEET.md** (10 min)
- **Total:** 35 minutes

### Day 1 (Session 2) - Module 2
1. Read **scenarios/MODULE2_GUIDE.md** (15 min)
2. Work through Lab 1-4 (60 min)
- **Total:** 75 minutes

### Day 2 (Session 1) - Module 3
1. Review **scenarios/MODULE3_GUIDE.md** (15 min)
2. Work through Lab 1-4 (75 min)
- **Total:** 90 minutes

### Day 2 (Session 2) - Module 4
1. Install React DevTools extension (5 min)
2. Read **scenarios/MODULE4_GUIDE.md** (15 min)
3. Work through Lab 1-4 (55 min)
- **Total:** 75 minutes

### Day 3 - Module 5
1. Read **scenarios/MODULE5_GUIDE.md** (15 min)
2. Work through Scenario 1 (30 min)
3. Work through Scenario 2 (30 min)
4. Work through Scenario 3 (45 min)
- **Total:** 120 minutes

**Total Training Time:** ~7.5 hours

---

## 🔍 Finding Information

### "How do I..."

**Set up the application?**
→ QUICKSTART.md

**Use the Console tab?**
→ scenarios/MODULE2_GUIDE.md + CHEATSHEET.md (Console section)

**Use the Network tab?**
→ scenarios/MODULE3_GUIDE.md + CHEATSHEET.md (Network section)

**Use React DevTools?**
→ scenarios/MODULE4_GUIDE.md + CHEATSHEET.md (React DevTools section)

**Debug a blank page?**
→ scenarios/MODULE5_GUIDE.md (Scenario 1)

**Debug an infinite loading state?**
→ scenarios/MODULE5_GUIDE.md (Scenario 2)

**Debug a silent failure?**
→ scenarios/MODULE5_GUIDE.md (Scenario 3)

**Find keyboard shortcuts?**
→ CHEATSHEET.md (top section)

**Fix "Port already in use"?**
→ QUICKSTART.md (Common Issues section)

---

## 🎯 Module Overview at a Glance

| Module | Focus | Duration | Labs |
|--------|-------|----------|------|
| 2 | Console & Logs | 75 min | 4 |
| 3 | Network & HTTP | 90 min | 4 |
| 4 | React DevTools | 75 min | 4 |
| 5 | Complex Scenarios | 90 min | 3 |
| **Total** | **All Skills** | **330 min** | **15** |

---

## 💡 Tips for Success

1. **Read guides before starting labs** - Understanding context helps
2. **Use CHEATSHEET.md frequently** - Keep it open while learning
3. **Complete modules in order** - Each builds on previous
4. **Don't skip Module 5** - It's where everything comes together
5. **Bookmark common sections** - Keyboard shortcuts, status codes, commands
6. **Practice with real work** - Apply skills to actual problems

---

## 🆘 When You Get Stuck

### My setup isn't working
→ QUICKSTART.md → Common Issues & Solutions

### I don't understand a concept
→ Read the MODULE#_GUIDE.md for that topic  
→ Check CHEATSHEET.md for command syntax  
→ Re-read the explanation section

### I can't find something in DevTools
→ CHEATSHEET.md → Navigation section for that tool  
→ Search for tool name in CHEATSHEET

### The lab won't run
→ Check server is running: `npm run server`  
→ Check port 3001 isn't in use
→ Check browser is at http://localhost:4173

### I have an error I don't understand
→ CHEATSHEET.md → "Common Errors" section  
→ Or ask instructor/manager for help

---

## 📊 What's Inside

### Total Content
- **Documentation:** 51+ pages
- **Code Examples:** 100+
- **Scenarios:** 15
- **DevTools Features:** 40+
- **Keyboard Shortcuts:** 25+

### Topics Covered
- Console debugging
- Network inspection
- HTTP status codes
- CORS and authentication
- React DevTools
- Performance profiling
- Breakpoints and stepping
- State inspection
- Component trees
- Real-world bugs

---

## ✅ Verification

**Everything is ready when:**
- ✅ You can run `npm install` successfully
- ✅ You can run `npm start` successfully
- ✅ App loads at http://localhost:4173
- ✅ You can see modules 2-5 in the app
- ✅ CHEATSHEET.md is bookmarked
- ✅ You've read QUICKSTART.md

---

## 🚀 Ready to Start?

1. **Open QUICKSTART.md** first (5 minutes)
2. **Run the setup** (`npm install && npm start`)
3. **Open browser** to http://localhost:4173
4. **Read README.md** (15 minutes)
5. **Start Module 2** with MODULE2_GUIDE.md

**You've got everything you need. Let's go! 🔧**

---

## 📞 Questions?

- **Setup questions** → QUICKSTART.md
- **How to use DevTools** → CHEATSHEET.md
- **Module content** → Read corresponding MODULE#_GUIDE.md
- **General course info** → README.md

---

## Last Updated
February 2026

**Edition:** Helpdesk (No Source Code)  
**Status:** Ready to use  
**Version:** 1.0.0

Enjoy your debugging journey! 🎓

