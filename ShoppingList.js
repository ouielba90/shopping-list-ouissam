let lista_compra = []

function entrada(item, cantidad, comprado) {
    this.item = item;
    this.cantidad = cantidad;
    this.comprado = comprado;
}

let nuevo = new entrada("patatas",2,true)

console.log(nuevo)

// Funcion para agregar una entrada a la lista

function addItem(item, cantidad){
  lista_compra.push(new entrada(item, cantidad, false)) 
}

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

console.log(lista_compra)

// Funcion para eliminar un elemento de la lista usando un indice como argumento

function removeItem(index, lista_compra){
  return lista_compra.splice(5, 1)
}

removeItem(1,lista_compra)

console.log(12)

// Funcion para actualiza de la lista usando como argumento el indice, el item nuevo y la cantidad
function updateItem(index, newItem, newQuantity, comprado, lista_compra){
  let lista_items = []
  for (let v of lista_compra){
    lista_items.push(v["item"])
  }
  
  let elemento_actual = lista_compra.find(el => el["item"] === newItem);
  if (elemento_actual !== undefined){
    let elemento_actual_index = lista_compra.findIndex(el => el["item"] === newItem);
      if(lista_compra[elemento_actual_index]["cantidad"] !== newQuantity){
        lista_compra[elemento_actual_index]["cantidad"] = newQuantity
        lista_compra[elemento_actual_index]["comprado"] = comprado
    }
  } else {
      lista_compra.splice(index, 0, new entrada(newItem, newQuantity, comprado))
  }
} 


updateItem(1,"galletas",10, true, lista_compra)
updateItem(3,"doritos", 8, true, lista_compra)
console.log(lista_compra)
