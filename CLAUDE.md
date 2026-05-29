@AGENTS.md

# PlebMoe Portal - Next.js App

## Project Documentation Structure

### Session Reports
Session reports and development logs are located in:
- `sessionreports/` - All development session documentation
  - `SESSION_REPORT_2026-05-27_SeenDem_Portal_Deployment.md` - Latest deployment session
  - `SESSION_REPORT_2026-05-24_Backend_Integration.md` - Backend integration session

### Strategic Planning
Strategic planning documents and implementation guides are located in:
- `planning/` - Strategic planning and implementation documentation
  - `COMPREHENSIVE_STRATEGY_CONNECTIVE_TISSUE.md` - Ecosystem strategy framework
  - `IMPLEMENTATION_TODO_MASTER.md` - Detailed implementation plan with 160+ tasks
  - `DEPLOYMENT_GUIDE.md` - Technical deployment instructions

### Quick Reference
For comprehensive project information, refer to the master documentation at:
`/Volumes/Bitcoin/plebmoe/CLAUDE.md` - Complete PlebMoe ecosystem documentation

## 🔗 CRITICAL: Hybrid Permanence Architecture

### ⚠️ DO NOT REMOVE IFRAME APPROACH ⚠️

**The iframe architecture is fundamental to the Bitcoin value proposition and must be preserved:**

### Why Iframe Architecture is Required:
1. **Ordinal Inscription Pathway**: `/public/portal/v14.6.html` and animation files stay separate for future Bitcoin inscription
2. **Hybrid Permanence Model**: Immutable animation layer + Dynamic business logic layer
3. **Bitcoin Value Demonstration**: Shows how permanent, decentralized content works alongside dynamic services
4. **Clean Separation**: Business attribution, auth, lead generation stay in Next.js; core portal stays Ordinal-ready
5. **Future-Proof**: Animation can be inscribed to Bitcoin without breaking business functionality

### Correct Implementation Approach:
- **KEEP**: iframe loading `/public/portal/v14.6.html`
- **ENHANCE**: Overlay system for user authentication and business attribution
- **MAINTAIN**: Separate `/public/portal/` directory for Ordinal-ready files
- **INTEGRATE**: QR codes and tracking in Next.js layer, not animation layer

### Architecture Files:
- **Permanent Layer**: `/public/portal/v14.6.html` + `/public/portal/sketch_cinematic_torus_v14.5.js`
- **Dynamic Layer**: `/src/app/portal/page.tsx` + `/src/components/PortalIntegration.tsx`
- **Integration**: iframe with React component overlays for business logic

## Current Status
- ✅ Portal deployed to seendem.com
- ✅ NeonDB backend integration complete
- ✅ User authentication system functional
- ✅ Hybrid permanence architecture correctly implemented with iframe
- 🔄 Next: Enhance overlay integration and implement QR attribution system
