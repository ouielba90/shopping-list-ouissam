// Use of a constructor instead of a plain object {} so we can easily create multiple reusable entries.
function Entry(item, quantity, purchased) {
    this.item = item;
    this.quantity = quantity;
    this.purchased = purchased;
}

// Function to add an entry to the shoppingList
// The 'prompt' argument is set to true by default.
// It should be set to false only when creating the initial list
// so that no messages about item addition are displayed.
function addItem(list, item, quantity, prompt = true){
  let currentItem_validation = list.find(el => el["item"] === item);
  if (currentItem_validation === undefined){
    if (quantity < 0 || !Number.isInteger(quantity)) {
      quantity = 0;
      console.warn("\nNegative number or unaccepted input for quantity detected.");
      console.warn("Item is still created setting quantity = 0");
    }
    list.push(new Entry(item, quantity, false));
    if (prompt) {console.log("\nItem created");} // Check whether we are in prompt mode just for visual purposes
  } else {
    console.warn("\nDuplication found! The item won't be created.");
  }
  return list;
}

// Function to remove an entry from the shoppingList
function removeItem(list, index){
  if (index >= 0 && index < list.length && Number.isInteger(index)){
    list.splice(index, 1);
    console.log("\nItem removed");
  } else {
    console.warn("\nThe index passed is out of the range of the list.");
  }
  return list
}

// Function to update an item in the shoppingList
function updateItem(list, index, newItem, newQuantity){
  if (list[index]["item"] === newItem && Number.isInteger(newQuantity)) {
    list[index]["quantity"] = newQuantity;
    console.log("\nEntry updated");
    
  } else if (list[index]["item"] !== newItem && Number.isInteger(newQuantity)) {
      console.log("\nThe item property cannot be updated. Item not found in index", index);

  } else {
      console.warn("\nThere was an error in one or more parameters");
  }
  return list;
}

// First check whether the prompt-sync module is installed
try {
    prompt = require('prompt-sync')();
} catch (err) {
    console.log('The "prompt-sync" module is required but not installed.');
    console.log('Please run: npm install prompt-sync');
    process.exit();
}

let shoppingList = [];

// Examples of items added to the shopping list
// The third argument is set to false because we're not in prompt mode at this point
// so there is no need to show messages about added items.
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

console.log("####################################################")
console.log("### Initial Shopping List (for testing purposes) ###")
console.log("####################################################")
console.table(shoppingList)

let choose_option = "";
let input_add = ""

console.log("Customize Your Shopping List");

// Prompt                                                        
while (choose_option !== "q") {
  console.log("Options available: [1] Add element, [2] Remove Element, [3] Update item, [q] Quit");
  choose_option = prompt("Choose the task? ");
  switch (choose_option) {
    case "1":
      console.log("Add");
      input_add = prompt("Enter an item and quantity as 'item,quantity' (string,integer): ");
      if (input_add.split(",").length === 2) { // It validates if the input introduced has two elements
        shoppingList = addItem(shoppingList, input_add.split(",")[0], Number(input_add.split(",")[1]));
        console.table(shoppingList);
        console.log("");
      } else {
        console.log("Wrong input...");
      }
      break;

    case "2":
      console.log("Remove");
      input_add = prompt("Enter the index number of the item you want to delete (integer): ");
      shoppingList = removeItem(shoppingList, Number(input_add));
      console.table(shoppingList);
      console.log("");
      break;

    case "3":
      console.log("Update");
      console.log("Enter the index number, item and quantity as");
      input_add = prompt("'index,item,quantity'(integer,string,integer): ");
      if (input_add.split(",").length === 3) { // It validates if the input introduced has three elements
        shoppingList = updateItem(shoppingList, Number(input_add.split(",")[0]), input_add.split(",")[1], Number(input_add.split(",")[2]));
        console.table(shoppingList);
        console.log("");
      } else {
        console.log("Wrong input...");
      }
      break;

    case "q":
      console.log("Goodbye! See you next time!");
      break;

    default:
      console.log("Unrecognized option. Try again!\n");
      break;
  }
}
