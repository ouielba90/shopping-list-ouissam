// Use of a constructor instead of a plain object {} so we can easily create multiple reusable entries.
function Entry(item, quantity, purchased) {
  this.item = item;
  this.quantity = quantity;
  this.purchased = purchased;
}

/* Function to add an entry to the shoppingList
The 'prompt' argument is set to true by default.
It should be set to false only when creating the initial list
so that no messages about item addition are displayed.*/
function addItem(list, item, quantity, prompt = true) {
  let currentItem_validation = list.find((el) => el["item"] === item);
  let charnumb_item = item.length > 1 && item.length <= 50;
  if (currentItem_validation === undefined && item !== "") {
    if (quantity < 0) {
      console.warn(
        `\nNegative number detected. Item ${item} will not be created.`,
      );
      return list;
    }
    if (!charnumb_item) {
      console.warn(
        `\nInvalid item name length \(${item.length} chars\). Allowed range: 2-50 chars.\n`,
      );
      return list;
    }
    list.push(new Entry(item, quantity, false));
    // Check whether we are in prompt mode just for visual purposes
    if (prompt) {
      console.log(`\nItem created`);
    }
    return list;
  } else {
    console.warn(
      `\nDuplication found! The item will neither be created nor updated.`,
    );
    return list;
  }
}

// Function to remove an entry from the shoppingList
function removeItem(list, index) {
  if (index < list.length - 1) {
    list.splice(index, 1);
    console.log(`\nItem removed`);
    return list;
  } else {
    console.log(`Cannot remove item: the index ${index} is out of range.`);
  }
}

// Function to update an item in the shoppingList
function updateItem(list, index, newItem, newQuantity) {
  // Check if item already exists
  const existingIndex = list.findIndex((el) => el.item === newItem);

  if (existingIndex !== -1) {
    // If item exists then update quantity
    list[existingIndex]["quantity"] = newQuantity;
    console.log(`\nUpdated "${newItem}" at index ${existingIndex}.`);
    return list;
  }

  // If item does not exist, then  decide where to add
  if (index > list.length - 1) {
    console.log(
      `\nIndex ${index} out of range. Item "${newItem}" will be added at the end.`,
    );
    list.push(new Entry(newItem, newQuantity, false));
  } else {
    console.log(`\nItem "${newItem}" will be added at index ${index}.`);
    list.splice(index, 0, new Entry(newItem, newQuantity, false));
  }

  return list;
}

function input_validation(action, options) {
  let msg = "";
  const validPatternForItem = /^[a-zA-Z0-9\s\-]+$/;

  switch (action) {
    case "add":
      if (options.length === 2) {
        let item = options[0];
        let quantity = options[1];
        if (item === "") {
          msg = `Item cannot be empty.`;
          return [false, msg];
        }
        console.log(Number.isInteger(Number(item)));
        if (Number.isInteger(Number(item))) {
          msg = `Item cannot be a number.`;
          return [false, msg];
        }
        if (!validPatternForItem.test(item)) {
          msg = `Item "${item}" contains invalid characters.`;
          return [false, msg];
        }
        if (
          Number.isNaN(Number(quantity)) ||
          Number(quantity) <= 0 ||
          !Number.isInteger(Number(quantity))
        ) {
          msg = `Quantity "${quantity}" is not a valid positive integer.`;
          return [false, msg];
        }
        return [true, ""];
      } else {
        msg = "Wrong input. It must contain two arguments.";
        return [false, msg];
      }

    case "remove":
      if (Number.isInteger(Number(options))) {
        let index = options;
        if (!Number.isInteger(Number(index)) || Number(index) < 0) {
          msg = `Index ${index} is not valid (must be a non-negative integer).`;
          return [false, msg];
        }
        return [true, ""];
      } else {
        msg = `Wrong input. It must contain an integer as an argument.`;
        return [false, msg];
      }

    case "update":
      if (options.length === 3) {
        let index = options[0];
        let item = options[1];
        let quantity = options[2];

        if (!Number.isInteger(Number(index)) || Number(index) < 0) {
          msg = `Index ${index} is not valid (must be a non-negative integer).`;
          return [false, msg];
        }

        if (item === "") {
          msg = `Item cannot be empty.`;
          return [false, msg];
        }

        if (!validPatternForItem.test(item)) {
          msg = `Item "${item}" contains invalid characters.`;
          return [false, msg];
        }

        if (
          Number.isNaN(Number(quantity)) ||
          Number(quantity) <= 0 ||
          !Number.isInteger(Number(quantity))
        ) {
          msg = `Quantity "${quantity}" is not a valid positive integer.`;
          return [false, msg];
        }

        return [true, ""];
      } else {
        msg = "Wrong input. It must contain three arguments.";
        return [false, msg];
      }

    default:
      break;
  }
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
let input_add;
let input_list = [];
let validation_result;

console.log(`Customize Your Shopping List`);

// Prompt
while (choose_option !== "q") {
  console.log(
    `Options available: [1] Add element, [2] Remove Element, [3] Update item, [q] Quit`,
  );
  choose_option = prompt("Choose the task? ");
  switch (choose_option.trim()) {
    case "1":
      console.log(`\nAdd option selected\n`);
      input_add = prompt(
        "Enter an item and quantity as 'item,quantity' (string,integer): ",
      );
      input_list = input_add.split(",").map((el) => el.trim());
      validation_result = input_validation("add", input_list);
      // It validates if the input introduced has two elements, if these are not empty, if the first in a number and if the second one is not.
      if (validation_result[0]) {
        shoppingList = addItem(
          shoppingList,
          input_list[0],
          Number(input_list[1]),
        );
        prompt("\nPress Enter to display the resulting table...");
        console.table(shoppingList);
        console.log("");
      } else {
        console.log(`\n${validation_result[1]}\n`);
      }
      break;

    case "2":
      console.log(`\nRemove option selected\n`);
      input_add = prompt(
        "Enter the index number of the item you want to delete (integer): ",
      );
      validation_result = input_validation("remove", input_add.trim());
      if (validation_result[0]) {
        shoppingList = removeItem(shoppingList, Number(input_add.trim()));
        prompt("\nPress Enter to display the resulting table...");
        console.table(shoppingList);
        console.log("");
      } else {
        console.warn(`\n${validation_result[1]}\n`);
      }
      break;

    case "3":
      console.log(`\nUpdate option selected\n`);
      console.log(`Enter the index number, item and quantity as`);
      input_add = prompt("'index,item,quantity' (integer,string,integer): ");
      /*Splits the input string by commas and trims whitespace from each element,
        producing a clean array of input values.*/
      input_list = input_add.split(",").map((el) => el.trim());
      validation_result = input_validation("update", input_list);
      // It validates if the input introduced has three elements, if the second one is a number and if the first and second one are not a number.
      if (validation_result[0]) {
        shoppingList = updateItem(
          shoppingList,
          Number(input_list[0]),
          input_list[1],
          Number(input_list[2]),
        );
        prompt("\nPress Enter to display the resulting table...");
        console.table(shoppingList);
        console.log("");
      } else {
        console.warn(`\n${validation_result[1]}\n`);
      }
      break;

    case "q":
      console.log(`Goodbye! See you next time!`);
      break;

    default:
      console.log(`Unrecognized option. Try again!\n`);
      break;
  }
}
