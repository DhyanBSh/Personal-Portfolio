# Advanced Portfolio Features Implementation

This document outlines all the new advanced animation and interaction features added to your portfolio.

## 🎬 Features Implemented

### 1. **Parallax Depth Layers** (`useParallax.ts`)
- Creates layered depth effects based on mouse position and scroll
- Elements move at different speeds creating 3D depth illusion
- Used throughout the About page and Home page sections

**Usage:**
```tsx
<ParallaxLayer strength={0.3}>
  <YourComponent />
</ParallaxLayer>
```

**Parameters:**
- `strength`: Controls parallax intensity (0-1, default: 0.5)
- `offset`: Additional offset value (default: 0)

**Where Used:**
- About page header tags (strength: 0.3)
- Main heading (strength: 0.2)
- Description sections (strength: 0.15)
- All profile sections (strength: 0.1)
- Home page showreel (strength: 0.1)

---

### 2. **Dynamic Background Color Transitions** (`useBackgroundTransition.ts`)
- Smooth transitions between Black and White backgrounds
- Configured based on scroll position
- Affects entire page dynamically
- Only uses Black & White color scheme

**Configuration in App.tsx:**
```tsx
<BackgroundTransitionProvider
  sections={[
    { threshold: 0, color: 'white' },
    { threshold: 0.33, color: 'black' },
    { threshold: 0.66, color: 'white' },
  ]}
  transitionDuration={0.5}
>
```

**Features:**
- Automatic color switching based on scroll progress
- Smooth 0.5s transition duration
- Text and UI elements adapt automatically
- Works across all pages

---

### 3. **Text Reveal Per Section** (`useTextReveal.ts` & `TextReveal.tsx`)
- Words appear with staggered animations as sections come into view
- Each word reveals individually with blur and fade effects
- Creates engaging reading experience

**Usage:**
```tsx
<TextReveal
  text="Your text here"
  className="text-[56px] font-medium"
  threshold={0.15}
  duration={0.02}
  staggerDelay={0.01}
/>
```

**Parameters:**
- `text`: The text to animate
- `className`: Tailwind classes
- `as`: HTML element type (h1, h2, p, div, etc.)
- `threshold`: Scroll threshold for intersection
- `duration`: Delay between word reveals (in seconds)
- `staggerDelay`: Additional delay per word

**Supported Elements:**
- About page main heading
- About page descriptions
- Professional descriptions
- All body text content

---

### 4. **Mouse-Wheel Horizontal Scroll Support** (`useHorizontalScroll.ts` & `HorizontalScrollContainer.tsx`)
- Convert vertical scroll to horizontal for compatible containers
- Smooth scrolling behavior
- Non-intrusive to normal vertical scrolling

**Usage:**
```tsx
<HorizontalScrollContainer sensitivity={1}>
  {/* Scrollable content */}
</HorizontalScrollContainer>
```

**Parameters:**
- `sensitivity`: Scroll speed multiplier (default: 1)
- `enabled`: Toggle feature on/off (default: true)

**Implementation:**
- Used in About page logo section
- Seamless integration with existing marquee animation
- Prevents default behavior only for horizontal elements

---

### 5. **Velocity-Based Motion Blur** (`useMotionBlur.ts` & `MotionBlurContainer.tsx`)
- Blur increases based on mouse movement velocity
- Creates smooth motion trail effect
- Gradually fades when motion stops

**Usage:**
```tsx
<MotionBlurContainer maxBlur={20} threshold={0.5}>
  {/* Content to blur */}
</MotionBlurContainer>
```

**Parameters:**
- `maxBlur`: Maximum blur amount in pixels (default: 20)
- `threshold`: Sensitivity multiplier (default: 0.5)

**Technical Details:**
- Real-time velocity calculation from mouse movement
- Smooth decay animation when motion stops
- Applied dynamically via Framer Motion filter

---

## 📁 File Structure

### New Hooks (`src/hooks/`)
```
useParallax.ts              - Parallax effect hook
useTextReveal.ts            - Word-by-word reveal hook
useHorizontalScroll.ts      - Horizontal scroll conversion hook
useMotionBlur.ts            - Velocity-based blur hook
useBackgroundTransition.ts  - Dynamic background color hook
index.ts                    - Export all hooks
```

### New Components (`src/components/`)
```
ParallaxLayer.tsx           - Parallax wrapper component
TextReveal.tsx              - Text reveal component
HorizontalScrollContainer.tsx - Horizontal scroll container
MotionBlurContainer.tsx      - Motion blur wrapper
BackgroundTransitionProvider.tsx - Global background provider
```

