//GUARDAR EN VARIABLES LOS ELEMENTOS INPUT (querySelector)
const tareaInput = document.querySelector('#nombre-tarea');
const detalleInput = document.querySelector('#detalle-tarea');

//Elemento html donde se van a mostrar las nuevas tareas
const contenedorTareas = document.querySelector('#tareas');

//Botón de confirmación 
const formulario = document.querySelector('#nueva-tarea');
formulario.addEventListener('submit', nuevaTarea);

const botonCrearTarea = document.querySelector('#button-submit');
// eventListeners();

// Crear evento eventListeners. Función detecte cuando escriba algo en el inputet
// function eventListeners() {
//     tareaInput.addEventListener('change', datosTarea);
//     detalleInput.addEventListener('change', datosTarea);
// }


// //Crear u objeto y buscar la manera de que ese objeto se vaya completando con lo que ingrese el usario
// function datosTarea(e) {
//     console.log("FUNCION DATOS-TAREA");
//     tareaObj[e.target.name] = e.target.value;
//     console.log(tareaObj);
// }


let editarIndex = 0;

// class Tarea {
//     constructor() {
//         this.tareas = []
//     }

//     agregarTarea(tarea) {

//     }

// }

class UI { // no tiene constructor 
    imprimirAlerta(mensaje, tipo) {
        //crear elemento html 
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert');

        divMensaje.textContent = mensaje;

        document.querySelector('.container').insertBefore(divMensaje, document.querySelector('.caja-principal'));

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }



}

//instanciar de forma global
//const administrarTarea = new Tarea();
const ui = new UI();

function nuevaTarea(e) {
    e.preventDefault();
    //extraer la informacion del objeto
    const tareaObject = {
        tarea: tareaInput.value, detalle: detalleInput.value
    }
    /* */
    // const { tarea, detalle } = tareaObj;

    //validar 
    if (tareaObject.tarea === '' || tareaObject.detalle === '') {
        ui.imprimirAlerta('Todos los campos son OBLIGATORIOS', 'error');
        return;
    }
    if (botonCrearTarea.innerHTML === "Crear tarea") {
        const tareaDiferente = localStorage.getItem(tareaObject.tarea)
        if (tareaDiferente === null) {
            guardarTareas(tareaObject)
        } else {
            ui.imprimirAlerta("Esta tarea ya existe", 'error')
            return;
        }
    } else {
        // Es guardar cambios
        const tareas = leerTareas()
        tareas[editarIndex] = tareaObject
        localStorage.setItem('tareas', JSON.stringify(tareas))
        botonCrearTarea.innerHTML="Crear tarea"
    }
    actualizarListaDeTareas()
    tareaInput.value = ''
    detalleInput.value = ''
    //se crea nuevo registro para
    //genere un id 
    //añadir nueva tarea

    //imprimir en pantalla nuevo elemento agregado UI 


    //llamar a FUNCION reiniciar  objeto, para evitar futuros problemas .
}

function guardarTareas(tareaObject) {
    const tareas = leerTareas()
    localStorage.setItem("tareas", JSON.stringify([...tareas, tareaObject]))
}
function leerTareas() {
    const tareas = localStorage.getItem("tareas")
    if (tareas === null) {
        return []
    } else {
        return JSON.parse(tareas)
    }

}

function actualizarListaDeTareas() {
    const tareas = leerTareas()
    contenedorTareas.innerHTML = ""
    tareas.forEach((tareaObject, index) => {
        const nuevasTareas = document.createElement('li')
        const nueva1 = document.createElement('div')
        nueva1.innerHTML = "<button class='editar' onclick='editar(" + index + ")'>Editar</button><button class='borrar' onclick='borrar(" + index + ")'>Borrar</button>" + tareaObject.tarea + ": " + tareaObject.detalle 
        nuevasTareas.appendChild(nueva1)
        contenedorTareas.appendChild(nuevasTareas)
    });

}

function editar(index) {
    // Obtener tareas
    const tareas = leerTareas()
    // Poner valor de la tarea en input
    tareaInput.value = tareas[index].tarea
    detalleInput.value = tareas[index].detalle

    // const botonEditar = document.querySelector("#boton-editar"+index)
    botonCrearTarea.innerHTML = "Guardar cambios"
    editarIndex = index

    // const nuevasTareas = tareas.filter((tarea, numeroTarea) => { numeroTarea !== index })
    // localStorage.setItem('tareas', nuevasTareas)
}

function borrar(index) {
    const tareas = leerTareas()
    const nuevasTareas = tareas.filter(
        (tarea, numeroTarea) => {
            return numeroTarea !== index
        }
    )
    localStorage.setItem('tareas', JSON.stringify(nuevasTareas))
    actualizarListaDeTareas()

}

actualizarListaDeTareas()