const buttonEl = document.querySelector("#button");
const inputEl = document.querySelector("#myInput");
const todoList = document.querySelector("#todo_list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();

buttonEl.addEventListener("click", addTodo);

function addTodo() {
    const task = inputEl.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    const todo = {
        id: Date.now(),
        text: task,
        completed: false,
    };

    todos.push(todo);

    saveTodos();
    renderTodos();

    inputEl.value = "";
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const li = document.createElement("li");

        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = todo.text;


        const actions = document.createElement("div");
        actions.classList.add("actions");

    
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", () => {
            toggleComplete(todo.id);
        });

    
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", () => {
            editTodo(todo.id);
        });

    
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.id);
        });

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        todoList.appendChild(li);
    });
}


function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);

    saveTodos();
    renderTodos();
}


function editTodo(id) {
    const todo = todos.find((todo) => todo.id === id);

    const newText = prompt("Edit your task:", todo.text);

    if (newText === null || newText.trim() === "") return;

    todo.text = newText.trim();

    saveTodos();
    renderTodos();
}

function toggleComplete(id) {
    const todo = todos.find((todo) => todo.id === id);

    todo.completed = !todo.completed;

    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}