const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => { // similar a DOMContentLoaded, pero es para la ventana 
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    // Validar la informacion
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        //Hubo un errror
        // console.log(ciudad);
        // console.log(pais);

        mostrarError('Ambos campos son obligatorios');
        return;

    }

    //  Consultar a la API
    consultarAPI(ciudad, pais);
}


function mostrarError(error) {
    console.log(error);

    // Crear una alerta
    const alerta = document.createElement('DIV');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700',
        'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alert');

    // Validar que no exista
    const existe = container.querySelector('.alert');
    existe?.remove();

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${error}</span>
    `;

    container.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function consultarAPI(ciudad, pais) {

    const appId = 'c26047bffe2aa043fe07b612814ce97b';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            // 404 la ciudad no existe
            if (datos.cod === '404') {
                mostrarError('Ciudad no encontrada');
                return;
            }

            //Imprimir el HTML
            mostrarClima(datos);

        });
}

function mostrarClima(datos) {
    // un destrcuturin dentro de otro
    const { main: { temp, temp_max, temp_min } } = datos;
    const { name } = datos; //regresa el nombre de la ciudad
    const { sys: { country } } = datos; //regresa el nombre del pais (si abareviacion)

    // operacion para pasar a grados centigrados
    const centigrados = centigradosConvertir(temp);
    const maxima = centigradosConvertir(temp_max);
    const minima = centigradosConvertir(temp_min);

    console.log(datos);

    // Creamos mensaje del pais
    const ubicacion = document.createElement('P');
    ubicacion.innerHTML = `Clima en: ${name}, ${country}`;
    ubicacion.classList.add('font-bold', 'text-xl');

    // crear el mensaje con el clima actual
    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    // creamos el mensje de temperatura maxima
    const tempMax = document.createElement('P');
    tempMax.innerHTML = `temperatura Max: ${maxima} &#8451;`;
    tempMax.classList.add('text-xl');

    // // creamos el mensaje de temperatura minima
    const tempMin = document.createElement('P');
    tempMin.innerHTML = `temperatura Min: ${minima} &#8451;`;
    tempMin.classList.add('text-xl');

    // creamos el contenedor
    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center', 'text-white');

    // Agregamos al contenedor
    resultadoDiv.appendChild(ubicacion)
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    // Borramos todo lo que tenia antes
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    // mostramos todo el nuevo DIV
    resultado.appendChild(resultadoDiv);
}

const centigradosConvertir = grados => (grados - 273.15).toFixed(0); //redondeo sin decimales

// agregar un spinner de carga
function Spinner() {
    //Limpiamos el html del contenedor
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
        <div class="double-bounce1"></div>
         <div class="double-bounce2"></div>
    `;

    resultado.appendChild(divSpinner);

}
