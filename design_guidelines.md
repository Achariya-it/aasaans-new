# Design Guidelines: Integrated Job Portal & LMS Platform

## Design Approach

**Selected Approach:** Design System (Material Design-inspired with LinkedIn/Coursera references)

**Justification:** This is a utility-focused, information-dense professional platform requiring efficiency, trust, and clarity. The dual nature (job portal + LMS) demands consistent, scalable patterns that users can learn quickly.

**Key References:**
- **Job Portal**: LinkedIn's professional aesthetic - clean, trustworthy, data-rich
- **LMS Interface**: Coursera's learning experience - clear progress tracking, structured content
- **Dashboard Design**: Modern SaaS platforms - organized information hierarchy

## Core Design Principles

1. **Professional Trust**: Clean, corporate aesthetic that instills confidence
2. **Clear Hierarchy**: Distinct visual separation between job portal and LMS sections
3. **Data Density Done Right**: Display rich information without overwhelming users
4. **Progress Visibility**: Always show skill points, course progress, and achievements prominently

## Typography

**Font Families:**
- Primary: Inter (headings, UI elements, navigation)
- Secondary: System UI (body text, descriptions)

**Hierarchy:**
- Page Titles: text-4xl font-bold
- Section Headers: text-2xl font-semibold
- Card Titles: text-lg font-medium
- Body Text: text-base font-normal
- Metadata/Labels: text-sm text-gray-600

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, and 12
- Component padding: p-4, p-6
- Section margins: my-8, my-12
- Card spacing: gap-6, gap-8
- Container padding: px-4, px-6, px-8

**Grid Structure:**
- Container: max-w-7xl mx-auto
- Dashboard layouts: 12-column grid
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
**Primary Navigation Bar:**
- Fixed header with dual-identity (Job Portal | LMS toggle or tabs)
- User profile dropdown with skill points badge
- Notification bell with activity count
- Search bar (prominent, expandable)

**Candidate Navigation:** Dashboard, Browse Jobs, My Courses, My Profile, Certificates
**Employer Navigation:** Dashboard, Search Candidates, Payment History, Post Jobs

### Dashboard Components

**Stats Cards:**
- Grid of metric cards showing: Total Skill Points, Courses Completed, Active Applications, Certificates Earned
- Large number typography, icon, label, and trend indicator
- White cards with subtle border

**Course Cards:**
- Horizontal layout for enrolled courses: thumbnail, title, progress bar, completion %, CTA
- Vertical grid for course catalog: image, title, instructor, duration, skill points value, enroll button
- Progress bars: clear percentage, colored fill

**Candidate Cards (Employer View):**
- Profile photo, name, headline, skill points badge (prominent), skills tags
- "View Resume" CTA (requires payment if locked)
- Lock icon overlay for premium profiles

### LMS Interface

**Course Detail Page:**
- Hero section: course thumbnail, title, instructor, rating, enroll CTA
- Tabbed content: Overview, Curriculum, Reviews, Certificates
- Curriculum accordion: modules with lesson lists, duration, checkmarks for completed items
- Sidebar: course stats, what you'll learn, instructor bio

**Learning Interface:**
- Two-column layout: video/content (70%) | sidebar (30%)
- Sidebar: lesson navigation tree, resources, notes
- Bottom: previous/next lesson buttons, mark complete checkbox
- Progress indicator: fixed top bar showing course completion

### Forms & Inputs

**Resume Upload:**
- Drag-and-drop zone with file icon
- Upload progress indicator
- Preview card with edit/delete actions

**Profile Form:**
- Clean, sectioned layout: Personal Info, Skills, Experience, Education
- Skills input: tag-based with autocomplete
- Rich text editor for descriptions

**Payment Interface:**
- Stripe checkout integration
- Package cards: different tiers (Basic: 10 resumes, Premium: 50 resumes, Enterprise: Unlimited)
- Clear pricing, features list, CTA

### Data Displays

**Skill Points System:**
- Large, prominent badge showing total points
- Breakdown modal: points by course category
- Leaderboard table: rank, name, points, recent achievements

**Certificates:**
- Gallery grid view with thumbnails
- Modal preview: certificate design with candidate name, course, date, skill points earned
- Download PDF button

**Tables:**
- Employer candidate search: sortable columns (Name, Skills, Points, Location, Availability)
- Filters sidebar: skill tags, point range slider, location
- Pagination at bottom

### Overlays

**Modals:**
- Certificate preview
- Payment confirmation
- Course enrollment confirmation
- Resume unlock payment
- Course completion celebration (confetti animation allowed here)

**Toasts:**
- Top-right position
- Success: green accent
- Error: red accent
- Info: blue accent

## Images

**Hero Image:** Yes - landing page hero featuring professional diverse individuals in learning/working environment (split-screen: one side showing someone on laptop taking course, other side showing employer reviewing resumes)

**Course Thumbnails:** Each course card requires thumbnail (professional photography or illustrations related to course topic)

**Profile Photos:** Circular avatars throughout (candidates, instructors, employers)

**Certificate Templates:** Professional certificate design with platform branding

**Empty States:** Illustrations for: no courses enrolled, no jobs applied, no candidates found

## Page-Specific Layouts

### Landing Page (7 sections)
1. Hero: split-screen image, dual value prop (candidates + employers), two CTAs
2. How It Works: 3-column process for candidates, 3-column for employers
3. Featured Courses: horizontal scroll cards
4. Skill Points Explainer: visual diagram showing course → points → employer value
5. Success Stories: testimonials with photos and metrics
6. Pricing (Employers): comparison table
7. Footer: comprehensive with newsletter, links, trust badges

### Candidate Dashboard
- Top stats row (4 cards)
- "Continue Learning" section: horizontal cards
- "Recommended Courses": 3-column grid
- "Recent Applications": table

### Employer Dashboard
- Top stats row (payments spent, resumes viewed, active searches)
- "Top Candidates": card grid with skill point badges
- "Recent Searches": saved search quick access

### Course Catalog
- Filters sidebar (left)
- Course grid (right, 3 columns)
- Pagination
- Sort dropdown (top-right)

This design creates a professional, trustworthy platform that clearly connects job seeking with skill development while maintaining visual consistency across both functions.