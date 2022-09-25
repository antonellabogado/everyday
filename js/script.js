/* DEFINICIÓN DE CONST Y VARIABLES */
// Modal
const modal = document.querySelector('.modal');
// Modal bienvenida
const modalBienvenida = document.querySelector('#bienvenida');
// Modal agregar tarea
const modalAggTarea = document.querySelector('#agregar-tarea');
const abrirAggTarea = document.querySelector('.btn-agregar-tarea');
const cerrarAggTarea = document.querySelector('.cerrar-agg-tarea');
// Modal reclamo/problema
const modalProblema = document.querySelector('#problema');
const abrirProblema = document.querySelector('.problema');
const cerrarProblema = document.querySelector('.cerrar-problema');

// Formularios
const formBienvenida = document.querySelector('#form-bienvenida');
const formAggTarea = document.querySelector('#form-agregar-tarea');
const formProblema = document.querySelector('#form-problema');

// Card container
const cardContainer = document.querySelector('.card-container');
// Lista de tareas
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
// Texto cuando no hay tareas
const vacio = document.querySelector('.vacio');

// Lista categorías
const listaCategorias = document.querySelector('.lista-categorias');
// Texto estas viendo x categoría
const textoCategoria = document.querySelector('.texto-categoria');

// Saludo
const saludo = document.querySelector('.saludo');
let usuario = localStorage.getItem('user') || '';

/* Luxon */
const DateTime = luxon.DateTime;

/* EJECUCIÓN DE FUNCIONES */
dibujarCard();
filtrarPorCategoria();

// si no hay usuario en storage: mostrar bienvenida, si hay: saludar
usuario===''? modalBienvenida.classList.add('modal--show') : saludar(usuario);

// mostrar u ocultar el mensaje "no hay tareas pendientes" y la categoría visualizada
tareas.length===0? mostrarMensaje() : ocultarMensaje();

/* DEFINICIÓN DE CLASES */
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

/* EVENTOS */
// Abrir y cerrar modal agregar tarea
abrirAggTarea.onclick = (e) => {
    e.preventDefault();
    modalAggTarea.classList.add('modal--show');
}
cerrarAggTarea.onclick = (e) => {
    e.preventDefault();
    modalAggTarea.classList.remove('modal--show');
}

// Abrir y cerrar modal problema
abrirProblema.onclick = (e) => {
    e.preventDefault();
    modalProblema.classList.add('modal--show');
}
cerrarProblema.onclick = (e) => {
    e.preventDefault();
    modalProblema.classList.remove('modal--show');
} 

// Formulario bienvenida
formBienvenida.onsubmit = (e) => {
    e.preventDefault();
    usuario = e.target.children[0].value;
    saludar(usuario);
    modalBienvenida.classList.remove('modal--show');
    localStorage.setItem('user', usuario);
}

// Formulario agregar tarea
formAggTarea.onsubmit = (e) => {
    e.preventDefault();
    let formulario = e.target;
    let fecha = new DateTime.fromISO(formulario.children[3].value).toLocaleString();
    agregarTarea(Date.now(), formulario.children[1].value, fecha, formulario.children[5].value, formulario.children[7].value);

    Swal.fire({
        icon: 'success',
        title: 'Tarea agregada con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      
    formAggTarea.reset();
}

// Formulario problema
formProblema.onsubmit = (e) => {
    e.preventDefault();

    Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado con éxito! Te responderemos a la brevedad',
        showConfirmButton: false,
        timer: 1500
      })

    formProblema.reset();

    setTimeout( () => {
        modalProblema.classList.remove('modal--show');
    }, 2000)
}

/* DEFINICIÓN DE FUNCIONES */
function saludar(usuario){
    saludo.innerHTML=`¡Hola, ${usuario}!`;
}

