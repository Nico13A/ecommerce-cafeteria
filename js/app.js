import { eliminarDelCarrito, restarCantidadProducto, sumarCantidadProducto, calcularTotalAPagar } from "./carrito.js";

/**
 * Verifica si un producto ya existe en el carrito.
 * @param {Object} producto 
 * @param {Array} carrito 
 * @returns {boolean} 
 */
const seRepiteProducto = (producto, carrito) => {
    let seRepite = false;
    let i = 0;
    while (i < carrito.length && !seRepite) {
        let productoDelCarrito = carrito[i];
        if (producto.idProducto === productoDelCarrito.idProducto) {
            seRepite = true;
        }
        i++;
    }
    return seRepite;
}

/**
 * Agrega un producto al carrito si no está repetido.
 * @param {Object} producto 
 */
export const agregarProducto = producto => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (!seRepiteProducto(producto, carrito)) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

/**
 * Actualiza el contador visual del carrito según los productos almacenados.
 */
export const contarCarrito = () => {
    const contador = document.getElementById('contador');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length > 0) {
        contador.style.display = "inline-block";
        contador.textContent = carrito.length;
    } else {
        contador.style.display = "none";
    }
}

/**
 * Actualiza visualmente el contenido del carrito en la interfaz de usuario.
 */
const agregarContenidoAlCarrito = () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorProductos = document.querySelector('.shop__products');
    contenedorProductos.innerHTML = "";

    if (carrito.length > 0) {
        carrito.forEach(producto => {
            const contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('shop__product');

            const imagenProducto = document.createElement('img');
            imagenProducto.classList.add('shop__product__img');
            imagenProducto.src = producto.img;

            const textoProducto = document.createElement('div');
            textoProducto.classList.add('shop__product__text');
            textoProducto.innerHTML = `
                <p>${producto.descripcion}</p>
                <p>Precio: <span>$${producto.precio}</span></p>
            `;

            const operacionesProducto = document.createElement('div');
            operacionesProducto.classList.add('shop__product__operations');

            const botonRestar = document.createElement('button');
            botonRestar.classList.add('shop__product__restar');
            botonRestar.textContent = "-";
            botonRestar.addEventListener('click', () => {
                restarCantidadProducto(producto.idProducto, agregarContenidoAlCarrito);
            });

            const contador = document.createElement('span');
            contador.classList.add('shop__product__contador');
            contador.textContent = producto.cantidad;

            const botonSumar = document.createElement('button');
            botonSumar.classList.add('shop__product__sumar');
            botonSumar.textContent = "+";
            botonSumar.addEventListener('click', () => {
                sumarCantidadProducto(producto.idProducto, agregarContenidoAlCarrito);
            });

            operacionesProducto.appendChild(botonRestar);
            operacionesProducto.appendChild(contador);
            operacionesProducto.appendChild(botonSumar);

            const botonEliminar = document.createElement('div');
            botonEliminar.classList.add('shop__product__delete');
            botonEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>';
            botonEliminar.addEventListener('click', () => {
                eliminarDelCarrito(producto.idProducto, agregarContenidoAlCarrito);
                contarCarrito();
            });

            contenedorProducto.appendChild(imagenProducto);
            contenedorProducto.appendChild(textoProducto);
            contenedorProducto.appendChild(operacionesProducto);
            contenedorProducto.appendChild(botonEliminar);

            contenedorProductos.appendChild(contenedorProducto);
        });
    }

    const totalAPagar = document.getElementById('total-a-pagar');
    totalAPagar.textContent = `$${calcularTotalAPagar().toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const cartShopping = document.getElementById('cart-shopping');
    const iconoCarrito = document.querySelector('.fa-cart-shopping');
    const botonCierre = document.getElementById('close-button');
    const finalizarCompra = document.getElementById('pagar');

    const locacionActual = window.location.href;
    const menuItems = document.querySelectorAll('.menu__list__item a');

    menuItems.forEach(item => {
        if (item.href === locacionActual) {
            item.parentElement.classList.add('menu__list__item--active');
        }
    });

    contarCarrito();
    
    finalizarCompra.addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length > 0) {
            alert('Compra realizada con éxito.');
            localStorage.setItem('carrito', JSON.stringify([]));
            agregarContenidoAlCarrito();
            contarCarrito();
        }
        else {
            alert('No se pudo completar la compra porque no hay productos en el carrito.')
        }
    })
    
    /**
     * Abre el carrito de compras.
     * Muestra el contenedor del carrito, bloquea el scroll de la página principal
     * y actualiza el contenido del carrito.
     */
    const abrirCarrito = () => {
        cartShopping.style.display = "flex";
        document.body.style.overflowY = "hidden";
        window.scroll({ top: 0, behavior: 'smooth' });
        agregarContenidoAlCarrito();
    }
    
    /**
     * Cierra el carrito de compras.
     * Oculta el contenedor del carrito y restaura el scroll de la página principal.
     */
    const cerrarCarrito = () => {
        cartShopping.style.display = "none";
        document.body.style.overflowY = "auto";
    }
    
    iconoCarrito.addEventListener('click', abrirCarrito);
    botonCierre.addEventListener('click', cerrarCarrito);
});
