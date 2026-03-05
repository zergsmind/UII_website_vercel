# Urban Innovation Institute (UII) Landing Page

A modern, interactive landing page for the Urban Innovation Institute featuring Three.js WebGL animations, multi-language support, and responsive design aligned with UII's visual identity.

## ✨ Features

### Interactive & Visual
- **Three.js WebGL Scene** - Urban geometric shapes + particle animations with physics damping
- **Floating Scroll Navigator** - Visual progress indicator for page sections
- **Section Dividers** - Numbered, visually distinct category separators
- **Smooth Animations** - ADSR-style damping for organic motion

### Content & Language
- **Multi-Language** - Romanian, English, Dutch with persistent selection
- **3 Main Sections** - What We Are, How We Work, Track Record
- **UII Visual Identity** - Teal/Coral color palette, Spectral + DM Sans typography

### Technical Excellence
- **React 18** + TypeScript for type safety
- **Vite 5** for instant HMR and optimized builds
- **Three.js** for 3D WebGL rendering
- **Responsive** - Mobile-first design approach

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:3001` with hot reload

### Production Build
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Main layout & sections
├── App.css                    # Component styling
├── index.css                  # Global styles & CSS variables
├── main.tsx                   # React entry point
├── UrbanScene.tsx            # Three.js WebGL animation
├── LanguageContext.tsx       # i18n state & provider
├── LanguagePicker.tsx        # Language selector (RO/EN/NL)
├── ScrollIndicator.tsx       # Scroll progress navigation
├── SectionDivider.tsx        # Visual section breaks
└── translations.ts           # Content translations
```

## 🎨 Design System

### Colors
| Color | Hex | Purpose |
|-------|-----|---------|
| Teal | #1B5E5A | Primary, buttons |
| Coral | #D4613A | Accents, highlights |
| Offwhite | #F7F4EF | Background |
| Cream | #F0EDE6 | Gradient accents |

### Fonts
- **Headings** - Spectral (serif, 300-700)
- **Body** - DM Sans (sans-serif, 300-600)

## ⚙️ WebGL Animation Settings

```javascript
// Shape Rotation (Large Volumes)
SHAPE_ROTATION_SLOWDOWN = 0.2    // 80% slower (architectural feel)

// Particle Motion
PARTICLE_SLOWDOWN = 0.44          // 50% slower (graceful floating)
DAMPING = 0.98                    // Organic deceleration
BOUNCE_ENERGY = 0.9               // Energy loss on collision
```

## 🌍 Language Support

Translations available in:
- **Romanian** (RO) - Română
- **English** (EN) - English
- **Dutch** (NL) - Nederlands

Language preference saved to localStorage for persistence.

## 🔄 Version Control & Variations

### Branching Strategy
```bash
# View all branches
git branch -v

# Create a variation
git checkout -b variation/your-idea-name

# Switch versions
git checkout master          # Back to main
git checkout variation/...   # Try a variation

# List all commits
git log --all --graph --decorate
```

### Current Checkpoints
- `master` - v1 Complete design (latest stable)
- Can create variations for experimentation

## 📦 Dependencies
- react: 18.3.1
- react-dom: 18.3.1
- three: Latest
- typescript: 5.2.2+
- vite: 5.0.0+

## 🚢 Deploying to GitHub

When ready to push to GitHub:

```bash
# Add remote (one-time)
git remote add origin https://github.com/YOUR-USERNAME/uii-landing.git

# Push all branches
git push -u origin main
git push -u origin --all    # All variations too

# View on GitHub
https://github.com/YOUR-USERNAME/uii-landing
```

## 📊 Current Status

✅ Hero section with interactive WebGL
✅ Multi-language support with persistent selection
✅ 3-section layout with visual dividers
✅ Floating scroll navigation
✅ Responsive mobile design
✅ UII visual identity (colors, fonts)
✅ Optimized animations with damping physics
✅ Git setup ready for GitHub push

---

**Local Git Repo**: Ready for variations and GitHub deployment anytime!
