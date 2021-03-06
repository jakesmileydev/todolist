"use strict";

const list = [
  { name: "Practice guitar", isChecked: false },
  { name: "Buy groceries", isChecked: false },
  { name: "Hire Jake Smiley", isChecked: true },
  { name: "Exercise", isChecked: false },
  { name: "Dinner with Bob and Alice", isChecked: false },
];

const inputEl = document.querySelector(".input--new-task");
const listEl = document.querySelector(".list");
const newTaskBtn = document.querySelector(".btn--new-task");
const deleteBtn = document.querySelector(".btn--delete");
const clearBtn = document.querySelector(".btn--clear");

listEl.addEventListener("click", function (e) {
  handleDelete(e);
  handleEdit(e);
  handleDoneEditing(e);
  handleCheckOff(e);
});

newTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const task = inputEl.value;
  if (task) {
    list.push({ name: `${task}` });
    updateListDisplay();
    inputEl.value = "";
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
});
//Hover effect for checkboxes;
clearBtn.addEventListener("click", function () {
  list.length = 0;
  updateListDisplay();
});

listEl.addEventListener("mouseout", (e) => handleTaskHover(e));
listEl.addEventListener("mouseover", (e) => handleTaskHover(e));

const handleTaskHover = function (e) {
  if (!e.target.closest(".list-item")) return;

  const thisObject = list.find(
    (listItem) => listItem.name === e.target.closest(".list-item").dataset.name
  );

  if (e.target.classList.contains("checkbox")) return;
  if (!e.relatedTarget) return;
  if (
    e.target.classList.contains("item-name") &&
    e.relatedTarget.classList.contains("checkbox-container")
  )
    return;
  if (
    e.target.classList.contains("checkbox-container") &&
    e.relatedTarget.classList.contains("item-name")
  )
    return;
  if (
    e.target.classList.contains("item-name") ||
    e.target.classList.contains("checkbox-container")
  ) {
    if (e.relatedTarget.classList.contains("checkbox")) return;

    e.target
      .closest(".list-item")
      .querySelector(".item-name")
      .classList.toggle("item-name--hover");
  }
};

const updateListDisplay = function () {
  listEl.innerHTML = "";
  list.forEach((item) => {
    const complete = item.isChecked ? "complete" : "";
    const HTML = `
    <li data-name="${item.name}"class="list-item">
      <div class="checkbox-container">
        <div class="checkbox ${complete}">
          <ion-icon class="check ${complete}" name="checkmark-outline"></ion-icon></div>
        </div>
      <div class="item-name ${complete}">${item.name}</div>
      <button class="btn btn--edit ${complete}">Edit</button>
      <button class="btn btn--delete ${complete}">Delete</button>
    </li>
    `;

    listEl.insertAdjacentHTML("beforeend", HTML);
  });
};

const handleDelete = function (e) {
  if (e.target.classList.contains("btn--delete")) {
    // Remove list item object
    list.splice(
      list.indexOf(
        list.find(
          (listItem) =>
            listItem.name === e.target.closest(".list-item").dataset.name
        )
      ),
      1
    );

    updateListDisplay();
  }
};

const handleDoneEditing = function (e) {
  if (e.target.classList.contains("btn--done")) {
    const thisItem = e.target.closest(".list-item");
    const thisObject = list.find(
      (listItem) =>
        listItem.name === e.target.closest(".list-item").dataset.name
    );
    const buttonHTML = `<button class="btn btn--edit">Edit</button>`;

    thisItem.querySelector(".item-name").textContent =
      thisItem.dataset.name =
      thisObject.name =
        thisItem.querySelector(".input--edit-task").value;
    thisItem.querySelector(".btn--done").remove();
    thisItem
      .querySelector(".btn--delete")
      .insertAdjacentHTML("beforebegin", buttonHTML);
    thisItem.querySelector(".item-name").classList.remove("editing");

    console.log(list);
  }
};

const handleEdit = function (e) {
  e.preventDefault();

  if (e.target.classList.contains("btn--edit")) {
    const thisItem = e.target.closest(".list-item");
    const thisObject = list.find(
      (listItem) => listItem.name === thisItem.dataset.name
    );
    const inputHTML = `<input class="input input--edit-task" type="text" />`;
    const buttonHTML = `<button class="btn btn--done">Done</button>`;

    thisItem.querySelector(".item-name").textContent = "";
    thisItem
      .querySelector(".item-name")
      .insertAdjacentHTML("afterbegin", inputHTML);
    thisItem.querySelector(".btn--edit").remove();
    thisItem.querySelector(".item-name").classList.add("editing");
    thisItem
      .querySelector(".btn--delete")
      .insertAdjacentHTML("beforebegin", buttonHTML);
    thisItem.querySelector(".input--edit-task").value = thisItem.dataset.name;
    thisItem.querySelector(".input--edit-task").focus();
  }
};

const handleCheckOff = function (e) {
  if (
    e.target.classList.contains("item-name") ||
    e.target.classList.contains("checkbox") ||
    e.target.classList.contains("check") ||
    e.target.classList.contains("checkbox-container")
  ) {
    const thisItem = e.target.closest(".list-item");
    const thisObject = list.find(
      (listItem) => listItem.name === thisItem.dataset.name
    );

    thisObject.isChecked = !thisObject.isChecked;

    toggleComplete([
      ...thisItem.children,
      thisItem.querySelector(".checkbox"),
      thisItem.querySelector(".check"),
    ]);
  }
};

const toggleComplete = function (elements) {
  elements.forEach((element) => element.classList.toggle("complete"));
};

updateListDisplay();
