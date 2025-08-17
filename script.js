// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
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
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Update navigation and cart count
    updateNavigation();
    updateCartCount();
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'menu.html':
            initMenuPage();
            break;
        case 'order.html':
            initOrderPage();
            break;
        case 'login.html':
            initLoginPage();
            break;
        case 'register.html':
            initRegisterPage();
            break;
        case 'cart.html':
            initCartPage();
            break;
        case 'orders.html':
            initOrdersPage();
            break;
        case 'test.html':
            initMenuPage(); // Use menu page functionality for testing
            break;
    }
});

// Home page functionality
function initHomePage() {
    // Add fade-in class to elements
    document.querySelectorAll('.featured-item, .about-content, .about-image, .menu-preview-item').forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Force show featured items immediately if they're not visible
    setTimeout(() => {
        document.querySelectorAll('.featured-item').forEach(el => {
            if (el.classList.contains('fade-in') && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
        
        // Force show about preview elements immediately if they're not visible
        document.querySelectorAll('.about-content, .about-image').forEach(el => {
            if (el.classList.contains('fade-in') && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
        
            // Force show menu preview elements immediately if they're not visible
    document.querySelectorAll('.menu-preview-item').forEach(el => {
        if (el.classList.contains('fade-in') && !el.classList.contains('visible')) {
            el.classList.add('visible');
        }
        // Force remove fade-in class to ensure visibility
        el.classList.remove('fade-in');
    });
    
    // Force show menu preview section
    document.querySelectorAll('.menu-preview, .menu-preview-grid').forEach(el => {
        el.classList.remove('fade-in');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.display = 'block';
        el.style.visibility = 'visible';
    });
    }, 100);
}

// Menu page functionality
function initMenuPage() {
    
    const menuItems = [
        // Bánh ngọt (Pastries)
        {
            id: 1,
            name: 'Macaron',
            description: 'Bánh macaron truyền thống Pháp với nhiều hương vị',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'pastries'
        },
        {
            id: 2,
            name: 'Croissant',
            description: 'Bánh sừng bò Pháp giòn xốp, thơm bơ',
            price: 35000,
            image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'pastries'
        },
        {
            id: 3,
            name: 'Éclair',
            description: 'Bánh éclair với kem sữa trứng và chocolate',
            price: 55000,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'pastries'
        },
        {
            id: 4,
            name: 'Pain au Chocolat',
            description: 'Bánh sừng bò nhân chocolate đen',
            price: 40000,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'pastries'
        },
        {
            id: 5,
            name: 'Brioche',
            description: 'Bánh brioche mềm mại với hương vị bơ thơm',
            price: 38000,
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'pastries'
        },
        {
            id: 6,
            name: 'Chausson aux Pommes',
            description: 'Bánh táo hình trăng lưỡi liềm truyền thống',
            price: 42000,
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'pastries'
        },
        
        // Bánh kem (Cakes)
        {
            id: 7,
            name: 'Tarte Tatin',
            description: 'Bánh táo caramel truyền thống Pháp',
            price: 85000,
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'cakes'
        },
        {
            id: 8,
            name: 'Gâteau au Chocolat',
            description: 'Bánh chocolate đen mềm mại với ganache',
            price: 95000,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'cakes'
        },
        {
            id: 9,
            name: 'Tarte aux Fraises',
            description: 'Bánh dâu tây tươi với kem vanilla',
            price: 78000,
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'cakes'
        },
        {
            id: 10,
            name: 'Mille-Feuille',
            description: 'Bánh ngàn lớp với kem vanilla và đường bột',
            price: 68000,
            image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'cakes'
        },
        {
            id: 11,
            name: 'Opéra Cake',
            description: 'Bánh opera với chocolate, cà phê và hạnh nhân',
            price: 88000,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'cakes'
        },
        {
            id: 12,
            name: 'Tarte au Citron',
            description: 'Bánh chanh tươi với meringue Ý',
            price: 72000,
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'cakes'
        },
        
        // Tráng miệng (Desserts)
        {
            id: 13,
            name: 'Crème Brûlée',
            description: 'Kem trứng caramel với lớp đường cháy',
            price: 65000,
            image: 'data:image/jpeg;base64,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',
            category: 'desserts'
        },
        {
            id: 14,
            name: 'Mousse au Chocolat',
            description: 'Kem chocolate mịn màng với hương vị đậm đà',
            price: 58000,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'desserts'
        },
        {
            id: 15,
            name: 'Profiteroles',
            description: 'Bánh choux nhỏ với kem vanilla và chocolate',
            price: 62000,
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'desserts'
        },
        {
            id: 16,
            name: 'Tarte Tatin aux Poires',
            description: 'Bánh lê caramel với kem vanilla',
            price: 75000,
            image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'desserts'
        },
        {
            id: 17,
            name: 'Crème Caramel',
            description: 'Kem caramel mềm mại với nước sốt caramel',
            price: 52000,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'desserts'
        },
        {
            id: 18,
            name: 'Soufflé au Chocolat',
            description: 'Bánh soufflé chocolate nóng với kem vanilla',
            price: 68000,
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            category: 'desserts'
        }
    ];

    const menuContainer = document.querySelector('.menu-grid');
    
    if (menuContainer) {
        displayMenuItems(menuItems);
        
        // Add category filter functionality
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                if (category === 'all') {
                    displayMenuItems(menuItems);
                } else {
                    const filteredItems = menuItems.filter(item => item.category === category);
                    displayMenuItems(filteredItems);
                }
            });
        });
    }
}

function displayMenuItems(items) {
    const menuContainer = document.querySelector('.menu-grid');
    if (!menuContainer) return;

    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-price">${formatPrice(item.price)}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id}, '${item.name}', ${item.price}, '${item.image}')">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart functionality
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showMessage('Đã thêm vào giỏ hàng!', 'success');
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // You can add a cart icon with count in the navigation if needed
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            if (window.location.pathname.includes('cart.html')) {
                displayCart();
            }
        }
    }
}

// Cart page functionality
function initCartPage() {
    displayCart();
}

function displayCart() {
    const cartContainer = document.querySelector('.cart-container');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Giỏ hàng trống</h2>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                <a href="menu.html" class="btn btn-primary">Xem Menu</a>
            </div>
        `;
        return;
    }

    const cartItems = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span class="cart-item-price">${formatPrice(item.price)}</span>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: #e74c3c;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartContainer.innerHTML = `
        <h2>Giỏ hàng</h2>
        ${cartItems}
        <div class="cart-total">
            <h3>Tổng cộng: ${formatPrice(total)}</h3>
            <button class="btn btn-primary" onclick="checkout()">Thanh toán</button>
        </div>
    `;
}

// Order page functionality
function initOrderPage() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    // Handle delivery time selection
    const deliveryTimeSelect = document.getElementById('deliveryTime');
    const specificTimeGroup = document.getElementById('specificTimeGroup');
    
    if (deliveryTimeSelect && specificTimeGroup) {
        deliveryTimeSelect.addEventListener('change', function() {
            if (this.value === 'specific') {
                specificTimeGroup.style.display = 'block';
            } else {
                specificTimeGroup.style.display = 'none';
            }
        });
    }
    
    // Initialize new features
    initBillingAddress();
    initCreditCardValidation();
    initCreditCardExpiryValidation();
    initCreditCardCvvValidation();
    
    // Display order summary
    displayOrderSummary();
}

function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    if (!orderSummary) return;
    
    if (cart.length === 0) {
        orderSummary.innerHTML = `
            <div class="empty-cart">
                <p>Giỏ hàng trống</p>
                <a href="menu.html" class="btn btn-primary">Xem Menu</a>
            </div>
        `;
        return;
    }
    
    const cartItems = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-info">
                <h4>${item.name}</h4>
                <p>Số lượng: ${item.quantity}</p>
            </div>
            <span class="summary-item-price">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 200000 ? 0 : 15000; // Free delivery for orders over 200k
    const total = subtotal + deliveryFee;
    
    orderSummary.innerHTML = `
        ${cartItems}
        <div class="summary-divider"></div>
        <div class="summary-item">
            <span>Tạm tính:</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-item">
            <span>Phí giao hàng:</span>
            <span>${deliveryFee === 0 ? 'Miễn phí' : formatPrice(deliveryFee)}</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-item summary-total">
            <span>Tổng cộng:</span>
            <span>${formatPrice(total)}</span>
        </div>
    `;
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Kiểm tra giỏ hàng
    if (cart.length === 0) {
        showMessage('Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.', 'error');
        return;
    }
    
    // Kiểm tra đăng nhập
    if (!currentUser) {
        showMessage('Vui lòng đăng nhập để đặt hàng!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }

    // Lấy dữ liệu form
    const formData = new FormData(e.target);
    const customerName = formData.get('customerName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    
    // Validation
    if (!customerName || !phone || !address) {
        showMessage('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }
    
    const orderData = {
        id: Date.now().toString(), // Tạo ID duy nhất cho đơn hàng
        customerName: customerName,
        phone: phone,
        email: formData.get('email'),
        address: address,
        deliveryTime: formData.get('deliveryTime'),
        specificTime: formData.get('specificTime'),
        notes: formData.get('notes'),
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        deliveryFee: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 200000 ? 0 : 15000,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 200000 ? 0 : 15000),
        orderDate: new Date().toISOString(),
        status: 'pending',
        userId: currentUser.id
    };

    // Hiển thị loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const loading = submitBtn.querySelector('.loading');
    
    btnText.style.display = 'none';
    loading.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Simulate order processing
    showMessage('Đang xử lý đơn hàng...', 'success');
    
    setTimeout(() => {
        // Lưu đơn hàng vào localStorage (có thể thay bằng API call thực tế)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart after successful order
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Reset form
        e.target.reset();
        
        // Hiển thị thông báo thành công
        showMessage('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', 'success');
        
        // Reset button
        btnText.style.display = 'inline-block';
        loading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Redirect to orders page after 3 seconds
        setTimeout(() => {
            window.location.href = 'orders.html';
        }, 3000);
    }, 2000);
}

// Orders page functionality
function initOrdersPage() {
    if (!currentUser) {
        showMessage('Vui lòng đăng nhập để xem lịch sử đơn hàng!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    displayOrders();
}

function displayOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    if (!ordersContainer) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter(order => order.userId === currentUser.id);
    
    if (userOrders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-orders">
                <i class="fas fa-shopping-bag"></i>
                <h3>Chưa có đơn hàng nào</h3>
                <p>Bạn chưa có đơn hàng nào. Hãy khám phá menu và đặt hàng ngay!</p>
                <a href="menu.html" class="btn btn-primary">Xem Menu</a>
            </div>
        `;
        return;
    }
    
    // Sắp xếp đơn hàng theo thời gian mới nhất
    userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    const ordersHTML = userOrders.map(order => {
        const orderDate = new Date(order.orderDate);
        const formattedDate = orderDate.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const itemsHTML = order.items.map(item => `
            <div class="order-item">
                <div>
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-details">Số lượng: ${item.quantity}</div>
                </div>
                <span class="order-item-price">${formatPrice(item.price * item.quantity)}</span>
            </div>
        `).join('');
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-number">Đơn hàng #${order.id.slice(-6)}</div>
                        <div class="order-date">${formattedDate}</div>
                    </div>
                    <span class="order-status ${order.status}">${getStatusText(order.status)}</span>
                </div>
                
                <div class="order-details">
                    <h4>Thông tin giao hàng</h4>
                    <div class="order-info">
                        <div class="order-info-item">
                            <span class="order-info-label">Tên khách hàng</span>
                            <span class="order-info-value">${order.customerName}</span>
                        </div>
                        <div class="order-info-item">
                            <span class="order-info-label">Số điện thoại</span>
                            <span class="order-info-value">${order.phone}</span>
                        </div>
                        <div class="order-info-item">
                            <span class="order-info-label">Địa chỉ</span>
                            <span class="order-info-value">${order.address}</span>
                        </div>
                        ${order.email ? `
                        <div class="order-info-item">
                            <span class="order-info-label">Email</span>
                            <span class="order-info-value">${order.email}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="order-items">
                    <h4>Sản phẩm đã đặt</h4>
                    ${itemsHTML}
                </div>
                
                <div class="order-total">
                    <span>Tổng cộng:</span>
                    <span>${formatPrice(order.total)}</span>
                </div>
            </div>
        `;
    }).join('');
    
    ordersContainer.innerHTML = ordersHTML;
}

