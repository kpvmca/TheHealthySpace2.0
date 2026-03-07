// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Generate Menu Items from menuData
function generateMenuItems() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    // Category mapping for display
    const categoryMap = {
        'chinese': 'Chinese',
        'vegetable': 'Vegetable',
        'rice': 'Rice',
        'thali': 'Thali',
        'parathe': 'Parathe',
        'sandwich': 'Sandwich',
        'shake': 'Beverages',
        'pizza': 'Pizza',
        'pasta': 'Snacks',
        'fries': 'Snacks',
        'garlicBread': 'Snacks',
        'coldCoffee': 'Beverages',
        'maggi': 'Snacks',
        'hotCoffee': 'Beverages',
        'momos': 'Snacks',
        'chai': 'Beverages'
    };

    Object.keys(menuData).forEach(category => {
        menuData[category].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.setAttribute('data-category', category);

            // Map to display category
            let displayCategory = categoryMap[category] || category;
            if (displayCategory === 'Beverages') {
                menuItem.setAttribute('data-display-category', 'beverages');
            } else if (displayCategory === 'Snacks') {
                menuItem.setAttribute('data-display-category', 'snacks');
            } else {
                menuItem.setAttribute('data-display-category', category);
            }

            // Display name (remove Cold/Hot prefix for cleaner display in some cases)
            let displayName = item.name;
            if (item.name.startsWith('Cold ')) {
                displayName = item.name.replace('Cold ', '') + ' (Cold)';
            } else if (item.name.startsWith('Hot ')) {
                displayName = item.name.replace('Hot ', '') + ' (Hot)';
            }

            menuItem.innerHTML = `
                <div class="menu-item-content">
                    <h3>${displayName}</h3>
                    <p>${displayCategory}</p>
                    <span class="price">₹${item.price}</span>
                </div>
            `;
            menuGrid.appendChild(menuItem);
        });
    });
}

// Initialize menu when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateMenuItems);
} else {
    generateMenuItems();
}

// Menu items are generated but not displayed - they're used for search functionality only
// Menu filtering is not needed since items are searched via autocomplete

// Form Submission
const reservationForm = document.getElementById('reservation-form');
const gamesOptions = document.getElementById('games-options');
const optionRadios = document.querySelectorAll('input[name="option"]');
const gameRadios = document.querySelectorAll('input[name="game"]');

// Handle option radio button changes
optionRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.value === 'games') {
            gamesOptions.style.display = 'block';
            // Make game selection required
            gameRadios.forEach(gameRadio => {
                gameRadio.required = true;
            });
        } else {
            gamesOptions.style.display = 'none';
            // Remove required from game radios
            gameRadios.forEach(gameRadio => {
                gameRadio.required = false;
                gameRadio.checked = false;
            });
        }
    });
});

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);

        // Construct WhatsApp message
        let messageText = `*New Reservation/Inquiry from Website*\n\n`;
        messageText += `*Name:* ${data.name}\n`;
        messageText += `*Email:* ${data.email}\n`;
        messageText += `*Phone:* ${data.phone}\n`;

        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            if (selectedOption.value === 'games') {
                const selectedGame = document.querySelector('input[name="game"]:checked');
                const gameName = selectedGame ? selectedGame.value.charAt(0).toUpperCase() + selectedGame.value.slice(1) : 'Not selected';
                messageText += `*Booking Type:* Games (${gameName})\n`;
            } else {
                messageText += `*Booking Type:* Dine Table\n`;
            }
        }

        // Date and time might be empty if browser doesn't support required on hidden inputs properly or logic flow
        // But they are required in HTML
        messageText += `*Date:* ${data.date}\n`;
        messageText += `*Time:* ${data.time}\n`;
        messageText += `*Guests:* ${data.guests}\n`;

        if (data.requests && data.requests.trim() !== '') {
            messageText += `*Special Requests:* ${data.requests}\n`;
        }

        const waNumber = '918171180744';

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show local alert
        alert('Request sent to WhatsApp!');

        // Reset form
        reservationForm.reset();
        gamesOptions.style.display = 'none';
        gameRadios.forEach(gameRadio => {
            gameRadio.required = false;
        });
    });
}

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items and gallery items
document.querySelectorAll('.menu-item, .gallery-item, .feature').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Set minimum date for reservation form to today
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Order Form Functionality - Cart System
const orderForm = document.getElementById('order-form');
const itemSearchInput = document.getElementById('item-search');
const autocompleteSuggestions = document.getElementById('autocomplete-suggestions');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const totalAmount = document.getElementById('total-amount');
const totalQuantity = document.getElementById('total-quantity');
const orderMessage = document.getElementById('order-message');

// WhatsApp phone number (update with your restaurant's WhatsApp number)
const whatsappNumber = '916262266191'; // Replace with actual WhatsApp number (format: country code + number without +)

// Cart to store selected items
let cart = [];

