import { calcularSubtotal, eliminarDelCarrito, restarCantidadProducto, sumarCantidadProducto, actualizarTotalAPagar } from "./carrito.js";

const mostrarResumenCompra = () => {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    const productos = document.querySelector('.hero__productos');
    const resumenCompra = document.querySelector('.hero__resumen');

    productos.innerHTML = "";

    carrito.forEach(producto => {
        
        const productoContenedor = document.createElement('div');
        productoContenedor.classList.add('producto');
        
        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.img;
        imagenProducto.alt = producto.nombre;
        imagenProducto.classList.add('producto__img');

        const descripcionProducto = document.createElement('p');
        descripcionProducto.textContent = producto.nombre;
        descripcionProducto.classList.add('producto__descripcion');

        const operacionesContenedor = document.createElement('div');

        const botonRestar = document.createElement('button');
        botonRestar.textContent = '-';
        botonRestar.addEventListener('click', () => {
            restarCantidadProducto(producto.idProducto, mostrarResumenCompra);
        });

        const contador = document.createElement('span');
        contador.textContent = producto.cantidad;

        const botonSumar = document.createElement('button');
        botonSumar.textContent = '+';
        botonSumar.addEventListener('click', () => {
            sumarCantidadProducto(producto.idProducto, mostrarResumenCompra);
        });

        operacionesContenedor.appendChild(botonRestar);
        operacionesContenedor.appendChild(contador);
        operacionesContenedor.appendChild(botonSumar);

        const contenedorSubtotal = document.createElement('div');
        contenedorSubtotal.classList.add('producto__subtotal');

        const subTotal = document.createElement('h4');
        subTotal.textContent = 'Subtotal';

        const precioSubtotal = document.createElement('p');
        precioSubtotal.textContent = `$${calcularSubtotal(producto)}`;

        contenedorSubtotal.appendChild(subTotal);
        contenedorSubtotal.appendChild(precioSubtotal);

        const botonEliminar = document.createElement('i');
        botonEliminar.classList.add('fa-solid', 'fa-trash');
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(producto.idProducto, mostrarResumenCompra);
            if (productos.childElementCount < 1) {
                mostrarMensajeVacio();
            }
        });

        productoContenedor.appendChild(imagenProducto);
        productoContenedor.appendChild(descripcionProducto);
        productoContenedor.appendChild(operacionesContenedor);
        productoContenedor.appendChild(contenedorSubtotal);
        productoContenedor.appendChild(botonEliminar);

        productos.appendChild(productoContenedor);
    });

    productos.style.display = 'flex';
    resumenCompra.style.display = 'flex';
    actualizarTotalAPagar();
}

const mostrarMensajeVacio = () => {
    const productos = document.querySelector('.hero__productos');
    const resumenCompra = document.querySelector('.hero__resumen');
    productos.innerHTML = "";
    productos.innerHTML = `<h2 class="titulo-vacio">Su carrito está vacio</h2>
    <p class="parrafo-vacio">Para seguir comprando, navegar por las categorías en el sitio.</p>
    <a href="../pages/cafe.html" class="boton-vacio">Seguir comprando</a>`;
    productos.style.display = 'flex';
    resumenCompra.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const comprar = document.getElementById('pagar-carrito');

    if (!carrito || carrito.length === 0) {
        mostrarMensajeVacio();
    } else {
        mostrarResumenCompra();
        comprar.addEventListener('click', () => {
            alert('Compra realizada con éxito.');
            localStorage.setItem('carrito', JSON.stringify([]));
            mostrarMensajeVacio();
        });
    }
});