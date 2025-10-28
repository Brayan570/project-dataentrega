// Verificar autenticación para vendedor
function checkAuth() {
    const user = localStorage.getItem('confio_user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    
    try {
        const userData = JSON.parse(user);
        if (userData.type !== 'vendedor') {
            window.location.href = 'login.html';
            return null;
        }
        return userData;
    } catch (error) {
        window.location.href = 'login.html';
        return null;
    }
}

// En el DOMContentLoaded de dashboard_vendedor.js
document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (!user) return;
    
    // Actualizar interfaz con datos del usuario
    const userNameElement = document.querySelector('.user-name');
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
            const navLinks = document.querySelectorAll('.nav-item a');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = e.currentTarget.getAttribute('href').substring(1);
                    this.showSection(target);
                });
            });
        }

        showSection(sectionName) {
            // Ocultar todas las secciones
            const sections = document.querySelectorAll('.main-content');
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Mostrar sección seleccionada
            const targetSection = document.getElementById(`${sectionName}-section`);
            if (targetSection) {
                targetSection.style.display = 'block';
            }

            // Actualizar navegación activa
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`a[href="#${sectionName}"]`).closest('.nav-item').classList.add('active');
        }

        initProductModal() {
            const photoUpload = document.getElementById('photoUpload');
            const fileInput = document.getElementById('productPhotos');
            
            photoUpload.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files);
            });

            document.getElementById('productForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProduct();
            });
        }

        handleImageUpload(files) {
            const preview = document.getElementById('uploadPreview');
            preview.innerHTML = '';
            
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imgContainer = document.createElement('div');
                        imgContainer.className = 'image-preview';
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
                name: document.getElementById('productName').value,
                description: document.getElementById('productDescription').value,
                price: document.getElementById('productPrice').value,
                stock: document.getElementById('productStock').value,
                category: document.getElementById('productCategory').value
            };

            // Aquí iría la lógica para guardar el producto
            console.log('Guardando producto:', formData);
            this.showNotification('Producto guardado correctamente', 'success');
            this.closeProductModal();
        }

        initDeliveryModal() {
            // Inicializar modal de entrega
        }

        // Funciones para productos
        openProductModal() {
            document.getElementById('productModal').style.display = 'flex';
        }

        closeProductModal() {
            document.getElementById('productModal').style.display = 'none';
            document.getElementById('productForm').reset();
            document.getElementById('uploadPreview').innerHTML = '';
        }

        editProduct(productId) {
            // Lógica para editar producto
            this.openProductModal();
            // Cargar datos del producto
            console.log('Editando producto:', productId);
        }

        deleteProduct(productId) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                // Lógica para eliminar producto
                console.log('Eliminando producto:', productId);
                this.showNotification('Producto eliminado', 'success');
            }
        }

        // Funciones para pedidos
        markAsProcessing(orderId) {
            if (confirm('¿Marcar pedido como en proceso?')) {
                // Lógica para cambiar estado
                console.log('Pedido en proceso:', orderId);
                this.showNotification('Pedido marcado como en proceso', 'success');
            }
        }

        cancelOrder(orderId) {
            if (confirm('¿Cancelar este pedido?')) {
                // Lógica para cancelar pedido
                console.log('Pedido cancelado:', orderId);
                this.showNotification('Pedido cancelado', 'warning');
            }
        }

        markAsDelivered(orderId) {
            this.currentOrderId = orderId;
            document.getElementById('deliveryModal').style.display = 'flex';
            this.selectedRating = null;
            document.getElementById('confirmDeliveryBtn').disabled = true;
            
            // Resetear selección
            document.querySelectorAll('.rating-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            document.getElementById('commentSection').style.display = 'none';
        }

        selectRating(rating) {
            this.selectedRating = rating;
            document.getElementById('confirmDeliveryBtn').disabled = false;
            
            // Actualizar UI
            document.querySelectorAll('.rating-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            event.target.closest('.rating-btn').classList.add('selected');
            
            // Mostrar sección de comentarios
            document.getElementById('commentSection').style.display = 'block';
        }

        confirmDelivery() {
            if (!this.selectedRating) return;

            const comment = document.getElementById('deliveryComment').value;
            
            // Lógica para confirmar entrega
            console.log('Entrega confirmada:', {
                orderId: this.currentOrderId,
                rating: this.selectedRating,
                comment: comment
            });

            this.showNotification('Entrega confirmada correctamente', 'success');
            this.closeDeliveryModal();
        }

        closeDeliveryModal() {
            document.getElementById('deliveryModal').style.display = 'none';
            this.currentOrderId = null;
            this.selectedRating = null;
        }

        viewOrderDetails(orderId) {
            // Lógica para ver detalles del pedido
            console.log('Viendo detalles del pedido:', orderId);
        }

        // Funciones para reputación
        filterClients() {
            const filter = document.getElementById('trustFilter').value;
            // Lógica para filtrar clientes
            console.log('Filtrando clientes por:', filter);
        }

        // Utilidades
        showNotification(message, type = 'info') {
            // Implementar sistema de notificaciones toast
            alert(`[${type.toUpperCase()}] ${message}`);
        }
    }

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
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
        const filter = document.getElementById('statusFilter').value;
        const rows = document.querySelectorAll('.order-row');
        
        rows.forEach(row => {
            if (filter === 'all' || row.classList.contains(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});

function filterClients() {
    window.vendedorSections.filterClients();
}


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