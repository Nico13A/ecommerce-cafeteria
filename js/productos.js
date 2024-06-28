import { agregarProducto, contarCarrito } from "./app.js";

/**
 * Muestra un modal (ventana superpuesta a toda la página actual) con la información de un producto.
 * @param { Object } producto
 */
const mostrarModal = producto => {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    const modalImagen = document.getElementById('modal-img');
    const modalContent = document.querySelector('.modal__content');
    const modalTipo = document.querySelector('.modal__content__type');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalEnjoy = document.querySelector('.modal__content__enjoy');
    const botonComprar = document.getElementById('boton-comprar');

    modalContainer.style.display = "flex";

    modalImagen.src = producto.img;
    modalImagen.alt = producto.nombre;

    modalTipo.textContent = producto.tipo;

    modalTitle.textContent = producto.nombre;

    modalDescription.textContent = producto.descripcion;

    modalEnjoy.textContent = "¡Disfrutalas y compralas online!";

    botonComprar.textContent = "Comprar";
    botonComprar.addEventListener('click', () => {
        agregarProducto(producto);
        contarCarrito();
    })
    

    modalContent.appendChild(modalTipo);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDescription);
    modalContent.appendChild(modalEnjoy);
    modalContent.appendChild(botonComprar);

    modal.appendChild(modalImagen);
    modal.appendChild(modalContent);

    modalContainer.appendChild(modal);
}

/**
 * Oculta el modal configurando su estilo display a 'none'.
 */
const cerrarModal = () => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none';
}

/**
 * Muestra una lista de productos en el contenedor de productos, opcionalmente filtrando por tipo o peso.
 * @param {Array} productos 
 * @param {string} [filtro] 
 */
const mostrarProductos = (productos, filtro = '') => {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';

    const productosFiltrados = filtro ? productos.filter(producto => producto.tipo === filtro || producto.peso === filtro) : productos;

    productosFiltrados.forEach(producto => {
        // Creación del contenedor de un producto.
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('hero__product');

        // Creación de la imagen del producto.
        const imgProducto = document.createElement('img');
        imgProducto.classList.add('hero__product__img');
        imgProducto.src = producto.img;
        imgProducto.alt = producto.nombre;

        // Creación del titulo del producto.
        const tituloProducto = document.createElement('h4');
        tituloProducto.textContent = producto.nombre;
        tituloProducto.classList.add('hero__product__title');

        // Creación del precio del producto.
        const precioProducto = document.createElement('p');
        precioProducto.textContent = `Precio: `;
        precioProducto.classList.add('hero__product__price');

        const precioSpan = document.createElement('span');
        precioSpan.textContent = `$ ${producto.precio.toFixed(2)}`;

        // Creación del div contenedor de las acciones.
        const accionesProducto = document.createElement('div');
        accionesProducto.classList.add('hero__product__actions');

        // Creación del div contenedor del i compra y del i ver.
        const compraProducto = document.createElement('div');
        compraProducto.classList.add('hero__product__action', 'hero__product__action--cart');

        const iconoCompra = document.createElement('i');
        iconoCompra.classList.add('fa-solid', 'fa-cart-shopping');

        compraProducto.addEventListener('click', () => {
            agregarProducto(producto);
            contarCarrito();
        })

        const verProducto = document.createElement('div');
        verProducto.classList.add('hero__product__action', 'hero__product__action--view');

        const iconoVer = document.createElement('i');
        iconoVer.classList.add('fa-solid' ,'fa-eye');

        // Obtengo el icono de cerrar.
        const iconoCerrar = document.getElementById('modal-close');

        // Agregar event listener al icono de ver y de cerrar.
        verProducto.addEventListener('click', () => mostrarModal(producto));
        iconoCerrar.addEventListener('click', () => cerrarModal());

        // Agrego al contenedor del producto los elementos.
        productoDiv.appendChild(imgProducto);
        productoDiv.appendChild(tituloProducto);
        productoDiv.appendChild(precioProducto);
        // Agrego el span al elemento precio.
        precioProducto.appendChild(precioSpan);
        productoDiv.appendChild(accionesProducto);

        // Agrego a las acciones el div compra y ver.
        accionesProducto.appendChild(compraProducto);
        accionesProducto.appendChild(verProducto);

        // Agrego a los div compra y ver los elementos i.
        compraProducto.appendChild(iconoCompra);
        verProducto.appendChild(iconoVer);

        // Agrego al contenedor de los productos cada producto.
        contenedorProductos.appendChild(productoDiv);
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    
    const botonTodosLosProductos = document.getElementById('todosLosProductos');
    const botonCafeEnGrano = document.getElementById('cafeEnGrano');
    const botonCafeMolido = document.getElementById('cafeMolido');
    const botonPeso = document.getElementById('peso');
    const peso250 = botonPeso.querySelector('ul li:nth-child(1)');
    const peso500 = botonPeso.querySelector('ul li:nth-child(2)');
    const peso1000 = botonPeso.querySelector('ul li:last-child');
    let productos = [];

    try {
        const respuesta = await fetch('../js/productos.json');
        productos = await respuesta.json();
    } catch (error) {
        console.error('Error al cargar el JSON: ', error);
    }

    mostrarProductos(productos);

    botonTodosLosProductos.addEventListener('click', () => mostrarProductos(productos));
    botonCafeEnGrano.addEventListener('click', () => mostrarProductos(productos, 'Grano'));
    botonCafeMolido.addEventListener('click', () => mostrarProductos(productos, 'Molido'));
    peso250.addEventListener('click', () => mostrarProductos(productos, 250));
    peso500.addEventListener('click', () => mostrarProductos(productos, 500));
    peso1000.addEventListener('click', () => mostrarProductos(productos, 1000));

});