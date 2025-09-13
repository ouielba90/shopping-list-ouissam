let shoppingList = []

function Entry(item, quantity, purchased) {
    this.item = item;
    this.quantity = quantity;
    this.purchased = purchased;
}

// Function that adds an entry to the shoppingList
function addItem(item, quantity){
  shoppingList.push(new Entry(item, quantity, false)) 
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

console.log("shoppingList after adding items")
console.log(shoppingList)

// Function that removes an element from the shoppingList
function removeItem(index, shoppingList){
  return shoppingList.splice(5, 1)
}

// A couple of examples showing how the elements are removed
removeItem(1, shoppingList)
removeItem(6, shoppingList)

console.log("\nshoppingList after removing items")
console.log(shoppingList)

// Function that updates the shoppingList according to the arguments passed 
function updateItem(index, newItem, newQuantity, purchased, shoppingList){
  let itemList = []
  for (let v of shoppingList){
    itemList.push(v["item"])
  }
  
  let currentItem = shoppingList.find(el => el["item"] === newItem);
  if (currentItem !== undefined){
    let currentItemIndex = shoppingList.findIndex(el => el["item"] === newItem);
      if(shoppingList[currentItemIndex]["quantity"] !== newQuantity){
        shoppingList[currentItemIndex]["quantity"] = newQuantity
        shoppingList[currentItemIndex]["purchased"] = purchased
    }
  } else {
      shoppingList.splice(index, 0, new Entry(newItem, newQuantity, purchased))
  }
} 

// A couple of examples showing how the shoppingList is updated
updateItem(1,"galletas",10, true, shoppingList)
updateItem(3,"doritos", 8, true, shoppingList)

console.log("\n shoppingList after a couple of updates")
console.log(shoppingList)
