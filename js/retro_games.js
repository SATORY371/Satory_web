/**
 * Lógica de Tienda de Videojuegos Retro
 * Maneja las operaciones CRUD para la gestión de inventario.
 * Utiliza localStorage para persistir datos en el prototipo.
 */

// --- Constantes & Estado ---
const STORAGE_KEY = 'retro_games_inventory_es'; // Changed key to avoid conflict with English version
let products = [];

// --- Elementos DOM ---
const productForm = document.getElementById('productForm');
const productsTableBody = document.querySelector('#productsTable tbody');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const cancelBtn = document.getElementById('cancelBtn');

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    renderTable();
});

// --- Funciones Principales ---

// Cargar datos de localStorage o establecer datos de muestra iniciales
function loadProducts() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        products = JSON.parse(storedData);
    } else {
        // Datos de Muestra Iniciales (según SQL)
        products = [
            { id: 1, nombre: 'Super Mario 64', unidad: 'Nintendo 64', precio: 45.00, stock: 12, estado: 'Completo' },
            { id: 2, nombre: 'Consola PlayStation 1', unidad: 'Hardware', precio: 85.50, stock: 5, estado: 'Activo' },
            { id: 3, nombre: 'Zelda: Ocarina of Time', unidad: 'Nintendo 64', precio: 55.00, stock: 8, estado: 'Suelto' }
        ];
        saveProducts();
    }
}

// Guardar en localStorage
function saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Generar Siguiente ID (Simulación de auto-incremento)
function getNextId() {
    if (products.length === 0) return 1;
    const maxId = Math.max(...products.map(p => p.id));
    return maxId + 1;
}

// Renderizar la Tabla de Inventario
function renderTable(filterText = '') {
    productsTableBody.innerHTML = '';

    const filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
        product.unidad.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';

        filteredProducts.forEach(product => {
            const tr = document.createElement('tr');

            // Formatear Precio
            const formattedPrice = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(product.precio);

            // Lógica de Badges (Insignias)
            let badgeClass = 'badge-active';
            if (product.estado === 'Sellado') badgeClass = 'badge-sealed';
            if (product.estado === 'Dañado') badgeClass = 'badge-damaged';

            tr.innerHTML = `
                <td class="id-cell">#${String(product.id).padStart(3, '0')}</td>
                <td><strong>${product.nombre}</strong></td>
                <td><span class="platform-tag">${product.unidad}</span></td>
                <td class="price-cell">${formattedPrice}</td>
                <td class="stock-cell">${product.stock}</td>
                <td><span class="badge ${badgeClass}">${product.estado}</span></td>
                <td>
                    <button onclick="editProduct(${product.id})" class="btn-icon btn-edit" title="Editar Sistema"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteProduct(${product.id})" class="btn-icon btn-delete" title="Borrar Datos"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            `;
            productsTableBody.appendChild(tr);
        });
    }
}

// --- Event Listeners ---

// Envío del Formulario (Agregar o Actualizar)
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const idInput = document.getElementById('productId').value;
    const nombre = document.getElementById('nombre').value;
    const unidad = document.getElementById('unidad').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    const estado = document.getElementById('estado').value;

    if (idInput) {
        // Actualizar Existente
        const index = products.findIndex(p => p.id == idInput);
        if (index !== -1) {
            products[index] = { id: parseInt(idInput), nombre, unidad, precio, stock, estado };
            showNotification('ACTUALIZACIÓN DEL SISTEMA EXITOSA', 'success');
        }
    } else {
        // Crear Nuevo
        const newProduct = {
            id: getNextId(),
            nombre,
            unidad,
            precio,
            stock,
            estado
        };
        products.push(newProduct);
        showNotification('NUEVA ENTRADA AGREGADA A LA BASE DE DATOS', 'success');
    }

    saveProducts();
    renderTable();
    resetForm();
});

// Funcionalidad de Búsqueda
searchInput.addEventListener('input', (e) => {
    renderTable(e.target.value);
});

// Cancelar Edición
cancelBtn.addEventListener('click', resetForm);

// --- Funciones de Acción ---

window.deleteProduct = function (id) {
    if (confirm('ADVERTENCIA: ¿BORRAR DATOS PERMANENTEMENTE?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderTable(searchInput.value);
        showNotification('DATOS PURGADOS', 'danger');
    }
};

window.editProduct = function (id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('nombre').value = product.nombre;
        document.getElementById('unidad').value = product.unidad;
        document.getElementById('precio').value = product.precio;
        document.getElementById('stock').value = product.stock;
        document.getElementById('estado').value = product.estado;

        // Cambiar estado del botón
        const submitBtn = productForm.querySelector('button[type="submit"] span.btn-text');
        submitBtn.textContent = 'ACTUALIZAR SISTEMA';
        cancelBtn.style.display = 'inline-block';

        // Desplazarse al formulario
        productForm.scrollIntoView({ behavior: 'smooth' });
    }
};

function resetForm() {
    productForm.reset();
    document.getElementById('productId').value = '';
    productForm.querySelector('button[type="submit"] span.btn-text').textContent = 'GUARDAR EN BASE DE DATOS';
    cancelBtn.style.display = 'none';
}

function showNotification(msg, type = 'success') {
    // Alerta simple para prototipo, podría ser un toast personalizado
    // alert(msg); 
    console.log(`Notificación [${type}]: ${msg}`);
}
