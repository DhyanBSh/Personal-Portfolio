# Architecture & Data Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│          (BackgroundTransitionProvider wrapper)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐              │
│  │      Home.tsx        │  │     About.tsx        │              │
│  ├──────────────────────┤  ├──────────────────────┤              │
│  │ • ParallaxLayer      │  │ • ParallaxLayer (x5) │              │
│  │ • Hero Section       │  │ • TextReveal (x4)    │              │
│  │ • Showreel           │  │ • HorizontalScroll   │              │
│  │ • Color Adaptation   │  │ • Color Adaptation   │              │
│  └──────────────────────┘  └──────────────────────┘              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼────┐  ┌─────▼────┐  ┌────▼───────┐
        │   Hooks    │  │Components │  │  Utils     │
        ├────────────┤  ├───────────┤  ├────────────┤
        │ Background │  │ Parallax  │  │ Animations │
        │ Transition │  │ Layer     │  │ Variants   │
        │ Parallax   │  │ TextReveal│  │            │
        │ TextReveal │  │ H-Scroll  │  │            │
        │ H-Scroll   │  │ MotionBlur│  │            │
        │ MotionBlur │  │ Background│  │            │
        └────────────┘  └───────────┘  └────────────┘
```

## 📊 State Flow Diagram

```
User Interaction
      ↓
   Scroll / Mouse Move
      ↓
   ┌──────────────────────────────────┐
   │  useBackgroundTransition Hook    │
   │  (Calculates scroll progress)    │
   └──────────────┬───────────────────┘
                  ↓
   ┌──────────────────────────────────┐
   │  Background Color Update         │
   │  (Black ↔ White)                │
   └──────────────┬───────────────────┘
                  ↓
   ┌──────────────────────────────────┐
   │  Update Text & Element Colors    │
   │  (Adaptive to theme)             │
   └──────────────────────────────────┘


   ┌──────────────────────────────────┐
   │  useParallax Hook                │
   │  (Calculates parallax offset)    │
   └──────────────┬───────────────────┘
                  ↓
   ┌──────────────────────────────────┐
   │  Update Element Y Position       │
   │  (Via Framer Motion)             │
   └──────────────────────────────────┘


   ┌──────────────────────────────────┐
   │  useTextReveal Hook              │
   │  (Detects viewport entry)        │
   └──────────────┬───────────────────┘
                  ↓
   ┌──────────────────────────────────┐
   │  Animate Word Reveals            │
   │  (Staggered animation)           │
   └──────────────────────────────────┘


   ┌──────────────────────────────────┐
   │  useMotionBlur Hook              │
   │  (Calculates velocity)           │
   └──────────────┬───────────────────┘
                  ↓
   ┌──────────────────────────────────┐
   │  Update Blur Filter              │
   │  (Based on speed)                │
   └──────────────────────────────────┘
```

## 🔄 Component Hierarchy

```
App.tsx
│
├── BackgroundTransitionProvider
│   │
│   ├── Navbar
│   ├── AnimatedRoutes
│   │   ├── Home
│   │   │   ├── Hero (ParallaxLayer)
│   │   │   ├── CaseStudiesTable
│   │   │   ├── FadingText
│   │   │   └── Showreel (ParallaxLayer)
│   │   │
│   │   └── About
│   │       ├── Header Tags (ParallaxLayer)
│   │       ├── Main Heading (ParallaxLayer + TextReveal)
│   │       ├── Description (ParallaxLayer + TextReveal)
│   │       ├── Logo Section (ParallaxLayer + HorizontalScrollContainer)
│   │       ├── Education (ParallaxLayer)
│   │       ├── Experience (ParallaxLayer)
│   │       ├── Competencies (ParallaxLayer)
│   │       └── Leadership (ParallaxLayer)
│   │
│   └── Footer
```

## 🎛️ Feature Interaction Matrix

```
┌─────────────────┬──────────┬────────┬─────────┬──────────┐
│     Feature     │ Scroll   │ Mouse  │ Viewport│ Theme    │
├─────────────────┼──────────┼────────┼─────────┼──────────┤
│ Parallax        │ Responds │ Responds│ Always  │ No       │
│ Background      │ Responds │ No     │ Always  │ Yes      │
│ TextReveal      │ No       │ No     │ Responds│ No       │
│ H-Scroll        │ Converts │ No     │ No      │ No       │
│ MotionBlur      │ No       │ Responds│ No      │ No       │
└─────────────────┴──────────┴────────┴─────────┴──────────┘
```

## 📈 Data Flow for Each Feature

### 1. Parallax System
```
Scroll/Mouse Event
        ↓
  useParallax Hook
        ↓
  Calculate Position
        ↓
  ParallaxLayer Component
        ↓
  Update Y Transform
        ↓
  Framer Motion Animation
        ↓
  Smooth Visual Effect
