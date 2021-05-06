//Selectors
const todoInput = document.querySelector('.todo-input');
const todoSubmit = document.querySelector('.btn-submit');
const todoList = document.querySelector('.todo-list-container');


//Event Listeners

todoSubmit.addEventListener('click', event => {
    createNewToDo(event);
})

todoList.addEventListener('click', event => {
    updateToDo(event);
})



//Functions

function createNewToDo(event) {
    
    //Prevent the default action of submitting the form
    event.preventDefault();

    //Guard clasue to check that the input value contains text
    if (todoInput.value == "") return;
    
    //Create a new <div> tag
    const el = document.createElement('div');
    el.classList.add('todo-item');

    //Set content of <div> to the value of the input element
    el.innerHTML = '<span>' + todoInput.value + "</span>";
    console.log(el);

    //Append the <div> to the list
    todoList.appendChild(el);

    //Clear the value of the input
    todoInput.value="";

    //Add a delete button
    const del = document.createElement('button');
    del.classList.add('btn-delete');
    del.innerHTML = '<span>delete</span><img src="./img/delete.svg" >';
    el.appendChild(del);

    //Add a complete button
    const complete = document.createElement('button');
    complete.classList.add('btn-complete');
    complete.innerHTML = '<span>Done!</span><img src="./img/complete.svg" >!';
    el.appendChild(complete);
}

function updateToDo(event) {
    console.log(event.target);
}