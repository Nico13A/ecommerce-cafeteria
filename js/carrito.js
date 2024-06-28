// Funciones del carrito


/**
 * Calcula el subtotal de un producto multiplicando su cantidad por su precio.
 * @param {Object} producto El objeto del producto que contiene cantidad y precio.
 * @returns {number}
 */
export const calcularSubtotal = producto => producto.cantidad * producto.precio;

/**
 * Calcula el total a pagar sumando los subtotales de todos los productos en el carrito almacenado en el localStorage.
 * @returns {number} 
 */
export const calcularTotalAPagar = () => {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let suma = 0;
    if (carrito) {
        carrito.forEach(producto => {
            suma += calcularSubtotal(producto);
        })
    }
    return suma;
}

/**
 * Actualiza el elemento HTML con id 'precioTotal' con el valor calculado del total a pagar, formateado con dos decimales.
 * Utiliza la función calcularTotalAPagar para obtener el total actual del carrito y lo muestra en 
 * el elemento correspondiente del DOM.
 */
export const actualizarTotalAPagar = () => {
    let precioTotal = document.getElementById('precioTotal');
    if (precioTotal) {
        precioTotal.textContent = `$${calcularTotalAPagar().toFixed(2)}`;
    }
}

/**
 * Elimina un producto del carrito según su ID y actualiza el carrito en el almacenamiento local.
 * Llama a una función de callback después de la eliminación y actualiza el total a pagar del carrito.
 * @param {number} id 
 * @param {function} callback 
 */
export const eliminarDelCarrito = (id, callback) => {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    
    let indice = carrito.findIndex(producto => producto.idProducto === id);

    if (indice !== -1) {
        carrito.splice(indice, 1);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    if (callback && typeof callback === 'function') {
        callback();
    }
    actualizarTotalAPagar();
}

/**
 * Aumenta la cantidad de un producto en el carrito según su ID y actualiza el carrito en el almacenamiento local.
 * Llama a una función de callback después de incrementar la cantidad y actualiza el total a pagar del carrito.
 * @param {number} id 
 * @param {function} callback 
 */
export const sumarCantidadProducto = (id, callback) => {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let productoAModificar = carrito.find(producto => producto.idProducto === id);
    if (productoAModificar) {
        productoAModificar.cantidad++; 
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (callback && typeof callback === 'function') {
        callback();
    }
    actualizarTotalAPagar();
}

/**
 * Resta la cantidad de un producto en el carrito según su ID y actualiza el carrito en el almacenamiento local.
 * Llama a una función de callback después de restar la cantidad y actualiza el total a pagar del carrito.
 * @param {number} id 
 * @param {function} callback
 */
export const restarCantidadProducto = (id, callback) => {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let productoAModificar = carrito.find(producto => producto.idProducto === id);
    if (productoAModificar) {
        if (productoAModificar.cantidad > 1) {
            productoAModificar.cantidad--;
        } 
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (callback && typeof callback === 'function') {
        callback();
    }
    actualizarTotalAPagar();
}

