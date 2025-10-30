// dashboard_comprador.js
// Verificar autenticación
function checkAuth() {
  const user = localStorage.getItem("confio_user");
  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  try {
    const userData = JSON.parse(user);
    if (userData.type !== "comprador") {
      window.location.href = "login.html";
      return null;
    }
    return userData;
  } catch (error) {
    window.location.href = "login.html";
    return null;
  }
}

// Al inicio del DOMContentLoaded en dashboard_comprador.js
document.addEventListener("DOMContentLoaded", function () {
  const user = checkAuth();
  if (!user) return;

  // El resto de tu código actual...
  // Actualizar nombre de usuario en la interfaz
  const userNameElement = document.querySelector(".user-name");
  if (userNameElement) {
    userNameElement.textContent = user.name;
  }
  // Datos de productos
  const products = {
    1: {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "👟 Calzado Deportivo",
      title: "Zapatos Running Nike Air Max",
      price: "$89.99",
      rating: "⭐ 4.8 (124 reseñas)",
      description:
        "Zapatos deportivos ideales para running con tecnología de amortiguación Air Max. Perfectos para entrenamientos intensos. Características: - Material transpirable - Suela de goma duradera - Tecnología Air Max para máxima amortiguación - Disponible en tallas 38-45",
    },
    2: {
      image:
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "📱 Electrónica",
      title: "iPhone 14 Pro Max 256GB",
      price: "$1,199.99",
      rating: "⭐ 4.9 (89 reseñas)",
      description:
        "El último iPhone con cámara profesional, pantalla Always-On y chip A16 Bionic. Color Negro Espacial. Especificaciones: - Pantalla Super Retina XDR de 6.7 - Cámara principal de 48MP - Batería para todo el día - iOS 16 preinstalado",
    },
    3: {
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "🎧 Audio",
      title: "Auriculares Sony WH-1000XM4",
      price: "$349.99",
      rating: "⭐ 4.7 (203 reseñas)",
      description:
        "Auriculares inalámbricos con cancelación de ruido líder en la industria. Hasta 30 horas de batería. Características: - Cancelación de ruido adaptativa - Asistente de voz integrado - Carga rápida (10 min = 5 horas) - Control táctil intuitivo",
    },
    4: {
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "📚 Libros",
      title: "Hábitos Atómicos - James Clear",
      price: "$24.99",
      rating: "⭐ 4.8 (567 reseñas)",
      description:
        "Un método fácil y probado para construir buenos hábitos y dejar los malos. Edición en español. Contenido: - Las 4 leyes del cambio de comportamiento - Cómo construir sistemas efectivos - Ejemplos prácticos y aplicables",
    },
  };

  let currentProductId = null;

  // Navegación entre secciones
  function showSection(sectionName) {
    console.log("Cambiando a sección:", sectionName);

    // Ocultar todas las secciones
    const sections = ["catalogo", "pedidos", "favoritos", "configuracion"];
    sections.forEach((section) => {
      const element = document.getElementById(section + "-section");
      if (element) {
        element.style.display = "none";
      }
    });

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionName + "-section");
    if (targetSection) {
      targetSection.style.display = "block";
    }

    // Actualizar navegación activa
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    const activeNav = document.querySelector(
      `.nav-item a[href="#${sectionName}"]`
    );
    if (activeNav) {
      activeNav.closest(".nav-item").classList.add("active");
    }
  }

  // Funciones para modales
  function openProductModal(productId) {
    currentProductId = productId;
    const product = products[productId];

    if (product) {
      document.getElementById("modalProductImage").src = product.image;
      document.getElementById("modalProductCategory").textContent =
        product.category;
      document.getElementById("modalProductTitle").textContent = product.title;
      document.getElementById("modalProductPrice").textContent = product.price;
      document.getElementById("modalProductRating").textContent =
        product.rating;
      document.getElementById("modalProductDescription").textContent =
        product.description;

      document.getElementById("productModal").style.display = "flex";
    }
  }

  function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
  }

  function openPurchaseModal() {
    closeProductModal();
    document.getElementById("purchaseModal").style.display = "flex";
  }

  function closePurchaseModal() {
    document.getElementById("purchaseModal").style.display = "none";
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
        tracking: "ENT-7842",
      },
      2: {
        product: "iPhone 14 Pro Max 256GB",
        date: "16 Dic, 2024",
        status: "En camino 🚚",
        address: "Calle 123 #45-67, Medellín",
        payment: "PayPal",
        tracking: "ENT-7841",
      },
    };

    const order = orders[orderId];
    if (order) {
      alert(
        `Detalles del pedido #${orderId}\n\n` +
          `Producto: ${order.product}\n` +
          `Fecha: ${order.date}\n` +
          `Estado: ${order.status}\n` +
          `Dirección: ${order.address}\n` +
          `Método de pago: ${order.payment}\n` +
          `N° de seguimiento: ${order.tracking}`
      );
    }
  }

  function trackOrder(orderId) {
    alert(
      `Seguimiento del pedido #${orderId}\n\n` +
        `Estado: En camino 🚚\n` +
        `Ubicación actual: Centro de distribución\n` +
        `Estimado de entrega: 20 Dic, 2024\n` +
        `Repartidor: Juan Pérez - 300 123 4567\n\n` +
        `Puedes rastrear tu pedido en tiempo real en nuestra app.`
    );
  }

  function buyAgain(productId) {
    openProductModal(productId);
  }

  // Manejar envío del formulario de compra
  document.addEventListener("DOMContentLoaded", function () {
    const purchaseForm = document.getElementById("purchaseForm");
    if (purchaseForm) {
      purchaseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (currentProductId && products[currentProductId]) {
          const productName = products[currentProductId].title;
          alert(
            `¡Compra realizada exitosamente!\n\n` +
              `Producto: ${productName}\n` +
              `Recibirás un correo de confirmación pronto.\n` +
              `Puedes ver el estado de tu pedido en la sección "Mis Pedidos".`
          );

          closePurchaseModal();
          this.reset();
        }
      });
    }

    // Cerrar modales al hacer clic fuera
    window.onclick = function (event) {
      const productModal = document.getElementById("productModal");
      const purchaseModal = document.getElementById("purchaseModal");

      if (event.target === productModal) {
        closeProductModal();
      }
      if (event.target === purchaseModal) {
        closePurchaseModal();
      }
    };

    // Inicializar - Mostrar catálogo por defecto
    showSection("catalogo");
  });
});
// Función de logout - AGREGAR ESTO AL FINAL
function logout() {
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    localStorage.removeItem("confio_user");
    localStorage.removeItem("confio_remember");
    window.location.href = "login.html";
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

// Fin de dashboard_comprador.js

// dashboard_comprador.js

// ======================
// DATOS DE EJEMPLO
// ======================

let productos = [
  {
    id: 1,
    nombre: "Zapatos Running Nike Air Max",
    descripcion:
      "Zapatos deportivos ideales para running con tecnología de amortiguación Air Max. Diseño moderno y cómodo para largas distancias.",
    precio: 89.99,
    categoria: "deportes",
    imagen:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviews: 124,
    vendedor: "Nike Store",
    vendedorRating: 4.9,
  },
  {
    id: 2,
    nombre: "iPhone 14 Pro Max 256GB",
    descripcion:
      "El último iPhone con cámara profesional, pantalla Always-On y chip A16 Bionic. Incluye cargador y audífonos.",
    precio: 1199.99,
    categoria: "electronica",
    imagen:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviews: 89,
    vendedor: "Tech World",
    vendedorRating: 4.8,
  },
  {
    id: 3,
    nombre: "Auriculares Sony WH-1000XM4",
    descripcion:
      "Auriculares inalámbricos con cancelación de ruido líder en la industria. Batería de 30 horas.",
    precio: 349.99,
    categoria: "electronica",
    imagen:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 203,
    vendedor: "Audio Pro",
    vendedorRating: 4.7,
  },
  {
    id: 4,
    nombre: "Hábitos Atómicos - James Clear",
    descripcion:
      "Un método fácil y probado para construir buenos hábitos y dejar los malos. Bestseller internacional.",
    precio: 24.99,
    categoria: "libros",
    imagen:
      "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviews: 567,
    vendedor: "Librería Central",
    vendedorRating: 4.9,
  },
  {
    id: 5,
    nombre: "Laptop Dell XPS 13",
    descripcion:
      "Laptop ultradelgada con procesador Intel i7, 16GB RAM y 512GB SSD. Perfecta para trabajo y estudio.",
    precio: 899.99,
    categoria: "electronica",
    imagen:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviews: 145,
    vendedor: "Tech World",
    vendedorRating: 4.8,
  },
  {
    id: 6,
    nombre: "Camiseta Deportiva Adidas",
    descripcion:
      "Camiseta de alto rendimiento con tecnología Climalite. Material transpirable y ligero.",
    precio: 34.99,
    categoria: "ropa",
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    reviews: 89,
    vendedor: "Sports Shop",
    vendedorRating: 4.6,
  },
  {
    id: 7,
    nombre: "Cafetera Nespresso",
    descripcion:
      "Cafetera automática con sistema de cápsulas. Prepara café perfecto en segundos.",
    precio: 199.99,
    categoria: "hogar",
    imagen:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 234,
    vendedor: "Home Store",
    vendedorRating: 4.8,
  },
  {
    id: 8,
    nombre: "Reloj Smartwatch Samsung",
    descripcion:
      "Smartwatch con monitor de salud, GPS y notificaciones. Resistente al agua.",
    precio: 279.99,
    categoria: "electronica",
    imagen:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviews: 178,
    vendedor: "Tech World",
    vendedorRating: 4.8,
  },
];

let pedidos = [
  {
    id: 1,
    producto: productos[0],
    fecha: "15 Dic, 2024",
    fechaEntrega: "18 Dic, 2024",
    estado: "delivered",
    total: 89.99,
    cantidad: 1,
    direccion: "Calle 123 #45-67, Bogotá",
  },
  {
    id: 2,
    producto: productos[1],
    fecha: "16 Dic, 2024",
    fechaEntrega: "20 Dic, 2024",
    estado: "pending",
    total: 1199.99,
    cantidad: 1,
    direccion: "Carrera 45 #23-12, Medellín",
  },
  {
    id: 3,
    producto: productos[2],
    fecha: "10 Dic, 2024",
    fechaEntrega: "12 Dic, 2024",
    estado: "cancelled",
    total: 349.99,
    cantidad: 1,
    direccion: "Avenida 6 #12-34, Cali",
  },
];

let favoritos = [productos[3], productos[4]];

let direcciones = [
  {
    id: 1,
    nombre: "Casa",
    direccion: "Calle 123 #45-67",
    ciudad: "Bogotá",
    codigoPostal: "110111",
    telefono: "+57 300 123 4567",
    predeterminada: true,
  },
  {
    id: 2,
    nombre: "Trabajo",
    direccion: "Carrera 45 #23-12",
    ciudad: "Bogotá",
    codigoPostal: "110121",
    telefono: "+57 300 123 4567",
    predeterminada: false,
  },
];

let metodosPago = [
  {
    id: 1,
    tipo: "credit",
    nombre: "Tarjeta de Crédito Visa",
    ultimos4: "4242",
    predeterminado: true,
  },
  {
    id: 2,
    tipo: "debit",
    nombre: "Tarjeta Débito Mastercard",
    ultimos4: "8888",
    predeterminado: false,
  },
];

let currentProduct = null;
let filtrosActivos = {
  categoria: "all",
  precioMax: "all",
  orden: "popular",
};

// ======================
// NAVEGACIÓN
// ======================

function showSection(sectionName) {
  // Ocultar todas las secciones
  document.querySelectorAll(".main-content").forEach((section) => {
    section.style.display = "none";
  });

  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.style.display = "block";
  }

  // Actualizar navegación activa
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  const activeNavItem = document.querySelector(
    `[href="#${sectionName}"]`
  )?.parentElement;
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }

  // Actualizar contenido según la sección
  if (sectionName === "catalogo") {
    renderProductos();
  } else if (sectionName === "pedidos") {
    renderPedidos();
  } else if (sectionName === "favoritos") {
    renderFavoritos();
  }
}

