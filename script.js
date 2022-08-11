let repetir = true;

const tareas=[];
const rutinas=[];
const metas=[];

function agregarTarea(){
    let nombreTarea = prompt("¿Qué tarea debes realizar?");
    let fechaTarea = prompt("¿Cuándo debes realizarla?");
    let nuevaTarea = new Tarea(nombreTarea, fechaTarea);

    tareas.push(nuevaTarea);
    nuevaTarea.confirmarTarea();
}

function agregarRutina(){
    let nombreRutina=prompt("¿Qué rutina quieres realizar?");
    let diasRutina=prompt("¿Que días quieres realizarla?\nEscribe tu elección: LUNES | MARTES | MIERCOLES | JUEVES | VIERNES");
    let nuevaRutina=new Rutina(nombreRutina, diasRutina);

    rutinas.push(nuevaRutina);
    nuevaRutina.confirmarRutina();
}

function agregarMeta(){
    let nombreMeta=prompt("¿Qué meta quieres alcanzar?");
    let fechaMeta=prompt("Ingresa cuando quieres alcanzarla");
    let nuevaMeta=new Meta(nombreMeta, fechaMeta);

    metas.push(nuevaMeta);
    nuevaMeta.confirmarMeta();
}

function mostrar() {
    console.log("TAREAS PENDIENTES:");
    tareas.forEach(tarea => {
        console.log(tarea);
    })

    console.log("METAS PENDIENTES:");
    rutinas.forEach(rutina => {
        console.log(rutina);
    })
    
    console.log("RUTINAS PENDIENTES:");
    metas.forEach(meta => {
        console.log(meta);
    })
}

class Tarea{
    constructor(nombre, fecha){
        this.nombre = nombre;
        this.fecha = fecha;
    }
    confirmarTarea(){
        alert("La tarea: " + this.nombre + " se ha agregado correctamente! Te enviaremos un recordatorio el día: " + this.fecha);
    }
}

class Rutina{
    constructor(nombre, dias){
        this.nombre = nombre;
        this.dias = dias;
    }
    confirmarRutina(){
        alert("Tu rutina: " + this.nombre + " se ha agregado correctamente! Te enviaremos un recordatorio los días: " + this.dias);
    }
}

class Meta{
    constructor(nombre, dia){
        this.nombre = nombre;
        this.dia = dia;
    }
    confirmarMeta(){
        alert("Tu meta: " + this.nombre + " se ha agregado correctamente!\nLo lograrás el: " + this.dia + "(o antes 😉)");
    }
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

    let agregarOtra = confirm("¿Deseas agregar otra tarea, rutina o meta?");

    if (agregarOtra == false) {
        repetir = false;
        mostrar();
    }
}