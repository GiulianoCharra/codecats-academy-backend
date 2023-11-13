export default async function cargarUsuarios() {
  const listaUsuarios = document.getElementById("listado-usuarios__container");

  try {
    const response = await fetch("https://codecats-academy-backend.onrender.com/api/users/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    if (response.ok) {
      const usuarios = await response.json();

      if (usuarios && usuarios.length > 0) {
        const usuariosHTML = usuarios.map(
          (cliente) => `
          <div class="usuario">
            <h3>${cliente.name}</h2>
            <p>${cliente.email}</p>
            <p>${cliente.role}</p>
            <p>${cliente.createdAt}</p>
            <p>${cliente.description}</p>
          </div>
        `
        );

        // Insertar el HTML en el contenedor
        listaUsuarios.innerHTML = usuariosHTML.join("");
      } else {
        // Mostrar un mensaje si no hay clientes
        listaUsuarios.innerHTML = "<p>No hay clientes disponibles.</p>";
      }
    } else {
      // Mostrar un mensaje de error si la respuesta no es exitosa
      listaUsuarios.innerHTML = `<p>Error al obtener la lista de clientes: ${response.status}</p>`;
    }
  } catch (error) {
    console.error("Error al obtener la lista de clientes:", error.message);
    // Manejar el error según tus necesidades
  }
}
