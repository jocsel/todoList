// import { TodoList } from './classes/todo-list.class';
// import { Todo} from './classes/todo.class';
import './style.css';
import {Todo, TodoList} from './classes';
import {crearTodoHTML} from './js/componentes';

 export const todoList = new TodoList(); 

 todoList.todos.forEach(todo => crearTodoHTML(todo));
//  const newTodo = new Todo('Nuevo');
//  newTodo.imprimirClase();
// todoList.todos[1].imprimirClase();
console.log('todos', todoList.todos);