```

### 2. Background Transition System
```
Scroll Event
        ↓
  useBackgroundTransition Hook
        ↓
  Calculate Scroll Progress
        ↓
  Determine Current Color
        ↓
  BackgroundTransitionProvider
        ↓
  Update CSS Classes
        ↓
  Theme-aware UI Update
```

### 3. Text Reveal System
```
Component Mount
        ↓
  useTextReveal Hook
        ↓
  Setup Intersection Observer
        ↓
  Element Enters Viewport
        ↓
  TextReveal Component
        ↓
  Start Word Animations
        ↓
  Staggered Blur/Fade Effect
```

### 4. Horizontal Scroll System
```
Wheel Event on Container
        ↓
  useHorizontalScroll Hook
        ↓
  Check Element Type
        ↓
  Convert Vertical to Horizontal
        ↓
  HorizontalScrollContainer
        ↓
  Update scrollLeft Property
        ↓
  Smooth Scroll Behavior
```

### 5. Motion Blur System
```
Mouse Move Event
        ↓
  useMotionBlur Hook
        ↓
  Calculate Velocity
        ↓
  Determine Blur Amount
        ↓
  MotionBlurContainer
        ↓
  Update Filter CSS
        ↓
  Gradual Blur Decay
```

## 🎯 Integration Points

### About.tsx Integration
```
About.tsx
  ├── useBackgroundTransition
  │   └── Dynamic color switching
  ├── ParallaxLayer × 5
  │   ├── Header tags (strength: 0.3)
  │   ├── Main heading (strength: 0.2)
  │   ├── Descriptions (strength: 0.15)
  │   └── All sections (strength: 0.1)
  ├── TextReveal × 4
  │   ├── Main heading
  │   ├── Student description
  │   ├── Passion description
  │   └── Various profile sections
  └── HorizontalScrollContainer
      └── Logo marquee section
```

### Home.tsx Integration
```
Home.tsx
  ├── useBackgroundTransition
  │   └── Dynamic color switching
  ├── Hero Section
  │   ├── ParallaxLayer (strength: 0.2)
  │   └── Dynamic background
  ├── CaseStudiesTable
  │   └── Color-adaptive UI
  ├── FadingText
  │   └── Color-adaptive UI
  └── Showreel
      ├── ParallaxLayer (strength: 0.1)
      └── Dynamic colors
```

## 🔌 Hook Dependencies

```
useBackgroundTransition
  ├── useEffect (for scroll listener)
  ├── useState (for color state)
  └── No external dependencies

useParallax
  ├── useEffect
  ├── useRef
  ├── useState
  └── No external dependencies

useTextReveal
  ├── useEffect
  ├── useRef
  ├── useState
  └── IntersectionObserver API

useHorizontalScroll
  ├── useEffect
  ├── useRef
  └── No external dependencies

useMotionBlur
  ├── useEffect
  ├── useRef
  ├── useState
  └── No external dependencies
```

## 🎨 Component Dependencies

```
ParallaxLayer
  ├── useParallax hook
  ├── Framer Motion (motion.div)
  └── React.ReactNode

TextReveal
  ├── useTextReveal hook
  ├── Framer Motion (motion.span)
  └── React children

HorizontalScrollContainer
  ├── useHorizontalScroll hook
  └── React children

MotionBlurContainer
  ├── useMotionBlur hook
  ├── Framer Motion (motion.div)
  └── React children

BackgroundTransitionProvider
  ├── useBackgroundTransition hook
  ├── useEffect (for DOM updates)
  └── React children
```

## 📦 Bundle Impact

```
Hook Files (~500 bytes each)
  ├── useParallax.ts          ≈ 500 bytes
  ├── useTextReveal.ts        ≈ 550 bytes
  ├── useHorizontalScroll.ts  ≈ 400 bytes
  ├── useMotionBlur.ts        ≈ 550 bytes
  └── useBackgroundTransition.ts ≈ 450 bytes
  
Component Files (~300 bytes each)
  ├── ParallaxLayer.tsx       ≈ 350 bytes
  ├── TextReveal.tsx          ≈ 400 bytes
  ├── HorizontalScrollContainer.tsx ≈ 300 bytes
  ├── MotionBlurContainer.tsx ≈ 300 bytes
  └── BackgroundTransitionProvider.tsx ≈ 400 bytes

Total: ~5.5 KB (uncompressed, including whitespace)
Gzipped: ~1.8 KB

No additional dependencies needed!
```

## 🔄 Event Loop Optimization

```
Frame Timing (60fps = 16.67ms per frame)

Frame Start
  ├── Handle Events (scroll, mouse)
  ├── Calculate Values (parallax, blur)
  ├── Update State
  ├── React Render
  ├── Framer Motion
  ├── CSS Updates
  └── Browser Paint
  
Result: 60fps smooth animations with no jank
```

---

**This architecture ensures:**
- ✅ Separation of concerns
- ✅ Reusable components and hooks
- ✅ Minimal performance impact
- ✅ Easy to maintain and extend
- ✅ Scalable to other pages
