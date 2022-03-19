const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos";

let savedTodos;
let todos = [];

function doneTodo(event) {
  const todoItem = event.target;
  let parseTodos = JSON.parse(savedTodos);
  parseTodos.forEach((obj, index) => {
    if (obj.id === parseInt(todoItem.value)) {
      if (todoItem.checked) {
        todos[index].done = true;
      } else {
        todos[index].done = false;
      }
    }
  });
  saveTodo();
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function deleteTodo(event) {
  const li = event.target.parentElement;
  li.classList.add("remove-item");
  await delay(1000);
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
}

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  getTodo();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  li.classList = "article-content todo-row";
  const span = document.createElement("span");
  span.classList = "todo-row__checkbox";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = `cb${newTodo.id}`;
  input.classList = "check-item";
  input.value = newTodo.id;
  if (newTodo.done) {
    input.checked = true;
  }
  const label = document.createElement("label");
  label.htmlFor = `cb${newTodo.id}`;
  label.textContent = newTodo.text;
  const button = document.createElement("i");
  button.classList = "fa-solid fa-square-minus";
  button.addEventListener("click", deleteTodo);
  span.appendChild(input);
  span.appendChild(label);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  const toDoCheckbox = document.querySelectorAll(".check-item");
  toDoCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", doneTodo);
  });
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    done: false,
  };
  todos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveTodo();
}

function getTodo() {
  savedTodos = localStorage.getItem(TODOS_KEY);
}

toDoForm.addEventListener("submit", handleTodoSubmit);

getTodo();

if (savedTodos !== null) {
  todos = JSON.parse(savedTodos);
  todos.forEach(paintToDo);
}
