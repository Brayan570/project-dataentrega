// dashboard_admin.js
function checkAuth() {
  const user = localStorage.getItem("confio_user");
  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  try {
    const userData = JSON.parse(user);
    if (userData.type !== "admin") {
      window.location.href = "login.html";
      return null;
    }
    return userData;
  } catch (error) {
    window.location.href = "login.html";
    return null;
  }
}

// En el DOMContentLoaded de dashboard_admin.js
document.addEventListener("DOMContentLoaded", function () {
  const user = checkAuth();
  if (!user) return;

  // Actualizar interfaz con datos del admin
  const userNameElement = document.querySelector(".user-name");
  if (userNameElement) {
    userNameElement.textContent = user.name;
  }
  // Navegación entre secciones
  function showSection(sectionName) {
    console.log("Cambiando a sección:", sectionName);

    // Ocultar todas las secciones
    const sections = [
      "dashboard",
      "usuarios",
      "productos",
      "ventas",
      "reputacion",
      "moderacion",
      "configuracion",
    ];

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

  // Moderación - Tabs
  function openModerationTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.classList.remove("active");
    });

    // Remover active de todos los botones
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.remove("active");
    });

    // Mostrar tab seleccionado
    const targetTab = document.getElementById(tabName + "-tab");
    if (targetTab) {
      targetTab.classList.add("active");
    }

    // Activar botón
    event.target.classList.add("active");
  }

  // Funciones de gestión de usuarios
  function viewUserDetails(userId) {
    const users = {
      1: {
        name: "María González",
        email: "maria@email.com",
        type: "Comprador",
        registration: "15 Dic, 2024",
        status: "Activo",
        reputation: "4.8/5",
        totalPurchases: 12,
        totalSpent: "$1,245.50",
      },
      2: {
        name: "TechStore",
        email: "tech@store.com",
        type: "Vendedor",
        registration: "10 Nov, 2024",
        status: "Activo",
        reputation: "4.6/5",
        totalProducts: 45,
        totalSales: "$12,847.00",
      },
    };

    const user = users[userId];
    if (user) {
      alert(
        `Detalles del Usuario #${userId}\n\n` +
          `Nombre: ${user.name}\n` +
          `Email: ${user.email}\n` +
          `Tipo: ${user.type}\n` +
          `Registro: ${user.registration}\n` +
          `Estado: ${user.status}\n` +
          `Reputación: ${user.reputation}\n` +
          user.type ===
          "Comprador"
          ? `Compras: ${user.totalPurchases}\nTotal gastado: ${user.totalSpent}`
          : `Productos: ${user.totalProducts}\nVentas totales: ${user.totalSales}`
      );
    }
  }

  function suspendUser(userId) {
    if (confirm("¿Estás seguro de que quieres suspender este usuario?")) {
      alert(
        `Usuario #${userId} suspendido temporalmente.\nEl usuario no podrá acceder a la plataforma por 30 días.`
      );
      // Aquí iría la lógica real para suspender al usuario
    }
  }

  function activateUser(userId) {
    if (confirm("¿Activar este usuario?")) {
      alert(`Usuario #${userId} activado exitosamente.`);
      // Aquí iría la lógica real para activar al usuario
    }
  }

  // Funciones de moderación
  function blockUser(username) {
    if (confirm(`¿Bloquear permanentemente al usuario "${username}"?`)) {
      alert(
        `Usuario "${username}" bloqueado permanentemente.\nTodas sus cuentas asociadas serán suspendidas.`
      );
      // Aquí iría la lógica real para bloquear al usuario
    }
  }

  function suspendUserTemporary(username) {
    if (
      confirm(`¿Suspender temporalmente al usuario "${username}" por 30 días?`)
    ) {
      alert(
        `Usuario "${username}" suspendido por 30 días.\nSe notificará al usuario sobre esta acción.`
      );
      // Aquí iría la lógica real para suspender temporalmente
    }
  }

  function dismissReport(reportId) {
    if (confirm(`¿Desestimar el reporte ${reportId}?`)) {
      alert(`Reporte ${reportId} desestimado.\nEl reporte será archivado.`);
      // Aquí iría la lógica real para desestimar el reporte
    }
  }

  function investigateReport(reportId) {
    alert(
      `Iniciando investigación del reporte ${reportId}...\nSe ha creado un caso de investigación.`
    );
    // Aquí iría la lógica real para iniciar investigación
  }

  function deleteReview(reviewId) {
    if (confirm("¿Eliminar esta reseña?")) {
      alert(`Reseña #${reviewId} eliminada permanentemente.`);
      // Aquí iría la lógica real para eliminar la reseña
    }
  }

  function markReviewValid(reviewId) {
    if (confirm("¿Marcar esta reseña como válida?")) {
      alert(
        `Reseña #${reviewId} marcada como válida.\nSe eliminará de la lista de sospechosas.`
      );
      // Aquí iría la lógica real para marcar como válida
    }
  }

  // Inicialización
  document.addEventListener("DOMContentLoaded", function () {
    // Mostrar dashboard por defecto
    showSection("dashboard");

    // Configurar event listeners para navegación
    document.querySelectorAll(".nav-item a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = this.getAttribute("href").substring(1);
        showSection(target);
      });
    });

    // Simular notificaciones en tiempo real
    setInterval(() => {
      const badge = document.querySelector(".notification-badge");
      if (badge) {
        const currentCount = parseInt(badge.textContent);
        if (currentCount < 10) {
          badge.textContent = currentCount + 1;
        }
      }
    }, 30000); // Cada 30 segundos
  });
});

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
// Hacer funciones globales para los onclick del HTML
window.showSection = showSection;
window.openModerationTab = openModerationTab;
window.viewUserDetails = viewUserDetails;
window.suspendUser = suspendUser;
window.activateUser = activateUser;
window.blockUser = blockUser;
window.suspendUserTemporary = suspendUserTemporary;
window.dismissReport = dismissReport;
window.investigateReport = investigateReport;
window.deleteReview = deleteReview;
window.markReviewValid = markReviewValid;

