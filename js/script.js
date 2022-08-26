// DEFINICIÓN DE CONST
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

// Lista de tareas
let tareas=[];
if(localStorage.getItem('tareas')!=null){
    tareas=JSON.parse(localStorage.getItem('tareas'));
    dibujarCard();
}

// DEFINCIÓN DE FUNCIONES
function saludar(){
    saludo.innerHTML=`¡Hola,  ${nombre}!`;
}

function agregarTarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea){
    alert("Nueva tarea agregada con éxito!");
    tareas.push(new Tarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea));
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
    accionesTarea.innerHTML=`<i class="far fa-edit btn editar-${tarea.id}"></i>
                        <button class="btn btn-eliminar-tarea" id="btn-eliminar-tarea" tarea-id="${tarea.id}">Hecho</button>`;

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

            eliminarTarea();
        }
    )
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function eliminarTarea(){

    cardContainer.onclick = (e) => {
        if(e.target.tagName == 'BUTTON'){
            const tareaId=parseInt(e.target.getAttribute('tarea-id'));
            tareas = tareas.filter(tarea => tarea.id !== tareaId);
            dibujarCard();
        }
    }
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
    let formulario = e.target;
    agregarTarea(Date.now(), formulario.children[0].value, formulario.children[1].value, formulario.children[2].value, formulario.children[3].value);
    formAggTarea.reset();
}