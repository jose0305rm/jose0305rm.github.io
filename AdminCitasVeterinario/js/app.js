import { pacienteInput, propietarioInput, numeroInput, emailInput, fechaInput, sintomasInput, formulario } from "./selectores.js";
import { datosCita, submitCita } from "./funciones.js";

pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
numeroInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita);