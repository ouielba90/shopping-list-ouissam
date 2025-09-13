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
  return lista_compra.splice(2, 1)
}

removeItem(1,lista_compra)