// Fin de dashboard_admin.js

// dashboard_admin.js

// ======================
// DATOS DE EJEMPLO
// ======================

let usuarios = [
  {
    id: 1,
    nombre: "María González",
    email: "maria@email.com",
    avatar: "MG",
    tipo: "comprador",
    registro: "15 Dic, 2024",
    estado: "active",
    reputacion: 4.8,
    compras: 12,
    ventas: 0,
    reportes: 0,
  },
  {
    id: 2,
    nombre: "TechStore",
    email: "tech@store.com",
    avatar: "TS",
    tipo: "vendedor",
    registro: "10 Nov, 2024",
    estado: "active",
    reputacion: 4.6,
    compras: 0,
    ventas: 156,
    reportes: 1,
  },
  {
    id: 3,
    nombre: "Juan Rodríguez",
    email: "juan@email.com",
    avatar: "JR",
    tipo: "comprador",
    registro: "05 Dic, 2024",
    estado: "suspended",
    reputacion: 2.1,
    compras: 3,
    ventas: 0,
    reportes: 3,
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    email: "ana@email.com",
    avatar: "AM",
    tipo: "vendedor",
    registro: "20 Oct, 2024",
    estado: "active",
    reputacion: 4.9,
    compras: 0,
    ventas: 234,
    reportes: 0,
  },
  {
    id: 5,
    nombre: "Carlos López",
    email: "carlos@email.com",
    avatar: "CL",
    tipo: "comprador",
    registro: "12 Dic, 2024",
    estado: "active",
    reputacion: 4.5,
    compras: 8,
    ventas: 0,
    reportes: 0,
  },
];

let productos = [
  {
    id: 1,
    nombre: "iPhone 14 Pro Max",
    categoria: "electronica",
    vendedor: "TechStore",
    precio: 1199.99,
    stock: 15,
    ventas: 45,
    estado: "active",
    fecha: "10 Nov, 2024",
    reportes: 1,
  },
  {
    id: 2,
    nombre: "Zapatos Nike Air Max",
    categoria: "deportes",
    vendedor: "Sports World",
    precio: 89.99,
    stock: 0,
    ventas: 128,
    estado: "inactive",
    fecha: "15 Oct, 2024",
    reportes: 0,
  },
  {
    id: 3,
    nombre: "Laptop Dell XPS 13",
    categoria: "electronica",
    vendedor: "TechStore",
    precio: 899.99,
    stock: 8,
    ventas: 23,
    estado: "active",
    fecha: "05 Dic, 2024",
    reportes: 0,
  },
  {
    id: 4,
    nombre: "Libro Hábitos Atómicos",
    categoria: "libros",
    vendedor: "Librería Central",
    precio: 24.99,
    stock: 50,
    ventas: 89,
    estado: "active",
    fecha: "01 Nov, 2024",
    reportes: 0,
  },
  {
    id: 5,
    nombre: "Auriculares Sony WH-1000XM4",
    categoria: "electronica",
    vendedor: "Audio Pro",
    precio: 349.99,
    stock: 12,
    ventas: 67,
    estado: "active",
    fecha: "18 Nov, 2024",
    reportes: 0,
  },
];

let ventas = [
  {
    id: 1,
    producto: "iPhone 14 Pro Max",
    comprador: "María González",
    vendedor: "TechStore",
    precio: 1199.99,
    fecha: "15 Dic, 2024",
    estado: "completed",
    comision: 119.99,
  },
  {
    id: 2,
    producto: "Zapatos Nike Air Max",
    comprador: "Carlos López",
    vendedor: "Sports World",
    precio: 89.99,
    fecha: "14 Dic, 2024",
    estado: "completed",
    comision: 8.99,
  },
  {
    id: 3,
    producto: "Laptop Dell XPS 13",
    comprador: "Ana Martínez",
    vendedor: "TechStore",
    precio: 899.99,
    fecha: "13 Dic, 2024",
    estado: "pending",
    comision: 89.99,
  },
  {
    id: 4,
    producto: "Auriculares Sony WH-1000XM4",
    comprador: "María González",
    vendedor: "Audio Pro",
    precio: 349.99,
    fecha: "12 Dic, 2024",
    estado: "completed",
    comision: 34.99,
  },
  {
    id: 5,
    producto: "Libro Hábitos Atómicos",
    comprador: "Carlos López",
    vendedor: "Librería Central",
    precio: 24.99,
    fecha: "11 Dic, 2024",
    estado: "completed",
    comision: 2.49,
  },
];

