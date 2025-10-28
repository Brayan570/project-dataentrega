// dashboard_comprador.js
// Verificar autenticación
function checkAuth() {
    const user = localStorage.getItem('confio_user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    
    try {
        const userData = JSON.parse(user);
        if (userData.type !== 'comprador') {
            window.location.href = 'login.html';
            return null;
        }
        return userData;
    } catch (error) {
        window.location.href = 'login.html';
        return null;
    }
}

// Al inicio del DOMContentLoaded en dashboard_comprador.js
document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (!user) return;
    
    // El resto de tu código actual...
    // Actualizar nombre de usuario en la interfaz
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = user.name;
    }
    // Datos de productos
    const products = {
        1: {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "👟 Calzado Deportivo",
            title: "Zapatos Running Nike Air Max",
            price: "$89.99",
            rating: "⭐ 4.8 (124 reseñas)",
            description: "Zapatos deportivos ideales para running con tecnología de amortiguación Air Max. Perfectos para entrenamientos intensos. Características: - Material transpirable - Suela de goma duradera - Tecnología Air Max para máxima amortiguación - Disponible en tallas 38-45"
        },
        2: {
            image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "📱 Electrónica",
            title: "iPhone 14 Pro Max 256GB",
            price: "$1,199.99",
            rating: "⭐ 4.9 (89 reseñas)",
            description: "El último iPhone con cámara profesional, pantalla Always-On y chip A16 Bionic. Color Negro Espacial. Especificaciones: - Pantalla Super Retina XDR de 6.7 - Cámara principal de 48MP - Batería para todo el día - iOS 16 preinstalado"
        },
        3: {
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "🎧 Audio",
            title: "Auriculares Sony WH-1000XM4",
            price: "$349.99",
            rating: "⭐ 4.7 (203 reseñas)",
            description: "Auriculares inalámbricos con cancelación de ruido líder en la industria. Hasta 30 horas de batería. Características: - Cancelación de ruido adaptativa - Asistente de voz integrado - Carga rápida (10 min = 5 horas) - Control táctil intuitivo"
        },
        4: {
            image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "📚 Libros",
            title: "Hábitos Atómicos - James Clear",
            price: "$24.99",
            rating: "⭐ 4.8 (567 reseñas)",
            description: "Un método fácil y probado para construir buenos hábitos y dejar los malos. Edición en español. Contenido: - Las 4 leyes del cambio de comportamiento - Cómo construir sistemas efectivos - Ejemplos prácticos y aplicables"
        }
    };

    let currentProductId = null;

    // Navegación entre secciones
    function showSection(sectionName) {
        console.log('Cambiando a sección:', sectionName);
        
        // Ocultar todas las secciones
        const sections = ['catalogo', 'pedidos', 'favoritos', 'configuracion'];
        sections.forEach(section => {
            const element = document.getElementById(section + '-section');
            if (element) {
                element.style.display = 'none';
            }
        });
        
        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        // Actualizar navegación activa
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNav = document.querySelector(`.nav-item a[href="#${sectionName}"]`);
        if (activeNav) {
            activeNav.closest('.nav-item').classList.add('active');
        }
    }

    // Funciones para modales
    function openProductModal(productId) {
        currentProductId = productId;
        const product = products[productId];
        
        if (product) {
            document.getElementById('modalProductImage').src = product.image;
            document.getElementById('modalProductCategory').textContent = product.category;
            document.getElementById('modalProductTitle').textContent = product.title;
            document.getElementById('modalProductPrice').textContent = product.price;
            document.getElementById('modalProductRating').textContent = product.rating;
            document.getElementById('modalProductDescription').textContent = product.description;
            
            document.getElementById('productModal').style.display = 'flex';
        }
    }

    function closeProductModal() {
        document.getElementById('productModal').style.display = 'none';
    }

    function openPurchaseModal() {
        closeProductModal();
        document.getElementById('purchaseModal').style.display = 'flex';
    }

    function closePurchaseModal() {
        document.getElementById('purchaseModal').style.display = 'none';
    }

    // Funciones para pedidos
    function viewOrderDetails(orderId) {
        const orders = {
            1: {
                product: "Zapatos Running Nike Air Max",
                date: "15 Dic, 2024",
                status: "Entregado ✅",
                address: "Cra 45 #26-85, Bogotá",
                payment: "Tarjeta de crédito",
                tracking: "ENT-7842"
            },
            2: {
                product: "iPhone 14 Pro Max 256GB",
                date: "16 Dic, 2024",
                status: "En camino 🚚",
                address: "Calle 123 #45-67, Medellín",
                payment: "PayPal",
                tracking: "ENT-7841"
            }
        };
        
        const order = orders[orderId];
        if (order) {
            alert(`Detalles del pedido #${orderId}\n\n` +
                `Producto: ${order.product}\n` +
                `Fecha: ${order.date}\n` +
                `Estado: ${order.status}\n` +
                `Dirección: ${order.address}\n` +
                `Método de pago: ${order.payment}\n` +
                `N° de seguimiento: ${order.tracking}`);
        }
    }

    function trackOrder(orderId) {
        alert(`Seguimiento del pedido #${orderId}\n\n` +
            `Estado: En camino 🚚\n` +
            `Ubicación actual: Centro de distribución\n` +
            `Estimado de entrega: 20 Dic, 2024\n` +
            `Repartidor: Juan Pérez - 300 123 4567\n\n` +
            `Puedes rastrear tu pedido en tiempo real en nuestra app.`);
    }

    function buyAgain(productId) {
        openProductModal(productId);
    }

    // Manejar envío del formulario de compra
    document.addEventListener('DOMContentLoaded', function() {
        const purchaseForm = document.getElementById('purchaseForm');
        if (purchaseForm) {
            purchaseForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (currentProductId && products[currentProductId]) {
                    const productName = products[currentProductId].title;
                    alert(`¡Compra realizada exitosamente!\n\n` +
                        `Producto: ${productName}\n` +
                        `Recibirás un correo de confirmación pronto.\n` +
                        `Puedes ver el estado de tu pedido en la sección "Mis Pedidos".`);
                    
                    closePurchaseModal();
                    this.reset();
                }
            });
        }
        
        // Cerrar modales al hacer clic fuera
        window.onclick = function(event) {
            const productModal = document.getElementById('productModal');
            const purchaseModal = document.getElementById('purchaseModal');
            
            if (event.target === productModal) {
                closeProductModal();
            }
            if (event.target === purchaseModal) {
                closePurchaseModal();
            }
        }
        
        // Inicializar - Mostrar catálogo por defecto
        showSection('catalogo');
    });
});
// Función de logout - AGREGAR ESTO AL FINAL
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('confio_user');
        localStorage.removeItem('confio_remember');
        window.location.href = 'login.html';
    }
}

//  global
window.logout = logout;
// Hacer funciones globales para los onclick del HTML
window.showSection = showSection;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.openPurchaseModal = openPurchaseModal;
window.closePurchaseModal = closePurchaseModal;
window.viewOrderDetails = viewOrderDetails;
window.trackOrder = trackOrder;
window.buyAgain = buyAgain;


