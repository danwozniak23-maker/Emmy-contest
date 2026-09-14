# Emmy Awards Competition Scoring Website - Project Plan

## Overview
Create a mobile-first scoring website for your Emmy awards competition, based on the architecture and deployment patterns from your Save Morgan Valley and Our Power Our Choice websites.

## Technical Architecture (Based on Your Existing Sites)

### Frontend Framework
- **Pure HTML/CSS/JavaScript** (matching your existing sites)
- **Mobile-first responsive design** using CSS Grid/Flexbox
- **Google Sheets integration** for data storage (like calendar events)
- **GitHub Pages deployment** with custom domain support

### Key Features Observed from Your Sites

#### Calendar/Events System
- Google Sheets as backend database
- CSV export from Google Sheets (`/gviz/tq?tqx=out:csv`)
- Client-side JavaScript parsing and rendering
- Real-time updates without server management

#### Mobile-First Design
- Sticky navigation with hamburger menu
- Touch-friendly buttons and form controls
- Responsive grid layouts
- Progressive enhancement approach

#### Deployment Pattern
- GitHub repository with GitHub Pages enabled
- Custom domain via CNAME file
- Simple git push deployment workflow
- No build process required

## Emmy Scoring Website Requirements

### Core Functionality Needed
1. **Judge Login/Authentication** (simple, possibly name-based)
2. **Category Selection** (Drama, Comedy, etc.)
3. **Nominee Scoring Interface** (1-10 scale or similar)
4. **Score Submission** to Google Sheets
5. **Real-time Results Dashboard** (admin view)
6. **Mobile-optimized interface**

### Technical Implementation Plan

#### Data Structure (Google Sheets)
```
Sheets needed:
- Categories (Category Name, Description)
- Nominees (Category, Nominee Name, Details)
- Scores (Judge Name, Category, Nominee, Score, Timestamp)
- Results (aggregated scores, rankings)
```

#### Key Pages
1. **index.html** - Judge login/selection
2. **categories.html** - Category selection
3. **scoring.html** - Main scoring interface
4. **results.html** - Results dashboard (admin)
5. **thank-you.html** - Confirmation page

#### Mobile-First Features
- Large, touch-friendly scoring buttons
- Swipe navigation between nominees
- Progress indicators
- Offline score caching (localStorage)
- One-handed operation optimized

## What I Need From You

### 1. Competition Details
- [ ] **How many categories?** (Drama, Comedy, etc.)
- [ ] **How many nominees per category?**
- [ ] **Scoring system?** (1-10, 1-5, percentage, etc.)
- [ ] **How many judges?**
- [ ] **Judge names/identifiers?**

### 2. Emmy Categories & Nominees
- [ ] **Complete list of categories**
- [ ] **Complete list of nominees for each category**
- [ ] **Any additional info per nominee?** (show name, actor name, episode, etc.)

### 3. Scoring Rules
- [ ] **Can judges score all categories or are they assigned specific ones?**
- [ ] **Are there rounds/phases?** (preliminary, final, etc.)
- [ ] **Time limits for scoring?**
- [ ] **Can judges change scores after submission?**

### 4. Results & Admin
- [ ] **Who needs access to results?** (just you, all judges, etc.)
- [ ] **Real-time results or post-competition only?**
- [ ] **What calculations?** (averages, weighted scores, etc.)

### 5. Technical Setup
- [ ] **Domain name preference?** (something like emmyscoring.com)
- [ ] **GitHub account to use for hosting?** (can use your danwozniak23-maker account)
- [ ] **Google account for the scoring spreadsheet?**

### 6. Design Preferences
- [ ] **Color scheme?** (Emmy gold/black, or custom?)
- [ ] **Any logos or branding to include?**
- [ ] **Preferred mobile layout style?** (cards, lists, swipe interface?)

## Development Timeline (Once Info Provided)

### Phase 1: Setup (30 minutes)
- Create Google Sheet with proper structure
- Set up GitHub repository
- Create basic mobile framework

### Phase 2: Core Features (1-2 hours)
- Judge selection interface
- Category/nominee data integration
- Scoring interface with mobile optimization
- Score submission to Google Sheets

### Phase 3: Polish (30 minutes)
- Results dashboard
- Progress tracking
- Error handling
- Testing across devices

### Phase 4: Deployment (15 minutes)
- GitHub Pages setup
- Custom domain configuration (if desired)
- Final testing

## Next Steps

1. **Provide the competition details above**
2. **I'll create the Google Sheet structure**
3. **Build the mobile-optimized scoring interface**
4. **Deploy to GitHub Pages using your existing workflow**

The site will work exactly like your existing sites - simple HTML/CSS/JS that you can update by pushing to GitHub, with Google Sheets handling all the data storage and no server management required.

Ready to get started once you provide the competition details!