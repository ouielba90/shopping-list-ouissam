let shoppingList = []

function Entry(item, quantity, purchased) {
    this.item = item;
    this.quantity = quantity;
    this.purchased = purchased;
}

// Funcion para agregar una Entry a la lista
function addItem(item, quantity){
  shoppingList.push(new Entry(item, quantity, false)) 
}

// Ejemplos de añadir
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

console.log(shoppingList)

// Funcion para eliminar un elemento de la lista usando un indice como argumento
function removeItem(index, shoppingList){
  return shoppingList.splice(5, 1)
}

removeItem(1, shoppingList)
removeItem(6, shoppingList)

console.log(12)

// Funcion para actualiza de la lista usando como argumento el indice, el item nuevo y la quantity
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

updateItem(1,"galletas",10, true, shoppingList)
updateItem(3,"doritos", 8, true, shoppingList)

console.log(shoppingList)
