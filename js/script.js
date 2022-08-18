// DEFINICIÓN DE CONST
// Lista de tareas
const tareas=[];

// Modal
const modal = document.querySelector('.modal');
const abrirModal = document.querySelector('.btn-agregar-tarea');
const cerrarModal = document.querySelector('.cerrar-modal');

// Card 
const cardContainer = document.querySelector('.card-container');

// Formulario
const formAggTarea = document.querySelector('#form-agregar-tarea');

// Saludo
const saludo = document.querySelector('.saludo');

// DEFINCIÓN DE FUNCIONES
function saludar(){
    saludo.innerHTML=`¡Hola,  ${nombre}!`;
}

function agregarTarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea){
    alert("Nueva tarea agregada con éxito!");
    let nuevaTarea = new Tarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea);

    tareas.push(nuevaTarea);
    dibujarCard();
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

    // acciones tarea
    let accionesTarea=document.createElement("div");
    accionesTarea.className="acciones-tarea d-flex";
    accionesTarea.innerHTML=`<div class="iconos-tarea">
                                <i class="far fa-edit editar-tarea-${tarea.id}"></i>
                                <i class="far fa-trash-alt eliminar-tarea-${tarea.id}"></i>
                            </div>
                            <button class="done-tarea-${tarea.id} btn">Hecho</button>`;

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
    constructor(id, nombre, fecha, descripcion, categoria){
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }
}

// EVENTOS
// Abrir y cerrar modal agregar tarea
abrirModal.onclick = (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
}

cerrarModal.onclick = (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
}

// Formulario agregar tarea
formAggTarea.onsubmit = (e) => {
    e.preventDefault();
    let id = Date.now();
    let formulario = e.target;
    let nombre = formulario.children[0].value;
    let fecha = formulario.children[1].value;
    let descripcion = formulario.children[2].value;
    let categoria = formulario.children[3].value;
    agregarTarea(id, nombre, fecha, descripcion, categoria);
    formAggTarea.reset();
}