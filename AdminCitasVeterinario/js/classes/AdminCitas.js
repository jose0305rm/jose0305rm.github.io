import { listaCitas } from "../selectores.js";
import { editarRegistro } from "../funciones.js";

export class AdminCitas{
    constructor(){
        this.citas = [];
    }

    agregar(citaObjeto){
        this.citas = [...this.citas, citaObjeto];
        console.log(this.citas);
        this.mostrar();
    }

    editar(citaObjeto){
        // si los id de las citas coinciden, deja en el array la cita nueva, si no, deja la que estaba
        this.citas = this.citas.map(cita => cita.id === citaObjeto.id ? citaObjeto : cita);
        this.mostrar();
    }

    eliminar(citaObjeto){
        this.citas = this.citas.filter(cita => cita.id !== citaObjeto.id);
        this.mostrar();
    }



    mostrar(){

        // Borrar todos los elementos de listas pacientes
        while(listaCitas.firstChild){
            listaCitas.removeChild(listaCitas.firstChild);
        }

       //recorremos lo que haya en la lista 
        this.citas.forEach( cita => {
             //creamos la estructura del card
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const numero = document.createElement('p');
            numero.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            numero.innerHTML = `<span class="font-bold uppercase">Numero: </span> ${cita.numero}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;
        
            // Creando los botones de editar y de eliminar
             const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // funcionalidad de los botones
            btnEditar.onclick = () =>{
                console.log(cita.id);
                editarRegistro(cita);
                
            }

            btnEliminar.onclick = () => {
                this.eliminar(cita);
            }


            // Contenedor de los botones
            const contenedorBotones = document.createElement('DIV')
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10')
            

            // Agregando botones al contenedor
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);


            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(numero);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);

            listaCitas.appendChild(divCita);


        })

    }
}



// Disenio del card de cada cita
// const divCita = document.createElement('div');
//             divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
//             const paciente = document.createElement('p');
//             paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
//             paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
        
//             const propietario = document.createElement('p');
//             propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
//             propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
//             const email = document.createElement('p');
//             email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
//             email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
//             const fecha = document.createElement('p');
//             fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
//             fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
//             const sintomas = document.createElement('p');
//             sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
//             sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

//             // Botones de Eliminar y editar
//             const btnEditar = document.createElement('button');
//             btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
//             btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
//             const clone = structuredClone(cita)
//             btnEditar.onclick = () => cargarEdicion(clone)

//             const btnEliminar = document.createElement('button')
//             btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
//             btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
//             btnEliminar.onclick = () => this.eliminar(cita.id)

//             const contenedorBotones = document.createElement('DIV')
//             contenedorBotones.classList.add('flex', 'justify-between', 'mt-10')