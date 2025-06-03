//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = []; // Inicializamos tweets como un array vacío

//eventos
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        // Al cargar la página, intentamos obtener los tweets del localStorage.
        // Si no hay nada, 'tweets' seguirá siendo un array vacío, lo cual es correcto.
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // Aquí la corrección clave
        mostrarTweet();
    });
}

//funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet'); //seleccionamos el valor del text area
    if(tweet.value === ''){
        mostrarError("Necesita escribir un tweet");
        return; //sale de la funcion
    }

    // Como 'tweets' ya está garantizado ser un array (gracias a la inicialización o a la carga desde localStorage),
    tweets = [...tweets, tweet.value];
    formulario.reset(); //limpia el formulario
    localStorage.setItem('tweets', JSON.stringify(tweets)); //guarda en localStorafe el array tweets
    mostrarTweet();
}

function mostrarTweet(){

    tweets = JSON.parse(localStorage.getItem('tweets')) || [];


    limpiarTweets();

    // Ahora 'tweets' siempre será un array, incluso si está vacío.
    // Por lo tanto, `tweets.length` es seguro.
    if(tweets.length > 0){
        tweets.forEach(elemento => {
            const li = document.createElement('li');
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(elemento);
            };

            li.innerText = elemento;

            li.appendChild(btnEliminar);


            listaTweets.appendChild(li);

        });
    }
}

//mostrar el mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function limpiarTweets(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(e){
    tweets = tweets.filter(tweet => tweet !== e);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    mostrarTweet();
}