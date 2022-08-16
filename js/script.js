// DEFINICIÓN DE CONST
// Lista de tareas
const tareas=[];

// Modal
const modal = document.querySelector('.modal');
const abrirModal = document.querySelector('.btn-agregar-tarea');
const cerrarModal = document.querySelector('.modal-cerrar');

// Card
const cardContainer = document.querySelector('.card-container');

// DEFINCIÓN DE FUNCIONES
// Agregar tareas
function agregarTarea(){
    let nombreTarea = prompt("Nombre de la tarea:");
    let fechaTarea = prompt("Fecha en la que debes realizarla:");
    let descripcionTarea = prompt("Descripción:");
    let nuevaTarea = new Tarea(nombreTarea, fechaTarea, descripcionTarea);

    tareas.push(nuevaTarea);
}

function crearCard(tarea){
    // titulo tarea
    let titulo=document.createElement("div");
    titulo.className="titulo-tarea d-flex";
    titulo.innerHTML=`<h4>${tarea.nombre}</h4>
                      <p>${tarea.fecha}</p>`;

    // descripción tarea
    let descripcion=document.createElement("p");
    descripcion.className="descripcion";
    descripcion.innerText=tarea.descripcion;

    // botón marcar tarea como realizada
    let botonDone=document.createElement("button");
    botonDone.className="done btn";
    botonDone.innertText="Hecho";

    // botones de editar/eliminar tarea
    let botonEditar=document.createElement("i");
    botonEditar.className="far fa-edit";
    let botonEliminar=document.createElement("i");
    botonEliminar.className="far fa-trash-alt";

    // botones editar/eliminar tarea
    let iconos=document.createElement("div");
    iconos.className="iconos-tarea";
    iconos.append(botonEditar);
    iconos.append(botonEliminar);

    // div acciones tarea
    let accionesTarea=document.createElement("div");
    accionesTarea.className="acciones-tarea d-flex";
    accionesTarea.append(iconos);
    accionesTarea.append(botonDone);

    // card
    let card=document.createElement("div");
    card.className="card";
    card.append(titulo);
    card.append(descripcion);
    card.append(accionesTarea);

    return card;
}

function dibujarCard(){
    cardContainer.innerHTML="";
    tareas.forEach(
        (tarea) => {
            let card=crearCard(tarea);
            cardContainer.append(card);
        }
    )
}

// DEFINICIÓN DE CLASES
// Constructor de tareas
class Tarea{
    constructor(nombre, fecha, descripcion){
        this.nombre = nombre;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }
}

// EJECUCIÓN DE FUNCIONES
alert("¡Bienvenidx a everyday!\nUna app donde puedes organizar tus tareas diarias, crear nuevos hábitos y rutinas para lograr todas tus metas.");

let nombre = prompt("¿Cuál es tu nombre?");

let agregar = confirm(`¡Hola, ${nombre}! ¿Deseas agregar una nueva tarea?`);

while (agregar == true) {
    agregarTarea();
    agregar = confirm(`¿Deseas agregar otra tarea?`);
}

dibujarCard();

// EVENTOS
abrirModal.onclick = (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
}

cerrarModal.onclick = (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
}