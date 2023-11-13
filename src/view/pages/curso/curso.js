export default async function cargarCurso(idCurso) {
  const cursoContainer = document.getElementById("curso");
  try {
    // Realiza una solicitud al backend para obtener la información del curso específico
    const response = await fetch(
      `https://codecats-academy-backend.onrender.com/api/courses/${idCurso}`
    );
    const curso = await response.json();

    // Llama a una función para renderizar el curso en el contenedor
    cursoContainer.innerHTML = renderizarCurso(curso);
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderizarCurso(curso) {
  // Utiliza el template proporcionado y asigna los valores del curso
  const template = `
        <section class="seccion_descripcion contenedor">
            <img class="imagen_curso" src="${curso.image}" alt="Imagen del curso">
            <div class="contenedor__descripcion">
                <span class="nombre_curso">${curso.title}</span>
                <span class="descripcion">${curso.description}</span>
            </div>
        </section>
        <section class="seccion_informacion_curso">
          <div class="atributo">
            <span class="atributo__nombre">Price:</span>
            <span class="atributo__valor">$${curso.price.toFixed(2)}</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Certification:</span>
            <span class="atributo__valor">${curso.certification ? "Yes" : "No"}</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Difficulty:</span>
            <span class="atributo__valor">${curso.difficulty}</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Category:</span>
            <span class="atributo__valor">${curso.category}</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Language:</span>
            <span class="atributo__valor">${curso.language}</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Course Duration:</span>
            <span class="atributo__valor">${curso.courseDurationMinutes} minutes</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Course Modality:</span>
            <span class="atributo__valor">${curso.courseModality}</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Number of Students:</span>
            <span class="atributo__valor">${curso.numberOfStudents}</span>
          </div>
          <div class="atributo">
            <span class="atributo__nombre">Rating:</span>
            <span class="atributo__valor">${curso.rating}</span>
          </div>
        </section>
        <section class="seccion_modulos contenedor">
            <span class="titulo">modules</span>
            <div class="listado_modulos">
                ${curso.modules.map(renderizarModulo).join("")}
            </div>
        </section>
    `;

  // Agrega el template al contenedor principal
  return template;
}

function renderizarModulo(modulo) {
  return `
        <div class="contenedor-modulo">
            <div class="modulo">
                <div class="modulo__descripcion">
                    <h2 class="">Module <span class="modulo__numer">${
                      modulo.moduleNumber
                    }</span>:</h2>
                    <span class="modulo__nombre">${modulo.title}</span>
                </div>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                </svg>
            </div>
            <div class="modulo__datos">
                <div class="modulo__atributos">
                    <div class="atributos__basicos">
                        <div class="atributo">
                            <span class="atributo__nombre">Duration:</span>
                            <span class="atributo__valor">${(
                              modulo.classes.reduce(
                                (total, clase) => total + clase.durationMinutes,
                                0
                              ) / 60
                            ).toFixed(2)} hrs</span>
                        </div>
                        <div class="atributo">
                            <span class="atributo__nombre">Classes:</span>
                            <span class="atributo__valor">${modulo.classes.length}</span>
                        </div>
                    </div>
                    <div class="atributo flex-start">
                        <span class="atributo__nombre">Description:</span>
                        <span class="atributo__valor">${modulo.description}</span>
                    </div>
                </div>
                <div class="modulo__clases">
                    <div class="desplegable__clases">
                        <span>Class list</span>
                        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                        </svg>
                    </div>
                    <div class="listado__clases">
                        ${modulo.classes.map(renderizarClase).join("")}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderizarClase(clase) {
  return `
        <div class="clase">
            <div class="clase_descripcion">
                <span>Class <span class="clase__numero">${clase.classNumber}</span>:</span>
                <span class="clase__nombre">${clase.name}</span>
            </div>
            <div class="clase_duracion">
                <span class="duracion__valor">${clase.durationMinutes}</span>
                <span class="duracion__unidad">min</span>
            </div>
        </div>
    `;
}
