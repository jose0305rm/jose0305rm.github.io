import { clearBtn, decimalBtn, deleteBtn, multiplyBtn, equalBtn, addBtn, divideBtn, subtractBtn} from "./selectores.js";
import { num1, num2, num3, num4, num5, num6, num7, num8, num9, num0 } from "./selectores.js";
import { borrarPantalla, cargarPantalla, borrarNumero, realizarOperacion } from "./funciones.js";

// evento de los numeros
num1.addEventListener('click', cargarPantalla);
num2.addEventListener('click', cargarPantalla);
num3.addEventListener('click', cargarPantalla);
num4.addEventListener('click', cargarPantalla);
num5.addEventListener('click', cargarPantalla);
num6.addEventListener('click', cargarPantalla);
num7.addEventListener('click', cargarPantalla);
num8.addEventListener('click', cargarPantalla);
num9.addEventListener('click', cargarPantalla);
num0.addEventListener('click', cargarPantalla);

// Botones de los signos
decimalBtn.addEventListener('click', cargarPantalla);
addBtn.addEventListener('click', cargarPantalla);
multiplyBtn.addEventListener('click', cargarPantalla);
divideBtn.addEventListener('click', cargarPantalla);
subtractBtn.addEventListener('click', cargarPantalla);

// Eventos de las operaciones
clearBtn.addEventListener('click', borrarPantalla);
deleteBtn.addEventListener('click', borrarNumero);
equalBtn.addEventListener('click', realizarOperacion);