function getStatusText(status) {
    switch(status) {
        case 'pending':
            return 'Chờ xử lý';
        case 'processing':
            return 'Đang xử lý';
        case 'shipping':
            return 'Đang giao';
        case 'completed':
            return 'Hoàn thành';
        case 'cancelled':
            return 'Đã hủy';
        default:
            return 'Chờ xử lý';
    }
}

// Login page functionality
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Add real-time validation
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                const emailError = document.getElementById('emailError');
                if (emailError && emailError.style.display === 'block') {
                    emailError.style.display = 'none';
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const passwordError = document.getElementById('passwordError');
                if (passwordError && passwordError.style.display === 'block') {
                    passwordError.style.display = 'none';
                }
            });
        }
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Clear previous error messages
    clearLoginErrors();

    // Validation
    let hasErrors = false;
    
    if (!email || email.trim() === '') {
        showLoginError('emailError', 'Vui lòng nhập email');
        hasErrors = true;
    }
    
    if (!password || password.trim() === '') {
        showLoginError('passwordError', 'Vui lòng nhập mật khẩu');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Simulate login process
    showMessage('Đang đăng nhập...', 'success');
    
    setTimeout(() => {
        // For demo purposes, accept any email/password
        currentUser = {
            email: email,
            name: email.split('@')[0]
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showMessage('Đăng nhập thành công!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1000);
}

function showLoginError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearLoginErrors() {
    const errorElements = document.querySelectorAll('#loginForm .error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Register page functionality
function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Add real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                const nameError = document.getElementById('nameError');
                if (nameError && nameError.style.display === 'block') {
                    nameError.style.display = 'none';
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                const emailError = document.getElementById('emailError');
                if (emailError && emailError.style.display === 'block') {
                    emailError.style.display = 'none';
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const passwordError = document.getElementById('passwordError');
                if (passwordError && passwordError.style.display === 'block') {
                    passwordError.style.display = 'none';
                }
            });
        }
        
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', () => {
                const confirmPasswordError = document.getElementById('confirmPasswordError');
                if (confirmPasswordError && confirmPasswordError.style.display === 'block') {
                    confirmPasswordError.style.display = 'none';
                }
            });
        }
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Clear previous error messages
    clearRegisterErrors();

    // Validation
    let hasErrors = false;
    
    if (!name || name.trim() === '') {
        showRegisterError('nameError', 'Vui lòng nhập họ và tên');
        hasErrors = true;
    }
    
    if (!email || email.trim() === '') {
        showRegisterError('emailError', 'Vui lòng nhập email');
        hasErrors = true;
    }
    
    if (!password || password.trim() === '') {
        showRegisterError('passwordError', 'Vui lòng nhập mật khẩu');
        hasErrors = true;
    } else if (password.length < 6) {
        showRegisterError('passwordError', 'Mật khẩu phải có ít nhất 6 ký tự');
        hasErrors = true;
    }
    
    if (!confirmPassword || confirmPassword.trim() === '') {
        showRegisterError('confirmPasswordError', 'Vui lòng xác nhận mật khẩu');
        hasErrors = true;
    } else if (password && confirmPassword && password !== confirmPassword) {
        showRegisterError('confirmPasswordError', 'Mật khẩu xác nhận không khớp');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Simulate registration process
    showMessage('Đang đăng ký...', 'success');
    
    setTimeout(() => {
        // For demo purposes, create user account
        const newUser = {
            name: name,
            email: email,
            password: password // In real app, this should be hashed
        };
        
        // Store user data (in real app, this would go to a database)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        showMessage('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 1000);
}

function showRegisterError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearRegisterErrors() {
    const errorElements = document.querySelectorAll('#registerForm .error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert message at the top of the page
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(messageDiv, container.firstChild);

    // Auto remove message after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

function checkout() {
    if (!currentUser) {
        showMessage('Vui lòng đăng nhập để thanh toán!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    if (cart.length === 0) {
        showMessage('Giỏ hàng trống!', 'error');
        return;
    }

    // Redirect to order page
    window.location.href = 'order.html';
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showMessage('Đã đăng xuất!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Update navigation based on user login status
function updateNavigation() {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const userDropdown = document.getElementById('userDropdown');
    const userNameText = document.getElementById('userNameText');
    const logoutLink = document.getElementById('logoutLink');
    const ordersLink = document.querySelector('a[href="orders.html"]');
    
    if (currentUser) {
        // Hide login and register links
        if (loginLink) {
            loginLink.style.display = 'none';
        }
        if (registerLink) {
            registerLink.style.display = 'none';
        }
        
        // Show user dropdown
        if (userDropdown) {
            userDropdown.style.display = 'block';
        }
        if (userNameText) {
            userNameText.textContent = currentUser.name;
        }
        if (logoutLink) {
            logoutLink.onclick = logout;
        }
        if (ordersLink) {
            ordersLink.style.display = 'inline';
        }
    } else {
        // Show login and register links
        if (loginLink) {
            loginLink.style.display = 'inline';
            loginLink.textContent = 'Đăng nhập';
            loginLink.href = 'login.html';
            loginLink.onclick = null;
        }
        if (registerLink) {
            registerLink.style.display = 'inline';
        }
        
        // Hide user dropdown
        if (userDropdown) {
            userDropdown.style.display = 'none';
        }
        if (ordersLink) {
            ordersLink.style.display = 'none';
        }
    }
    
    // Highlight current menu item
    highlightCurrentMenuItem();
}

// Highlighted menu item functionality
function highlightCurrentMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Automatic billing address input functionality
function initBillingAddress() {
    const billingAddressCheckbox = document.getElementById('sameAsShipping');
    const shippingAddress = document.getElementById('address');
    const billingAddress = document.getElementById('billingAddress');
    
    if (billingAddressCheckbox && shippingAddress && billingAddress) {
        // Auto-fill billing address when checkbox is checked
        billingAddressCheckbox.addEventListener('change', function() {
            if (this.checked) {
                billingAddress.value = shippingAddress.value;
                billingAddress.disabled = true;
                billingAddress.style.backgroundColor = '#f8f9fa';
            } else {
                billingAddress.disabled = false;
                billingAddress.style.backgroundColor = 'white';
                billingAddress.value = '';
            }
        });
        
        // Auto-fill when shipping address changes (if checkbox is checked)
        shippingAddress.addEventListener('input', function() {
            if (billingAddressCheckbox.checked) {
                billingAddress.value = this.value;
            }
        });
    }
}

// Adaptive credit card length functionality
function initCreditCardValidation() {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardTypeDisplay = document.getElementById('cardType');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            const cardNumber = this.value.replace(/\s/g, '');
            const cardInfo = detectCardType(cardNumber);
            
            // Update max length based on card type
            this.maxLength = cardInfo.maxLength;
            
            // Format card number with spaces
            this.value = formatCardNumber(cardNumber, cardInfo.type);
            
            // Display card type
            if (cardTypeDisplay) {
                cardTypeDisplay.textContent = cardInfo.type;
                cardTypeDisplay.className = `card-type ${cardInfo.type.toLowerCase()}`;
            }
            
            // Validate card number
            validateCardNumber(cardNumber, cardInfo.type);
        });
        
        // Add card type icons
        if (cardTypeDisplay) {
            cardTypeDisplay.innerHTML = '<i class="fas fa-credit-card"></i> <span>Card Type</span>';
        }
    }
}

function detectCardType(cardNumber) {
    // Remove all non-digits
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    // Visa: starts with 4
    if (/^4/.test(cleanNumber)) {
        return { type: 'Visa', maxLength: 19 }; // 16 digits + 3 spaces
    }
    // Mastercard: starts with 51-55 or 2221-2720
    else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7][2-9][0-9]/.test(cleanNumber)) {
        return { type: 'Mastercard', maxLength: 19 }; // 16 digits + 3 spaces
    }
    // American Express: starts with 34 or 37
    else if (/^3[47]/.test(cleanNumber)) {
        return { type: 'American Express', maxLength: 17 }; // 15 digits + 2 spaces
    }
    // Discover: starts with 6011, 622126-622925, 644-649, 65
    else if (/^6(?:011|5)/.test(cleanNumber) || /^622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[0-1][0-9]|92[0-5])/.test(cleanNumber) || /^64[4-9]/.test(cleanNumber)) {
        return { type: 'Discover', maxLength: 19 }; // 16 digits + 3 spaces
    }
    // JCB: starts with 2131, 1800, or 35
    else if (/^(?:2131|1800|35)/.test(cleanNumber)) {
        return { type: 'JCB', maxLength: 19 }; // 16 digits + 3 spaces
    }
    // Diners Club: starts with 300-305, 36, or 38
    else if (/^3(?:0[0-5]|[68])/.test(cleanNumber)) {
        return { type: 'Diners Club', maxLength: 17 }; // 14 digits + 3 spaces
    }
    // UnionPay: starts with 62
    else if (/^62/.test(cleanNumber)) {
        return { type: 'UnionPay', maxLength: 19 }; // 16 digits + 3 spaces
    }
    
    // Default
    return { type: 'Unknown', maxLength: 19 };
}

function formatCardNumber(cardNumber, cardType) {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    switch (cardType) {
        case 'American Express':
            // Format: XXXX XXXXXX XXXXX
            return cleanNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
        case 'Diners Club':
            // Format: XXXX XXXXXX XXXX
            return cleanNumber.replace(/(\d{4})(\d{6})(\d{4})/, '$1 $2 $3');
        default:
            // Format: XXXX XXXX XXXX XXXX
            return cleanNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    }
}

function validateCardNumber(cardNumber, cardType) {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    const cardError = document.getElementById('cardNumberError');
    
    if (!cardError) return;
    
    // Check length based on card type
    let expectedLength;
    switch (cardType) {
        case 'American Express':
            expectedLength = 15;
            break;
        case 'Diners Club':
            expectedLength = 14;
            break;
        default:
            expectedLength = 16;
    }
    
    if (cleanNumber.length > 0 && cleanNumber.length !== expectedLength) {
        cardError.textContent = `${cardType} cards must have ${expectedLength} digits`;
        cardError.style.display = 'block';
    } else {
        cardError.style.display = 'none';
    }
    
    // Luhn algorithm validation (basic implementation)
    if (cleanNumber.length === expectedLength) {
        if (isValidLuhn(cleanNumber)) {
            cardError.style.display = 'none';
        } else {
            cardError.textContent = 'Invalid card number';
            cardError.style.display = 'block';
        }
    }
}

function isValidLuhn(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost side
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return (sum % 10) === 0;
}

// Credit card expiry validation
function initCreditCardExpiryValidation() {
    const expiryInput = document.getElementById('cardExpiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            // Format as MM/YY
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            this.value = value;
            validateExpiryDate(value);
        });
    }
}

function validateExpiryDate(expiryDate) {
    const expiryError = document.getElementById('cardExpiryError');
    if (!expiryError) return;
    
    if (!expiryDate || expiryDate.length < 5) {
        expiryError.style.display = 'none';
        return;
    }
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) {
        expiryError.textContent = 'Tháng không hợp lệ';
        expiryError.style.display = 'block';
        return;
    }
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        expiryError.textContent = 'Thẻ đã hết hạn';
        expiryError.style.display = 'block';
        return;
    }
    
    expiryError.style.display = 'none';
}