// ======================
// CATÁLOGO DE PRODUCTOS
// ======================

document.addEventListener("DOMContentLoaded", function () {
  renderProductos();
  setupFiltros();
  setupPurchaseForm();
});

function setupFiltros() {
  document
    .getElementById("categoryFilter")
    ?.addEventListener("change", function () {
      filtrosActivos.categoria = this.value;
      renderProductos();
    });

  document
    .getElementById("priceFilter")
    ?.addEventListener("change", function () {
      filtrosActivos.precioMax = this.value;
      renderProductos();
    });

  document
    .getElementById("sortFilter")
    ?.addEventListener("change", function () {
      filtrosActivos.orden = this.value;
      renderProductos();
    });
}

function renderProductos() {
  const grid = document.querySelector("#catalogo-section .products-grid");
  if (!grid) return;

  let productosFiltrados = [...productos];

  // Filtrar por categoría
  if (filtrosActivos.categoria !== "all") {
    productosFiltrados = productosFiltrados.filter(
      (p) => p.categoria === filtrosActivos.categoria
    );
  }

  // Filtrar por precio
  if (filtrosActivos.precioMax !== "all") {
    const maxPrecio = parseFloat(filtrosActivos.precioMax);
    productosFiltrados = productosFiltrados.filter(
      (p) => p.precio <= maxPrecio
    );
  }

  // Ordenar
  switch (filtrosActivos.orden) {
    case "price_asc":
      productosFiltrados.sort((a, b) => a.precio - b.precio);
      break;
    case "price_desc":
      productosFiltrados.sort((a, b) => b.precio - a.precio);
      break;
    case "newest":
      productosFiltrados.reverse();
      break;
    default: // popular
      productosFiltrados.sort((a, b) => b.reviews - a.reviews);
  }

  // Actualizar contador
  const counter = document.querySelector(".products-count");
  if (counter) {
    counter.textContent = `Mostrando ${productosFiltrados.length} productos`;
  }

  grid.innerHTML = productosFiltrados
    .map(
      (producto) => `
        <div class="product-card" onclick="openProductModal(${producto.id})">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                ${
                  producto.id <= 2
                    ? '<div class="product-badge">Popular</div>'
                    : ""
                }
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryIcon(
                  producto.categoria
                )} ${getCategoryName(producto.categoria)}</div>
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-description">${producto.descripcion}</p>
                <div class="product-footer">
                    <div class="product-price">$${producto.precio.toFixed(
                      2
                    )}</div>
                    <div class="product-rating">⭐ ${producto.rating} (${
        producto.reviews
      })</div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function getCategoryIcon(categoria) {
  const icons = {
    electronica: "📱",
    ropa: "👕",
    deportes: "⚽",
    hogar: "🏠",
    libros: "📚",
  };
  return icons[categoria] || "📦";
}

function getCategoryName(categoria) {
  const names = {
    electronica: "Electrónica",
    ropa: "Ropa",
    deportes: "Deportes",
    hogar: "Hogar",
    libros: "Libros",
  };
  return names[categoria] || "Otros";
}

// ======================
// MODAL DE PRODUCTO
// ======================

function openProductModal(productId) {
  const producto = productos.find((p) => p.id === productId);
  if (!producto) return;

  currentProduct = producto;

  document.getElementById("modalProductImage").src = producto.imagen;
  document.getElementById(
    "modalProductCategory"
  ).textContent = `${getCategoryIcon(producto.categoria)} ${getCategoryName(
    producto.categoria
  )}`;
  document.getElementById("modalProductTitle").textContent = producto.nombre;
  document.getElementById(
    "modalProductPrice"
  ).textContent = `$${producto.precio.toFixed(2)}`;
  document.getElementById(
    "modalProductRating"
  ).innerHTML = `⭐ ${producto.rating} (${producto.reviews} reseñas) • ${producto.vendedor}`;
  document.getElementById("modalProductDescription").textContent =
    producto.descripcion;

  document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
  document.getElementById("productModal").style.display = "none";
}

function openPurchaseModal() {
  closeProductModal();
  document.getElementById("purchaseModal").style.display = "flex";
}

function closePurchaseModal() {
  document.getElementById("purchaseModal").style.display = "none";
  document.getElementById("purchaseForm").reset();
}

function setupPurchaseForm() {
  const form = document.getElementById("purchaseForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!currentProduct) return;

    const nuevoPedido = {
      id: pedidos.length + 1,
      producto: currentProduct,
      fecha: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      fechaEntrega: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      estado: "pending",
      total: currentProduct.precio,
      cantidad: 1,
      direccion: document.getElementById("shippingAddress").value,
    };

    pedidos.unshift(nuevoPedido);

    closePurchaseModal();
    showNotification(
      "¡Compra realizada con éxito! Recibirás tu pedido pronto.",
      "success"
    );

    // Actualizar badge de pedidos
    updatePedidosBadge();

    // Mostrar sección de pedidos
    setTimeout(() => {
      showSection("pedidos");
    }, 1500);
  });
}

// ======================
// GESTIÓN DE PEDIDOS
// ======================

function renderPedidos() {
  const container = document.querySelector("#pedidos-section .orders-list");
  if (!container) return;

  const counter = document.querySelector("#pedidos-section .orders-count");
  if (counter) {
    counter.textContent = `${pedidos.length} pedidos encontrados`;
  }

  if (pedidos.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <h3>No tienes pedidos</h3>
                <p>Explora nuestro catálogo y realiza tu primera compra</p>
                <button class="btn-primary" onclick="showSection('catalogo')">Explorar Catálogo</button>
            </div>
        `;
    return;
  }

  container.innerHTML = pedidos
    .map(
      (pedido) => `
        <div class="order-item ${pedido.estado}">
            <div class="order-status-icon ${pedido.estado}">
                ${getStatusIcon(pedido.estado)}
            </div>
            <div class="order-details">
                <div class="order-product">${pedido.producto.nombre}</div>
                <div class="order-date">
                    Pedido: ${pedido.fecha} • 
                    ${
                      pedido.estado === "delivered"
                        ? "Entregado: "
                        : "Estimado: "
                    } ${pedido.fechaEntrega}
                </div>
                <span class="order-status ${pedido.estado}">${getStatusText(
        pedido.estado
      )}</span>
            </div>
            <div class="order-actions">
                ${getOrderActions(pedido)}
            </div>
        </div>
    `
    )
    .join("");
}

