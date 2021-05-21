//Selectors
const todoInput = document.querySelector('.todo-input');
const todoSubmit = document.querySelector('.btn-submit');
const todoList = document.querySelector('.todo-list-container');
const showhideCompleted = document.querySelector('.toggle-input');
const doneList = document.querySelector('.done-list-container');



//Event Listeners

document.addEventListener('DOMContentLoaded', () => {
    checkforSavedtodos();
    checkforSavedCompledtodos();
    console.log("loaded");
}); //Check for a JSON file for pre-existing todos or create one if it doesnt exist

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
    const label = document.createElement('label')
    label.classList.add('label');
    newTodo.appendChild(label);
    const complete = document.createElement('input');
    complete.type = "checkbox";
    complete.dataset.type = "complete";
    complete.dataset.status = "status-incomplete";
    complete.classList.add('btn-checkbox');
    label.appendChild(complete);
    //Add a label for the checkbox
    


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
    console.log(item);
    
    if(item.dataset.type === "delete") {
        console.log(item);
        item.parentElement.remove(); //removes the item from the to do list
        removeItemFromSavedtodo(item);
        removeItemFromSavedCompletedtodo(item);

    }
    if(item.dataset.type === "complete") {

        if(item.checked = true){ //Remove it form the to-do list and add it to the done-list
            item.parentElement.classList.toggle('completed');
            item.dataset.status = "status-complete";
            item.parentElement.remove();
            doneList.appendChild(item.parentElement);
            removeItemFromSavedtodo(item);
            console.log("this is running")
            
            let savedcompletedtodos = checkforSavedCompledtodos();  //Update the saved done-list in local storage
            const completedtodo = (item.parentElement.children[1].innerText);
            savedcompletedtodos.push(completedtodo);
            localStorage.setItem("savedcompletedtodos", JSON.stringify(savedcompletedtodos));
        } 

        else if (item.parentElement.id = "donelist"){ 
            item.parentElement.classList.toggle('completed');
            item.dataset.status = "status-incomplete";
            item.parentElement.remove();
            todoList.appendChild(item.parentElement);
            removeItemFromSavedCompletedtodo(item);
        }

    }
}


function removeItemFromSavedtodo(event) {
        //removes the item from the local storage SAVEDTODOS
        const savedtodos = checkforSavedtodos(); 
        const text = event.parentElement.children[1].innerText;
        const index = savedtodos.indexOf(text);
        savedtodos.splice(index, 1);
        localStorage.setItem("savedtodos", JSON.stringify(savedtodos));
}

function removeItemFromSavedCompletedtodo(event) {  
            //removes the item from the local storage COMPLETEDSAVEDTODOS
            const savedcompletedtodos = checkforSavedCompledtodos(); 
            const text = event.parentElement.children[1].innerText;
            const index = savedcompletedtodos.indexOf(text);
            savedcompletedtodos.splice(index, 1);
            localStorage.setItem("savedcompletedtodos", JSON.stringify(savedcompletedtodos));
    }


function updateCompletedToDo(event) {
    const item = event.target;
    console.log(item);
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

function checkforSavedCompledtodos() {
    let savedcompletedtodos;
    if (localStorage.getItem("savedcompletedtodos") === null) {
        savedcompletedtodos = [];
    } else {
        savedcompletedtodos = JSON.parse(localStorage.getItem("savedcompletedtodos"));
    }
    return savedcompletedtodos;   
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
    complete.dataset.status = "status-incomplete";
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

function getLocalSavedCompletedTodos() { 
    let savedtodos = checkforSavedCompledtodos();

    savedtodos.forEach(function(todo) {
    //Create a new <div> tag. Put text into span. Append the <div> to the list and add inputs/buttons. 
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item');
    newTodo.classList.add('completed');


    //Add a complete checkbox
    const complete = document.createElement('input');
    complete.type = "checkbox";
    complete.dataset.type = "complete";
    complete.dataset.status = "status-complete";
    complete.classList.add('btn-checkbox');
    newTodo.appendChild(complete);
    // complete.checked = true;

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
    doneList.append(newTodo)

    })
}