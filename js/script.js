  
    // Efecto hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .add-to-cart, .product-card, .filter-btn, .cart-icon');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.opacity = '0.5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.opacity = '1';
        });
    });
    
    // Datos de productos en Soles (PEN)
    const products = [
        {
            id: 1,
            title: "Auriculares Nebula X",
            price: 749.90,
            category: "tecnologia",
            description: "Auriculares con cancelación de ruido y sonido envolvente 3D.",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            badge: "Nuevo"
        },
        {
            id: 2,
            title: "Teclado Quantum",
            price: 559.90,
            category: "tecnologia",
            description: "Teclado mecánico con retroiluminación RGB personalizable.",
            image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            badge: "Popular"
        },
        {
            id: 3,
            title: "Libreta Cosmos",
            price: 89.90,
            category: "diseño",
            description: "Libreta de diseño premium con papel de 120gr y cubierta de tela.",
            image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            title: "Lámpara Aurora",
            price: 329.90,
            category: "diseño",
            description: "Lámpara de mesa con luz regulable y diseño minimalista.",
            image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            badge: "Oferta"
        },
        {
            id: 5,
            title: "Taza Galáctica",
            price: 49.90,
            category: "estilo",
            description: "Taza de cerámica con diseño exclusivo y cambio de color con temperatura.",
            image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 6,
            title: "Reloj Eclipse",
            price: 479.90,
            category: "estilo",
            description: "Reloj de pulsera con pantalla táctil y monitor de actividad.",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            badge: "Nuevo"
        },
        {
            id: 7,
            title: "Mochila Voyager",
            price: 299.90,
            category: "estilo",
            description: "Mochila resistente al agua con compartimento para laptop de 15\".",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 8,
            title: "Mouse Stellar",
            price: 219.90,
            category: "tecnologia",
            description: "Mouse ergonómico con 6 botones programables y sensor de alta precisión.",
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            badge: "Oferta"
        }
    ];
    
    // Variables del carrito
    let cart = [];
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notification = document.getElementById('notification');
    
    // Función para formatear precio en Soles
    function formatPrice(price) {
        return `S/ ${price.toFixed(2)}`;
    }
    
    // Mostrar productos
    function displayProducts(filter = 'all') {
        productGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.category = product.category;
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<div class="product-badge">${product.badge}</div>`;
            }
            
            productCard.innerHTML = `
                ${badgeHTML}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(product.price)}</span>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
        
        // Agregar event listeners a los botones de añadir al carrito
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    // Filtrar productos
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProducts(button.dataset.filter);
        });
    });
    
    // Añadir al carrito
    function addToCart(e) {
        const productId = parseInt(e.currentTarget.dataset.id);
        const product = products.find(p => p.id === productId);
        
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        showNotification(`${product.title} añadido al carrito`);
    }
    
    // Actualizar carrito
    function updateCart() {
        // Actualizar contador
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Actualizar lista de productos
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">${formatPrice(item.price * item.quantity)}</p>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Agregar event listeners a los controles de cantidad
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', decreaseQuantity);
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', increaseQuantity);
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', removeItem);
            });
        }
        
        // Actualizar total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = formatPrice(total);
    }
    
    // Disminuir cantidad
    function decreaseQuantity(e) {
        const productId = parseInt(e.currentTarget.dataset.id);
        const item = cart.find(item => item.id === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCart();
    }
    
    // Aumentar cantidad
    function increaseQuantity(e) {
        const productId = parseInt(e.currentTarget.dataset.id);
        const item = cart.find(item => item.id === productId);
        item.quantity += 1;
        updateCart();
    }
    
    // Eliminar item
    function removeItem(e) {
        const productId = parseInt(e.currentTarget.dataset.id);
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
    
    // Mostrar notificación
    function showNotification(message) {
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        notification.classList.add('active');
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
    
    // Finalizar compra
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Tu carrito está vacío');
            return;
        }
        
        showNotification(`Compra realizada por ${cartTotal.textContent}`);
        cart = [];
        updateCart();
        cartOverlay.classList.remove('active');
    });
    
    // Toggle carrito
    cartToggle.addEventListener('click', () => {
        cartOverlay.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });
    
    // Cerrar carrito al hacer clic fuera
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });
    
    // Inicializar
    displayProducts();
    
    // Animación de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto parallax en el hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });