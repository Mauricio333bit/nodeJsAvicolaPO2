class Producto {
  constructor(nombreProducto, costoProducto, precioProducto, stockDisponible) {
    this.nombreProducto = nombreProducto;
    this.costoProducto = costoProducto;
    this.precioProducto = precioProducto;
    this.stockDisponible = stockDisponible;
  }

  getNombreProducto() {
    return this.nombreProducto;
  }

  setNombreProducto(nombreProducto) {
    this.nombreProducto = nombreProducto;
  }

  getCostoProducto() {
    return this.costoProducto;
  }

  setCostoProducto(costoProducto) {
    this.costoProducto = costoProducto;
  }

  getPrecioProducto() {
    return this.precioProducto;
  }

  setPrecioProducto(precioProducto) {
    this.precioProducto = precioProducto;
  }

  getCantidadProducto() {
    return this.cantidadProducto;
  }

  setCantidadProducto(cantidadProducto) {
    this.cantidadProducto = cantidadProducto;
  }

  getStockDisponible() {
    return this.stockDisponible;
  }

  setStockDisponible(stockDisponible) {
    this.stockDisponible = stockDisponible;
  }

  actualizarStock(cantidad) {
    this.stockDisponible -= cantidad;
    console.log(this.stockDisponible);
  }

  verificarDisponibilidad(cantidad) {
    return this.stockDisponible > cantidad;
  }

  toString() {
    return (
      "Nombre Producto: " +
      this.nombreProducto +
      "\nCosto: $" +
      this.costoProducto +
      "\nPrecio: $" +
      this.precioProducto +
      "\nStockDisponible: " +
      this.stockDisponible +
      "\n"
    );
  }

  equals(o) {
    if (o instanceof Producto) {
      let p = o;
      return this.nombreProducto === p.nombreProducto;
    }
    return false;
  }
}
class Cliente {
  constructor(nombre, telefono, email, dni) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.dni = dni;
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  getTelefono() {
    return this.telefono;
  }

  setTelefono(telefono) {
    this.telefono = telefono;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getDni() {
    return this.dni;
  }

  setDni(dni) {
    this.dni = dni;
  }

  toString() {
    return;
    "Nombre: " +
      this.nombre +
      "\n" +
      "Teléfono: " +
      this.telefono +
      "\n" +
      "Email: " +
      this.email +
      "\n" +
      "DNI: " +
      this.dni;
  }

  equals(inputName) {
    if (inputName === null) {
      return false;
    }
    return this.nombre.toLowerCase() === inputName.toLowerCase();
  }
}

class Venta {
  constructor(clienteComprador, fechaPedido) {
    this.clienteComprador = clienteComprador;
    this.fechaPedido = fechaPedido;
    this.productosPedidos = [];
    this.precioTotal = 0;
  }

  cargarProductoVenta(producto, cantidad) {
    this.validarProducto(producto);
    this.validarCantidad(cantidad);

    if (producto.verificarDisponibilidad(cantidad)) {
      let prodAgregar = { ...producto };
      prodAgregar.cantidadProducto = cantidad;

      if (!this.verificarProductoExistente(prodAgregar)) {
        this.productosPedidos.push(prodAgregar);
      } else {
        let prodExistente = this.obtenerProductoExistente(prodAgregar);
        let cantidadActualizada =
          prodAgregar.cantidadProducto + prodExistente.cantidadProducto;
        prodExistente.cantidadProducto = cantidadActualizada;
      }
    } else {
      console.log("No hay stock suficiente de " + producto.nombreProducto);
    }
  }

  obtenerProductoExistente(prod) {
    return this.productosPedidos.find(
      (p) => p.nombreProducto === prod.nombreProducto
    );
  }

  verificarProductoExistente(prod) {
    return this.productosPedidos.some(
      (p) => p.nombreProducto === prod.nombreProducto
    );
  }

  calcularPrecioFinal() {
    this.precioTotal = 0;
    for (let productoPed of this.productosPedidos) {
      this.precioTotal +=
        productoPed.cantidadProducto * productoPed.precioProducto;
    }
    return this.precioTotal;
  }

  mostrarTicket() {
    console.log(
      "---------------------------------\nTicket\n---------------------------------\n"
    );
    console.log("Cliente: " + this.clienteComprador.nombre);
    console.log("Fecha: " + this.fechaPedido);
    console.log("Productos:\n");
    for (let productoPP of this.productosPedidos) {
      console.log(
        "- " +
          productoPP.nombreProducto +
          " Cantidad: " +
          productoPP.cantidadProducto +
          " " +
          productoPP.cantidadProducto * productoPP.precioProducto +
          " $"
      );
    }
    console.log("TOTAL: " + this.calcularPrecioFinal() + " $");
  }

  validarProducto(producto) {
    if (!producto) {
      throw new Error("Debe indicar un producto");
    }
  }

  validarCantidad(cantidad) {
    if (cantidad <= 0) {
      throw new Error("La cantidad debe ser mayor a 0");
    }
  }
}

module.exports = { Cliente, Producto, Venta };
