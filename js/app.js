(function () {
    // SELECTORES
    const emailInput = document.querySelector('#email');
    const subjectInput = document.querySelector('#subject');
    const messageInput = document.querySelector('#message');
    const formulario = document.querySelector('#form');


    // EVENTOS
    formulario.addEventListener('submit', enviarFormulario);



    // FUNCIONES

    function enviarFormulario(e) {
        e.preventDefault();

        const datos = {
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        }

        // si alguno de los campos del objeto esta vacio se muetra el mensaje de campos vacios
        if (Object.values(datos).some(dato => dato.trim() === '')) {
            mostrarMensaje('error', 'Todos los campos deben ser obligatorios');
            return;
        };

        formulario.action = "https://formsubmit.co/0907ef125def1458ac75c7549114df4c";
        formulario.method = 'POST';
        formulario.submit();
        mostrarMensaje('exito', "Datos enviados!!")
}


    function mostrarMensaje(tipo, mensaje) {

        // revisar si alerta existe en el formulario para que no se acmulen
        const existe = document.querySelector('.alerta');
        existe?.remove();

        //creamos la alerta del mensaje
        const alerta = document.createElement('DIV');
        alerta.classList.add(`${tipo}`, 'alerta');
        alerta.innerHTML = `
        <p>${mensaje}</p>
    `;

        // agregamos la alerta al formulario
        formulario.appendChild(alerta);


        // despues de 3 segundos, la alerta se borra
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }


})();
