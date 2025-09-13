let lista_compra = []

function entrada(item, cantidad, comprado) {
    this.item = item;
    this.cantidad = cantidad;
    this.comprado = comprado;
}

let nuevo = new entrada("patatas",2,true)

console.log(nuevo)
