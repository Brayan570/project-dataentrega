// Verificar autenticación para vendedor
function checkAuth() {
  const user = localStorage.getItem("confio_user");
  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  try {
    const userData = JSON.parse(user);
    if (userData.type !== "vendedor") {
      window.location.href = "login.html";
      return null;
    }
    return userData;
  } catch (error) {
    window.location.href = "login.html";
    return null;
  }
}

// En el DOMContentLoaded de dashboard_vendedor.js
document.addEventListener("DOMContentLoaded", function () {
  const user = checkAuth();
  if (!user) return;

  // Actualizar interfaz con datos del usuario
  const userNameElement = document.querySelector(".user-name");
  if (userNameElement) {
    userNameElement.textContent = user.name;
  }
  // JavaScript para las nuevas secciones del vendedor
  class VendedorSections {
    constructor() {
      this.currentOrderId = null;
      this.selectedRating = null;
      this.initSections();
    }

    initSections() {
      this.initProductModal();
      this.initDeliveryModal();
      this.initNavigation();
    }

    initNavigation() {
      // Navegación entre secciones
      const navLinks = document.querySelectorAll(".nav-item a");
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = e.currentTarget.getAttribute("href").substring(1);
          this.showSection(target);
        });
      });
    }

    showSection(sectionName) {
      // Ocultar todas las secciones
      const sections = document.querySelectorAll(".main-content");
      sections.forEach((section) => {
        section.style.display = "none";
      });

      // Mostrar sección seleccionada
      const targetSection = document.getElementById(`${sectionName}-section`);
      if (targetSection) {
        targetSection.style.display = "block";
      }

      // Actualizar navegación activa
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });
      document
        .querySelector(`a[href="#${sectionName}"]`)
        .closest(".nav-item")
        .classList.add("active");
    }

    initProductModal() {
      const photoUpload = document.getElementById("photoUpload");
      const fileInput = document.getElementById("productPhotos");

      photoUpload.addEventListener("click", () => {
        fileInput.click();
      });

      fileInput.addEventListener("change", (e) => {
        this.handleImageUpload(e.target.files);
      });

      document.getElementById("productForm").addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveProduct();
      });
    }

    handleImageUpload(files) {
      const preview = document.getElementById("uploadPreview");
      preview.innerHTML = "";

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imgContainer = document.createElement("div");
            imgContainer.className = "image-preview";
            imgContainer.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <button type="button" onclick="this.parentElement.remove()">×</button>
                        `;
            preview.appendChild(imgContainer);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    saveProduct() {
      const formData = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        price: document.getElementById("productPrice").value,
        stock: document.getElementById("productStock").value,
        category: document.getElementById("productCategory").value,
      };

      // Aquí iría la lógica para guardar el producto
      console.log("Guardando producto:", formData);
      this.showNotification("Producto guardado correctamente", "success");
      this.closeProductModal();
    }

    initDeliveryModal() {
      // Inicializar modal de entrega
    }

    // Funciones para productos
    openProductModal() {
      document.getElementById("productModal").style.display = "flex";
    }

    closeProductModal() {
      document.getElementById("productModal").style.display = "none";
      document.getElementById("productForm").reset();
      document.getElementById("uploadPreview").innerHTML = "";
    }

    editProduct(productId) {
      // Lógica para editar producto
      this.openProductModal();
      // Cargar datos del producto
      console.log("Editando producto:", productId);
    }

    deleteProduct(productId) {
      if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        // Lógica para eliminar producto
        console.log("Eliminando producto:", productId);
        this.showNotification("Producto eliminado", "success");
      }
    }

    // Funciones para pedidos
    markAsProcessing(orderId) {
      if (confirm("¿Marcar pedido como en proceso?")) {
        // Lógica para cambiar estado
        console.log("Pedido en proceso:", orderId);
        this.showNotification("Pedido marcado como en proceso", "success");
      }
    }

    cancelOrder(orderId) {
      if (confirm("¿Cancelar este pedido?")) {
        // Lógica para cancelar pedido
        console.log("Pedido cancelado:", orderId);
        this.showNotification("Pedido cancelado", "warning");
      }
    }

    markAsDelivered(orderId) {
      this.currentOrderId = orderId;
      document.getElementById("deliveryModal").style.display = "flex";
      this.selectedRating = null;
      document.getElementById("confirmDeliveryBtn").disabled = true;

      // Resetear selección
      document.querySelectorAll(".rating-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });
      document.getElementById("commentSection").style.display = "none";
    }

    selectRating(rating) {
      this.selectedRating = rating;
      document.getElementById("confirmDeliveryBtn").disabled = false;

      // Actualizar UI
      document.querySelectorAll(".rating-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });
      event.target.closest(".rating-btn").classList.add("selected");

      // Mostrar sección de comentarios
      document.getElementById("commentSection").style.display = "block";
    }

    confirmDelivery() {
      if (!this.selectedRating) return;

      const comment = document.getElementById("deliveryComment").value;

      // Lógica para confirmar entrega
      console.log("Entrega confirmada:", {
        orderId: this.currentOrderId,
        rating: this.selectedRating,
        comment: comment,
      });

      this.showNotification("Entrega confirmada correctamente", "success");
      this.closeDeliveryModal();
    }

    closeDeliveryModal() {
      document.getElementById("deliveryModal").style.display = "none";
      this.currentOrderId = null;
      this.selectedRating = null;
    }

    viewOrderDetails(orderId) {
      // Lógica para ver detalles del pedido
      console.log("Viendo detalles del pedido:", orderId);
    }

    // Funciones para reputación
    filterClients() {
      const filter = document.getElementById("trustFilter").value;
      // Lógica para filtrar clientes
      console.log("Filtrando clientes por:", filter);
    }

    // Utilidades
    showNotification(message, type = "info") {
      // Implementar sistema de notificaciones toast
      alert(`[${type.toUpperCase()}] ${message}`);
    }
  }

  // Inicializar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    window.vendedorSections = new VendedorSections();
  });

  // Funciones globales para los onclick
  function openProductModal() {
    window.vendedorSections.openProductModal();
  }

  function closeProductModal() {
    window.vendedorSections.closeProductModal();
  }

  function editProduct(productId) {
    window.vendedorSections.editProduct(productId);
  }

  function deleteProduct(productId) {
    window.vendedorSections.deleteProduct(productId);
  }

  function markAsProcessing(orderId) {
    window.vendedorSections.markAsProcessing(orderId);
  }

  function cancelOrder(orderId) {
    window.vendedorSections.cancelOrder(orderId);
  }

  function markAsDelivered(orderId) {
    window.vendedorSections.markAsDelivered(orderId);
  }

  function selectRating(rating) {
    window.vendedorSections.selectRating(rating);
  }

  function confirmDelivery() {
    window.vendedorSections.confirmDelivery();
  }

  function closeDeliveryModal() {
    window.vendedorSections.closeDeliveryModal();
  }

  function viewOrderDetails(orderId) {
    window.vendedorSections.viewOrderDetails(orderId);
  }

  function filterOrders() {
    const filter = document.getElementById("statusFilter").value;
    const rows = document.querySelectorAll(".order-row");

    rows.forEach((row) => {
      if (filter === "all" || row.classList.contains(filter)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
});

function filterClients() {
  window.vendedorSections.filterClients();
}

// Función de logout
function logout() {
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    localStorage.removeItem("confio_user");
    localStorage.removeItem("confio_remember");
    window.location.href = "login.html";
  }
}

// global
window.logout = logout;

// Funciónes para el navbar

// dashboard_vendedor.js

// ========================================
// NAVEGACIÓN ENTRE SECCIONES
// ========================================

function showSection(sectionName) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".main-content");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.style.display = "block";
  }

  // Actualizar navegación activa
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active");
    const link = item.querySelector("a");
    if (link && link.getAttribute("href") === `#${sectionName}`) {
      item.classList.add("active");
    }
  });

  // Scroll al inicio
  window.scrollTo(0, 0);
}

