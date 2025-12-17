# Pre-Course Setup Instructions

## Welcome! 👋

Thank you for enrolling in the **Edge DevTools Debugging Course**. Please complete these setup steps **before the course begins**.

## ✅ Required Software

### 1. Microsoft Edge Browser
**Required Version:** Latest stable version

**Download:** https://www.microsoft.com/edge

**Verify Installation:**
1. Open Edge
2. Click `...` (top right) → Help and feedback → About Microsoft Edge
3. Version should be 120 or higher

---

### 2. Node.js
**Required Version:** 18.x or higher

**Download:** https://nodejs.org/ (Choose LTS version)

**Verify Installation:**
Open a terminal/command prompt and run:
```bash
node --version
# Should show v18.x.x or higher

npm --version
# Should show 9.x.x or higher
```

**Windows Users:** If you see an error about execution policies, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### 3. React Developer Tools Extension
**Required:** Yes - this is essential!

**Installation:**
1. Open Microsoft Edge
2. Go to: https://microsoftedge.microsoft.com/addons
3. Search for "React Developer Tools"
4. Click "Get" to install
5. Pin the extension to your toolbar (optional but helpful)

**Verify Installation:**
1. After installing, right-click the extension icon
2. Select "Manage extension"
3. Ensure it's enabled

---

### 4. Code Editor (Optional but Recommended)
**Recommendation:** Visual Studio Code

**Download:** https://code.visualstudio.com/

This is optional - you can use any editor you're comfortable with.

---

## 📥 Course Materials Setup

### Option 1: Download from USB (On Course Day)
We'll provide the course materials on a USB drive. Just copy the folder to your computer.

### Option 2: Clone from Git (If Provided)
```bash
git clone [repository-url]
cd devtools
```

### Option 3: Download ZIP (If Provided)
1. Download the ZIP file
2. Extract to a convenient location
3. Remember where you extracted it!

---

## 🧪 Test Your Setup

Once you have the course materials:

### 1. Install Dependencies
Open terminal/command prompt in the project folder:

```bash
cd path/to/devtools
npm install
```

**This may take 2-5 minutes.** Wait for it to complete.

### 2. Start the Development Server
```bash
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:3000/
```

### 3. Start the API Server
**Open a NEW terminal** (keep the first one running!) and run:
```bash
npm run server
```

You should see:
```
🚀 Mock API Server running on http://localhost:3001
```

### 4. Test the Application
1. Open Edge browser
2. Go to: http://localhost:3000
3. You should see the course homepage
4. Press `F12` to open DevTools
5. Check for React tab in DevTools (you should see it!)

---

## ✅ Pre-Course Checklist

On course day, you should have:
- [ ] Microsoft Edge browser installed and updated
- [ ] Node.js installed (version 18+)
- [ ] React Developer Tools extension installed
- [ ] Course materials downloaded/cloned
- [ ] `npm install` completed successfully
- [ ] Both servers tested and working (npm run dev + npm run server)
- [ ] DevTools opens with F12
- [ ] React DevTools tab visible

---

## 🆘 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Node.js not installed correctly. Reinstall Node.js and restart your terminal.

### Problem: "Port 3000 is already in use"
**Solution:** Another application is using port 3000. Either:
- Close the other application
- Or edit `vite.config.ts` and change the port

### Problem: "React DevTools not showing in Edge"
**Solution:**
1. Verify extension is installed
2. Refresh the page (Ctrl+R)
3. Check that you're viewing a React app (not just any webpage)
4. Restart Edge browser

### Problem: "npm install" fails or takes forever
**Solution:**
1. Check your internet connection
2. Try: `npm cache clean --force`
3. Delete `node_modules` folder and `package-lock.json`
4. Run `npm install` again

### Problem: "Permission denied" errors on Mac/Linux
**Solution:**
```bash
# Don't use sudo! Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### Problem: API server won't start
**Solution:**
1. Check if port 3001 is already in use
2. On Windows: `netstat -ano | findstr :3001`
3. On Mac/Linux: `lsof -ti:3001`
4. Kill the process using that port

---

## 💡 What to Expect

### Course Structure
- **Duration:** 6-7 hours (1 day)
- **Format:** Mix of instruction and hands-on labs
- **Breaks:** Regular breaks scheduled

### What You'll Learn
- Console debugging and logging
- JavaScript execution debugging with breakpoints
- Network request inspection
- HTTP status code interpretation
- React component debugging
- Real-world debugging scenarios

### What to Bring
- Laptop with setup completed
- Charger (you'll need it!)
- Notebook/note-taking device (optional)
- Questions about debugging challenges you've faced

---

## 📧 Need Help?

If you encounter setup issues:
1. Try the troubleshooting steps above
2. Contact course instructor (contact info provided separately)
3. Arrive 15 minutes early on course day for setup assistance

---

## 🎯 Optional Pre-Work

If you want to arrive prepared:

1. **Familiarize yourself with Edge DevTools:**
   - Open any website
   - Press F12
   - Click through Console, Network, Sources, Elements tabs

2. **Review React Basics:**
   - useState hook
   - useEffect hook
   - Component props and state

3. **Review HTTP Basics:**
   - GET vs POST requests
   - What status codes mean (200, 404, 500, etc.)

**Don't worry if you're rusty - we'll cover everything in the course!**

---

## ✨ Ready to Go!

Once your checklist is complete, you're all set! We look forward to seeing you in the course.

Remember:
- Debugging is a skill, not magic
- Everyone struggles with bugs
- The goal is to learn systematic approaches
- Have fun!

See you soon! 🚀
