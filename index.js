const dateHeading = document.querySelector("#date");
setDate(dateHeading);
const todoForm = document.querySelector("form");
const todoText = document.querySelector("#todo-text");
const todoList = document.querySelector("#todo-list");
const addListBtn = document.querySelector("#add-list");
const clearAllBtn = document.querySelector("#clear-all");
resetInput();
function setDate(ele) {
  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  ele.textContent = date;
}

document.addEventListener("DOMContentLoaded", loadLocalStaorage);

function getListItem(title) {
  const li = document.createElement("li");
  li.className = "list-group-item p-3";
  const input = document.createElement("input");
  input.className = "form-check-input me-1";
  input.type = "checkbox";
  const label = document.createElement("label");
  label.className = "form-check-label";
  label.textContent = title;
  li.append(input, label);
  input.onclick = function () {
    if (input.checked) {
      const strike = document.createElement("del");
      strike.textContent = title;
      label.textContent = null;
      label.appendChild(strike);
    } else {
      label.textContent = title;
    }
  };
  return li;
}

function addList() {
  const todoListItem = getListItem(todoText.value);
  todoList.appendChild(todoListItem);
  updateLocalStorage(todoText.value);
  resetInput();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addList();
});

addListBtn.addEventListener("click", addList);

clearAllBtn.addEventListener("click", clearAllList);

function clearAllList() {
  todoList.replaceChildren();
  clearLocalStorage();
}

function resetInput() {
  todoText.value = null;
  todoText.focus();
}

function updateLocalStorage(title) {
  localStorage.setItem(title, title);
}

function clearLocalStorage() {
  localStorage.clear();
}

function loadLocalStaorage() {
  if (localStorage.length == 3) return;
  const data = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key == "darkyMode" || key == "darkyState" || key == "darkySupported")
      continue;
    const value = localStorage.getItem(key);
    data.push(value);
  }
  console.log(data);
  loadList(data);
}

function loadList(data) {
  data.forEach((element) => {
    const todoListItem = getListItem(element);
    todoList.appendChild(todoListItem);
  });
}
