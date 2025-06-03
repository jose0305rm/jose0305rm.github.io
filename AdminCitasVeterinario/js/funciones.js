import { citaObj } from "./variables.js";
import { Notificacion } from "./classes/Notificaciones.js";
import { AdminCitas } from "./classes/AdminCitas.js";
import { formulario, pacienteInput, propietarioInput, numeroInput, emailInput, fechaInput, sintomasInput, btnSubmit } from "./selectores.js";
import { editando } from "./variables.js";

const citas = new AdminCitas();

let estado = editando.valor;

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function submitCita(e) {

    e.preventDefault();

    // Comprobar si no hay campos vacios
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion('Todos los campos deben ser llenados', 'error');
        console.log(citaObj);
        return;
    }

    // Si se esta editando un registro
    if (estado) {
        citas.editar({...citaObj});
        new Notificacion('Registro editado', 'exito');
    }

    // Si se esat creando uno nuevo
    else {
        citas.agregar({ ...citaObj });
        new Notificacion('Datos almacenados', 'exito');
    }

    
    reiniciarDatos();

}

function reiniciarDatos() {

    //reiniciamos el formulario
    formulario.reset();

    //reiniciamos el objeto de citas
    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        numero: '',
        email: '',
        fecha: '',
        sintomas: ''
    })

    btnSubmit.value = "Registrar Paciente";

    estado = false;
}

export function editarRegistro(cita) {

    // Agarramos los datos del objeto
    const { paciente, propietario, numero, email, fecha, sintomas } = cita;

    // Asignamos al objeto
    Object.assign(citaObj, cita);

    // asinamos sus valores en el campo del formulario
    pacienteInput.value = paciente;
    propietarioInput.value = propietario;
    numeroInput.value = numero;
    emailInput.value = email;
    fechaInput.value = fecha;
    sintomasInput.value = sintomas;

    // Cambiamos lo que dice el boton de registrar
    btnSubmit.value = "Actualizar registro";

    // Cambiamos el estado de la variable estado
    estado = true;

}
