# 🚀 PlebMoe Portal Deployment Guide
**Goal:** Get the portal online with full authentication and referral tracking

⚡ **IMPORTANT:** This deployment keeps the background animation separate for future Bitcoin Ordinal inscription while providing the full backend system for user accounts and business attribution.

## 🏗️ Architecture Overview

**Hybrid Permanence Model:**
- **Immutable Layer:** Your v14.6 portal animation stays in `/website/background/` - ready for Bitcoin Ordinal inscription
- **Dynamic Layer:** This Next.js app provides user accounts, referral tracking, and business attribution
- **Integration:** Portal iframe loads from the backend app, keeping animations separate but connected

**File Structure Maintained:**
```
/plebmoe/
├── website/background/           # ORDINAL-READY ANIMATION
│   ├── index_clean_portal_v14.6.html
│   └── sketch_cinematic_torus_v14.5.js
└── nextjs-app/                  # BACKEND SERVICES
    ├── src/app/portal/          # Portal wrapper with auth
    ├── public/portal/           # Animation served here
    └── prisma/                  # Database schema
```

## 📋 Prerequisites Checklist
- [ ] GitHub account
- [ ] Vercel account (free tier sufficient)
- [ ] NeonDB account (free tier sufficient)
- [ ] 30-45 minutes total time

---

## 🗄️ Step 1: Set Up NeonDB Database (10 minutes)

### 1.1 Create Database
1. Visit [neon.tech](https://neon.tech)
2. Sign up/login with GitHub
3. Click "Create Project"
4. Choose:
   - **Project name:** `plebmoe-portal`
   - **Database name:** `portal`
   - **Region:** Choose closest to your users
5. Click "Create Project"

### 1.2 Get Connection String
1. In Neon dashboard, go to "Connection Details"
2. Copy the **Connection string**
3. It looks like: `postgresql://username:password@hostname/database?sslmode=require`

### 1.3 Configure Environment
1. Open `/Volumes/Bitcoin/plebmoe/nextjs-app/.env.local`
2. Replace the DATABASE_URL:
```env
DATABASE_URL="your-neon-connection-string-here"
JWT_SECRET="your-random-secret-key-here"
NEXTAUTH_SECRET="same-as-jwt-secret"
NEXT_PUBLIC_APP_URL="https://your-vercel-app.vercel.app"
```

### 1.4 Initialize Database
```bash
cd /Volumes/Bitcoin/plebmoe/nextjs-app
npm run db:push
npm run db:generate
```

✅ **Database is now ready!**

---

## 🐙 Step 2: Push to GitHub (5 minutes)

### 2.1 Create Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `plebmoe-portal-backend`
3. Choose **Public** (required for free Vercel)
4. ✅ Don't initialize with README (we have files)
5. Click "Create repository"

### 2.2 Push Code
```bash
cd /Volumes/Bitcoin/plebmoe/nextjs-app
git init
git add .
git commit -m "Initial PlebMoe portal with NeonDB integration"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/plebmoe-portal-backend.git
git push -u origin main
```

✅ **Code is now on GitHub!**

---

## ☁️ Step 3: Deploy to Vercel (10 minutes)

### 3.1 Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import `plebmoe-portal-backend` repository
5. Click "Deploy"

### 3.2 Add Environment Variables
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add these variables:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `JWT_SECRET` | Random 32+ character string |
| `NEXTAUTH_SECRET` | Same as JWT_SECRET |

### 3.3 Redeploy
1. Click "Deployments" tab
2. Click "..." → "Redeploy" on latest deployment
3. Wait for build to complete

✅ **Portal is now live!**

---

## 🧪 Step 4: Test Everything (10 minutes)

### 4.1 Test Portal Access
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Click "Enter the Portal"
3. Verify portal animation loads

### 4.2 Test Signup Flow
1. In portal, click "Sign Up" button
2. Fill out registration form
3. Check that success message appears
4. Verify you can refresh and stay logged in

### 4.3 Test Attribution
1. Visit: `https://your-app.vercel.app/portal?qr=TEST123&initiative=psab`
2. Sign up with attribution parameters
3. Check that context is preserved

### 4.4 Verify Database
```bash
npx prisma studio
```
- Check that users table has your test registration
- Verify activity logs are being created

---

## 🎯 Step 5: Business Integration (10 minutes)

### 5.1 Update Portal Reference
Edit your main portal files to point to the new backend:
```javascript
// In any existing portal files, update signup function
function openSignup() {
    window.location.href = 'https://your-vercel-app.vercel.app/portal?action=signup';
}
```

### 5.2 Create QR Codes
Each business initiative gets a tracking URL:

**Premium Spas & Billiards:**
```
https://your-vercel-app.vercel.app/portal?qr=PSAB001&initiative=psab&perspective=money
```

**Penn Quarter Rules:**
```
https://your-vercel-app.vercel.app/portal?qr=PQR001&initiative=penn-quarter&perspective=mental
```

**Solar Strive:**
```
https://your-vercel-app.vercel.app/portal?qr=SOLAR001&initiative=solar&perspective=money
```

---

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npm run db:generate
```
If this fails, check your DATABASE_URL format.

### Build Errors
```bash
# Check for TypeScript errors
npm run build
```
Most common issue: Missing environment variables.

### Portal Not Loading
1. Check browser console for errors
2. Verify iframe source URLs are correct
3. Test portal HTML directly: `/portal/v14.6.html`

---

## 🎉 Success Criteria

After completion, you should have:
- ✅ Portal accessible at public URL
- ✅ User registration working
- ✅ Login/logout functionality
- ✅ Activity tracking in database
- ✅ QR attribution working
- ✅ Referral system operational

## 📈 What This Gives You

### For Users
- Seamless portal experience with persistent accounts
- Progress tracking across visits
- Referral rewards system

### For Business
- Lead generation and qualification
- Attribution tracking across 5 business initiatives
- User activity analytics
- Referral conversion metrics

### For Development
- Professional authentication system
- Scalable database architecture
- API-ready for mobile apps or additional features

---

## 🚀 Next Steps After Deployment

1. **Analytics Integration** - Add Google Analytics or similar
2. **Email System** - Set up email verification and notifications
3. **Admin Dashboard** - Create interface to view leads and analytics
4. **Mobile App** - Use existing API to build React Native app
5. **Payment Integration** - Add Stripe for referral rewards

The foundation is complete - everything above is additive enhancement!