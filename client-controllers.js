const table = document.querySelector("[data-table]"); //elemento a rellenar

//Fecth API es una funcion nativa del navegador
fetch("/clientes") // solicitud GET a la ruta "/clientes", es una promesa
  .then((res) => res.json()) // a la respuesta la transformo en json, en estecaso devuelve un array con objetos cliientes
  .then((clientes) => {
    //itero el array con el foreach y desestructuro, es como poner "clientes.nombre","clientes.telefono",etc
    clientes.forEach(({ nombre, telefono, email, dni }) => {
      const nuevaLinea = crearNuevaLinea(nombre, telefono, email, dni); //se crea la linea(HTML)
      table.appendChild(nuevaLinea); //la inserto como hija en el elemento table
    });
  });

const crearNuevaLinea = (nombre, telefono, email, dni) => {
  const linea = document.createElement("tr");
  const contenido = `
    <td class="td" data-td>${nombre}</td>
    <td>${telefono}</td>
    <td>${email}</td>
    <td>${dni}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="#"
            class="simple-button simple-button--edit"
            >Editar</a
          >
        </li>
        <li>
          <button
            class="simple-button simple-button--delete"
            type="button"
            id="${dni}"
          >
            Eliminar
          </button>
        </li>
      </ul>
    </td>
    `;
  linea.innerHTML = contenido;

  return linea;
};

console.log("cliente a sido conectados correctamente");
