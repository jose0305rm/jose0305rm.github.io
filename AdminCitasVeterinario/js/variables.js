import { generarId } from "./funciones.js"

export const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    numero: '',
    email: '',
    fecha: '',
    sintomas: ''
}

export let editando = {
    valor: false
}

