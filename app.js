// SELECTORS 
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");


//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodoItem);
todoList.addEventListener("click", checkDelete);


// FUNCTIONS
function addTodoItem(event) {
    //preventing default behaviour of html form
    event.preventDefault();

    //creating todo div element
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creating todo list item
    const todoItem = document.createElement("li");
    todoItem.innerText = todoInput.value;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);

    //calling function to add todo item to localstorage
    saveToLocalStorage(todoInput.value);

    //creating check button
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add("checked");
    todoDiv.appendChild(checkBtn);

    //creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.classList.add("delete");
    todoDiv.appendChild(deleteBtn);

    //appending a new todo div to main todo list
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}


function checkDelete(event) {
    const item = event.target;
  
    // delete todo 
    if(item.classList.contains("delete")) {
        item.parentElement.remove();
        let todo = item.parentElement.children[0].innerText;
        removeTodo(todo); //calling function to remove todo item from local storage
    }
    // check todo 
    if(item.classList.contains("checked")) {
        item.parentElement.classList.toggle("completed"); 
    }
}


//function to check whether element is already in the localstorage ot not
function checkTodos() {
    if(localStorage.getItem("todos") === null) return [];
    else return JSON.parse(localStorage.getItem("todos"));
}


//function to add todo item to local storage
function saveToLocalStorage(todo) {
    let todos = checkTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


//function to show the elements in the local storage on DOM
function getTodos () {
    let todos = checkTodos();

    // repeating addTodoItem function
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const todoItem = document.createElement("li");
        todoItem.innerText = todo;
        todoItem.classList.add("todo-item");
        todoDiv.appendChild(todoItem);

        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList.add("checked");
        todoDiv.appendChild(checkBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.classList.add("delete");
        todoDiv.appendChild(deleteBtn);

        todoList.appendChild(todoDiv);
        todoInput.value = "";
    });
}


function removeTodo(todo) {
    let todos = checkTodos();
    console.log(todos)
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}