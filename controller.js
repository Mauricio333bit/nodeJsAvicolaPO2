const Clases = require("./clases.js");
const Modelo = require("./modelo.js");

function nuevo(data) {
  console.log("--nuevo(data)-->[controlador]");
  const { nombre, telefono, email, dni } = data; //desestructuro el body de la solicitud
  const clienteNew = new Clases.Cliente(nombre, telefono, email, dni); // creo una nueva instancia de la clase clientes

  Modelo.guardar(clienteNew);
}

function obtener() {
  return Modelo.obtener();
}

module.exports = { nuevo, obtener };
