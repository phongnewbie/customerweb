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
            image: 'data:image/jpeg;base64,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',
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
            image: 'data:image/jpeg;base64,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',
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
        ,
        // Món ăn thêm (Food)
        {
            id: 19,
            name: 'Bánh Crêpe Pháp',
            description: 'Crêpe mỏng nhân dâu tây và sốt chocolate',
            price: 59000,
            image: 'data:image/jpeg;base64,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',
            category: 'desserts'
        },
        // Đồ uống (Drinks)
        {
            id: 20,
            name: 'Trà Hoa Hồng Đá',
            description: 'Trà hương hoa hồng thanh mát với lát chanh',
            price: 39000,
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop',
            category: 'drinks'
        },
        // Đồ uống bổ sung (More Drinks)
        {
            id: 21,
            name: 'Cà Phê Sữa Đá',
            description: 'Cà phê đậm vị kết hợp sữa đặc, thêm đá mát lạnh',
            price: 32000,
            image: 'https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=1200&auto=format&fit=crop',
            category: 'drinks'
        },
        {
            id: 22,
            name: 'Latte Nóng',
            description: 'Espresso thơm nồng với sữa nóng béo mịn',
            price: 42000,
            image: 'https://images.unsplash.com/photo-1503481766315-7a586b20f66d?q=80&w=1200&auto=format&fit=crop',
            category: 'drinks'
        },
        {
            id: 23,
            name: 'Cappuccino',
            description: 'Espresso, sữa nóng và lớp bọt sữa dày',
            price: 42000,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
            category: 'drinks'
        },
        {
            id: 24,
            name: 'Trà Earl Grey',
            description: 'Trà đen thơm bergamot, dùng nóng',
            price: 35000,
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200&auto=format&fit=crop',
            category: 'drinks'
        },
        {
            id: 25,
            name: 'Trà Chanh Mật Ong',
            description: 'Trà ấm với chanh tươi và mật ong, dịu cổ họng',
            price: 38000,
            image: 'data:image/jpeg;base64,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',
            category: 'drinks'
        },
        {
            id: 26,
            name: 'Nước Cam Ép',
            description: 'Cam tươi vắt nguyên chất, giàu vitamin C',
            price: 36000,
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhMVFRUVFRUVFhUXFxUXFRcVFxUWFhcVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EADgQAAEDAgQDBgMIAwADAQAAAAEAAhEDBAUSITFBUWEGEyJxgZEyobFCUmLB0eHw8SNyghQzU0P/xAAbAQACAwEBAQAAAAAAAAAAAAAABAECAwUGB//EADURAAICAQQBAwMCBgECBwAAAAABAgMRBBIhMUEFIlETMmGBkRQjQnGhsfBS0RUkMzRiksH/2gAMAwEAAhEDEQA/APWTiPtz4LmvV/sO/QOc7c3/APhYwH4ngyJMgAmNOsKJ27sIxuhthk4i6DnsL2t8Q0cI0d1jgVXAiYYcZIMhvLkVRp5LoMsBJ0bKhoGendiLxjKTw5zW+IaTp8I1/nJM03QrT3PBvTXKazFHSUcQpP8Ahe0+oTEdRXLpmrpnHtBAdKupZM2hkOQYHBUqWSMDypDAigCKgkcFTkgquGkjeFjNbkXi8MxMSrNY3KHCVxvUNRCuO2MuTo6aEpvLRiPeCei8zbbmWTpqLSOhwO6AbBOgE+S9J6RrEoOLfCWTk6ypt5NKjcMqatIK7VOqrtWYMRnTKHaJEJjcjPDKqxMIBAdR5VWaICxBxIKys5RtU8M4PFMNcXS0kLnTojJ8o6kNRJLhgtLC6nFyqtJX8F3q7Pk3cNs8mvFbwohHpGFmonLtnT2V4diU3CWBCcUalOst0xZoua9WTKAFjcgVqlLlDh5H9wrEGnKAGlBAkAJACUgcRWvSdQ/UfZHHXrsvESt3c5PWQpxw0YHaS/Ja0awHZjJPEQmdHdieGKeoaXNLa7RkHFNADrGx4xyJ4rrbjzbiV5BUOg04856qE8sMHRYfahw7ujTzOO7hJA5jy+SYWOiNrZvYX2QqxL3NbJJIPiPQaafNc+30yd9m6Twjt6TWQ01W1LLNKl2MYNXVTPQAfmpj6Kl3Nmk/V2+oILoYE5n/AK7p/rDgmY6GUPtsYu9ZGX3VoIzXNIS8MqgcW+F3sdPmtP8AzFa5xL/Bn/IseF7S22xik45Scrhu12h+amGrrk8Ph/kielsisrlfg0A6dk2nnoWaa7HhXUSuRQpwDZXUdCynJLgtGJjYjeEbcFxdXq3HODo6elPs5e4rEkkry8m5SbfZ264JIqFRV2l3EOokhvn9FC3KWEKySciFvf5X7xCbrtlGaaeC1lG6HKOls8RLgJhw5jdek02qnPl8o492nUfwHPJO0eRT0pWf0P8AQVwvIHWeB8TS3rwS79Q+m/5sWi6pz9rKKzQ4aGUzXqqrVmLK/TlHtGPcWuuoUuOTVWFIt1XaW3lzKcK6RVyLGtUlGw+2qLSLMpI0KblojFgFWzcbhtZugDHNI56gj2g+6llGwsXDzs3RGWQ5MHucVyESN1SVm3sq54D7WvnbmC0jLKLplysSJAHlDnHyOxXgtuD30YpoEvRmaQVpU9ssomdSkmmc65hGk6hdqM1KOTxWqodNrizoezmH98DnMNBALuMch1WNmojW+eyNPpZW9dHomHXVKgyKbQ0Agab8dyT5alb1ayKWR3+EfSJv7RiOR8o9omVP/icS69Pk2C1O0bmxLiTH3QAeWxkLOXqUo+f8G0fTlLx/kEqdoS4+GJ6uJbPQO/NU/j5S67/wbL09R+7onQ7Qu0DyZBMxEExAH4fP5aqI6+fUis/Tl3HGP+fuE1bllXWowEHbMdQNATO44qLLYze6S4fyZxrlXxF9DWFS4a8igC+luMxGg5SeKNPO/c/o8xJuVDhm3iR0dhiTamh0eNHNOhBXYo1UZ8Pvycu7TShyuvBfe3baTczjp9VbVaqGnhvkZ00yslticY/tBUNYv+xy6Lyb9Qt+r9TP6HoF6fBVbfJouLavipu1O7Vq5Rve6t8+UKpOp7Zr9TMrWFQknKR0/dJPS2ttuI7HUQXkYWGWMx1OzQquhxeH38EPUbvt6Np1jloO+8RPtwC7C0Kq0zz9z5Oer91y+DkLkw4rhpHfrWYk7LEHUjI9Qt6bZVS3RK3aeNqwzcGPFwBadeIKau19vEoP9DmvQJPEkF22N/e25HX2U0+qy3fzMYF7NFj7QypUoOEsc1p9vdOWvR2LNUlFi8Y3ReJLJUGtdoXNJ5ghTp9VKv2yaf6hOt94YPUtl24vdFMVbwysUYRxFZYZbHa3XmuPf6st2yhbn8+BmGn8yJkRu5o9khO7WN5lYkbKuHhE23uT7bZ6woWt1FXVuX+VwD00Z/0hVK/mM4GWd2/mE/p/WLY4+tFNfK/7CtuiX9IfWuabWZi5sc5ELvV312R3QeUc+UHDhnE4hcGvV8PwDY8/JZT9zMtuWdBgz4GVbw4NcGuFqA6AOaxHD6dyHOIDHAaPG5I+83l56ry04xvy2sfk71GpnpmlnK+Di7+1dTcWPEEex6joue4uLwz0lFsbYbomLWs3OeMujpieh3TVd2xZYh6hoVek1w0dNRqd20U2bN6ak8z1XOlOU5OTJp0kYRUUV1bo8NPJWTYx9JJYBXXJlXwW2oia7uJJ9fbdW77BQQ2dQTgvtKdRxim0nSCADt+KOHmrKEn0VsnXDmbwadG3qD43NB2guBIHk2UYecSa/cVlbCX2Rf7GrY3JpmW1InQwCfqEzTY6nmEhO6tWfdAEtaBD8/fjPn3cDr+pVILNm9S5z8Gllns2uHGPDOvc5tRmWsBP/QHmCQF257LYbbsHFW6uW6s5TGsMNGXCSznvHmQvP6nQyrlmPMTuaTVxt4k8MxWYjk1DoSqqY/KqMuy53aarEBxKY/mtYcmLPSULnBZhl68vzPOqmmKhPJFsI7MJHdWRzN1MyF6Gn3wwzgXe2XBy+PYZkcY2Orf0Xntbp3RZ+H0dnRardHkwiI0Sp1E8kqNQtMhTnBWcVJYYdTuJWE455FpV4FdVIEKsI8hXHLyTwayNV4A2Gp8l0NJpvr2qPjyZ6y6NUG32df3MaL2cIqKwjyspOTywK4cAY4D4j+S836nq3Zb9CD9q+5//AIdDT04jufb6M+7xIQWs06rlS1EVFxrWPydCrTNvMjIe8ncpd89j8YpdE3VNAqJckKPJfZ3JaRrpxC0hY4NGVtSaNB7KdwIjXeDz5hO0y9+6l4fx4ZzraWlia4HtbTKvUaO+N9e5d+Tj21fTeDTs6eqdijJmm1aFSSkDg7W+cI123nlzyj+arwsbWmnk9bbplzwSxNorMggB41B035SNIgKJWrPIaZyomn4OYtPj8gf0Uz+07E8MKJWeCMFZCsgZVCsUwJjJ0gzMRxnkFOG3hA+FlmtSsGUtavif9wGGj/Yjc9B81rNwp4fMvjwv7iDune8V8R+fn+xZUuXuETDeDW+Fo9Ak52zn2aQohDnz8vsgwLNN5NGEMqQm4TwjFxNWyugabqYAzuLQ3++m6epmnFwXZz762pqb6DbEOFZ1OoQ4RrpodOS2qUlbsm8owt2SqU4cAeJ95Rf/AI3lo3AnT2SGqc6J+1jGnVdsPcgduGsuRL6OR3/1pthp/wBm7H+arajdcvfF/wB0v9/JWdr079ksr4ZG27H1DrLMuusn6Rp5FbR9OtmuGsEy9TrXh5D2dkHD/wDRs+RWq9Kmv6kYv1RP+k1rK2NJsEynKKlWsSYndb9R5SBMZl7IAmNQjV6eN9eF+hfS2qufuOWdkeYJyv4yvLTrnW8SR3q7XjK5Q7LEcXiFnleWXd78Ii9rGbulVeX9pKlOfgrYw1HabLaumT4LOahE7DB8lNmVu/E8SvRaP6dUMLs4Gq32Tywm6vIbpqUa31B1VNx7Ma9OpS5MW/qhrcnE6krzlktle3uT5bOjRBuW7wjHqNKXTOjForedOqlLksuxg6YU4wR0WExoq4K4yWW9UtMjdCk4vKKWRUlhnT24BIP3h816T0+artT8T/2cHUxzF/KNGnThejOYWhSAkEHmgXz0940SbXjT+BHaKurPJm3ENrGNntn1nVMx91a/AxVzHDF3irg1wSzSjBVjgKChqYNRAFSrxaGhvQvJBPsHe6d03trnZ5XC/U5nqE3JwqXnv+yK6xO5XOab5Y1BJLCHtKL3bDTnwV41+SLLYx7ZrWuFgnxEk8grx+lu8t/gSt1TXRqU8PpM3Z7rWzU10pZr/cTeotn0whhpt2YFkvWYRftiZSVku2WNqsmY15rSPrVbfMSjrl0Rq27XkEmT1/ZbrU6fUSTb5/JMZSgsIN/83KAC3KBx+z7rsR1UYpLwLfR3P5KX3bQS9h4S6OIbuY5xPsFavVVyk1B/krOqUfuRCpjQA4+WoOm5Mjbqsp+oxSNo6NtgNTFWuIEnjt14yQOqQs10ZtDMdLKKBad5BMHTkkKtbOmblB8fBvOhSXIrvC6dwJAhy7lMqtZDKWJfAsrJ6eWH0YF1gjmmDPuUrZpNnaOhXq4y6KGYcGlLTSijdWZNC302Srvb4QNGhbPIKISaZhZFNB1erJYOqnVTT2L8isY4UjIxSoTUcldQ82Nj+mjitAWeFljJvjJfa0g8xrPCExp6VbLa+zG2bgshdVtKAGb7T+nNdG3TVKGI9i0J25zLoAczKYPBcecXFuI5GWVwTbW5CFTAOBs4bcksPNpkeS6Gmtkq38x5Odqa0pceTo2r20HuimefksNodXIEgDzKV8+we8GeEIlGJjlxkdTd+ItPr/Sf00N0ZIs5KGGMyuocMGzkF0ysZFGy9n9KCrNjBKo8THGGvAbPJwMtJ6aexKc0sovdXLqX+zleoJpxsj3H/RpUcJ1JeNvs/qonW4ZyuTGerWPazescF2L9B90fmntP6U54lf8A/U51ut8Q/c2KVBrRDQAuxXRXWsQSQhKcpPlmZih4aepA+W64XrG2Sxx+rHdMZL3LyVqSlx/gfiuBhUVcrjgNoZRyk/E33j6wujRp6JyTcl++BabaXTDAw7RIPqPU7Lr11yg1Bcp/85F9y7M2/p93mj7bSAOn2j5Rp5kK8a3pnO6XHGEvya7vq7Yfk5Z1Y/zf3XHcm+z0UaooZryqslwQTRqKnRlOBq2d1lM/zyXQ02odUlJCF1KksM2nNFRs8CvRq1XwUl0ctJ1ywZVzhMahc+zS45Q7DUsEdbRwSM6PkZjaJrYSzi49l85L3nVhHNZ3ZzFr5M0uJAuMtAftvBU6xL6vHk10jzAzCUtgbDLOuWneBrsBKY01zrmnngXuhuRLCMNIBqPqePgN4HAea60JVuLnu5F7rnlQUeCF06TOh9IXGvnvm2M1LEUigHosDVmvhVXwv8kxRZshNNeBHUR9yOnt/hb5D6L3GleaYP8ACPPWr3snCYMxQpA8zAXz6ct0snuorCwRqHTVEey6OZ7S276rQ2mJIdJHSCPzXU0Mowbcil8ZSilErsWVGtAqtyuGmvGOKveot5iTXKW33dmpRqJKUS+QhtVUxgszVwWHF7fwz6g7/NWTeRHWe2KZ2eEhxa1zfGAAcpMEHUeF3HyK7WkUpJSxnB5y9xTx1k1WXzSYMtPJ3h+ex9F046mDeHw/hizraCcunP6LbGVkpk5zFmxU9F4f1yONR+h19K/YBQuLkZFCCck2NlXjCU/tWSjkkF0Kbm66gfL9119LpLasWTk0vhP/AGK2SjLhIljujXEyXZJJ6mYAHBdf1OT2YfbS/wAkaKOZLHycWVwT0o7QoZDLaaqykgpj1Xc1wYtG92crTmYfMfQ/ku56Ja25Vv8AujleoQxiSNh9Jd9wOcpAdxaylLaMjNduDOq2hSM9M3xgajciNa0dknlqsLvT5yrePBaF8d+PkGvaBqsDm7tEEJCX86GV3HhmtU/pScX5MUhLHQJM2lQ/ghkqjiW6bgyERfJTCzySI4queQ6HAB3UEZN/DrGGhs6uifL+l1qNE5xUc8y/0cy+/Lb8I6JoXsYrakjiN5eREKxUUIA8yK+enuweu+FpBZLrgrs3tp03VXOiTvyA0HqTOi6lNbxwhS6+MX7ng4rH8aDnkszHrsnadM32KWeq1pYisj4P2ga6Gv8AC7rsfVZ6jROPMeg03qEJvD4Ojp1gVzXFo60ZJmt2ergV2gnRzXN99fyVG9q3MW1sd1Twej4e8NptgRlMPHQzDh0Xd018Y1RlH9Ty1ibk0zSc0EagEe66TjCxcpNC6yvwU/8AhtHw5m/6kj5LB6Otfa2v7Mv9SXnkBv7TWdXeZXH9R0Gfe/cN02+OgPux936/quP9Cv8A6f8An7jGX8iDRyCNtceor9g5+S6km6ZpIzmg2mJgu0a3YcXFdStOxxnNYjHx8i0njKj2zE7TXPhPNx18uS5PqGq+rZhf8/B0vTqvcvwctKRO4SBUEFjCqso0XNKzZm0bXZof5v8Ak/kup6L/AO5/RnO9R/8AS/U6gtXsFE4e4rdTU/TXkPqMrNNG1E7mRFJQ4olTeTGuqRou0+B3yXmtdpZ6ee+H2vs6tViuh+UZl7h0+KkJB4clz5VRse6rkbq1G3iZnvYW+EjbdKyTTaY0pJrKHadFVkMemVDIfRp0LCPE7bdbRpcUpT6FJ3Z4QZa3r23baT25WvplzHcyDqOhiPdem9Mqml9WfnpfCOVqJprYjo12xEdSVFKAPLqjl8+SPeIwcdxRtJpJ32A5ldDS6d2SwhfVaiNMNzK7TFm17VrHu+Bpim0H45PieeP7BeiUUobUeTutlZZvkcniNISdCs1wCZj1rY8oW8bCMBdpilWlpOYcj+qxs09dg7TrbauO0buCdpR39LMCDnaPcxv6pHUaD+XJL4OhH1KNi2yPasPvdAD+681RrJ0PD5RlbSnyjWtq5HwO/wCSu3ptesfyp/oxGdX/AFILbdu4s9jK6cNdP+qH7MxdS8Mrr15EZSstTq3OOFBloQw85A+7PIrjOq2T4ixjdFeSTbU8dPNXWisfMsIh2otbkZuZK3jbptPy3lmb3zBbu9J0C5eu9Tste2HCN6tOlyzmu0VfUD+bLGuPuZ2NBDhsxu8W206O0Ls7SpU1a3TmdB6c1V4QtbfXXw2a1HAn8XfL91dae2XURGevj4ReMEcOPy/dUekv/wCkz/jk/BoYJQ7moS8xIgHhun/SrI6a9u/28d+BTW2O6CUUdGV7BNSSaON0QcFJJCFBORQgMg16wFpBWVsVKOGbVScZZRyVe4NJ2kwvL6nQyrnvpO9HbbHEiTsRo1DLgAfOEjfZJv3w5JVE4fax2dxB69Vip1+Yshq4nTNMfC2TzRnn2R/chxsf3MvbUIIcdY4JiEJRanPnHgo4JraH0rvPGgMa+XkuvTrJS5iKWUJdmnSrZhyPJdmjUKfD4ZzrKnEvTZgJAHj2JXzabZcfIcT5Lw9NMpvg93KSRwuNVjUeCeA09f6C7unioRwec9TscrEieG3BYIBcJ3ggT5pqMjlNhtp3YY+rU8RECmw65nk7v/CBJ6mOqjjDYKRh1wTqqrg03FPdq2S2TT7P9nqlw6WiGsIl3XcAKl1+yIzpqt8svo9dw6qYAO40PmN14rUQxJnXxk06dVKNYMpQCad0RsVpC+2H2yZjKqL8F7b53Nbr1LULyZuiIjeu5ofqWof9QfQiVPuSeKXnqLZ9suqkip1VZGigUVaivFGkYnKY9dl1UNGpge5XX01fs3M62lioQbZtYHgUw6oJPL7I8+ZRCNl8ttfXyI6zXY9sTfubltHQCXfIJuyyrR+2KzI5tdUrefAI/FnmCCB0gJOXqV7fDwbrSR8iqYo+dNFFnqN0nnOAjpYJFlLFJ0e0Ecwrw1+7i2OUVlpWuYs0aVd1OC3Vh4fpyT1d92knur90H4/7CU642LD4ZqUqoeA5p0K9Pp74XwU4PKEJxcXhiIWxUSgECXTlhZbGKGK4tnOYjSzcFx9RbJ9HXpwjDq2Wuq508y7HYzSHp2kcEu4uLLb8mlbt0VomMmFUiroxk8lracGQYKlQw8x4KuWeGaVvVB1O/RdOqxNZkJzi/AWyuSYaNOZXQqvtm8QXHyKTrhFZl2ESuiKHgAwqtUJc8PJ/1J9F5xTiuEj1krMkMRwGo1mcMeQBJJboB5rWuzJytety3LwYkJlM5GST6k6cBsjJGSEKNxcItrRph1UltOeGr3cw0fnsqOT6j2N6fTufMuEddY4ozustFhpsboC6APOZ1K51tc92W8nZrjCMcI38IrS3yP8AU9Vx9XDEzU16b0i0Qy5rlRoo0WZ1XBXAsyMEYGzIwTgg56skWSA7mstoRyMVwAuz2G97WdWcNJ06Db5rqKO/FS68k6u/6de1HS314Gju2SI3I+gVtTqY1x+jTx8s5lNLk98jKqPLtzrz5rluTby+R+MVEqBUMuO4qECQ7Xc/ZSQ1kOtcQcCJ25fomqdVKt4lzH4FbdPFrjs2batkeDMsfHvwK7Gnv/hL1h+yf+H4OdbX9SPPaNZej35EdpAqrky6SBqzVhNGkZGdXopOyDGoTAKlslZVG6tZDuAs3WnwyfqMXdQsZVbSynkUKmC2S1jSrpFWygYrTbWFCZflDzyDSY347FdCjSt4lLoVstXSOgt6vBduCSWEc2eW8svzrQzPPa+MO3p+LjlJhxPvovJKTb46PS/TXkoOKl4/yMfT0OhLQ0zz1JI84V5SxwnkPpo4fFMINN2ZkOYSS2DPppylP0zco88M4Wqo+nPjoCbZGRIInaGuProNldtYzkyhTZN8I26OEU266VXcASGNnkRv/Nkm7ZSeFwjrVaKFazLlh1xYue1veUQfwtMgergPkq8Qb2sdTysNFd3b080vcGkQ1okQBwytOg9kbp9LknEV2H9n75peabSTH2jxIMFI62qW1SZMZJ9HUUnLjyRYuaVm0BOVGCMD5kEYGLkJE4B6tRaRiaRiZty/McvNMwWFkagsLJ0tEdxQEASdPXmnoz+hp9/mXRx5fz7n8Izqj82vE/VcptyeWOxjtWCqIQXEROyn+4J4HqNP0VtjTwRFojUOsBRtx2Wj1ljgFVbIbRtWcOpZQdQunWlfp9kXyjm3ZjZufk27CtmYCd9j5jReh0F7tojJ99P+6OdbDbNouKdUslCh4VGuSyKqlIqko5LRkCVKCWlUaqYO6isnA0UiPdFUdbZZSE6mG7n04ojpc9A7sFZl3QJ6nSRjyxed2Tme1lDuq9pdDQBxovjk8S2fUEeqccfaL7+TsLV2gPNXiZyDA5aFDzAsoEhzqOo5tE+8rzKUorGT0O5Nk31KFQEOZUjaHAx9dVEYbXwTvI2xt2CG28c8rWtH1lXblLtlcIm/Emj4aJI5OMR1GhUbUu2TubBq2JVDoykxs7n9FXfBeScSBHVbhwh1TTbQAfTiod0F0i2x+SpmGc5J6yVT60n9pZQS7NCwtsjgQIj6LOdcpLktleDpqRXItjhkIvYUu0STlQSLMgCDnqUiUB16i2gjaIJZeKqB1H1TEo+00m8QZ1WMsIazSQPqmtfCUaq0cjSSTnIxyFyjo5HDuakjHwGsoeDMC0yREzw+L5LraXSxlXuk00+hSdnvwX1WMexxHhc0RmPHiYG/qmtTRVKpyjw0jKMrIzWeUzIgDbVefbOim2PKgMB+EPIfHMFN6GbjbheRXVxThk3sJJh45P8AqAu56U2ozi/EjmajGU/wGuK6rfwYYGV08kYwNCnkhlbmKrWSU8FFUAakqjiXUgF9zOjR6lTCpvsJTSKm0CTJTCgjFzChRWuDNyMjtjhvf2VZgEuDc7P96fjb8wjHBGeQjspeCtbUqg1zMafLTZESZG3lCuVPOW0QvLyZ30J1NUyWIZEZJIOpIyTkQtCeCPoSfKD6qRayzCuqUirsbLRQC1wkVyxzSUEphNu9cTUrbNo3XIU0pFkomCowSMShICp7lZIsgG5cmII0TKsL/wDaD1H1TV8dtUWDeVJHW4vUIDRJHqjW2SxGPg52lgm2ZDnlc7A+opDNJUxXPAPCNfDu7LZ0zzGkxrsT7L0WgtrnD3fcc3UKcZcdArbRrZe4Nzn4dweoJB1WV0o1wbeM+DVTlJqK68gZPRcB9jqRH0QWNPCiM22sbpzQSxZ1kR1Ke01cMPxn8X5Lr+lNtWP/AOQlf4/sHyusLilSngjBXUuWt3KsrU3jyGxgdW9c7RggcyrqMpfgh4RU23J+IkraNeDKU8l7KIC0UUZuTZItViBQjAChAHP9maTaNa4tmnRlQVGjUZW1fHl8gZ2UeSTpVJXJ5+GleVZ6EWQoSbDOCxlqTut4aaUuykrUghlsAm4URijCVjZaKa12lMkHUUvZDBrCWStzIWTRpkqqOVGWI03arla6Puyb19BbHLmtFycqAGJQSU1HK6RZANwUxBZL5KbdxDg5O3Qcq8fBWLWWdjUZ3tLMDqNfkldk7qnY/AjGX0rdplkAdUjnI9nJW8SpRdcEqTy3bQyCrRnKLyisop9kqtUu34aq07JT+4rGCj0RaVnjJdoREKA7NXCBo50RAXR0SUYzs+EIapvKia2Ej/HJ+0SfyH0XY9Kjt0+5+W2I6h5nheC24vGt03PRPSs5xFZM1D5BXPe/oFZaec+ZMHZGPQ9Oy56pqumMekLytbCWUAEwkkZtkyxSVIlqAIlqAI5UAIhAHPYgwUr6jVzx3zDRczmWS5rgekxHVQwR0akk41loeK4ENK/6jsSuXgvbRATUKox6MnNskGLTBXI4YpK5JBqMAI05VZxyi0XgHqUuaQmmnhjMXkZtuOSrgvkCu6WstMHhOx6FK2wjJ7WbQlwJlYjRzS0+4PkQudbo7IPrJplMvFQJRwa7DInPQoklFw8tEkH2OvkmYaax+CVOPyZr87jqMrfu/aPnyCcVSqXPZG7cFUWwIWkXlckv8HQYDdCDTKVjL6UnCX2sw1MN2JorvbctcRw4eSRsrdb2s2qsUog/VUN8jNUgxAqAHAQGQmwpZ3Bp2PyW2nq+rYoGF89kdyNS6AaBSaN9/JdK2luS01P6iEZZzZMJa17gB8I2gLu1aSTilLr4FJ2xj0EsswE/CqMekLStbCWthbJGTYiFIDIIGIQAiEARIQA2VADEIAxO11tmod4BLqDm1mx8XgPjA82FwQwNW3rBzWuGoIBB5g6hCAwiEiPjZVACyoAcNUojJLIjAZGhUZZEajQVjbFYyzSDZU54hc2eoiuhpQYJWbISVlkpm0faD03vZ8JkfddqPRFepnXwWlGMuzbwvGCBDqBd/rDh7LrafWxa90M/2wI3afL4mTdjrRUkUHggRGRrVp/H0xlxD/CK/wAHNx5kZ2L3z6xmAz/rM75aBJav1H6n2rA1p9Mq/OTI7uOp5lclzk3ljuCbdU3CWUUZZTeWkEbhRbWrFgM+GdDZ3zKoyvGo91jvjxXcuPkUnVKD3VlOIWTm6gS3pw81nfpnF7o8xNqLlLh9me0anRK4z0NtrAmiVANpBtGwdUAIEa8ePVN1aSy2OULT1Ea3h8mlSa2i2PiceW56AJ2OzTrZDmbEpOVry+EE2FGJc/4j8hyXa9N0Tpi52fc/8Cept3YjHpB7V1UKMmrEDqSoyAEgBlICKAGIQA0KAFCkCFWmHNLTsQQfI6FBByeF49Qo0mUalem19Id04PeA7NTJYZB55Z8iFQkMASY8OQggfKpwA4agBOMbqs5xissmMWwWpW5JCzVZ4iMwq+SsapOU3Ls3UUiNUJS1YNIspJWRYgWyhrJOcA72FUccFk0xNcs8FsEnElXx8AilzVDLJiaVaMtrJaJSm4vPJTBEB8y3TqicFNYaLI17TFHiGu18krKq2PEHx8GMqYPk02XlMbsg+SZrtcPvqf7C0q5PhSEbymPhaJ8vzVfrPPtqf7B9OT7kM66c7Rogc0xHT6u/h+1f88Ff5cO3lhNnSA13PM/lyXX0fp9WnXHL+X2K3XSlx4DWjVdJITbLArFclikjI4UkCQAkAKVICKCBkEjIIEgBQgDz3tP2CNxdVKzSQHlpieIY0H5gqNoG7RMhcyqe5HSnHDJhalCUqXJJZZCTfRW+uOCUs1aXETaFL8gznEpCU5TfLGFFLoeFBIgqEkHhZyjlF08A5alWsGggFID5VLIyVVKIWTijVMjEKQHLAdlDWQRWbdRtwXTLaVuZ0E/z5K9blnEUVk1jkNZZjcn0H6rr1aKclmXApPUpcIuayPhAH85p6vTQr6QvK2Uu2NC3wUzgtaxWSKuRexqtgo5BdtutIowkw9i0MmO4oIHBUgTCkgQQA0KUA5KAGQAgggUIAdADEIAaEAcr3mVee+vGt8s7WzcSNfkrS1ra9pRUpdlbnE7paU5SeWzZJLoSrwAggCQapwA5aoa4BMiQqFimo1Y2RzyXi8FaxLjsCnsqJwVMF0QdSQ0l2WTZOnQJ2H881MYylxFA5JdhNO1HH9P7XRo9MlLmzgUnq0vtCGs5BdevTwrWIoTlbKXY5p81tgruHyKcEbiQYpwQ5EmsU4I3DgIIyX27oKsikg6k5aIyZJ55IIJAqQJtKkgcIAUoAUqQEggQQAigB0AJBIyCDil4hnpETprWqXgrJFhKYMxoQkQWNarYIyTaEJEEg1GOQyM5kKsokplLgq4LlZpdFjZVjlFlIbJz9h+qyeEXSLGUidAERjKbxFA5KPYRTtgNfr+i6VHpvmf7Ctmr8RLgOS6tdMILEUJSm5dknLbBTI+VSGR8qnBGR8qMBkchBAlIDwgMjs3UohmhQ2V0ZMd26AJEaKSB2KQJAoAclSAkAKUEDoATSgCSAEgCJUgcY1eHyejJ5UATKbi8oyZJoWiKsmApIJ5VbBGR5QQLfRQ/glFZprPovkhd1G06bqlR2VjRJMEwPISSrxrlZwispqPJl9m8cpXjqvctcGUi1ud27i4EyG8Btv7BNQ9MguZMxlq30joA3ZPV0wh9qFpWSl2yXBbYKZJNAA6fsPfZT4IGhBOScIwQJSA5Ckgi0QUdEZJAygCUKcEZGb8SAD6TldFGIuQBNSQMCgCQQA5UgOCoIEFICeJCAGa0cJ9zCALZQAkARQB//9k=',
            category: 'drinks'
        },
        {
            id: 27,
            name: 'Soda Chanh',
            description: 'Soda tươi mát vị chanh, giải khát tức thì',
            price: 33000,
            image: 'data:image/jpeg;base64,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',
            category: 'drinks'
        },
        {
            id: 28,
            name: 'Matcha Latte',
            description: 'Bột trà xanh Nhật Bản hoà quyện sữa béo',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1200&auto=format&fit=crop',
            category: 'drinks'
        },
        // Bánh quy (Cookies)
        {
            id: 29,
            name: 'Chocolate Chip Cookie',
            description: 'Bánh quy bơ giòn với vụn chocolate đen',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1200&auto=format&fit=crop',
            category: 'cookies'
        },
        {
            id: 30,
            name: 'Shortbread Bơ',
            description: 'Bánh quy bơ kiểu Scotland, thơm béo, tan ngay',
            price: 28000,
            image: 'https://images.unsplash.com/photo-1614102073832-030967418971?q=80&w=1200&auto=format&fit=crop',
            category: 'cookies'
        },
        {
            id: 31,
            name: 'Oatmeal Raisin Cookie',
            description: 'Yến mạch và nho khô, ngọt dịu và đậm đà',
            price: 26000,
            image: 'data:image/jpeg;base64,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',
            category: 'cookies'
        },
        {
            id: 32,
            name: 'Matcha Cookie',
            description: 'Bánh quy vị trà xanh nhẹ, thơm lừng',
            price: 27000,
            image: 'data:image/jpeg;base64,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',
            category: 'cookies'
        },
        {
            id: 33,
            name: 'Almond Biscotti',
            description: 'Biscotti hạnh nhân giòn rụm, dùng kèm cà phê',
            price: 30000,
            image: 'data:image/jpeg;base64,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',
            category: 'cookies'
        },
        {
            id: 34,
            name: 'French Sablé',
            description: 'Bánh quy sablé kiểu Pháp, bơ thơm và mịn',
            price: 29000,
            image: 'data:image/jpeg;base64,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',
            category: 'cookies'
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


