const tareaInput = document.querySelector('#nombre-tarea');
const detalleInput = document.querySelector('#detalle-tarea');


const contenedorTareas = document.querySelector('#tareas');

const formulario = document.querySelector('#nueva-tarea');
formulario.addEventListener('submit', nuevaTarea);

const botonCrearTarea = document.querySelector('#button-submit');

let editarIndex = 0;

class UI { 
    imprimirAlerta(mensaje, tipo) {
        
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert');

        divMensaje.textContent = mensaje;

        document.querySelector('.container').insertBefore(divMensaje, document.querySelector('.caja-principal'));

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }



}
const ui = new UI();

function nuevaTarea(e) {
    e.preventDefault();
   
    const tareaObject = {
        tarea: tareaInput.value, detalle: detalleInput.value
    }
   
    if (tareaObject.tarea === '' || tareaObject.detalle === '') {
        ui.imprimirAlerta('Todos los campos son OBLIGATORIOS', 'error');
        return;
    }
    
    const tareas = leerTareas()
    tareas[editarIndex] = tareaObject
    localStorage.setItem('tareas', JSON.stringify(tareas))
    botonCrearTarea.innerHTML = "Crear tarea"
    actualizarListaDeTareas()
    tareaInput.value = ''
    detalleInput.value = ''
    
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