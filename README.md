# Hamzify - Affiliate Marketing Website

A comprehensive, high-class affiliate marketing website for Hamzify, featuring Amazon-style design with full mobile responsiveness.

## Features

### Design
- **Amazon-inspired Design**: Professional e-commerce styling with modern aesthetics
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **High-Class UI/UX**: Clean, intuitive interface with smooth animations
- **Mobile-First Approach**: Touch-friendly navigation and interactions

### Pages
1. **index.html** - Main landing page with:
   - Hero section with animated background
   - Featured categories grid
   - Product showcase with cards
   - Flash deals with countdown timer
   - Features section
   - Blog preview
   - Newsletter signup
   - Comprehensive footer

2. **blog.html** - Blog post page with:
   - Hero banner with article info
   - Full article content
   - Product embed cards
   - Pros/cons comparison
   - Author bio box
   - Social sharing
   - Sidebar widgets
   - Related products
   - Related articles

### Interactive Features
- Mobile hamburger menu with slide-in drawer
- Sticky header with scroll effects
- Product card hover animations
- Wishlist functionality with toast notifications
- Countdown timer for flash deals
- Scroll reveal animations
- Smooth scroll navigation
- Lazy loading for images
- Search functionality
- Newsletter subscription
- Social media sharing

### Technical Stack
- **Pure HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** - No frameworks required
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family

## File Structure

```
/
├── index.html              # Main landing page
├── blog.html               # Blog post page
├── design.md               # Design documentation
├── README.md               # This file
├── css/
│   └── styles.css          # All styles (responsive included)
├── js/
│   └── script.js           # All JavaScript functionality
└── images/
    ├── product-1.jpg       # Wireless Bluetooth Earbuds
    ├── product-2.jpg       # Smart Fitness Watch
    ├── product-3.jpg       # Laptop Stand
    ├── product-4.jpg       # LED Desk Lamp
    ├── product-5.jpg       # Backpack
    ├── product-6.jpg       # Wireless Mouse
    ├── product-7.jpg       # Phone Holder
    ├── product-8.jpg       # USB-C Hub
    ├── deal-1.jpg          # Noise Cancelling Headphones
    ├── deal-2.jpg          # Action Camera
    ├── deal-3.jpg          # Security Camera
    ├── deal-4.jpg          # Bluetooth Speaker
    ├── blog-1.jpg          # Tech Gadgets Article
    ├── blog-2.jpg          # Fitness Tracker Article
    ├── blog-3.jpg          # Home Office Article
    ├── blog-hero.jpg       # Blog hero banner
    └── author.jpg          # Author avatar
```

## Affiliate Integration

The website is designed for integration with:
- **Digistore24** - Digital products marketplace

### Adding Affiliate Links

Replace the `#` in product buttons with your actual affiliate links:

```html
<!-- Example product card button -->
<a href="YOUR_AFFILIATE_LINK_HERE" class="btn btn-add-cart" target="_blank" rel="noopener">
    <i class="fas fa-shopping-cart"></i> View Deal
</a>
```

For Digistore24 links, use the format:
```
https://www.checkout-ds24.com/content/PRODUCT-ID/CONTENT-LINK-ID/YOUR-AFFILIATE-ID/CAMPAIGNKEY
```

## Customization

### Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --primary-blue: #007185;
    --primary-dark: #131921;
    --accent-orange: #ff9900;
    --success-green: #067d62;
    /* ... more variables */
}
```

### Products
To add/modify products, edit the product grid in `index.html`:

```html
<div class="product-card">
    <div class="product-badge">-20%</div>
    <div class="product-image">
        <img src="images/your-product.jpg" alt="Product Name">
    </div>
    <div class="product-info">
        <span class="product-category">Category</span>
        <h3 class="product-title">Product Name</h3>
        <div class="product-price">
            <span class="current-price">$49.99</span>
            <span class="original-price">$62.49</span>
        </div>
        <a href="affiliate-link" class="btn btn-add-cart">View Deal</a>
    </div>
</div>
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Opera 67+

## Performance

- Optimized images with lazy loading
- Minified CSS and JS (when deployed)
- GPU-accelerated animations
- Responsive images
- Efficient CSS Grid and Flexbox layouts

## Accessibility

- Semantic HTML5 markup
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- `prefers-reduced-motion` support

## SEO

- Semantic HTML structure
- Meta tags for description
- Alt tags for images
- Proper heading hierarchy
- Fast loading times
- Mobile-friendly design

## Deployment

1. Upload all files to your web server
2. Ensure the domain points to the correct directory
3. Update affiliate links with your tracking IDs
4. Test all functionality
5. Submit sitemap to search engines

## License

This template is created for Hamzify. All images are AI-generated for demonstration purposes.

## Support

For questions or support, contact: hamzajdoon71@gmail.com

---

**Note**: This website contains affiliate links. We may earn a commission when you purchase through our links at no extra cost to you.

