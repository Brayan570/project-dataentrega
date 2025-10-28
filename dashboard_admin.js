// dashboard_admin.js
function checkAuth() {
    const user = localStorage.getItem('confio_user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    
    try {
        const userData = JSON.parse(user);
        if (userData.type !== 'admin') {
            window.location.href = 'login.html';
            return null;
        }
        return userData;
    } catch (error) {
        window.location.href = 'login.html';
        return null;
    }
}

// En el DOMContentLoaded de dashboard_admin.js
document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (!user) return;
    
    // Actualizar interfaz con datos del admin
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = user.name;
    }
    // Navegación entre secciones
    function showSection(sectionName) {
        console.log('Cambiando a sección:', sectionName);
        
        // Ocultar todas las secciones
        const sections = [
            'dashboard', 'usuarios', 'productos', 
            'ventas', 'reputacion', 'moderacion', 'configuracion'
        ];
        
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

    // Moderación - Tabs
    function openModerationTab(tabName) {
        // Ocultar todos los tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remover active de todos los botones
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        // Mostrar tab seleccionado
        const targetTab = document.getElementById(tabName + '-tab');
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // Activar botón
        event.target.classList.add('active');
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
                totalSpent: "$1,245.50"
            },
            2: {
                name: "TechStore",
                email: "tech@store.com",
                type: "Vendedor",
                registration: "10 Nov, 2024",
                status: "Activo",
                reputation: "4.6/5",
                totalProducts: 45,
                totalSales: "$12,847.00"
            }
        };
        
        const user = users[userId];
        if (user) {
            alert(`Detalles del Usuario #${userId}\n\n` +
                `Nombre: ${user.name}\n` +
                `Email: ${user.email}\n` +
                `Tipo: ${user.type}\n` +
                `Registro: ${user.registration}\n` +
                `Estado: ${user.status}\n` +
                `Reputación: ${user.reputation}\n` +
                user.type === "Comprador" ? 
                `Compras: ${user.totalPurchases}\nTotal gastado: ${user.totalSpent}` :
                `Productos: ${user.totalProducts}\nVentas totales: ${user.totalSales}`);
        }
    }

    function suspendUser(userId) {
        if (confirm('¿Estás seguro de que quieres suspender este usuario?')) {
            alert(`Usuario #${userId} suspendido temporalmente.\nEl usuario no podrá acceder a la plataforma por 30 días.`);
            // Aquí iría la lógica real para suspender al usuario
        }
    }

    function activateUser(userId) {
        if (confirm('¿Activar este usuario?')) {
            alert(`Usuario #${userId} activado exitosamente.`);
            // Aquí iría la lógica real para activar al usuario
        }
    }

    // Funciones de moderación
    function blockUser(username) {
        if (confirm(`¿Bloquear permanentemente al usuario "${username}"?`)) {
            alert(`Usuario "${username}" bloqueado permanentemente.\nTodas sus cuentas asociadas serán suspendidas.`);
            // Aquí iría la lógica real para bloquear al usuario
        }
    }

    function suspendUserTemporary(username) {
        if (confirm(`¿Suspender temporalmente al usuario "${username}" por 30 días?`)) {
            alert(`Usuario "${username}" suspendido por 30 días.\nSe notificará al usuario sobre esta acción.`);
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
        alert(`Iniciando investigación del reporte ${reportId}...\nSe ha creado un caso de investigación.`);
        // Aquí iría la lógica real para iniciar investigación
    }

    function deleteReview(reviewId) {
        if (confirm('¿Eliminar esta reseña?')) {
            alert(`Reseña #${reviewId} eliminada permanentemente.`);
            // Aquí iría la lógica real para eliminar la reseña
        }
    }

    function markReviewValid(reviewId) {
        if (confirm('¿Marcar esta reseña como válida?')) {
            alert(`Reseña #${reviewId} marcada como válida.\nSe eliminará de la lista de sospechosas.`);
            // Aquí iría la lógica real para marcar como válida
        }
    }

    // Inicialización
    document.addEventListener('DOMContentLoaded', function() {
        // Mostrar dashboard por defecto
        showSection('dashboard');
        
        // Configurar event listeners para navegación
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href').substring(1);
                showSection(target);
            });
        });
        
        // Simular notificaciones en tiempo real
        setInterval(() => {
            const badge = document.querySelector('.notification-badge');
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
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('confio_user');
        localStorage.removeItem('confio_remember');
        window.location.href = 'login.html';
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
