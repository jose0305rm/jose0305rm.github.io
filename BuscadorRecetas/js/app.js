function iniciarApp() {

    const resultado = document.querySelector('#resultado');
    const modal = new bootstrap.Modal('#modal', {});
    const categoriasHtml = document.querySelector('#categorias');

    if (categoriasHtml) {
        categoriasHtml.addEventListener('change', seleccionarCategoria);
        obtenerCategorias();
    }

    const favoritosDiv = document.querySelector('.favoritos');

    if(favoritosDiv){
        obtenerFavoritos();
    }

    function obtenerCategorias() {
        const url = "https://www.themealdb.com/api/json/v1/1/categories.php"; //api de las categorias
        fetch(url)
            .then(resultado => resultado.json())
            .then(resultado => mostrarCategorias(resultado.categories));
    }

    function mostrarCategorias(categorias = []) {

        categorias.forEach(categoria => {
            // console.log(categoria.strCategory);
            const opcion = document.createElement('option'); //creamoes las opciones
            opcion.value = categoria.strCategory; //le damos un valor
            opcion.textContent = categoria.strCategory; //mostramos informacion en el option
            categoriasHtml.appendChild(opcion); //agregamos al contenedore
        })
    }

    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        fetch(url)
            .then(resultado => resultado.json())
            .then(recetas => mostrarRecetas(recetas.meals));
    }

    function mostrarRecetas(recetas) {

        // limpiar resultados para mostrar nuevos
        limpiarHtml(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : "No hay resultados"
        resultado.appendChild(heading);

        //iterar en los resultados
        recetas.forEach(receta => {

            //valores de la receta
            const { idMeal, strMeal, strMealThumb } = receta;

            //contenedor de las recetas
            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            //contiene la imagen y recetaCardBody
            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            //imagen de la receta
            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb ?? receta.img;

            //contiene la imagen y boton de informacion
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            //nombre de la receta
            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal ?? receta.title;

            //boton editar
            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver receta';

            //evento del boton
            recetaButton.onclick = () => {
                seleccionarReceta(idMeal ?? receta.id)
            }


            // Inyectar en el codigo html
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);


        })
    }

    function limpiarHtml(contenedor) {
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild)
        }
    }

    function seleccionarReceta(id) {
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
            .then(resultado => resultado.json())
            .then(receta => mostrarRecetaModal(receta.meals[0]));
    }

    function mostrarRecetaModal(receta) {
        // La API devuelve un array 'meals' que contiene un solo objeto de receta,
        // por eso accedemos a receta.meals[0]
        const { idMeal, strInstructions, strMeal, strMealThumb } = receta; // **Ajuste aquí**

        // Añadir contenido al modal
        const modalTitle = document.querySelector(".modal-title");
        const modalBody = document.querySelector(".modal-body");
        const modalFooter = document.querySelector(".modal-footer"); // **Nuevo: seleccionar el footer**

        // Limpiar contenido previo del modal (importante si se abre varias veces)
        limpiarHtml(modalBody);
        limpiarHtml(modalFooter);

        // Agregamos el nombre de la receta como titulo del modal
        modalTitle.textContent = strMeal;

        // Imagen de la receta en el modal
        const imagenModal = document.createElement('IMG');
        imagenModal.classList.add('img-fluid');
        imagenModal.src = strMealThumb;
        imagenModal.alt = `Imagen de la receta ${strMeal}`;

        // Instrucciones de la receta
        const headingInstrucciones = document.createElement('H3');
        headingInstrucciones.classList.add('my-3');
        headingInstrucciones.textContent = 'Instrucciones';

        const instrucciones = document.createElement('P');
        instrucciones.textContent = strInstructions;

        // Ingredientes y Cantidades (si quieres mostrarlos, necesitarías iterar sobre ellos)
        const headingIngredientes = document.createElement('H3');
        headingIngredientes.classList.add('my-3');
        headingIngredientes.textContent = 'Ingredientes y Cantidades';

        const listadoIngredientes = document.createElement('UL');
        listadoIngredientes.classList.add('list-group');

        // Itera hasta 20 ingredientes (la API los devuelve como strIngredient1, strIngredient2, etc.)
        for (let i = 1; i <= 20; i++) {
            if (receta[`strIngredient${i}`]) {
                const ingrediente = receta[`strIngredient${i}`];
                const medida = receta[`strMeasure${i}`];

                const li = document.createElement('LI');
                li.classList.add('list-group-item');
                li.textContent = `${ingrediente} - ${medida}`;
                listadoIngredientes.appendChild(li);
            }
        }

        // Botones del modal
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = existeStorage(idMeal) ? "Eliminar de favoritos" : "Guardar en favoritos";

        // Funcionalidad para guardar favoritos en LocalStorage
        btnFavorito.onclick = () => {

            //si existe en storage, sale de la funcion
            if (existeStorage(idMeal)) {
                eliminarStorage(idMeal)
                btnFavorito.textContent = 'Guardar Favorito';
                mostrarToast("Eliminado Correctamente");
                return;
            }

            agregarFavorito({
                id: idMeal,
                title: strMeal,
                img: strMealThumb
            });
            btnFavorito.textContent = 'Eliminar Favorito';
            mostrarToast("Agregado Correctamente");

        }


        const btnCerrar = document.createElement('BUTTON');
        btnCerrar.classList.add('btn', 'btn-secondary', 'col');
        btnCerrar.textContent = 'Cerrar';
        btnCerrar.onclick = () => {
            modal.hide();
        }

        // Añadir elementos al modal body
        modalBody.appendChild(imagenModal);
        modalBody.appendChild(headingInstrucciones);
        modalBody.appendChild(instrucciones);
        modalBody.appendChild(headingIngredientes);
        modalBody.appendChild(listadoIngredientes);

        // Añadir botones al modal footer
        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrar);

        // Muestra el modal
        modal.show();
    }

    function agregarFavorito(recetaObjeto) {

        //trae los favoritos si existen, si no trae un arreglo vacio
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

        // guardamos en local storage el objeto convertido en string
        // tomamos una copia de lo que habia en favoritos, y le agregamos el nuevo objeto que le estamos pasando
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, recetaObjeto]));
    }

    function existeStorage(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(fav => fav.id === id); // si alguno repite el id...
    }

    function eliminarStorage(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(fav => fav.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }

    function mostrarToast(mensaje) {
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(toastDiv);
        toastBody.textContent = mensaje;
        toast.show();
    }

    function obtenerFavoritos(){
       const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

       if(favoritos.length){
            mostrarRecetas(favoritos);
            return;
       }

       const noFavoritos = document.createElement('P');
       noFavoritos.textContent = 'No hay favoritos aun';
       noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
       resultado.appendChild(noFavoritos);

    }

}

document.addEventListener('DOMContentLoaded', iniciarApp);