### Utilities (`src/utils/`)
```
animations.ts               - Reusable animation variants
```

### Updated Pages
```
src/pages/About.tsx         - Enhanced with all new features
src/pages/Home.tsx          - Enhanced with parallax & transitions
src/App.tsx                 - Global background transition provider
```

---

## 🎨 Color Scheme

### White Theme (Default)
- Background: `#fcfcfc`
- Text: `#111`
- Accents: `black/40` to `black/70`

### Black Theme
- Background: `#000000`
- Text: `#ffffff`
- Accents: `white/40` to `white/70`

---

## ⚙️ Configuration Guide

### Parallax Strength Levels
```
0.0 - 0.1: Subtle, almost imperceptible
0.1 - 0.2: Gentle depth effect
0.2 - 0.3: Noticeable parallax
0.3 - 0.5: Strong depth layering
> 0.5    : Very pronounced (use carefully)
```

### Background Transition Thresholds
Adjust the `sections` array in `App.tsx`:
```tsx
sections={[
  { threshold: 0, color: 'white' },     // 0-33% scroll
  { threshold: 0.33, color: 'black' },  // 33-66% scroll
  { threshold: 0.66, color: 'white' },  // 66-100% scroll
]}
```

### Text Reveal Timing
- `duration`: Time between word reveals (in seconds)
- `staggerDelay`: Additional delay per word
- `threshold`: When animation starts (0-1 scale)

Slow reveal: `duration={0.05}`, `staggerDelay={0.02}`
Fast reveal: `duration={0.01}`, `staggerDelay={0.005}`

---

## 🚀 Performance Optimizations

All features are optimized for performance:
- Debounced scroll/mouse events
- CSS transitions for animations
- Hardware-accelerated transforms
- Efficient re-renders with Framer Motion
- No layout thrashing

---

## 🎯 Usage Examples

### Applying Parallax to New Sections
```tsx
import { ParallaxLayer } from '../components/ParallaxLayer';

<ParallaxLayer strength={0.2}>
  <h2>Your Heading</h2>
  <p>Your content</p>
</ParallaxLayer>
```

### Adding Text Reveal
```tsx
import { TextReveal } from '../components/TextReveal';

<TextReveal
  text="This text will be revealed word by word"
  className="text-2xl font-bold"
/>
```

### Enabling Horizontal Scroll
```tsx
import { HorizontalScrollContainer } from '../components/HorizontalScrollContainer';

<HorizontalScrollContainer>
  <div className="flex gap-4 w-max">
    {/* Content */}
  </div>
</HorizontalScrollContainer>
```

---

## 🔧 Troubleshooting

### Parallax not working
- Ensure element is in viewport
- Check if parent has `overflow: hidden`
- Verify scroll/mouse events are firing

### Text reveal not animating
- Check `threshold` value (should be 0-1)
- Verify `duration` is reasonable (0.01-0.1)
- Ensure element is visible on page load

### Background transition not updating
- Check if `BackgroundTransitionProvider` wraps entire app
- Verify scroll progress is being tracked
- Check browser console for errors

### Motion blur performance issues
- Reduce `maxBlur` value
- Disable on mobile with conditional rendering
- Check if too many blur effects active simultaneously

---

## 📱 Mobile Responsiveness

All features are responsive:
- Parallax scales down on mobile (reduced strength)
- Text reveals work on touch devices
- Horizontal scroll works with touch swipe
- Motion blur optimized for mobile performance

---

## 🎬 Animation Easing

All animations use the custom easing:
```
[0.22, 1, 0.36, 1]
```
This creates a smooth, natural motion curve that feels premium and refined.

---

## 🔮 Future Enhancement Ideas

1. **Scroll-triggered sections** - Reveal sections on scroll
2. **Gesture support** - Add touch gesture parallax
3. **Light/dark mode toggle** - User preference for colors
4. **Customizable blur patterns** - Different blur based on content
5. **Advanced text animations** - Character-level reveals
6. **Performance monitoring** - Track animation frame rates

---

## 📝 Notes

- All features are built with React best practices
- Uses Framer Motion for smooth animations
- Fully compatible with Tailwind CSS
- No external animation libraries beyond Framer Motion
- Clean, maintainable code structure

---

For questions or customization needs, refer to the individual hook and component files.
