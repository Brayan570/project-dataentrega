// login.js - Sistema de autenticación para Confio

// Datos de usuarios de ejemplo (en un sistema real esto vendría de una base de datos)
const users = {
    // Compradores
    'cliente@confio.com': {
        password: 'cliente123',
        type: 'comprador',
        name: 'Carlos Mendoza',
        redirect: 'dashboard_comprador.html'
    },
    'maria@confio.com': {
        password: 'maria123',
        type: 'comprador', 
        name: 'María González',
        redirect: 'dashboard_comprador.html'
    },
    
    // Vendedores
    'vendedor@confio.com': {
        password: 'vendedor123',
        type: 'vendedor',
        name: 'Ana García',
        redirect: 'dashboard_vendedor.html'
    },
    'tech@store.com': {
        password: 'tech123',
        type: 'vendedor',
        name: 'TechStore',
        redirect: 'dashboard_vendedor.html'
    },
    
    // Administradores
    'admin@confio.com': {
        password: 'admin123',
        type: 'admin',
        name: 'Admin Principal',
        redirect: 'dashboard_admin.html'
    },
    'moderador@confio.com': {
        password: 'mod123',
        type: 'admin',
        name: 'Moderador',
        redirect: 'dashboard_admin.html'
    }
};

// Función para mostrar/ocultar contraseña
function toggleLoginPassword() {
    const passwordInput = document.getElementById('loginPassword');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

// Función para simular login con redes sociales
function loginWithGoogle() {
    alert('Inicio de sesión con Google - Funcionalidad en desarrollo');
    // En un sistema real, aquí iría la integración con Google OAuth
}

function loginWithFacebook() {
    alert('Inicio de sesión con Facebook - Funcionalidad en desarrollo');
    // En un sistema real, aquí iría la integración con Facebook OAuth
}

// Función principal de login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('userType').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validaciones básicas
    if (!email || !password || !userType) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Simular verificación de credenciales
    const user = users[email];
    
    if (user && user.password === password && user.type === userType) {
        // Credenciales correctas
        loginSuccess(user, rememberMe);
    } else {
        // Credenciales incorrectas
        showMessage('Credenciales incorrectas o tipo de cuenta no coincide', 'error');
    }
}

// Función cuando el login es exitoso
function loginSuccess(user, rememberMe) {
    // Guardar datos de usuario en localStorage
    const userData = {
        email: document.getElementById('loginEmail').value,
        name: user.name,
        type: user.type,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('confio_user', JSON.stringify(userData));
    
    // Si el usuario quiere recordar sesión, guardar por más tiempo
    if (rememberMe) {
        localStorage.setItem('confio_remember', 'true');
    }
    
    showMessage(`¡Bienvenido ${user.name}!`, 'success');
    
    // Redirigir después de un breve delay
    setTimeout(() => {
        window.location.href = user.redirect;
    }, 1000);
}

// Función para mostrar mensajes
function showMessage(message, type = 'info') {
    // Remover mensajes anteriores
    const existingMessage = document.querySelector('.login-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `login-message ${type}`;
    messageDiv.textContent = message;
    
    // Estilos para el mensaje
    messageDiv.style.cssText = `
        padding: 12px 16px;
        margin: 15px 0;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        ${type === 'error' ? 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;' : ''}
        ${type === 'success' ? 'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' : ''}
        ${type === 'info' ? 'background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe;' : ''}
    `;
    
    // Insertar antes del formulario
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Verificar si ya hay una sesión activa al cargar la página
function checkExistingSession() {
    const userData = localStorage.getItem('confio_user');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            const remember = localStorage.getItem('confio_remember');
            
            // Si la sesión fue recordada, redirigir automáticamente
            if (remember === 'true') {
                const usersMap = {
                    'comprador': 'dashboard_comprador.html',
                    'vendedor': 'dashboard_vendedor.html', 
                    'admin': 'dashboard_admin.html'
                };
                
                if (usersMap[user.type]) {
                    window.location.href = usersMap[user.type];
                }
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Limpiar datos corruptos
            localStorage.removeItem('confio_user');
            localStorage.removeItem('confio_remember');
        }
    }
}

// Demo rápido - función para llenar credenciales de demo
function fillDemoCredentials(type) {
    const demos = {
        'comprador': { email: 'cliente@confio.com', password: 'cliente123' },
        'vendedor': { email: 'vendedor@confio.com', password: 'vendedor123' },
        'admin': { email: 'admin@confio.com', password: 'admin123' }
    };
    
    const demo = demos[type];
    if (demo) {
        document.getElementById('loginEmail').value = demo.email;
        document.getElementById('loginPassword').value = demo.password;
        document.getElementById('userType').value = type;
        showMessage(`Credenciales de ${type} cargadas. Haz clic en "Iniciar Sesión"`, 'info');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el event listener del formulario
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Verificar sesión existente
    checkExistingSession();
    
    // Agregar botones de demo (solo para desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        addDemoButtons();
    }
});

// Función para agregar botones de demo (solo en desarrollo)
function addDemoButtons() {
    const demoHTML = `
        <div class="demo-buttons" style="margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 10px; border: 1px dashed #cbd5e1;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b; text-align: center;">DEMO - Credenciales de prueba:</p>
            <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                <button type="button" onclick="fillDemoCredentials('comprador')" class="btn-demo" style="padding: 8px 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">Comprador</button>
                <button type="button" onclick="fillDemoCredentials('vendedor')" class="btn-demo" style="padding: 8px 12px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">Vendedor</button>
                <button type="button" onclick="fillDemoCredentials('admin')" class="btn-demo" style="padding: 8px 12px; background: #ef4444; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">Admin</button>
            </div>
        </div>
    `;
    
    const form = document.getElementById('loginForm');
    form.parentNode.insertAdjacentHTML('beforebegin', demoHTML);
}

// Hacer funciones globales para los onclick
window.toggleLoginPassword = toggleLoginPassword;
window.loginWithGoogle = loginWithGoogle;
window.loginWithFacebook = loginWithFacebook;
window.fillDemoCredentials = fillDemoCredentials;