let reportes = [
  {
    id: "REP-7842",
    usuarioReportado: "Juan123",
    reportadoPor: "María González",
    motivo: "Comportamiento sospechoso",
    descripcion:
      "Usuario crea múltiples cuentas para evadir bloqueos anteriores",
    fecha: "Hoy, 14:30",
    estado: "pending",
    tipo: "usuario",
  },
  {
    id: "REP-7841",
    usuarioReportado: "TechStore",
    reportadoPor: "Carlos López",
    motivo: "Producto falsificado",
    descripcion: "Vende productos electrónicos que parecen ser falsificados",
    fecha: "Ayer, 16:45",
    estado: "pending",
    tipo: "producto",
  },
  {
    id: "REP-7840",
    usuarioReportado: "Ana123",
    reportadoPor: "Sistema",
    motivo: "Reseña sospechosa",
    descripcion: "Patrón de reseñas falsas detectado",
    fecha: "Hace 2 días",
    estado: "investigating",
    tipo: "resena",
  },
];

let estadisticas = {
  totalUsuarios: 2847,
  compradores: 2154,
  vendedores: 693,
  totalProductos: 15238,
  productosActivos: 14892,
  productosInactivos: 346,
  totalVentas: 1200000,
  ventasCompletadas: 8742,
  ventasPendientes: 156,
  reputacionGlobal: 4.6,
  reportesPendientes: 8,
  usuariosSospechosos: 3,
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

  // Renderizar contenido según la sección
  switch (sectionName) {
    case "usuarios":
      renderUsuarios();
      break;
    case "productos":
      renderProductos();
      break;
    case "ventas":
      renderVentas();
      break;
    case "reputacion":
      renderReputacion();
      break;
    case "moderacion":
      renderModeracion();
      break;
  }
}

// ======================
// GESTIÓN DE USUARIOS
// ======================

