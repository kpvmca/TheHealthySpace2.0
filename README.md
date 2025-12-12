# The Healthy Space 2.0 - Restaurant Website

A modern, elegant, and responsive website for The Healthy Space 2.0 restaurant.

## Features

- **Modern Design**: Clean, classy, and professional design with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Menu**: Filter menu items by category (Chinese, Vegetable, Rice, Thali, Parathe, Sandwich, Beverages, Pizza, Snacks)
- **Order System**: Place orders directly via WhatsApp
  - Real-time menu item validation
  - Automatic order summary with total calculation
  - Quantity tracking for duplicate items
  - WhatsApp integration for order submission
- **Reservation System**: Contact form for table reservations
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile-Friendly Navigation**: Hamburger menu for mobile devices
- **Gallery Section**: Showcase of restaurant offerings
- **About Section**: Restaurant story and features

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Playfair Display & Inter)

## File Structure

```
Restaurant-Webpage/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
├── menuData.js     # Menu items and prices data
└── README.md       # This file
```

## How to Use

1. **Configure WhatsApp Number**: Update the WhatsApp number in `script.js` (see Customization section)
2. Open `index.html` in your web browser
3. Navigate through the different sections using the navigation menu
4. Filter menu items by clicking on the category tabs
5. **Place an Order**:
   - Click on "Order Now" in the navigation or hero section
   - Fill in your name, mobile number, and delivery address
   - Enter menu items separated by commas (e.g., "Hakka Noodles, Veg Fried Rice, Paneer Paratha")
   - The system will validate items and show an order summary
   - Click "Order Now via WhatsApp" to send the order
6. Fill out the reservation form to book a table

## Customization

### WhatsApp Number Configuration
**Important:** Update the WhatsApp number in `script.js` to receive orders:

1. Open `script.js`
2. Find the line: `const whatsappNumber = '919876543210';`
3. Replace `919876543210` with your restaurant's WhatsApp number
4. Format: Country code + number (without + or spaces)
   - Example: For Indian number 9876543210, use `919876543210`
   - Example: For US number (555) 123-4567, use `15551234567`

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2d5016;
    --secondary-color: #5a8f3a;
    --accent-color: #8bc34a;
    /* ... */
}
```

### Content
- Update restaurant information in `index.html`
- Modify menu items in `menuData.js` (all menu items and prices are stored here)
- Add your own images to the gallery section
- Update contact information in the contact section

### Menu Items
All menu items are stored in `menuData.js`. To add or modify items:
1. Open `menuData.js`
2. Find the relevant category (chinese, vegetable, rice, etc.)
3. Add or modify items in the format: `{ name: "Item Name", price: 100 }`
4. The menu will automatically update on the webpage

### Fonts
The website uses Google Fonts. You can change fonts by updating the font links in the `<head>` section of `index.html`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

---

**The Healthy Space 2.0** - Where Flavor Meets Wellness


