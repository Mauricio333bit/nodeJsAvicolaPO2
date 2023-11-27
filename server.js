const express = require("express");
const app = express();
const fs = require("fs");
const port = 2003;
const Clases = require("./clases");
const Controller = require("./controller");
const Modelo = require("./modelo");
const path = require("path");
app.use(express.static(path.join(__dirname + "/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const itemsJson = require("./archivosPersistencia/db.json"); //obtengo los objetos guardados en el json, clientes y productos por ahora

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/index.html"));
});

// Ruta para obtener la lista de clientes
app.get("/clientes", (req, res) => {
  res.json(Controller.obtener().clientes); //envio una respuesta con los clientes que retorna el metodo, la respuesta es en formato json
});

app.get("/lista_cliente", (request, response) => {
  response.sendFile(path.join(__dirname, "/screens/lista_cliente.html"));
});
app.get("/lista_producto", (request, response) => {
  response.sendFile(path.join(__dirname, "/screens/lista_producto.html"));
});

app.get("/registrar_cliente", (request, response) => {
  response.sendFile(path.join(__dirname, "/screens/registrar_cliente.html"));
});
app.get("/registrar_producto", (request, response) => {
  response.sendFile(path.join(__dirname, "/screens/registrar_producto.html"));
});

// Ruta para crear un nuevo cliente
app.post("/registrar_cliente", (req, res) => {
  Controller.nuevo(req.body);
  res.redirect("/screens/registro_completado.html");
});

// Ruta para eliminar un cliente por ID
app.delete("/clientes/:id", (req, res) => {
  itemsJson.clientes = itemsJson.clientes.filter(
    (c) => c.dni !== req.params.dni
  );
  res.json({ mensaje: "Cliente eliminado correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
