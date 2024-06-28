document.addEventListener('DOMContentLoaded', () => {

    // Captura de formulario
    const formulario = document.getElementById('formulario');

    // Captura de inputs
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const telefonoInput = document.getElementById('telefono');
    const motivoSelect = document.getElementById('motivo');
    const mensajeTextarea = document.getElementById('mensaje');

    // Captura de spans de error
    const nombreError = document.getElementById('nombre-error');
    const correoError = document.getElementById('correo-error');
    const telefonoError = document.getElementById('telefono-error');
    const motivoError = document.getElementById('motivo-error');
    const mensajeError = document.getElementById('mensaje-error');

    /**
     * Muestra un mensaje de error y aplica estilos al elemento correspondiente.
     * @param {HTMLElement} elemento 
     * @param {string} mensaje
     */
    const mostrarErrores = (elemento, mensaje) => {
        elemento.textContent = mensaje;
        elemento.style.display = "block";
        const inputElemento = elemento.previousElementSibling;
        //console.log(inputElemento);
        if (inputElemento && (inputElemento.tagName === 'INPUT' || inputElemento.tagName === 'TEXTAREA' || inputElemento.tagName === 'SELECT')) {
            inputElemento.classList.add("form__input--error");
        }
    }

    //const ocultarErrores = elemento => elemento.style.display = "none";

    /**
     * Oculta los mensajes de error y aplica estilos al elemento correspondiente para indicar éxito.
     * @param {HTMLElement} elementoAOcultar 
     * @param {HTMLElement} elementoAModificar 
     */
    const ocultarErrores = (elementoAOcultar, elementoAModificar) => {
        elementoAOcultar.style.display = "none";
        elementoAModificar.classList.remove("form__input--error");
        elementoAModificar.classList.add("form__input--exito"); 
    };
    

    /**
     * Valida el campo de nombre. Retorna verdadero si el nombre es válido, falso en caso contrario.
     * Muestra mensajes de error si el campo no cumple con las condiciones especificadas.
     * @param {string} nombre
     * @returns {boolean} 
     */
    const validarNombre = nombre => {
        let validacion = false;
        if (nombre === "") {
            mostrarErrores(nombreError, "El nombre es obligatorio");
        } else if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ]+$/.test(nombre)) {
            mostrarErrores(nombreError, "El nombre solo puede contener letras y espacios");
        }
        else {
            validacion = true;
            ocultarErrores(nombreError, nombreInput);
        }
        return validacion;
    }

    /**
     * Valida el campo de correo electrónico.
     * Muestra mensajes de error si el campo está vacío o no tiene un formato válido de correo electrónico.
     * @param {string} correo 
     * @returns {boolean} 
     */
    const validarCorreo = correo => {
        let validacion = false;
        if (correo === "") {
            mostrarErrores(correoError, "El correo es obligatorio");
        }
        else if(!/^\S+@\S+\.\S+$/.test(correo)) {
            mostrarErrores(correoError, "El correo no es válido");
        }
        else {
            validacion = true;
            ocultarErrores(correoError, correoInput);
        }
        return validacion;
    }

    /**
     * Valida el campo de teléfono.
     * Muestra mensajes de error si el campo no está vacío y no tiene exactamente 10 dígitos numéricos.
     * @param {string} telefono
     * @returns {boolean} 
     */
    const validarTelefono = telefono => {
        let validacion = false;
        if (telefono !== "" && !/^\d{10}$/.test(telefono)) {
            mostrarErrores(telefonoError, "El teléfono debe tener 10 dígitos");
        } else {
            validacion = true;
            ocultarErrores(telefonoError, telefonoInput);
        }
        return validacion;
    }

    /**
     * Valida el campo de motivo.
     * Muestra mensajes de error si el campo está vacío.
     * @param {string} motivo 
     * @returns {boolean} 
     */
    const validarMotivo = motivo => {
        let validacion = false;
        if (motivo === "") {
            mostrarErrores(motivoError, "El motivo es obligatorio");
        } else {
            validacion = true;
            ocultarErrores(motivoError, motivoSelect);
        }
        return validacion;
    };

    /**
     * Valida el campo de mensaje.
     * Muestra mensajes de error si el campo está vacío.
     * @param {string} mensaje 
     * @returns {boolean} 
     */
    const validarMensaje = mensaje => {
        let validacion = false;
        if (mensaje === "") {
            mostrarErrores(mensajeError, "El mensaje es obligatorio");
        } else {
            validacion = true;
            ocultarErrores(mensajeError, mensajeTextarea);
        }
        return validacion;
    };

    /**
     * Valida todos los campos del formulario antes de enviarlo.
     * Muestra mensajes de error si algún campo no cumple con las validaciones requeridas.
     * Si el formulario es válido, muestra una alerta de éxito y lo envía.
     */
    const validarFormulario = () => {
        let esValido = true;

        if (!validarNombre(nombreInput.value.trim())) esValido = false;
        if (!validarCorreo(correoInput.value.trim())) esValido = false;
        if (!validarTelefono(telefonoInput.value.trim())) esValido = false;
        if (!validarMotivo(motivoSelect.value)) esValido = false;
        if (!validarMensaje(mensajeTextarea.value.trim())) esValido = false;

        // Si el formulario es válido, enviar.
        if (esValido) {
            alert("Consulta enviada con éxito");
            formulario.submit();
        }
    };

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        validarFormulario();
    })
   
});