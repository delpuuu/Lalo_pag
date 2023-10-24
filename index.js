const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart'); // Muestra u oculta el carrito de compras al hacer clic en el icono.
});

/* ========================= */
// Variables para interactuar con los productos y el carrito
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items'); // Lista de productos
let allProducts = []; // Arreglo que almacena los productos en el carrito
const valorTotal = document.querySelector('.total-pagar'); // Elemento que muestra el total a pagar
const countProducts = document.querySelector('#contador-productos'); // Elemento que muestra la cantidad de productos en el carrito
const cartEmpty = document.querySelector('.cart-empty'); // Mensaje de carrito vacío
const cartTotal = document.querySelector('.cart-total'); // Sección del total

// Evento al hacer clic en un botón "Añadir al carrito" en los productos
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement; // Contenedor del producto
        // Información del producto a agregar al carrito
        const infoProduct = {
            quantity: 1, // Cantidad inicial del producto
            title: product.querySelector('h2').textContent, // Nombre del producto
            price: product.querySelector('p').textContent, // Precio del producto
        };
        const exists = allProducts.some(product => product.title === infoProduct.title);
        if (exists) {
            // Si el producto ya está en el carrito, se actualiza su cantidad
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            // Si el producto no está en el carrito, se agrega
            allProducts = [...allProducts, infoProduct];
        }
        showHTML();
    }
});

// Evento al hacer clic en el ícono de cierre (quitar producto) en el carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement; // Contenedor del producto en el carrito
        const title = product.querySelector('p').textContent; // Nombre del producto en el carrito
        allProducts = allProducts.filter(product => product.title !== title); // Se quita el producto del carrito
        showHTML();
    }
});

// Función para actualizar la visualización del carrito en la página
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden'); // Muestra el mensaje "El carrito está vacío"
        rowProduct.classList.add('hidden'); // Oculta los productos en el carrito
        cartTotal.classList.add('hidden'); // Oculta la sección del total
    } else {
        cartEmpty.classList.add('hidden'); // Oculta el mensaje "El carrito está vacío"
        rowProduct.classList.remove('hidden'); // Muestra los productos en el carrito
        cartTotal.classList.remove('hidden'); // Muestra la sección del total
    }

    rowProduct.innerHTML = ''; // Limpia los productos en el carrito
    let total = 0;
    let totalOfProducts = 0;

    // Recorre los productos en el carrito y los muestra en la página
    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        rowProduct.append(containerProduct);
        // Calcula el total y la cantidad total de productos en el carrito
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`; // Actualiza el total a pagar
    countProducts.innerText = totalOfProducts; // Actualiza la cantidad de productos en el carrito
};