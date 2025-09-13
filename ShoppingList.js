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



console.log(lista_compra)