// mostrar mensaje "no hay tareas pendientes"
function mostrarMensaje(){
    vacio.style.display = "block";
    textoCategoria.style.display = "none";
    dibujarCard();
}
// ocultar mensaje "no hay tareas pendientes"
function ocultarMensaje(){
    vacio.style.display = "none";
    textoCategoria.style.display = "block";
    dibujarCard();
}

function agregarTarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea){
    tareas.push(new Tarea(idTarea, nombreTarea, fechaTarea, descripcionTarea, categoriaTarea));
    ocultarMensaje();
}

function crearCard(tarea){
    // titulo tarea
    let titulo=document.createElement("div");
    titulo.className="titulo-tarea d-flex";
    titulo.innerHTML=`<h4>${tarea.nombre}</h4>
                      <p>${tarea.fecha}</p>`;

    // definir color según categoría
    switch (tarea.categoria) {
        case 'trabajo':
            titulo.style.background = "var(--trabajo)";
            break; 
        case 'estudio':
            titulo.style.background = "var(--estudio)";
            break;
        case 'personal':
            titulo.style.background = "var(--personal)";
            break;
        default:
            titulo.style.background = "gray";
            break;
    }

    // descripción tarea
    let descripcion=document.createElement("p");
    descripcion.className="descripcion";
    descripcion.innerText=tarea.descripcion;

    // acciones tarea
    let accionesTarea=document.createElement("div");
    accionesTarea.className="acciones-tarea";
    accionesTarea.innerHTML=`<button class="btn btn-eliminar-tarea" id="btn-eliminar-tarea" tarea-id="${tarea.id}">Hecho</button>`;

    // card
    let card=document.createElement("div");
    card.className="card";
    card.append(titulo);
    card.append(descripcion);
    card.append(accionesTarea);

    return card;
}

function dibujarTareas(tarea){
    let card=crearCard(tarea);
    cardContainer.append(card);
    eliminarTarea();
}

// dibuja la card de cada tarea y las guarda en el local storage
function dibujarCard(){
    cardContainer.innerHTML="";
    tareas.forEach(
        (tarea) => dibujarTareas(tarea)
    )
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// elimina la tarea
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

// categoria trabajo
function dibujarTareasTrabajo(){
    textoCategoria.innerText='Estás viendo la categoría: Trabajo';
    cardContainer.innerHTML="";
    tareasTrabajo.forEach(
        (tarea) => dibujarTareas(tarea)
    )
    localStorage.setItem('tareas trabajo', JSON.stringify(tareasTrabajo));
}

// categoria estudio
function dibujarTareasEstudio(){
    textoCategoria.innerText='Estás viendo la categoría: Estudio';
    cardContainer.innerHTML="";
    tareasEstudio.forEach(
        (tarea) => dibujarTareas(tarea)
    )
    localStorage.setItem('tareas estudio', JSON.stringify(tareasEstudio));
}

// categoria personal
function dibujarTareasPersonal(){
    textoCategoria.innerText='Estás viendo la categoría: Personal';
    cardContainer.innerHTML="";
    tareasPersonal.forEach(
        (tarea) => dibujarTareas(tarea)
    )
    localStorage.setItem('tareas personal', JSON.stringify(tareasPersonal));
}

function filtrarPorCategoria(){
    listaCategorias.onclick = (e) => {
        if (e.target.className === 'todas' ) {
            textoCategoria.innerText='Estás viendo la categoría: Todas';
            dibujarCard();
        } else if (e.target.className === 'trabajo') {
            tareasTrabajo = tareas.filter(tarea => tarea.categoria == 'trabajo');
            dibujarTareasTrabajo();
        } else if (e.target.className === 'estudio') {
            tareasEstudio = tareas.filter(tarea => tarea.categoria == 'estudio');
            dibujarTareasEstudio();
        } else if (e.target.className === 'personal') {
            tareasPersonal = tareas.filter(tarea => tarea.categoria == 'personal');
            dibujarTareasPersonal();
        } else {
            textoCategoria.innerText='Estás viendo la categoría: Todas';
            dibujarCard();
        }
    }
} 