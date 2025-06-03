import { pantallaNumeros } from "./selectores.js";

export function cargarPantalla(e){
    // agregamos a la pntalla mas lo que ya tenia\
    const valor = e.target.textContent
    pantallaNumeros.value += valor;
}

export function borrarPantalla(){
    // dejamos el valor de la pantalla como un string vacio
    pantallaNumeros.value = '';
}

export function borrarNumero(){
    // tomamos desde el inicio del array hasta el final, y borramos el ultimo elemento ( -2 serain los ultimo dos y asi en sucesion)
    pantallaNumeros.value = pantallaNumeros.value.slice(0, -1);
}

export function realizarOperacion(){
        let operacion = pantallaNumeros.value;
        pantallaNumeros.value = eval(operacion);
}