// Search menu items and show suggestions
function searchMenuItems(query) {
    if (!query || query.trim().length < 1) {
        autocompleteSuggestions.classList.remove('show');
        autocompleteSuggestions.innerHTML = '';
        return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const matches = [];

    // Search through menu lookup
    for (const key in menuLookup) {
        const menuItem = menuLookup[key];
        const itemName = menuItem.name.toLowerCase();

        // Check if query matches item name
        if (itemName.includes(normalizedQuery) || normalizedQuery.split(' ').every(word => itemName.includes(word))) {
            matches.push(menuItem);
        }
    }

    // Limit to 10 suggestions
    const limitedMatches = matches.slice(0, 10);

    if (limitedMatches.length > 0) {
        displaySuggestions(limitedMatches);
    } else {
        autocompleteSuggestions.classList.remove('show');
        autocompleteSuggestions.innerHTML = '<div class="suggestion-item"><span>No items found</span></div>';
    }
}

// Display autocomplete suggestions
function displaySuggestions(matches) {
    autocompleteSuggestions.innerHTML = '';
    matches.forEach(item => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'suggestion-item';

        // Check if item is already in cart
        const existingItem = cart.find(cartItem => cartItem.name.toLowerCase() === item.name.toLowerCase());
        const inCartText = existingItem ? ` (In cart: ${existingItem.quantity})` : '';

        suggestionDiv.innerHTML = `
            <div class="suggestion-item-name">${item.name}${inCartText}</div>
            <div class="suggestion-item-price">₹${item.price}</div>
        `;
        suggestionDiv.addEventListener('click', () => {
            addToCart(item);
            itemSearchInput.value = '';
            autocompleteSuggestions.classList.remove('show');
            autocompleteSuggestions.innerHTML = '';
        });
        autocompleteSuggestions.appendChild(suggestionDiv);
    });
    autocompleteSuggestions.classList.add('show');
}

// Add item to cart
function addToCart(menuItem) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name.toLowerCase() === menuItem.name.toLowerCase());

    if (existingItemIndex !== -1) {
        // Increment quantity if item exists
        cart[existingItemIndex].quantity += 1;
        cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * cart[existingItemIndex].price;
    } else {
        // Add new item to cart
        cart.push({
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
            totalPrice: menuItem.price
        });
    }

    updateCartDisplay();
    showMessage(`${menuItem.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    showMessage('Item removed from cart', 'success');
}

// Update quantity of item in cart
function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        removeFromCart(index);
        return;
    }

    cart[index].totalPrice = cart[index].quantity * cart[index].price;
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">No items added yet. Search and add items above.</p>';
        cartTotal.style.display = 'none';
        return;
    }

    cartItems.innerHTML = '';
    let totalBill = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        totalBill += item.totalPrice;
        totalItems += item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} each</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">₹${item.totalPrice}</div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItemDiv);
    });

    totalAmount.textContent = totalBill;
    totalQuantity.textContent = totalItems;
    cartTotal.style.display = 'block';
}

// Make functions globally accessible for onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// Show message
function showMessage(message, type = 'error') {
    orderMessage.textContent = message;
    orderMessage.className = `form-message ${type}`;
    orderMessage.style.display = 'block';

    setTimeout(() => {
        orderMessage.style.display = 'none';
    }, 3000);
}

// Search input event listener
if (itemSearchInput) {
    itemSearchInput.addEventListener('input', function () {
        const query = this.value;
        searchMenuItems(query);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (e) {
        if (!itemSearchInput.contains(e.target) && !autocompleteSuggestions.contains(e.target)) {
            autocompleteSuggestions.classList.remove('show');
        }
    });

    // Handle Enter key
    itemSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstSuggestion = autocompleteSuggestions.querySelector('.suggestion-item');
            if (firstSuggestion) {
                firstSuggestion.click();
            }
        }
    });
}

// Handle order form submission
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('customer-name').value.trim();
        const phone = document.getElementById('customer-phone').value.trim();
        const address = document.getElementById('customer-address').value.trim();

        // Validate phone number
        if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
            showMessage('Please enter a valid 10-digit mobile number.', 'error');
            return;
        }

        // Validate cart
        if (cart.length === 0) {
            showMessage('Please add at least one item to your cart.', 'error');
            return;
        }

        // Calculate totals
        let totalBill = 0;
        let totalItems = 0;
        cart.forEach(item => {
            totalBill += item.totalPrice;
            totalItems += item.quantity;
        });

        // Create order message for WhatsApp
        let orderMessageText = `*Order from The Healthy Space 2.0*\n\n`;
        orderMessageText += `*Customer Details:*\n`;
        orderMessageText += `Name: ${name}\n`;
        orderMessageText += `Mobile: ${phone}\n`;
        orderMessageText += `Address: ${address}\n\n`;
        orderMessageText += `*Order Items:*\n`;

        cart.forEach((item, index) => {
            if (item.quantity > 1) {
                orderMessageText += `${index + 1}. ${item.name} x${item.quantity} - ₹${item.totalPrice}\n`;
            } else {
                orderMessageText += `${index + 1}. ${item.name} - ₹${item.price}\n`;
            }
        });

        orderMessageText += `\n*Total Items: ${totalItems}*\n`;
        orderMessageText += `*Total Amount: ₹${totalBill}*\n\n`;
        orderMessageText += `Thank you for your order!`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(orderMessageText);

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        // Show success message
        showMessage('Opening WhatsApp... Your order is being processed!', 'success');

        // Reset form and cart after a delay
        setTimeout(() => {
            orderForm.reset();
            cart = [];
            updateCartDisplay();
            itemSearchInput.value = '';
            autocompleteSuggestions.classList.remove('show');
            orderMessage.style.display = 'none';
        }, 2000);
    });
}