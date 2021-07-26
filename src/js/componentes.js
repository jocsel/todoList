// Referencia en el HTML
import {Todo} from '../classes';
import {todoList} from '../index';
const divTodoList    = document.querySelector('.todo-list');
const txtInput       = document.querySelector('.new-todo');
const btnBorrar      = document.querySelector('.clear-completed');
const ulfiltros      = document.querySelector('.filters');
const anchorFiltros  = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {
    
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox"${(todo.completado) ? 'checked': ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
};

// Eventos
txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        // console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);   
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click',(event) =>{
    // console.log('click');
    const nombreElemnto = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if(nombreElemnto.includes('input')){ //Click en el check
        todoList.marcarCompletados(todoId);
        todoElemento.classList.toggle('completed');
    } else if(nombreElemnto.includes('button')){ //Borrar todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () =>{
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemnto = divTodoList.children[i];
        // console.log(elemnto);
        if(elemnto.classList.contains('completed')){
            divTodoList.removeChild(elemnto);
        }
    }
});
 
ulfiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro){return;}
    anchorFiltros.forEach(elemt => elemt.classList.remove('selected'));
    event.target.classList.add('selected');
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});