// Credit card CVV validation
function initCreditCardCvvValidation() {
    const cvvInput = document.getElementById('cardCvv');
    const cardNumberInput = document.getElementById('cardNumber');
    
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            // Only allow digits
            this.value = this.value.replace(/\D/g, '');
            
            // Set max length based on card type
            const cardNumber = cardNumberInput ? cardNumberInput.value.replace(/\s/g, '') : '';
            const cardInfo = detectCardType(cardNumber);
            
            if (cardInfo.type === 'American Express') {
                this.maxLength = 4; // Amex has 4-digit CVV
            } else {
                this.maxLength = 3; // Other cards have 3-digit CVV
            }
            
            validateCvv(this.value, cardInfo.type);
        });
    }
}

function validateCvv(cvv, cardType) {
    const cvvError = document.getElementById('cardCvvError');
    if (!cvvError) return;
    
    if (!cvv) {
        cvvError.style.display = 'none';
        return;
    }
    
    const expectedLength = cardType === 'American Express' ? 4 : 3;
    
    if (cvv.length !== expectedLength) {
        cvvError.textContent = `CVV phải có ${expectedLength} chữ số`;
        cvvError.style.display = 'block';
        return;
    }
    
    if (!/^\d+$/.test(cvv)) {
        cvvError.textContent = 'CVV chỉ được chứa chữ số';
        cvvError.style.display = 'block';
        return;
    }
    
    cvvError.style.display = 'none';
}


