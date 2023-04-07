"use strict";
//Get elements
//Получаем элементы со страницы
const listElem = document.getElementById("list");
const createBtn = document.getElementById("create");

//Создаем массив в котором будут хранится данные
let task = [];

//Event handlers

createBtn.addEventListener("click", createNewTask);

//function
//Функция которая создает элемент
function createNewTask() {
  //Create a task with id
  //Создаем задачу с id
  const itemTask = {
    id: new Date().getTime(),
    text: "",
    complete: false,
  };

  //Add new element in array
  //Добавляем задачу в начало массива с помощью unshfit
  task.unshift(itemTask);

  //Извлекаем данные из функции которая позволяет редактировать задачу
  const { itemElem, inputElem } = createTaskElement(itemTask);
  //Adding an element to the first
  //Добавляем элемеент в начало списка
  listElem.prepend(itemElem);

  //Отключаем элемегту атрбут
  inputElem.removeAttribute("disabled");
  //Добавляем фокус на эелемент ввода
  inputElem.focus();

  //Функция которая сохраняет данные в localstoreg
  save();
}

{
  /* <div class="item">
        <input type="checkbox" />
        <input type="text" value="Task content goes here" disabled />
        <div class="actions">
            <button class="material-icons">edit</button>
            <button class="material-icons remove-btn">remove_circle</button>
        </div>
    </div> */
}

//Task editing
//Функция редактирования задачи
function createTaskElement(item) {
  //Create element
  //Созданаем элемент
  const itemElem = document.createElement("div");

  //Добавляем элементу клас
  itemElem.classList.add("item");

  //Создаем инпут
  const checkbox = document.createElement("input");

  //Присваеваем ему тип "checbox"
  checkbox.type = "checkbox";

  //Присваеваем состояние отмечено или нет, по умолчанию стоит false
  checkbox.checked = item.complete;

  if (item.complete) {
    itemElem.classList.add("complete");
  }

  //Создаем поле ввода(инпут)
  const inputElem = document.createElement("input");

  //Присваиваем инпуту тип "text"
  inputElem.type = "text";

  //Присваиваем значение инпута (itemTask.text) которое будет создано с помощью функции createNewTask();
  inputElem.value = item.text;

  //После того как будет введен текст мы добавляем этому иппуту атрибут
  inputElem.setAttribute("disabled", "");

  //Создаем див с кнопками
  const actionsElem = document.createElement("div");
  //Добавляем ему класс "actions"
  actionsElem.classList.add("actions");

  //Создаем кнопку редактирования задач
  const editBtn = document.createElement("button");
  //Добавляем класс
  editBtn.classList.add("material-icons");
  //Добавляем текст кнопке редаетирования
  editBtn.innerText = "edit";

  //Кнопку удаления задач
  const deleteBtn = document.createElement("button");
  //Добавляем классы
  deleteBtn.classList.add("material-icons", "remove-btn");
  //Добавляем текст кнопке редаетирования
  deleteBtn.innerText = "remove_circle";

  //Добавляем кнопки в див с кнопками
  actionsElem.append(editBtn);
  actionsElem.append(deleteBtn);

  //Добавляем диву задачи

  //Инпут чек бокс
  itemElem.append(checkbox);

  //Инпут ввода
  itemElem.append(inputElem);

  //Див с кнопками
  itemElem.append(actionsElem);

  //Обработчки собитый для задачи
  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      itemElem.classList.add("complete");
    } else {
      itemElem.classList.remove("complete");
    }

    save();
  });
  //Обработчик события для ввода текста
  inputElem.addEventListener("input", () => {
    item.text = inputElem.value;
  });

  inputElem.addEventListener("blur", () => {
    inputElem.setAttribute("disabled", "");

    save();
  });

  editBtn.addEventListener("click", () => {
    inputElem.removeAttribute("disabled");
    inputElem.focus();
  });

  deleteBtn.addEventListener("click", () => {
    task = task.filter((t) => t.id != item.id);

    itemElem.remove();

    save();
  });

  return { itemElem, inputElem, editBtn, deleteBtn };
}

//Отображение тасков
function displayTask() {
  load();

  console.log(task);

  for (let i = 0; i < task.length; i++) {
    const item = task[i];

    const { itemElem } = createTaskElement(item);
    listElem.append(itemElem);
  }
}
displayTask();

//Сохранение данных
function save() {
  const save = JSON.stringify(task);

  localStorage.setItem("todo_list", save);
}
//Загрузка
function load() {
  const data = localStorage.getItem("todo_list");

  if (data) {
    task = JSON.parse(data);
  }
}
