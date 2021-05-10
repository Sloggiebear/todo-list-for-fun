//Selectors
const todoInput = document.querySelector('.todo-input');
const todoSubmit = document.querySelector('.btn-submit');
const todoList = document.querySelector('.todo-list-container');
const showhideCompleted = document.querySelector('.toggle-input');
const doneList = document.querySelector('.done-list-container');



//Event Listeners

document.addEventListener('DOMContentLoaded', getLocalTodos()); //Check for a JSON file for pre-existing to dos or create one if it doesnt exist

todoSubmit.addEventListener('click', event => {
    createNewToDo(event);
})

todoList.addEventListener('click', event => {
    updateToDo(event);
})

doneList.addEventListener('click', event => {
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
    
    //Create a new <div> tag. Put text into span. Append the <div> to the list and add inputs/buttons. 
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item');

    //Add a complete checkbox
    const complete = document.createElement('input');
    complete.type = "checkbox";
    complete.dataset.type = "complete";
    complete.classList.add('btn-checkbox');
    newTodo.appendChild(complete);

    //Add the text of the todo as a span
    const todoText = document.createElement('span');
    todoText.innerText = todoInput.value;
    newTodo.appendChild(todoText);

    //Add a delete button
    const del = document.createElement('button');
    del.dataset.type = "delete";
    del.classList.add('btn-delete');
    del.innerHTML = '<img class="image-delete" src="./img/delete.svg" >';
    newTodo.appendChild(del);

    //Append the entire div to the list
    todoList.append(newTodo)

    //reset todo input value
    todoInput.value="";

}

function updateToDo(event) {
    const item = event.target;
    
    if(item.dataset.type === "delete") {
        item.parentElement.remove();
        const deletecheck = checkforSavedtodos()
        // localStorage.setItem("savedtodos", JSON.stringify(savedtodos));

    }
    if(item.dataset.type === "complete") {
        // showhideCompleted.checked ? item.parentElement.classList.add('d-none') : item.parentElement.classList.remove('d-none');
        if(item.checked = true){
            item.parentElement.classList.toggle('completed');
            item.dataset.staus = "status-complete";
            item.parentElement.remove();
            doneList.appendChild(item.parentElement);
        } 
    }
}

function toggleCompleted(event){
    const completedtodos = document.querySelector('.done-list-container');
    event.target.checked ? completedtodos.classList.add('d-none') : completedtodos.classList.remove('d-none');
    }


function checkforSavedtodos() {
    let savedtodos;
    if (localStorage.getItem("savedtodos") === null) {
        savedtodos = [];
    } else {
        savedtodos = JSON.parse(localStorage.getItem("savedtodos"));
    }
    return savedtodos;   
}

function saveTodos (todo) { //Checks local storage for a JSON file with saved todos
    let savedtodos = checkforSavedtodos();
    savedtodos.push(todo);
    localStorage.setItem("savedtodos", JSON.stringify(savedtodos));
}

function getLocalTodos() { 
    let savedtodos = checkforSavedtodos();

    savedtodos.forEach(function(todo) {
    //Create a new <div> tag. Put text into span. Append the <div> to the list and add inputs/buttons. 
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item');

    //Add a complete checkbox
    const complete = document.createElement('input');
    complete.type = "checkbox";
    complete.dataset.type = "complete";
    complete.classList.add('btn-checkbox');
    newTodo.appendChild(complete);

    //Add the text of the todo as a span
    const todoText = document.createElement('span');
    todoText.innerText = todo;
    newTodo.appendChild(todoText);

    //Add a delete button
    const del = document.createElement('button');
    del.dataset.type = "delete"
    del.classList.add('btn-delete');
    del.innerHTML = '<img class="image-delete" src="./img/delete.svg" >';
    newTodo.appendChild(del);

    //Append the entire div to the list
    todoList.append(newTodo)

    })
}