# Using Images in Your Angular EcoMinds Project

## Overview

Your project now includes a complete image asset system with SVG illustrations and proper Angular configuration. Here's how to use and manage images in your app.

## Asset Structure

```
src/assets/
├── images/
│   ├── logo.svg           # Main EcoMinds logo
│   ├── hero-banner.svg    # Hero section banner illustration
│   ├── mission-recycling.svg # Recycling mission illustration
│   └── mission-water.svg  # Water conservation illustration
└── icons/                 # For smaller icon assets (currently empty)
```

## How to Use Images in Angular Components

### 1. Basic Image Usage

In your component templates, reference images using the `assets/` path:

```html
<!-- Basic image -->
<img src="assets/images/logo.svg" alt="EcoMinds Logo" />

<!-- With CSS classes -->
<img
  src="assets/images/hero-banner.svg"
  alt="Environmental illustration"
  class="hero-image"
/>

<!-- Responsive image -->
<img
  src="assets/images/mission-recycling.svg"
  alt="Recycling mission"
  class="responsive-img"
/>
```

### 2. In Component TypeScript Files

```typescript
@Component({
  selector: "app-example",
  template: `
    <div class="image-container">
      <img src="assets/images/logo.svg" alt="Logo" class="logo" />
    </div>
  `,
})
export class ExampleComponent {
  // You can also define image paths as properties
  logoPath = "assets/images/logo.svg";
  heroImage = "assets/images/hero-banner.svg";
}
```

### 3. Dynamic Image Loading

```typescript
export class DynamicImageComponent {
  images = [
    { src: "assets/images/mission-recycling.svg", alt: "Recycling" },
    { src: "assets/images/mission-water.svg", alt: "Water Conservation" },
  ];
}
```

```html
<div *ngFor="let image of images" class="image-grid">
  <img [src]="image.src" [alt]="image.alt" />
</div>
```

### 4. CSS Background Images

In your SCSS files, you can also use images as backgrounds:

```scss
.hero-section {
  background-image: url("assets/images/hero-banner.svg");
  background-size: cover;
  background-position: center;
}

.card-with-bg {
  background: url("assets/images/logo.svg") no-repeat center;
  background-size: contain;
}
```

## Styling Images

### Common CSS Classes for Images

Add these to your component SCSS or global styles:

```scss
// Responsive images
.responsive-img {
  max-width: 100%;
  height: auto;
}

// Fixed size images
.logo-small {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.logo-medium {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.logo-large {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

// Rounded images
.rounded-img {
  border-radius: 8px;
}

.circle-img {
  border-radius: 50%;
}

// Image with hover effects
.hover-scale {
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
```

## Examples from Your Updated Components

### Header Component (Logo)

```typescript
// In header.component.ts
template: `
  <div class="nav-brand">
    <a routerLink="/home" class="brand-link">
      <img src="assets/images/logo.svg" alt="EcoMinds Logo" class="logo-image">
      <h1>EcoMinds</h1>
    </a>
  </div>
`;
```

```scss
// In header.component.scss
.logo-image {
  height: 40px;
  width: auto;
}
```

### Home Component (Hero Banner & Feature Images)

```typescript
// In home.component.ts
template: `
  <div class="hero-section">
    <div class="hero-content">
      <h1>Welcome to EcoMinds</h1>
      <!-- content -->
    </div>
    <div class="hero-image">
      <img src="assets/images/hero-banner.svg" 
           alt="Environmental illustration" 
           class="hero-banner">
    </div>
  </div>
  
  <div class="features-preview">
    <div class="feature-card">
      <img src="assets/images/mission-recycling.svg" 
           alt="Recycling mission" 
           class="feature-image">
      <h3>Recycling Missions</h3>
    </div>
  </div>
`;
```

## Adding New Images

### 1. Add Image Files

Place new images in the appropriate folder:

- `src/assets/images/` for larger illustrations, photos, banners
- `src/assets/icons/` for small icons and symbols

### 2. Supported Formats

- **SVG** (recommended for icons and illustrations - scalable, small file size)
- **PNG** (for photos with transparency)
- **JPG/JPEG** (for photos without transparency)
- **WebP** (modern format with great compression)

### 3. Image Naming Convention

Use descriptive, kebab-case names:

- `logo-main.svg`
- `hero-banner-home.svg`
- `mission-solar-energy.svg`
- `icon-menu-hamburger.svg`

## Accessibility Best Practices

### 1. Always Use Alt Text

```html
<!-- Good -->
<img src="assets/images/logo.svg" alt="EcoMinds company logo" />

<!-- Bad -->
<img src="assets/images/logo.svg" />
```

### 2. Descriptive Alt Text

```html
<!-- Generic -->
<img src="assets/images/mission-recycling.svg" alt="recycling" />

<!-- Descriptive -->
<img
  src="assets/images/mission-recycling.svg"
  alt="Illustration showing recycling bins and the recycling process"
/>
```

### 3. Decorative Images

For purely decorative images, use empty alt text:

```html
<img src="assets/images/decorative-border.svg" alt="" role="presentation" />
```

## Performance Optimization

### 1. Image Optimization

- Use SVG for simple graphics and icons
- Optimize image file sizes before adding to project
- Consider using WebP format for modern browsers

### 2. Lazy Loading

For images below the fold:

```html
<img src="assets/images/hero-banner.svg" alt="Hero banner" loading="lazy" />
```

### 3. Responsive Images

```html
<picture>
  <source media="(max-width: 768px)" srcset="assets/images/hero-mobile.svg" />
  <source media="(min-width: 769px)" srcset="assets/images/hero-desktop.svg" />
  <img src="assets/images/hero-desktop.svg" alt="Hero banner" />
</picture>
```

## Troubleshooting

### Common Issues:

1. **Image not displaying**: Check the file path and ensure the image exists in `src/assets/`
2. **404 errors**: Make sure `src/assets` is listed in `angular.json` under `"assets"`
3. **Images too large**: Add CSS to control image size
4. **Blurry images**: Use appropriate image dimensions and avoid upscaling

### Build Verification:

Your images are automatically included in the build process. The `angular.json` configuration includes:

```json
"assets": ["src/assets"]
```

This ensures all files in the assets folder are copied to the build output.

## Next Steps

1. Replace placeholder SVGs with your actual brand images
2. Add more mission-specific illustrations
3. Create icon sets for navigation and UI elements
4. Consider adding image optimization tools to your build process

Your EcoMinds project is now fully set up to handle images efficiently and accessibly!
