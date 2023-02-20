
import html from './app.html?raw';
import todoStore, { Filter } from '../store/todo.store';
import { renderTodos } from './use-cases';


const ElementIds = {
   ClearCompleted: '.clear-completed',
   TodoList: '.todo-list',
   NewTodoImput: '#new-todo-input',
   TodoFilter: '.filter'
};
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) =>{

   const displayTodos = ()=>{
      const todos= todoStore.getTodos( todoStore.getCurrentFilter());
      renderTodos(ElementIds.TodoList, todos);
   };

   (()=>{

    const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
   })();
        
   //referencias HTML
   const newDescriptionInput = document.querySelector(ElementIds.NewTodoImput);
   const todoListUL = document.querySelector( ElementIds.TodoList);
   const clearCompletedButton = document.querySelector(ElementIds.ClearCompleted);
   const filterLi = document.querySelectorAll(ElementIds.TodoFilter);

   //listener
   newDescriptionInput.addEventListener('keyup', (event)=>{
      if(event.keyCode !== 13) return;
      if(event.target.value.trim().length === 0) return;

      todoStore.addTodo(event.target.value);
      displayTodos();
      event.target.value='';

   });
   todoListUL.addEventListener('click', (event)=>{
      const element = event.target.closest('[data-id]');
      todoStore.toggleTodo(element.getAttribute('data-id'));      
      displayTodos();
   });
   todoListUL.addEventListener('click', (event)=>{
      const isDestroyElement = event.target.className=== 'destroy';
      const element = event.target.closest('[data-id]');
      if (!element || !isDestroyElement) return;
      todoStore.deleteTodo(element.getAttribute('data-id'));      
      displayTodos();
   });
   clearCompletedButton.addEventListener('click',()=>{
      todoStore.deleteCompleted();
      displayTodos();
   })
   filterLi.forEach(element=>{
      element.addEventListener('click',(element)=>{
         filterLi.forEach(element => element.classList.remove('selected'))
         element.target.classList.add('selected');
         switch(element.target.text){
            case'Todos':
            todoStore.setFilter(Filter.All)
            break;
            case'Pendientes':
            todoStore.setFilter(Filter.Pending)
            break;
            case'Completados':
            todoStore.setFilter(Filter.Completed)
            break;
         };
         displayTodos();
      });
   })
};