// Manejar clicks en navegación
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-item a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const sectionName = href.replace("#", "");
      showSection(sectionName);
    });
  });

  // Inicializar con dashboard visible
  showSection("dashboard");
});

// ========================================
// GESTIÓN DE PRODUCTOS
// ========================================

let currentProductId = null;

function openProductModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "flex";
  document.getElementById("productForm").reset();
  document.getElementById("uploadPreview").innerHTML = "";
  currentProductId = null;
  document.querySelector("#productModal .modal-header h2").textContent =
    "➕ Agregar Nuevo Producto";
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "none";
  currentProductId = null;
}

function editProduct(productId) {
  currentProductId = productId;
  const modal = document.getElementById("productModal");
  modal.style.display = "flex";
  document.querySelector("#productModal .modal-header h2").textContent =
    "✏️ Editar Producto";

  // Aquí cargarías los datos del producto
  console.log("Editando producto:", productId);
  alert(`Cargando datos del producto #${productId} para edición`);
}

function deleteProduct(productId) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    console.log("Eliminando producto:", productId);
    alert(`Producto #${productId} eliminado correctamente`);
    // Aquí implementarías la lógica real de eliminación
  }
}

// Manejo de subida de fotos
document.addEventListener("DOMContentLoaded", function () {
  const photoUpload = document.getElementById("photoUpload");
  const photoInput = document.getElementById("productPhotos");
  const uploadPreview = document.getElementById("uploadPreview");

  if (photoUpload && photoInput) {
    photoUpload.addEventListener("click", function () {
      photoInput.click();
    });

    photoInput.addEventListener("change", function (e) {
      uploadPreview.innerHTML = "";
      const files = Array.from(e.target.files);

      files.slice(0, 5).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "80px";
            img.style.height = "80px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            uploadPreview.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }
});

// Submit del formulario de producto
document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const productData = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        price: document.getElementById("productPrice").value,
        stock: document.getElementById("productStock").value,
        category: document.getElementById("productCategory").value,
      };

      console.log("Guardando producto:", productData);

      if (currentProductId) {
        alert(`Producto #${currentProductId} actualizado correctamente`);
      } else {
        alert("Producto agregado correctamente");
      }

      closeProductModal();
      // Aquí recargarías la lista de productos
    });
  }
});

