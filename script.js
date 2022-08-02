// DECLARACIÓN DE VARIABLES
let repetir = true; 

// DECLARACIÓN DE FUNCIONES
function agregarTarea() {
    let nombreTarea = prompt("¿Qué tarea debes realizar?");
    let fechaTarea = prompt("¿Cuándo tenes que realizar la tarea?");
    alert("Tu tarea: " + nombreTarea + " fue agregada exitosamente!\nSu fecha límite es " + fechaTarea);
}

function agregarRutina() {
    let nombreRutina = prompt("¿Qué rutina te gustaría comenzar?");
    let diasRutina = prompt("Elige los días que quieres realizar tu rutina:\nLUNES | MARTES | MIÉRCOLES | JUEVES | VIERNES | SÁBADO | DOMINGO")
    alert("Tu rutina: " + nombreRutina + " fue agregada exitosamente!\nTe enviaremos un recordatorio los días: " + diasRutina);
}

function agregarMeta() {
    let nombreMeta = prompt("¿Qué meta deseas alcanzar?");
    prompt("¿Cuándo te gustaría alcanzar tu meta?");
    alert("Tu meta: " + nombreMeta + " fue agregada exitosamente!\nSabemos que lo lograras.");
}

while (repetir == true) {
    let agregar = prompt("¿Deseas agregar una tarea, rutina o meta?\nEscribe tu elección");

    if (agregar.toUpperCase() == "TAREA") {
        agregarTarea();
    } else if (agregar.toUpperCase() == "RUTINA") {
        agregarRutina();
    } else if (agregar.toUpperCase() == "META") {
        agregarMeta();
    } 

    let agregarOtra = prompt("¿Deseas agregar otra tarea, rutina o meta?\nEscribe SI o NO.");

    if (agregarOtra.toUpperCase() == "NO") {
        repetir = false;
    }
}