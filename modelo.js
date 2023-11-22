const fs = require("fs");
const Clases = require("./clases");
function guardar(clienteNew) {
  console.log("--guardar(data)-->[modelo]");
  const itemsJson = obtener();
  itemsJson.clientes.push(clienteNew); // añado el nuevo cliente,se añade al objeto clientes almacendo en itemsJson=>{clientes:[],productos[],}
  console.log(obtener());
  fs.writeFileSync("./archivosPersistencia/db.json", JSON.stringify(itemsJson)); //modulo fs cuyo metodo write es sincrono y espera a que se concluya, escribe el nuevo cliente en bd.json
  fs.appendFile(
    "./archivosPersistencia/clientes.txt",
    JSON.stringify(clienteNew),
    (error) => {
      error
        ? console.log("No se escribió el archivo")
        : console.log("escrito coreerctamente");
      //escribo contenido a un archivo. Si el archivo no existe, se crea. Si el archivo ya existe, los nuevos datos se añaden al final.
    }
  );
}

function obtener() {
  console.log("--obtener()-->[modelo]");

  let str_clientes = fs.readFileSync("./archivosPersistencia/db.json", "utf-8");
  let itemsJson = [];
  if (str_clientes) {
    itemsJson = JSON.parse(str_clientes);
  }
  console.log("<--(Clientes)--[modelo]");
  return itemsJson;
}

module.exports = { guardar, obtener };
