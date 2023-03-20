import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-18505-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const ShopingListInDB = ref(database, "ShopingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(ShopingListInDB, inputValue);

  clearInputFieldEl();
});

onValue(ShopingListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());

  clearShoppingListEl();

  for (let i = 0; i < itemsArray.length; i++) {
    let currentlist = itemsArray[i];

    appendItemtoShoppingListEl(currentlist);
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemtoShoppingListEl(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