function getStatusIcon(estado) {
  const icons = {
    delivered: "✅",
    pending: "🕒",
    cancelled: "❌",
  };
  return icons[estado] || "📦";
}

function getStatusText(estado) {
  const texts = {
    delivered: "Entregado",
    pending: "En camino",
    cancelled: "Cancelado",
  };
  return texts[estado] || estado;
}

function getOrderActions(pedido) {
  let actions = `<button class="btn-action btn-secondary" onclick="viewOrderDetails(${pedido.id})">Ver Detalles</button>`;

  if (pedido.estado === "pending") {
    actions += `<button class="btn-action btn-secondary" onclick="trackOrder(${pedido.id})">Seguir Pedido</button>`;
  } else {
    actions += `<button class="btn-action btn-primary" onclick="buyAgain(${pedido.id})">Comprar Again</button>`;
  }

  return actions;
}

function viewOrderDetails(orderId) {
  const pedido = pedidos.find((p) => p.id === orderId);
  if (!pedido) return;

  alert(
    `📦 Detalles del Pedido #${orderId}\n\n` +
      `Producto: ${pedido.producto.nombre}\n` +
      `Vendedor: ${pedido.producto.vendedor}\n` +
      `Cantidad: ${pedido.cantidad}\n` +
      `Total: $${pedido.total.toFixed(2)}\n` +
      `Estado: ${getStatusText(pedido.estado)}\n` +
      `Fecha de pedido: ${pedido.fecha}\n` +
      `Fecha de entrega: ${pedido.fechaEntrega}\n` +
      `Dirección: ${pedido.direccion}`
  );
}

