// Funciones del carrito
export const calcularSubtotal = producto => producto.cantidad * producto.precio;


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


export const actualizarTotalAPagar = () => {
    let precioTotal = document.getElementById('precioTotal');
    if (precioTotal) {
        precioTotal.textContent = `$${calcularTotalAPagar().toFixed(2)}`;
    }
}


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

