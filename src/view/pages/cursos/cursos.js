// Función para cargar los cursos en la página
export default async function cargarCursos() {
  const contenedorCursos = document.getElementById("listado_cursos");
  contenedorCursos.innerHTML = "";

  try {
    const response = await fetch("https://codecats-academy-backend.onrender.com/api/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const cursos = await response.json();

      // Itera sobre cada curso y crea elementos HTML para mostrarlos
      cursos.forEach((curso) => {
        const cursoElemento = document.createElement("div");
        cursoElemento.classList.add("curso");
        cursoElemento.dataset.idCurso = curso.idCourse;

        // Añade el contenido del curso utilizando el template proporcionado
        cursoElemento.innerHTML = `
          <a data-name="curso" data-id-curso=${curso.idCourse} href="./pages/curso.html" class="curso_card">
          <img src="${curso.image}" alt="" loading="lazy" class="curso_imagen" />
          <span class="curso_nombre">${curso.title}</span>
          </a>
          <div class="curso_datos">
            <div class="contenedor-me-gusta">
              <input class="input-check-back" type="checkbox" />
              <svg
                class="me-gusta-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="41"
                viewBox="0 0 44 41"
                fill="none"
              >
                <path
                  d="M32.0953 2C25.3332 2 22 8.66632 22 8.66632C22 8.66632 18.6669 2 11.9047 2C6.40917 2 2.05731 6.59767 2.00106 12.0838C1.88649 23.4718 11.035 31.5703 21.0626 38.3762C21.339 38.5643 21.6656 38.6649 22 38.6649C22.3344 38.6649 22.661 38.5643 22.9375 38.3762C32.964 31.5703 42.1125 23.4718 41.999 12.0838C41.9427 6.59767 37.5909 2 32.0953 2Z"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="curso__propiedad curso_duracion">
              <span class="propiedad__nombre">Durations</span>
              <span class="propiedad__valor">${curso.courseDurationMinutes}</span>
            </div>
            <div class="curso__propiedad curso_modalidad">
              <span class="propiedad__nombre">Modality:</span>
              <span class="propiedad__valor">${curso.courseModality}</span>
            </div>
            <div class="curso__propiedad curso_certificado">
              <span class="propiedad__nombre">Certification:</span
              ><span class="propiedad__valor">${curso.certification}</span>
            </div>
            <div class="curso__propiedad curso_descripcion">
              <span class="propiedad__nombre">Description:</span
              ><span class="propiedad__valor">${curso.description}</span
              >
            </div>
            <div class="curso__botones">
              <button class="btn_add_to_cart">
                <span class="add_to_cart">Add to Cart</span>
              </button>
              <button class="btn_comprar">
                <span class="buy">Buy</span>
              </button>
            </div>
          </div>
        `;

        // Agrega el curso al contenedor
        contenedorCursos.appendChild(cursoElemento);
      });
    } else {
      console.error("Error al cargar cursos:", response.status);
    }
  } catch (error) {
    console.error("Error en la solicitud de cursos:", error);
  }
}
