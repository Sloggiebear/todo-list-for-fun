//Selectors
const todoInput = document.querySelector('.todo-input');
const todoSubmit = document.querySelector('.btn-submit');
const todoList = document.querySelector('.todo-list-container');
const showhideCompleted = document.querySelector('.toggle-input');



//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos());

todoSubmit.addEventListener('click', event => {
    createNewToDo(event);
})

todoList.addEventListener('click', event => {
    updateToDo(event);
})

showhideCompleted.addEventListener('click', event => {
    toggleCompleted(event);
})


//Functions

function createNewToDo(event) {
    
    //Prevent the default action of submitting the form
    event.preventDefault();

    //Guard clasue to check that the input value contains text
    if (todoInput.value == "") return;

    //Save the todo to local storage
    saveTodos(todoInput.value);
    
    //Create a new <div> tag. Put text into span. Append the <div> to the list. Reset the input field.
    const el = document.createElement('div');
    el.classList.add('todo-item');
    el.innerHTML = '<span>' + todoInput.value + "</span>";
    todoList.appendChild(el);
    todoInput.value="";

    //Add a delete button
    const del = document.createElement('button');
    del.classList.add('btn-delete');
    del.innerHTML = '<img class="image-delete" src="./img/delete.svg" >';
    el.appendChild(del);

    //Add a complete button
    const complete = document.createElement('button');
    complete.classList.add('btn-complete');
    complete.innerHTML = '<img class="image-complete" src="./img/complete.svg" >';
    el.appendChild(complete);
}

function updateToDo(event) {
    const item = event.target;
    if(item.classList[0] === "btn-delete") {
        item.parentElement.remove();
    }
    if(item.classList[0] === "btn-complete") {
        item.parentElement.classList.toggle('completed');
        showhideCompleted.checked ? item.parentElement.classList.add('d-none') : item.parentElement.classList.remove('d-none');
    }
}

function toggleCompleted(event){
    const completedtodos = document.querySelectorAll('.completed');
    completedtodos.forEach(element => {
        event.target.checked ? element.classList.add('d-none') : element.classList.remove('d-none');
    });
}

function saveTodos (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const el = document.createElement('div');
        el.classList.add('todo-item');
        el.innerHTML = '<span>' + todo + "</span>";
        todoList.appendChild(el);
        todoInput.value="";
    
        //Add a delete button
        const del = document.createElement('button');
        del.classList.add('btn-delete');
        del.innerHTML = '<img class="image-delete" src="./img/delete.svg" >';
        el.appendChild(del);
    
        //Add a complete button
        const complete = document.createElement('button');
        complete.classList.add('btn-complete');
        complete.innerHTML = '<img class="image-complete" src="./img/complete.svg" >';
        el.appendChild(complete);

    })
}