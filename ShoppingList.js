// Use of a constructor instead of a plain object {} so we can easily create multiple reusable entries.
class Entry {
  constructor(item, quantity, purchased = false) {
    this.item = item;
    this.quantity = quantity;
    this.purchased = purchased;
  }
}

/* Function to add an entry to the shoppingList
The 'prompt' argument is set to true by default.
It should be set to false only when creating the initial list
so that no messages about item addition are displayed.*/
function addItem(list, item, quantity, prompt = true) {
  let currentItem_validation = list.find((el) => el["item"] === item);
  if (currentItem_validation === undefined) {
    if (quantity < 0) {
      console.warn(
        `\nNegative number detected. Item ${item} will not be created.`,
      );
    }
    list.push(new Entry(item, quantity));
    if (prompt) {
      console.log(`\nItem created`);
    }
  } else {
    console.warn(
      `\nDuplication found! The item will neither be created nor updated.`,
    );
  }
  return list;
}

// Function to remove an entry from the shoppingList
function removeItem(list, index) {
  if (index >= 0 && index < list.length) {
    list.splice(index, 1);
    console.log(`\nItem removed`);
  } else {
    console.log(`\nCannot remove item: the index ${index} is out of range.`);
  }
  return list;
}

// Function to update an item in the shoppingList
function updateItem(list, index, newItem, newQuantity) {
  // Check if item already exists
  const existingIndex = list.findIndex((el) => el.item === newItem);

  if (existingIndex !== -1) {
    // If item exists then update quantity
    list[existingIndex]["quantity"] = newQuantity;
    console.log(
      `\nItem "${newItem}" does not exist at index ${index} but exists at index ${existingIndex}, so it will be updated there.`,
    );
    return list;
  }

  // If item does not exist, then  decide where to add
  if (index > list.length - 1) {
    console.log(
      `\nIndex ${index} out of range. Item "${newItem}" will be added at the end.`,
    );
    list.push(new Entry(newItem, newQuantity));
  } else {
    console.log(`\nItem "${newItem}" will be added at index ${index}.`);
    list.splice(index, 0, new Entry(newItem, newQuantity));
  }

  return list;
}

function validateItem(item) {
  const validPatternForItem = /^[a-zA-Z0-9\s\-]+$/;

  if (item === "") {
    return [false, "Item cannot be empty."];
  }
  if (item.length < 2 || item.length > 50) {
    return [
      false,
      `Invalid item name length (${item.length} chars). Allowed range: 2-50 chars.`,
    ];
  }
  if (Number.isInteger(Number(item))) {
    return [false, "Item cannot be a number."];
  }
  if (!validPatternForItem.test(item)) {
    return [false, `Item "${item}" contains invalid characters.`];
  }
  return [true, ""];
}

function validateQuantity(quantity) {
  const num = Number(quantity);
  if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
    return [false, `Quantity "${num}" is not a valid positive integer.`];
  }
  if (num > 50) {
    return [false, `Quantity "${num}" exceeds the allowed maximum of 50.`];
  }
  return [true, ""];
}

function validateIndex(index) {
  const num = Number(index);
  if (!Number.isInteger(num) || num < 0) {
    return [
      false,
      `Index "${index}" is not valid (must be a non-negative integer).`,
    ];
  }
  return [true, ""];
}

function input_validation(action, options) {
  switch (action) {
    case "add": {
      if (options.length !== 2) {
        return [false, "Wrong input. It must contain two arguments."];
      }
      let [item, quantity] = options;
      let result = validateItem(item);
      if (!result[0]) return result;
      return validateQuantity(quantity);
    }
    case "remove": {
      return validateIndex(options);
    }
    case "update": {
      if (options.length === 3) {
        let [index, item, quantity] = options;

        let result_index = validateIndex(index);

        if (!result_index[0]) {
          return result_index;
        }
        let result_item = validateItem(item);
        if (!result_item[0]) {
          return result_item;
        }
        let result_quantity = validateQuantity(quantity);
        if (!result_quantity[0]) {
          return result_quantity;
        }

        return [true, ""];
      } else {
        return [false, "Wrong input. It must contain three arguments."];
      }
    }
    default: {
      // Unnecessary but we keep it for defensive coding
      return [false, "Unknown action."];
    }
  }
}

