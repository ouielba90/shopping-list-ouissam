// In this code, the global list is modified directly for efficiency,
// Not using a returned copy to avoid extra memory.
// Input validations are already implemented.

// Global list variable declared
let shoppingList = []

// Use of a constructor instead of a simple object {} so we can easily create multiple reusable entries.
function Entry(item, quantity, purchased) {
    this.item = item;
    this.quantity = quantity;
    this.purchased = purchased;
}

// Function that adds an entry to the shoppingList
function addItem(item, quantity){
  let currentItem_validation = shoppingList.find(el => el["item"] === item);
  if (currentItem_validation === undefined){
    if (quantity < 0 | !Number.isInteger(quantity)) {
      quantity = 0
      console.warn("Negative number or unaccepted input for quantity detected.")
      console.warn("Item is still created setting quantity = 0")
    }
    shoppingList.push(new Entry(item, quantity, false)) 
  } else {
    console.warn("Duplication found! The item won't be created.")
  }
}

// A few examples of how the items are added in the shopping list
addItem("bolsa de patatas lays", 2)
addItem("bolsa de cacauetes", 1)
addItem("galletas", 3);
addItem("zumo de naranja", 2);
addItem("pan", 1);
addItem("leche", 2);
addItem("huevos", 12);
addItem("manzanas", 4);
addItem("plátanos", 6);
addItem("yogur", 5);

console.log("shoppingList after adding different items starting from an empty list")
console.table(shoppingList)

// Function that removes an element from the shoppingList
function removeItem(index){
  if (Math.abs(index) <= shoppingList.length && Number.isInteger(index)){
    shoppingList.splice(index, 1)
  } else {
    console.warn("The index passed is out of the range of the list")
  }
}

// A couple of examples showing how the elements are removed
removeItem(1)
console.log("\nshoppingList after removing an item")
console.table(shoppingList)

removeItem(6)
console.log("\nshoppingList after removing another item")
console.table(shoppingList)

// Function that updates the shoppingList according to the arguments passed 
function updateItem(index, newItem, newQuantity, purchased){
  let itemList = []
  for (let v of shoppingList){
    itemList.push(v["item"])
  }
  let quick_validation = false 
  if (Number.isInteger(newQuantity) && typeof purchased === "boolean"){
    quick_validation = true
  }

  let currentItem = shoppingList.find(el => el["item"] === newItem);
  if (currentItem !== undefined && quick_validation){
    let currentItemIndex = shoppingList.findIndex(el => el["item"] === newItem);
      if(shoppingList[currentItemIndex]["quantity"] !== newQuantity){
        shoppingList[currentItemIndex]["quantity"] = newQuantity
        shoppingList[currentItemIndex]["purchased"] = purchased
        console.log("Entry updated (index ignored because the entry exists already)")
    }
  } else if (currentItem === undefined && quick_validation && Number.isInteger(index)) {
      if (Math.abs(index) > shoppingList.length) {console.log("The index introduced is out of range. The entry will be added at the of the list")}
      shoppingList.splice(index, 0, new Entry(newItem, newQuantity, purchased))
      console.log("New entry added because it did not exist earlier")
  } else {
      console.warn("There was an error in one or more parameters")
  }
} 

// A couple of examples showing how the shoppingList is updated
updateItem(10, "galletas", 10, true)
console.log("\n shoppingList after an update")
console.table(shoppingList)

updateItem(12, "doritos", 8, true)
console.log("\n shoppingList after another update")
console.table(shoppingList)



