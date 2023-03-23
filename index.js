import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-18505-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const ShopingListInDB = ref(database, "ShoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue != "") {
    addButtonEl.disabled = false;
    push(ShopingListInDB, inputValue);
  } else {
    alert("Please put some item in box");
  }

  clearInputFieldEl();
});

onValue(ShopingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemtoShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here... yet";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemtoShoppingListEl(item) {
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `ShoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  newEl.textContent = itemValue;
  shoppingListEl.append(newEl);
}
