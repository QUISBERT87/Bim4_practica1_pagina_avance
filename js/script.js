// Estado de la aplicación
let cart = [];

// Elementos del DOM
const cartToggle = document.getElementById('cartToggle');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const addButtons = document.querySelectorAll('.add-to-cart');

// Abrir y Cerrar Carrito
cartToggle.addEventListener('click', () => cartModal.style.display = 'flex');
closeCart.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => { if(e.target === cartModal) cartModal.style.display = 'none'; });

// Añadir Productos al Carrito
addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));

        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    // Comprobar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateUI();
}

// Actualizar la interfaz del Carrito
function updateUI() {
    // 1. Contador del carrito
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;

    // 2. Renderizar lista de artículos
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // 3. Calcular Precio Total
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.textContent = totalPrice.toFixed(2);
}