function showTable(list) {
  prompt("\nPress Enter to display the resulting table...");
  console.table(list);
  console.log("");
}
// First check whether the prompt-sync module is installed
try {
  prompt = require("prompt-sync")();
} catch (err) {
  console.log(`The "prompt-sync" module is required but not installed.`);
  console.log(`Please run: npm install prompt-sync`);
  process.exit();
}

let shoppingList = [];

/* Examples of items added to the shopping list
The third argument is set to false because we're not in prompt mode at this point
so there is no need to show messages about added items.*/
shoppingList = addItem(shoppingList, "bolsa de patatas lays", 2, false);
shoppingList = addItem(shoppingList, "bolsa de cacauetes", 1, false);
shoppingList = addItem(shoppingList, "galletas", 3, false);
shoppingList = addItem(shoppingList, "zumo de naranja", 2, false);
shoppingList = addItem(shoppingList, "pan", 1, false);
shoppingList = addItem(shoppingList, "leche", 2, false);
shoppingList = addItem(shoppingList, "huevos", 12, false);
shoppingList = addItem(shoppingList, "manzanas", 4, false);
shoppingList = addItem(shoppingList, "plátanos", 6, false);
shoppingList = addItem(shoppingList, "yogur", 5, false);

console.log("####################################################");
console.log("### Initial Shopping List (for testing purposes) ###");
console.log("####################################################");
console.table(shoppingList);

let choose_option;

console.log(`Customize Your Shopping List`);

// Prompt
while (choose_option !== "q") {
  console.log(
    `Options available: [1] Add element, [2] Remove Element, [3] Update item, [q] Quit`,
  );
  choose_option = prompt("Choose the task? ");
  switch (choose_option.trim()) {
    case "1": {
      console.log(`\nAdd option selected\n`);
      let input_add = prompt(
        "Enter an item and quantity as 'item,quantity' (string,integer): ",
      );
      let input_list = input_add.split(",").map((el) => el.trim());
      let validation_result = input_validation("add", input_list);
      // It validates if the input introduced has two elements, if these are not empty, if the first in a number and if the second one is not.
      if (validation_result[0]) {
        shoppingList = addItem(
          shoppingList,
          input_list[0],
          Number(input_list[1]),
        );
        showTable(shoppingList);
      } else {
        console.log(`\n${validation_result[1]}\n`);
      }
      break;
    }
    case "2": {
      console.log(`\nRemove option selected\n`);
      let input_add = prompt(
        "Enter the index number of the item you want to delete (integer): ",
      );
      let validation_result = input_validation("remove", input_add.trim());
      if (validation_result[0]) {
        shoppingList = removeItem(shoppingList, Number(input_add.trim()));
        showTable(shoppingList);
      } else {
        console.warn(`\n${validation_result[1]}\n`);
      }
      break;
    }
    case "3": {
      console.log(`\nUpdate option selected\n`);
      console.log(`Enter the index number, item and quantity as`);
      let input_add = prompt(
        "'index,item,quantity' (integer,string,integer): ",
      );
      /*Splits the input string by commas and trims whitespace from each element,
        producing a clean array of input values.*/
      let input_list = input_add.split(",").map((el) => el.trim());
      let validation_result = input_validation("update", input_list);
      if (validation_result[0]) {
        shoppingList = updateItem(
          shoppingList,
          Number(input_list[0]),
          input_list[1],
          Number(input_list[2]),
        );
        showTable(shoppingList);
      } else {
        console.warn(`\n${validation_result[1]}\n`);
      }
      break;
    }
    case "q": {
      console.log(`Goodbye! See you next time!`);
      break;
    }
    default: {
      console.log(`Unrecognized option. Try again!\n`);
      break;
    }
  }
}