// ========================================
// GESTIÓN DE PEDIDOS
// ========================================

let selectedRating = null;
let currentOrderId = null;

function markAsProcessing(orderId) {
  if (confirm('¿Marcar este pedido como "En proceso"?')) {
    console.log("Procesando pedido:", orderId);
    alert(`Pedido #${orderId} marcado como "En proceso"`);
    // Aquí actualizarías el estado del pedido en tu backend
    updateOrderStatus(orderId, "processing");
  }
}

function markAsDelivered(orderId) {
  currentOrderId = orderId;
  const modal = document.getElementById("deliveryModal");
  modal.style.display = "flex";
  selectedRating = null;
  document.getElementById("confirmDeliveryBtn").disabled = true;

  // Reset rating buttons
  document.querySelectorAll(".rating-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });
}

function cancelOrder(orderId) {
  const reason = prompt("¿Por qué deseas cancelar este pedido?");
  if (reason) {
    console.log("Cancelando pedido:", orderId, "Razón:", reason);
    alert(`Pedido #${orderId} cancelado`);
    updateOrderStatus(orderId, "cancelled");
  }
}

function selectRating(rating) {
  selectedRating = rating;

  // Actualizar botones
  document.querySelectorAll(".rating-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  const selectedBtn = document.querySelector(`.rating-btn.${rating}`);
  if (selectedBtn) {
    selectedBtn.classList.add("selected");
  }

  // Mostrar sección de comentarios y habilitar botón
  document.getElementById("commentSection").style.display = "block";
  document.getElementById("confirmDeliveryBtn").disabled = false;
}

function confirmDelivery() {
  if (!selectedRating) {
    alert("Por favor selecciona una calificación");
    return;
  }

  const comment = document.getElementById("deliveryComment").value;

  console.log("Confirmando entrega:", {
    orderId: currentOrderId,
    rating: selectedRating,
    comment: comment,
  });

  alert(
    `Entrega confirmada con calificación ${
      selectedRating === "positive" ? "positiva" : "negativa"
    }`
  );

  closeDeliveryModal();
  updateOrderStatus(currentOrderId, "completed");
}

function closeDeliveryModal() {
  const modal = document.getElementById("deliveryModal");
  modal.style.display = "none";
  selectedRating = null;
  document.getElementById("deliveryComment").value = "";
  document.getElementById("commentSection").style.display = "none";
}

function viewOrderDetails(orderId) {
  console.log("Viendo detalles del pedido:", orderId);
  alert(`Mostrando detalles del pedido #${orderId}`);
  // Aquí abrirías un modal con los detalles completos
}

function updateOrderStatus(orderId, newStatus) {
  // Actualizar visualmente el estado en la tabla
  const orderRows = document.querySelectorAll(".order-row");
  orderRows.forEach((row) => {
    // Aquí buscarías la fila correcta y actualizarías su estado
    // Por ahora solo es un ejemplo
  });

  console.log(`Pedido #${orderId} actualizado a estado: ${newStatus}`);
}

// ========================================
// FILTROS
// ========================================

function filterOrders() {
  const filter = document.getElementById("statusFilter").value;
  const rows = document.querySelectorAll(".order-row");

  rows.forEach((row) => {
    if (filter === "all") {
      row.style.display = "";
    } else {
      if (row.classList.contains(filter)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });

  console.log("Filtrando pedidos por:", filter);
}

function filterClients() {
  const filter = document.getElementById("trustFilter").value;
  const cards = document.querySelectorAll(".client-reputation-card");

  cards.forEach((card) => {
    if (filter === "all") {
      card.style.display = "";
    } else {
      const trustClass = `${filter}-trust`;
      if (card.classList.contains(trustClass)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    }
  });

  console.log("Filtrando clientes por:", filter);
}

// ========================================
// CONFIGURACIÓN
// ========================================

function openStoreSettings() {
  alert("Abriendo configuración de perfil de tienda...");
  console.log("Configuración de tienda");
}

function openShippingSettings() {
  alert("Abriendo configuración de métodos de envío...");
  console.log("Configuración de envío");
}

function openPaymentSettings() {
  alert("Abriendo configuración de métodos de pago...");
  console.log("Configuración de pagos");
}

function openNotificationSettings() {
  alert("Abriendo configuración de notificaciones...");
  console.log("Configuración de notificaciones");
}

// ========================================
// CERRAR SESIÓN
// ========================================

function logout() {
  if (confirm("¿Estás seguro de cerrar sesión?")) {
    console.log("Cerrando sesión...");
    // Aquí implementarías la lógica de cierre de sesión
    alert("Sesión cerrada correctamente");
    // Redirigir a login
    // window.location.href = 'login.html';
  }
}

// ========================================
// CERRAR MODALES CON ESC
// ========================================

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProductModal();
    closeDeliveryModal();
  }
});

// Cerrar modales al hacer click fuera
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    closeProductModal();
    closeDeliveryModal();
  }
});

// ========================================
// UTILIDADES
// ========================================

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
}

function formatDate(date) {
  return new Intl.DateFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

// ========================================
// ANIMACIONES Y UX
// ========================================

// Animación de las estadísticas al cargar
document.addEventListener("DOMContentLoaded", function () {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const finalValue = stat.textContent;
    if (
      finalValue.includes("$") ||
      finalValue.includes("%") ||
      !isNaN(parseFloat(finalValue))
    ) {
      // Aquí podrías agregar una animación de conteo
    }
  });
});

// Notificaciones toast (ejemplo)
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Agregar estilos de animación
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log("Dashboard del Vendedor - Confio inicializado correctamente ✅");

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
