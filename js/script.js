// Modal
const modal = document.querySelector('.modal');
// bienvenida
const modalBienvenida = document.querySelector('#bienvenida');
// agregar tarea
const modalAggTarea = document.querySelector('#agregar-tarea');
const abrirAggTarea = document.querySelector('.btn-agregar-tarea');
const cerrarAggTarea = document.querySelector('.cerrar-agg-tarea');
// agregar categoria
const modalAggCategoria = document.querySelector('#agregar-categoria');
const abrirAggCategoria = document.querySelector('.btn-agg-categoria');
const cerrarAggCategoria = document.querySelector('.cerrar-agg-categoria');

// Card 
const cardContainer = document.querySelector('.card-container');

// Mensaje cuando no hay tareas
const vacio = document.querySelector('.vacio');

// Formularios
const formBienvenida = document.querySelector('#form-bienvenida');
const formAggTarea = document.querySelector('#form-agregar-tarea');

// Saludo
const saludo = document.querySelector('.saludo');
let usuario = localStorage.getItem('user') || '';
// si no hay usuario en storage: mostrar bienvenida, si hay: saludar
usuario===''? modalBienvenida.classList.add('modal--show') : saludar(usuario);

// Lista de tareas
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
dibujarCard();

// mostrar u ocultar el mensaje "no hay tareas pendientes"
tareas.length===0? mostrarMensaje() : ocultarMensaje();

// DEFINCIÓN DE FUNCIONES
function saludar(usuario){
    saludo.innerHTML=`¡Hola, ${usuario}!`;
}

// muestra mensaje "no hay tareas pendientes"
function mostrarMensaje(){
    vacio.style.display = "block";
    dibujarCard();
}

// oculta mensaje "no hay tareas pendientes"
function ocultarMensaje(){
    vacio.style.display = "none";
    dibujarCard();
}

function agregarTarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea){
    alert("Nueva tarea agregada con éxito!");
    tareas.push(new Tarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea));
    ocultarMensaje();
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
    accionesTarea.innerHTML=`<i class="far fa-edit btn btn-editar-tarea" id="btn-editar-tarea" tarea-id="${tarea.id}"></i>
                           <button class="btn btn-eliminar-tarea" id="btn-eliminar-tarea" tarea-id="${tarea.id}">Hecho</button>`;

    // card
    let card=document.createElement("div");
    card.className="card";
    card.append(titulo);
    card.append(descripcion);
    card.append(accionesTarea);

    return card;
}

// dibuja la card de cada tarea y las guarda en el local storage
function dibujarCard(){
    cardContainer.innerHTML="";
    tareas.forEach(
        (tarea) => {
            let card=crearCard(tarea);
            cardContainer.append(card);
            
            editarTarea();
            eliminarTarea();
        }
    )
    localStorage.setItem('tareas', JSON.stringify(tareas));
}


function editarTarea(){
    cardContainer.onclick = (e) => {
       /* if(e.target.tagName.toLowerCase() === 'i'){
            modalAggTarea.classList.add('modal--show');
        } */
    }
}

// elimina la tarea y si no hay mas tareas muestra el mensaje
function eliminarTarea(){
    cardContainer.onclick = (e) => {
        if(e.target.tagName.toLowerCase() === 'button'){
            const tareaId=parseInt(e.target.getAttribute('tarea-id'));
            tareas = tareas.filter(tarea => tarea.id !== tareaId);
            dibujarCard();
        }
        tareas.length===0 && mostrarMensaje();
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
abrirAggTarea.onclick = (e) => {
    e.preventDefault();
    modalAggTarea.classList.add('modal--show');
}

cerrarAggTarea.onclick = (e) => {
    e.preventDefault();
    modalAggTarea.classList.remove('modal--show');
}

// Abrir y cerrar modal agregar categoría
abrirAggCategoria.onclick = (e) => {
    e.preventDefault();
    modalAggCategoria.classList.add('modal--show');
}

cerrarAggCategoria.onclick = (e) => {
    e.preventDefault();
    modalAggCategoria.classList.remove('modal--show');
}

// Formulario bienvenida
formBienvenida.onsubmit = (e) => {
    e.preventDefault();
    let formulario = e.target;
    usuario = formulario.children[0].value;
    saludar(usuario);
    modalBienvenida.classList.remove('modal--show');

    localStorage.setItem('user', usuario);
}

// Formulario agregar tarea
formAggTarea.onsubmit = (e) => {
    e.preventDefault();
    let formulario = e.target;
    agregarTarea(Date.now(), formulario.children[0].value, formulario.children[1].value, formulario.children[2].value, formulario.children[3].value);
    formAggTarea.reset();
}