function trackOrder(orderId) {
  const pedido = pedidos.find((p) => p.id === orderId);
  if (!pedido) return;

  showNotification(
    `Rastreando pedido #${orderId}. Tu paquete está en camino y llegará el ${pedido.fechaEntrega}.`,
    "info"
  );
}

function buyAgain(orderId) {
  const pedido = pedidos.find((p) => p.id === orderId);
  if (!pedido) return;

  currentProduct = pedido.producto;
  openPurchaseModal();
}

function updatePedidosBadge() {
  const pendingOrders = pedidos.filter((p) => p.estado === "pending").length;
  const badge = document.querySelector(
    '.nav-item a[href="#pedidos"] .nav-badge'
  );
  if (badge) {
    badge.textContent = pendingOrders;
    badge.style.display = pendingOrders > 0 ? "inline-block" : "none";
  }
}

// ======================
// GESTIÓN DE FAVORITOS
// ======================

function renderFavoritos() {
  const container = document.getElementById("favoritos-section");
  if (!container) return;

  const counter = container.querySelector(".favorites-count");
  if (counter) {
    counter.textContent = `${favoritos.length} productos guardados`;
  }

  // Buscar si existe un products-grid, si no, crear uno
  let grid = container.querySelector(".products-grid");
  if (!grid) {
    const emptyState = container.querySelector(".empty-state");
    if (emptyState && favoritos.length > 0) {
      emptyState.remove();
    }

    if (favoritos.length > 0) {
      grid = document.createElement("div");
      grid.className = "products-grid";
      container.appendChild(grid);
    }
  }

  if (favoritos.length === 0) {
    if (grid) grid.remove();

    let emptyState = container.querySelector(".empty-state");
    if (!emptyState) {
      emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.innerHTML = `
                <div class="empty-icon">❤️</div>
                <h3>No tienes productos favoritos</h3>
                <p>Agrega productos a tus favoritos para verlos aquí</p>
                <button class="btn-primary" onclick="showSection('catalogo')">Explorar Catálogo</button>
            `;
      container.appendChild(emptyState);
    }
    return;
  }

  grid.innerHTML = favoritos
    .map(
      (producto) => `
        <div class="product-card" onclick="openProductModal(${producto.id})">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <button class="btn-remove-favorite" onclick="event.stopPropagation(); toggleFavorito(${
                  producto.id
                })" style="position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    ❤️
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryIcon(
                  producto.categoria
                )} ${getCategoryName(producto.categoria)}</div>
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-description">${producto.descripcion}</p>
                <div class="product-footer">
                    <div class="product-price">$${producto.precio.toFixed(
                      2
                    )}</div>
                    <div class="product-rating">⭐ ${producto.rating} (${
        producto.reviews
      })</div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function toggleFavorito(productId) {
  const producto = productos.find((p) => p.id === productId);
  if (!producto) return;

  const index = favoritos.findIndex((f) => f.id === productId);

  if (index === -1) {
    favoritos.push(producto);
    showNotification("Producto agregado a favoritos ❤️", "success");
  } else {
    favoritos.splice(index, 1);
    showNotification("Producto eliminado de favoritos", "info");
  }

  renderFavoritos();
}

// ======================
// CONFIGURACIÓN
// ======================

function renderConfiguracion() {
  // Aquí podrías renderizar formularios de configuración
  // Por ahora las funciones abren modales o alertas
}

function editarPerfil() {
  alert(
    "Función de editar perfil\n\nAquí podrás actualizar:\n- Nombre\n- Email\n- Teléfono\n- Foto de perfil\n- Preferencias"
  );
}

function gestionarDirecciones() {
  let mensaje = "📍 Tus Direcciones:\n\n";
  direcciones.forEach((dir, index) => {
    mensaje += `${index + 1}. ${dir.nombre} ${
      dir.predeterminada ? "(Predeterminada)" : ""
    }\n`;
    mensaje += `   ${dir.direccion}\n`;
    mensaje += `   ${dir.ciudad} - ${dir.codigoPostal}\n\n`;
  });
  mensaje +=
    "\n¿Qué deseas hacer?\n- Agregar nueva dirección\n- Editar dirección\n- Eliminar dirección";
  alert(mensaje);
}

function gestionarMetodosPago() {
  let mensaje = "💳 Tus Métodos de Pago:\n\n";
  metodosPago.forEach((metodo, index) => {
    mensaje += `${index + 1}. ${metodo.nombre} ${
      metodo.predeterminado ? "(Predeterminado)" : ""
    }\n`;
    mensaje += `   **** **** **** ${metodo.ultimos4}\n\n`;
  });
  mensaje +=
    "\n¿Qué deseas hacer?\n- Agregar nuevo método\n- Editar método\n- Eliminar método";
  alert(mensaje);
}

function configurarNotificaciones() {
  alert(
    "🔔 Configuración de Notificaciones\n\n" +
      "Configura qué notificaciones deseas recibir:\n\n" +
      "✅ Nuevas ofertas y promociones\n" +
      "✅ Actualizaciones de pedidos\n" +
      "✅ Productos recomendados\n" +
      "✅ Recordatorios de carrito\n" +
      "⬜ Newsletter semanal\n" +
      "⬜ Notificaciones push"
  );
}

// Agregar event listeners a los botones de configuración
document.addEventListener("DOMContentLoaded", function () {
  const configButtons = document.querySelectorAll(
    "#configuracion-section .btn-primary"
  );
  if (configButtons.length >= 4) {
    configButtons[0].onclick = editarPerfil;
    configButtons[1].onclick = gestionarDirecciones;
    configButtons[2].onclick = gestionarMetodosPago;
    configButtons[3].onclick = configurarNotificaciones;
  }
});

// ======================
// UTILIDADES
// ======================

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        font-weight: 500;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function logout() {
  if (confirm("¿Estás seguro de cerrar sesión?")) {
    showNotification("Cerrando sesión...", "info");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  }
}

// Cerrar modales al hacer clic fuera
window.onclick = function (event) {
  const productModal = document.getElementById("productModal");
  const purchaseModal = document.getElementById("purchaseModal");

  if (event.target === productModal) {
    closeProductModal();
  }
  if (event.target === purchaseModal) {
    closePurchaseModal();
  }
};

// Agregar estilos para animaciones
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .btn-remove-favorite:hover {
        transform: scale(1.1);
    }
    
    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 8px 0;
        min-width: 180px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: none;
        z-index: 1001;
        margin-top: 8px;
    }
    
    .dropdown-menu a {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        text-decoration: none;
        color: #1e293b;
        transition: background-color 0.3s;
        font-size: 14px;
    }
    
    .dropdown-menu a:hover {
        background: #f8fafc;
    }
    
    .dropdown-menu .logout {
        color: #ef4444;
        border-top: 1px solid #e2e8f0;
        margin-top: 8px;
        padding-top: 12px;
    }
    
    .user-menu:hover .dropdown-menu {
        display: block;
    }
`;
document.head.appendChild(style);

// Inicializar
updatePedidosBadge();

// Menú móvil
function toggleMobileMenu() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");
}

// Cerrar menú al hacer clic en un enlace
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-item a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.remove("active");
      }
    });
  });
});
