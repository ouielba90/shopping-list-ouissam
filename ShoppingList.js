let lista_compra = []

function entrada(item, cantidad, comprado) {
    this.item = item;
    this.cantidad = cantidad;
    this.comprado = comprado;
}

let nuevo = new entrada("patatas",2,true)

console.log(nuevo)

// Funcion para agregar una entrada a la lista

function addItem(lista_compra, para_agregar){
  lista_compra.push(para_agregar)
}

addItem(lista_compra, new entrada("bolsa de patatas lays", 2, false))
addItem(lista_compra, new entrada("bolsa de cacauetes", 1, false))

console.log(lista_compra)
