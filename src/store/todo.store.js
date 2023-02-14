import { Todo } from '../todos/models/todo.model';

const Filter = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
};

const state = {
    todos: [
        new Todo('Levantarme Temprano'),
        new Todo('Bañarme y Desayunar'),
        new Todo('Dirigirme Al SENA'),
        new Todo('Apropiar Todo El Conocimiento Posible'),
        new Todo('Volver A Casa'),
    ],
    filter: Filter.All,
};

const initStore =() =>{
    console.log(state);
    console.log('InitStore');
};
const loadSotore = ()=>{
    throw new Error('Not Implemented');
};

const getTodos=(filter = Filter.All)=>{
    switch(filter){
        case Filter.All:
            return [...state.todos];
        case Filter.Completed:
            return state.todos.filter(todo => todo.done);
        case Filter.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid.`)
    };
};
/**
 * 
 * @param {String} description 
 */
const addTodo = (description)=>{
    if( !description) throw new Error('Description is required.');
    state.todos.push(new Todo(description));
};
/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) =>{
    state.todos = state.todos.map(todo=>{
        if(todo.id === todoId){
            todo.done=!todo.done;
        }
        return todo;
    });
};
/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId)=>{
    state.todos = state.todos.filter( todo => todo.id !== todoId);
};
const deleteCompleted =()=>{
    state.todos = state.todos.filter( todo => todo.done);
};
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter =(newFilter=Filter.All)=>{
    state.filter= newFilter;
};

const getCurrentFilter =()=>{
    return state.filter;
};

export default {
    initStore,
    loadSotore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,    
};