function renderUsuarios(filtro = "all") {
  const tbody = document.querySelector("#usuarios-section .users-table tbody");
  if (!tbody) return;

  let usuariosFiltrados = [...usuarios];

  if (filtro !== "all") {
    if (filtro === "Compradores") {
      usuariosFiltrados = usuariosFiltrados.filter(
        (u) => u.tipo === "comprador"
      );
    } else if (filtro === "Vendedores") {
      usuariosFiltrados = usuariosFiltrados.filter(
        (u) => u.tipo === "vendedor"
      );
    } else if (filtro === "Suspendidos") {
      usuariosFiltrados = usuariosFiltrados.filter(
        (u) => u.estado === "suspended"
      );
    }
  }

  tbody.innerHTML = usuariosFiltrados
    .map(
      (usuario) => `
        <tr>
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${usuario.avatar}</div>
                    <div class="user-info">
                        <span class="user-name">${usuario.nombre}</span>
                        <span class="user-email">${usuario.email}</span>
                    </div>
                </div>
            </td>
            <td><span class="user-type ${usuario.tipo}">${
        usuario.tipo === "comprador" ? "Comprador" : "Vendedor"
      }</span></td>
            <td>${usuario.registro}</td>
            <td><span class="status-badge ${usuario.estado}">${
        usuario.estado === "active" ? "Activo" : "Suspendido"
      }</span></td>
            <td>
                <div class="reputation-score">
                    <span class="rating">${usuario.reputacion}</span>
                    <span class="stars">${getStars(usuario.reputacion)}</span>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action view" onclick="viewUserDetails(${
                      usuario.id
                    })" title="Ver detalles">👁️</button>
                    ${
                      usuario.estado === "active"
                        ? `<button class="btn-action suspend" onclick="suspendUser(${usuario.id})" title="Suspender">⏸️</button>`
                        : `<button class="btn-action activate" onclick="activateUser(${usuario.id})" title="Activar">▶️</button>`
                    }
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

function getStars(rating) {
  const fullStars = Math.floor(rating);
  return "⭐".repeat(fullStars);
}

function viewUserDetails(userId) {
  const usuario = usuarios.find((u) => u.id === userId);
  if (!usuario) return;

  const tipoLabel = usuario.tipo === "comprador" ? "Compras" : "Ventas";
  const cantidad =
    usuario.tipo === "comprador" ? usuario.compras : usuario.ventas;

  alert(
    `📋 Detalles del Usuario\n\n` +
      `Nombre: ${usuario.nombre}\n` +
      `Email: ${usuario.email}\n` +
      `Tipo: ${usuario.tipo === "comprador" ? "Comprador" : "Vendedor"}\n` +
      `Estado: ${usuario.estado === "active" ? "Activo" : "Suspendido"}\n` +
      `Reputación: ${usuario.reputacion}/5\n` +
      `${tipoLabel}: ${cantidad}\n` +
      `Reportes: ${usuario.reportes}\n` +
      `Registro: ${usuario.registro}`
  );
}

function suspendUser(userId) {
  if (confirm("¿Estás seguro de suspender este usuario?")) {
    const usuario = usuarios.find((u) => u.id === userId);
    if (usuario) {
      usuario.estado = "suspended";
      renderUsuarios();
      showNotification(
        `Usuario ${usuario.nombre} suspendido correctamente`,
        "warning"
      );
    }
  }
}

function activateUser(userId) {
  if (confirm("¿Estás seguro de activar este usuario?")) {
    const usuario = usuarios.find((u) => u.id === userId);
    if (usuario) {
      usuario.estado = "active";
      renderUsuarios();
      showNotification(
        `Usuario ${usuario.nombre} activado correctamente`,
        "success"
      );
    }
  }
}

// Filtro de usuarios
document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = document.querySelector(
    "#usuarios-section .filter-select"
  );
  if (filterSelect) {
    filterSelect.addEventListener("change", function () {
      renderUsuarios(this.value);
    });
  }

  const searchInput = document.querySelector("#usuarios-section .search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll(
        "#usuarios-section .users-table tbody tr"
      );
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? "" : "none";
      });
    });
  }
});

// ======================
// GESTIÓN DE PRODUCTOS
// ======================

function renderProductos() {
  const section = document.getElementById("productos-section");
  if (!section) return;

  // Limpiar contenido existente excepto el header
  const header = section.querySelector(".section-header");
  section.innerHTML = "";
  section.appendChild(header);

  // Crear tabla de productos
  const tableContainer = document.createElement("div");
  tableContainer.className = "users-table-container";
  tableContainer.innerHTML = `
        <table class="users-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Vendedor</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Ventas</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${productos
                  .map(
                    (producto) => `
                    <tr>
                        <td>
                            <div class="user-info">
                                <span class="user-name">${
                                  producto.nombre
                                }</span>
                                <span class="user-email">ID: ${
                                  producto.id
                                }</span>
                            </div>
                        </td>
                        <td>${getCategoryName(producto.categoria)}</td>
                        <td>${producto.vendedor}</td>
                        <td style="font-weight: 600; color: var(--primary-color);">$${producto.precio.toFixed(
                          2
                        )}</td>
                        <td>
                            <span style="color: ${
                              producto.stock === 0
                                ? "var(--error-color)"
                                : producto.stock < 10
                                ? "var(--warning-color)"
                                : "var(--success-color)"
                            };">
                                ${producto.stock} unidades
                            </span>
                        </td>
                        <td>${producto.ventas}</td>
                        <td><span class="status-badge ${producto.estado}">${
                      producto.estado === "active" ? "Activo" : "Inactivo"
                    }</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action view" onclick="viewProductDetails(${
                                  producto.id
                                })" title="Ver detalles">👁️</button>
                                <button class="btn-action ${
                                  producto.estado === "active"
                                    ? "suspend"
                                    : "activate"
                                }" 
                                        onclick="${
                                          producto.estado === "active"
                                            ? "deactivateProduct"
                                            : "activateProduct"
                                        }(${producto.id})" 
                                        title="${
                                          producto.estado === "active"
                                            ? "Desactivar"
                                            : "Activar"
                                        }">
                                    ${
                                      producto.estado === "active" ? "⏸️" : "▶️"
                                    }
                                </button>
                            </div>
                        </td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;

  section.appendChild(tableContainer);
}

function getCategoryName(categoria) {
  const names = {
    electronica: "📱 Electrónica",
    deportes: "⚽ Deportes",
    libros: "📚 Libros",
    ropa: "👕 Ropa",
    hogar: "🏠 Hogar",
  };
  return names[categoria] || categoria;
}

function viewProductDetails(productId) {
  const producto = productos.find((p) => p.id === productId);
  if (!producto) return;

  alert(
    `📦 Detalles del Producto\n\n` +
      `Nombre: ${producto.nombre}\n` +
      `Categoría: ${getCategoryName(producto.categoria)}\n` +
      `Vendedor: ${producto.vendedor}\n` +
      `Precio: $${producto.precio.toFixed(2)}\n` +
      `Stock: ${producto.stock} unidades\n` +
      `Ventas totales: ${producto.ventas}\n` +
      `Estado: ${producto.estado === "active" ? "Activo" : "Inactivo"}\n` +
      `Fecha de publicación: ${producto.fecha}\n` +
      `Reportes: ${producto.reportes}`
  );
}

function deactivateProduct(productId) {
  if (confirm("¿Estás seguro de desactivar este producto?")) {
    const producto = productos.find((p) => p.id === productId);
    if (producto) {
      producto.estado = "inactive";
      renderProductos();
      showNotification(
        `Producto "${producto.nombre}" desactivado correctamente`,
        "warning"
      );
    }
  }
}

function activateProduct(productId) {
  const producto = productos.find((p) => p.id === productId);
  if (producto) {
    producto.estado = "active";
    renderProductos();
    showNotification(
      `Producto "${producto.nombre}" activado correctamente`,
      "success"
    );
  }
}

// ======================
// GESTIÓN DE VENTAS
// ======================

function renderVentas() {
  const section = document.getElementById("ventas-section");
  if (!section) return;

  const header = section.querySelector(".section-header");
  section.innerHTML = "";
  section.appendChild(header);

  // Estadísticas de ventas
  const statsGrid = document.createElement("div");
  statsGrid.className = "stats-grid";
  statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon total-sales">💰</div>
            <div class="stat-info">
                <h3>Ventas Totales</h3>
                <span class="stat-number">$${(
                  estadisticas.totalVentas / 1000
                ).toFixed(1)}M</span>
                <span class="stat-change positive">+15% este mes</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-info">
                <h3>Comisiones</h3>
                <span class="stat-number">$${(
                  (estadisticas.totalVentas * 0.1) /
                  1000
                ).toFixed(1)}K</span>
                <span class="stat-change positive">+12% este mes</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
                <h3>Completadas</h3>
                <span class="stat-number">${
                  estadisticas.ventasCompletadas
                }</span>
                <span class="stat-change positive">+8% este mes</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-info">
                <h3>Pendientes</h3>
                <span class="stat-number">${
                  estadisticas.ventasPendientes
                }</span>
                <span class="stat-change">En proceso</span>
            </div>
        </div>
    `;
  section.appendChild(statsGrid);

  // Tabla de ventas
  const tableContainer = document.createElement("div");
  tableContainer.className = "users-table-container";
  tableContainer.style.marginTop = "30px";
  tableContainer.innerHTML = `
        <table class="users-table">
            <thead>
                <tr>
                    <th>ID Venta</th>
                    <th>Producto</th>
                    <th>Comprador</th>
                    <th>Vendedor</th>
                    <th>Precio</th>
                    <th>Comisión</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${ventas
                  .map(
                    (venta) => `
                    <tr>
                        <td style="font-weight: 600;">#${venta.id}</td>
                        <td>${venta.producto}</td>
                        <td>${venta.comprador}</td>
                        <td>${venta.vendedor}</td>
                        <td style="font-weight: 600; color: var(--primary-color);">$${venta.precio.toFixed(
                          2
                        )}</td>
                        <td style="font-weight: 600; color: var(--success-color);">$${venta.comision.toFixed(
                          2
                        )}</td>
                        <td>${venta.fecha}</td>
                        <td>
                            <span class="status-badge ${venta.estado}">
                                ${
                                  venta.estado === "completed"
                                    ? "✅ Completada"
                                    : "⏳ Pendiente"
                                }
                            </span>
                        </td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;

  section.appendChild(tableContainer);
}

// ======================
// GESTIÓN DE REPUTACIÓN
// ======================

function renderReputacion() {
  const section = document.getElementById("reputacion-section");
  if (!section) return;

  const header = section.querySelector(".section-header");
  section.innerHTML = "";
  section.appendChild(header);

  // Estadísticas de reputación
  const statsGrid = document.createElement("div");
  statsGrid.className = "stats-grid";
  statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon reputation">⭐</div>
            <div class="stat-info">
                <h3>Reputación Global</h3>
                <span class="stat-number">${estadisticas.reputacionGlobal}/5</span>
                <span class="stat-change positive">+0.2 este mes</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">👍</div>
            <div class="stat-info">
                <h3>Calificaciones Positivas</h3>
                <span class="stat-number">85%</span>
                <span class="stat-change positive">+3% este mes</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-info">
                <h3>Total Calificaciones</h3>
                <span class="stat-number">12,456</span>
                <span class="stat-change positive">+342 esta semana</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">⚠️</div>
            <div class="stat-info">
                <h3>Calificaciones Sospechosas</h3>
                <span class="stat-number">23</span>
                <span class="stat-change">En revisión</span>
            </div>
        </div>
    `;
  section.appendChild(statsGrid);

  // Top usuarios por reputación
  const topUsers = document.createElement("div");
  topUsers.className = "recent-activity";
  topUsers.style.marginTop = "30px";
  topUsers.innerHTML = `
        <div class="section-header">
            <h2>👑 Usuarios con Mejor Reputación</h2>
        </div>
        <div class="users-table-container">
            <table class="users-table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Tipo</th>
                        <th>Reputación</th>
                        <th>Transacciones</th>
                        <th>Positivas</th>
                    </tr>
                </thead>
                <tbody>
                    ${usuarios
                      .filter((u) => u.estado === "active")
                      .sort((a, b) => b.reputacion - a.reputacion)
                      .slice(0, 5)
                      .map(
                        (usuario) => `
                            <tr>
                                <td>
                                    <div class="user-cell">
                                        <div class="user-avatar">${
                                          usuario.avatar
                                        }</div>
                                        <div class="user-info">
                                            <span class="user-name">${
                                              usuario.nombre
                                            }</span>
                                            <span class="user-email">${
                                              usuario.email
                                            }</span>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="user-type ${usuario.tipo}">${
                          usuario.tipo === "comprador"
                            ? "Comprador"
                            : "Vendedor"
                        }</span></td>
                                <td>
                                    <div class="reputation-score">
                                        <span class="rating">${
                                          usuario.reputacion
                                        }</span>
                                        <span class="stars">${getStars(
                                          usuario.reputacion
                                        )}</span>
                                    </div>
                                </td>
                                <td>${
                                  usuario.tipo === "comprador"
                                    ? usuario.compras
                                    : usuario.ventas
                                }</td>
                                <td style="color: var(--success-color); font-weight: 600;">${Math.floor(
                                  usuario.reputacion * 20
                                )}%</td>
                            </tr>
                        `
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
    `;
  section.appendChild(topUsers);
}

// ======================
// GESTIÓN DE MODERACIÓN
// ======================

function renderModeracion() {
  // Ya está implementado en el HTML, solo agregamos funcionalidad dinámica
  renderReportesPendientes();
}

function renderReportesPendientes() {
  const reportsList = document.querySelector("#reports-tab .reports-list");
  if (!reportsList) return;

  reportsList.innerHTML = reportes
    .map(
      (reporte) => `
        <div class="report-card">
            <div class="report-header">
                <span class="report-id">#${reporte.id}</span>
                <span class="report-date">${reporte.fecha}</span>
            </div>
            <div class="report-details">
                <div class="reported-user">
                    <strong>Usuario reportado:</strong> ${
                      reporte.usuarioReportado
                    }
                </div>
                <div class="report-reason">
                    <strong>Motivo:</strong> ${reporte.motivo}
                </div>
                <div class="report-description">
                    <strong>Descripción:</strong> ${reporte.descripcion}
                </div>
                <div class="report-status">
                    <strong>Estado:</strong> ${getReportStatus(reporte.estado)}
                </div>
            </div>
            <div class="report-actions">
                <button class="btn-danger" onclick="blockUser('${
                  reporte.usuarioReportado
                }')">🚫 Bloquear Usuario</button>
                <button class="btn-warning" onclick="suspendUserTemporary('${
                  reporte.usuarioReportado
                }')">⏸️ Suspender Temporalmente</button>
                <button class="btn-secondary" onclick="dismissReport('${
                  reporte.id
                }')">✅ Desestimar</button>
                <button class="btn-primary" onclick="investigateReport('${
                  reporte.id
                }')">🔍 Investigar</button>
            </div>
        </div>
    `
    )
    .join("");
}

function getReportStatus(estado) {
  const statuses = {
    pending: "⏳ Pendiente",
    investigating: "🔍 En investigación",
    resolved: "✅ Resuelto",
    dismissed: "❌ Desestimado",
  };
  return statuses[estado] || estado;
}

function openModerationTab(tabName) {
  // Actualizar botones de tabs
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Mostrar contenido del tab
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  document.getElementById(`${tabName}-tab`)?.classList.add("active");
}

function blockUser(userName) {
  if (
    confirm(`¿Estás seguro de bloquear permanentemente al usuario ${userName}?`)
  ) {
    showNotification(`Usuario ${userName} bloqueado permanentemente`, "error");
    // Aquí actualizarías el estado en la base de datos
  }
}

function suspendUserTemporary(userName) {
  if (confirm(`¿Suspender temporalmente al usuario ${userName} por 30 días?`)) {
    showNotification(`Usuario ${userName} suspendido por 30 días`, "warning");
  }
}

function dismissReport(reportId) {
  if (confirm("¿Desestimar este reporte?")) {
    const reporte = reportes.find((r) => r.id === reportId);
    if (reporte) {
      reporte.estado = "dismissed";
      renderReportesPendientes();
      showNotification(`Reporte ${reportId} desestimado`, "info");
      updateModerationBadge();
    }
  }
}

function investigateReport(reportId) {
  const reporte = reportes.find((r) => r.id === reportId);
  if (reporte) {
    reporte.estado = "investigating";
    renderReportesPendientes();
    showNotification(`Investigación iniciada para reporte ${reportId}`, "info");
  }
}

function deleteReview(reviewId) {
  if (confirm("¿Estás seguro de eliminar esta reseña?")) {
    showNotification("Reseña eliminada correctamente", "success");
  }
}

function markReviewValid(reviewId) {
  showNotification("Reseña marcada como válida", "success");
}

function updateModerationBadge() {
  const pendingReports = reportes.filter((r) => r.estado === "pending").length;
  const badge = document.querySelector(
    '.nav-item a[href="#moderacion"] .nav-badge'
  );
  if (badge) {
    badge.textContent = pendingReports;
    badge.style.display = pendingReports > 0 ? "inline-block" : "none";
  }
}

// ======================
// CONFIGURACIÓN
// ======================

function renderConfiguracion() {
  const section = document.getElementById("configuracion-section");
  if (!section) return;

  const header = section.querySelector(".section-header");
  section.innerHTML = "";
  section.appendChild(header);

  const configGrid = document.createElement("div");
  configGrid.className = "stats-grid";
  configGrid.innerHTML = `
        <div class="stat-card" style="cursor: pointer;" onclick="configGeneral()">
            <div class="stat-icon">⚙️</div>
            <div class="stat-info">
                <h3>Configuración General</h3>
                <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    Configuración básica de la plataforma
                </p>
            </div>
        </div>
        
        <div class="stat-card" style="cursor: pointer;" onclick="configComisiones()">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
                <h3>Comisiones</h3>
                <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    Gestionar porcentajes de comisión
                </p>
            </div>
        </div>
        
        <div class="stat-card" style="cursor: pointer;" onclick="configReputacion()">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
                <h3>Sistema de Reputación</h3>
                <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    Configurar parámetros de reputación
                </p>
            </div>
        </div>
        
        <div class="stat-card" style="cursor: pointer;" onclick="configSeguridad()">
            <div class="stat-icon">🔒</div>
            <div class="stat-info">
                <h3>Seguridad</h3>
                <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    Políticas de seguridad y privacidad
                </p>
            </div>
        </div>
        
        <div class="stat-card" style="cursor: pointer;" onclick="configNotificaciones()">
            <div class="stat-icon">🔔</div>
            <div class="stat-info">
                <h3>Notificaciones</h3>
                <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    Configurar sistema de notificaciones
                </p>
            </div>
        </div>
        
        <div class="stat-card" style="cursor: pointer;" onclick="configBackup()">
            <div class="stat-icon">💾</div>
            <div class="stat-info">
                <h3>Respaldo y Restauración</h3>
                <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    Gestionar copias de seguridad
                </p>
            </div>
        </div>
    `;

  section.appendChild(configGrid);
}

function configGeneral() {
  alert(
    "⚙️ Configuración General\n\n" +
      "Parámetros configurables:\n\n" +
      "• Nombre de la plataforma\n" +
      "• Logo y colores\n" +
      "• Información de contacto\n" +
      "• Idioma predeterminado\n" +
      "• Zona horaria\n" +
      "• Moneda predeterminada"
  );
}

function configComisiones() {
  alert(
    "💰 Configuración de Comisiones\n\n" +
      "Comisiones actuales:\n\n" +
      "• Comisión por venta: 10%\n" +
      "• Comisión mínima: $0.50\n" +
      "• Comisión máxima: $500\n\n" +
      "Tipo de cuenta:\n" +
      "• Vendedor Regular: 10%\n" +
      "• Vendedor Premium: 5%\n" +
      "• Vendedor Elite: 3%"
  );
}

function configReputacion() {
  alert(
    "⭐ Sistema de Reputación\n\n" +
      "Parámetros configurables:\n\n" +
      "• Peso de calificaciones positivas\n" +
      "• Peso de calificaciones negativas\n" +
      "• Tiempo de validez de calificaciones\n" +
      "• Umbral de confianza mínimo\n" +
      "• Criterios de suspensión automática\n" +
      "• Bonificaciones por buena reputación"
  );
}

function configSeguridad() {
  alert(
    "🔒 Configuración de Seguridad\n\n" +
      "Políticas actuales:\n\n" +
      "✅ Verificación de email activa\n" +
      "✅ Autenticación de dos factores\n" +
      "✅ Encriptación de datos\n" +
      "✅ Detección de fraude\n" +
      "✅ Bloqueo automático de cuentas sospechosas\n" +
      "✅ Logs de auditoría"
  );
}

function configNotificaciones() {
  alert(
    "🔔 Configuración de Notificaciones\n\n" +
      "Tipos de notificaciones:\n\n" +
      "• Email transaccional\n" +
      "• Email marketing\n" +
      "• Notificaciones push\n" +
      "• SMS (opcional)\n" +
      "• Alertas del sistema\n\n" +
      "Frecuencia:\n" +
      "• Inmediatas\n" +
      "• Resumen diario\n" +
      "• Resumen semanal"
  );
}

function configBackup() {
  alert(
    "💾 Respaldo y Restauración\n\n" +
      "Configuración actual:\n\n" +
      "• Respaldo automático: Activo\n" +
      "• Frecuencia: Diaria (2:00 AM)\n" +
      "• Retención: 30 días\n" +
      "• Último respaldo: Hoy, 02:15 AM\n" +
      "• Tamaño: 2.4 GB\n\n" +
      "Opciones:\n" +
      "• Realizar respaldo manual\n" +
      "• Restaurar desde respaldo\n" +
      "• Descargar respaldo\n" +
      "• Configurar retención"
  );
}

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

// ======================
// ACTUALIZACIÓN DE ESTADÍSTICAS
// ======================

function updateDashboardStats() {
  // Actualizar contadores en tiempo real
  estadisticas.totalUsuarios = usuarios.length;
  estadisticas.compradores = usuarios.filter(
    (u) => u.tipo === "comprador"
  ).length;
  estadisticas.vendedores = usuarios.filter(
    (u) => u.tipo === "vendedor"
  ).length;
  estadisticas.totalProductos = productos.length;
  estadisticas.productosActivos = productos.filter(
    (p) => p.estado === "active"
  ).length;
  estadisticas.productosInactivos = productos.filter(
    (p) => p.estado === "inactive"
  ).length;
  estadisticas.reportesPendientes = reportes.filter(
    (r) => r.estado === "pending"
  ).length;
}

// ======================
// ACTIVIDAD RECIENTE
// ======================

function addRecentActivity(type, description) {
  const activityList = document.querySelector(".activity-list");
  if (!activityList) return;

  const icons = {
    user: "👤",
    product: "📦",
    sale: "💰",
    report: "⚠️",
  };

  const colors = {
    user: "new-user",
    product: "new-product",
    sale: "sale",
    report: "report",
  };

  const activityItem = document.createElement("div");
  activityItem.className = "activity-item";
  activityItem.innerHTML = `
        <div class="activity-icon ${colors[type]}">${icons[type]}</div>
        <div class="activity-content">
            <p>${description}</p>
            <span class="activity-time">Hace un momento</span>
        </div>
    `;

  activityList.insertBefore(activityItem, activityList.firstChild);

  // Mantener solo las últimas 10 actividades
  while (activityList.children.length > 10) {
    activityList.removeChild(activityList.lastChild);
  }
}

// ======================
// EXPORTAR DATOS
// ======================

function exportarUsuarios() {
  const csv = convertToCSV(usuarios);
  downloadCSV(csv, "usuarios.csv");
  showNotification("Usuarios exportados correctamente", "success");
}

function exportarProductos() {
  const csv = convertToCSV(productos);
  downloadCSV(csv, "productos.csv");
  showNotification("Productos exportados correctamente", "success");
}

function exportarVentas() {
  const csv = convertToCSV(ventas);
  downloadCSV(csv, "ventas.csv");
  showNotification("Ventas exportadas correctamente", "success");
}

function convertToCSV(data) {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Agregar encabezados
  csvRows.push(headers.join(","));

  // Agregar datos
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header];
      return typeof value === "string" ? `"${value}"` : value;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ======================
// INICIALIZACIÓN
// ======================

document.addEventListener("DOMContentLoaded", function () {
  // Actualizar estadísticas iniciales
  updateDashboardStats();
  updateModerationBadge();

  // Renderizar contenido inicial
  renderUsuarios();

  // Configurar event listeners
  setupEventListeners();

  // Simular actividad en tiempo real (demo)
  simulateRealTimeActivity();
});

function setupEventListeners() {
  // Event listeners ya configurados en las funciones individuales
}

function simulateRealTimeActivity() {
  // Simular nueva actividad cada 30 segundos (solo para demo)
  setInterval(() => {
    const activities = [
      {
        type: "user",
        desc: "<strong>Nuevo usuario registrado:</strong> Usuario Demo",
      },
      {
        type: "product",
        desc: "<strong>Nuevo producto publicado:</strong> Producto Demo",
      },
      { type: "sale", desc: "<strong>Venta completada:</strong> $199.99" },
    ];

    const random = activities[Math.floor(Math.random() * activities.length)];
    // addRecentActivity(random.type, random.desc);
  }, 30000);
}

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
    
    .stat-card {
        cursor: default;
    }
    
    .stat-card[onclick] {
        cursor: pointer;
    }
    
    .suspicious-user-card {
        background: var(--surface-color);
        padding: 20px;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow);
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }
    
    .suspicious-user-card .user-info {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .suspicious-user-card .user-details h4 {
        font-size: 16px;
        margin-bottom: 5px;
    }
    
    .suspicious-user-card .user-details p {
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 8px;
    }
    
    .risk-indicator {
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
    }
    
    .risk-indicator.high-risk {
        background: #fef2f2;
        color: #dc2626;
    }
    
    .suspicious-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .review-card {
        background: var(--surface-color);
        padding: 20px;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow);
        margin-bottom: 15px;
    }
    
    .review-card.questionable {
        border-left: 4px solid var(--warning-color);
    }
    
    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--border-color);
    }
    
    .reviewer {
        font-weight: 600;
        color: var(--text-primary);
    }
    
    .review-date {
        font-size: 12px;
        color: var(--text-secondary);
    }
    
    .review-content {
        margin-bottom: 15px;
    }
    
    .review-rating {
        font-size: 16px;
        margin-bottom: 8px;
    }
    
    .review-text {
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 10px;
        line-height: 1.5;
    }
    
    .review-meta {
        display: flex;
        gap: 15px;
        font-size: 12px;
        color: var(--text-secondary);
    }
    
    .review-flags {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }
    
    .flag {
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        background: #fef3c7;
        color: #92400e;
    }
    
    .review-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
`;
document.head.appendChild(style);

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
